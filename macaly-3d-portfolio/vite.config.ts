// IMPORTANT (Macaly agent): This config retains Macaly's preview behavior while
// enabling a static GitHub Pages build for the public portfolio URL.
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import errorOverlay from "@visulima/vite-overlay"
import { macalyTagger } from '@macaly/static-tagger'

const isGitHubPagesBuild = process.env.GITHUB_PAGES_BUILD === 'true'
const githubPagesBase = '/prajjwal-portfolio/macaly-3d-portfolio/'

const config = defineConfig({
  base: isGitHubPagesBuild ? githubPagesBase : '/',
  server: {
    allowedHosts: ['.macaly.dev', '.macaly.app', '.macaly-app.com', '.macaly-user-data.dev', '.e2b.app', '.e2b-juliett.dev'],
  },
  ...(process.env.DEV_BUILD && {
    build: {
      target: 'esnext',
      minify: false,
      cssMinify: false,
      sourcemap: false,
      reportCompressedSize: false,
      modulePreload: {
        polyfill: false,
      },
    },
  }),
  plugins: [
    devtools({ injectSource: { enabled: false } }),
    // Macaly Tagger is crucial for proper functionality of Visual Edits in Macaly
    !!process.env.DEV_BUILD && macalyTagger({
      ignorePackages: [
        '@react-three/fiber',
        '@react-three/drei',
        '@react-three/postprocessing',
      ],
    }),
    errorOverlay({
      forwardConsole: true,
      forwardedConsoleMethods: ["error", "warn"],
    }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        // Macaly previews keep their historical setting; GitHub Pages needs static HTML.
        enabled: !!process.env.DEV_BUILD || isGitHubPagesBuild,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: isGitHubPagesBuild,
        failOnError: true,
      },
    }),
    // Nitro's github_pages preset produces static output suitable for GitHub Pages.
    nitro(),
    viteReact(),
  ],
})

export default config
