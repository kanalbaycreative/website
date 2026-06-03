/* ═══════════════════════════════════════════
   KANALBAY CREATIVE — SCRIPT REFRESH 2026
   ═══════════════════════════════════════════ */

/* ── TYPEWRITER ── */
const twWords = ['Video Prodüksiyon', 'Görsel Tasarım', 'Video Montaj', 'Sinematik İçerik', 'Uygulama Tanıtım'];
let twIndex = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById('typewriter');

function typeWrite() {
  if (!twEl) return;
  const word = twWords[twIndex];
  if (!twDeleting) {
    twEl.textContent = word.slice(0, ++twChar);
    if (twChar === word.length) { 
      twDeleting = true; 
      setTimeout(typeWrite, 1800); 
      return; 
    }
    setTimeout(typeWrite, 80);
  } else {
    twEl.textContent = word.slice(0, --twChar);
    if (twChar === 0) { 
      twDeleting = false; 
      twIndex = (twIndex + 1) % twWords.length; 
    }
    setTimeout(typeWrite, twDeleting ? 45 : 150);
  }
}

/* ── PAGE LOAD ANIMATIONS ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.stagger-word').forEach(el => el.classList.add('show'));
  setTimeout(typeWrite, 600);
});

/* ── PARALLAX HERO + NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;

  /* Hero parallax */
  const hero = document.getElementById('heroTitle');
  if (hero) {
    hero.style.transform = `translateY(${y * 0.25}px)`;
    hero.style.opacity = Math.max(0, 1 - y / 500);
  }

  /* Navbar scroll effect */
  const nav = document.querySelector('.glass-nav');
  if (nav) nav.classList.toggle('scrolled', y > 40);


});

/* ═══════════════════════════════════════════
   FLOW LINES CANVAS — Brand Colors
   ═══════════════════════════════════════════ */
(function(){
  const canvas = document.getElementById('flowCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 40;
  const lines = [];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function createLine(){
    return {
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      len: rand(80, 280),
      angle: rand(0, Math.PI*2),
      speed: rand(0.0001, 0.0005),
      drift: rand(-0.0004, 0.0004),
      alpha: rand(0.1, 0.35),
      width: rand(0.5, 2),
      colorType: Math.random(),
      phase: rand(0, Math.PI*2),
    };
  }

  for(let i=0; i<COUNT; i++) lines.push(createLine());

  let t = 0;

  function getGradient(type, alpha, x1, y1, x2, y2) {
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);

    if (type < 0.33) {
      // Yellow to cyan
      grad.addColorStop(0,   `hsla(55, 100%, 65%, 0)`);
      grad.addColorStop(0.3, `hsla(55, 100%, 65%, ${alpha})`);
      grad.addColorStop(0.7, `hsla(190, 100%, 55%, ${alpha*0.8})`);
      grad.addColorStop(1,   `hsla(200, 100%, 50%, 0)`);
    } else if (type < 0.66) {
      // Cyan to blue
      grad.addColorStop(0,   `hsla(190, 100%, 55%, 0)`);
      grad.addColorStop(0.3, `hsla(190, 100%, 55%, ${alpha})`);
      grad.addColorStop(0.7, `hsla(210, 100%, 45%, ${alpha*0.7})`);
      grad.addColorStop(1,   `hsla(220, 100%, 35%, 0)`);
    } else {
      // Yellow to blue
      grad.addColorStop(0,   `hsla(55, 100%, 65%, 0)`);
      grad.addColorStop(0.4, `hsla(55, 100%, 65%, ${alpha})`);
      grad.addColorStop(0.6, `hsla(170, 90%, 55%, ${alpha*0.6})`);
      grad.addColorStop(1,   `hsla(210, 100%, 50%, 0)`);
    }
    return grad;
  }

  function draw(){
    t += 0.008;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(const l of lines){
      l.angle += Math.sin(l.phase + t * l.speed * 200) * l.drift + l.speed;
      l.phase += 0.003;

      const cos = Math.cos(l.angle);
      const sin = Math.sin(l.angle);
      const x2 = l.x + cos * l.len;
      const y2 = l.y + sin * l.len;

      const grad = getGradient(l.colorType, l.alpha, l.x, l.y, x2, y2);

      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = l.width;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Add glow effect
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = l.width * 3;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      if(l.x < -100 || l.x > canvas.width+100 || l.y < -100 || l.y > canvas.height+100){
        Object.assign(l, createLine());
      }

      l.x += cos * 0.15;
      l.y += sin * 0.15;
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════════════
   SCROLL ANIMATION OBSERVER
   ═══════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

/* ═══════════════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════════════ */
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { 
        el.textContent = target; 
        clearInterval(timer); 
        return; 
      }
      el.textContent = Math.floor(current);
    }, 16);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

/* ═══════════════════════════════════════════
   VIDEO LIST TOGGLE
   ═══════════════════════════════════════════ */
function toggleVideos(id) {
  const all = document.querySelectorAll('.video-list');
  all.forEach(item => {
    if (item.id !== id) item.style.display = 'none';
  });

  const target = document.getElementById(id);
  const isOpen = target.style.display === 'flex';
  target.style.display = isOpen ? 'none' : 'flex';

  // Animate items
  if (!isOpen) {
    const items = target.querySelectorAll('.video-item');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.4s cubic-bezier(.16,1,.3,1)';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, i * 80);
    });
  }
}

function openVideo(videoId) {
  if (videoId === 'BURAYA_ID') {
    alert('Bu video henüz eklenmemiş.');
    return;
  }
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

/* ═══════════════════════════════════════════
   VIDEO CATEGORY PANELS
   ═══════════════════════════════════════════ */
function openVideoCategory(id) {
  document.getElementById('videoCategoryGrid').style.display = 'none';
  const panel = document.getElementById(id);
  panel.style.display = 'block';
  requestAnimationFrame(() => panel.classList.add('open'));
}

function closeVideoCategory(id) {
  const panel = document.getElementById(id);
  panel.classList.remove('open');
  setTimeout(() => {
    panel.style.display = 'none';
    document.getElementById('videoCategoryGrid').style.display = 'grid';
    document.querySelectorAll('.video-list').forEach(v => v.style.display = 'none');
  }, 400);
}

/* ═══════════════════════════════════════════
   DESIGN CATEGORY TABS
   ═══════════════════════════════════════════ */
function showCategory(category, button) {
  document.querySelectorAll('.design-grid').forEach(gallery => {
    gallery.classList.add('hidden');
  });

  const target = document.getElementById(category);
  target.classList.remove('hidden');

  // Animate items in
  const items = target.querySelectorAll('.design-item');
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(.16,1,.3,1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, i * 100);
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

/* ═══════════════════════════════════════════
   IMAGE MODAL
   ═══════════════════════════════════════════ */
function openImage(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = img.src;
  modal.style.display = 'flex';
  modalImg.style.opacity = '0';
  modalImg.style.transform = 'scale(0.9)';
  setTimeout(() => {
    modalImg.style.transition = 'all 0.4s cubic-bezier(.16,1,.3,1)';
    modalImg.style.opacity = '1';
    modalImg.style.transform = 'scale(1)';
  }, 10);
}

function closeImage() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.style.opacity = '0';
  modalImg.style.transform = 'scale(0.9)';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImage();
});

/* ── Close modal on background click ── */
document.getElementById('imageModal')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeImage();
});

/* ═══════════════════════════════════════════
   SMOOTH SCROLL FOR NAV LINKS
   ═══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
