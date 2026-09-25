import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const publications = JSON.parse(
  readFileSync(new URL('../data/publications.json', import.meta.url), 'utf8'),
);
void test('Scholar archive has 25 unique records and valid categories/links', () => {
  assert.equal(publications.length, 25);
  assert.equal(new Set(publications.map((p: { id: string }) => p.id)).size, 25);
  for (const p of publications) {
    assert.ok(p.title && p.authors && p.year);
    assert.match(p.url, /^https:\/\/scholar.google.com\/citations\?/);
    assert.ok(p.categories.length);
    for (const c of p.categories)
      assert.ok(
        ['stochastic', 'extremes', 'observation', 'social'].includes(c),
      );
  }
});
