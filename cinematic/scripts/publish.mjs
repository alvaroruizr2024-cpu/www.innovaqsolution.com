import { cpSync, existsSync, mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)))
const build = join(root, 'build')

if (!existsSync(join(build, 'index.html'))) {
  console.error('Missing cinematic/build. Run vite build first.')
  process.exit(1)
}

cpSync(join(build, 'index.html'), join(root, 'index.html'))

const assetsFrom = join(build, 'assets')
const assetsTo = join(root, 'assets')
rmSync(assetsTo, { recursive: true, force: true })
if (existsSync(assetsFrom)) cpSync(assetsFrom, assetsTo, { recursive: true })

for (const extra of ['logo.jpg', 'motion']) {
  const from = join(build, extra)
  if (existsSync(from)) {
    const to = join(root, extra)
    rmSync(to, { recursive: true, force: true })
    cpSync(from, to, { recursive: true })
  }
}

mkdirSync(join(root, 'motion'), { recursive: true })
console.log('Published cinematic build to /cinematic for GitHub Pages.')
