import test from 'node:test';
import assert from 'node:assert/strict';
import {WarningCueUI,CUE_UI_LIMITS} from '../../../public/games/hollow-crown/warning-cue-ui.js';
// Small DOM/CSSOM fixture exercises the same conservative validator as the page.
function fixture(){
 const ids=['world','vignette','hud','boss-hud','tutorial','loadout','combat-tip','touch-controls','toast','save-notice','build-label','journey','action-feedback','overlay','warning-cue','warning-cue-text','warning-cue-shape','aim-stick','charge-fill','charge-track','action-label'];
 const nodes=new Map(),document={hidden:false},style={display:'block',visibility:'visible',opacity:'1',filter:'none',backdropFilter:'none',mixBlendMode:'normal',transform:'none',clipPath:'none',boxShadow:'none',textShadow:'none',outlineStyle:'none',perspective:'none'};
 const rect=(left=0,top=0,width=100,height=30)=>({left,top,width,height,right:left+width,bottom:top+height});
 const make=id=>{const n={id,className:id==='tutorial'?'tutorial':id==='aim-stick'?'stick aim-stick':'',hidden:false,style:{visibility:'hidden'},computed:{...style},dataset:{},children:[],textContent:'',ownerDocument:document,scrollWidth:100,clientWidth:100,scrollHeight:30,clientHeight:30,box:rect(),attrs:{},getAttribute(k){return k==='style'?this.attrs.style||'':this.attrs[k]??null;},contains(){return false;},querySelector(){return null;},getBoundingClientRect(){return this.box;}};nodes.set(id,n);return n;};
 for(const id of ids)make(id);document.documentElement=make('html');document.body=make('body');document.body.dataset={menu:'false',tutorial:'true'};
 document.body.children=ids.slice(0,14).map(id=>nodes.get(id));document.body.children.push({tagName:'SCRIPT',getAttribute:k=>k==='type'?'module':k==='src'?'./boot.js':null});
 for(const id of ids.slice(2,13))nodes.get(id).hidden=true;
 nodes.get('world').box=rect(0,0,1280,720);nodes.get('vignette').computed.backgroundImage='radial-gradient(ellipse at 55% 40%, transparent 35%, rgba(7, 16, 11, 0.6) 100%)';nodes.get('overlay').computed.display='none';nodes.get('charge-track').className='meter';
 const room=make('room-label');room.className='room-label';room.hidden=true;document.getElementById=id=>nodes.get(id)||null;document.querySelector=()=>room;
 const window={innerWidth:1280,innerHeight:720,scrollX:0,scrollY:0,getComputedStyle:n=>n.computed,MutationObserver:class{observe(){}disconnect(){}takeRecords(){return [];}}};
 const ui=new WarningCueUI(document,window),candidate={kind:'windup',rect:{left:-.1,right:.1,top:-.3,bottom:-.1}};
 return{ui,document,nodes,candidate,present(){ui.present(candidate,true);return nodes.get('warning-cue-text').textContent;}};
}
test('owned journey and training action roots, text and meter updates preserve the actual cue',()=>{
 const f=fixture();assert.equal(CUE_UI_LIMITS.rectangles,14);assert.equal(CUE_UI_LIMITS.rootElements,19);assert.equal(f.present(),'扇形提示：蓄勢');
 for(const id of ['journey','action-label'])f.ui.consume([{type:'childList',target:f.nodes.get(id)}]);
 const fill=f.nodes.get('charge-fill');fill.attrs.style='width: 100%;';assert.equal(f.ui.attributeSafe({target:fill,attributeName:'style'}),true);
 const track=f.nodes.get('charge-track');assert.equal(f.ui.attributeSafe({target:track,attributeName:'hidden'}),true);
 const action=f.nodes.get('action-feedback');action.hidden=false;action.box={left:28,right:258,top:100,bottom:170,width:230,height:70};assert.equal(f.present(),'扇形提示：蓄勢');
 f.ui.consume([{type:'attributes',target:fill,attributeName:'style'},{type:'attributes',target:track,attributeName:'hidden'}]);assert.equal(f.present(),'扇形提示：蓄勢');
});
test('unknown direct body root and a substituted same-ID root suppress cues',()=>{
 for(const substitute of [false,true]){const f=fixture();if(substitute)f.document.body.children[11]={...f.nodes.get('journey')};else f.document.body.children.push({id:'unowned',tagName:'DIV'});assert.equal(f.ui.inspectRoots().valid,false);assert.equal(f.present(),'觀察場上動作');assert.equal(f.nodes.get('warning-cue').style.visibility,'hidden');}
});
test('illegal meter widths and arbitrary charge-track mutations stay rejected',()=>{
 for(const width of ['101%','-1%','50px','NaN%']){const f=fixture(),fill=f.nodes.get('charge-fill');fill.attrs.style='width: '+width+';';f.ui.consume([{type:'attributes',target:fill,attributeName:'style'}]);assert.equal(f.ui.structureUncertain,true);assert.equal(f.present(),'觀察場上動作');}
 const f=fixture(),track=f.nodes.get('charge-track');track.attrs.style='opacity: 0;';assert.equal(f.ui.attributeSafe({target:track,attributeName:'hidden'}),false);
});
test('visible overlays and a legitimate mask covering the warning remain conservative',()=>{
 const overlay=fixture();overlay.nodes.get('overlay').computed.display='block';assert.equal(overlay.present(),'觀察場上動作');
 const covering=fixture(),mask=covering.nodes.get('action-feedback');mask.hidden=false;mask.box={left:400,right:900,top:150,bottom:400,width:500,height:250};assert.equal(covering.present(),'觀察場上動作');
});
test('owned root bounds refresh after mutation and resize invalidation, clearing stale semantics immediately',()=>{
 const f=fixture(),mask=f.nodes.get('action-feedback');mask.hidden=false;mask.box={left:28,right:258,top:100,bottom:170,width:230,height:70};assert.equal(f.present(),'扇形提示：蓄勢');
 mask.box={left:400,right:900,top:150,bottom:400,width:500,height:250};f.ui.consume([{type:'attributes',target:mask,attributeName:'hidden'}]);assert.equal(f.nodes.get('warning-cue').style.visibility,'hidden');assert.equal(f.present(),'觀察場上動作');
 mask.box={left:28,right:258,top:100,bottom:170,width:230,height:70};f.ui.invalidateBounds();assert.equal(f.present(),'扇形提示：蓄勢');
});
test('animated owned roots cannot reuse static cached mask bounds',()=>{
 const f=fixture(),mask=f.nodes.get('action-feedback');mask.hidden=false;mask.box={left:28,right:258,top:100,bottom:170,width:230,height:70};mask.getAnimations=()=>[];assert.equal(f.present(),'扇形提示：蓄勢');mask.getAnimations=()=>[{}];assert.equal(f.present(),'觀察場上動作');
});
