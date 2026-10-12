# IEEE BNU Student Branch Website

A futuristic, interactive website for the IEEE BNU Student Branch, built with
**React + Vite + Three.js (React Three Fiber & Drei) + Framer Motion + Lucide icons**.

Highlights: a cinematic 3D "I E E E" letter-drop hero, an interactive technical-team
flowchart, data-driven workshops, and a layered High Board showcase.

---

## 1. Install & run

You need **Node.js 20.19+ or 22.12+** (download the LTS version from https://nodejs.org).

```bash
npm install      # install dependencies (once)
npm run dev      # start the site → open http://localhost:5173
```

Other commands:

```bash
npm run build    # production build into /dist
npm run preview  # preview the production build locally
```

---

## 2. Where to edit things

**→ See [`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md) for the complete, file-by-file guide to every
editable piece of text, every data file (join link, team, workshops, board), and how to add photos.**

The short version:

| I want to change…                   | Edit this file                | 
|-------------------------------------|-------------------------------|
| **Google Form / join link**         | `src/data/siteConfig.js` → `JOIN_FORM_URL` |
| Logo, contact email, university info, social media links | `src/data/siteConfig.js` |
| Navigation menu items               | `src/data/siteConfig.js` → `navLinks` |
| **Technical team** names & roles    | `src/data/technicalTeam.js`   |
| **Workshops** (add / edit)          | `src/data/workshops.js`       |
| **High Board** names, photos, links | `src/data/highBoard.js`       |
| **Photos / logo**                   | `public/assets/images/` — see `CONTENT_GUIDE.md` |
| Headings & paragraphs (hero, about, join…) | listed per-section in `CONTENT_GUIDE.md` |
| Colours, fonts, spacing             | top of `src/styles/global.css` (CSS variables) |

---

## 2b. Design system (dark & technical)

- Colours, fonts and spacing live at the top of `src/styles/global.css` (`--accent`, `--black`, `--panel`,
  `--font-display`, `--font-mono`…). Everything else on the site reads from these variables, so changing
  one value here updates the whole site.
- The theme is near-black throughout (`--black` / `--panel` / `--panel-2`), with a single accent blue
  (`--accent`) used with discipline — for links, borders, tags and the odd glow, never as a loud fill.
- Three recurring motifs tie the sections together instead of alternating colour blocks: a faint
  blueprint **grid** (`.grid-bg`), small **corner brackets** (`.corner-frame`), and a monospace
  **eyebrow** label above each heading (e.g. "03 — Technical Team", set via the `eyebrow` prop on
  `SectionHeading`).
- Three fonts: **Space Grotesk** for headings, **Inter** for body text, **JetBrains Mono** for labels,
  tags and the eyebrows (all loaded in `index.html`).

---

## 3. About the 3D hero

The hero plays a fast, choreographed reveal: the four letters swoop in on converging diagonal
paths (not a plain straight drop), land with one crisp, solid-feeling bounce, and finish with a
light-sweep and a soft shockwave ring once the last letter settles — the whole sequence takes
about 2.5 seconds on a normal device.

`src/components/three/HeroScene.jsx` builds the scene. Near the top you can tune the feel:

```js
const GRAVITY = 46;        // higher = faster, snappier fall
const RESTITUTION = 0.22;  // bounciness — low, so it reads as a solid landing, not a toy bounce
const DELAYS = [0.1, 0.32, 0.54, 0.76]; // seconds before each letter is released (tight = fast cascade)
const DRIFT = 1.15;        // how far each letter swoops in sideways before converging
```

Good to know:
- The letters are custom 3D shapes (no font files, no downloads).
- **Reduced motion:** visitors who prefer reduced motion see the letters already in place.
- **Replay:** the "Replay animation" button restarts the whole sequence, finale included.
- **Never blocks the page:** the text always appears within a few seconds, even on slow devices,
  and the 3D scene pauses when scrolled out of view.
- **No WebGL?** A CSS fallback plays a matching fast single-bounce drop instead.

---

## 4. Deploy to GitHub + Vercel

```bash
git init
git add .
git commit -m "IEEE BNU website"
# create an empty repo on GitHub, then:
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

On https://vercel.com → **Add New… → Project** → import the repo. Vercel detects Vite
automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.

---

## 5. Project structure

```
CONTENT_GUIDE.md            ← full guide to every editable text, data file, and photo
public/
  favicon.svg
  assets/images/
    logo/  board/  team/  workshops/   ← put your photos here (see CONTENT_GUIDE.md)
src/
  main.jsx                  entry point
  App.jsx                   page layout (order of sections)
  components/
    Navbar.jsx  Hero3D.jsx  About.jsx  JoinCTA.jsx  JoinButton.jsx
    TechnicalFlowchart.jsx  Workshops.jsx  WorkshopVisual.jsx
    HighBoard.jsx  Footer.jsx
    three/HeroScene.jsx     the 3D scene
    common/                 small reusable pieces (Logo, SafeImage, SocialIcon…)
  data/                     ← edit your content here
    siteConfig.js  technicalTeam.js  workshops.js  highBoard.js
  hooks/  utils/
  styles/                   global.css (design tokens), animations.css, one file per section
```

Note: the IEEE BNU logo placeholder is **not** the official IEEE logo — replace it with your own
branch logo when you have it.
