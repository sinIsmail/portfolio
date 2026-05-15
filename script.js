/* ── script.js ── Mohammad Ismail Portfolio */

/* ─── Mobile nav toggle ─────────────────────────────────── */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

/* Close menu on link click */
menu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ─── Nav background on scroll ──────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.borderBottomColor = '#000';
  } else {
    nav.style.borderBottomColor = '#000';
  }
}, { passive: true });

/* ─── Scroll-reveal (IntersectionObserver) ───────────────── */
const revealTargets = document.querySelectorAll(
  '.section-header, .about-grid, .skills-categories, .project, .edu-grid, .cert-item, .contact-layout'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  /* Fallback: show everything */
  revealTargets.forEach(el => el.classList.add('in-view'));
}

/* ─── Active nav link on scroll ─────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.textDecoration = 'none';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.textDecoration = 'underline';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

/* ─── Copyright year ────────────────────────────────────── */
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
}
