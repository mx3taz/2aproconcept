import { servicesData } from '../data/servicesData.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initServicesRenderer() {
  const container = document.querySelector('#services-grid-container');
  const filterButtons = document.querySelectorAll('.cluster-tab-btn');

  if (!container) return;

  function renderServices(selectedCluster = 'all') {
    const filtered = selectedCluster === 'all' 
      ? servicesData 
      : servicesData.filter(s => s.cluster === selectedCluster);

    container.innerHTML = filtered.map(service => `
      <article class="service-card gsap-reveal" data-cluster="${service.cluster}">
        <div class="service-card-media">
          <img 
            src="${service.heroImage}" 
            alt="${service.title} - 2A Pro Concept" 
            class="service-card-img" 
            loading="lazy"
          />
          <span class="service-category-tag">${service.clusterTitle}</span>
        </div>
        <div class="service-card-body">
          <h3 class="service-card-title">${service.title}</h3>
          <p class="service-card-subtitle">${service.shortSubtitle}</p>
          <p class="service-card-desc">${service.description}</p>
          
          ${service.types.length > 0 ? `
            <div class="service-types-list">
              ${service.types.map(t => `
                <div class="service-type-item">
                  <span class="service-type-bullet">▪</span>
                  <div>
                    <strong>${t.name} :</strong> ${t.description}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${service.coverings.length > 0 ? `
            <div class="service-coverings-pills">
              ${service.coverings.map(c => `
                <span class="covering-pill" title="${c.detail}">
                  ${c.name}
                </span>
              `).join('')}
            </div>
          ` : ''}

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
              href="#realisations" 
              class="btn btn-secondary"
              style="padding: 0.65rem 1rem; font-size: 0.88rem;"
            >
              Voir réalisations
            </a>
          </div>
        </div>
      </article>
    `).join('');

    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && container.children.length > 0) {
      gsap.fromTo(
        container.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
      );
    }

    // Recalculate ScrollTrigger offsets since height may have changed
    ScrollTrigger.refresh();
  }

  // Initial render
  renderServices('all');

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
