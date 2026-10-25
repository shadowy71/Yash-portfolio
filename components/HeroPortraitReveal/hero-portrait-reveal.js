(() => {
  const scene = document.querySelector('[data-hero-reveal-scene]');
  if (!scene) return;

  const skip = scene.querySelector('[data-hero-skip]');
  const depth = scene.querySelector('.hero-reveal__depth');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let settled = false;

  function settle() {
    if (settled) return;
    settled = true;
    scene.dataset.play = 'false';
    scene.classList.add('is-settled');
    skip.hidden = true;
    scene.querySelectorAll('.hero-reveal__depth, .hero-reveal__portrait, .hero-reveal__backlight, .hero-reveal__name, .hero-reveal__subhead')
      .forEach((element) => element.getAnimations().forEach((animation) => animation.cancel()));
  }

  if (reduceMotion.matches || document.visibilityState !== 'visible') {
    scene.dataset.play = 'false';
    skip.hidden = true;
    return;
  }

  scene.dataset.play = 'true';
  skip.hidden = false;
  depth.addEventListener('animationend', (event) => {
    if (event.animationName === 'hero-camera') settle();
  }, { once: true });
  skip.addEventListener('click', settle, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') settle();
  }, { once: true });
  reduceMotion.addEventListener?.('change', (event) => {
    if (event.matches) settle();
  }, { once: true });
})();
