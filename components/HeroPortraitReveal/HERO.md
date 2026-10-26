# Hero portrait reveal

A one-shot, 6.2-second spatial CSS portrait reveal for the portfolio landing stage. The scene pairs a cinematic near-black field (`#0B0A09`) with Yash Thakur's portrait, a soft burnt-orange / amber environmental illumination (`rgba(199, 122, 66, 0.22)`, core `rgba(230, 160, 100, 0.27)`) graded to the poster frame, subtle deep-brown ambient grounding, a steady single-take camera rise, Fraunces display typography, and an integrated foreground positioning & CTA deck. The intro does not loop or block navigation.

## Variables / how to change the scene

| Variable | Current value | How to swap it |
| --- | --- | --- |
| Portrait source | `assets/yash-thakur-portrait.avif` with WebP fallback | Replace the local source encodings and the matching `<source>` / `<img>` URLs in `index.html`. Keep the original `assets/img/yash-thakur-portrait.png` intact. |
| Headline | `Yash Thakur` | Edit the two real text spans in `#hero-reveal-title` in `index.html`. Keep them as HTML text, not image artwork. |
| Atmospheric glow | `--hero-accent-glow: rgba(199, 122, 66, 0.22)` | Adjust `--hero-accent` / `--hero-accent-glow` / `--hero-accent-core` in `hero-portrait-reveal.css`. These mirror the global `--accent` / `--accent-bright` tokens in `css/styles.css`. |
| Duration | `6200ms` | Change `--hero-duration` in `hero-portrait-reveal.css`. |
| Poster | `assets/hero-poster-frame.png` (1280×900) | Referenced by `index.html` as the Open Graph preview image. |

## Revert

Set `data-hero-reveal="off"` on the root `<html>` element in `index.html`. The dark portrait reveal hides and the legacy hero renders in its place — re-graded to the same warm-dark system; the metrics plinth remains below either hero.
