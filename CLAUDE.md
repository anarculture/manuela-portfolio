# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page portfolio site for artist Manuela Zárate (manuela zárate), exported originally from Figma Make and then hand-customized. React 18 + Vite 6 + Tailwind 4, deployed on Vercel as an SPA (`vercel.json` rewrites everything to `index.html`). No tests, no linter configured.

## Commands

```bash
npm i                            # install
npm run dev                      # dev server
npm run build                    # production build → dist/
node scripts/process-images.mjs  # regenerate optimized images + JSON manifests (see below)
```

`dist/` is **committed to git** — after visual changes, run `npm run build` and include the updated `dist/` in the commit.

## Architecture

Entry: `src/main.tsx` → `src/app/App.tsx` → `src/components/Layout.tsx`. Layout composes the whole one-page site: `Navbar` + `HeroSection` (both in `src/components/`) and the CV sections (`BiografiaSection`, `SoloShowsSection`, etc.) from `src/app/components/content-sections.tsx`. Navigation is anchor-scroll only (`#biografia`, `#exposiciones`, `#ferias`, `#publicaciones`) — no router in use despite react-router being installed.

Two component trees coexist:
- `src/components/` — the hand-written, live site components (`Layout`, `Navbar`, `HeroSection`, `FlyerCarousel`).
- `src/app/components/` — the Figma Make export. Only `content-sections.tsx` is still used; `gallery-section.tsx`, `hero-section.tsx`, `sticky-header.tsx` and the whole `ui/` (shadcn) + `figma/` dirs are unused legacy. Don't extend them; edit the live tree.

### Image pipeline

`scripts/process-images.mjs` does two things: converts the hero image (hardcoded source in `pics/`) to `public/hero-desktop.webp`, and builds per-exhibition media. `fotos organizadas por expo/` holds one folder of photos per exhibition plus `flyers/{individuales,colectivas}/`. The `EXPOS` array in the script maps each exhibition slug to its flyer file, photo folder, and optional `extra` images; the script emits `public/expos/<slug>/` (webp) + `src/data/expos.json` (`{flyer, images:[{src,alt,width,height}]}`). Shows in `content-sections.tsx` reference these via their `slug` field (rendered by `ExpoMedia`: static flyer + photo carousel). To add an exhibition: add its folder/flyer, register it in `EXPOS`, re-run the script, and add `slug` to the show entry. Never hand-edit `public/expos/` or the JSON.

(`hero-mobile.webp` is committed but not produced by the script — it's a hand-made crop.)

### Styling conventions

No design system in use — typography is inline `style` with `'DM Mono', monospace` at small fixed sizes, colors are hardcoded hex (`#1a1a1a`, `#333`, `#888`), background always white. Animations use `motion/react` (the `motion` package, not framer-motion import path) with whileInView fade-ins. Match this style; don't introduce shadcn/MUI components even though they're in `package.json` (Figma Make leftovers).

The `figma:asset/...` import scheme is resolved to `src/assets/` by a custom Vite plugin in `vite.config.ts`; the React and Tailwind Vite plugins must not be removed (Figma Make requirement noted in the config).
