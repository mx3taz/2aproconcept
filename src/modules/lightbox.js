let currentLightboxElement = null;

export function initLightbox() {
  const modal = document.querySelector('#project-lightbox-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.lightbox-close-btn');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  currentLightboxElement = modal;
}

export function openLightbox(project) {
  const modal = currentLightboxElement || document.querySelector('#project-lightbox-modal');
  if (!modal || !project) return;

  const imgEl = modal.querySelector('.lightbox-img');
  const titleEl = modal.querySelector('.lightbox-title');
  const catEl = modal.querySelector('.lightbox-category');
  const locEl = modal.querySelector('.lightbox-location');
  const descEl = modal.querySelector('.lightbox-desc');
  const materialsListEl = modal.querySelector('.lightbox-materials-list');
  const ctaBtn = modal.querySelector('.lightbox-cta-btn');

  if (imgEl) {
    imgEl.src = project.image;
    imgEl.alt = project.title;
  }
  if (titleEl) titleEl.textContent = project.title;
  if (catEl) catEl.textContent = project.categoryLabel;
  if (locEl) locEl.textContent = `📍 ${project.location}`;
  if (descEl) descEl.textContent = project.description;

  if (materialsListEl) {
    materialsListEl.innerHTML = project.materials.map(m => `
      <span class="covering-pill" style="background: rgba(0, 174, 239, 0.1); border-color: rgba(0, 174, 239, 0.25); color: #7dd3fc;">
        ✓ ${m}
      </span>
    `).join('');
  }

  if (ctaBtn) {
    ctaBtn.href = `https://wa.me/21698804061?text=${encodeURIComponent(`Bonjour 2A PRO CONCEPT, je suis intéressé par votre réalisation : "${project.title}" (Réf: ${project.id}). Pouvez-vous m'établir un devis ?`)}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
