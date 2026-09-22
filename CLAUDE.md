# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

The live corporate site for **INNOVAQ SOLUTIONS SAC** (Trujillo, Perú — RUC
20606205105), served by **GitHub Pages** from the `main` branch under the custom
domain declared in `CNAME` (`www.innovaqsolution.com`). There is no server-side
build for the site as a whole: whatever is committed to `main` at a given path
is what the browser gets at that URL. `/cinematic/` is the one exception — it
is a Vite/React app whose built output lives in the repo (see below).

Everything the user sees at `https://www.innovaqsolution.com/...` maps 1-to-1
to a path in this repo. Treat every commit to `main` as a production deploy.

## Repository layout

Top-level areas that matter:

- `index.html` — legacy root landing (React + Babel via CDN, Tailwind CDN).
  Deprecated in favor of `/cinematic/` at the root, but still linked from a few
  places. Do not delete without checking `git grep -r 'href="/index.html"'`.
- `cinematic/` — the current homepage. Vite + React + `@react-three/fiber`
  WebGL showroom. `npm run build` publishes into `cinematic/build` and copies
  the artifacts so `https://www.innovaqsolution.com/cinematic/` and the root
  serve the same page. See `cinematic/README.md`.
- `global/` — the SaaS portal + pricing page and the **canonical brand
  source of truth**. The `B` colors object at `global/index.html:26-36` and
  the `PRODUCTS` array around `global/index.html:158` are authoritative.
  Read from here before writing any brand hex or product copy elsewhere.
- `consultoria/` — the previous consulting landing (still linked).
- Product folders (one landing each, self-contained `index.html`):
  `AGRO360/`, `CATASTRO360/`, `ERP360/`, `Food360/`, `Hotel360/`, `PMO360/`,
  `Salud360/`, `SumaERP/`, `TPM360/`, `sig360/`, `sig360-panasur/`,
  `panasur/`, `Fua/`.
- `assets/hero/`, `assets/hero-v6/` — hero JPGs per product
  (`<PRODUCT>_v5.jpg`, `<PRODUCT>_v6.jpg`).
- `campaigns/`, `gestoreventos/`, `tiktok-engine/`, `social-assets/` —
  marketing microsites and generated social pieces.
- `invoices-sire-mar2026/`, `invoices-sire-q1-2026/` — regulatory/SIRE
  exports; do not modify without an explicit ask.
- `.claude/skills/launch-kit/` — repo-local skill that generates the deck +
  team doc + 4× social pieces for a single launch brief. See its `SKILL.md`.

## Canonical brand

The live INNOVAQ palette (do not copy hex from memory or from the older
`#003366` / `#F68D2E` values in the root `index.html`):

```
blue        #126695   blueLight #2B9BCB   blueDark #0d4a6e
orange      #F1912B   orangeLight #f5aa5a orangeDark #d4741a
green       #7AB648   greenDark #5a9430
gray        #777873
bg          #FBFBF9   bgCard #FFFFFF      bgDark #0d4a6e
text        #1a1a2e   textMuted #5a5a6e   textLight #8a8a9e
border      #e2e2dc   borderLight #eeeeea
```

Font: Inter (Google Fonts) across the site.

PANASUR is a client brand, not INNOVAQ; use its own palette when working
inside `panasur/` or `sig360-panasur/`.

## Working conventions

### Product landing pages
Each product `index.html` is a **single-file page**: Tailwind CDN + React 18
UMD + Babel Standalone + inline `<script type="text/babel">`. Keep that
pattern; do not migrate a page to a build system without an explicit ask.
The pages are edited in place and served straight from GitHub Pages.

### `cinematic/`
Vite + React app.
```
cd cinematic
npm install
npm run dev      # local, port 5173
npm run build    # publishes into cinematic/build and rewrites root index.html
```
`npm run build` also runs `scripts/scan-assets.mjs`, `scripts/publish.mjs`, and
`scripts/clean-stale-assets.mjs`; commit the resulting file changes.

### 4K stills and loops for `/cinematic/`
Not fetched from any API. Drop files into
`cinematic/public/products/<CODE>/still-4k.webp` and
`cinematic/public/products/<CODE>/loop.webm`. Product codes: `SIG360`,
`ERP360`, `TPM360`, `MTP360`, `PMO360`, `AGRO360`, `FOOD360`, `HOTEL360`,
`SALUD360`, `CATASTRO360`, `MEDCONGRESS`. Full spec in
`cinematic/public/products/README.md`.

### Launch collateral
Use the `launch-kit` skill (`.claude/skills/launch-kit/SKILL.md`) for deck +
team doc + 4× social pieces from a single brief. It reads brand and product
copy from the canonical sources above.

## Commits and pushes

- Follow the existing style: short imperative subject, optional body, no
  trailing period. Recent examples in `git log --oneline`:
  `feat: v2.0 PANASUR Combustible - Supabase cloud sync…`,
  `Add PMO360 v5 hero`, `Enhance Bow-Tie analysis documents with color-coded tables`.
- Do not commit the invoice exports (`invoices-sire-*/`) unless the user asked.
- `main` is production. Do not push directly to `main` unless the user asks —
  work on the branch the session was started on and let the user open a PR.

## Things not to do

- Do not add build tooling, package.json, or bundlers at the repo root — the
  site is deliberately serve-as-is except under `cinematic/`.
- Do not rewrite the older root `index.html` to match `global/index.html`
  wholesale; they intentionally serve different roles.
- Do not change brand hex, product prices, or Stripe links from memory. Read
  `global/index.html` first.
- Do not include any model identifier in commit messages, PR titles/bodies,
  or code comments.
