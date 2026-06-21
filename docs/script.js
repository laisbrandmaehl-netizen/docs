/* ═══════════════════════════════════════════════════════
   RUAH — Website JS  v5.0
   • i18n (EN default, DE toggle, persisted)
   • Scroll-speed-aware animations (schnell = sofort)
   • Word-split headlines
   • Elihu chat scroll-trigger
   • Gold cursor trail
   • Progress bar, Nav, TOC, Lang-switch
   ═══════════════════════════════════════════════════════ */
(function () {
'use strict';

/* ── TRANSLATIONS ─────────────────────────────────────── */
const T = {
  en: {
    'nav.features':   'Features',
    'nav.cta':        'Get the App',
    'hero.eyebrow':   'A Christian Companion App for Android',
    'hero.t1': 'Breath', 'hero.t2': 'Wind', 'hero.t3': 'Spirit',
    'hero.sub':       'Your daily companion in faith — daily verse, AI companion Elihu, prayer journal and community.',
    'hero.cta1':      'Download Now',
    'hero.cta2':      'Explore Features',
    'meaning.label':  'About the Name',
    'meaning.title':  'The word that carries<br>breath, wind and spirit',
    'meaning.body1':  'In Hebrew, one single word carries three meanings: <em>Ruah</em> — the breath of life, the wind that blows where it will, and the Spirit of God hovering over the waters.',
    'meaning.body2':  'This app carries that name as an invitation to rest in God\'s quiet breath. Not loud. Not complex. Simply daily.',
    'pill.breath': 'Breath', 'pill.wind': 'Wind', 'pill.spirit': 'Spirit',
    'features.label': 'What Ruah Offers',
    'features.title': 'A sanctuary in your pocket',
    'fc1.title': 'Daily Verse & Reflection',
    'fc1.body':  'Every morning a carefully chosen verse — with an AI-generated personal reflection. The complete Bible offline in German (Schlachter 2000) and English (KJV). Highlight verses in 8 colors.',
    'fc1.tag':   'Daily · DE + EN · Offline',
    'fc2.body':  'Your AI companion — wise, direct, grounded in Job 32–37. Not a chatbot. A fellow traveler in faith.',
    'fc2.tag':   'AI · EU AI Act',
    'fc3.title': 'Prayer Journal',
    'fc3.body':  'Write your prayers down. Read them again. See how God carries you — line by line, day by day.',
    'fc3.tag':   'Private · Personal',
    'fc4.title': 'Streak & Journey',
    'fc4.body':  'A small faithfulness every day. Your streak shows how consistently you stay on the path.',
    'fc4.tag':   'Daily · Motivation',
    'fc5.title': 'Community',
    'fc5.body':  'Chat rooms on topics of faith. Meet others walking the same path — in real time.',
    'fc5.tag':   'Realtime · Moderated',
    'fc6.title': 'Bible Offline',
    'fc6.body':  '66 books, fully offline. Personal notes and up to 8 highlight colors.',
    'fc6.tag':   'Offline · Schlachter + KJV',
    'elihu.label': 'Your AI Companion',
    'elihu.title': 'Meet Elihu',
    'elihu.body1': 'In chapters 32–37 of the Book of Job, a young man named Elihu appears. He speaks clearly, with images from nature, without false comfort. He asks. He challenges. He accompanies.',
    'elihu.body2': 'This Elihu lives on in Ruah — as an AI companion who walks alongside you in questions of faith, without speaking in platitudes.',
    'elihu.quote': '"I am young in years, and you are aged; therefore I was timid and afraid to declare my opinion to you."',
    'elihu.badge': 'No data storage',
    'chat.status': 'Your spiritual companion',
    'chat.u1': 'What does faith mean when everything is dark?',
    'chat.b1': 'Faith is not the absence of darkness — it\'s the trust that darkness does not have the final word. Job knew that.',
    'chat.u2': 'But how do you endure it?',
    'chat.b2': 'By taking one day at a time. And sometimes one breath at a time.\n\nRuah — Breath.',
    'premium.title': 'Everything, for €4.99 / month',
    'premium.free': 'Free',
    'premium.mo': ' / month',
    'pf1': 'Daily verse & reflection',
    'pf2': 'Bible offline (Schlachter + KJV)',
    'pf3': 'Elihu — 5 conversations/day',
    'pf4': 'Prayer journal (up to 5 prayers)',
    'pf5': 'Community chat rooms',
    'pf6': '4 Bible highlight colors',
    'pp1': 'Elihu without daily limit',
    'pp2': 'Unlimited prayers',
    'pp3': '8 Bible highlight colors',
    'pp4': 'Create up to 3 own rooms',
    'pp5': 'All app themes',
    'pp6': 'Support Ruah\'s development',
    'premium.cta': 'Start Now',
    'dl.label': 'Now Available · Android',
    'dl.title': 'Begin today.',
    'dl.sub':   'Ruah is free on the Google Play Store. No pressure, no subscription required.',
    'dl.btn':   'Google Play — Free',
    'dl.note':  'Android · Free download · Premium €4.99/month',
    'footer.sub':    'Breath · Wind · Spirit',
    'footer.desc':   'A Christian companion app for the daily walk of faith — made with ❤ in Germany.',
    'footer.app':    'App',
    'footer.elihu':  'Elihu — AI Companion',
    'footer.legal':  'Legal & Contact',
    'footer.imprint':'Legal Notice',
    'footer.privacy':'Privacy Policy',
    'footer.terms':  'Terms of Service',
    'footer.deleteAccount': 'Delete Account',
    'footer.rights': 'All rights reserved',
  },
  de: {
    'nav.features':   'Features',
    'nav.cta':        'App laden',
    'hero.eyebrow':   'Eine christliche Companion-App für Android',
    'hero.t1': 'Atem', 'hero.t2': 'Wind', 'hero.t3': 'Geist',
    'hero.sub':       'Dein täglicher Begleiter im Glauben — Tagesvers, KI-Begleiter Elihu, Gebetsjournal und Gemeinschaft.',
    'hero.cta1':      'Jetzt herunterladen',
    'hero.cta2':      'Features entdecken',
    'meaning.label':  'Über den Namen',
    'meaning.title':  'Das Wort, das Atem,<br>Wind und Geist trägt',
    'meaning.body1':  'Im Hebräischen trägt ein einziges Wort drei Bedeutungen: <em>Ruah</em> — der Atem des Lebens, der Wind, der weht wo er will, und der Geist Gottes, der über den Wassern schwebte.',
    'meaning.body2':  'Diese App trägt diesen Namen als Einladung, im stillen Atem Gottes zu verweilen. Nicht laut. Nicht komplex. Einfach täglich.',
    'pill.breath': 'Atem', 'pill.wind': 'Wind', 'pill.spirit': 'Geist',
    'features.label': 'Was Ruah bietet',
    'features.title': 'Ein Heiligtum in deiner Hosentasche',
    'fc1.title': 'Tagesvers & Tagesbetrachtung',
    'fc1.body':  'Jeden Morgen ein sorgfältig ausgewählter Vers — mit KI-generierter persönlicher Andacht. Die vollständige Bibel offline auf Deutsch (Schlachter 2000) und Englisch (KJV). Verse in 8 Farben markieren.',
    'fc1.tag':   'Täglich · DE + EN · Offline',
    'fc2.body':  'Dein KI-Begleiter — weise, direkt, geerdet in Hiob 32–37. Kein Chatbot. Ein Weggefährte im Glauben.',
    'fc2.tag':   'KI · EU AI Act',
    'fc3.title': 'Gebetsjournal',
    'fc3.body':  'Schreib deine Gebete auf. Lies sie wieder. Erkenne, wie Gott dich trägt — Zeile für Zeile, Tag für Tag.',
    'fc3.tag':   'Privat · Persönlich',
    'fc4.title': 'Streak & Journey',
    'fc4.body':  'Jeden Tag eine kleine Treue. Dein Streak zeigt dir, wie kontinuierlich du auf dem Weg bleibst.',
    'fc4.tag':   'Täglich · Motivation',
    'fc5.title': 'Community',
    'fc5.body':  'Chaträume zu Themen des Glaubens. Begegne anderen, die denselben Weg gehen — in Echtzeit.',
    'fc5.tag':   'Realtime · Moderiert',
    'fc6.title': 'Bibel offline',
    'fc6.body':  '66 Bücher, vollständig offline. Persönliche Notizen und bis zu 8 Markierungsfarben.',
    'fc6.tag':   'Offline · Schlachter + KJV',
    'elihu.label': 'Dein KI-Begleiter',
    'elihu.title': 'Begegne Elihu',
    'elihu.body1': 'In den Kapiteln 32–37 des Buches Hiob erscheint ein junger Mann namens Elihu. Er spricht klar, mit Naturbildern und ohne falsche Tröstungen. Er fragt. Er fordert. Er begleitet.',
    'elihu.body2': 'Dieser Elihu lebt in Ruah weiter — als KI-Begleiter, der dich in Fragen des Glaubens begleitet, ohne Phrasen zu drehen.',
    'elihu.quote': '„Ich bin jung an Jahren, und ihr seid alt; darum war ich schüchtern und fürchtete mich, euch meine Meinung zu sagen."',
    'elihu.badge': 'Keine Datenspeicherung',
    'chat.status': 'Dein spiritueller Begleiter',
    'chat.u1': 'Was bedeutet Glaube, wenn alles dunkel ist?',
    'chat.b1': 'Glaube ist nicht das Fehlen von Dunkelheit — er ist das Vertrauen, dass Dunkelheit nicht das letzte Wort hat. Hiob kannte das.',
    'chat.u2': 'Aber wie hält man das aus?',
    'chat.b2': 'Indem man einen Tag nach dem anderen nimmt. Und manchmal einen Atemzug nach dem anderen.\n\nRuah — Atem.',
    'premium.title': 'Alles, für 4,99 € im Monat',
    'premium.free': 'Kostenlos',
    'premium.mo': ' / Monat',
    'pf1': 'Tagesvers & Tagesbetrachtung',
    'pf2': 'Bibel offline (Schlachter + KJV)',
    'pf3': 'Elihu — 5 Gespräche täglich',
    'pf4': 'Gebetsjournal (bis 5 Gebete)',
    'pf5': 'Community Chaträume',
    'pf6': '4 Bibelmarkierungsfarben',
    'pp1': 'Elihu ohne Tageslimit',
    'pp2': 'Unbegrenzte Gebete',
    'pp3': '8 Bibelmarkierungsfarben',
    'pp4': 'Bis zu 3 eigene Räume erstellen',
    'pp5': 'Alle App-Themes',
    'pp6': 'Ruah aktiv unterstützen',
    'premium.cta': 'Jetzt starten',
    'dl.label': 'Jetzt verfügbar · Android',
    'dl.title': 'Beginne heute.',
    'dl.sub':   'Ruah ist kostenlos im Google Play Store erhältlich. Kein Druck, kein Abo erforderlich.',
    'dl.btn':   'Google Play — Kostenlos',
    'dl.note':  'Android · Kostenlos herunterladen · Premium 4,99 €/Monat',
    'footer.sub':    'Atem · Wind · Geist',
    'footer.desc':   'Eine christliche Companion-App für den täglichen Glaubensweg — entwickelt mit ❤ in Deutschland.',
    'footer.app':    'App',
    'footer.elihu':  'Elihu — KI-Begleiter',
    'footer.legal':  'Rechtliches & Kontakt',
    'footer.imprint':'Impressum',
    'footer.privacy':'Datenschutzerklärung',
    'footer.terms':  'Nutzungsbedingungen',
    'footer.deleteAccount': 'Konto löschen',
    'footer.rights': 'Alle Rechte vorbehalten',
  }
};

/* ── i18n ENGINE ──────────────────────────────────────── */
let currentLang = localStorage.getItem('ruah-lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('ruah-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = T[lang][key];
    if (!val) return;
    // Use innerHTML for entries containing HTML tags
    if (val.includes('<') || val.includes('\n')) {
      el.innerHTML = val.replace(/\n/g, '<br>');
    } else {
      el.textContent = val;
    }
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  // Re-split words after language change (headlines changed)
  document.querySelectorAll('.display:not(.hero-heb)').forEach(el => {
    el.dataset.split = ''; // reset
    if (el.classList.contains('visible')) {
      splitWords(el);
      el.classList.add('visible'); // keep visible
    } else {
      splitWords(el);
    }
  });

  // Update chat bubbles if not yet animated
  if (!chatStarted) {
    document.querySelectorAll('.cb').forEach(b => {
      const key = b.dataset.i18n;
      if (key && T[lang][key]) {
        b.dataset.src = T[lang][key].replace(/\n/g, '<br>');
      }
    });
  }
}

// Language toggle buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

/* ── WORD-SPLIT HEADLINES ─────────────────────────────── */
function splitWords(el) {
  if (el.dataset.split === '1') return;
  el.dataset.split = '1';
  const raw = el.innerHTML;
  let wi = 0;
  el.innerHTML = raw.split(/(<br\s*\/?>)/gi).map(part => {
    if (/^<br/i.test(part)) return part;
    return part.split(/(\s+)/).map(tok => {
      if (!tok.trim()) return tok;
      wi++;
      return `<span class="word"><span class="word-inner" style="--wi:${wi}">${tok}</span></span>`;
    }).join('');
  }).join('');
  el.classList.add('word-split');
}
document.querySelectorAll('.display:not(.hero-heb)').forEach(splitWords);

/* ── SCROLL SPEED DETECTION ───────────────────────────── */
// Fast scroll = animate instantly. Slow scroll = full animation.
let lastScrollY = window.scrollY;
let lastScrollTime = Date.now();
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const now = Date.now();
  const dy  = Math.abs(window.scrollY - lastScrollY);
  const dt  = now - lastScrollTime || 1;
  scrollVelocity = dy / dt; // px/ms
  lastScrollY    = window.scrollY;
  lastScrollTime = now;
}, { passive: true });

