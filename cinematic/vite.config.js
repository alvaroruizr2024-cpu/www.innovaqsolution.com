import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { writeManifest } from './scripts/scan-assets.mjs'

const dir = dirname(fileURLToPath(import.meta.url))

function assetManifestPlugin() {
  const run = () => {
    const result = writeManifest(dir)
    console.log('[assets]', result.counts)
  }
  return {
    name: 'innovaq-asset-manifest',
    buildStart: run,
    configureServer: run,
  }
}

export default defineConfig({
  root: resolve(dir, 'src-app'),
  publicDir: resolve(dir, 'public'),
  base: './',
  plugins: [react(), assetManifestPlugin()],
  build: {
    outDir: resolve(dir, 'build'),
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
