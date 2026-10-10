// ===== Back to Top 浮动按钮 =====
// 自动添加到所有页面（除首页本身）
(function() {
  // 避免重复添加
  if (document.getElementById('back-to-top')) return;

  // 创建按钮
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', '回到顶部');
  btn.innerHTML = '↑';
  btn.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    color: #1D1D1F;
    font-size: 22px;
    line-height: 1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.06);
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1000;
    display: grid;
    place-items: center;
  `;

  // hover 效果
  btn.addEventListener('mouseenter', () => {
    btn.style.background = 'white';
    btn.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.15)';
    btn.style.transform = 'translateY(-2px)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = 'rgba(255, 255, 255, 0.9)';
    btn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.1)';
    btn.style.transform = 'translateY(0)';
  });

  // 点击回到顶部
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 滚动时显示/隐藏
  let visible = false;
  const threshold = 400;
  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > threshold;
    if (shouldShow !== visible) {
      visible = shouldShow;
      btn.style.opacity = visible ? '1' : '0';
      btn.style.transform = visible ? 'translateY(0)' : 'translateY(20px)';
      btn.style.pointerEvents = visible ? 'auto' : 'none';
    }
  }, { passive: true });

  document.body.appendChild(btn);

  // 键盘快捷键：Home 键回顶
  document.addEventListener('keydown', (e) => {
    // Home 键（不在输入框中）
    if (e.key === 'Home' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();