function getAnimDuration() {
  // Fast scroll (>2 px/ms) → near-instant. Slow → full 850ms.
  if (scrollVelocity > 3)  return '120ms';
  if (scrollVelocity > 1.5) return '280ms';
  if (scrollVelocity > 0.6) return '500ms';
  return null; // use CSS default
}

/* ── INTERSECTION OBSERVER ────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const dur = getAnimDuration();
    if (dur) {
      el.style.transitionDuration = dur;
      // Reset after animation
      setTimeout(() => el.style.transitionDuration = '', parseFloat(dur) + 100);
    }
    el.classList.add('visible');
    io.unobserve(el);
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

// Observe everything animated
document.querySelectorAll('[data-a], .word-split, .line-reveal').forEach(el => io.observe(el));

// Feature cards cascade
document.querySelectorAll('.fc').forEach((card, i) => {
  card.style.setProperty('--ci', i);
  if (!card.dataset.a) card.setAttribute('data-a', 'up');
  io.observe(card);
});

// Dividers grow in
document.querySelectorAll('hr.divider').forEach(hr => {
  hr.classList.add('divider-anim');
  io.observe(hr);
});

/* ── ELIHU CHAT ───────────────────────────────────────── */
let chatStarted = false;
const chatMsgs = document.getElementById('chatMsgs');

