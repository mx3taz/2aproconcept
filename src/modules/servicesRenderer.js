
function handleServiceImgError(img) {
  const currentSrc = img.getAttribute('src') || '';
  const retryCount = parseInt(img.dataset.retryCount || '0', 10);
  if (retryCount >= 2) return;
  img.dataset.retryCount = (retryCount + 1).toString();

  if (currentSrc.includes('public/images/')) {
    // If /public/images/ failed on server, try /images/
    img.src = currentSrc.replace(/(\.\/)?public\/images\//, './images/');
  } else if (currentSrc.includes('images/')) {
    // If /images/ failed on file://, try ./public/images/
    img.src = currentSrc.replace(/(\.\/)?images\//, './public/images/');
  }
}

// gsap & ScrollTrigger loaded globally via CDN <script> tags in HTML

const serviceToGalleryCategory = {
  'abris-voitures': 'abris-voitures',
  'abris-ouvrants': 'abris-ouvrants',
  'abris-terrasses-pergolas': 'pergolas',
  'extensions-terrasses': 'extensions',
  'menuiserie-aluminium': 'menuiserie',
  'garde-corps-inox': 'garde-corps',
  'enseignes-facades': 'facades'
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
      const galleryCategory = serviceToGalleryCategory[service.id] || 'all';
      return `
      <article class="service-card gsap-reveal" data-cluster="${service.cluster}" id="${service.id}">
        <div class="service-card-media">
          <img 
            src="${service.heroImage}" 
            alt="${service.title} - Solution 2A Pro Concept" 
            class="service-card-img" loading="lazy" onerror="handleServiceImgError(this)"
          />
          <span class="service-category-tag">${service.clusterTitle}</span>
        </div>
        <div class="service-card-body">
      
   

          <div class="service-card-footer">
            <a 
              href="https://wa.me/21698804061?text=${encodeURIComponent(`Bonjour 2A PRO CONCEPT, je souhaite un devis personnalisé pour : ${service.title}`)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
              style="padding: 0.65rem 1.25rem; font-size: 0.88rem;"
            >
              Devis pour ce projet
            </a>
            <a 
              href="./realisations.html?category=${galleryCategory}" 
              class="btn btn-secondary"
              style="padding: 0.65rem 1rem; font-size: 0.88rem;"
              title="Voir les chantiers réels de cette gamme"
            >
              Voir réalisations    ↗
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
    // Initial render
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
