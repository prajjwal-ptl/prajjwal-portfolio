import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const githubPagesBase = '/prajjwal-portfolio/macaly-3d-portfolio/'

export default defineConfig({
  base: githubPagesBase,
  plugins: [tailwindcss(), viteReact()],
  build: {
    outDir: '.output-pages',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./github-pages.html', import.meta.url)),
      },
    },
  },
})
