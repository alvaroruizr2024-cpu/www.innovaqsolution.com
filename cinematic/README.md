# INNOVAQ cinematic showroom

Dark WebGL landing for **INNOVAQ SOLUTIONS SAC** (RUC 20606205105, Trujillo, Perú).

This folder is additive. The existing `/global` portal is not modified.

## Preview

- **Production path:** `https://www.innovaqsolution.com/cinematic/`
- **Local dev:** `cd cinematic && npm install && npm run dev`
- **Local production build:** `npm run build && npm run preview`

The GitHub Pages site serves the built `index.html` and `assets/` in this folder.

## Locked brief (v3)

- 11 products in an **equal rotating showroom** (no flagship centerpiece)
- Opening **360° camera orbit**, then interactive settle
- Primary CTA: WhatsApp `+51 900 801 059`
- Demo / trial form is secondary (mailto). **No prices**
- Spanish default + English
- R3F + custom shaders + postprocessing (DOF, bloom, fog, grain)
- Video slots for generated motion under `public/motion/` — no invented APIs

Copy, products, services, sectors and ISO credentials are taken from `/global`.
