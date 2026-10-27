import {spawnSync} from 'node:child_process'; // 只呼叫已審核的 npm／Node 官方工具及本專案腳本。
import {readdir,readFile,writeFile,mkdir,cp,rm,stat} from 'node:fs/promises'; // 所有寫入限本專案新候選與其 dist。
import {fileURLToPath} from 'node:url'; // 以腳本位置定位，不依賴個人電腦路徑。
import {join,resolve} from 'node:path'; // 使用跨平台路徑組合。
import {createServer} from 'node:http'; // 開發伺服器不需要帳號或外部後端。
const root=fileURLToPath(new URL('../',import.meta.url)); // 專案根目錄是唯一檔案服務範圍。
const games=['aetherwake','dust-redemption','hollow-crown','moss-and-moon','neon-drift','orbit-fall','signal-zero','tidebound']; // 八款來源固定列出，避免執行不明工程。
const mode=process.argv[2]??'help',only=process.argv[3]; // 可針對單款精準安裝／建置／測試。
if(only&&!games.includes(only))throw Error('未知遊戲 ID'); // 拒絕把任意路徑或命令當成遊戲。
const chosen=only?[only]:games; // 未指定時才依序處理八款。
const npm=process.platform==='win32'?'npm.cmd':'npm'; // 保留官方 npm 在 Windows 的正常入口。
function run(command,args){const result=spawnSync(command,args,{cwd:root,stdio:'inherit',shell:false});if(result.error)throw result.error;if(result.status!==0)throw Error('子命令失敗，停止後續步驟');} // 失敗即停止，不偽裝成功或自動放寬檢查。
if(mode==='setup'){for(const game of chosen)run(npm,['ci','--prefix',join('games',game),'--ignore-scripts','--registry=https://registry.npmjs.org']);} // 使用既有 lock 與官方 registry，停用依賴安裝腳本。
else if(mode==='build'){for(const game of chosen)run(npm,['run','build','--prefix',join('games',game)]);if(!only)await bundle();} // 只跑各款既有正式 build；全體完成後才產生公開 dist。
else if(mode==='test'){if(!only)run(process.execPath,['--test',join(root,'tests/public-release.test.mjs')]);for(const game of chosen){const directory=join(root,'tests/games',game);const files=(await readdir(directory)).filter(name=>/\.test\.(?:js|mjs)$/.test(name)).sort().map(name=>join(directory,name));run(process.execPath,['--test',...files]);}} // 執行公開保留的可攜測試，不宣稱取代原生 GUI／效能驗收。
else if(mode==='bundle')await bundle(); // 可只封裝已建置 runtime，不重新跑所有工程。
else if(mode==='serve')await serve(); // 使用本機靜態伺服器預覽，不啟用登入或分析服務。
else console.log('用法：node scripts/public.mjs setup|build|test [game-id]；bundle；serve'); // 印出有限且明確的支援命令。
async function bundle(){ // 公開封裝完全不讀原平台交辦 docs、分數或 evidence。
 const dist=join(root,'dist');await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true}); // 只重建本專案明確的 dist，絕不碰原恢復來源。
 await cp(join(root,'launcher'),dist,{recursive:true}); // 入口是新的最小 launcher，不是原帳號／驗收 UI。
 for(const game of games){const from=join(root,'public/games',game),to=join(dist,'games',game);await cp(from,to,{recursive:true,filter:source=>!source.split(/[\\/]/).some(part=>['evidence','screenshots','node_modules','.git'].includes(part))});} // 明確擋掉私人證據與工具目錄。
 for(const name of ['LICENSE','LICENSE-SCOPE.md','THIRD_PARTY_NOTICES.md','ASSET-LICENSES.md','release-status.json'])await cp(join(root,name),join(dist,name)); // 發布 runtime 時一併保留授權範圍和 notices。
 console.log('公開 dist 已建立；這不是部署，也不代表遊戲驗收通過。'); // 不把打包成功說成公開部署或品質通過。
} // 結束公開封裝。
async function serve(){ // 本機預覽只綁定 loopback，不暴露網路服務。
 const dist=join(root,'dist'),types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.wasm':'application/wasm','.png':'image/png','.svg':'image/svg+xml','.wav':'audio/wav','.glb':'model/gltf-binary','.gltf':'model/gltf+json'}; // 宣告遊戲常用靜態檔 MIME。
 const server=createServer(async(req,res)=>{try{const url=new URL(req.url,'http://127.0.0.1'),name=decodeURIComponent(url.pathname),file=resolve(dist,'.'+name+(name.endsWith('/')?'index.html':''));if(file!==dist&&!file.startsWith(dist+'/')&&!file.startsWith(dist+'\\'))throw Error('路徑越界');if(!(await stat(file)).isFile())throw Error('不是檔案');const extension=file.slice(file.lastIndexOf('.'));res.writeHead(200,{'Content-Type':types[extension]??'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}}); // 檢查路徑邊界且不列出目錄或內部錯誤。
 server.listen(4173,'127.0.0.1',()=>console.log('本機預覽：http://127.0.0.1:4173')); // 保持本機可檢查，沒有任何自動上傳。
} // 結束本機伺服器。
