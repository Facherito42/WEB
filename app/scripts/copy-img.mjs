// Copies the repo-root img/ (tracked in git, shared with the legacy static
// pages) into app/public/img/ so Vite can serve it. Not tracked here to
// avoid a second copy in git — this script recreates it on checkout/CI.
import { cpSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const appDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const src = path.join(appDir, '..', 'img')
const dest = path.join(appDir, 'public', 'img')

if (!existsSync(src)) {
  console.warn(`[copy-img] source not found: ${src}`)
  process.exit(0)
}

cpSync(src, dest, { recursive: true })
console.log(`[copy-img] copied ${src} -> ${dest}`)
