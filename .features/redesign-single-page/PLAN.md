# Plan: Single-Page Redesign with Hero + Flyer Carousels
**Risk level**: Medium

## Summary
Convert multi-page portfolio into single scrolling page. Add fullscreen hero with `landing ocn sombra.png`, transparent-to-white navbar on scroll, editorial artwork grid, auto-advancing flyer carousels next to exhibition sections, scroll-triggered animations throughout. Remove react-router entirely. No new dependencies.

## Architecture Decisions
1. **Gallery**: Editorial grid with CSS grid — landscape images span full-width, portraits go 2-up. Better visual rhythm than raw masonry.
2. **Navbar**: `useScroll` + `useMotionValueEvent` from motion/react. Transparent with white text over hero, transitions to white bg + dark text after scrolling past viewport height.
3. **Carousel**: Embla with autoplay plugin. Fade transition between slides on 4s interval.
4. **Animations**: `whileInView` on all sections with staggered children. Parallax `useTransform` on hero image. Smooth reveal on gallery items.
5. **Flyer processing**: Extend existing `process-images.mjs` to process flyers into `public/flyers/{individuales,colectivas}/`.

## Implementation Steps

### Step 1: Process Assets
**Files**: `scripts/process-images.mjs`, `public/hero.webp`, `public/flyers/`
**What to build**: 
- Extend process-images script to also optimize flyers from `pics/flyers/individuales/` and `pics/flyers/colectivas/` into `public/flyers/` subfolders, generating `src/data/flyers-individuales.json` and `src/data/flyers-colectivas.json`.
- Convert hero image to webp and copy to `public/hero.webp`.
- Run the script.
**Test gate**: `ls public/hero.webp public/flyers/individuales/ public/flyers/colectivas/ && cat src/data/flyers-individuales.json` — all files exist, JSON is valid.

### Step 2: Strip Router, Build Single-Page Shell
**Files**: `src/main.tsx`, `src/app/App.tsx`, `src/components/Layout.tsx`, delete `src/pages/About.tsx`
**What to build**:
- Remove `BrowserRouter` from `main.tsx`.
- `App.tsx`: render `Layout` directly, no `Routes`.
- `Layout.tsx`: remove `Outlet`, inline Hero → Gallery → all CV sections → Footer in order.
- Delete `About.tsx`.
**Test gate**: `npm run build` succeeds with zero errors.

### Step 3: Hero Section + Transparent Navbar
**Files**: `src/components/HeroSection.tsx` (new), `src/components/Navbar.tsx`
**What to build**:
- `HeroSection`: fullscreen `100vh` div with `hero.webp` as background via `object-fit: cover`. Dark gradient overlay bottom. Name "manuela zárate" centered-bottom with large typography (`clamp()` for fluid sizing). Subtle parallax on scroll via `useTransform`. Mobile: same layout, text scales down naturally.
- `Navbar`: fixed (not sticky), transparent bg, white text. On scroll past `100vh`, transitions to white bg + dark text. Replace `Link` with anchor `<a href="#section">`. Mobile: name + nav stack vertically, smaller padding. Only 2 nav items — no hamburger needed, they fit on smallest screens.
**Test gate**: `npm run build` succeeds. Dev server shows fullscreen hero with transparent navbar that transitions on scroll.

### Step 4: Editorial Gallery Grid
**Files**: `src/pages/Home.tsx` (repurposed as gallery component)
**What to build**:
- Replace masonry with CSS Grid editorial layout.
- Desktop (md+): 2-column grid. Landscape images span full width, portraits go 2-up side by side.
- Mobile (<md): single column, all images full-width. Clean vertical scroll.
- Each image: `whileInView` fade-up animation, slight scale on hover (hover disabled on touch via `@media (hover: hover)`).
- Remove captions (filenames aren't meaningful titles).
- All gaps/padding use responsive values: tighter on mobile, more breathing room on desktop.
**Test gate**: `npm run build` succeeds. Gallery renders correctly at 375px and 1440px widths.

### Step 5: Flyer Carousels + Final Animations
**Files**: `src/components/FlyerCarousel.tsx` (new), `src/app/components/content-sections.tsx`
**What to build**:
- `FlyerCarousel`: Embla-based carousel with autoplay (4s interval), fade or slide transition, dot indicators. Takes array of image paths as prop.
- Modify `SoloShowsSection`: add `FlyerCarousel` with individuales data alongside show list. Desktop: side-by-side (text left, carousel right). Mobile: carousel stacks above text, full-width.
- Modify `GroupShowsSection`: same pattern with colectivas data.
- All `SectionRow` layouts already use `flex-col md:flex-row` — verify they look good at 375px.
- Add `whileInView` animations to all `SectionRow` components.
- Fix Footer copyright text (currently says "Cargo Demo Template").
**Test gate**: `npm run build` succeeds. Dev server shows carousels auto-advancing next to exhibition listings.

## Success Criteria
- Single scrolling page, no route changes.
- Fullscreen hero covers viewport on all screen sizes.
- Navbar transparent over hero, white after scroll.
- Gallery: editorial grid on desktop, single-column on mobile. All images look intentional.
- Flyer carousels auto-play next to their respective exhibition sections.
- Scroll-triggered animations on all sections.
- **Fully responsive**: looks polished at 375px (iPhone SE), 768px (iPad), 1440px (desktop).
- Clean production build.

## Out of Scope
- Custom domain setup
- Lightbox/modal on image click
- Image alt text curation (use filenames for now)
- Contact form
