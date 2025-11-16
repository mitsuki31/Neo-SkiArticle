# Security Policy

| | |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project**    | Neo-SkiArticle                                                                                                                                          |
| **Stack**      | [Vite] • [React] • [TailwindCSS]                                                                                                                        |
| **Deployment** | [Vercel] (*static site*)                                                                                                                                |
| **Scope**      | Public website source, CI/CD pipeline, repository configuration, and HTTP response headers applied at the edge.                                         |
| **Purpose**    | Define responsibilities, operational controls, and the exact header configuration used to protect the site while allowing approved social media embeds. |

---

## Executive Summary

**NeoSKI** (Neo-SkiArticle) is a static, client-rendered website deployed from the latest verified build. This policy documents the security controls that preserve the integrity and availability of the site, reduce risk from third-party content, and provide a clear operational procedure for incidents. The authoritative header configuration is maintained in `vercel.json` and must be validated after each deployment.

---

## 1. Responsibilities

- **Maintainer / Developer** — Maintain source integrity (code reviews, dependency updates), manage `vercel.json`, perform post-deploy verification, and lead incident response.
- **CI/CD (Vercel)** — Executes builds and serves assets from the edge; maintainers are responsible for its secure configuration (secrets, tokens).
- **Contributors / Reporters** — Submit vulnerability reports via `security.txt` using the provided contact channel; follow responsible disclosure.

---

## 2. Access and Secrets

- Enforce least privilege for repository access.
- Require strong passwords and multi-factor authentication (MFA) on all accounts with repo or deployment privileges.
- Store all secrets (tokens, keys) in **GitHub Secrets** or **Vercel Environment Variables** — never in source control.
- Rotate deployment/build secrets periodically and immediately after personnel change or suspected compromise.

---

## 3. Dependency Management

- Monitor dependencies with automated tooling ([Dependabot] or equivalent).
- Triage and remediate high/critical vulnerabilities promptly; document mitigations if immediate patching is not feasible.
- Document the supported runtime and build toolchain (Node version, Vite version, bundler config) in the repository for reproducibility.

---

## 4. Infrastructure and Configuration

- Enforce TLS for all traffic ([Vercel] provides HTTPS by default).
- No server-side processing of user data on this site; no persistent user data is stored.
- HTTP headers are applied at the CDN/edge layer via `vercel.json`. The header configuration in that file is authoritative; updates to headers must be committed and reviewed.

---

## 5. Deployment, Verification, and Rollback

- All changes must pass code review and automated CI checks before merging to the production branch.
- [Vite] generates static assets; [Vercel] deploys the build.
- Each deployment must be verified:
  + Smoke tests (functionality and embed rendering).
  + Header verification (browser DevTools, `curl -I`, or automated header checks).
- Maintainers must be able to roll back to a previous deployment via [Vercel] or restore from local build artifacts.

---

## 6. HTTP Headers — Authoritative Configuration

The site uses the following headers globally (`/(.*)`) as configured in `vercel.json`. Keep this block synchronized with the `"headers"` field in the `vercel.json` file.

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=()"
        },
        {
          "key": "Cross-Origin-Resource-Policy",
          "value": "same-site"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; connect-src 'self' https:; base-uri 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'self'; frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.instagram.com https://instagram.com https://www.tiktok.com https://vt.tiktok.com https://www.facebook.com https://www.facebook.com/plugins; script-src 'self' 'unsafe-inline' https://www.youtube.com https://www.youtube-nocookie.com https://s.ytimg.com https://platform.instagram.com https://www.instagram.com https://www.tiktok.com https://s0.tiktokcdn.com https://www.facebook.com https://connect.facebook.net https://staticxx.facebook.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:; upgrade-insecure-requests;"
        }
      ]
    }
  ]
}
```

### Header Rationale (Brief)

- **Strict-Transport-Security** (HSTS): prevents downgrade attacks and enforces HTTPS across the site and subdomains.
- **X-Content-Type-Options: nosniff**: prevents MIME sniffing attacks that can lead to script execution.
- **Referrer-Policy**: limits cross-origin referrer exposure for privacy.
- **Permissions-Policy**: restricts powerful browser features to reduce abuse surface.
- **Content-Security-Policy**: primary client-side defense — restricts resource origins, prohibits plugin objects, limits framing of the site (`frame-ancestors 'self'`), and permits embedding trusted providers.
- **Cross-Origin-Resource-Policy: same-site**: reduces unintended cross-site resource sharing.

---

## 7. Embeds and Framing Policy

- The policy intentionally **does not** set `X-Frame-Options`. That header is omitted because it conflicts with, and is less flexible than, CSP’s `frame-ancestors` and `frame-src`.
- `frame-src` permits embedding content *into* our pages from the following providers: YouTube, YouTube (no-cookie), Instagram, TikTok, and Facebook. Maintain an allowlist of domains required by each provider — update promptly if providers change CDN or embed domains.
- `frame-ancestors 'self'` prevents arbitrary sites from embedding **NeoSKI** pages (clickjacking protection).

---

## 8. Incident Response and Mitigation

**Reporters:** Submit via `security.txt` (contact channel). Follow responsible disclosure.

Operational steps for an active issue (headers, embeds, third-party script compromise, or dependency vulnerability):

1. **Contain** — where feasible, remove or restrict the offending domain from `frame-src`/`script-src` and deploy the change.
2. **Assess** — determine impact and vector (third-party compromise, dependency, build artifact).
3. **Remediate** — patch dependency, revoke and rotate secrets, or remove compromised content; redeploy.
4. **Restore & verify** — restore service, validate headers and functionality, confirm embeds either fixed or restricted.
5. **Report & document** — create a post-incident record with root cause, timeline, and preventive actions; update this policy if needed.
6. **Notify** — if any user impact is discovered (unlikely for this site), follow legal/regulatory notification requirements and document outreach.

---

## 9. Monitoring, Testing, and Review

- **Dependency review:** monthly (automated + manual triage for critical items).
- **Header verification:** after every major deploy and as part of automated release checks.
- **Embed regression tests:** validate representative embeds (Instagram, YouTube, TikTok, Facebook) as part of CI smoke tests.
- **Policy review:** annually or after significant architecture/config changes. Record revisions in the repository.

---

## 10. Disclosure and Contacts

- Public reporting channel: [GitHub issue](https://github.com/mitsuki31/Neo-SkiArticle/issues/new?template=SECURITY.yml).
- Private reporting channel: `security.txt` at `/.well-known/security.txt`.
- Acknowledgement of reporters will be considered and published as appropriate.
- For urgent incidents, the contact information in `security.txt` should be used; maintainers will reply in the preferred languages listed there.

---

## 11. Operational Notes and Hardening Roadmap

Long-term:

- Consider CSP reporting (`report-uri`/`report-to`) to capture client violations for monitoring.
- Maintain a small, documented set of approved third-party domains per provider to make audits deterministic.

---

## References

- `vercel.json` — authoritative header configuration (repository root).
- `security.txt` — responsible disclosure contact.
- CSP and header best practices — vendor and browser guidance.

---

This document is intentionally operational: it aligns controls, verification steps, and incident workflows with the header configuration and deployment model. The policy must be kept in sync with `vercel.json`; any divergence creates operational risk.

---

[Dependabot]: https://github.com/dependabot
[Vite]: https://vite.dev
[React]: https://react.dev
[TailwindCSS]: https://tailwindcss.com
[Vercel]: https://vercel.com
