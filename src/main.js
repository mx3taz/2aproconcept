// 2A PRO CONCEPT — Main Entrypoint (Classic Script, no ES module imports)
// All dependencies (lenis, gsap) loaded via CDN <script> tags in HTML
// All modules loaded via individual <script> tags before this file

// Register GSAP plugins once globally
if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

// Initialize Page Loader immediately to guard against FOUC
initPageLoader();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Smooth Scrolling with Lenis
  initSmoothScroll();

  // Initialize Navigation & Mobile Drawer
  initNavigation();

  // Render Services by Cluster
  initServicesRenderer();

  // Render Project Gallery
  initGalleryRenderer();

  // Initialize Lightbox Modal
  initLightbox();

  // Initialize Project Configurator / Devis Estimator
  initConfigurator();

  // Initialize GSAP ScrollTrigger Animations
  initScrollAnimations();

  // Contact Form Submission Feedback
  const contactForm = document.querySelector('#contact-direct-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Envoyer';

      if (submitBtn) {
        submitBtn.innerHTML = '✓ Message Envoyé ! Notre équipe vous contacte sous 24h';
        submitBtn.style.background = 'var(--accent-whatsapp)';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }
      }, 4000);
    });
  }
});

import './data/projectsData.js';
import './data/servicesData.js';
import './modules/pageLoader.js';
import './modules/navigation.js';
import './modules/smoothScroll.js';
import './modules/lightbox.js';
import './modules/configurator.js';
import './modules/servicesRenderer.js';
import './modules/galleryRenderer.js';
import './modules/scrollAnimations.js';
