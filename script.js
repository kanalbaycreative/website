/* ── TYPEWRITER ── */
const twWords = ['Video Prodüksiyon', 'Görsel Tasarım', 'Video Montaj', 'Sinematik İçerik', 'Uygulama Tanıtım'];
let twIndex = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById('typewriter');

function typeWrite() {
  if (!twEl) return;
  const word = twWords[twIndex];
  if (!twDeleting) {
    twEl.textContent = word.slice(0, ++twChar);
    if (twChar === word.length) { twDeleting = true; setTimeout(typeWrite, 1800); return; }
    setTimeout(typeWrite, 80);
  } else {
    twEl.textContent = word.slice(0, --twChar);
    if (twChar === 0) { twDeleting = false; twIndex = (twIndex + 1) % twWords.length; }
    setTimeout(typeWrite, twDeleting ? 45 : 150);
  }
}

window.addEventListener('load', () => {
  document.querySelectorAll('.stagger-word').forEach(el => el.classList.add('show'));
  setTimeout(typeWrite, 600);
});

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.glass-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── SCROLL ANIMATION ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ── COUNTER ANIMATION ── */
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const step = target / (2000 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); return; }
      el.textContent = Math.floor(current);
    }, 16);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));

/* ── VIDEO LIST TOGGLE ── */
function toggleVideos(id) {
  const all = document.querySelectorAll('.video-list');
  all.forEach(item => { if (item.id !== id) item.style.display = 'none'; });
  const target = document.getElementById(id);
  const isOpen = target.style.display === 'flex';
  target.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) {
    target.querySelectorAll('.video-item').forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-12px)';
      setTimeout(() => {
        item.style.transition = 'all 0.35s cubic-bezier(.16,1,.3,1)';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, i * 70);
    });
  }
}

function openVideo(videoId) {
  if (videoId === 'BURAYA_ID') { alert('Bu video henüz eklenmemiş.'); return; }
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

/* ── VIDEO CATEGORY PANELS ── */
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

/* ── DESIGN CATEGORY TABS ── */
function showCategory(category, button) {
  document.querySelectorAll('.design-grid').forEach(g => g.classList.add('hidden'));
  const target = document.getElementById(category);
  target.classList.remove('hidden');
  target.querySelectorAll('.design-item').forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(16px)';
    setTimeout(() => {
      item.style.transition = 'all 0.4s cubic-bezier(.16,1,.3,1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, i * 80);
  });
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

/* ── IMAGE MODAL ── */
function openImage(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.src = img.src;
  modal.style.display = 'flex';
  modalImg.style.opacity = '0';
  modalImg.style.transform = 'scale(0.94)';
  setTimeout(() => {
    modalImg.style.transition = 'all 0.35s cubic-bezier(.16,1,.3,1)';
    modalImg.style.opacity = '1';
    modalImg.style.transform = 'scale(1)';
  }, 10);
}

function closeImage() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modalImg.style.opacity = '0';
  modalImg.style.transform = 'scale(0.94)';
  setTimeout(() => { modal.style.display = 'none'; }, 280);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImage(); });
document.getElementById('imageModal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeImage();
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
