# Validation — 2026-09-07

Passed:

- TypeScript checks, project-source lint, search/archive tests, production static export, and generated-page/link/asset checks.
- All 25 Scholar records rendered into HTML before JavaScript executes.
- All topic filters: 10 stochastic dynamics, 5 extreme events, 4 partial observations, 6 social dynamics; 25 in the full archive.
- Publication search with `electons`, no-result feedback, and reset controls.
- Global search with `stocastic`, `gated inference`, an email address, and homepage text.
- Search dialog keyboard shortcut, Escape dismissal, automatic input focus, and focus restoration.
- Keyboard tab navigation and Enter activation; topic selection survives a refresh.
- Research sections, research-to-filtered-archive links, and publication fragment links.
- Mobile menu, homepage, contact area, research page, publication archive; no horizontal overflow at 320 CSS pixels after fixing the header. Also inspected wider mobile and desktop layouts.
- Root-hosted output and a real local `/portfolio/` mount simulating GitHub project Pages; all route/asset checks pass for both. Canonical URLs were checked in the subpath build.
- Browser error log clean in final smoke check.

The preview uses the generated static files, not the development server. The GitHub Pages workflow runs the production build, automated checks, and deployment on pushes to main.

Lint excludes the supplied, unmodified component catalog and mobile hook. Publication data is a dated snapshot, not a live Scholar sync. External profiles may enforce their own login or anti-bot restrictions.
