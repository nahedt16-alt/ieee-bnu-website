# Content Guide — editing every piece of the site

This is the complete map of what to edit and where. There are two kinds of content:

- **Structured content** — team members, workshops, board names, links — lives in `src/data/`
  as plain JavaScript objects and arrays. Edit the values, save, done.
- **Page text** — headings, taglines, short paragraphs that appear once — lives directly inside
  the component that renders that section. It's listed section-by-section below, with the exact
  file and the current wording so you can find it with your editor's search (Ctrl/Cmd+F).

Nothing here needs you to understand React. Find the text in quotes, change it, save the file.

---

## 1. Data files (`src/data/`)

### `siteConfig.js` — global settings
| Field | What it controls |
|---|---|
| `JOIN_FORM_URL` | The link every "Join" button opens, in a new tab. Replace `"ADD_YOUR_GOOGLE_FORM_LINK_HERE"` with your real form URL. |
| `siteConfig.name` | Full branch name (used in the footer copyright line) |
| `siteConfig.shortName` | Short name shown next to the logo ("IEEE BNU") |
| `siteConfig.tagline` | "Connecting Minds. Creating the Future." — shown in the hero and the footer |
| `siteConfig.logo` | Path to your logo file, e.g. `/assets/images/logo/ieee-bnu-logo.png` |
| `siteConfig.contactEmail` | Email shown in the footer |
| `siteConfig.university` | `name`, `faculty`, `location` shown in the footer |
| `siteConfig.socialLinks` | Facebook / Instagram / LinkedIn / GitHub URLs for the footer. Leave a URL empty (`""`) to show it dimmed and unclickable. |
| `navLinks` | The six navbar items (label + which section they jump to) |

### `technicalTeam.js` — the flowchart
- `root` — the TECHNICAL node: its label, short description, and `lead` (role + name + optional photo).
- `branches` — an array of two: SOFTWARE and HARDWARE, each with a label, description and `head`
  (role + name + optional photo). Copy one object in the array to add a third branch.

### `workshops.js` — the Workshops section
An array — one object per workshop card. Copy an existing object, paste it after the last one, edit the fields:
```js
{
  id: "web-dev",              // unique, no spaces
  title: "Web Development Workshop",
  category: "Software",       // filter chips appear automatically once you have 2+ categories
  description: "Short description shown on the card.",
  visual: "",                 // "arduino" uses the built-in illustration; "" uses a generic one
  image: "",                  // optional photo, e.g. "/assets/images/workshops/web-dev.jpg"
  details: ["One paragraph.", "Another paragraph."], // shown in "Learn More"; [] shows "coming soon"
  link: "",                   // optional URL button shown inside "Learn More"
},
```
`showComingSoonCard` (at the bottom of the file) toggles the dashed "More workshops coming soon" tile.

### `highBoard.js` — the High Board section
An array of seven people. Replace the placeholder names (`[CHAIRMAN NAME]`, `[VICE CHAIRMAN NAME]`,
`[SECRETARY NAME]`, `[WEBMASTER NAME]`, `[TREASURER NAME]`) with real ones. Add a photo path and/or
social links per person — any link left as `""` is hidden automatically. Don't change the `tier`
field — it controls where each card sits (Chairman gets the large top spot, Vice Chairman second,
Secretary/Webmaster/Treasurer in a row, the two faculty members in their own frame).

---

## 2. Page text, section by section

This text isn't in a data file because each line only appears once — open the file, search for the
quoted text, and edit it in place.

### Navbar — `src/components/Navbar.jsx`
Menu labels (Home, About, Technical Team, Workshops, High Board, Join Us) come from `navLinks` in
`siteConfig.js`, not from this file.

### Hero — `src/components/Hero3D.jsx`
| Text | Where |
|---|---|
| "IEEE BNU" / "Student Branch." | `hero-title__main` / `hero-title__sub` spans |
| "Connecting Minds. Creating the Future." | comes from `siteConfig.tagline`, not this file |
| "A student community for learning new skills, building projects and growing together." | `hero-blurb` paragraph |
| "Explore IEEE BNU" | button text |
| "Learn · Build · Connect" | the small vertical side label |
| "Scroll to explore" | bottom-left scroll cue |
| "Replay animation" | the replay button |

