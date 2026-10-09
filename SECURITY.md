# Security & Public Access Guidelines

Applies to this portfolio repository and to any project you publish from it.

---

## 1. The rule

> **Public = documentation, design source, and demo code.**
> **Private = anything that can identify a credential, a customer, or a machine.**

A visitor to your GitHub repository must be able to read `README.md`, browse the
source, and download published releases **without creating an account**. Nothing
you ship publicly may depend on a secret that only you hold.

---

## 2. What must never reach Git

| Never commit | Why it matters | Use instead |
| --- | --- | --- |
| `.env`, `.env.production`, `.env.local` | Holds API keys, DB URLs, tokens | `.env.example` with empty values |
| API keys & tokens (OpenAI, GitHub `ghp_…`, AWS, Firebase, Stripe, Vercel) | Anyone can clone and abuse them | Server-side env vars on the host |
| Database passwords / connection strings | Full data breach | Host-managed secrets or a private DB |
| Private keys (`*.pem`, `*.key`, `*.p12`) | Identity impersonation | Deploy keys / cert manager on the host |
| `service-account*.json` | Full cloud account control | Workload identity instead |
| Client-side secrets (`VITE_*`, `NEXT_PUBLIC_*`) | **Bundled into public JS** — treat as public | Move the logic to a serverless function |
| `node_modules/`, `dist/`, logs | Noise, huge diffs, leak source maps | `.gitignore` (already included) |
| Real customer data, exports, `.csv` dumps | Privacy / legal exposure | Anonymised or synthetic fixtures |

`.gitignore` in this repository already covers every row above.

---

## 3. Safe patterns for a public repo

1. **Commit a template, never the real file.**
   ```
   # .env.example  (safe to commit)
   PUBLIC_GITHUB_USERNAME=your-handle
   VITE_API_BASE_URL=https://api.example.com
   ```
2. **Read secrets at build time from the host.**
   - Vercel: *Project → Settings → Environment Variables*
   - GitHub Pages: no secret needs — the site is fully static.
3. **Pre-flight check before every push.**
   ```bash
   git diff --staged | grep -iE "api[_-]?key|secret|password|token|BEGIN (RSA|OPENSSH) PRIVATE KEY"
   ```
   Any hit = stop, rotate the credential, then continue.
4. **Rotate, don't delete.** If a secret was ever pushed, removing it in a later
   commit is not enough — revoke it at the provider first, then purge history
   (`git filter-repo`) and force-push.
5. **Least privilege.** Use a GitHub fine-grained PAT or a deploy key scoped to a
   single repository, with expiry.
6. **Scan automatically.** Enable GitHub *Settings → Code security →
   Secret scanning* and *Dependabot alerts* on every repository.

---

## 4. Enabling public, sign-in-free access

**GitHub Pages (this site)**
1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. The workflow in `.github/workflows/deploy.yml` publishes `dist/` to
   `gh-pages` on every push to `main`.
3. Site URL becomes `https://<username>.github.io/<repo>/`; the build already
   uses a relative base (`base: './'`), so no rebuild is needed.

**Public code + releases**
1. Repo → **Settings → General → Danger Zone** → set visibility to
   **Public**.
2. Anyone can then read `README.md`, browse folders and
   `git clone` without signing in.
3. **Releases** → *Releases → Draft a new release → attach binaries* →
   *Publish release*. Assets are served from
   `https://github.com/<user>/<repo>/releases/latest` with no login.
4. **License**: this project is MIT (see `LICENSE`), so reuse is permitted with
   attribution.

**Vercel**
- Import the repo at [vercel.com/new](https://vercel.com/new).
- Framework preset *Vite*, build `npm run build`, output `dist`.
- Environment variables live in the Vercel dashboard, never in the repo.

---

## 5. Personal data in this portfolio

The images, CV and résumé published here were supplied for the purpose of this
site and are public by design. Review them before pushing:

- `public/documents/*.pdf` — confirm the CV contains no ID numbers, addresses or
  references you want removed.
- `public/assets/profile/portrait.jpg` — confirm you are happy with it being
  publicly downloadable (right-click → save).
- If a file must be removed, delete it from `public/`, clear the entry in
  `src/data/assets.js`, then re-run `npm run sync:assets` and rebuild.

---

## 6. Reporting a vulnerability

Email **emmanuelogundipe4@gmail.com** with the issue and a reproduction path.
Vulnerabilities are fixed privately and disclosed after a patch ships.

MIT © Ogundipe Emmanuel Olamide