// ============================================================================
// servicesRenderer.js — Renders the 8 Authoritative Solutions / Services
// ============================================================================

function handleServiceImgError(img) {
  const currentSrc = img.getAttribute('src') || '';
  const retryCount = parseInt(img.dataset.retryCount || '0', 10);
  if (retryCount >= 3) return;
  img.dataset.retryCount = (retryCount + 1).toString();

  if (currentSrc.includes('%20')) {
    img.src = decodeURI(currentSrc);
  } else if (!currentSrc.includes('./public/')) {
    img.src = './public/' + currentSrc.replace('./', '');
  }
}

const serviceToGalleryCategory = {
  'abri-de-voiture': 'abri-de-voiture',
  'abri-de-terrace': 'abri-de-terrace',
  'abri-ouvrant': 'abri-ouvrant',
  'extension': 'extension',
  'pergola': 'pergola',
  'garde-corps-rampes-inox': 'garde-corps-rampes-inox',
  'menuiserie-aluminium': 'menuiserie-aluminium',
  'enceigne-set-habillage-de-facades': 'enceigne-set-habillage-de-facades'
};

function initServicesRenderer() {
  const container = document.querySelector('#services-grid-container');
  const filterButtons = document.querySelectorAll('.cluster-tab-btn');

  if (!container) return;

  function renderServices(selectedCluster = 'all') {
    const filtered = selectedCluster === 'all'
      ? window.servicesData
      : window.servicesData.filter(s => s.cluster === selectedCluster);

    container.innerHTML = filtered.map(service => {
      const galleryCategory = serviceToGalleryCategory[service.id] || service.id;
      return `
      <article class="service-card gsap-reveal" data-cluster="${service.cluster}" id="${service.id}">
        <div class="service-card-media">
          <img
            src="${service.heroImage}"
            alt="${service.title} - Solution 2A PRO CONCEPT"
            class="service-card-img" loading="lazy" onerror="handleServiceImgError(this)"
          />
          <span class="service-category-tag">${service.clusterTitle}</span>
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${service.title}</h3>
          <p class="service-card-subtitle">${service.shortSubtitle}</p>
          <p class="service-card-desc">${service.description}</p>

          ${service.types && service.types.length > 0 ? `
            <div class="service-types-preview">
              <span class="service-specs-header">Types & Déclinaisons :</span>
              <ul class="service-specs-list">
                ${service.types.map(t => `<li><strong>${t.name}</strong> — ${t.description}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="service-card-footer">
            <a
              href="https://wa.me/21698804061?text=${encodeURIComponent(`Bonjour 2A PRO CONCEPT, je souhaite un devis personnalisé pour : ${service.title}`)}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              Devis pour ce projet
            </a>
            <a
              href="./realisations.html?category=${galleryCategory}"
              class="btn btn-secondary"
              title="Voir les chantiers réels de cette gamme"
            >
              Voir réalisations ↗
            </a>
          </div>
        </div>
      </article>
    `;
    }).join('');

    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && container.children.length > 0) {
      window.gsap.fromTo(
        container.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      );
    }

    // Recalculate ScrollTrigger offsets since height may have changed
    window.ScrollTrigger.refresh();
  }

  // Check URL query parameters for initial cluster
  const urlParams = new URLSearchParams(window.location.search);
  const initialCluster = urlParams.get('cluster') || 'all';

  if (initialCluster !== 'all') {
    filterButtons.forEach(b => {
      if (b.getAttribute('data-cluster') === initialCluster) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    renderServices(initialCluster);
  } else {
    renderServices('all');
  }

  // Filter button click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cluster = btn.getAttribute('data-cluster');
      renderServices(cluster);
    });
  });
}

window.handleServiceImgError = handleServiceImgError;
window.initServicesRenderer = initServicesRenderer;
