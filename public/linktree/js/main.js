/* ============================================
   BWN Mídia — Linktree JS
   Interações e micro-animações
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Ripple effect nos botões ── */
  const buttons = document.querySelectorAll('.link-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(74,144,217,0.25) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.55s ease-out forwards;
        pointer-events: none;
        z-index: 10;
      `;

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ── Adiciona keyframe do ripple dinamicamente ── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  /* ── Efeito de partículas no logo ao hover ── */
  const logo = document.querySelector('.profile-logo');
  if (logo) {
    logo.addEventListener('mouseenter', spawnParticles);
  }

  function spawnParticles() {
    const rect = logo.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('span');
      const angle = (i / 6) * Math.PI * 2;
      const dist = 40 + Math.random() * 20;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #4A90D9;
        left: ${cx}px;
        top: ${cy}px;
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transition: transform 0.5s ease, opacity 0.5s ease;
        box-shadow: 0 0 6px #4A90D9;
      `;
      document.body.appendChild(dot);

      requestAnimationFrame(() => {
        dot.style.transform = `translate(${dx}px, ${dy}px)`;
        dot.style.opacity = '0';
      });

      setTimeout(() => dot.remove(), 550);
    }
  }

  /* ── Counter de cliques (localStorage) ── */
  buttons.forEach(btn => {
    const label = btn.getAttribute('data-label') || btn.querySelector('.link-label')?.textContent;
    if (!label) return;

    btn.addEventListener('click', () => {
      const key = `bwn_click_${label.trim().toLowerCase().replace(/\s+/g, '_')}`;
      const count = parseInt(localStorage.getItem(key) || '0') + 1;
      localStorage.setItem(key, count);
    });
  });

  /* ── Tilt suave no card ao mover o mouse (desktop) ── */
  if (window.matchMedia('(hover: hover)').matches) {
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `
          translateY(-2px)
          perspective(600px)
          rotateX(${-y * 4}deg)
          rotateY(${x * 4}deg)
          scale(1.01)
        `;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Pulse suave no logo a cada N segundos ── */
  function pulseLogo() {
    if (!logo) return;
    logo.style.transition = 'box-shadow 0.4s ease';
    logo.style.boxShadow = `
      0 0 0 8px rgba(74,144,217,0.12),
      0 0 48px rgba(74,144,217,0.3),
      0 8px 24px rgba(0,0,0,0.5)
    `;
    setTimeout(() => {
      logo.style.boxShadow = '';
    }, 600);
  }
  setInterval(pulseLogo, 4000);
});