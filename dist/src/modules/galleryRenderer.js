// ============================================================================
// galleryRenderer.js — Hierarchical Category & Media Gallery Renderer
// Fully supports: 8 Authoritative Categories, Subcategories, Images & Videos
// ============================================================================

function handleGalleryImgError(img) {
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

// Build subcategory config dynamically from categoryHierarchy
function buildSubCategoriesConfig() {
  const config = {};
  if (!window.categoryHierarchy) return config;

  window.categoryHierarchy.forEach(cat => {
    if (cat.subcategories && cat.subcategories.length > 0) {
      const catProjects = (window.projectsData || []).filter(p => p.category === cat.id);
      const catVideos = (window.videoAssets || []).filter(v => v.category === cat.id);
      const totalCount = catProjects.length + catVideos.length;

      const entries = [
        { id: 'all', label: `Tous (${totalCount})`, name: `Tous les ${cat.displayName}` }
      ];

      // If there are images directly in the main category (subCategory === null)
      const mainOnlyCount = catProjects.filter(p => p.subCategory === null).length;
      if (mainOnlyCount > 0) {
        entries.push({
          id: '__main__',
          label: `Général (${mainOnlyCount})`,
          name: `${cat.displayName} — Général`,
          description: cat.description
        });
      }

      cat.subcategories.forEach(sub => {
        const subCount = catProjects.filter(p => p.subCategory === sub.id).length;
        const subVideoCount = catVideos.filter(v => v.subCategory === sub.id).length;
        const totalSub = subCount + subVideoCount;
        entries.push({
          id: sub.id,
          label: `${sub.displayName} (${totalSub})`,
          name: sub.displayName,
          description: sub.description
        });
      });

      config[cat.id] = entries;
    }
  });
  return config;
}

function initGalleryRenderer() {
  const container = document.querySelector('#gallery-grid-container');
  const featuredContainer = document.querySelector('#featured-gallery-container');
  const filterBar = document.querySelector('.gallery-filter-bar');
  const subfilterBar = document.querySelector('#gallery-subfilter-bar');
  const countLabel = document.querySelector('#gallery-count-label');

  const hierarchy = window.categoryHierarchy || [];
  const allProjects = window.projectsData || [];
  const allVideos = window.videoAssets || [];
  const subCategoriesConfig = buildSubCategoriesConfig();

  // Dynamically build filter buttons from categoryHierarchy
  if (filterBar) {
    const totalCount = allProjects.length + allVideos.length;
    let buttonsHTML = `<button class="gallery-filter-btn active" data-category="all">Tous les Projets <span class="filter-count">(${totalCount})</span></button>`;

    hierarchy.forEach(cat => {
      const catCount = allProjects.filter(p => p.category === cat.id).length;
      const catVideoCount = allVideos.filter(v => v.category === cat.id).length;
      const total = catCount + catVideoCount;
      buttonsHTML += `<button class="gallery-filter-btn" data-category="${cat.id}">${cat.displayName} <span class="filter-count">(${total})</span></button>`;
    });

    filterBar.innerHTML = buttonsHTML;
  }

  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  // 1. Featured Gallery & Showcase Carousel on Homepage
  if (featuredContainer) {
    const featuredProjects = allProjects.filter(p => p.highlight);
    const sliderTrack = document.querySelector('#homepage-carousel-track');
    const prevBtn = document.querySelector('#slider-prev');
    const nextBtn = document.querySelector('#slider-next');
    const filterButtons = document.querySelectorAll('.featured-filter-btn');

    // 0. Hero Ambient Blurred Stream (continuous dual-row moving stream of real project photos)
    const streamRow1 = document.querySelector('#hero-stream-row-1');
    const streamRow2 = document.querySelector('#hero-stream-row-2');
    if (streamRow1 && streamRow2 && allProjects.length > 0) {
      const row1Projects = allProjects.slice(0, 20);
      const row2Projects = allProjects.slice(20, 40).concat(allProjects.slice(0, 5));

      const renderStreamCards = (projects) => {
        // Duplicate array so CSS keyframe translation loops seamlessly
        const doubled = [...projects, ...projects];
        return doubled.map(p => `
          <div class="hero-stream-card">
            <img src="${p.image}" alt="${p.title} - 2A PRO CONCEPT" loading="lazy" onerror="handleGalleryImgError(this)" />
          </div>
        `).join('');
      };

      streamRow1.innerHTML = renderStreamCards(row1Projects);
      streamRow2.innerHTML = renderStreamCards(row2Projects);
    }

    // Hero Live Spotlight Card (crisp unblurred project showcase with auto-rotation)
    const liveCard = document.querySelector('#hero-live-card');
    const liveImg = document.querySelector('#hero-live-img');
    const liveTag = document.querySelector('#hero-live-tag');
    const liveTitle = document.querySelector('#hero-live-title');
    const liveCounter = document.querySelector('#hero-live-counter');

    if (liveCard && liveImg && featuredProjects.length > 0) {
      let liveIdx = 0;
      const updateLiveCard = (idx) => {
        const proj = featuredProjects[idx];
        if (!proj) return;
        liveImg.style.opacity = '0';
        setTimeout(() => {
          liveImg.src = proj.image;
          if (liveTag) liveTag.textContent = proj.categoryLabel;
          if (liveTitle) liveTitle.textContent = proj.title;
          if (liveCounter) liveCounter.textContent = `${(idx + 1).toString().padStart(2, '0')} / ${featuredProjects.length.toString().padStart(2, '0')}`;
          liveImg.style.opacity = '1';
        }, 250);
      };

      updateLiveCard(0);

      // Click on live card opens full Lightbox
      const openLiveLightbox = () => {
        const currentProject = featuredProjects[liveIdx];
        if (currentProject) openLightbox(currentProject, featuredProjects);
      };
      liveCard.addEventListener('click', openLiveLightbox);
      liveCard.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLiveLightbox();
        }
      });

      // Auto-cycle live card every 4.5 seconds
      setInterval(() => {
        if (document.hidden) return;
        liveIdx = (liveIdx + 1) % featuredProjects.length;
        updateLiveCard(liveIdx);
      }, 4500);
    }

    // Populate the Immersive Horizontal Showcase Slider Track with maximum rich project photos
    if (sliderTrack) {
      // Pick a rich, curated selection across all 8 gammes for maximum visual impact
      const gammesOrder = [
        'abri-de-voiture',
        'abri-ouvrant',
        'pergola',
        'extension',
        'abri-de-terrace',
        'menuiserie-aluminium',
        'enceigne-set-habillage-de-facades',
        'garde-corps-rampes-inox'
      ];
      const showcaseSelection = [];
      gammesOrder.forEach(catId => {
        const inCat = allProjects.filter(p => p.category === catId);
        const highlights = inCat.filter(p => p.highlight);
        const nonHighlights = inCat.filter(p => !p.highlight);
        const combined = [...highlights, ...nonHighlights];
        // Take up to 3-4 varied projects per category
        showcaseSelection.push(...combined.slice(0, 3));
      });

      // Update badge if present
      const badgeInfoText = document.querySelector('.slider-badge-info span:last-child');
      if (badgeInfoText) {
        badgeInfoText.textContent = `Défilement immersif de nos chantiers récents • ${showcaseSelection.length} réalisations sélectionnées`;
      }

      sliderTrack.innerHTML = showcaseSelection.map(project => `
        <div class="slider-card" data-project-id="${project.id}" tabindex="0" role="button" aria-label="Agrandir ${project.title}">
          <img src="${project.image}" alt="${project.title} - 2A PRO CONCEPT" loading="lazy" onerror="handleGalleryImgError(this)" />
          <div class="slider-card-overlay">
            <span class="slider-card-badge">${project.categoryLabel}</span>
            <div class="slider-card-title">${project.title}</div>
          </div>
        </div>
      `).join('');

      sliderTrack.querySelectorAll('.slider-card').forEach(card => {
        const projId = card.getAttribute('data-project-id');
        const project = allProjects.find(p => p.id === projId);
        const trigger = () => { if (project) openLightbox(project, showcaseSelection); };
        card.addEventListener('click', trigger);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
        });
      });

      // Controls for the slider
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          stopSliderAutoPlay();
          sliderTrack.scrollBy({ left: -340, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
          stopSliderAutoPlay();
          sliderTrack.scrollBy({ left: 340, behavior: 'smooth' });
        });
      }

      // Smooth subtle auto-scroll
      let sliderAutoPlay = null;
      const startSliderAutoPlay = () => {
        if (sliderAutoPlay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        sliderAutoPlay = setInterval(() => {
          if (document.hidden) return;
          const maxScroll = sliderTrack.scrollWidth - sliderTrack.clientWidth;
          if (sliderTrack.scrollLeft >= maxScroll - 20) {
            sliderTrack.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            sliderTrack.scrollBy({ left: 340, behavior: 'smooth' });
          }
        }, 4200);
      };

      const stopSliderAutoPlay = () => {
        if (sliderAutoPlay) {
          clearInterval(sliderAutoPlay);
          sliderAutoPlay = null;
        }
      };

      startSliderAutoPlay();
      sliderTrack.addEventListener('mouseenter', stopSliderAutoPlay);
      sliderTrack.addEventListener('mouseleave', startSliderAutoPlay);
      sliderTrack.addEventListener('touchstart', stopSliderAutoPlay, { passive: true });
      sliderTrack.addEventListener('touchend', () => setTimeout(startSliderAutoPlay, 3000));
    }

    // Function to render the featured grid with category filter
    function renderFeaturedGrid(filterKey) {
      let filtered = [];
      if (filterKey === 'highlight' || !filterKey || filterKey === 'all') {
        filtered = featuredProjects;
      } else {
        filtered = allProjects.filter(p => p.category === filterKey).slice(0, 8);
        if (filtered.length === 0) filtered = featuredProjects;
      }

      featuredContainer.innerHTML = filtered.map(project => `
        <div
          class="gallery-item gsap-reveal"
          data-project-id="${project.id}"
          tabindex="0"
          role="button"
          aria-label="Agrandir la réalisation ${project.title}"
        >
          <img
            src="${project.image}"
            alt="${project.title} - Réalisation 2A PRO CONCEPT"
            class="gallery-item-img" loading="lazy" onerror="handleGalleryImgError(this)"
          />
          <div class="gallery-item-overlay">
            <span class="gallery-item-badge">${project.categoryLabel}</span>
            <h4 class="gallery-item-title">${project.title}</h4>
          </div>
        </div>
      `).join('');

      featuredContainer.querySelectorAll('.gallery-item').forEach(item => {
        const projId = item.getAttribute('data-project-id');
        const project = allProjects.find(p => p.id === projId);
        const trigger = () => { if (project) openLightbox(project, filtered); };
        item.addEventListener('click', trigger);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
        });
      });
    }

    // Initial render
    renderFeaturedGrid('highlight');

    // Filter button event listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterKey = btn.getAttribute('data-filter');
        renderFeaturedGrid(filterKey);
      });
    });
  }

  // 2. Main Gallery on Réalisations Page
  if (!container) return;

  let activeCategory = 'all';
  let activeSubCategory = 'all';

  const categoryLabels = { 'all': 'au total' };
  hierarchy.forEach(cat => { categoryLabels[cat.id] = `pour ${cat.displayName}`; });

  function updateStatusBar(count, category, subCategory) {
    if (!countLabel) return;
    if (category === 'all') {
      countLabel.innerHTML = `Affichage de <strong>${count} réalisations &amp; vidéos réelles</strong> photographiées sur site`;
      return;
    }
    const catName = categoryLabels[category] || '';
    if (subCategory && subCategory !== 'all') {
      const config = subCategoriesConfig[category];
      const subItem = config?.find(s => s.id === subCategory);
      const subName = subItem ? subItem.name : subCategory;
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
      ? allProjects
      : allProjects.filter(p => p.category === selectedCategory);

    if (selectedSubCategory !== 'all' && selectedSubCategory !== '__main__') {
      filtered = filtered.filter(p => p.subCategory === selectedSubCategory);
    } else if (selectedSubCategory === '__main__') {
      filtered = filtered.filter(p => p.subCategory === null);
    }

    // Get matching videos
    let filteredVideos = [];
    if (selectedCategory === 'all') {
      filteredVideos = allVideos;
    } else {
      filteredVideos = allVideos.filter(v => v.category === selectedCategory);
      if (selectedSubCategory !== 'all' && selectedSubCategory !== '__main__') {
        filteredVideos = filteredVideos.filter(v => v.subCategory === selectedSubCategory);
      } else if (selectedSubCategory === '__main__') {
        filteredVideos = filteredVideos.filter(v => v.subCategory === null);
      }
    }

    const combinedList = [...filtered, ...filteredVideos];
    updateStatusBar(combinedList.length, selectedCategory, selectedSubCategory);

    // Render images
    let html = filtered.map(project => `
      <div
        class="gallery-item gsap-reveal"
        data-project-id="${project.id}"
        data-category="${project.category}"
        data-sub="${project.subCategory || ''}"
        tabindex="0"
        role="button"
        aria-label="Agrandir la réalisation ${project.title}"
      >
        <img
          src="${project.image}"
          alt="${project.title} - Réalisation 2A PRO CONCEPT"
          class="gallery-item-img" loading="lazy" onerror="handleGalleryImgError(this)"
        />
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge">${project.categoryLabel}</span>
          <h4 class="gallery-item-title">${project.title}</h4>
        </div>
      </div>
    `).join('');

    // Render videos
    html += filteredVideos.map(video => `
      <div
        class="gallery-item gallery-item--video gsap-reveal"
        data-video-id="${video.id}"
        data-category="${video.category}"
        data-sub="${video.subCategory || ''}"
        tabindex="0"
        role="button"
        aria-label="Voir la vidéo ${video.title}"
      >
        <div class="gallery-video-wrapper">
          <video
            preload="metadata"
            muted
            loop
            playsinline
            class="gallery-item-video"
            title="${video.title}"
          >
            <source src="${video.src}" type="${video.type}">
            <source src="./public/${video.src.replace(/^\.\//, '')}" type="${video.type}">
          </video>
          <div class="gallery-video-play-overlay">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="gallery-item-overlay">
          <span class="gallery-item-badge" style="background: rgba(220, 38, 38, 0.85); color: #fff;">📹 Vidéo • ${video.categoryLabel}</span>
          <h4 class="gallery-item-title">${video.title}</h4>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;

    // Animate items
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches && container.children.length > 0) {
      window.gsap.fromTo(
        container.children,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.02, ease: 'power2.out' }
      );
    }

    window.ScrollTrigger.refresh();

    // Attach click handlers to image items
    container.querySelectorAll('.gallery-item:not(.gallery-item--video)').forEach(item => {
      const projId = item.getAttribute('data-project-id');
      const project = allProjects.find(p => p.id === projId);
      const triggerLightbox = () => { if (project) openLightbox(project, combinedList); };
      item.addEventListener('click', triggerLightbox);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerLightbox(); }
      });
    });

    // Attach click handlers to video items
    container.querySelectorAll('.gallery-item--video').forEach(item => {
      const videoId = item.getAttribute('data-video-id');
      const video = allVideos.find(v => v.id === videoId);
      const videoEl = item.querySelector('video');

      // Click opens in full Lightbox modal
      const triggerVideoLightbox = () => { if (video) openLightbox(video, combinedList); };
      item.addEventListener('click', triggerVideoLightbox);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerVideoLightbox(); }
      });

      // Hover to preview muted
      item.addEventListener('mouseenter', () => {
        if (videoEl) {
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        }
      });
      item.addEventListener('mouseleave', () => {
        if (videoEl) {
          videoEl.pause();
          videoEl.currentTime = 0;
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
    activeSubCategory = initialSubCategory;
    renderSubFilterBar(initialCategory);
    renderGallery(initialCategory, initialSubCategory);
  } else {
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
