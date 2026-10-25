# Hero portrait reveal

A one-shot, 6.2-second spatial CSS portrait reveal for the portfolio landing stage. The scene pairs a deep charcoal-black field (`#090A09`) with Yash Thakur's portrait, a soft atmospheric rose illumination (`rgba(218, 125, 151, 0.22)`), subtle deep-emerald ambient grounding, a steady single-take camera rise, Fraunces display typography, and an integrated foreground positioning & CTA deck. The intro does not loop or block navigation.

## Variables / how to change the scene

| Variable | Current value | How to swap it |
| --- | --- | --- |
| Portrait source | `assets/yash-thakur-portrait.avif` with WebP fallback | Replace the local source encodings and the matching `<source>` / `<img>` URLs in `index.html`. Keep the original `assets/img/yash-thakur-portrait.png` intact. |
| Headline | `Yash Thakur` | Edit the two real text spans in `#hero-reveal-title` in `index.html`. Keep them as HTML text, not image artwork. |
| Atmospheric glow | `--hero-rose-glow: rgba(218, 125, 151, 0.22)` | Adjust `--hero-rose` / `--hero-rose-glow` in `hero-portrait-reveal.css`. |
| Duration | `6200ms` | Change `--hero-duration` in `hero-portrait-reveal.css`. |
| Poster | `assets/hero-poster-frame.png` (1280×900) | Referenced by `index.html` as the Open Graph preview image. |

## Revert

Set `data-hero-reveal="off"` on the root `<html>` element in `index.html`. The dark portrait reveal hides and the warm-ivory legacy hero renders in its place; the metrics plinth remains below either hero.
