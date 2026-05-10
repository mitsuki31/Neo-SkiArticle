# Changelogs

## [v1.2.5] (10-05-2026)

### Security

- \[[NEOSKI-35]\] build(deps): Audit and patch vulnerable dependencies
  - Addresses security vulnerabilities: [CVE-2025-69873], [CVE-2026-33750], [CVE-2026-33532]
- \[[NEOSKI-34]\] build(deps): Bump picomatch
  - Addresses security vulnerabilities: [CVE-2026-33672]
- \[[NEOSKI-33]\] build(deps-dev): Bump postcss from 8.5.3 to 8.5.14
  - Addresses security vulnerabilities: [CVE-2026-41305]
- \[[NEOSKI-32]\] build(deps): Bump dompurify from 3.3.2 to 3.4.0
  - Addresses security vulnerabilities: [CVE-2026-41238], [CVE-2026-41239], [CVE-2026-41240]
- \[[NEOSKI-31]\] build(deps-dev): Bump vite from 6.4.1 to 6.4.2
  - Addresses security vulnerabilities: [CVE-2026-39363]

### Maintenances

- \[[NEOSKI-36]\] chore(sitemap): Improve sitemap generation flow

## [v1.2.4] (20-03-2026)

### Security

- \[[NEOSKI-29]\] build(deps-dev): Bump flatted from 3.3.3 to 3.4.2
  - Fixes security report [CVE-2026-33228], [CVE-2026-32141]
- \[[NEOSKI-28]\] build(deps): Bump dompurify from 3.2.5 to 3.3.2
  - Fixes security report [CVE-2026-31802], [CVE-2026-29786]
- \[[NEOSKI-27]\] build(deps-dev): Bump tar from 7.5.9 to 7.5.11
  - Fixes security report [CVE-2026-0540]

## [v1.2.3] (27-02-2026)

### Security

- \[[NEOSKI-25]\] build(deps): Bump minimatch
  - Fixes security report [CVE-2026-27903], [CVE-2026-27904], [CVE-2026-26996]
- \[[NEOSKI-24]\] build(deps): Bump rollup from 4.40.0 to 4.59.0
  - Fixes security report [CVE-2026-27606]
- \[[NEOSKI-23]\] build(deps-dev): Bump tar from 7.4.3 to 7.5.9
  - Fixes security report [CVE-2026-23950], [CVE-2026-23745]
- \[[NEOSKI-19]\] build(deps): Bump react-router and react-router-dom
  - Fixes security report [CVE-2025-59057], [CVE-2026-21884]

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

[NEOSKI-36]: https://github.com/mitsuki31/Neo-SkiArticle/pull/36
[NEOSKI-35]: https://github.com/mitsuki31/Neo-SkiArticle/pull/35
[NEOSKI-34]: https://github.com/mitsuki31/Neo-SkiArticle/pull/34
[NEOSKI-33]: https://github.com/mitsuki31/Neo-SkiArticle/pull/33
[NEOSKI-32]: https://github.com/mitsuki31/Neo-SkiArticle/pull/32
[NEOSKI-31]: https://github.com/mitsuki31/Neo-SkiArticle/pull/31
[NEOSKI-29]: https://github.com/mitsuki31/Neo-SkiArticle/pull/29
[NEOSKI-28]: https://github.com/mitsuki31/Neo-SkiArticle/pull/28
[NEOSKI-27]: https://github.com/mitsuki31/Neo-SkiArticle/pull/27
[NEOSKI-25]: https://github.com/mitsuki31/Neo-SkiArticle/pull/25
[NEOSKI-24]: https://github.com/mitsuki31/Neo-SkiArticle/pull/24
[NEOSKI-23]: https://github.com/mitsuki31/Neo-SkiArticle/pull/23
[NEOSKI-19]: https://github.com/mitsuki31/Neo-SkiArticle/pull/19
[NEOSKI-17]: https://github.com/mitsuki31/Neo-SkiArticle/pull/17
[NEOSKI-15]: https://github.com/mitsuki31/Neo-SkiArticle/pull/15
[NEOSKI-14]: https://github.com/mitsuki31/Neo-SkiArticle/pull/14
[NEOSKI-12]: https://github.com/mitsuki31/Neo-SkiArticle/pull/12
[NEOSKI-9]: https://github.com/mitsuki31/Neo-SkiArticle/pull/9
[NEOSKI-3]: https://github.com/mitsuki31/Neo-SkiArticle/pull/3

