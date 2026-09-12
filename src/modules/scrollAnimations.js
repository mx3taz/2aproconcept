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
    document.querySelectorAll('.gsap-reveal, .gsap-reveal-left, .gsap-reveal-right, .gsap-scale-in, .material-card, .process-step-card, .section-header').forEach(el => {
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
    gsap.fromTo(
      header,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: { trigger: header, start: 'top 88%', toggleActions: 'play none none none', once: true },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  // Static gsap-reveal elements (statement card, configurator wrapper)
  gsap.utils.toArray('.gsap-reveal').forEach((el) => {
    // Exclude dynamic containers and dedicated sections like materials-grid
    if (
      el.closest('#services-grid-container') ||
      el.closest('#gallery-grid-container') ||
      el.closest('.materials-grid') ||
      el.closest('#savoir-faire') ||
      el.classList.contains('material-card')
    ) {
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 35 },
      {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none', once: true },
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  });

  // Process Cards
  const processCards = document.querySelectorAll('.process-step-card');
  if (processCards.length > 0) {
    gsap.fromTo(
      processCards,
      { opacity: 0, y: 35 },
      {
        scrollTrigger: { trigger: '.process-grid', start: 'top 82%', toggleActions: 'play none none none', once: true },
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }
    );
  }

  // Material Cards in #savoir-faire (Matériaux Certifiés & Procédés Industriels)
  const materialCards = document.querySelectorAll('.materials-grid .material-card');
  if (materialCards.length > 0) {
    ScrollTrigger.batch(materialCards, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.65,
            ease: 'power2.out',
            clearProps: 'transform,opacity'
          }
        );
      }
    });
  }

  // Refresh ScrollTrigger when page finishes loading all assets
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
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
  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      scrollTrigger: {
        trigger: containerSelector,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true
      },
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    }
  );

  ScrollTrigger.refresh();
}
