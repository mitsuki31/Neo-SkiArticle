# Changelogs

## [v1.2.2] (07-12-2025)

### Security

- \[[NEOSKI-17]\] Address security vulnerability [CVE-2025-55182]

## [v1.2.1] (04-12-2025)

### Maintenances

- \[[NEOSKI-15]\] Split CodeQL build into dedicated job, tidy workflow

### Security

- \[[NEOSKI-14]\] Bump mdast-util-to-hast from 13.2.0 to 13.2.1
  - Fixes security report [CVE-2025-66400]

## [v1.2.0] (01-12-2025)

### New Features

- Added **Sejarah Sekolah** article.
- Added **TikTok official link** to footer and menus.
- Added **article creation dates** to all articles.
- Added new **root layout** for consistent titles and background.
- Added **TailwindCSS icon** to “Built with”.
- Added **serial queue** for Instagram embeds, improving performance and stability.
- Added **script loader utilities** with caching and retry support.
- Protect users' privacy by introducing `<ExternalLink>` component for safer external navigation.
- Added `SimpleLangSwitch` component and utilities for language parsing (`parseQueryLang`).
- Added Code of Conduct, Privacy, and Security Policy pages and `security.txt`.
- Added `robots.txt` and auto-generated `sitemap.xml` for crawlers.

### UI/UX Improvements

- “Tentang” navigation menu renamed to **“Histori”** (links to `/a/sejarah-sekolah`).
- Renamed article slug: `pelatihan-vokasi-2025` → **`analisis-vokasi-2025`**.
- Instagram embed script loader removed in favor of the new unified loader with retry/backoff.
- Better handling of Instagram embeds (queue + retry + loader + fallback).
- Navigation logic moved out of `Header` into `Navbar.tsx`.
- Updated school main website URL and global URLs list.
- Homepage layout updated with better gradients, spacing, and centered featured articles.
- Featured articles now support **custom column span** on large screens.
- Navigation bar redesigned with improved animations and gradient background on hover; mobile and desktop behaviour refined.
- Hero section height adjusted and visual clarity improved.
- TOC appearance improved: better spacing and active item highlight with orange right border.
- Mobile TOC now locks page scroll (iOS supported) using `useScrollLock` hook.
- Improved article loader and integrated `unified` parser utilities (`unify`, remark plugins).
- Improved header banner and footer link hover effects and layout.
- \[[NEOSKI-12]\] Improved website SEO and accessibility

### Security

- Added Security Policy documentation and `security.txt`.
- Added issue template for security reports.
- Updated `vercel.json` and CSP header settings to tighten **Content Security Policy** (CSP) — adjusted to account for external embeds and safe script loading.
- Added `ExternalLink` component to enforce `rel="noopener noreferrer"` for outbound links.
- \[[NEOSKI-9]\] Replace `front-matter` with `hexo-front-matter` to address [CVE-2025-64718]

### Maintenances

- Moved articles to `src/articles` and refactored article utilities.
- Unified home articles into a single `home/index.md` while preserving authors.
- Synchronized `package-lock.json`, added `bun.lock` for alternative runtime support.
- Updated ESLint to ignore shadcn components where necessary.
- Added CodeQL CI workflow for repository scanning.

---

## [v1.0.1] (30-10-2025)

### Security

- \[[NEOSKI-3]\] Bump `vite` from **6.3.5** to **6.4.1** ([CVE-2025-62522], [CVE-2025-58752], [CVE-2025-58751])

---

## [v1.0.0] (23-05-2025)

- Initial release

---

<!-- Pull Requests -->

[NEOSKI-17]: https://github.com/mitsuki31/Neo-SkiArticle/pull/17
[NEOSKI-15]: https://github.com/mitsuki31/Neo-SkiArticle/pull/15
[NEOSKI-14]: https://github.com/mitsuki31/Neo-SkiArticle/pull/14
[NEOSKI-12]: https://github.com/mitsuki31/Neo-SkiArticle/pull/12
[NEOSKI-9]: https://github.com/mitsuki31/Neo-SkiArticle/pull/9
[NEOSKI-3]: https://github.com/mitsuki31/Neo-SkiArticle/pull/3

<!-- Security Advisories -->

[CVE-2025-55182]: https://github.com/advisories/GHSA-fv66-9v8q-g76r
[CVE-2025-66400]: https://github.com/advisories/GHSA-4fh9-h7wg-q85m
[CVE-2025-64718]: https://github.com/advisories/GHSA-mh29-5h37-fv8m
[CVE-2025-62522]: https://github.com/advisories/GHSA-93m4-6634-74q7
[CVE-2025-58752]: https://github.com/advisories/GHSA-jqfw-vq24-v9c3
[CVE-2025-58751]: https://github.com/advisories/GHSA-g4jq-h2w9-997c

<!-- Version Tags -->

[v1.2.2]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.0.1...v1.2.0
[v1.0.1]: https://github.com/mitsuki31/Neo-SkiArticle/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/mitsuki31/Neo-SkiArticle/compare/5b823de42e4cb47b0381bd68696d5debe23046dd...v1.0.0

