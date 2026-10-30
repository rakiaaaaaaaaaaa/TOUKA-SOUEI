// ===================== Year =====================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================== Navbar scroll state =====================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });

// ===================== Mobile nav =====================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
function setMenu(open) {
  burger.classList.toggle('active', open);
  navLinks.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    burger.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', () => setMenu(false));

// ===================== Active link on scroll =====================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(anchor => {
        const active = anchor.hash === `#${entry.target.id}`;
        anchor.classList.toggle('active', active);
        if (active) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
    }
  });
}, { rootMargin: '-20% 0px -60% 0px' });
sections.forEach(section => navObserver.observe(section));

// ===================== Counters =====================
document.querySelectorAll('.counter').forEach(counter => {
  counter.textContent = counter.dataset.target;
});
