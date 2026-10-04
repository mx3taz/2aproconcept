
import { openLightbox } from './lightbox.js';

// Image loading resilience helper for file:// and server environments
export function handleGalleryImgError(img) {
  if (img.dataset.hasRetried) return;
  img.dataset.hasRetried = 'true';
  const currentSrc = img.getAttribute('src') || '';
  if (currentSrc.includes('%20')) {
    img.src = decodeURI(currentSrc);
  } else if (currentSrc.includes('./reference/')) {
    img.src = currentSrc.replace('./reference/', './public/reference/');
  }
}

// gsap & ScrollTrigger loaded globally via CDN <script> tags in HTML

const subCategoriesConfig = {
  'abris-ouvrants': [
    { id: 'all', label: 'Tous les Abris Ouvrants (41)' },
    { id: 'auto', label: 'Automatiques (34)', folder: 'Abri Ouvrant Automatique' },
    { id: 'manuel', label: 'Manuels (7)', folder: 'Abri Ouvrant Manuel' }
  ],
  'extensions': [
    { id: 'all', label: 'Toutes les Extensions (13)' },
    { id: 'brise-vue', label: 'Extensions & Brise-Vue (8)', folder: 'Extension & Brise-Vue' },
    { id: 'terrasse', label: 'Extensions de Terrasse (5)', folder: 'Extension de Terrasse' }
  ]
};

const categoryLabels = {
  'all': 'au total',
  'abris-voitures': 'pour Abris Voitures',
  'abris-ouvrants': 'pour Abris Ouvrants',
  'pergolas': 'pour Pergolas & Terrasses',
  'extensions': 'pour Extensions',
  'menuiserie': 'pour Menuiserie Aluminium',
  'garde-corps': 'pour Garde-Corps Inox & Verre',
  'facades': 'pour Façades Alucobond'
};