### About — `src/components/About.jsx`
| Text | Where |
|---|---|
| "More Than Just a Student Branch" | `SectionHeading` title |
| "IEEE is a global professional organization…" | first `<p className="lead">` |
| "IEEE BNU Student Branch brings that spirit…" | second `<p>` |
| "At IEEE BNU, students can" | `about__subtitle` |
| The five list items (title + one-line description each) | the `topics` array near the top of the file |

### Join — `src/components/JoinCTA.jsx`
| Text | Where |
|---|---|
| "Want to Join IEEE BNU?" | `<h2 id="join-title">` |
| "Your journey starts here." | the `<p>` under it |
| "Join Our Community" | passed to `<JoinButton>` |

### Technical Team — `src/components/TechnicalFlowchart.jsx`
| Text | Where |
|---|---|
| "Technical Team" | `SectionHeading` title |
| "Select the TECHNICAL node to see how the team branches out…" | `SectionHeading` intro |
| "Expand all" / "Collapse all" | the button next to the heading |
| TECHNICAL / SOFTWARE / HARDWARE labels, descriptions, and names | `src/data/technicalTeam.js` (see above) |

### Workshops — `src/components/Workshops.jsx`
| Text | Where |
|---|---|
| "Workshops" | `SectionHeading` title |
| "Hands-on sessions where ideas turn into something you can build, test and show." | `SectionHeading` intro |
| "More workshops coming soon" + its line underneath | near the bottom of the file |
| Individual workshop titles/descriptions | `src/data/workshops.js` (see above) |

### High Board — `src/components/HighBoard.jsx`
| Text | Where |
|---|---|
| "High Board" | `SectionHeading` title |
| "The people who lead the branch and guide its direction." | `SectionHeading` intro |
| "Supervision and mentorship" | the label above the faculty cards |
| Names, positions, photos | `src/data/highBoard.js` (see above) |

### Footer — `src/components/Footer.jsx`
| Text | Where |
|---|---|
| Tagline, contact email, university info, social links | `siteConfig.js` (see above) |
| "Explore" / "Contact" column headings | directly in this file |
| "© {year} … All rights reserved." | bottom of this file (the year fills in automatically) |

---

## 3. Photos & logo

All images live under `public/assets/images/`, already split into four folders:

```
public/assets/images/
  logo/         ← your branch logo
  board/        ← High Board member photos
  team/         ← technical team photos
  workshops/    ← workshop cover photos
```

**To add a photo:**
1. Save the image file into the matching folder (e.g. `public/assets/images/board/chairman.jpg`).
2. Open the matching data file (`siteConfig.js`, `highBoard.js`, `technicalTeam.js` or `workshops.js`).
3. Set the `image` (or `logo`) field to the path starting with `/assets/images/…`:
   ```js
   image: "/assets/images/board/chairman.jpg",
   ```
4. Save. The dev server picks it up instantly.

If a field is left empty, or points to a file that doesn't exist, the site shows a clean placeholder
instead of a broken image — nothing ever looks broken while photos are still being collected.

**Sizing tips:** board/team photos — square or 4:5 portrait, 500px+ on the short side. Logo — PNG or
SVG, transparent background. Workshop photos — landscape (4:3), 800px+ wide. Keep files under ~300 KB
(JPG or WebP) so the site stays fast, and avoid spaces in file names.

A copy of this image guide also lives at `public/assets/images/README.md`, right next to the folders.

---

## 4. Colours, fonts & layout

Not text, but worth knowing: colours, fonts, and spacing are CSS variables at the top of
`src/styles/global.css` (`--accent`, `--black`, `--panel`, `--font-display`, `--font-mono`, etc.).
The theme is near-black throughout with one accent blue used sparingly; sections are tied together
with a shared blueprint grid, corner brackets, and small monospace "eyebrow" labels (the
`eyebrow` prop on `SectionHeading`) rather than alternating colour blocks.
