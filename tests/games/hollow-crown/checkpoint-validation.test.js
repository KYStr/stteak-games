import test from 'node:test'; // 以Node單元測試核對checkpoint資料契約。
import assert from 'node:assert/strict'; // 使用嚴格斷言避免把NaN或型別轉換當成成功。
import { createRun, step, checkpoint, restoreRun, chooseReward, ENEMIES } from '../../../public/games/hollow-crown/rules.js'; // 直接測試正式規則實作。
import { SaveStore, SAVE_KEY, freshProfile } from '../../../public/games/hollow-crown/storage.js'; // 包含實際JSON及profile載入邊界。

function rewardCheckpoint(risk = 'steady') { // 沿既有force-clear方法建立受控獎勵節點，非自然通關。
  const state = createRun({ seed: 334455 }); state.roomRisk = risk; state.player.hp = 40; // 固定種子及受傷生命以驗證回復量。
  state.enemies.forEach(enemy => { enemy.hp = 0; enemy.state = 'dead'; }); state.pendingWaves = []; // 只在測試fixture完成目前房間。
  step(state, {}, .02); return checkpoint(state); // 保留正式產生的所有獎勵資料。
} // 結束獎勵checkpoint fixture。

function activeAttackCheckpoint(type = 'soldier', moveIndex = 0, phase = 1) { // 使用正式AI產生攻擊，不手寫假攻擊物件。
  const state = createRun({ seed: 334456 }); const spec = ENEMIES[type], enemy = { ...state.enemies[0] }; // 沿用完整敵人基礎欄位。
  Object.assign(enemy, { type, x: 0, z: 0, hp: spec.hp, maxHp: spec.hp, radius: spec.radius, state: 'approach', timer: 0, phase, moveIndex }); // 固定可出招的近距離局面。
  state.enemies = [enemy]; state.pendingWaves = []; Object.assign(state.player, { x: 0, z: 1.2, invuln: 100 }); // 距離須進入最短步兵的正式出招範圍，並隔離受傷干擾。
  step(state, {}, .02); assert.equal(enemy.state, 'telegraph'); state.entrySnapshot = null; // 此fixture刻意保存當前前搖，驗證合法active snapshot相容。
  return { state, enemy, save: () => checkpoint(state) }; // 同時測試前搖與正式落招快照。
} // 結束正式AI攻擊fixture。

test('checkpoint validation rejects corrupted rest amounts before they can produce NaN health', () => { // 直接回歸已重現的損壞休憩反例。
  for (const amount of ['broken', '32', null, false, {}, [], -1, 0, 31, 33, 46, Infinity, undefined]) { // 覆蓋錯型、缺值與未承諾回復量。
    const saved = rewardCheckpoint(); saved.run.rewardOptions.find(offer => offer.id === 'restore').amount = amount; // 僅破壞單一存檔欄位。
    assert.equal(restoreRun(saved), null, `corrupt rest amount ${String(amount)}`); // 必須由損壞降級路徑拒絕，而非容許NaN進戰鬥。
  } // 結束損壞休憩數值組。
}); // 結束休憩數值回歸。

test('checkpoint validation rejects swapped or missing reward kinds', () => { // 種類損壞不得把天賦誤當回血或反過來。
  for (const [kind, values] of [['heal', ['talent', null, undefined]], ['talent', ['heal', null, undefined]]]) { // 兩種正式offer各測缺值及錯型別語意。
    for (const value of values) { const saved = rewardCheckpoint(); const offer = saved.run.rewardOptions.find(item => item.kind === kind); offer.kind = value; assert.equal(restoreRun(saved), null); } // 每次只改一個種類。
  } // 結束兩種獎勵種類組。
}); // 結束獎勵種類回歸。

test('valid stored rest offers and legacy talent offers keep their original effects', () => { // 新驗證不得改正常或歷史獎勵語意。
  for (const [risk, amount] of [['steady', 32], ['perilous', 45]]) { // 兩種已承諾休憩量均可恢復。
    const restored = restoreRun(rewardCheckpoint(risk)); assert.ok(restored); assert.equal(chooseReward(restored, 'restore'), true); // 沿正式確認獎勵流程。
    assert.equal(restored.player.hp, 40 + amount); assert.equal(restored.phase, 'route'); assert.ok(restoreRun(checkpoint(restored))); // 生命與下一存檔仍合法。
    const legacy = rewardCheckpoint(risk); legacy.run.rewardOptions.forEach(offer => { delete offer.healAmount; }); // 保留歷史天賦未附帶回血欄位的相容性。
    const prior = restoreRun(legacy); assert.ok(prior); const talent = prior.rewardOptions.find(offer => offer.kind === 'talent'); // 讀取原存檔提供的有效天賦。
    assert.equal(chooseReward(prior, talent.id), true); assert.equal(prior.player.hp, 40); // 舊天賦不可憑新版本多發回血。
  } // 結束有效與legacy獎勵組。
}); // 結束合法獎勵相容回歸。