if (chatMsgs) {
  const bubbles = Array.from(chatMsgs.querySelectorAll('.cb'));

  // Store src from data-i18n or current HTML
  bubbles.forEach(b => {
    const key = b.dataset.i18n;
    if (key && T[currentLang][key]) {
      b.dataset.src = T[currentLang][key].replace(/\n/g, '<br>');
    } else {
      b.dataset.src = b.innerHTML;
    }
    b.textContent = '';
    b.style.opacity   = '0';
    b.style.transform = b.classList.contains('user') ? 'translateX(32px)' : 'translateX(-32px)';
    b.style.visibility = 'visible';
  });

  function typeBubble(el, onDone) {
    const fullHTML = el.dataset.src || '';
    const plain    = fullHTML.replace(/<[^>]+>/g, '');
    let i = 0;

    // Fly bubble in
    el.style.transition = 'opacity .4s ease, transform .55s cubic-bezier(0.16,1,0.3,1)';
    el.style.opacity    = '1';
    el.style.transform  = 'translateX(0)';

    const spd = scrollVelocity > 1 ? 0 : null; // fast scroll = instant type
    if (spd === 0) {
      el.innerHTML = fullHTML;
      if (onDone) setTimeout(onDone, 80);
      return;
    }

    setTimeout(() => {
      const tick = () => {
        if (i <= plain.length) {
          el.textContent = plain.slice(0, i);
          i++;
          setTimeout(tick, Math.random() * 30 + 10);
        } else {
          el.innerHTML = fullHTML;
          if (onDone) onDone();
        }
      };
      tick();
    }, 100);
  }

  function runChat() {
    const gaps = [0, 950, 850, 950];
    function showNext(idx) {
      if (idx >= bubbles.length) return;
      setTimeout(() => typeBubble(bubbles[idx], () => showNext(idx + 1)), idx === 0 ? 200 : gaps[idx]);
    }
    showNext(0);
  }

  const elihuSection = document.getElementById('elihu');
  if (elihuSection) {
    const chatIO = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !chatStarted) {
        chatStarted = true;
        runChat();
        chatIO.disconnect();
      }
    }, { threshold: 0.3 });
    chatIO.observe(elihuSection);
  }
}

