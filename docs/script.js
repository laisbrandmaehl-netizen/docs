/* ═══════════════════════════════════════════════════════
   RUAH — Premium Scroll Animation System  v4.0
   ─────────────────────────────────────────────────────
   • Scroll Progress Bar
   • Nav Scroll State
   • Word-Split Headlines (Cormorant titles)
   • IntersectionObserver mit Stagger
   • Feature-Card Cascade
   • Elihu Chat: Bubble-by-Bubble beim Scrollen
   • Gold Cursor Trail
   • Smooth Anchor Scroll
   • TOC Active State (legal)
   • Language Switch (legal)
   ═══════════════════════════════════════════════════════ */

(function () {
'use strict';

/* ─── UTILS ─────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const nav = qs('#nav');
const navH = () => nav ? nav.offsetHeight : 0;

/* ─── SCROLL PROGRESS BAR ───────────────────────────── */
const bar = qs('#progress-bar');
if (bar) {
  const updateBar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
}

/* ─── NAV SCROLL STATE ──────────────────────────────── */
if (nav) {
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 44);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ─── WORD-SPLIT HEADLINES ──────────────────────────── */
// Wraps each word of .display elements in animatable spans
// Only runs once — safe to call on DOMContentLoaded
function splitWords(el) {
  if (el.dataset.split) return; // already done
  el.dataset.split = '1';
  const raw = el.innerHTML;
  // Preserve <br> tags
  const parts = raw.split(/(<br\s*\/?>)/gi);
  el.innerHTML = parts.map(part => {
    if (/^<br/i.test(part)) return part;
    return part.split(/(\s+)/).map(tok => {
      if (!tok.trim()) return tok; // whitespace
      return `<span class="word"><span class="word-inner" style="--wi:${el._wi = (el._wi || 0) + 1}">${tok}</span></span>`;
    }).join('');
  }).join('');
  el.classList.add('word-split');
}

// Apply to all section titles (not hero — those animate via CSS keyframe)
qsa('.display:not(.hero-heb)').forEach(el => splitWords(el));

/* ─── INTERSECTION OBSERVER — MAIN ─────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('visible');
    io.unobserve(el);
  });
}, {
  threshold: 0.13,
  rootMargin: '0px 0px -52px 0px'
});

// Observe all [data-a] elements
qsa('[data-a]').forEach(el => io.observe(el));

// Observe word-split headlines
qsa('.word-split').forEach(el => io.observe(el));

// Observe line-reveal labels
qsa('.line-reveal').forEach(el => io.observe(el));

/* ─── FEATURE CARDS CASCADE ─────────────────────────── */
// Assign --ci CSS variable per card for stagger
qsa('.fc').forEach((card, i) => {
  card.style.setProperty('--ci', i);
  card.setAttribute('data-a', card.dataset.a || 'up');
  if (!card.dataset.d) io.observe(card);
});

/* ─── DIVIDER ANIMATE ───────────────────────────────── */
qsa('hr.divider').forEach(hr => {
  hr.classList.add('divider-anim');
  io.observe(hr);
});

/* ─── ELIHU CHAT: BUBBLE-BY-BUBBLE ON SCROLL ────────── */
const chatMsgs = qs('#chatMsgs');
if (chatMsgs) {
  const bubbles = qsa('.cb', chatMsgs);

  // Store original HTML, hide everything
  bubbles.forEach(b => {
    b.dataset.src = b.innerHTML;
    b.textContent = '';
    b.style.visibility = 'visible'; // visibility managed by opacity+transform now
    b.style.opacity   = '0';
    b.style.transform = b.classList.contains('user') ? 'translateX(28px)' : 'translateX(-28px)';
  });

  let chatStarted = false;

  function typeBubble(el, onDone) {
    const fullHTML = el.dataset.src;
    const plain    = fullHTML.replace(/<[^>]+>/g, '');
    let i = 0;
    el.textContent = '';

    // Show bubble first (fly in)
    el.style.transition = 'opacity .45s ease, transform .5s cubic-bezier(0.16,1,0.3,1)';
    el.style.opacity    = '1';
    el.style.transform  = 'translateX(0)';

    // Then type
    const tick = () => {
      if (i <= plain.length) {
        el.textContent = plain.slice(0, i);
        i++;
        const wait = i < 3 ? 38 : Math.random() * 34 + 12;
        setTimeout(tick, wait);
      } else {
        el.innerHTML = fullHTML; // restore <em> etc.
        if (onDone) onDone();
      }
    };
    // small pause before typing starts
    setTimeout(tick, 120);
  }

  function runChat() {
    // Bubble 0 → wait for it → Bubble 1 → ...
    const gaps = [0, 900, 800, 900]; // ms between bubbles starting

    function showNext(idx) {
      if (idx >= bubbles.length) return;
      setTimeout(() => {
        typeBubble(bubbles[idx], () => showNext(idx + 1));
      }, idx === 0 ? 200 : gaps[idx]);
    }
    showNext(0);
  }

  // Trigger only when Elihu section enters viewport
  const elihuSection = qs('#elihu');
  if (elihuSection) {
    const chatIO = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !chatStarted) {
        chatStarted = true;
        runChat();
        chatIO.disconnect();
      }
    }, { threshold: 0.35 });
    chatIO.observe(elihuSection);
  }
}

