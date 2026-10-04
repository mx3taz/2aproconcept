function initNavigation() {
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


    const openDrawer = () => {
      mobileDrawer.classList.add('open');
      backdrop?.classList.add('open');
      document.body.classList.add('drawer-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.classList.add('open');
      if (window.lenis) window.lenis.stop();
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      backdrop?.classList.remove('open');
      document.body.classList.remove('drawer-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.classList.remove('open');
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

    const drawerCloseBtns = mobileDrawer.querySelectorAll('.mobile-drawer-close-btn, [data-drawer-close]');
    drawerCloseBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
      });
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

    // Auto-close on resize to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }, { passive: true });
  }

  // Set active link based on current page
  const pathname = window.location.pathname.toLowerCase();
  const isSolutions = pathname.includes('solutions');
  const isRealisations = pathname.includes('realisations');
  const isHome = !isSolutions && !isRealisations;

  desktopLinks.forEach((link) => {
    const href = (link.getAttribute('href') || '').toLowerCase();
    if (isSolutions && href.includes('solutions')) {
      link.classList.add('active');
    } else if (isRealisations && href.includes('realisations')) {
      link.classList.add('active');
    } else if (isHome && (href === '/' || href === '/index.html' || href === '#accueil' || href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Active Link Observer on Home page
  if (isHome && sections.length > 0) {
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
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else if (href.startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  }
}

window.initNavigation = initNavigation;
