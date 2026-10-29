import {createHash} from 'node:crypto'; // 使用確定性SHA-256守住精確上游輸入及輸出。
export const RAPIER_MODIFICATION_NOTICE=`/*!
 * MODIFIED FILE / 已修改檔案：Orbit / Fall public-source.2。
 * 本發行版本修改 @dimforge/rapier3d-compat 0.19.0 上游檔案，非原樣上游副本。
 * 既有修改 compat-0.19.0-init-object-1：把同一內部 ArrayBuffer 初始化實參
 * 包入 {module_or_path: ...} 物件（較上游增加17個ASCII bytes）；公開 init() API
 * 與內嵌 WASM bytes 保持原樣。本次 public-source.2 僅新增這段醒目修改通知。
 * 上游套件來源：https://registry.npmjs.org/@dimforge/rapier3d-compat/-/rapier3d-compat-0.19.0.tgz
 * 保留上游原件：../../../../assets/games/orbit-fall/vendor-sources/rapier-0.19.0.mjs
 * 上游SHA256：1ade6875c663c1398f490d4fa67837386b2d7e0aad45fe54e9b7af52b8198a49
 * 重現配方：../../../../games/orbit-fall/rapier-init-patch.mjs
 * 原授權：Apache-2.0；完整文本 ./rapier-LICENSE.txt；https://www.apache.org/licenses/LICENSE-2.0
 * 保留既有上游版權、歸屬與授權文本；本通知不捏造作者、版權或新增授權。
 */
`; // 公開衍生檔必須攜帶同一段醒目通知。
export const RAPIER_INIT_PATCH=Object.freeze({ // 只允許已核對的0.19.0單一內部呼叫。
  id:'compat-0.19.0-init-object-1',version:'0.19.0', // 不升npm版本，也不改公開init()API。
  upstreamSha256:'1ade6875c663c1398f490d4fa67837386b2d7e0aad45fe54e9b7af52b8198a49', // 完整上游vendor任何一byte不同皆拒絕。
  unnotedOutputSha256:'79187dfd61b8f1b04b730992c2d8f1c0014265f5afee0d64021c32f06cba4f97', // 先驗原17byte wrapper輸出，不能因補通知放寬原guard。
  outputSha256:'96e9905a2661e9641f4ff5b79ee4ce2d7773f4943b11af58cac123eb53740163',publicNoticeId:'orbit-fall-0016-public-source.2', // 再驗含通知的精確新公開輸出。
  callOffset:141650,callBytes:2073471,callSha256:'d61d9336557eac94e7af9d8ea166133f7f2ff949f9736617f142e0867f1ea490', // 以精確位置／長度／內容hash定位，不模糊replace。
  wasmSha256:'c8cf07035996629dbf6156c82fec836ddc1c6cff78cf6afde726c30585da2bfd',wasmBytes:1555075, // 原始WASM bytes保留不變。
  licenseSha256:'cfc7749b96f63bd31c3c42b5c471bf756814053e847c10f3eb003417bc523d30', // 保留原授權文件位元。
}); // 結束可追溯修補識別。
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex'); // 提供build與測試共用的位元核對。
export function patchRapierInit(bytes){ // 純函式只回傳衍生vendor，不寫檔或觸碰runtime。
  if(!(bytes instanceof Uint8Array)||sha256(bytes)!==RAPIER_INIT_PATCH.upstreamSha256)throw Error('RAPIER patch refuses unknown upstream bytes'); // 先拒絕未知來源，不能猜測或寬鬆匹配。
  const source=Buffer.from(bytes).toString('utf8'),{callOffset,callBytes}=RAPIER_INIT_PATCH,call=source.slice(callOffset,callOffset+callBytes); // 僅在已核對的ASCII位置擷取單一呼叫。
  if(sha256(call)!==RAPIER_INIT_PATCH.callSha256||source.indexOf(call)!==callOffset||source.indexOf(call,callOffset+callBytes)!==-1)throw Error('RAPIER patch requires exactly one audited init call'); // 內容／唯一性任一不符都fail-closed。
  const prefix='yield xA(',argument=call.slice(prefix.length,-1),arrayPrefix='Lg.toByteArray("',arraySuffix='").buffer'; // 內部原實參是ArrayBuffer，不是app公開API參數。
  if(!call.startsWith(prefix)||!call.endsWith(')')||!argument.startsWith(arrayPrefix)||!argument.endsWith(arraySuffix))throw Error('RAPIER audited argument shape mismatch'); // 不允許別的初始化形式。
  const wasm=Buffer.from(argument.slice(arrayPrefix.length,-arraySuffix.length),'base64'); // 解出原內嵌WASM作獨立原件校驗。
  if(wasm.length!==RAPIER_INIT_PATCH.wasmBytes||sha256(wasm)!==RAPIER_INIT_PATCH.wasmSha256)throw Error('RAPIER original WASM mismatch'); // 不以JS呼叫修補夾帶引擎變更。
  const vendor=Buffer.from(source.slice(0,callOffset)+prefix+'{module_or_path:'+argument+'})'+source.slice(callOffset+callBytes)); // 只包裹同一ArrayBuffer，公開init()及其他程式原樣保留。
  if(sha256(vendor)!==RAPIER_INIT_PATCH.unnotedOutputSha256)throw Error('RAPIER patched output mismatch'); // 輸出與已核因果實驗不同亦拒絕。
  const disclosedVendor=Buffer.concat([Buffer.from(RAPIER_MODIFICATION_NOTICE,'utf8'),vendor]); // 只前置註解，不改17byte wrapper或WASM。
  if(sha256(disclosedVendor)!==RAPIER_INIT_PATCH.outputSha256)throw Error('RAPIER disclosed output mismatch'); // 新通知/輸出漂移也在build寫入前拒絕。
  return {vendor:disclosedVendor,wasm,patchId:RAPIER_INIT_PATCH.id}; // 保持呼叫契約，使原build輸出同一已通知vendor。
} // 結束單一初始化參數修補。
