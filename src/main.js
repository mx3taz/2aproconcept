// 2A PRO CONCEPT — Main Entrypoint (Classic Vanilla JS)

// Register GSAP plugins once globally
if (window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);
}

// Initialize Page Loader immediately to guard against FOUC
if (typeof initPageLoader === 'function') {
  initPageLoader();
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Smooth Scrolling with Lenis
  if (typeof initSmoothScroll === 'function') initSmoothScroll();

  // Initialize Navigation & Mobile Drawer
  if (typeof initNavigation === 'function') initNavigation();

  // Render Services by Cluster
  if (typeof initServicesRenderer === 'function') initServicesRenderer();

  // Render Project Gallery
  if (typeof initGalleryRenderer === 'function') initGalleryRenderer();

  // Initialize Lightbox Modal
  if (typeof initLightbox === 'function') initLightbox();

  // Initialize Project Configurator / Devis Estimator
  if (typeof initConfigurator === 'function') initConfigurator();

  // Initialize GSAP ScrollTrigger Animations
  if (typeof initScrollAnimations === 'function') initScrollAnimations();

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

