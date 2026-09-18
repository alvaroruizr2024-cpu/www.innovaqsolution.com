# INNOVAQ cinematic showroom (4K gallery)

Dark WebGL landing for **INNOVAQ SOLUTIONS SAC** (RUC 20606205105, Trujillo, Perú).

**Es la portada del sitio**: `npm run build` publica el mismo `index.html` en `/cinematic/` y en la raíz del repo
(los assets son absolutos `/cinematic/...`). `/global` sigue siendo el portal SaaS y la landing de consultoría
anterior vive en `/consultoria/`.

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

### Movimiento sin créditos de IA

`python3 scripts/kenburns.py` genera con ffmpeg (Ken Burns + fundidos) lo que falte:

- `public/products/<CODE>/loop.webm|mp4` (8 s, 1280×720, zoom de respiración sin corte) para cada producto con still y sin loop.
- `public/motion/hero-orbit`, `sectors-reel`, `product-detail` (1920×1080) a partir de los stills de producto, de `../assets/hero-v6/` y de `../tiktok-engine/assets/products/`.

Un loop generado por Higgsfield/Seedance con el mismo nombre lo reemplaza sin tocar código. `--force` regenera todo.

Published copies: `/cinematic/products/` and `/cinematic/motion/`.

## Render (calidad cinematográfica)

- **IBL de estudio** sin HDRI externo: `Environment` + `Lightformer` (softbox cenital, contraluces naranja/azul de marca, kicker verde, tira frontal) → reflejos reales en metales, clearcoat, biseles y piso.
- Sombras suaves PCSS (`SoftShadows`), oclusión ambiental `N8AO`, `SMAA`.
- Post en HDR lineal: DoF con **rack focus real** (el foco sigue al producto), bloom, grading (contraste/saturación), aberración cromática, grano, viñeta y **ACES al final** de la cadena.
- Cámara steadicam: órbita de apertura 360°, respiración de fov, cierre de óptica 39°→33° al encuadrar.
- Stills en pantallas con bisel metálico y lámina de vidrio; ciclorama con degradado.
- Pantalla de carga hasta el primer frame WebGL.

## Experience

- 11 equal-orbit 3D heroes (distinct silhouettes, brand emissive)
- 360° opening camera, then hover/select cinematic framing (DOF + bloom)
- Keyboard `←` `→` · Esc · Enter · film rail · WhatsApp per product
- Quality: **Ultra 4K** defaults on desktop (DPR cap 2, ACES, DOF). **Performance** on phones / reduced-motion / save-data. Toggle persists.
- First-visit guided hint (dismissible). Keyboard `←` `→`, named film rail, side Next/Previous.
- WhatsApp `+51 939 521 784` is the primary CTA on float, hero, and product cards. **No prices.**
