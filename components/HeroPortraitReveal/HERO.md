# Hero portrait reveal

A one-shot, 7-second CSS portrait reveal for the existing static portfolio. The scene is a near-black hero with the uploaded portrait, a warm vermillion backlight, a single steady camera rise, and real HTML headline text. The existing contact actions sit in a separate, centered band immediately below the hero, before the stats. The intro does not loop or block navigation.

## Variables / how to change the scene

| Variable | Current value | How to swap it |
| --- | --- | --- |
| Portrait source | `assets/yash-thakur-portrait.avif` with WebP fallback | Replace the local source encodings and the matching `<source>` / `<img>` URLs in `index.html`. Keep the original `assets/img/yash-thakur-portrait.png` intact. Rebuild both encodings to a maximum long edge of 1600px and refresh `yash-thakur-lqip.webp` if the source changes. |
| Headline | `YASH THAKUR` | Edit the two real text spans in the `hero-reveal-title` heading in `index.html`. Keep them as text, not image artwork. |
| Accent | `#bc4023` | Change `--hero-accent` in `hero-portrait-reveal.css`. Re-export `assets/hero-poster-frame.png` with the matching accent if the OG poster needs to stay in sync. |
| Duration | `7000ms` | Change `--hero-duration` and retune the `hero-word` offsets and `HERO.md` beat sheet. The word reveals currently total 1300ms and 1360ms; the camera and light finish at 7000ms. |
| Trigger / ending | First visible page load; one take; settles at the end | The CSS timeline starts on the initial hero paint. The component JS settles the scene after the camera animation ends, on Skip, on tab hiding, or if reduced motion is enabled. There is no loop. |
| Poster | `assets/hero-poster-frame.png` (1280×900) | Replace with a static frame made from the local portrait and current headline; `index.html` references this file as the Open Graph image. |

## Beat sheet (7,000ms)

| Time | Beat |
| --- | --- |
| 0–600ms | Backlight blooms from opacity 0 to full; subtle CSS grain is visible on larger screens. The base field is #08080A with a very faint warm top vignette. |
| 400–1,300ms | “YASH” resolves from 8px blur and a small upward offset. |
| 460–1,360ms | “THAKUR” resolves with a 60ms stagger from the first word. |
| 1,190–2,205ms | A soft elliptical clip opens on the portrait; the vermillion rim/backlight follows behind it. |
| 0–7,000ms | One continuous wrapper camera move: translate Y +8% to −2%, rotateX 6° to 0°, scale 1.06 to 1.02. Mobile travel is 60% of desktop. |
| 5,500–7,000ms | The title glow breathes subtly and returns to its base level as the camera settles. |

The headline, portrait alternative text, and existing contact links remain real DOM content. On reduced motion, the CSS final-frame values render immediately. `Skip intro` is keyboard reachable and stops the timeline immediately.

## Three tuning knobs

1. **Glow radius** — adjust `18px` and `48px` in `.hero-reveal__name` / `@keyframes hero-glow` text-shadow values.
2. **Camera travel** — adjust the `from` / `to` `translate3d`, `rotateX`, and `scale` values in `@keyframes hero-camera`; mobile has its own 60%-travel override.
3. **Timeline length** — change `--hero-duration: 7000ms`; retune the headline delays so the final camera frame and 5.5s breathing beat still line up.

## Revert

Set `data-hero-reveal="off"` on the root `<html>` element in `index.html`. The new scene hides and the preserved original warm-paper hero returns; the key-number stats remain below either hero.
