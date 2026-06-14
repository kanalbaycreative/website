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
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target && window.lenisInstance) {
      e.preventDefault();
      window.lenisInstance.scrollTo(target, { offset: -40, duration: 1.4 });
    } else if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ═══════════════════════════════════════════
   LENIS SMOOTH SCROLL + SCROLL PROGRESS
   ═══════════════════════════════════════════ */
let lenis = null;
const progressBar = document.getElementById('scrollProgress');

if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  window.lenisInstance = lenis;

  // Drive Lenis with GSAP ticker (paired with ScrollTrigger below)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  // Update progress bar
  lenis.on('scroll', ({ scroll, limit }) => {
    if (progressBar && limit > 0) {
      const pct = (scroll / limit) * 100;
      progressBar.style.width = `${pct}%`;
    }
  });
}

/* ═══════════════════════════════════════════
   FEATURED WORK — Horizontal scroll (GSAP)
   ═══════════════════════════════════════════ */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  const featuredSection = document.querySelector('.featured-section');
  const featuredPin     = document.querySelector('.featured-pin');
  const featuredTrack   = document.getElementById('featuredTrack');
  const featuredCards   = document.querySelectorAll('.featured-card');
  const counterCurrent  = document.getElementById('featuredCurrent');

  if (featuredSection && featuredPin && featuredTrack && featuredCards.length) {

    // Desktop: pin + horizontal scroll
    const mm = gsap.matchMedia();

    mm.add('(min-width: 901px)', () => {
      const getDistance = () => featuredTrack.scrollWidth - window.innerWidth;

      const tween = gsap.to(featuredTrack, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: featuredSection,
          pin: featuredPin,
          scrub: 1.1,
          anticipatePin: 1,
          end: () => '+=' + getDistance(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const idx = Math.min(
              Math.max(Math.floor(progress * featuredCards.length), 0),
              featuredCards.length - 1
            );
            const num = String(idx + 1).padStart(2, '0');
            if (counterCurrent && counterCurrent.textContent !== num) {
              counterCurrent.textContent = num;
            }
            // Update counter line progress
            const line = document.querySelector('.counter-line');
            if (line) {
              const lineProgress = (idx + 1) / featuredCards.length;
              line.style.setProperty('--p', lineProgress);
            }
          }
        }
      });

      // Card pop-in: subtle scale as it nears center
      featuredCards.forEach((card) => {
        gsap.fromTo(card,
          { scale: 0.96, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 85%',
              end: 'left 50%',
              scrub: 1,
            }
          }
        );
      });

      return () => { /* matchMedia cleanup handled by GSAP */ };
    });

    // Mobile / tablet: native horizontal scroll, no pin
    mm.add('(max-width: 900px)', () => {
      featuredTrack.style.overflowX = 'auto';
      featuredTrack.style.scrollSnapType = 'x mandatory';
      featuredTrack.style.webkitOverflowScrolling = 'touch';
      featuredTrack.style.paddingRight = '6vw';
      featuredCards.forEach((card) => {
        card.style.scrollSnapAlign = 'start';
      });
    });
  }
}

/* ── Counter line progress (set via CSS var) ── */
const counterLine = document.querySelector('.counter-line');
if (counterLine && !counterLine.style.getPropertyValue('--p')) {
  counterLine.style.setProperty('--p', 0.16);
}
// Add dynamic style for the progress fill on counter line
const counterLineStyle = document.createElement('style');
counterLineStyle.textContent = `
  .counter-line::after {
    width: calc(var(--p, 0.16) * 100%) !important;
    transition: width 0.2s ease-out;
  }
`;
document.head.appendChild(counterLineStyle);
