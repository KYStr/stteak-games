// Tide public-guide.2：只在自己新建的丟棄副本執行；不提供任意 WORK 或就地修改命令。
import assert from 'node:assert/strict'; // 使用標準斷言，不安裝工具。
import * as fs from 'node:fs/promises'; // 檔案只在預檢後讀取或寫入新工作區。
import path from 'node:path'; // 使用平台路徑，避免字串前綴誤判。
import { createHash } from 'node:crypto'; // 固定候選逐檔身份。
import { fileURLToPath, pathToFileURL } from 'node:url'; // 支援空白及中文路徑。
import { spawnSync } from 'node:child_process'; // 不經 shell 執行既有官方 build。
import { observe } from './buoy-observer.mjs'; // 純 CPU 觀察器，不寫入來源。

export const ID = 'tidebound-public-guide.2-20261029'; // 新指南身份，不沿用舊評分。
export const MANIFEST_SHA = 'f5615ffcaf88e3834b62ae1e544c045fd35286aa6ace82c201aa04653b59c477'; // 原 108 檔清單固定值。
const WORLD = 'games/tidebound/src/world.js'; // 唯一手寫內容修改點。
const BUNDLE = 'public/games/tidebound/game.js'; // 官方 build 唯一預期 byte 變更。
const ADD = "  { id: 'docs-demo-buoy', name: '擴充教學浮標', x: -12, z: 108, note: '只供隔離擴充練習；不加入正式交件。' },\n"; // 與原範例同一列。
const ANCHOR = 'export const OBSERVATIONS = [\n'; // 只接受原資料宣告。
const digest = bytes => createHash('sha256').update(bytes).digest('hex'); // 統一 SHA256。
const inside = (child, parent) => { const rel = path.relative(parent, child); return rel === '' || (rel !== '..' && !rel.startsWith('..' + path.sep) && !path.isAbsolute(rel)); }; // 正確處理根目錄、同名兄弟與不同磁碟。
const related = (a, b) => inside(a, b) || inside(b, a); // 寫入工作區不能與來源互為祖孫。

export function parseArgs(args) { // 嚴格選項，不接受隱含工作路徑。
  const out = {}; // 每次命令獨立設定。
  for (let i = 0; i < args.length; i++) { // 逐項解析，重複或未知均停止。
    const key = args[i]; // 只辨識下列明示參數。
    assert(['--source-root', '--deps', '--scratch-parent', '--check-only', '--run'].includes(key), `Unknown option: ${key}`); // 每個選項都須列入白名單。
    assert(!(key in out), `Duplicate option: ${key}`); // 不讓後項悄悄覆蓋。
    if (key === '--run' || key === '--check-only') out[key] = true; // 只讀預檢與實做分開。
    else { assert(args[i + 1] && !args[i + 1].startsWith('--'), `Missing value: ${key}`); out[key] = args[++i]; } // 缺值即停。
  }
  for (const key of ['--source-root', '--deps', '--scratch-parent']) assert(out[key], `Required: ${key}`); // 不猜來源或依賴。
  assert(Boolean(out['--run']) !== Boolean(out['--check-only']), 'Choose exactly one: --check-only or --run'); // 不預設執行。
  return out; // 僅有已驗選項。
}

async function directory(value) { // realpath 消除 ../ 與符號連結別名。
  const resolved = await fs.realpath(value); // 不建立不存在的來源或父目錄。
  assert((await fs.stat(resolved)).isDirectory(), `Not directory: ${value}`); // 要求真目錄。
  return resolved; // 後續保護全部用實際路徑。
}

async function fileSet(root, rel = '') { // 列出產品 slice，拒絕連結與特殊檔。
  const result = []; // 回傳相對檔案集合。
  for (const e of await fs.readdir(path.join(root, rel), { withFileTypes: true })) { // 不追隨來源子連結。
    const next = rel ? `${rel}/${e.name}` : e.name; // manifest 使用 POSIX 相對名稱。
    if (next === 'games/tidebound/node_modules') continue; // 外部既有依賴不屬原 108 檔。
    assert(!e.isSymbolicLink(), `Source symlink rejected: ${next}`); // 同 byte 連結也拒絕。
    if (e.isDirectory()) result.push(...await fileSet(root, next)); // 逐層檢查。
    else { assert(e.isFile(), `Special source file: ${next}`); result.push(next); } // 不接受裝置等。
  }
  return result.sort(); // 可重現集合比較。
}

async function verify(root, rows, expectedChanged = []) { // 同時核檔案集合及所有 byte。
  assert.deepEqual(await fileSet(root), rows.map(r => r.path).sort(), 'Source file-set mismatch'); // 缺檔／多檔都停止。
  const changed = []; // 記錄確切變動。
  for (const row of rows) { // 所有原始碼、測試及資產皆核 hash，不重跑它們。
    const bytes = await fs.readFile(path.join(root, row.path)); // 只讀。
    if (bytes.length !== row.bytes || digest(bytes) !== row.sha256) changed.push(row.path); // 大小及 hash 均要相符。
  }
  assert.deepEqual(changed.sort(), [...expectedChanged].sort(), 'Unexpected source changes'); // 不接受額外修改。
  return { files: rows.length, changed, status: 'PASS' }; // 技術結果不是評分。
}

