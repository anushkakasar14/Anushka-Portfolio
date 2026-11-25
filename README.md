# Anushka Kasar — Portfolio

A route-based React single-page application (Vite, React Router, Framer Motion, Lenis, Lucide).
Frontend-only: no backend, database or auth.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # serve the build locally
```

## How it works

- **Routes:** `/`, `/about`, `/projects`, `/projects/:projectId` (`parijatak`, `retinopathy`), `/skills`, `/experience` and `/contact`. Unknown paths show a 404 page.
- **Lazy loading:** every page is lazy-loaded (`src/routes.js`) inside `<Suspense fallback={<PageLoader />}>`. Once the first page is idle, the remaining page chunks are prefetched.
- **Transitions:** `PageTransition` animates each page in and out using `AnimatePresence mode="wait"`. `ScrollToTop` runs after the old page has finished leaving, so the new page always starts at the top.
- **Errors:** `ErrorBoundary` catches crashes inside the page area and shows a fallback screen. The navbar and footer stay usable, and the error clears when you navigate.
- **ThemeContext:** holds the reduced-motion setting. It follows the OS setting by default, and visitors can override it with the footer toggle. Lenis, the custom cursor, particles, Framer Motion and CSS animations all read this one value.
- **Data-driven:** `data/projects.js` defines each case study as typed blocks (text, features, flow, stack, notice, links), and `ProjectDetails` renders them in order. To add a project, add an object to that file.
- **Hosting:** `vercel.json` (and `public/_redirects` for Netlify) sends every path to `index.html`, so opening or refreshing a URL like `/projects/parijatak` works.

## Before you deploy

1. **Resume:** drop a PDF into `src/assets/resume/`. Vite bundles it automatically, and every "Download Resume" button downloads it (`src/data/resume.js`). Until you add one, those buttons open an email asking for the resume, so no link is broken.
2. Optionally replace the code-drawn project visuals with screenshots (`components/projects/ProjectVisual.jsx`).
3. After deploying, set `og:image` in `index.html` to an absolute URL. A PNG is safest.

## Structure

```
src/
├── App.jsx · main.jsx · routes.js
├── components/
│   ├── Home.jsx  About.jsx  Projects.jsx  Skills.jsx  Experience.jsx  Contact.jsx  NotFound.jsx
│   ├── home/        Hero, ExploreIndex
│   ├── about/       CodeCard, FactCard, Journey, Services, Recruiter
│   ├── projects/    ProjectCard, ProjectDetails, DetailBlock, ProjectVisual
│   ├── skills/      SkillCard, SkillFilters
│   ├── experience/  Timeline
│   └── common/      Navbar, Footer, PageTransition, PageLoader, ErrorBoundary, ScrollToTop,
│                    CustomCursor, MagneticButton, AnimatedText, SectionHeading, Reveal,
│                    GlowBackground, Particles, Marquee, ScrollProgress, SocialLinks
├── context/ThemeContext.jsx
├── hooks/      useMediaQuery, useMousePosition, useIntersectionObserver, useScrollProgress,
│               usePageMeta, useLenis
├── data/       site.js, projects.js, skills.js, experience.js, resume.js
├── services/contact.js   # mock submit + validation (swap for a real API later)
├── lib/        icons, motion presets, scroll helpers
└── styles/     globals.css · animations.css · responsive.css
```

## Notes

- `prefers-reduced-motion` turns off Lenis, the custom cursor, particles, parallax and the ambient keyframes.
- The custom cursor and magnetic buttons only activate on mouse or trackpad devices.