<!-- Security Advisories -->

[CVE-2026-41305]: https://github.com/advisories/GHSA-qx2v-qp2m-jg93
[CVE-2026-41240]: https://github.com/advisories/GHSA-h7mw-gpvr-xq4m
[CVE-2026-41239]: https://github.com/advisories/GHSA-crv5-9vww-q3g8
[CVE-2026-41238]: https://github.com/advisories/GHSA-v9jr-rg53-9pgp
[CVE-2026-39363]: https://github.com/advisories/GHSA-p9ff-h696-f583
[CVE-2026-33750]: https://github.com/advisories/GHSA-f886-m6hf-6m8v
[CVE-2026-33672]: https://github.com/advisories/GHSA-3v7f-55p6-f55p
[CVE-2026-33532]: https://github.com/advisories/GHSA-48c2-rrv3-qjmp
[CVE-2026-33228]: https://github.com/advisories/GHSA-rf6f-7fwh-wjgh
[CVE-2026-32141]: https://github.com/advisories/GHSA-25h7-pfq9-p65f
[CVE-2026-31802]: https://github.com/advisories/GHSA-9ppj-qmqm-q256
[CVE-2026-29786]: https://github.com/advisories/GHSA-qffp-2rhf-9h96
[CVE-2026-0540]: https://github.com/advisories/GHSA-v2wj-7wpq-c8vv
[CVE-2026-26996]: https://github.com/advisories/GHSA-3ppc-4f35-3m26
[CVE-2026-27904]: https://github.com/advisories/GHSA-23c5-xmqv-rm74
[CVE-2026-27903]: https://github.com/advisories/GHSA-7r86-cg39-jmmj
[CVE-2026-23950]: https://github.com/advisories/GHSA-r6q2-hw4h-h46w
[CVE-2026-23745]: https://github.com/advisories/GHSA-8qq5-rm4j-mr97
[CVE-2026-21884]: https://github.com/advisories/GHSA-8v8x-cx79-35w7

[CVE-2025-69873]: https://github.com/advisories/GHSA-2g4f-4pwh-qvx6
[CVE-2025-59057]: https://github.com/advisories/GHSA-3cgp-3xvw-98x8
[CVE-2025-55182]: https://github.com/advisories/GHSA-fv66-9v8q-g76r
[CVE-2025-66400]: https://github.com/advisories/GHSA-4fh9-h7wg-q85m
[CVE-2025-64718]: https://github.com/advisories/GHSA-mh29-5h37-fv8m
[CVE-2025-62522]: https://github.com/advisories/GHSA-93m4-6634-74q7
[CVE-2025-58752]: https://github.com/advisories/GHSA-jqfw-vq24-v9c3
[CVE-2025-58751]: https://github.com/advisories/GHSA-g4jq-h2w9-997c

<!-- Version Tags -->

[v1.2.5]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.4...v1.2.5
[v1.2.4]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.3...v1.2.4
[v1.2.3]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.2...v1.2.3
[v1.2.2]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.1...v1.2.2
[v1.2.1]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.2.0...v1.2.1
[v1.2.0]: https://github.com/mitsuki31/Neo-SKiArticle/compare/v1.0.1...v1.2.0
[v1.0.1]: https://github.com/mitsuki31/Neo-SkiArticle/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/mitsuki31/Neo-SkiArticle/compare/5b823de42e4cb47b0381bd68696d5debe23046dd...v1.0.0