/* ── LEGAL CONTENT AUTO-ANIMATE ──────────────────────── */
if (document.querySelector('.legal-content')) {
  const sel = '.legal-content h2, .legal-content h3, .legal-content p, .legal-content ul, .info-box, .warn-box, .tp-card, .info-row, .imprint-grid, .back-link';
  document.querySelectorAll(sel).forEach((el, i) => {
    if (el.dataset.a) return;
    el.setAttribute('data-a', i % 4 === 0 ? 'right' : 'up');
    io.observe(el);
  });
  document.querySelectorAll('.tp-card').forEach((c, i)  => { c.style.transitionDelay = (i * 0.08) + 's'; });
  document.querySelectorAll('.info-row').forEach((r, i)  => { r.style.transitionDelay = (i * 0.10) + 's'; });
}

/* ── SCROLL PROGRESS BAR ──────────────────────────────── */
const bar = document.getElementById('progress-bar');
if (bar) {
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }, { passive: true });
}

/* ── NAV SCROLL STATE ─────────────────────────────────── */
const nav = document.getElementById('nav');
if (nav) {
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 44);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── SMOOTH ANCHOR ────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const t = document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0) - 24, behavior: 'smooth' });
  });
});

/* ── HERO PARALLAX ORBS ───────────────────────────────── */
const orbs = document.querySelectorAll('.hero-orb-1, .hero-orb-2');
if (orbs.length) {
  let raf = null, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    tx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
    ty = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    if (!raf) raf = requestAnimationFrame(() => {
      orbs.forEach((o, i) => { const f = i ? 12 : 20; o.style.transform = `translate(${tx*f}px,${ty*f}px)`; });
      raf = null;
    });
  }, { passive: true });
}

