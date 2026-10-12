# Images — quick reference

This whole `public/` folder is served from the site's root, so anything you save here:

```
public/assets/images/logo/ieee-bnu-logo.png
```

is used in the code as this path:

```
/assets/images/logo/ieee-bnu-logo.png
```

## Where each photo goes

| Folder | What goes here | Used by |
|---|---|---|
| `logo/` | Your branch logo (PNG or SVG, transparent background works best) | `logo` in `src/data/siteConfig.js` |
| `board/` | High Board member photos | `image` for each person in `src/data/highBoard.js` |
| `team/` | Technical team photos (lead, software head, hardware head) | `image` for each person in `src/data/technicalTeam.js` |
| `workshops/` | Workshop cover photos | `image` for each workshop in `src/data/workshops.js` |

## How to add a photo (step by step)

1. Drop the image file into the matching folder above (e.g. `board/chairman.jpg`).
2. Open the matching data file in `src/data/`.
3. Paste the path into the `image` (or `logo`) field, starting with `/assets/images/...`:
   ```js
   image: "/assets/images/board/chairman.jpg",
   ```
4. Save — the dev server updates automatically.

If a path is left empty (`""`) or points to a file that doesn't exist, the site shows a clean
placeholder icon instead of a broken image, so nothing ever looks broken while you're filling photos in.

## Tips
- **Board & team photos:** square or 4:5 portrait, at least 500px on the short side.
- **Logo:** PNG or SVG with a transparent background, roughly square.
- **Workshop photos:** landscape (4:3), at least 800px wide.
- **File size:** JPG or WebP, ideally under ~300 KB each, so the site stays fast.
- **File names:** no spaces — use dashes or underscores (`chairman.jpg`, not `chairman photo.jpg`).

For a full guide to every editable file on the site (text included), see `CONTENT_GUIDE.md`
in the project root.
