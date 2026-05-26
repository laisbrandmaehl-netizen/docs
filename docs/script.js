/* ═══════════════════════════════════════════
   RUAH — Website JS  v3.0
   ═══════════════════════════════════════════ */
(function () {
'use strict';

/* ── SCROLL PROGRESS BAR ──────────────── */
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }, { passive: true });
}

/* ── NAV SCROLL STATE ─────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── SCROLL ANIMATIONS ────────────────── */
const animEls = document.querySelectorAll('[data-a]');
if (animEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.11, rootMargin: '0px 0px -44px 0px' });
  animEls.forEach(el => io.observe(el));
}

/* ── SMOOTH ANCHOR SCROLL ─────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = (nav ? nav.offsetHeight : 0) + 24;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});

/* ── HERO PARALLAX ORBS ───────────────── */
const orbs = document.querySelectorAll('.hero-orb-1, .hero-orb-2');
if (orbs.length) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    orbs.forEach((o, i) => {
      const f = i === 0 ? 18 : 11;
      o.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  }, { passive: true });
}

/* ── GOLD CURSOR TRAIL ────────────────── */
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;opacity:.32';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
resize();
window.addEventListener('resize', resize, { passive: true });

const trail = [];
const TRAIL_MAX = 22;
document.addEventListener('mousemove', e => {
  trail.push({ x: e.clientX, y: e.clientY });
  if (trail.length > TRAIL_MAX) trail.shift();
}, { passive: true });

(function drawTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 1; i < trail.length; i++) {
    const t = i / trail.length;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.strokeStyle = `rgba(184,146,42,${t * 0.38})`;
    ctx.lineWidth = t * 2.2;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  if (trail.length) {
    const h = trail[trail.length - 1];
    const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 11);
    g.addColorStop(0, 'rgba(184,146,42,.26)');
    g.addColorStop(1, 'rgba(184,146,42,0)');
    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.arc(h.x, h.y, 11, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawTrail);
})();

/* ── CHAT TYPEWRITER ──────────────────── */
const chatMsgs = document.getElementById('chatMsgs');
if (chatMsgs) {
  const bubbles = chatMsgs.querySelectorAll('.cb');
  bubbles.forEach(b => { b.dataset.src = b.innerHTML; b.textContent = ''; });
  const delays = [350, 2100, 4000, 5900];
  let played = false;

  const elihuSection = document.getElementById('elihu');
  if (elihuSection) {
    const cio = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !played) {
        played = true;
        bubbles.forEach((b, i) => {
          setTimeout(() => {
            b.style.visibility = 'visible';
            b.style.opacity = '1';
            const txt = b.dataset.src.replace(/<[^>]+>/g, '');
            let j = 0;
            b.textContent = '';
            const tick = () => {
              if (j <= txt.length) {
                b.textContent = txt.slice(0, j);
                j++;
                setTimeout(tick, j < 4 ? 40 : Math.random() * 36 + 14);
              } else {
                b.innerHTML = b.dataset.src;
              }
            };
            tick();
          }, delays[i] || i * 1800);
        });
        cio.disconnect();
      }
    }, { threshold: 0.3 });
    cio.observe(elihuSection);
  }
}

/* ── LEGAL TOC ACTIVE STATE ───────────── */
const tocLinks = document.querySelectorAll('.legal-toc a');
if (tocLinks.length) {
  const headings = document.querySelectorAll('.legal-content h2[id]');
  const tocIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        tocLinks.forEach(l => l.classList.remove('toc-active'));
        const active = document.querySelector(`.legal-toc a[href="#${id}"]`);
        if (active) active.classList.add('toc-active');
      }
    });
  }, { rootMargin: '-8% 0px -72% 0px' });
  headings.forEach(h => tocIO.observe(h));
}

/* ── LANG SWITCH ──────────────────────── */
document.querySelectorAll('.lang-switch a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const targetId = a.dataset.target;
    const target = document.getElementById(targetId);
    if (!target) return;
    const offset = (nav ? nav.offsetHeight : 0) + 32;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
    document.querySelectorAll('.lang-switch a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

})();
