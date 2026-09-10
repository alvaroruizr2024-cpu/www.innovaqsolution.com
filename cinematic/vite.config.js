import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: resolve(dir, 'src-app'),
  publicDir: resolve(dir, 'public'),
  base: './',
  plugins: [react()],
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