export async function preflight(options) { // 所有來源身份與路徑檢查先於任何寫入。
  const sourceRoot = await directory(options['--source-root']); // 可傳可攜 package 根或其唯讀別名。
  const source = path.join(sourceRoot, 'source'); // 明確固定相對 layout。
  assert((await fs.lstat(source)).isDirectory(), 'source/ must be a real directory, not a symlink'); // 防來源子樹逃逸。
  const helperRoot = await directory(fileURLToPath(new URL('../../', import.meta.url))); // 保護目前指南包，而非舊機器路徑。
  const deps = await directory(options['--deps']); // 只使用呼叫者指定的現成依賴。
  const parent = await directory(options['--scratch-parent']); // 必須先存在的丟棄區父目錄。
  for (const protectedRoot of [sourceRoot, helperRoot, deps]) assert(!inside(parent, protectedRoot), 'Scratch parent is inside a protected source/helper/dependency root'); // 別名已消除。
  assert.equal(pathToFileURL(parent).pathname, parent, 'Scratch realpath needs URL encoding; unchanged official build requires a non-encoded work path'); // 原build使用URL.pathname；寫入前拒絕中文／空白／百分號等工作路徑。
  const manifestBytes = await fs.readFile(path.join(sourceRoot, 'evidence/original-source-manifest.json')); // 固定相對清單。
  assert.equal(digest(manifestBytes), MANIFEST_SHA, 'Wrong fixed source manifest identity'); // 不接受 caller 自定新 hash。
  const rows = JSON.parse(manifestBytes); // 只有固定清單通過後才解析。
  assert.equal(rows.length, 108); // 這份指南只對此產品 slice。
  for (const row of rows) assert(!path.isAbsolute(row.path) && !row.path.split('/').includes('..'), 'Unsafe manifest path'); // 防路徑穿越。
  await verify(source, rows); // 原始 source 必須全部相符。
  for (const [name, version] of [['three', '0.180.0'], ['esbuild', '0.25.10']]) { // 鎖定已有官方 build 依賴。
    assert.equal(JSON.parse(await fs.readFile(path.join(deps, name, 'package.json'), 'utf8')).version, version, `Wrong dependency: ${name}`); // 讀現成套件的精確版本，不下載替代。
  }
  return { sourceRoot, source, helperRoot, deps, parent, rows }; // 還沒有建立工作區或輸出。
}

export async function ownFile(work, source, relative) { // 純檢查器供guard自查；本身不寫檔。
  const target = path.join(work, relative); // 目標只能由已知相對檔組成。
  assert.equal(await fs.realpath(target), target, 'Work file alias rejected'); // 拒絕祖先或檔案 symlink。
  const targetStat = await fs.lstat(target), sourceStat = await fs.stat(path.join(source, relative)); // 比較實體檔案。
  assert(targetStat.isFile() && targetStat.nlink === 1, 'Work file must be a private regular copy'); // 拒絕硬連結。
  assert(!(targetStat.dev === sourceStat.dev && targetStat.ino === sourceStat.ino), 'Work/source inode identity rejected'); // 不能寫到來源 inode。
  return target; // 安全條件成立才允許寫入。
}

