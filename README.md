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
     email: 'yash.thakur26@pccoepune.org',
     instagram: 'https://instagram.com/yashxart_'
   };
   ```

   The mailto links, the copy button and the form hand-off all read from this object.

   These are the live contact details used throughout the site.

2. **Swap the artwork** — replace the `.webp` files in `assets/img/` (keep the same filenames) and
   update the `<figcaption>` notes, `alt` text, `data-title` and `data-meta` on each `.work` in
   `index.html`. Filter counts live in the `data-medium` attribute: `drawing`, `paint`, `sketch`.

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

## About the artwork

The five gallery images are extracted from `compressed-10mb-ART.pdf`, in PDF order:

| PDF page | Local WebP | Gallery title |
| --- | --- | --- |
| 5 | `elder-pencil-portrait.webp` | Elder portrait |
| 11 | `striped-turban-portrait.webp` | Striped turban |
| 15 | `lamplit-colourful-landscape.webp` | Lamplit landscape |
| 27 | `tiger-pencil-study.webp` | Tiger study |
| 38 | `split-face-anime-sketch.webp` | Split-face character |

Images retain their source proportions, are capped at 1600px, and use WebP quality 85.
The hero, social preview, and main hobby image reuse the lamplit landscape;
the smaller hobby image reuses the elder portrait. No generated artwork remains.

## Still to do

- [x] Set the college email address and @yashxart_ Instagram account.
- [x] Replace sample artwork with selected images from the portfolio PDF.
- [ ] Confirm the "2,000 followers in 45 days" figure and the class-monitor years if you want them
      dated more precisely.
- [ ] Optional: add a real portrait photo to the About block if one is available.
