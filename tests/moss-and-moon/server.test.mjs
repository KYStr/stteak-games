import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const modulePath = new URL('./server.mjs',import.meta.url).href;
const probe = value => spawnSync(process.execPath,['--input-type=module','-e',
  `const {port,base}=await import(${JSON.stringify(modulePath)}); console.log(JSON.stringify({port,base}));`],
  {encoding:'utf8',env:{...process.env,MOSS_PORT:value}});
test('Moss browser harness rejects invalid explicit ports before startup',()=>{
  for(const value of ['', '0','65536','-1','3.5',' 8104','abc']) {
    const result=probe(value);
    assert.notEqual(result.status,0,value);
    assert.match(result.stderr,/MOSS_PORT must be an integer/);
  }
});
test('Moss browser harness uses the supplied validated port for its URL',()=>{
  const result=probe('8124');
  assert.equal(result.status,0);
  assert.deepEqual(JSON.parse(result.stdout),{port:8124,base:'http://127.0.0.1:8124/games/moss-and-moon/'});
});