export async function run(args) { // 唯一會寫入的公開入口，無任意 add/restore 目的地。
  const options = parseArgs(args); // 程式呼叫也必須通過同一嚴格參數檢查。
  const context = await preflight(options); // 先核整份來源與父目錄。
  if (options['--check-only']) return { guideId: ID, mode: 'check-only', sourceFiles: 108, writes: 0 }; // 預檢保證不建立檔案。
  const { sourceRoot, source, helperRoot, deps, parent, rows } = context; // 使用 canonical 路徑。
  const base = await fs.mkdtemp(path.join(parent, 'tide-public-guide-')); // OS 原子、獨占新目錄，不重用使用者工作。
  await fs.chmod(base, 0o700); // 只允許本使用者進入一次性區。
  console.error(`New disposable workspace: ${base}`); // 即使後續失敗也能保留並定位現場。
  assert.equal(await fs.realpath(base), base, 'New scratch alias rejected'); // 實際新目錄不可被重導。
  for (const protectedRoot of [sourceRoot, helperRoot, deps]) assert(!related(base, protectedRoot), 'New scratch overlaps protected root'); // 工作與來源互斥。
  const work = path.join(base, 'work'), evidence = path.join(base, 'evidence'); // 寫入只留在這兩個新子目錄。
  await fs.mkdir(work); await fs.mkdir(evidence); // 不接受已存在目標。
  for (const row of rows) { // 逐byte新建，絕不使用硬連結複製。
    const bytes = await fs.readFile(path.join(source, row.path)); // 讀回原資料。
    assert.equal(digest(bytes), row.sha256, 'Source changed during copying'); // 預檢後變更也拒絕。
    const target = path.join(work, row.path); await fs.mkdir(path.dirname(target), { recursive: true }); // 僅建立新副本祖先。
    await fs.writeFile(target, bytes, { flag: 'wx' }); // 已有檔案絕不覆蓋。
  }
  const own = async rel => ownFile(work, source, rel); // 所有預期 build 寫入先驗為獨立檔案。
  for (const rel of [WORLD, BUNDLE, 'public/games/tidebound/index.html', 'public/games/tidebound/style.css', 'public/games/tidebound/THREE-LICENSE.txt']) await own(rel); // 先核所有既有官方build寫入檔都是獨立副本。
  await fs.cp(deps, path.join(work, 'games/tidebound/node_modules'), { recursive: true, dereference: true, force: false, errorOnExist: true }); // 複製現成受信任依賴，不安裝／不留回原源連結。
  const log = async (name, value) => fs.writeFile(path.join(evidence, name), typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n', { flag: 'wx' }); // 證據也不能覆蓋。
  await log('baseline-tree.json', await verify(work, rows)); // 起始 108 檔相同。
  const original = await fs.readFile(path.join(source, WORLD), 'utf8'); // 保留來源原文供精確回復。
  assert.equal(original.split(ANCHOR).length, 2, 'Wrong OBSERVATIONS anchor'); // 不猜修改位置。
  const expanded = original.replace(ANCHOR, ANCHOR + ADD); // 唯一一列擴充，與舊範例相同。
  await fs.writeFile(await own(WORLD), expanded); // 只寫獨占副本。
  const observation = await observe(work); await log('extended-observation.json', observation); // 只跑新增後一次正常規則輸入。
  const build = async name => { // 官方 build 在副本內執行，不經 shell。
    for (const rel of [WORLD, BUNDLE, 'public/games/tidebound/index.html', 'public/games/tidebound/style.css', 'public/games/tidebound/THREE-LICENSE.txt']) await own(rel); // 再驗寫入目的地。
    const result = spawnSync(process.execPath, ['build.mjs'], { cwd: path.join(work, 'games/tidebound'), encoding: 'utf8', timeout: 30000 }); // 同 package script node build.mjs。
    await log(name, (result.stdout || '') + (result.stderr || '')); // 無成功也保留真輸出。
    assert.equal(result.status, 0, `Official build failed: ${result.error?.message || result.signal || result.status}`); // 失敗立即停止，不動原源。
  };
  await build('extension-build.log'); await log('extended-tree.json', await verify(work, rows, [WORLD, BUNDLE])); // 只允許兩檔變動。
  assert.equal(await fs.readFile(await own(WORLD), 'utf8'), expanded, 'Unexpected exercise edits; stop instead of overwriting'); // 不強制覆蓋別人的改動。
  await fs.writeFile(await own(WORLD), original); await build('restore-build.log'); // 回復範例並重建副本輸出。
  await log('restored-tree.json', await verify(work, rows)); // 108 檔必須逐位元復原。
  await verify(source, rows); // 原源始檔也須仍全同。
  const result = { guideId: ID, mode: 'run', base, sourceFiles: 108, originalSourceUnchanged: true, restoredExact: true, normalInputRuns: 1, gui: 'NOT_RUN', qualityScore: null }; // 不冒稱 GUI 或分數。
  await log('RESULT.json', result); return result; // 只回傳新工作區，永不刪除或部署。
}

export async function isDirectEntry(argv1 = process.argv[1]) { // 只辨識真正入口，不呼叫parser或寫檔。
  if (argv1 === undefined) return false; // 純eval／無主檔名的import不自行執main。
  assert(typeof argv1 === 'string' && argv1.length > 0, 'Invalid CLI entry path'); // 未知型別或空名稱明示失敗。
  const requested = await fs.realpath(path.resolve(argv1)); // 解析真CLI路徑的相對／目錄symlink別名；ENOENT等錯誤不吞掉。
  const current = await fs.realpath(fileURLToPath(import.meta.url)); // 模組自身也轉實體路徑，兼容保留symlink的Node入口模式。
  return requested === current; // 其他真主檔import本模組時回false，絕不啟動指南。
}

try { // 入口辨識與真正CLI都採相同非零錯誤出口。
  if (await isDirectEntry()) console.log(JSON.stringify(await run(process.argv.slice(2)), null, 2)); // 只有實體入口相同才進嚴格parser/preflight。
} catch (error) { console.error(`STOP: ${error.message}`); process.exitCode = 1; } // 不把解析失敗或非法參數變成空白成功。
