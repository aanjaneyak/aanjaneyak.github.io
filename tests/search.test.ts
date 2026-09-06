import test from 'node:test';
import assert from 'node:assert/strict';
import { fuzzyScore } from '../lib/search.ts';
import { readFileSync } from 'node:fs';
const publications = JSON.parse(
  readFileSync(new URL('../data/publications.json', import.meta.url), 'utf8'),
);
void test('fuzzy search tolerates misspellings, accents and multiple words', () => {
  assert.ok(fuzzyScore('stocastic', 'Stochastic processes') > 0);
  assert.ok(fuzzyScore('electons', 'Democratic elections') > 0);
  assert.ok(fuzzyScore('ocal', 'K Öcal') > 0);
  assert.ok(
    fuzzyScore('gated inference', 'Inference from gated first-passage times') >
      0,
  );
  assert.equal(fuzzyScore('quantum bananas', 'Stochastic processes'), 0);
  assert.equal(fuzzyScore('', 'anything'), 1);
});
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
