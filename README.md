# Aanjaneya Kumar — portfolio

Three independently rendered static pages: Home, Research, and Publications. Restrained purple accents and sans-serif typography, responsive layouts, accessible category tabs, and a keyboard-accessible fuzzy search dialog (⌘K / Ctrl+K). Built with React, Vinext and the supplied Base UI components.

## Development

Requires Node 22.13+.

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm run typecheck
npm test
npm run build
npm run check:static
```

The deployable website is `dist/client`. The finalizer produces directory index pages, a 404 page, `.nojekyll`, and robots.txt. Set `SITE_URL` to the full public website URL (including a repository subpath when applicable) to generate canonical URLs and sitemap.xml. Set `BASE_PATH` to the repository path, such as `/portfolio`, for a GitHub project site. Leave it empty for a root site or custom domain.

```sh
BASE_PATH=/portfolio SITE_URL=https://YOUR-ACCOUNT.github.io/portfolio npm run build
BASE_PATH=/portfolio npm run check:static
```

## GitHub Pages deployment

Push this folder to your GitHub repository's `main` branch and select **Settings → Pages → Source → GitHub Actions**. The included workflow builds, validates, and deploys the static output. It automatically reads the correct base path and URL from GitHub Pages, including custom-domain configurations. No backend or special redirect rules are needed. Repository: https://github.com/ritams/aanj-portfolio

GitHub Pages: https://ritampal.com/aanj-portfolio/

## Content

- `lib/content.ts`: biography, research directions, social links.
- `data/publications.json`: all 25 entries returned by the supplied Google Scholar profile on 2026-09-07, with titles, authors, venues, years, and original citation URLs. The one author list abbreviated by Scholar remains abbreviated. The archive intentionally follows Scholar rather than counting duplicate preprint/journal versions from ResearchGate.
- `docs/sources.md`: provenance and content notes.
- `app/globals.css`: shared visual design and responsive rules.

To update the archive, edit the JSON and keep each `id` stable so existing links remain valid. Topics are editorial categories and can overlap. Nothing is fetched from Scholar at runtime, so search and filtering need no third-party service.
