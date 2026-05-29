/* FLOW LINES */
(function(){
  const canvas = document.getElementById('flowCanvas');
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 35;
  const lines = [];

  function rand(min, max){ return Math.random()*(max-min)+min; }

  function createLine(){
    return {
      x: rand(0, canvas.width),
      y: rand(0, canvas.height),
      len: rand(80, 220),
      angle: rand(0, Math.PI*2),
      speed: rand(0.0001, 0.0004),
      drift: rand(-0.0003, 0.0003),
      alpha: rand(0.08, 0.25),
      width: rand(0.6, 1.5),
      isTeal: Math.random() > 0.45,
      phase: rand(0, Math.PI*2),
    };
  }

  for(let i=0; i<COUNT; i++) lines.push(createLine());

  let t = 0;

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

      const color = l.isTeal
        ? [`hsla(174,90%,55%,0)`, `hsla(174,90%,55%,${l.alpha})`, `hsla(185,95%,70%,${l.alpha*0.6})`, `hsla(174,90%,55%,0)`]
        : [`hsla(0,0%,100%,0)`,   `hsla(0,0%,100%,${l.alpha})`,   `hsla(0,0%,100%,${l.alpha*0.5})`,   `hsla(0,0%,100%,0)`];

      const grad = ctx.createLinearGradient(l.x, l.y, x2, y2);
      grad.addColorStop(0,   color[0]);
      grad.addColorStop(0.4, color[1]);
      grad.addColorStop(0.7, color[2]);
      grad.addColorStop(1,   color[3]);

      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = l.width;
      ctx.stroke();

      if(l.x < -50 || l.x > canvas.width+50 || l.y < -50 || l.y > canvas.height+50){
        Object.assign(l, createLine());
      }

      l.x += cos * 0.12;
      l.y += sin * 0.12;
    }

    requestAnimationFrame(draw);
  }
  draw();
})();

/* SCROLL ANİMASYON */
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

/* SAYAÇ ANİMASYONU */
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 1600;
    const step = target / (duration / 16);
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

/* VİDEO LİSTESİ */
function toggleVideos(id) {
  const all = document.querySelectorAll('.video-list');
  all.forEach(item => {
    if (item.id !== id) item.style.display = 'none';
  });

  const target = document.getElementById(id);
  target.style.display = (target.style.display === 'flex') ? 'none' : 'flex';
}

function openVideo(videoId) {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

/* VİDEO KATEGORİ AÇMA/KAPAMA */
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

/* VİDEO LİSTESİ */
function showCategory(category, button) {
  document.querySelectorAll('.design-grid').forEach(gallery => {
    gallery.classList.add('hidden');
  });
  document.getElementById(category).classList.remove('hidden');

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');
}

/* GÖRSEL MODAL */
function openImage(element) {
  const img = element.querySelector('img');
  document.getElementById('modalImage').src = img.src;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeImage() {
  document.getElementById('imageModal').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeImage();
});
