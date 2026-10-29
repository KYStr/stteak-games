import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
let nonce=0;
export async function mainFixture({root=process.env.ORBIT_RUNTIME_ROOT||fileURLToPath(new URL('../candidate/',import.meta.url)),entries=new Map()}={}){
 root=path.resolve(root);const globals=new Map(),events=new Map(),nodes=new Map(),physicsInstances=[],createdRooms=[],views=[],errors=[];let raf=[],clock=0,readyResolve,readyReject;
 const readyPromise=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
 const install=(key,value)=>{globals.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,writable:true,configurable:true});};
 const restore=()=>{for(const [key,value]of globals){if(value)Object.defineProperty(globalThis,key,value);else delete globalThis[key];}};
 const register=(type,fn)=>{if(!events.has(type))events.set(type,[]);events.get(type).push(fn);};
 const all=[];
 class Element{
  constructor(tag='div'){this.tagName=tag.toUpperCase();this.dataset={};this.style={};this.hidden=false;this.disabled=false;this.children=[];this.isConnected=true;this.listeners=new Map();this.classList={add(){},remove(){},toggle(){}};all.push(this);}
  set id(id){this._id=id;nodes.set(id,this);}get id(){return this._id;}
  set innerHTML(html){this._html=html;for(const c of this.children)c.isConnected=false;this.children=[];const tags=html.matchAll(/<(button|input|select)\b([^>]*)>/g);for(const [,tag,attrs]of tags){const child=new Element(tag);for(const [,key,,v1,v2]of attrs.matchAll(/([\w-]+)(=(?:"([^"]*)"|'([^']*)'))?/g)){const value=v1??v2??'';if(key==='id')child.id=value;else if(key.startsWith('data-'))child.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;else child[key]=key==='disabled'?true:value;}this.children.push(child);}}
  get innerHTML(){return this._html||'';}
  get firstElementChild(){if(!this.children[0])this.children.push(new Element());return this.children[0];}
  addEventListener(type,fn){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(fn);}
  append(...children){this.children.push(...children);}setAttribute(k,v){this[k]=v;}focus(){document.activeElement=this;}getClientRects(){return [{}];}
  querySelectorAll(selector){return select(selector,this.children);}querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  click(){if(this.disabled)throw new Error('disabled node');this.onclick?.({target:this});for(const fn of this.listeners.get('click')||[])fn({target:this});}
 }
 function select(selector,list=all){const m=selector.match(/^\[data-([\w-]+)\]$/);if(m){const key=m[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase());return list.filter(el=>el.isConnected&&Object.hasOwn(el.dataset,key));}if(selector.startsWith('#'))return list.filter(el=>el.id===selector.slice(1));return [];}
 const node=id=>{if(!nodes.has(id)){const el=new Element();el.id=id;}return nodes.get(id);};
 const storage={getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,String(value)),removeItem:key=>entries.delete(key)};
 install('document',{getElementById:node,querySelectorAll:select,createElement:tag=>new Element(tag),addEventListener:register,hidden:false,activeElement:null});install('window',{performance:globalThis.performance});install('localStorage',storage);install('matchMedia',()=>({matches:false}));install('location',{search:'',reload(){throw new Error('navigation not available in CPU fixture');}});install('addEventListener',register);install('removeEventListener',()=>{});install('requestAnimationFrame',fn=>{raf.push(fn);});
 const realPhysics=await import(pathToFileURL(path.join(root,'physics.js')));
 class Physics extends realPhysics.PhysicsRoom{constructor(...args){super(...args);physicsInstances.push(this);createdRooms.push(args[2]?.id);}dispose(){if(!this.disposed){super.dispose();this.disposed=true;}}}
 class View{constructor(){this.mode='fixed';this.camera={getWorldDirection(v){v.set(0,0,-1);}};this.devices=[];views.push(this);}load(room,puzzle){this.room=room;this.puzzle=puzzle;this.nextDevice=null;}nearest(){return this.nextDevice;}refresh(){}update(){}resize(){}telemetry(){return {syntheticRenderer:true};}dispose(){}pick(){return this.nextDevice;}}
 class Audio{setVolumes(){}unlock(){}play(){}setPaused(){}setHidden(){}update(){}dispose(){}}
 let handlers;const bridge={state(){},ready:readyResolve,error:readyReject,dispose(){}};
 install('__orbitFixture',{initializePhysics:realPhysics.initializePhysics,PhysicsRoom:Physics,StationView:View,loadAssetLibrary:async()=>{},AudioEngine:Audio,createBridge:callbacks=>{handlers=callbacks;return bridge;}});
 let original=await fs.readFile(path.join(root,'main.js'),'utf8'),source=original;
 const replacements=[['initializePhysics,PhysicsRoom','physics.js'],['StationView','scene.js'],['loadAssetLibrary','models.js'],['AudioEngine','audio.js'],['createBridge','bridge.js']];
 for(const [bindings,name]of replacements){const match=`import {${bindings}} from './${name}';`;assert.equal(source.split(match).length,2,match);source=source.replace(match,`const {${bindings}}=globalThis.__orbitFixture;`);}
 source=source.replace(/from '\.\/([^']+)'/g,(_,p)=>`from '${pathToFileURL(path.join(root,p))}'`);
 const oldError=console.error;console.error=(...args)=>{errors.push(args.map(String).join(' '));};
 try{await import('data:text/javascript;base64,'+Buffer.from(source+'\n// fixture '+ ++nonce).toString('base64'));await readyPromise;assert.deepEqual(errors,[]);}catch(e){restore();throw e;}finally{console.error=oldError;}
 function click(id){node(id).click();}
 function dataset(key,value){const el=all.findLast(n=>n.isConnected&&n.dataset[key]===value);assert.ok(el,`missing data-${key}=${value}`);el.click();}
 function key(key){for(const fn of events.get('keydown')||[])fn({key,code:key===' '?'Space':'',repeat:false,target:{tagName:'DIV'},preventDefault(){}});for(const fn of events.get('keyup')||[])fn({key,code:key===' '?'Space':''});}
 function frames(n){for(let i=0;i<n;i++){clock+=1000/60;const pending=raf;raf=[];for(const callback of pending)callback(clock);}}
 return {createdRooms,node,click,dataset,key,frames,entries,storage,host:handlers,snapshot:()=>window.__orbitDiagnostics.snapshot(),get physics(){return physicsInstances.at(-1);},get view(){return views.at(-1);},
  // This sets a synthetic engine proximity observation only. No claim that native travel/positioning was played.
  interact(id,index){views.at(-1).nextDevice={id,index,pos:{distanceTo:()=>0},range:3,label:id};key('f');views.at(-1).nextDevice=null;},
  travel(id){this.physics.player.setTranslation({x:0,y:1.8,z:6.7},true);click('map-button');dataset('room',id);},
  dispose(){for(const p of physicsInstances)if(!p.disposed)p.dispose();restore();},sourceAudit:{mainSha256:createHash('sha256').update(original).digest('hex'),scope:'Whole main + actual content/rules/storage/settings/optics/hazards/PhysicsRoom/Rapier; synthetic DOM/render/audio/bridge, controlled frame scheduling/proximity; no GUI'}
 };
}
