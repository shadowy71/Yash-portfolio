(() => {
  const scene = document.querySelector('[data-hero-reveal-scene]');
  if (!scene) return;

  const skip = scene.querySelector('[data-hero-skip]');
  const depth = scene.querySelector('.hero-reveal__depth');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  let settled = false;
  let rafId = 0;

  function enableSubtleParallax() {
    if (reduceMotion.matches || !finePointer.matches) return;
    scene.addEventListener('pointermove', (event) => {
      if (reduceMotion.matches) return;
      const rect = scene.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / Math.max(1, rect.width)) - 0.5;
      const ny = ((event.clientY - rect.top) / Math.max(1, rect.height)) - 0.5;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        scene.style.setProperty('--parallax-x', `${(nx * -14).toFixed(2)}px`);
        scene.style.setProperty('--parallax-y', `${(ny * -10).toFixed(2)}px`);
        scene.style.setProperty('--portrait-x', `${(nx * 5).toFixed(2)}px`);
        scene.style.setProperty('--portrait-y', `${(ny * 3.5).toFixed(2)}px`);
      });
    }, { passive: true });

    scene.addEventListener('pointerleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      scene.style.setProperty('--parallax-x', '0px');
      scene.style.setProperty('--parallax-y', '0px');
      scene.style.setProperty('--portrait-x', '0px');
      scene.style.setProperty('--portrait-y', '0px');
    }, { passive: true });
  }

  function settle() {
    if (settled) return;
    settled = true;
    scene.dataset.play = 'false';
    scene.classList.add('is-settled');
    if (skip) skip.hidden = true;
    scene.querySelectorAll('.hero-reveal__depth, .hero-reveal__portrait, .hero-reveal__backlight, .hero-reveal__word, .hero-reveal__eyebrow, .hero-reveal__deck')
      .forEach((element) => element.getAnimations?.().forEach((animation) => animation.cancel()));
    enableSubtleParallax();
  }

  if (reduceMotion.matches || document.visibilityState !== 'visible') {
    settle();
    return;
  }

  scene.dataset.play = 'true';
  if (skip) skip.hidden = false;

  if (depth) {
    depth.addEventListener('animationend', (event) => {
      if (event.animationName === 'hero-camera') settle();
    }, { once: true });
  }

  if (skip) {
    skip.addEventListener('click', settle, { once: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') settle();
  }, { once: true });

  reduceMotion.addEventListener?.('change', (event) => {
    if (event.matches) {
      scene.style.setProperty('--parallax-x', '0px');
      scene.style.setProperty('--parallax-y', '0px');
      scene.style.setProperty('--portrait-x', '0px');
      scene.style.setProperty('--portrait-y', '0px');
      settle();
    }
  });
})();
