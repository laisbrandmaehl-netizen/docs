/* ═══════════════════════════════════════════
   RUAH — Shared Website JS
   ═══════════════════════════════════════════ */
(function(){
'use strict';

/* NAV scroll */
const nav = document.getElementById('nav');
if(nav){
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}

/* Scroll animations */
const animEls = document.querySelectorAll('[data-a]');
if(animEls.length){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
  },{threshold:0.11, rootMargin:'0px 0px -44px 0px'});
  animEls.forEach(el=>io.observe(el));
}

/* Smooth anchor scroll */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    if(!id) return;
    const t = document.getElementById(id);
    if(!t) return;
    e.preventDefault();
    const off = (nav ? nav.offsetHeight : 0) + 24;
    window.scrollTo({top: t.getBoundingClientRect().top + window.scrollY - off, behavior:'smooth'});
  });
});

/* Hero parallax orbs */
const orbs = document.querySelectorAll('.hero-orb-1,.hero-orb-2');
if(orbs.length){
  document.addEventListener('mousemove', e=>{
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    const dx = (e.clientX-cx)/cx, dy = (e.clientY-cy)/cy;
    orbs.forEach((o,i)=>{
      const f = i===0?20:13;
      o.style.transform = `translate(${dx*f}px,${dy*f}px)`;
    });
  },{passive:true});
}

/* Gold cursor trail */
const canvas = document.createElement('canvas');
canvas.style.cssText='position:fixed;top:0;left:0;pointer-events:none;z-index:9999;opacity:.42';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
const resize = ()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
resize();
window.addEventListener('resize', resize, {passive:true});
const trail=[]; const MAX=24;
document.addEventListener('mousemove', e=>{
  trail.push({x:e.clientX,y:e.clientY});
  if(trail.length>MAX) trail.shift();
},{passive:true});
(function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=1;i<trail.length;i++){
    const t=i/trail.length;
    ctx.beginPath();
    ctx.moveTo(trail[i-1].x,trail[i-1].y);
    ctx.lineTo(trail[i].x,trail[i].y);
    ctx.strokeStyle=`rgba(201,168,76,${t*.42})`;
    ctx.lineWidth=t*2.4;
    ctx.lineCap='round';
    ctx.stroke();
  }
  if(trail.length){
    const h=trail[trail.length-1];
    const g=ctx.createRadialGradient(h.x,h.y,0,h.x,h.y,13);
    g.addColorStop(0,'rgba(228,201,126,.32)');
    g.addColorStop(1,'rgba(228,201,126,0)');
    ctx.beginPath(); ctx.fillStyle=g;
    ctx.arc(h.x,h.y,13,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(draw);
})();

/* Chat typewriter (index only) */
const chatMsgs = document.getElementById('chatMsgs');
if(chatMsgs){
  const bubbles = chatMsgs.querySelectorAll('.cb');
  bubbles.forEach(b=>{ b.dataset.src=b.innerHTML; b.textContent=''; });
  const delays=[300,2000,4000,5800];
  let played=false;
  const chatEl=document.getElementById('elihu');
  if(chatEl){
    const cio=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !played){
        played=true;
        bubbles.forEach((b,i)=>{
          setTimeout(()=>{
            b.style.visibility='visible'; b.style.opacity='1';
            const txt=b.dataset.src.replace(/<[^>]+>/g,'');
            let j=0; b.textContent='';
            const tick=()=>{
              if(j<=txt.length){
                b.textContent=txt.slice(0,j); j++;
                setTimeout(tick, j<4?45:Math.random()*38+15);
              } else {
                b.innerHTML=b.dataset.src;
              }
            };
            tick();
          }, delays[i]||i*1800);
        });
        cio.disconnect();
      }
    },{threshold:0.3});
    cio.observe(chatEl);
  }
}

/* Legal TOC active state */
const tocLinks = document.querySelectorAll('.legal-toc a');
if(tocLinks.length){
  const headings = document.querySelectorAll('.legal-content h2');
  const tocIO = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        tocLinks.forEach(l=>l.classList.remove('toc-active'));
        const id=e.target.getAttribute('id');
        const active=document.querySelector(`.legal-toc a[href="#${id}"]`);
        if(active) active.classList.add('toc-active');
      }
    });
  },{rootMargin:'-10% 0px -70% 0px'});
  headings.forEach(h=>tocIO.observe(h));
}

/* Language switch scroll */
document.querySelectorAll('.lang-switch a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target=document.getElementById(a.dataset.target);
    if(!target) return;
    const off=(nav?nav.offsetHeight:0)+32;
    window.scrollTo({top:target.getBoundingClientRect().top+window.scrollY-off,behavior:'smooth'});
    document.querySelectorAll('.lang-switch a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

})();
