import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Called once on page load for static elements (hero, section headers,
 * process cards, material cards, configurator wrapper, statement card).
 */
export function initScrollAnimations() {
  if (prefersReducedMotion()) {
    document.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right, .gsap-scale-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Hero Section Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-badge-container', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
    .from('.hero-title', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
    .from('.hero-description', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
    .from('.hero-stats-bar', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');

  // Section Headers (static in HTML)
  gsap.utils.toArray('.section-header').forEach((header) => {
    gsap.from(header, {
      scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 0, y: 35, duration: 0.9, ease: 'power2.out'
    });
  });

  // Static gsap-reveal elements (statement card, configurator wrapper)
  gsap.utils.toArray('.gsap-reveal').forEach((el) => {
    // Only target elements that are NOT inside #services-grid-container or #gallery-grid-container
    if (el.closest('#services-grid-container') || el.closest('#gallery-grid-container')) return;
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      opacity: 0, y: 40, duration: 0.85, ease: 'power2.out'
    });
  });

  // Process Cards
  const processCards = document.querySelectorAll('.process-step-card');
  if (processCards.length > 0) {
    gsap.from(processCards, {
      scrollTrigger: { trigger: '.process-grid', start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 0, y: 40, stagger: 0.15, duration: 0.85, ease: 'power2.out'
    });
  }

  // Material Cards
  const materialCards = document.querySelectorAll('.material-card:not(.statement-card .material-card)');
  if (materialCards.length > 0) {
    gsap.from(materialCards, {
      scrollTrigger: { trigger: '.materials-grid', start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 0, y: 30, stagger: 0.12, duration: 0.75, ease: 'power2.out'
    });
  }
}

/**
 * Called after dynamic content is injected into a container (services, gallery).
 * Immediately shows cards and applies staggered reveal if user hasn't scrolled past.
 */
export function refreshDynamicAnimations(containerSelector) {
  if (prefersReducedMotion()) {
    document.querySelectorAll(`${containerSelector} .gsap-reveal`).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Kill old ScrollTriggers in this container to prevent accumulation
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger && st.trigger.closest && st.trigger.closest(containerSelector)) {
      st.kill();
    }
  });

  const cards = document.querySelectorAll(`${containerSelector} .gsap-reveal`);
  if (cards.length === 0) return;

  // Reset any leftover inline styles from previous animations
  cards.forEach(el => {
    gsap.set(el, { clearProps: 'all' });
  });

  // Staggered reveal
  gsap.from(cards, {
    scrollTrigger: {
      trigger: containerSelector,
      start: 'top 90%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 35,
    stagger: 0.08,
    duration: 0.7,
    ease: 'power2.out'
  });

  ScrollTrigger.refresh();
}
