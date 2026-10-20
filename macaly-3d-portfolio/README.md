# Prajjwal Patel — 3D AI Developer Portfolio (Macaly source snapshot)

This folder preserves the editable source for the existing **Prajjwal Patel — 3D AI Developer Portfolio** developed in Macaly. It was copied here on 20 October 2026 so another AI or developer can continue from the source rather than recreating the site from screenshots.

## Current design direction

- Midnight navy with electric blue and violet accents
- CSS-based 3D orbiting orb, orbital rings and ambient lighting
- Glassmorphism cards, depth, soft glow and restrained hover effects
- Responsive layout and reduced-motion support
- Full 17-project catalog and 43 LeetCode achievement entries

## Start here

- `src/routes/index.tsx` — page structure, all project entries, LeetCode data and interactions
- `src/styles.css` — the theme, 3D effects, glassmorphism and responsive styles
- `package.json` — scripts and dependencies
- `vite.config.ts` — Vite/TanStack configuration
- `NEXT_AI_HANDOFF.md` — handoff instructions to paste into the next AI

## Run and validate

Use a compatible Node.js version:

```bash
npm ci
npm run dev
npm test
npm run build
```

The project includes Macaly-specific integration (`@macaly/bridge`) and Convex files. A standalone environment may need the appropriate Macaly/Convex configuration before all integrated features run. Do not commit `.env.local`, API keys, tokens or other secrets.

## Asset note

The source workspace contained two binary template icons, `public/logo192.png` and `public/logo512.png`, which were not retrievable through the available source-text export. Those two files are not in this copy; the manifest still references them. Restore them or replace their manifest entries before a PWA/app-icon release. The rest of the listed text source files were copied into this directory.

## GitHub Pages note

The parent repository's existing workflow uploads the root static portfolio as-is. It does **not** compile this nested Vite/TanStack app. Before presenting this folder as a live website, configure the workflow to install/build from this directory and publish its generated output using the correct GitHub Pages base path. Preserve the existing root portfolio pages and CarePilot project.

## Working reference

- Macaly project ID: `cse4gemgz6nr9h37zmzrpat0`
- Macaly development preview: https://cse4gemgz6nr9h37zmzrpat0.macaly.dev/ (development reference; not confirmed as a permanent production deployment)

The current Macaly version passed `.sandbox/check-errors --strict` and the existing test suite (13 tests) when last checked.
