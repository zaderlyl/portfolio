/* Landing bento : fond de carrés + slider de projets (transition en glissement). */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DURATION = 5000;

  /* Décalage d'un bloc vers le bord de l'écran le plus proche (sortie) ou depuis ce bord (entrée) */
  function edgeOffsets(t) {
    const r = t.getBoundingClientRect();
    if (r.top >= innerHeight || r.bottom <= 0) {
      t.style.setProperty('--ox', '0px');
      t.style.setProperty('--oy', r.top >= innerHeight ? '60px' : '-60px');
      return;
    }
    const d = { l: r.left, r: innerWidth - r.right, t: r.top, b: innerHeight - r.bottom };
    const side = Object.keys(d).reduce((m, k) => (d[k] < d[m] ? k : m), 'l');
    t.style.setProperty('--ox', side === 'l' ? `${-(r.right + 40)}px` : side === 'r' ? `${innerWidth - r.left + 40}px` : '0px');
    t.style.setProperty('--oy', side === 't' ? `${-(r.bottom + 40)}px` : side === 'b' ? `${innerHeight - r.top + 40}px` : '0px');
  }

  /* Entrée : les blocs arrivent depuis le bord le plus proche */
  if (!reduced) document.querySelectorAll('.tile').forEach(edgeOffsets);
  document.body.classList.add('ready');

  /* ---------- Transition de page : les blocs sortent, puis ceux de la page suivante arrivent ---------- */

  addEventListener('pageshow', () => document.body.classList.remove('leaving'));
  if (!reduced) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      document.querySelectorAll('.tile').forEach(edgeOffsets);
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = url.href; }, 600 + 30 * 8);
    });
  }

  /* ---------- Fond : carrés discrets qui bougent ---------- */

  const cv = document.getElementById('bg');
  if (cv) {
    const ctx = cv.getContext('2d');
    const CELL = 72;
    const m = { x: -999, y: -999, tx: -999, ty: -999 };
    let W = 0, H = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    function draw(t) {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, W, H);
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = (Math.sin(x * 0.55 + t * 0.6) + Math.sin(y * 0.7 - t * 0.45) + Math.sin((x + y) * 0.35 + t * 0.3)) / 3;
          const near = Math.max(0, 1 - Math.hypot(x * CELL - m.x, y * CELL - m.y) / 240);
          const v = Math.min(1, Math.max(0, (n + 1) / 2) + near * 0.5);
          const size = CELL * (0.3 + v * 0.5);
          ctx.fillStyle = `rgba(255,255,255,${0.012 + v * v * 0.07})`;
          ctx.fillRect(x * CELL + (CELL - size) / 2 - CELL / 2, y * CELL + (CELL - size) / 2 - CELL / 2, size, size);
        }
      }
    }

    addEventListener('resize', resize);
    resize();
    if (!reduced) {
      addEventListener('pointermove', (e) => { m.tx = e.clientX; m.ty = e.clientY; });
      (function loop(now) {
        m.x += (m.tx - m.x) * 0.08;
        m.y += (m.ty - m.y) * 0.08;
        draw(now / 1000);
        requestAnimationFrame(loop);
      })(0);
    }
  }

  /* ---------- Slider ---------- */

  const box = document.querySelector('.t-projects');
  if (!box) return;
  const slides = [...box.querySelectorAll('.slides img')];
  const link = box.querySelector('.stretch');
  const title = box.querySelector('h2');
  const desc = box.querySelector('.over p');
  const count = box.querySelector('.count');
  const dotsBox = box.querySelector('.dots');

  const dots = slides.map((img, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Projet ${i + 1} : ${img.dataset.title}`);
    b.append(document.createElement('span'));
    b.addEventListener('click', () => go(i));
    dotsBox.append(b);
    return b;
  });

  let current = -1;
  let timer = null;
  let hovering = false;

  function go(i) {
    const prev = current;
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === current);
      s.classList.toggle('is-prev', k === prev && prev !== current);
    });

    const s = slides[current];
    title.textContent = s.dataset.title;
    desc.textContent = s.dataset.desc;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

    dots.forEach((d, k) => {
      d.setAttribute('aria-current', String(k === current));
      d.firstChild.classList.remove('run');
    });
    void dots[current].offsetWidth;
    if (!reduced) dots[current].firstChild.classList.add('run');
    schedule();
  }

  function schedule() {
    clearTimeout(timer);
    if (reduced || hovering || document.hidden) return;
    timer = setTimeout(() => go(current + 1), DURATION);
  }

  box.addEventListener('pointerenter', () => { hovering = true; clearTimeout(timer); dots[current].firstChild.style.animationPlayState = 'paused'; });
  box.addEventListener('pointerleave', () => { hovering = false; go(current); dots[current].firstChild.style.animationPlayState = ''; });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) go(current); else clearTimeout(timer); });

  go(0);
})();
