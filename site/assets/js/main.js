// ===== RH Intel · Site Scripts =====

(function() {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', expanded);
      menuToggle.textContent = expanded ? '✕' : '☰';
    });
  }

  // Screenshot carousel
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prev = carousel.querySelector('.carousel-arrow.prev');
    const next = carousel.querySelector('.carousel-arrow.next');
    let current = 0;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    setInterval(() => goTo(current + 1), 5000);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!carousel.matches(':hover')) return;
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Active nav link highlight
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (href === '/' && path === '/index.html')) {
      a.classList.add('active');
    } else if (href && href !== '/' && path.includes(href.replace('.html', ''))) {
      a.classList.add('active');
    }
  });
})();

// ===== Back to Top 浮动按钮 =====
(function() {
  if (document.getElementById('back-to-top')) return;
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', '回到顶部');
  btn.innerHTML = '↑';
  btn.style.cssText = 'position:fixed;bottom:32px;right:32px;width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.9);backdrop-filter:saturate(180%) blur(20px);-webkit-backdrop-filter:saturate(180%) blur(20px);color:#1D1D1F;font-size:22px;line-height:1;box-shadow:0 4px 20px rgba(0,0,0,0.1),0 0 1px rgba(0,0,0,0.1);border:1px solid rgba(0,0,0,0.06);cursor:pointer;opacity:0;transform:translateY(20px);transition:all 300ms cubic-bezier(0.25,0.46,0.45,0.94);z-index:1000;display:grid;place-items:center;';
  btn.addEventListener('mouseenter', () => { btn.style.background = 'white'; btn.style.boxShadow = '0 8px 28px rgba(0,0,0,0.15)'; btn.style.transform = 'translateY(-2px)'; });
  btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(255,255,255,0.9)'; btn.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1),0 0 1px rgba(0,0,0,0.1)'; btn.style.transform = 'translateY(0)'; });
  btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  let visible = false;
  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 400;
    if (shouldShow !== visible) {
      visible = shouldShow;
      btn.style.opacity = visible ? '1' : '0';
      btn.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
      btn.style.pointerEvents = visible ? 'auto' : 'none';
    }
  }, { passive: true });
  document.body.appendChild(btn);
  // Home 键回顶
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Home' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();