export function initGalleryRenderer() {
  const container = document.querySelector('#gallery-grid-container');
  const featuredContainer = document.querySelector('#featured-gallery-container');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const subfilterBar = document.querySelector('#gallery-subfilter-bar');
  const countLabel = document.querySelector('#gallery-count-label');

  // 1. Featured Gallery on Homepage
  if (featuredContainer) {
    const featuredProjects = window.projectsData.filter(p => p.highlight) ;
    featuredContainer.innerHTML = featuredProjects.map(project => `
      <div 
        class="gallery-item gsap-reveal" 
        data-project-id="${project.id}" 
        tabindex="0" 
        role="button" 
        aria-label="Agrandir la réalisation ${project.title}"
      >
        <img 
          src="${project.image}" 
          alt="${project.title} - Réalisation 2A Pro Concept" 
          class="gallery-item-img" loading="lazy" onerror="handleGalleryImgError(this)"
        />
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge">${project.categoryLabel}</span>
   

        </div>
      </div>
    `).join('');
       // <h4 class="gallery-item-title">${project.title}</h4>
          // <span class="gallery-item-location">📍 ${project.location}</span>
    featuredContainer.querySelectorAll('.gallery-item').forEach(item => {
      const projId = item.getAttribute('data-project-id');
      const project = window.projectsData.find(p => p.id === projId);
      const trigger = () => { if (project) openLightbox(project, featuredProjects); };
      item.addEventListener('click', trigger);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger();
        }
      });
    });
  }

  // 2. Main Gallery on Réalisations Page
  if (!container) return;

  let activeCategory = 'all';
  let activeSubCategory = 'all';

  function updateStatusBar(count, category, subCategory) {
    if (!countLabel) return;
    if (category === 'all') {
      countLabel.innerHTML = `Affichage de <strong>${count} chantiers réels</strong> photographiés sur site`;
      return;
    }
    const catName = categoryLabels[category] || '';
    if (subCategory && subCategory !== 'all') {
      const config = subCategoriesConfig[category];
      const subItem = config?.find(s => s.id === subCategory);
      const subName = subItem ? subItem.folder : subCategory;
      countLabel.innerHTML = `Affichage de <strong>${count} réalisation${count > 1 ? 's' : ''}</strong> pour ${subName}`;
    } else {
      countLabel.innerHTML = `Affichage de <strong>${count} réalisation${count > 1 ? 's' : ''}</strong> ${catName}`;
    }
  }

  function renderSubFilterBar(category) {
    if (!subfilterBar) return;
    const config = subCategoriesConfig[category];

    if (!config) {
      subfilterBar.style.display = 'none';
      subfilterBar.innerHTML = '';
      return;
    }

    subfilterBar.style.display = 'flex';
    subfilterBar.innerHTML = config.map(sub => `
      <button 
        class="gallery-subfilter-btn ${sub.id === activeSubCategory ? 'active' : ''}" 
        data-sub="${sub.id}"
        role="tab"
        aria-selected="${sub.id === activeSubCategory}"
      >
        ${sub.label}
      </button>
    `).join('');

    subfilterBar.querySelectorAll('.gallery-subfilter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        subfilterBar.querySelectorAll('.gallery-subfilter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeSubCategory = btn.getAttribute('data-sub');
        renderGallery(activeCategory, activeSubCategory);
      });
    });
  }

  function renderGallery(selectedCategory = 'all', selectedSubCategory = 'all') {
    activeCategory = selectedCategory;
    activeSubCategory = selectedSubCategory;

    let filtered = selectedCategory === 'all'
      ? window.projectsData
      : window.projectsData.filter(p => p.category === selectedCategory);

    if (selectedSubCategory !== 'all') {
      filtered = filtered.filter(p => p.subCategory === selectedSubCategory);
    }

    updateStatusBar(filtered.length, selectedCategory, selectedSubCategory);

    container.innerHTML = filtered.map(project => `
      <div 
        class="gallery-item gsap-reveal" 
        data-project-id="${project.id}" 
        data-category="${project.category}"
        data-sub="${project.subCategory || ''}"
        data-folder="${project.folder || ''}"
        tabindex="0" 
        role="button" 
        aria-label="Agrandir la réalisation ${project.title}"
      >
        <img 
          src="${project.image}" 
          alt="${project.title} - Réalisation 2A Pro Concept" 
          class="gallery-item-img" loading="lazy" onerror="handleGalleryImgError(this)"
        />
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge">${project.categoryLabel}</span>




        </div>
      </div>
    `).join('');
          // <h4 class="gallery-item-title">${project.title}</h4>
          // <span class="gallery-item-location">📍 ${project.location}</span>
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && container.children.length > 0) {
      window.gsap.fromTo(
        container.children,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.02, ease: 'power2.out' }
      );
    }

    // Refresh ScrollTrigger layout measurements
    window.ScrollTrigger.refresh();

    // Attach click and enter key handlers to each gallery item
    container.querySelectorAll('.gallery-item').forEach(item => {
      const projId = item.getAttribute('data-project-id');
      const project = window.projectsData.find(p => p.id === projId);

      const triggerLightbox = () => {
        if (project) openLightbox(project, filtered);
      };

      item.addEventListener('click', triggerLightbox);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerLightbox();
        }
      });
    });
  }

  // Check URL query parameters for initial category and subcategory
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category') || 'all';
  const initialSubCategory = urlParams.get('sub') || 'all';

  if (initialCategory !== 'all') {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-category') === initialCategory) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    renderSubFilterBar(initialCategory);
    renderGallery(initialCategory, initialSubCategory);
  } else {
    // Initial render: all 91 projects
    renderSubFilterBar('all');
    renderGallery('all', 'all');
  }

  // Main Category Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      activeSubCategory = 'all';
      renderSubFilterBar(category);
      renderGallery(category, 'all');
    });
  });
}

window.handleGalleryImgError = handleGalleryImgError;
window.initGalleryRenderer = initGalleryRenderer;
