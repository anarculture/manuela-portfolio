# Research: Portfolio Site for Manuela Zarate
**Date**: 2026-05-20
**Requested**: Build and deploy a contemporary, minimal, artistic, elegant, and functional artist portfolio website using provided CV and pictures.
**Status**: PENDING DECISION

## What Exists Today
- **Codebase**: A React + Vite project initialized with TailwindCSS (v4), Radix UI, framer-motion, react-router, etc.
- **Assets**: 
  - `pics/` directory contains ~21 images of her work and exhibitions (e.g., "El Guiso", "Picar la torta").
  - `pics/CV_Zarate-1.docx.md` contains her curriculum vitae: exhibitions, education, awards (Premio GEGO 2025), catalogs, and press.

## What Needs to Be Built
- **UI/Layout**: A minimal, elegant design focusing on whitespace, typography, and letting the artworks stand out.
- **Pages/Sections**: 
  - **Gallery**: A masonry or grid layout displaying her artworks (images from `pics/`).
  - **About/CV**: Text section containing her bio, exhibitions, and publications from `CV_Zarate-1.docx.md`.
- **Asset Processing**: Images need to be moved to `public/` or `src/assets/`.
- **Deployment**: Setup the build process to be easily deployable (e.g. Vercel, Netlify, or GitHub Pages).

## Risks
| Risk | Likelihood | Impact | Notes |
|---|---|---|---|
| Image Performance | High | High | Several images are very large (`_E5A1203.jpg` is 28MB, `la torta .JPG` is 16MB). Serving them directly will severely hurt performance. They must be optimized/resized before use. |
| Subjective Design | Medium | Medium | "Minimal, elegant" can be interpreted in various ways. I'll use a clean, monochromatic palette and modern typography (inter/serif mix) to ensure a premium feel. |

## Architecture Decision Points
1. **[Decision]**: Routing Strategy
   - *Option A*: Single-page application (SPA) with smooth scrolling between a Gallery section and an About section.
   - *Option B*: Multi-page using React Router (`/` for Gallery, `/about` for CV).
   - *Recommendation*: **Option B** to keep the gallery clean and focused, and have a dedicated text-heavy page for the CV.
2. **[Decision]**: Image Optimization
   - *Option A*: Run a script to compress and resize all images into WebP/JPEG format to a max width (e.g., 1920px) before building the site.
   - *Option B*: Keep original images and rely on basic scaling (Not recommended due to 28MB files).
   - *Recommendation*: **Option A**.

## Effort Estimate
- ~2-3 hours. High confidence.

## Recommendation
GO

**Decision**: [ ] GO  [ ] NO-GO  [ ] NEEDS CLARIFICATION
