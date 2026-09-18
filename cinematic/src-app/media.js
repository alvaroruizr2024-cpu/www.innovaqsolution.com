import manifestJson from './generated/asset-manifest.json'

/** Base pública del bundle (/cinematic/). Permite servir el portal también desde la raíz del sitio. */
export const BASE = import.meta.env.BASE_URL || './'

export const ASSET_MANIFEST = manifestJson

export function assetUrl(rel) {
  if (!rel) return null
  return BASE + rel.replace(/^\.?\//, '')
}

export function productMedia(code) {
  const entry = ASSET_MANIFEST.products?.[code] || {}
  return {
    still: assetUrl(entry.still),
    loop: assetUrl(entry.loop),
  }
}

export function motionSrc(id) {
  return assetUrl(ASSET_MANIFEST.motion?.[id])
}

export function hasAnyProductMedia() {
  return Object.keys(ASSET_MANIFEST.products || {}).length > 0
}
