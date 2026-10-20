# Prajjwal Patel — 3D AI Developer Portfolio

This folder contains the React/TypeScript source for the 3D AI developer portfolio. It is served by GitHub Pages at:

**https://prajjwal-ptl.github.io/prajjwal-portfolio/macaly-3d-portfolio/**

The older static portfolio remains at the repository root:
https://prajjwal-ptl.github.io/prajjwal-portfolio/

## Visual direction

- Midnight navy with electric blue and violet accents
- CSS-based 3D orbiting orb, orbital rings, depth and ambient lighting
- Glassmorphism cards with restrained hover effects
- Responsive layout and accessible, keyboard-friendly interactions
- Full 17-project catalog and 43 LeetCode achievement entries

## Key files

- `src/routes/index.tsx` — portfolio content and interactions
- `src/styles.css` — visual system and responsive styling
- `vite.config.ts` — Macaly development settings and GitHub Pages static-build options
- `NEXT_AI_HANDOFF.md` — instructions for the next AI/developer

## Local development

```bash
npm ci
npm run dev
npm test
npm run build
```

For a GitHub Pages-equivalent local build, set `GITHUB_PAGES_BUILD=true` and `NITRO_PRESET=github_pages` before running `npm run build`.

The app includes Macaly Bridge and Convex integration source. Do not commit secrets or environment files. The live static portfolio renders the public-facing page; server-only integration features require a compatible service/configuration and must not be assumed to work on GitHub Pages.
