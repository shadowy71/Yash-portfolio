/* =========================================================
   Yash Thakur — portfolio interactions
   ------------------------------------
   Everything is progressive enhancement: the page reads fine
   without JS. Configure contact details in CONFIG below.
   ========================================================= */

const CONFIG = {
  // Primary contact address.
  email: 'yash.thakur26@pccoepune.org',
  // Same handle used in the footer / contact block.
  instagram: 'https://instagram.com/yashxart_'
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- year ---------- */
$$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ---------- keep contact links in sync with CONFIG ---------- */
$$('[data-email-link]').forEach((a) => {
  a.href = `mailto:${CONFIG.email}`;
  if (a.textContent.trim().includes('@')) a.textContent = CONFIG.email;
});
$$('[data-instagram-link]').forEach((a) => { a.href = CONFIG.instagram; });

/* =========================================================
   Header + mobile menu
   ========================================================= */
const header = $('#site-header');
const menuBtn = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');

const onScroll = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

let closeMenuTimer = null;

function openMenu() {
  if (!mobileMenu || !menuBtn) return;
  window.clearTimeout(closeMenuTimer);
  mobileMenu.hidden = false;
  requestAnimationFrame(() => mobileMenu.classList.add('is-open'));
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('is-locked');
}

function closeMenu(returnFocus = true) {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.classList.remove('is-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('is-locked');
  closeMenuTimer = window.setTimeout(() => {
    if (!mobileMenu.classList.contains('is-open')) mobileMenu.hidden = true;
  }, reduceMotion ? 0 : 300);
  if (returnFocus) menuBtn.focus({ preventScroll: true });
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  $$('a', mobileMenu).forEach((link) => {
    link.addEventListener('click', () => closeMenu(false));
  });
}

/* =========================================================
   Reveal on scroll
   ========================================================= */
const revealEls = $$('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 55}ms`;
    revealObserver.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

/* =========================================================
   Scroll spy for desktop nav
   ========================================================= */
const navLinks = $$('.nav-desktop a[href^="#"]');
const spySections = navLinks
  .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
  .filter(Boolean);

if (spySections.length && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${entry.target.id}`;
        if (isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spySections.forEach((section) => spy.observe(section));
}

/* =========================================================
   Gallery filter
   ========================================================= */
const gallery = $('[data-gallery]');
const filterButtons = $$('.filter');
const galleryStatus = $('[data-gallery-status]');
const galleryNote = $('.gallery-note');
const works = $$('.work', gallery || document);

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    let shown = 0;
    works.forEach((work) => {
      const matches = filter === 'all' || work.dataset.medium === filter;
      work.hidden = !matches;
      if (matches) shown += 1;
    });

    if (gallery) gallery.classList.toggle('is-filtered', filter !== 'all');
    if (galleryNote) galleryNote.hidden = filter !== 'all';
    if (galleryStatus) {
      galleryStatus.textContent = filter === 'all'
        ? `Showing all ${shown} pieces`
        : `Showing ${shown} of ${works.length} — ${filter}`;
    }
  });
});

/* =========================================================
   Lightbox
   ========================================================= */
const lightbox = $('[data-lightbox]');
const lbDialog = $('[data-lightbox-dialog]');
const lbImg = $('[data-lightbox-img]');
const lbTitle = $('[data-lightbox-title]');
const lbMeta = $('[data-lightbox-meta]');
const lbNote = $('[data-lightbox-note]');
const lbCounter = $('[data-lightbox-counter]');
const lbClose = $('.lightbox-close');
let lbIndex = 0;
let lastFocused = null;
let visibleWorks = [];
let touchStartX = null;

function worksVisibleNow() {
  return works.filter((work) => !work.hidden);
}

function renderLightbox() {
  const work = visibleWorks[lbIndex];
  if (!work) return;
  const img = $('img', work);
  const note = $('.work-note', work);
  lbImg.src = img.getAttribute('src');
  lbImg.alt = img.getAttribute('alt') || '';
  lbTitle.textContent = work.dataset.title || '';
  lbMeta.textContent = (work.dataset.meta || '').replace(/&amp;/g, '&');
  lbNote.textContent = note ? note.textContent : '';
  lbCounter.textContent = `${lbIndex + 1} / ${visibleWorks.length}`;
  const single = visibleWorks.length < 2;
  $('[data-lightbox-prev]').hidden = single;
  $('[data-lightbox-next]').hidden = single;
}

function openLightbox(work) {
  if (!lightbox) return;
  visibleWorks = worksVisibleNow();
  lbIndex = Math.max(0, visibleWorks.indexOf(work));
  lastFocused = document.activeElement;
  renderLightbox();
  lightbox.hidden = false;
  document.body.classList.add('is-locked');
  if (lbClose) lbClose.focus({ preventScroll: true });
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.classList.remove('is-locked');
  if (lastFocused) lastFocused.focus({ preventScroll: true });
}

function stepLightbox(direction) {
  if (!visibleWorks.length) return;
  lbIndex = (lbIndex + direction + visibleWorks.length) % visibleWorks.length;
  renderLightbox();
}

works.forEach((work) => {
  const btn = $('.work-btn', work);
  if (!btn) return;
  btn.addEventListener('click', () => openLightbox(work));
});

if (lightbox) {
  $$('[data-lightbox-close]').forEach((el) => el.addEventListener('click', closeLightbox));
  $('[data-lightbox-prev]').addEventListener('click', () => stepLightbox(-1));
  $('[data-lightbox-next]').addEventListener('click', () => stepLightbox(1));

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 55) stepLightbox(delta > 0 ? -1 : 1);
    touchStartX = null;
  }, { passive: true });
}

document.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.hidden) {
    if (e.key === 'Escape') { e.preventDefault(); closeLightbox(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); stepLightbox(1); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); stepLightbox(-1); return; }
    if (e.key === 'Tab' && lbDialog) {
      const focusables = $$('button, [href], img[tabindex="0"]', lbDialog)
        .filter((el) => !el.hidden && el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    return;
  }

  if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) closeMenu();
});

/* =========================================================
   Copy email
   ========================================================= */
const copyBtn = $('[data-copy-email]');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const label = $('[data-copy-label]', copyBtn);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONFIG.email);
      } else {
        const temp = document.createElement('textarea');
        temp.value = CONFIG.email;
        temp.setAttribute('readonly', '');
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
      }
      copyBtn.classList.add('is-copied');
      if (label) {
        label.textContent = 'Copied';
        copyBtn.setAttribute('aria-label', 'Email address copied');
      }
      window.setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        if (label) {
          label.textContent = 'Copy';
          copyBtn.setAttribute('aria-label', 'Copy email address');
        }
      }, 2200);
    } catch (err) {
      if (label) {
        label.textContent = 'Copy manually';
        copyBtn.setAttribute('aria-label', 'Copy email address manually');
      }
    }
  });
}

/* =========================================================
   Contact form — validates, then hands off to email client
   ========================================================= */
const form = $('[data-contact-form]');
const formStatus = $('[data-form-status]');
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function setFieldError(field, hasError) {
  const input = field.querySelector('input, textarea');
  const error = field.querySelector('.field-error');
  field.classList.toggle('has-error', hasError);
  if (error) error.hidden = !hasError;
  if (input) input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
}

function validateForm() {
  const results = [];
  const checks = [
    { name: 'name', valid: (v) => v.trim().length >= 2 },
    { name: 'email', valid: (v) => emailPattern.test(v.trim()) },
    { name: 'message', valid: (v) => v.trim().length >= 10 }
  ];

  checks.forEach(({ name, valid }) => {
    const input = form.elements[name];
    const field = input.closest('.field');
    const ok = valid(input.value);
    setFieldError(field, !ok);
    results.push({ input, ok });
  });

  return results;
}

if (form) {
  const inputs = $$('input, textarea, select', form);
  inputs.forEach((input) => {
    const onEdit = () => {
      const field = input.closest('.field');
      if (field && field.classList.contains('has-error')) setFieldError(field, false);
    };
    input.addEventListener('input', onEdit);
    input.addEventListener('change', onEdit);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = validateForm();
    const firstInvalid = results.find((r) => !r.ok);

    if (firstInvalid) {
      if (formStatus) {
        formStatus.classList.add('is-error');
        formStatus.textContent = 'A couple of fields still need a look — I\'ve marked them above.';
      }
      firstInvalid.input.focus({ preventScroll: false });
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const org = String(data.get('org') || '').trim();
    const topic = String(data.get('topic') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = org ? `${topic} — ${org}` : `${topic} — hello from ${name}`;
    const body = [
      `Hi Yash,`,
      ``,
      message,
      ``,
      `—`,
      `Name: ${name}`,
      `Email: ${email}`,
      org ? `Club / committee: ${org}` : null,
      `Reaching out about: ${topic}`
    ].filter((line) => line !== null).join('\n');

    const mailto = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formStatus) {
      formStatus.classList.remove('is-error');
      formStatus.innerHTML = '';
      const text = document.createElement('span');
      text.textContent = `Opening your email app with the message ready for ${CONFIG.email}. `;
      const fallback = document.createElement('a');
      fallback.href = mailto;
      fallback.textContent = 'Nothing happened? Tap here.';
      formStatus.append(text, fallback);
    }

    window.location.href = mailto;
  });
}

/* =========================================================
   Print / save-as-PDF résumé
   ========================================================= */
const printBtn = $('[data-print]');
if (printBtn) {
  printBtn.addEventListener('click', () => {
    if (mobileMenu && !mobileMenu.hidden) closeMenu(false);
    window.setTimeout(() => window.print(), 60);
  });
}
