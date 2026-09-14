// Script commun aux études de cas :
// parallax des captures + visionneuse plein écran.

// --- Parallax : chaque capture monte à une vitesse différente au défilement.
// Double mécanisme (événement scroll + boucle rAF) pour couvrir tous les
// environnements, y compris les navigateurs qui throttlent l'un des deux.
const shots = document.querySelectorAll('.shot');
let lastY = -1;

function updateParallax() {
  const y = window.scrollY;
  if (y !== lastY) {
    lastY = y;
    shots.forEach(el => {
      el.style.translate = `0 ${-y * parseFloat(el.dataset.speed)}px`;
    });
  }
}

function parallaxLoop() {
  updateParallax();
  requestAnimationFrame(parallaxLoop);
}

window.addEventListener('scroll', updateParallax, { passive: true });
requestAnimationFrame(parallaxLoop);
updateParallax();

// --- Visionneuse plein écran, ouverte au clic sur une capture.
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbCounter = document.getElementById('lb-counter');
const items = Array.from(shots).map(el => ({
  src: el.querySelector('img').src,
  alt: el.querySelector('img').alt,
  caption: el.querySelector('figcaption').textContent.trim()
}));
let current = 0;

function show(i) {
  current = (i + items.length) % items.length;
  lbImg.src = items[current].src;
  lbImg.alt = items[current].alt;
  lbCaption.textContent = items[current].caption;
  lbCounter.textContent =
    String(current + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
  // Relance l'animation d'obturateur à chaque image
  lbImg.style.animation = 'none';
  void lbImg.offsetWidth;
  lbImg.style.animation = '';
}

function open(i) {
  show(i);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function close() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

shots.forEach((el, i) => el.addEventListener('click', () => open(i)));
document.getElementById('lb-close').addEventListener('click', close);
document.getElementById('lb-prev').addEventListener('click', () => show(current - 1));
document.getElementById('lb-next').addEventListener('click', () => show(current + 1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lb-stage')) close();
});

document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});
