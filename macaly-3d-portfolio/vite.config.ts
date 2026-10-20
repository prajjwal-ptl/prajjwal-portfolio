// Keep Macaly preview behavior and add a GitHub Pages static build.
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
        // With a non-root Vite base, the prerender URL needs the same prefix.
        enabled: !!process.env.DEV_BUILD || isGitHubPagesBuild,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: !isGitHubPagesBuild,
        crawlLinks: false,
        failOnError: true,
      },
      ...(isGitHubPagesBuild ? {
        pages: [
          {
            path: githubPagesBase,
            prerender: { enabled: true, outputPath: '/index.html' },
          },
        ],
      } : {}),
    }),
    nitro(),
    viteReact(),
  ],
})

export default config
