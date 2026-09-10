import manifestJson from './generated/asset-manifest.json'

export const ASSET_MANIFEST = manifestJson

export function productMedia(code) {
  return ASSET_MANIFEST.products?.[code] || {}
}

export function motionSrc(id) {
  return ASSET_MANIFEST.motion?.[id] || null
}

export function hasAnyProductMedia() {
  return Object.keys(ASSET_MANIFEST.products || {}).length > 0
}
