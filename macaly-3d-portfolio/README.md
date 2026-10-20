# Prajjwal Patel — 3D AI Developer Portfolio

The React/TypeScript portfolio source is maintained in this folder and deployed through GitHub Pages at:

**https://prajjwal-ptl.github.io/prajjwal-portfolio/macaly-3d-portfolio/**

The pre-existing static portfolio remains available at:
https://prajjwal-ptl.github.io/prajjwal-portfolio/

## Visual direction

- Midnight navy with electric blue and violet accents
- CSS-based 3D orbiting orb, orbital rings, depth and ambient lighting
- Glassmorphism cards with restrained hover effects
- Responsive layout and accessible, keyboard-friendly interactions
- Full 17-project catalog and 43 LeetCode achievement entries

## Files

- `src/routes/index.tsx` — portfolio content and interactions
- `src/github-pages.tsx` — static React mount used for GitHub Pages
- `github-pages.html` — static HTML entry
- `vite.pages.config.ts` — GitHub Pages base path and static build
- `vite.config.ts` — original Macaly/TanStack development configuration
- `NEXT_AI_HANDOFF.md` — instructions for the next AI/developer

## Build

```bash
npm ci
npm test
npm run build:pages
```

GitHub Pages is static hosting. The public page uses the existing portfolio component and CSS in a client-rendered React entry; it does not rely on server-side Macaly Bridge/Convex behavior. Do not commit secrets, tokens, or private data.
