import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@12.23.24/+esm";

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-left');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// Hover micro-animations on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const el = card.querySelector('.project-num');
    if (el && typeof animate === 'function') animate(el, { opacity: [null, 0.5] }, { duration: 0.25 });
  });
  card.addEventListener('mouseleave', () => {
    const el = card.querySelector('.project-num');
    if (el && typeof animate === 'function') animate(el, { opacity: [null, 1] }, { duration: 0.25 });
  });
});

// Stagger contact links on load
try {
  animate('.contact-link', { opacity: [0, 1], x: [20, 0] }, { delay: stagger(0.1, { start: 0.5 }), duration: 0.5, easing: 'ease-out' });
} catch(e) {}

// Skill tags hover pulse
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => { if(typeof animate==='function') animate(tag, { scale: [1, 1.03] }, { duration: 0.15 }); });
  tag.addEventListener('mouseleave', () => { if(typeof animate==='function') animate(tag, { scale: [1.03, 1] }, { duration: 0.15 }); });
});

// Gradiente aleatorio - mueve el foco rojo
setInterval(() => {
  const x = Math.floor(Math.random() * 100);
  const y = Math.floor(Math.random() * 100);
  document.body.style.background = `radial-gradient(ellipse at ${x}% ${y}%, #c0001c 0%, #330000 25%, #0d0d0d 55%, #000000 100%)`;
  document.body.style.backgroundAttachment = 'fixed';
}, 2000);

// Gradiente hero-bg-text aleatorio
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
  setInterval(() => {
    const x = Math.floor(Math.random() * 100);
    heroBgText.style.backgroundPosition = `${x}% 50%`;
  }, 2800);
}

// Parallax hero on scroll
(() => {
  const hero = document.querySelector('.hero');
  const bgText = document.querySelector('.hero-bg-text');
  const heroImage = document.querySelector('.hero-image');
  const heroContent = document.querySelector('.hero-content');
  if (!hero || !bgText || !heroImage) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const h = hero.offsetHeight || window.innerHeight;
      const p = Math.min(y / h, 1);
      bgText.style.transform = `translate(-50%, calc(-50% - ${y * 0.5}px)) scaleY(1.2)`;
      heroImage.style.opacity = String(Math.max(0, 1 - p * 1.4));
      heroImage.style.willChange = 'opacity';
      hero.style.transform = `translateY(${y * 0.35}px) scale(${1 - p * 0.18})`;
      hero.style.opacity = String(1 - p * 0.9);
      hero.style.willChange = 'opacity, transform';
      hero.style.transformOrigin = 'center top';
      ticking = false;
    });
  }, { passive: true });
})();
