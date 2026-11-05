// ============================================================================
// lightbox.js — Interactive High-Definition Media Lightbox
// Supports both high-resolution images and responsive video playback
// ============================================================================

let currentLightboxElement = null;
let currentProjectList = [];
let currentProjectIndex = -1;

function initLightbox() {
  const modal = document.querySelector('#project-lightbox-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.lightbox-close-btn');
  const prevBtn = modal.querySelector('.lightbox-prev-btn');
  const nextBtn = modal.querySelector('.lightbox-next-btn');

  // Ensure video element exists inside .lightbox-media
  const mediaContainer = modal.querySelector('.lightbox-media');
  if (mediaContainer && !mediaContainer.querySelector('.lightbox-video')) {
    const video = document.createElement('video');
    video.className = 'lightbox-video';
    video.controls = true;
    video.playsInline = true;
    video.style.display = 'none';
    video.style.width = '100%';
    video.style.maxHeight = '75vh';
    video.style.borderRadius = '8px';
    mediaContainer.appendChild(video);
  }

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const videoEl = modal.querySelector('.lightbox-video');
    if (videoEl) {
      videoEl.pause();
      videoEl.src = '';
    }
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

function displayProject(item) {
  const modal = currentLightboxElement || document.querySelector('#project-lightbox-modal');
  if (!modal || !item) return;

  const imgEl = modal.querySelector('.lightbox-img');
  let videoEl = modal.querySelector('.lightbox-video');
  const titleEl = modal.querySelector('.lightbox-title');
  const catEl = modal.querySelector('.lightbox-category');
  const locEl = modal.querySelector('.lightbox-location');
  const descEl = modal.querySelector('.lightbox-desc');
  const materialsListEl = modal.querySelector('.lightbox-materials-list');
  const ctaBtn = modal.querySelector('.lightbox-cta-btn');
  const counterEl = modal.querySelector('#lightbox-counter');

  const isVideo = Boolean(item.src && item.type);

  if (isVideo) {
    if (imgEl) imgEl.style.display = 'none';
    if (!videoEl) {
      const mediaContainer = modal.querySelector('.lightbox-media');
      if (mediaContainer) {
        videoEl = document.createElement('video');
        videoEl.className = 'lightbox-video';
        videoEl.controls = true;
        videoEl.playsInline = true;
        videoEl.style.width = '100%';
        videoEl.style.maxHeight = '75vh';
        videoEl.style.borderRadius = '8px';
        mediaContainer.appendChild(videoEl);
      }
    }
    if (videoEl) {
      videoEl.style.display = 'block';
      videoEl.src = item.src;
      videoEl.onerror = () => {
        if (!videoEl.src.includes('./public/')) {
          videoEl.src = './public/' + item.src.replace('./', '');
        }
      };
      videoEl.load();
      videoEl.play().catch(() => {});
    }
  } else {
    if (videoEl) {
      videoEl.pause();
      videoEl.style.display = 'none';
      videoEl.src = '';
    }
    if (imgEl) {
      imgEl.style.display = 'block';
      imgEl.style.opacity = '0.4';
      imgEl.style.transform = 'scale(0.98)';

      const tempImg = new Image();
      const applyImg = (src) => {
        imgEl.src = src;
        imgEl.alt = item.title || 'Réalisation 2A PRO CONCEPT';
        requestAnimationFrame(() => {
          imgEl.style.opacity = '1';
          imgEl.style.transform = 'scale(1)';
        });
      };

      tempImg.onload = () => applyImg(tempImg.src);
      tempImg.onerror = () => {
        if (!tempImg.src.includes('./public/')) {
          const fallbackSrc = './public/' + item.image.replace('./', '');
          applyImg(fallbackSrc);
        } else {
          applyImg(item.image);
        }
      };
      tempImg.src = item.image;
    }
  }

  if (titleEl) titleEl.textContent = item.title || '';
  if (catEl) catEl.textContent = item.categoryLabel || '';
  if (locEl) locEl.textContent = item.location ? `📍 ${item.location}` : '📍 Tunisie';
  if (descEl) descEl.textContent = item.description || '';

  if (counterEl && currentProjectList.length > 0) {
    counterEl.textContent = `${currentProjectIndex + 1} / ${currentProjectList.length}`;
  }

  if (materialsListEl) {
    materialsListEl.innerHTML = (item.materials || []).map(m => `
      <span class="covering-pill" style="background: rgba(0, 174, 239, 0.1); border-color: rgba(0, 174, 239, 0.25); color: #7dd3fc;">
        ✓ ${m}
      </span>
    `).join('');
  }

  if (ctaBtn) {
    const projectRef = item.id ? ` (Réf: ${item.id})` : '';
    const projectTitle = item.title ? ` : "${item.title}"` : '';
    ctaBtn.href = `https://wa.me/21698804061?text=${encodeURIComponent(`Bonjour 2A PRO CONCEPT, je souhaite demander un devis pour ce projet${projectTitle}${projectRef}.`)}`;
  }
}

function openLightbox(item, itemList = []) {
  const modal = currentLightboxElement || document.querySelector('#project-lightbox-modal');
  if (!modal || !item) return;

  currentProjectList = itemList.length > 0 ? itemList : [item];
  currentProjectIndex = currentProjectList.findIndex(p => p.id === item.id);
  if (currentProjectIndex === -1) {
    currentProjectIndex = 0;
    currentProjectList = [item];
  }

  displayProject(item);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.initLightbox = initLightbox;
window.openLightbox = openLightbox;
