// Hollow Crown 1.0 — deterministic, editable content. Units: metres / seconds.
export const RULE_VERSION = 1;
export const ARENA = { min: -9.5, max: 9.5, playerRadius: 0.43 };
export const ROOMS = [
  { id: 'oath-court', name: '誓約庭', theme: 'ivory', description: '寬闊庭院；石柱能截斷弩矢。', obstacles: [{ x: -4, z: -2, r: .8 }, { x: 4, z: 2, r: .8 }], roster: ['soldier', 'soldier', 'crossbow'], extra: ['spear', 'soldier'] },
  { id: 'ember-forge', name: '餘燼鍛場', theme: 'ember', description: '繞行冷卻爐，避免被爆燃蟲包圍。', obstacles: [{ x: 0, z: 0, w: 2.3, d: 2.3 }, { x: -6, z: 4, r: .7 }], roster: ['soldier', 'beetle', 'beetle', 'crossbow'], extra: ['shield', 'soldier'] },
  { id: 'silent-cloister', name: '緘默迴廊', theme: 'ivory', description: '雙列石柱；瞄準時留意槍尖的路徑。', obstacles: [{ x: -3.6, z: -3, r: .7 }, { x: 3.6, z: -3, r: .7 }, { x: -3.6, z: 3, r: .7 }, { x: 3.6, z: 3, r: .7 }], roster: ['spear', 'spear', 'crossbow', 'soldier'], extra: ['beetle', 'shield'] },
  { id: 'broken-archive', name: '斷頁書庫', theme: 'ash', description: '斷牆分隔戰線；從盾衛側後方刺擊。', obstacles: [{ x: -4, z: 0, w: 1, d: 5 }, { x: 4, z: 0, w: 1, d: 5 }], roster: ['shield', 'soldier', 'crossbow', 'beetle'], extra: ['spear', 'crossbow'] },
  { id: 'rain-cistern', name: '雨痕蓄池', theme: 'blue', description: '中央柱群逼迫移位，保持長槍距離。', obstacles: [{ x: 0, z: -3, r: 1 }, { x: 0, z: 3, r: 1 }, { x: -5, z: 0, r: .7 }, { x: 5, z: 0, r: .7 }], roster: ['spear', 'shield', 'beetle', 'crossbow'], extra: ['soldier', 'spear'] },
  { id: 'ash-garden', name: '灰燼花園', theme: 'ember', description: '低矮祭壇可擋箭；花園外緣留有迴旋空間。', obstacles: [{ x: -3, z: -1, w: 2, d: 2 }, { x: 3, z: 1, w: 2, d: 2 }], roster: ['beetle', 'beetle', 'shield', 'spear'], extra: ['crossbow', 'soldier'] },
];
export const TUTORIAL_ROOM = { id: 'tutorial', name: '守誓者的試煉', theme: 'ivory', obstacles: [{ x: -5, z: 0, r: .8 }], description: '移動、刺擊、閃避，最後反擊教官。' };
export const BOSS_ROOM = { id: 'crown-arena', name: '無王之座', theme: 'crown', description: '王座守衛出招時正面護甲減輕刺傷；繞背、蓄力或等待招後破綻。', obstacles: [{ x: -6.2, z: -2, r: .65 }, { x: 6.2, z: -2, r: .65 }] };
export const ROUTES = [
  { id: 'ash', name: '熾燼王道', boss: 'regent', bossName: '熾燼攝政', description: '讀取大範圍斬擊與外環火圈，逼近核心。' },
  { id: 'ivory', name: '象牙誓路', boss: 'arbiter', bossName: '象牙審判者', description: '橫移閃過長槍與散射，抓住審判後的空檔。' },
];
export const DIFFICULTIES = [
  { id: 'pilgrim', name: '行旅', description: '傷害降低 30%，反擊窗口較寬。', enemyDamage: .7, enemyHp: .9, parryWindow: .32 },
  { id: 'standard', name: '守誓', description: '原始戰鬥節奏，靠讀招與距離取勝。', enemyDamage: 1, enemyHp: 1, parryWindow: .22 },
];
export const CHALLENGES = [
  { id: 'normal', name: '歸還王冠', description: '自由選擇天賦，擊敗路線的王座守衛。' },
  { id: 'unbroken', name: '無傷誓約', description: '以至少一間無傷房完成一局；受傷仍可繼續練習。' },
  { id: 'single-school', name: '一脈餘燼', description: '本局只出現你起始天賦所屬流派的獎勵。' },
  { id: 'daily', name: '同種子試煉', description: '固定種子 271828；比較相同局面中的技術進步。', seed: 271828 },
];
// Modifiers are combined once when equipment changes; the combat loop consumes numeric stats.
export const TALENTS = [
  { id: 'fleet-ash', name: '踏灰', school: 'mobility', description: '移動速度 +14%。', modifiers: { moveMultiplier: 1.14 } },
  { id: 'long-stride', name: '遠行', school: 'mobility', description: '閃避距離 +22%，消耗降低 5。', modifiers: { dodgeMultiplier: 1.22, dodgeCost: -5 } },
  { id: 'returning-wind', name: '歸風', school: 'mobility', description: '閃避後 1.5 秒內下一刺傷害 +35%。', modifiers: { afterDodgeBonus: .35 } },
  { id: 'deep-breath', name: '長息', school: 'mobility', description: '能量恢復 +35%，上限 +20。', modifiers: { regenMultiplier: 1.35, maxEnergy: 20 } },
  { id: 'wide-oath', name: '寬誓', school: 'counter', description: '精準格擋時窗 +100 毫秒。', modifiers: { parryWindow: .1 } },
  { id: 'thorn-vow', name: '荊誓', school: 'counter', description: '反擊傷害 +55%。', modifiers: { counterMultiplier: 1.55 } },
  { id: 'steady-guard', name: '磐石', school: 'counter', description: '一般格擋承受傷害減半。', modifiers: { blockMultiplier: .5 } },
  { id: 'mercy-ember', name: '赦燼', school: 'counter', description: '成功反擊恢復 3 生命；每 3 秒一次。', modifiers: { parryHeal: 3 } },
  { id: 'kindling', name: '引火', school: 'burn', description: '刺擊使目標燃燒 3 秒，每秒 5 傷害。', modifiers: { burnDamage: 5 } },
  { id: 'coal-heart', name: '煤心', school: 'burn', description: '蓄力刺傷害 +30%，消耗增加 5。', modifiers: { chargeMultiplier: 1.3, chargeCost: 5 } },
  { id: 'furnace-tip', name: '爐尖', school: 'burn', description: '對燃燒中的目標造成額外 25% 傷害。', modifiers: { burningBonus: .25 } },
  { id: 'last-light', name: '末光', school: 'burn', description: '生命低於 40% 時刺擊傷害 +30%。', modifiers: { lowHpBonus: .3 } },
];
export const STARTING_TALENTS = [
  { ...TALENTS[0], unlock: '初始可用', requirement: 'default' },
  { ...TALENTS[4], unlock: '初始可用', requirement: 'default' },
  { ...TALENTS[8], unlock: '完成一間房', requirement: 'room' },
  { ...TALENTS[1], unlock: '完成一間無傷房', requirement: 'flawless' },
  { ...TALENTS[5], unlock: '累積 3 次成功反擊', requirement: 'parry' },
  { ...TALENTS[9], unlock: '擊敗任一王座守衛', requirement: 'win' },
];
export const STORIES = [
  { id: 'letter', title: '沒有寄出的信', text: '一封焦黑的家書仍握在倒下守衛手裡。王冠要求你立刻前進。', choices: [{ id: 'remember', name: '記住他的名字', text: '你將名字刻在槍柄上。' }, { id: 'carry', name: '帶信回家', text: '你把信收在胸甲內，留下歸途的理由。' }] },
  { id: 'brazier', title: '最後的火盆', text: '火盆只剩一塊煤。遠處傳來無名者的腳步。', choices: [{ id: 'share', name: '留下火種', text: '你不曾見過受惠的人，但黑暗少了一點。' }, { id: 'shelter', name: '築起避風石', text: '石塊護住火焰，正如盾曾護住你。' }] },
  { id: 'crown', title: '王冠的重量', text: '無王之座就在前方。你可以繼承這份權力，也可以結束它。', choices: [{ id: 'return', name: '將冠歸還灰燼', text: '你不再替沉默的王座守夜。' }, { id: 'guard', name: '替無名者守望', text: '你選擇守護仍會呼吸的人。' }] },
];
export const ENDINGS = {
  return: '你把餘燼之冠放回冷卻的火盆。第一縷晨光穿過無王之座；這一次，守衛可以回家。',
  guard: '你沒有戴上王冠。你把長槍立在門前，等待歸來的人。新的誓言，不再屬於王。',
  default: '王冠落地，餘火未熄。你拾起長槍走入晨光，將名字與故事帶回仍有人生活的地方。',
};
export const ENEMIES = {
  soldier: { name: '灰衣步兵', hp: 60, speed: 1.9, radius: .48, reach: 1.75, damage: 17, windup: .68, recover: .8, shape: 'cone', angle: 1.15, material: 'flesh' },
  spear: { name: '失誓槍衛', hp: 75, speed: 1.55, radius: .48, reach: 3.55, damage: 23, windup: .82, recover: .95, shape: 'line', width: .8, material: 'armor' },
  crossbow: { name: '燼弩手', hp: 46, speed: 1.3, radius: .42, reach: 12, damage: 16, windup: 1.1, recover: 1.5, shape: 'line', width: .5, ranged: true, material: 'flesh' },
  beetle: { name: '爆燃蟲', hp: 36, speed: 2.1, radius: .4, reach: 2.35, damage: 24, windup: 1.05, recover: 1.2, shape: 'circle', material: 'shell' },
  shield: { name: '覆面盾衛', hp: 95, speed: 1.2, radius: .6, reach: 2.15, damage: 23, windup: .9, recover: 1.05, shape: 'cone', angle: 1.4, material: 'shield', shield: true },
  regent: { name: '熾燼攝政', hp: 1250, speed: 1.45, radius: .9, reach: 4, damage: 27, windup: 1.1, recover: 1.5, material: 'armor', boss: true, moves: [
    { id: 'royal-sweep', name: '王權橫掃', shape: 'cone', range: 4.7, angle: 2.25, windup: 1.05, recover: 1.25, damage: 27 },
    { id: 'cinder-fall', name: '墜燼', shape: 'circle', radius: 3.2, range: 3.2, windup: 1.3, recover: 1.6, damage: 31, targeted: true },
    { id: 'crown-ring', name: '焚冠外環', shape: 'ring', radius: 8.2, innerRadius: 3.1, range: 8.2, windup: 1.55, recover: 1.8, damage: 29 },
  ] },
  arbiter: { name: '象牙審判者', hp: 1150, speed: 1.65, radius: .86, reach: 5, damage: 26, windup: .95, recover: 1.3, material: 'armor', boss: true, moves: [
    { id: 'sentence', name: '裁決直刺', shape: 'line', range: 8.5, width: 1.25, windup: .95, recover: 1.15, damage: 28 },
    { id: 'edict', name: '三重敕令', shape: 'line', range: 13, width: .55, windup: 1.3, recover: 1.4, damage: 20, projectiles: 3 },
    { id: 'pale-verdict', name: '蒼白終審', shape: 'circle', radius: 4.2, range: 4.2, windup: 1.45, recover: 1.65, damage: 32 },
  ] },
};