/* ─── HERO PARALLAX ORBS ────────────────────────────── */
const orbs = qsa('.hero-orb-1, .hero-orb-2');
if (orbs.length) {
  let rafId = null;
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    tx = (e.clientX - cx) / cx;
    ty = (e.clientY - cy) / cy;

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        orbs.forEach((o, i) => {
          const f = i === 0 ? 20 : 12;
          o.style.transform = `translate(${tx * f}px, ${ty * f}px)`;
        });
        rafId = null;
      });
    }
  }, { passive: true });
}

/* ─── SMOOTH ANCHOR SCROLL ──────────────────────────── */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = qs(`#${id}`);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH() - 24,
      behavior: 'smooth'
    });
  });
});

/* ─── GOLD CURSOR TRAIL ─────────────────────────────── */
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;opacity:.3';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const doResize = () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
};
doResize();
window.addEventListener('resize', doResize, { passive: true });

const trail = [];
const T_MAX = 24;
let mouseActive = false;

document.addEventListener('mousemove', e => {
  mouseActive = true;
  trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
  if (trail.length > T_MAX) trail.shift();
}, { passive: true });

document.addEventListener('mouseleave', () => {
  mouseActive = false;
  trail.length = 0;
});

(function drawTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (trail.length > 1) {
    const now = Date.now();
    for (let i = 1; i < trail.length; i++) {
      const age = (now - trail[i].t) / 400; // fade by age
      const t   = (i / trail.length) * (1 - Math.min(age, 1));
      if (t <= 0) continue;

      ctx.beginPath();
      ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
      ctx.lineTo(trail[i].x, trail[i].y);
      ctx.strokeStyle = `rgba(184,146,42,${t * 0.42})`;
      ctx.lineWidth   = t * 2.4;
      ctx.lineCap     = 'round';
      ctx.stroke();
    }

    // Glow dot at head
    const h = trail[trail.length - 1];
    const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 12);
    g.addColorStop(0, 'rgba(184,146,42,.28)');
    g.addColorStop(1, 'rgba(184,146,42,0)');
    ctx.beginPath();
    ctx.fillStyle = g;
    ctx.arc(h.x, h.y, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(drawTrail);
})();

/* ─── LEGAL TOC ACTIVE STATE ────────────────────────── */
const tocLinks = qsa('.legal-toc a');
if (tocLinks.length) {
  const headings = qsa('.legal-content h2[id]');
  const tocIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.getAttribute('id');
      tocLinks.forEach(l => l.classList.remove('toc-active'));
      const active = qs(`.legal-toc a[href="#${id}"]`);
      if (active) active.classList.add('toc-active');
    });
  }, { rootMargin: '-8% 0px -72% 0px' });
  headings.forEach(h => tocIO.observe(h));
}

/* ─── LANGUAGE SWITCH (legal pages) ────────────────── */
qsa('.lang-switch a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = qs(`#${a.dataset.target}`);
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH() - 32,
      behavior: 'smooth'
    });
    qsa('.lang-switch a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

/* ─── LEGAL CONTENT: ANIMATE PARAGRAPHS ─────────────── */
// Legal pages: h2, p, ul, info-box, tp-card fliegen rein
if (qs('.legal-content')) {
  const legalEls = qsa('.legal-content h2, .legal-content p, .legal-content ul, .info-box, .warn-box, .tp-card, .info-row, .imprint-grid, .back-link');
  legalEls.forEach((el, i) => {
    if (el.dataset.a) return; // already has animation
    el.setAttribute('data-a', i % 3 === 0 ? 'right' : 'up');
    io.observe(el);
  });
  // tp-cards get stagger
  qsa('.tp-card').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.08) + 's';
  });
  qsa('.info-row').forEach((row, i) => {
    row.style.transitionDelay = (i * 0.1) + 's';
  });
}

})();
