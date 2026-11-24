# brandon_made — portfolio

React + Vite portfolio for Brandon (Taishang) Sun, digital media designer.

## Run it

```bash
cd "brandon-folio"
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview the build
```

Needs Node 18+ (20+ recommended).

## Where to edit

| What | File |
| --- | --- |
| All text, projects, strengths, links, email/phone | `src/data.js` |
| Colours, fonts, spacing, breakpoints | `src/styles/global.css` (`:root` at the top) |
| Sections | `src/components/` — `Hero`, `FeedStrip`, `Works`, `WorkModal`, `Strengths`, `Contact`, `Nav` |
| Images & video | `public/media/` |

### Add a project
1. Drop a cover image into `public/media/works/<id>.jpg` (≈1400px on the long side, JPG).
2. Add an entry to `works` in `src/data.js` with the same `id` and a `cat`
   (`3d`, `virtual`, `video`, `uiux`, `2d`, `photo`, `sound`).

Project descriptions and art-piece titles are starter copy — rewrite them in your own words.

### Hero video
`public/media/hero.mp4` (desktop, 1280px) and `hero-mobile.mp4` (phones, 720px) are
text-free cuts from `showreel.mp4`, muted and looped. `hero-poster.jpg` shows while it loads.
Replace them with any short muted MP4 (keep it under ~5 MB).

## Layout
- Content width capped at **1700px** (`--container`), with fluid side padding.
- Breakpoints: desktop ≥ 1100px · tablet 721–1099px · mobile ≤ 720px.
- Respects `prefers-reduced-motion` (video paused, animations off).

## Deploy
`vite.config.js` uses `base: './'`, so `/dist` works on Netlify, Vercel, GitHub Pages
or any static host — just upload the folder (or connect the repo and set build command
`npm run build`, output `dist`).

`design-notes/` only holds contact sheets used while designing; it isn't part of the site.
