import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const data = JSON.parse(await readFile(new URL('../fixtures/domain-materials.json', import.meta.url), 'utf8'));
test('领域资料保留合成来源、业务约定和互相关联的表', () => {
  assert.match(data.source_note, /合成/);
  assert.ok(data.contract.length > 100);
  assert.ok(Object.keys(data.tables).length >= 7);
  for (const [name, records] of Object.entries(data.tables)) {
    assert.ok(records.length >= 2, name + ' 资料不足');
    assert.ok(records.every(record => Object.keys(record).length >= 2), name + ' 缺字段');
  }
});
