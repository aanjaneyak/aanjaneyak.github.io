import {
  readFile,
  writeFile,
  mkdir,
  copyFile,
  access,
  readdir,
} from 'node:fs/promises';
const out = 'dist/client';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const origin = process.env.SITE_URL?.replace(/\/$/, '');
// Vinext's beta exporter does not prerender basePath routes correctly.
// Export at the root, then prefix asset URLs for the static hosting mount.
async function prefixAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) await prefixAssets(path);
    else if (/\.(html|rsc|js|css|json)$/.test(entry.name)) {
      const text = await readFile(path, 'utf8');
      await writeFile(
        path,
        text
          .replaceAll('/_next/', `${base}/_next/`)
          .replaceAll('/favicon.svg', `${base}/favicon.svg`),
      );
    }
  }
}
if (base) await prefixAssets(out);
for (const route of ['research', 'publications']) {
  const source = `${out}/${route}.html`;
  try {
    await access(source);
    await mkdir(`${out}/${route}`, { recursive: true });
    await copyFile(source, `${out}/${route}/index.html`);
  } catch {
    await access(`${out}/${route}/index.html`);
  }
}
for (const route of ['', 'research/', 'publications/']) {
  const file = `${out}/${route}index.html`;
  let html = await readFile(file, 'utf8');
  if (origin) {
    const canonical = origin + (route ? '/' + route : '/');
    html = html.replace(
      '</head>',
      `<link rel="canonical" href="${canonical}"/><meta property="og:url" content="${canonical}"/></head>`,
    );
  }
  if (!html.includes('rel="icon"'))
    html = html.replace(
      '</head>',
      `<link rel="icon" href="${base}/favicon.svg" type="image/svg+xml"/></head>`,
    );
  await writeFile(file, html);
}
await writeFile(`${out}/.nojekyll`, '');
await writeFile(
  `${out}/robots.txt`,
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
);
if (origin)
  await writeFile(
    `${out}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/research/', '/publications/'].map((path) => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`,
  );
await writeFile(
  `${out}/404.html`,
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found — Aanjaneya Kumar</title><body style="font:18px/1.7 Arial,Helvetica,sans-serif;max-width:600px;margin:15vh auto;padding:24px;color:#29242e;background:#fdfcfe"><p style="color:#704298">404</p><h1>Page not found</h1><p>The requested page could not be found.</p><a href="${base}/" style="color:#704298">Return to the homepage →</a></body></html>`,
);
console.log('Static pages prepared for GitHub Pages.');
