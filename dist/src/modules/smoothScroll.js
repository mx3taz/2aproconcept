// lenis & gsap loaded globally via CDN <script> tags in HTML

function initSmoothScroll() {
  if (typeof window.Lenis === 'undefined' || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    return null;
  }
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  const lenis = new window.Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', window.ScrollTrigger.update);

  window.gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  window.gsap.ticker.lagSmoothing(0);

  // Bind internal anchor links to smooth scroll (exclude mobile nav links which are handled in navigation.js)
  document.querySelectorAll('a[href^="#"]:not(.mobile-nav-link)').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        lenis.scrollTo(targetElement, { offset: -80 });
      }
    });
  });

  window.lenis = lenis;
  return lenis;
}

window.initSmoothScroll = initSmoothScroll;
