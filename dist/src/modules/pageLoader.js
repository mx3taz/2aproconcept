/**
 * 2A PRO CONCEPT - Premium Architectural Page Loader & Seamless Page Transitions
 * Prevents FOUC (Flash of Unstyled Content) and provides high-end visual continuity
 */

function initPageLoader() {
  const loader = document.querySelector('#page-loader');
  if (!loader) return;

  const minDisplayTime = 250; // Smooth minimal duration to avoid micro-flicker
  const startTime = performance.now();

  function dismissLoader() {
    const elapsed = performance.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      loader.classList.add('loader-hidden');
      document.body.classList.add('page-ready');
      setTimeout(() => {
        if (loader && loader.classList.contains('loader-hidden')) {
          loader.style.display = 'none';
        }
      }, 500);
    }, remaining);
  }

  // Dismiss when DOM & stylesheets are ready
  if (document.readyState === 'complete') {
    dismissLoader();
  } else {
    window.addEventListener('load', dismissLoader);
    // Bulletproof safety fallback
    setTimeout(dismissLoader, 2000);
  }

  // Seamless Page Transitions for Internal Links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip anchors on current page, external URLs, protocols, target="_blank", or modifier keys
    if (
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('https://wa.me') ||
      link.target === '_blank' ||
      e.ctrlKey || e.metaKey || e.shiftKey || e.altKey
    ) {
      return;
    }

    try {
      const targetUrl = new URL(link.href, window.location.href);

      // Check if it's an internal link to a different HTML page
      if (targetUrl.origin === window.location.origin) {
        // If it's just a hash change on the same page, let browser handle it
        if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
          return;
        }

        // Show the sleek loader curtain before navigation
        e.preventDefault();
        loader.style.display = 'flex';
        // Force reflow
        void loader.offsetWidth;
        loader.classList.remove('loader-hidden');
        loader.classList.add('loader-entering');

        const statusText = loader.querySelector('#loader-status-text');
        if (statusText) {
          statusText.textContent = 'Ouverture de la page...';
        }

        setTimeout(() => {
          window.location.href = link.href;
        }, 180);
      }
    } catch {
      // Allow default navigation on parse error
    }
  });

  // Handle browser back/forward cache (bfcache) restore
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      loader.classList.add('loader-hidden');
      loader.style.display = 'none';
    }
  });
}

window.initPageLoader = initPageLoader;
initPageLoader();
