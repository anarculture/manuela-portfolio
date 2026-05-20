# Plan: Portfolio Site for Manuela Zarate
**Risk level**: Medium (due to image optimization and routing)

## Summary
Build a contemporary, minimal portfolio site for Manuela Zarate. The site will feature a masonry gallery of her works on the home page and an elegant text-focused layout for her CV on the "About" page. We will process and optimize all 28MB+ images into WebP format to ensure fast loading times. The site will be optimized for deployment on Vercel (recommended over GitHub pages due to its out-of-the-box support for React Router SPA routing).

## Architecture Decisions
1. **[Decision]**: Deployment Platform. Chose **Vercel** because it inherently supports Single Page Application (SPA) routing (e.g. going directly to `/about` won't 404). GitHub Pages requires an awkward `404.html` hack or HashRouting for SPAs.
2. **[Decision]**: Image Optimization. Chose to write a local node script using `sharp` to process all images in `pics/` into `public/gallery/` as WebP at max 1920px width to solve the performance risk.

## Implementation Steps

### Step 1: Image Processing Script
**Files**: `scripts/process-images.mjs`, `package.json`
**What to build**: Install `sharp`. Write a script that iterates over `pics/`, resizes images to max 1920x1920, converts them to WebP, and saves them to `public/gallery/`. Also generates a `src/data/gallery.json` file with the image paths for easy consumption.
**Test gate**: Run `node scripts/process-images.mjs`. Verify `public/gallery/` contains optimized `.webp` images and `src/data/gallery.json` is populated.

### Step 2: Global Layout & Navigation
**Files**: `src/App.tsx`, `src/main.tsx`, `src/components/Layout.tsx`, `src/components/Navbar.tsx`
**What to build**: Implement React Router with paths `/` and `/about`. Create a minimal, elegant Navbar (Name on left, Links on right). Apply monochromatic styling and modern fonts (Inter/Serif).
**Test gate**: Run `npm run dev`, verify the navbar is visible and we can navigate between `/` and `/about`.

### Step 3: Gallery Page (Home)
**Files**: `src/pages/Home.tsx`
**What to build**: Implement a responsive masonry layout using `react-responsive-masonry` to display the artworks from `src/data/gallery.json`. Add Framer Motion for subtle fade-in effects.
**Test gate**: Run `npm run build` to ensure no TypeScript/build errors. Preview the local site to see the masonry grid of WebP images.

### Step 4: About Page (CV)
**Files**: `src/pages/About.tsx`, `src/data/cv.json` (optional, or just hardcode text)
**What to build**: Translate the content of `CV_Zarate-1.docx.md` into beautiful, structured React components (Bio, Exhibitions, Fairs, Press). Focus on typography and vertical rhythm.
**Test gate**: Navigate to `/about` and verify the CV content is correctly formatted and responsive.

### Step 5: Vercel Deployment Setup
**Files**: `vercel.json`
**What to build**: Create a `vercel.json` file with a rewrite rule to redirect all paths to `index.html` to support React Router.
**Test gate**: Verify `vercel.json` syntax.

## Success Criteria & Out of Scope
- **Success Criteria**: All images load fast, navigation between Gallery and About works, CV is readable and elegantly formatted, build succeeds.
- **Out of Scope**: Backend/CMS (content is hardcoded), complex animations (sticking to simple fade-ins), e-commerce/store functionality.
