# Research: Single-Page Redesign with Hero + Flyer Carousels
**Date**: 2025-05-20
**Requested**: Merge all content into single scrolling page with fullscreen hero, transparent navbar, flyer carousels next to exhibition sections, better gallery layout, pro-level animations.
**Status**: PENDING DECISION

## What Exists Today
- **Routing**: React Router with 2 pages (`/` = Gallery, `/about` = CV). `Layout.tsx` wraps both with `Navbar` + `Footer`.
- **Navbar**: `sticky top-0 bg-white`, has `Link`s to `/` and `/about`.
- **Gallery**: Masonry grid via `react-responsive-masonry`, 19 images in `gallery.json`. Images range wildly — some 1920x3285, some 1200x800. Causes uneven masonry.
- **CV sections**: `content-sections.tsx` — `BiografiaSection`, `EducacionSection`, `SoloShowsSection`, `GroupShowsSection`, `FairsSection`, `PressSection`, `Footer`. All use `SectionRow` layout pattern.
- **Dependencies already available**: `motion` (framer-motion v12), `embla-carousel-react`, `react-responsive-masonry`, Tailwind v4.
- **Hero image**: `landing ocn sombra.png` — 1366x768 PNG, ~828KB. Good for viewport cover.
- **Flyers**: `pics/flyers/individuales/` (6 images), `pics/flyers/colectivas/` (5 images). Mix of jpg/webp, small sizes (30-760KB).

## What Needs to Be Built

### New Files
- `src/components/HeroSection.tsx` — fullscreen hero with parallax/fade
- `src/components/FlyerCarousel.tsx` — auto-advancing carousel using embla-carousel-react
- Process flyers into `public/flyers/individuales/` and `public/flyers/colectivas/` (webp optimization)
- Update `scripts/process-images.mjs` to also handle flyers
- Copy hero image to `public/hero.webp`

### Files to Modify
- `src/app/App.tsx` — remove router, render single-page component
- `src/main.tsx` — remove `BrowserRouter` wrapper
- `src/components/Navbar.tsx` — transparent bg, scroll-based opacity, anchor links instead of `Link`
- `src/components/Layout.tsx` — remove `Outlet`, inline all sections
- `src/pages/Home.tsx` — rework gallery layout (curated grid instead of raw masonry)
- `src/app/components/content-sections.tsx` — add `FlyerCarousel` next to SoloShows and GroupShows sections
- `vercel.json` — simplify (no SPA rewrites needed if single page)

### Files to Delete
- `src/pages/About.tsx` — content merged into single page

## Risks
| Risk | Likelihood | Impact | Notes |
|------|-----------|--------|-------|
| Hero image 1366x768 may look blurry on 4K displays | Medium | Low | CSS `object-fit: cover` + slight blur/overlay masks this. Artistic choice. |
| 19 gallery images with wildly different aspect ratios | High | Medium | Need curated sizing — mix of full-width, half-width, third-width based on aspect ratio |
| Embla carousel auto-play needs cleanup on unmount | Low | Low | Standard useEffect cleanup |

## Architecture Decision Points
1. **Gallery layout**: Stick with masonry (simpler) vs. curated editorial grid (better design). **Recommend editorial grid** — mix 2-column and full-width rows based on aspect ratio for visual rhythm.
2. **Navbar transparency**: Pure CSS transition on scroll vs. JS scroll listener. **Recommend JS scroll listener** with framer-motion `useScroll` — already have the dep.
3. **Flyer carousel**: Embla (already in deps) vs. react-slick (also in deps). **Recommend Embla** — lighter, better API, already imported.
4. **Animations strategy**: Scroll-triggered reveals via `whileInView`, parallax on hero via `useScroll`+`useTransform`, staggered children. All framer-motion native. No extra deps.

## Effort Estimate
- ~2-3 hours of implementation across 5 steps.
- Confidence: High — all tools/deps already available.

## Recommendation
**GO** — All dependencies present. Clear path. No blockers.

**Decision**: [ ] GO  [ ] NO-GO  [ ] NEEDS CLARIFICATION
