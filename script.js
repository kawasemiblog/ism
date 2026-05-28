document.addEventListener('DOMContentLoaded', () => {
  
  // ----------------------------------------------------------------
  // 1. Header Scroll Effect
  // ----------------------------------------------------------------
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  // 初期ロード時にも判定
  handleScroll();

  // ----------------------------------------------------------------
  // 2. Mobile Menu Toggle
  // ----------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('a');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // メニューが開いているときはスクロールを防ぐ
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuToggle.addEventListener('click', toggleMenu);

  // リンクがクリックされたらメニューを閉じる
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ----------------------------------------------------------------
  // 3. Scroll Reveal Animation (Intersection Observer)
  // ----------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // 一度表示されたら監視を終了する（デモサイトとしてすっきり見せるため）
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // 15%見えたらトリガー
    rootMargin: '0px 0px -50px 0px' // 画面下部より少し手前でトリガー
  });

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });

  // Hero Sectionのフェードインアニメーション（ロード直後）
  const heroFadeElements = document.querySelectorAll('.hero-content .fade-in');
  setTimeout(() => {
    heroFadeElements.forEach(el => {
      el.classList.add('active');
    });
  }, 100);

  // ----------------------------------------------------------------
  // 4. Gallery Lightbox Modal
  // ----------------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('close-lightbox');
  const galleryContainers = document.querySelectorAll('.gallery-img-container');

  galleryContainers.forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('.gallery-img');
      const title = container.querySelector('.gallery-item-title');
      
      lightbox.style.display = 'block';
      lightboxImg.src = img.src;
      lightboxCaption.textContent = title ? title.textContent : '';
      document.body.style.overflow = 'hidden'; // 背後のスクロールを防ぐ
    });
  });

  const hideLightbox = () => {
    lightbox.style.display = 'none';
    if (!navMenu.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  closeLightbox.addEventListener('click', hideLightbox);
  
  // モダルの外側（背景）をクリックしたときにも閉じる
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) {
      hideLightbox();
    }
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      hideLightbox();
    }
  });
});
