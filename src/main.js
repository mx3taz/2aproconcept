import './style.css';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initNavigation } from './modules/navigation.js';
import { initServicesRenderer } from './modules/servicesRenderer.js';
import { initGalleryRenderer } from './modules/galleryRenderer.js';
import { initLightbox } from './modules/lightbox.js';
import { initConfigurator } from './modules/configurator.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';

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
