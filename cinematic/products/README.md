# Product media pipeline (Nano Banana 2 + Higgsfield / Seedance)

Drop generated files here. **No APIs are wired.** The build scans this folder and only references files that exist, so empty slots never 404.

Quality bar: **Nano Banana 2** for 4K product stills, **Higgsfield / Seedance** for cinematic loops.

## Folder per product code

```
public/products/
  SIG360/
  ERP360/          (SumaERP / ERP 360)
  TPM360/
  MTP360/
  PMO360/
  AGRO360/
  FOOD360/
  HOTEL360/
  SALUD360/
  CATASTRO360/
  MEDCONGRESS/     (MedCongress Pro)
```

## Filenames (first match wins)

Stills (prefer 3840×2160 WebP):

- `still-4k.webp` (best)
- `still-4k.png`
- `still.webp`
- `still.png`
- `still.jpg`

Motion loops (muted, 4–12s seamless, 1920–3840 wide):

- `loop.webm` (best)
- `loop.mp4`
- `motion.webm`
- `motion.mp4`

## Section motion (optional)

Also drop into `public/motion/`:

- `hero-orbit.webm|mp4`
- `sectors-reel.webm|mp4`
- `product-detail.webm|mp4`

## Publish to GitHub Pages

```bash
cd cinematic
# drop files into public/products/<CODE>/ and public/motion/
npm run build
git add cinematic && git commit && git push
# merge to main → https://www.innovaqsolution.com/cinematic/
```

`npm run build` regenerates `src-app/generated/asset-manifest.json` from disk. If a file is not in the manifest, the showroom uses the procedural 3D hero instead.
