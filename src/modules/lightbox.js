let currentLightboxElement = null;
let currentProjectList = [];
let currentProjectIndex = -1;

function initLightbox() {
  const modal = document.querySelector('#project-lightbox-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const prevBtn = modal.querySelector('.lightbox-prev-btn');
  const nextBtn = modal.querySelector('.lightbox-next-btn');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    if (!currentProjectList.length) return;
    currentProjectIndex = (currentProjectIndex - 1 + currentProjectList.length) % currentProjectList.length;
    displayProject(currentProjectList[currentProjectIndex]);
  };

  const showNext = () => {
    if (!currentProjectList.length) return;
    currentProjectIndex = (currentProjectIndex + 1) % currentProjectList.length;
    displayProject(currentProjectList[currentProjectIndex]);
  };

  closeBtn?.addEventListener('click', closeModal);
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showPrev();
      } else {
        showNext();
      }
    }
  }, { passive: true });

  currentLightboxElement = modal;
}

function displayProject(project) {
  const modal = currentLightboxElement || document.querySelector('#project-lightbox-modal');
  if (!modal || !project) return;

  const imgEl = modal.querySelector('.lightbox-img');
  const titleEl = modal.querySelector('.lightbox-title');
  const catEl = modal.querySelector('.lightbox-category');
  const locEl = modal.querySelector('.lightbox-location');
  const descEl = modal.querySelector('.lightbox-desc');
  const materialsListEl = modal.querySelector('.lightbox-materials-list');
  const ctaBtn = modal.querySelector('.lightbox-cta-btn');
  const counterEl = modal.querySelector('#lightbox-counter');

  if (imgEl) {
    imgEl.style.opacity = '0.4';
    imgEl.style.transform = 'scale(0.98)';
    const tempImg = new Image();
    tempImg.src = project.image;
    const applyImg = () => {
      imgEl.src = project.image;
      imgEl.alt = project.title || 'Réalisation 2A PRO CONCEPT';
      requestAnimationFrame(() => {
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      });
    };
    tempImg.onload = applyImg;
    tempImg.onerror = () => {
      const src = project.image;
      if (src.includes('%20')) {
        imgEl.src = decodeURI(src);
      } else if (src.includes('./reference/')) {
        imgEl.src = src.replace('./reference/', './public/reference/');
      } else {
        applyImg();
      }
    };
  }
  if (titleEl) titleEl.textContent = project.title;
  if (catEl) catEl.textContent = project.categoryLabel;
  if (locEl) locEl.textContent = `📍 ${project.location}`;
  if (descEl) descEl.textContent = project.description;

  if (counterEl && currentProjectList.length > 0) {
    counterEl.textContent = `${currentProjectIndex + 1} / ${currentProjectList.length}`;
  }

  if (materialsListEl) {
    materialsListEl.innerHTML = (project.materials || []).map(m => `
      <span class="covering-pill" style="background: rgba(0, 174, 239, 0.1); border-color: rgba(0, 174, 239, 0.25); color: #7dd3fc;">
        ✓ ${m}
      </span>
    `).join('');
  }

  if (ctaBtn) {
    const projectRef = project.id ? ` (Réf: ${project.id})` : '';
    const projectTitle = project.title ? ` : "${project.title}"` : '';
    ctaBtn.href = `https://wa.me/21698804061?text=${encodeURIComponent(`Bonjour 2A PRO CONCEPT, je souhaite demander un devis pour ce projet${projectTitle}${projectRef}.`)}`;
  }
}

function openLightbox(project, projectList = []) {
  const modal = currentLightboxElement || document.querySelector('#project-lightbox-modal');
  if (!modal || !project) return;

  currentProjectList = projectList.length > 0 ? projectList : [project];
  currentProjectIndex = currentProjectList.findIndex(p => p.id === project.id);
  if (currentProjectIndex === -1) {
    currentProjectIndex = 0;
    currentProjectList = [project];
  }

  displayProject(project);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.initLightbox = initLightbox;
window.openLightbox = openLightbox;

