import { readFile, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.BASE_PATH || '';
for (const route of ['', 'research/', 'publications/']) {
  const html = await readFile(`dist/client/${route}index.html`, 'utf8');
  assert.match(html, /<h1/);
  assert.match(html, /<meta name="description"/);
  assert.ok(!html.includes('Untitled site'));
  if (route === 'publications/')
    assert.equal((html.match(/class="pub-item"/g) || []).length, 25);
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (!url.startsWith('/') || url.startsWith('//')) continue;
    assert.ok(url.startsWith(base + '/'), `URL missing base path: ${url}`);
    let local = url.slice(base.length).split(/[?#]/)[0];
    if (local.endsWith('/')) local += 'index.html';
    await access('dist/client' + local);
  }
  console.log(
    `PASS ${base}/${route}: static content, metadata, local links and assets`,
  );
}
