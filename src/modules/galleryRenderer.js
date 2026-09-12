import { projectsData } from '../data/projectsData.js';
import { openLightbox } from './lightbox.js';
import gsap from 'gsap';

export function initGalleryRenderer() {
  const container = document.querySelector('#gallery-grid-container');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  if (!container) return;

  function renderGallery(selectedCategory = 'all') {
    const filtered = selectedCategory === 'all'
      ? projectsData
      : projectsData.filter(p => p.category === selectedCategory);

    container.innerHTML = filtered.map(project => `
      <div 
        class="gallery-item gsap-reveal" 
        data-project-id="${project.id}" 
        tabindex="0" 
        role="button" 
        aria-label="Agrandir le projet ${project.title}"
      >
        <img 
          src="${project.image}" 
          alt="${project.title} - Réalisation 2A Pro Concept" 
          class="gallery-item-img" 
          loading="lazy"
        />
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge">${project.categoryLabel}</span>
          <h4 class="gallery-item-title">${project.title}</h4>
          <span class="gallery-item-location">📍 ${project.location}</span>
        </div>
      </div>
    `).join('');

    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && container.children.length > 0) {
      gsap.fromTo(
        container.children,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
      );
    }

    // Attach click and enter key handlers to each gallery item
    container.querySelectorAll('.gallery-item').forEach(item => {
      const projId = item.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projId);

      const triggerLightbox = () => {
        if (project) openLightbox(project);
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

  // Initial render
  renderGallery('all');

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderGallery(category);
    });
  });
}
