import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { dirname, join, relative } from 'path'
import { fileURLToPath } from 'url'

export const PRODUCT_CODES = [
  'SIG360',
  'ERP360',
  'TPM360',
  'MTP360',
  'PMO360',
  'AGRO360',
  'FOOD360',
  'HOTEL360',
  'SALUD360',
  'CATASTRO360',
  'MEDCONGRESS',
]

const STILL_NAMES = ['still-4k.webp', 'still-4k.png', 'still.webp', 'still.png', 'still.jpg', 'plate.webp', 'plate.png']
const LOOP_NAMES = ['loop.webm', 'loop.mp4', 'motion.webm', 'motion.mp4']
const MOTION_IDS = ['hero-orbit', 'sectors-reel', 'product-detail']

function firstExisting(dir, names) {
  if (!existsSync(dir)) return null
  for (const name of names) {
    const full = join(dir, name)
    if (existsSync(full) && statSync(full).isFile() && statSync(full).size > 32) return name
  }
  return null
}

export function scanAssets(root) {
  const publicDir = join(root, 'public')
  const productsDir = join(publicDir, 'products')
  const motionDir = join(publicDir, 'motion')
  mkdirSync(productsDir, { recursive: true })
  mkdirSync(motionDir, { recursive: true })

  const products = {}
  for (const code of PRODUCT_CODES) {
    const dir = join(productsDir, code)
    mkdirSync(dir, { recursive: true })
    const still = firstExisting(dir, STILL_NAMES)
    const loop = firstExisting(dir, LOOP_NAMES)
    const entry = {}
    if (still) entry.still = `./products/${code}/${still}`
    if (loop) entry.loop = `./products/${code}/${loop}`
    if (entry.still || entry.loop) products[code] = entry
  }

  const motion = {}
  for (const id of MOTION_IDS) {
    const file = firstExisting(motionDir, [`${id}.webm`, `${id}.mp4`])
    if (file) motion[id] = `./motion/${file}`
  }

  return {
    generatedAt: new Date().toISOString(),
    note: 'Only files that exist on disk are listed. Missing slots never get a URL — no 404s.',
    products,
    motion,
  }
}

export function writeManifest(root) {
  const manifest = scanAssets(root)
  const outDir = join(root, 'src-app', 'generated')
  mkdirSync(outDir, { recursive: true })
  const outFile = join(outDir, 'asset-manifest.json')
  writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`)
  return { outFile: relative(root, outFile), counts: {
    productStills: Object.values(manifest.products).filter((p) => p.still).length,
    productLoops: Object.values(manifest.products).filter((p) => p.loop).length,
    motion: Object.keys(manifest.motion).length,
  } }
}

const isCli = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isCli) {
  const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
  const result = writeManifest(root)
  console.log(`Asset manifest → ${result.outFile}`, result.counts)
}
