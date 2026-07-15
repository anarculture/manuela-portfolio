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

Entry: `src/main.tsx` → `src/app/App.tsx` → `src/components/Layout.tsx`. Layout composes the whole one-page site: `Navbar` + `HeroSection` (both in `src/components/`), the masonry `Gallery` (`src/pages/Home.tsx` — file is named Home but exports `Gallery`), and the CV sections (`BiografiaSection`, `SoloShowsSection`, etc.) from `src/app/components/content-sections.tsx`. Navigation is anchor-scroll only (`#obras`, `#cv`) — no router in use despite react-router being installed.

Two component trees coexist:
- `src/components/` — the hand-written, live site components.
- `src/app/components/` — the Figma Make export. Only `content-sections.tsx` is still used; `gallery-section.tsx`, `hero-section.tsx`, `sticky-header.tsx` and the whole `ui/` (shadcn) + `figma/` dirs are unused legacy. Don't extend them; edit the live tree.

### Image pipeline

Source images live in `pics/` (gallery at top level, flyers in `pics/flyers/{individuales,colectivas}/`). `scripts/process-images.mjs` converts them with sharp to webp into `public/gallery/` and `public/flyers/`, and writes manifests to `src/data/*.json` (`{src, alt, width, height}`). Components render from those JSON manifests — to add/remove artwork, change `pics/` and re-run the script; never hand-edit `public/` or the JSON. The gallery in `Home.tsx` filters out hero images by filename substring, and captions are derived from filenames (`formatCaption`), so source filenames matter. Hero images (`public/hero-desktop.webp` / `hero-mobile.webp`) are also produced by the script from a hardcoded source path.

Per-exhibition media: `fotos organizadas por expo/` holds one folder of photos per exhibition plus `flyers/{individuales,colectivas}/`. The `EXPOS` array in `scripts/process-images.mjs` maps each exhibition slug to its flyer file and photo folder; the script emits `public/expos/<slug>/` + `src/data/expos.json`. Shows in `content-sections.tsx` reference these via their `slug` field (rendered by `ExpoMedia`: static flyer + photo carousel). To add an exhibition: add its folder/flyer, register it in `EXPOS`, re-run the script, and add `slug` to the show entry.

### Styling conventions

No design system in use — typography is inline `style` with `'DM Mono', monospace` at small fixed sizes, colors are hardcoded hex (`#1a1a1a`, `#333`, `#888`), background always white. Animations use `motion/react` (the `motion` package, not framer-motion import path) with whileInView fade-ins. Match this style; don't introduce shadcn/MUI components even though they're in `package.json` (Figma Make leftovers).

The `figma:asset/...` import scheme is resolved to `src/assets/` by a custom Vite plugin in `vite.config.ts`; the React and Tailwind Vite plugins must not be removed (Figma Make requirement noted in the config).
