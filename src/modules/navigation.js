export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Effect
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Drawer Toggle
  if (toggleBtn && mobileDrawer) {
    const backdrop = document.querySelector('.mobile-nav-backdrop');

    const actionBar = document.querySelector('.mobile-action-bar');

    const openDrawer = () => {
      mobileDrawer.classList.add('open');
      backdrop?.classList.add('open');
      document.body.classList.add('drawer-open');
      actionBar?.classList.add('drawer-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (window.lenis) window.lenis.stop();
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      backdrop?.classList.remove('open');
      document.body.classList.remove('drawer-open');
      actionBar?.classList.remove('drawer-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      if (window.lenis) window.lenis.start();
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !toggleBtn.contains(e.target) &&
        (!backdrop || e.target !== backdrop)
      ) {
        closeDrawer();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        closeDrawer();

        if (targetId && targetId.startsWith('#') && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();

            // Update active state on nav links
            desktopLinks.forEach((dLink) => {
              if (dLink.getAttribute('href') === targetId) {
                dLink.classList.add('active');
              } else {
                dLink.classList.remove('active');
              }
            });

            // Allow drawer close and body unlock to apply, then smoothly scroll
            setTimeout(() => {
              if (window.lenis) {
                window.lenis.scrollTo(targetEl, { offset: -80 });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            }, 60);
          }
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // Active Link Observer
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -45% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  }
}