/* ── GOLD CURSOR TRAIL ────────────────────────────────── */
const cvs = document.createElement('canvas');
cvs.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;opacity:.3';
document.body.appendChild(cvs);
const ctx2 = cvs.getContext('2d');
const rsz = () => { cvs.width = window.innerWidth; cvs.height = window.innerHeight; };
rsz(); window.addEventListener('resize', rsz, { passive: true });

const trail = []; const TMAX = 26;
document.addEventListener('mousemove', e => {
  trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
  if (trail.length > TMAX) trail.shift();
}, { passive: true });
document.addEventListener('mouseleave', () => trail.length = 0);

(function drawTrail() {
  ctx2.clearRect(0, 0, cvs.width, cvs.height);
  const now = Date.now();
  for (let i = 1; i < trail.length; i++) {
    const age = (now - trail[i].t) / 380;
    const t   = (i / trail.length) * Math.max(0, 1 - age);
    if (t <= 0) continue;
    ctx2.beginPath();
    ctx2.moveTo(trail[i-1].x, trail[i-1].y);
    ctx2.lineTo(trail[i].x, trail[i].y);
    ctx2.strokeStyle = `rgba(184,146,42,${t * .44})`;
    ctx2.lineWidth   = t * 2.5;
    ctx2.lineCap     = 'round';
    ctx2.stroke();
  }
  if (trail.length) {
    const h = trail[trail.length - 1];
    const g = ctx2.createRadialGradient(h.x, h.y, 0, h.x, h.y, 13);
    g.addColorStop(0, 'rgba(184,146,42,.3)'); g.addColorStop(1, 'rgba(184,146,42,0)');
    ctx2.beginPath(); ctx2.fillStyle = g; ctx2.arc(h.x, h.y, 13, 0, Math.PI * 2); ctx2.fill();
  }
  requestAnimationFrame(drawTrail);
})();

/* ── LEGAL TOC ACTIVE ─────────────────────────────────── */
const tocLinks = document.querySelectorAll('.legal-toc a');
if (tocLinks.length) {
  const tocIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      tocLinks.forEach(l => l.classList.remove('toc-active'));
      const a = document.querySelector(`.legal-toc a[href="#${id}"]`);
      if (a) a.classList.add('toc-active');
    });
  }, { rootMargin: '-8% 0px -72% 0px' });
  document.querySelectorAll('.legal-content h2[id]').forEach(h => tocIO.observe(h));
}

/* ── LANG SWITCH (legal pages) ───────────────────────── */
document.querySelectorAll('.lang-switch a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(a.dataset.target);
    if (!t) return;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0) - 32, behavior: 'smooth' });
    document.querySelectorAll('.lang-switch a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});

/* ── APPLY INITIAL LANGUAGE ───────────────────────────── */
applyLang(currentLang);

})();
