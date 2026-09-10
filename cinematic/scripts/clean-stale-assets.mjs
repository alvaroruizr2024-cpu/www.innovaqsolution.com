import { readdirSync, readFileSync, unlinkSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const htmlPath = join(root, 'index.html')
const assetsDir = join(root, 'assets')

if (!existsSync(htmlPath) || !existsSync(assetsDir)) process.exit(0)

const html = readFileSync(htmlPath, 'utf8')
const referenced = new Set(
  [...html.matchAll(/assets\/([A-Za-z0-9._-]+)/g)].map((m) => m[1]),
)

for (const file of readdirSync(assetsDir)) {
  if (!referenced.has(file)) unlinkSync(join(assetsDir, file))
}
