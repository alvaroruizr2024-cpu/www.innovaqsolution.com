# INNOVAQ cinematic showroom (4K gallery)

Dark WebGL landing for **INNOVAQ SOLUTIONS SAC** (RUC 20606205105, Trujillo, Perú).

Additive folder. `/global` stays the SaaS portal.

## Preview

- **Live:** https://www.innovaqsolution.com/cinematic/
- **Dev:** `cd cinematic && npm install && npm run dev`
- **Production build:** `npm run build` then commit `cinematic/` (GitHub Pages serves this folder)

## Drop Nano Banana 2 stills + Higgsfield / Seedance loops

There are **no live APIs**. Quality bar only.

1. Stills (prefer **3840×2160 WebP**) → `cinematic/public/products/<CODE>/still-4k.webp`
2. Loops (muted seamless MP4/WebM) → `cinematic/public/products/<CODE>/loop.webm`
3. Section reels → `cinematic/public/motion/hero-orbit.mp4` (etc.)

Product codes: `SIG360`, `ERP360`, `TPM360`, `MTP360`, `PMO360`, `AGRO360`, `FOOD360`, `HOTEL360`, `SALUD360`, `CATASTRO360`, `MEDCONGRESS`.

Full naming: `public/products/README.md`.

Then:

```bash
cd cinematic
npm run build
git add cinematic && git commit -m "Add product media" && git push
# merge to main → GitHub Pages (~1–3 min)
```

`npm run build` scans disk and writes `src-app/generated/asset-manifest.json`. Missing files are **never requested** (no 404s). Procedural 3D heroes fill empty slots.

Published copies: `/cinematic/products/` and `/cinematic/motion/`.

## Experience

- 11 equal-orbit 3D heroes (distinct silhouettes, brand emissive)
- 360° opening camera, then hover/select cinematic framing (DOF + bloom)
- Keyboard `←` `→` · Esc · Enter · film rail · WhatsApp per product
- Quality: **Ultra 4K** defaults on desktop (DPR cap 2, ACES, DOF). **Performance** on phones / reduced-motion / save-data. Toggle persists.
- First-visit guided hint (dismissible). Keyboard `←` `→`, named film rail, side Next/Previous.
- WhatsApp `+51 939 521 784` is the primary CTA on float, hero, and product cards. **No prices.**