test('active enemy checkpoints reject missing attacks instead of crashing on step', () => { // 直接回歸Reviewer獨立確認的null攻擊崩潰。
  for (const state of ['telegraph', 'attack']) for (const attack of [null, undefined, false, 'broken', {}, []]) { // 前搖與落招都必須有有效攻擊物件。
    const saved = activeAttackCheckpoint().save(); Object.assign(saved.run.enemies[0], { state, attack, timer: .1 }); // 僅破壞已進入攻擊狀態的必要資料。
    assert.equal(restoreRun(saved), null, `${state} / ${String(attack)}`); // 不得讓step再讀取空projectiles而崩潰。
  } // 結束兩狀態的空攻擊組。
}); // 結束空攻擊回歸。

test('active enemy checkpoints reject malformed attack geometry, timing and projectile counts', () => { // 攻擊存在但必要數值損壞也必須降級。
  const corruptions = [attack => { attack.shape = 'unknown'; }, attack => { attack.damage = 'broken'; }, attack => { delete attack.activeTime; }, attack => { attack.recovery = null; }, attack => { attack.range = -1; }, attack => { attack.projectiles = '3'; }, attack => { attack.projectiles = -.5; }]; // 只測實際消費到的幾何、傷害、計時及彈數契約。
  for (const change of corruptions) { const saved = activeAttackCheckpoint().save(); change(saved.run.enemies[0].attack); assert.equal(restoreRun(saved), null); } // 每個fixture只改一個欄位。
}); // 結束壞攻擊物件回歸。

test('all real enemy and boss attacks remain restorable in both phases and active states', () => { // 防止修復硬編碼造成合法招式或第二階段失效。
  for (const [type, spec] of Object.entries(ENEMIES)) for (const phase of spec.boss ? [1, 2] : [1]) for (let move = 0; move < (spec.moves?.length || 1); move++) { // 覆蓋五敵與兩Boss每一招。
    const fixture = activeAttackCheckpoint(type, move, phase); const tell = restoreRun(fixture.save()); assert.ok(tell, `${type}/${move}/${phase} tell`); // 正式前搖快照必須可讀。
    while (fixture.enemy.state === 'telegraph') step(fixture.state, {}, .02); // 讓原AI自然跨越前搖進入落招。
    assert.equal(fixture.enemy.state, 'attack'); const attack = restoreRun(fixture.save()); assert.ok(attack, `${type}/${move}/${phase} active`); // 正式落招快照也必須可讀。
    assert.doesNotThrow(() => step(attack, {}, .02)); assert.equal(Number.isFinite(attack.player.hp), true); // 恢復後實際執行而不只比較物件。
  } // 結束全部正式招式相容組。
}); // 結束合法攻擊相容回歸。

test('serialized profile loading cannot admit corrupt reward or active-attack checkpoints', () => { // 覆蓋正式SaveStore與JSON路徑，不只函式直接呼叫。
  for (const corrupt of ['reward', 'attack']) { // 兩種已確認缺陷都經過profile保存格式。
    const profile = freshProfile(); profile.unlocked.push('kindling'); profile.settings.music = .15; // 建立應被保留的既有解鎖與偏好。
    const saved = corrupt === 'reward' ? rewardCheckpoint() : activeAttackCheckpoint().save(); // 使用正常schema的受控節點。
    if (corrupt === 'reward') saved.run.rewardOptions.find(offer => offer.id === 'restore').amount = 'broken'; else Object.assign(saved.run.enemies[0], { state: 'attack', attack: null, timer: .1 }); // 注入單一壞欄位／狀態配對。
    profile.checkpoint = { run: saved, runId: 'existing-run' }; const data = new Map([[SAVE_KEY, JSON.stringify(profile)]]); // 使用真正會跨頁重載的JSON資料。
    const store = new SaveStore({ getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }); const loaded = store.load(); // 不替換正式profile驗證。
    assert.equal(restoreRun(loaded.checkpoint.run), null); assert.ok(loaded.unlocked.includes('kindling')); assert.equal(loaded.settings.music, .15); // 拒絕當局不應刪除整份profile。
  } // 結束兩種完整資料路徑組。
}); // 結束profile資料路徑回歸。
