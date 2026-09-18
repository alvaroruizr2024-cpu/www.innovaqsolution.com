import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const build = join(root, 'build')

if (!existsSync(join(build, 'index.html'))) {
  console.error('Missing cinematic/build. Run vite build first.')
  process.exit(1)
}

cpSync(join(build, 'index.html'), join(root, 'index.html'))

// El portal 3D también es la portada del sitio: misma página, canónica en la raíz.
// Los assets ya son absolutos (/cinematic/...) gracias a `base` en vite.config.js.
const siteRoot = join(root, '..')
const html = readFileSync(join(build, 'index.html'), 'utf8')
  .replaceAll('https://www.innovaqsolution.com/cinematic/', 'https://www.innovaqsolution.com/')
writeFileSync(join(siteRoot, 'index.html'), html)

const assetsFrom = join(build, 'assets')
const assetsTo = join(root, 'assets')
rmSync(assetsTo, { recursive: true, force: true })
if (existsSync(assetsFrom)) cpSync(assetsFrom, assetsTo, { recursive: true })

for (const extra of ['logo.jpg', 'motion', 'products']) {
  const from = join(build, extra)
  if (existsSync(from)) {
    const to = join(root, extra)
    rmSync(to, { recursive: true, force: true })
    cpSync(from, to, { recursive: true })
  }
}

mkdirSync(join(root, 'motion'), { recursive: true })
console.log('Published cinematic build to /cinematic and site root index.html for GitHub Pages.')
