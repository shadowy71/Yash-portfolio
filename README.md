# Yash Thakur — student portfolio

A single-page, sharpened-to-the-point portfolio for **Yash Thakur**, a first-year student in Pune
applying to club and committee core teams. It is deliberately **club-agnostic**: the copy speaks to
student councils, PR and social-media cells, cultural committees, design cells and event teams — so
the same site can be sent to any of them.

No build step, no framework, no tracking. Open `index.html` and it works.

---

## What's in here

| Section | What it does |
| --- | --- |
| **Hero** | One-line positioning, primary CTA, and the four numbers that matter (98.71 MHT-CET %ile, 90% SSC, 84.33% HSC, 2,000 art followers in 45 days). |
| **About** | Short, human introduction plus a details list (city, year, PRN, languages). |
| **Strengths** | Four capability rows: PR & social media, event coordination, visual & content design, follow-through. |
| **Track record** | Honest timeline from SSC through Class Representative, the 2k art page, and first year. |
| **Art gallery** | Five original pieces, medium filters, and a keyboard/touch-friendly lightbox. |
| **Hobbies** | Sketching, painting, craft & collage, and content making, with studio photography. |
| **The pitch** | A dark editorial block that frames the ask, plus the list of club types it applies to. |
| **Contact** | Email + copy button, Instagram, a validated message form that hands off to the visitor's mail app, and a **Print / save as PDF** action that produces a clean 8-page document (no nav, no forms). |

## Structure

```
index.html            all markup, one page
css/styles.css        design system, layout, responsive rules, print styles
js/main.js            nav, gallery filter, lightbox, form validation, copy email
assets/fonts/         self-hosted Fraunces, Manrope, Caveat (woff2, no CDN calls)
assets/img/           optimised webp artwork + studio photos
assets/favicon.svg
```

## Make it yours

1. **Contact details** — edit `CONFIG` at the top of `js/main.js`:

   ```js
   const CONFIG = {
     email: 'hello@yashthakur.in',
     instagram: 'https://instagram.com/yash.makes'
   };
   ```

   The mailto links, the copy button and the form hand-off all read from this object.

   > The email and Instagram handle above are placeholders. Swap them for Yash's real ones
   > before sending the site to anyone.

2. **Swap the artwork** — replace the `.webp` files in `assets/img/` (keep the same filenames) and
   update the `<figcaption>` notes, `alt` text, `data-title` and `data-meta` on each `.work` in
   `index.html`. Filter counts live in the `data-medium` attribute: `drawing`, `paint`,
   `watercolour`, `mixed`.

3. **Add or remove a piece** — copy a `<figure class="work ...">` block, give it a
   `data-medium`, and update the counts in the filter buttons and `.gallery-note` grid span.

4. **Copy voice** — first person, plain, no superlatives. If a line sounds like a brochure, cut it.

## Accessibility & behaviour notes

- Keyboard: skip link, visible focus rings, arrow keys and `Esc` in the lightbox, focus returned to
  the artwork after closing, focus trap while the viewer is open.
- The mobile menu traps nothing but closes on navigation and returns focus to the toggle.
- Motion respects `prefers-reduced-motion`; the site is fully legible with JS disabled.
- Colour pairings meet WCAG AA (body text 5.2:1+, headings 9:1+, dark section 13.8:1).
- `@media print` strips navigation, forms and the lightbox and turns the page into a clean
  one-document résumé.

## Run it locally

```bash
# any static server works
python3 -m http.server 8080
# then open http://localhost:8080
```

Deploy by uploading the folder to GitHub Pages, Netlify, Vercel or any static host — no build step.

## About the artwork (important)

The five gallery pieces and the two studio photos are **placeholders** — generated images used to
prove the layout, because the artwork PDF hadn't reached the workspace when the site was built.
Replace them with Yash's real scans:

1. Export the PDF pages as images (or photograph the originals flat, in even daylight).
2. Crop to the artwork, export WebP at ~1600px on the long edge, ~200 KB each.
3. Drop them into `assets/img/` using the same filenames, then fix the captions and `alt` text.

Filenames: `art-portrait.webp`, `art-street.webp`, `art-botanical.webp`, `art-hands.webp`,
`art-collage.webp`, plus `art-portrait-thumb.webp` and `studio.webp`.

## Still to do

- [ ] Replace the placeholder email + Instagram handle.
- [ ] Swap the sample artwork for Yash's own scans (see above).
- [ ] Confirm the "2,000 followers in 45 days" figure and the class-monitor years if you want them
      dated more precisely.
- [ ] Optional: add a real portrait photo to the About block if one is available.
