// Font tester — outil de développement, invisible pour les visiteurs.
//
// Activer : ajouter ?fonts à n'importe quelle URL du site (ex. work.html?fonts),
// ou appuyer sur Shift+F. Désactiver : ?fonts=off, Shift+F, ou le bouton ✕.
// Les choix sont gardés (localStorage) d'une page à l'autre.
// Rien n'est chargé tant que l'outil n'est pas activé.
(() => {
  const FLAG = 'ft-on';
  const STORE = 'ft-settings';
  const safe = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignoré */ } },
    del(k) { try { localStorage.removeItem(k); } catch { /* ignoré */ } },
  };

  // --- Activation par URL ou raccourci -----------------------------------
  const param = new URLSearchParams(location.search).get('fonts');
  if (param === 'off') safe.del(FLAG);
  else if (param !== null) safe.set(FLAG, '1');

  document.addEventListener('keydown', e => {
    if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && e.key === 'F' &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '')) {
      if (safe.get(FLAG)) safe.del(FLAG); else safe.set(FLAG, '1');
      location.reload();
    }
  });

  if (!safe.get(FLAG)) return;

  // --- Catalogue de polices ----------------------------------------------
  const src = document.currentScript?.src || [...document.scripts].map(s => s.src).find(s => s.includes('font-tester.js'));
  const DEV = new URL('./', src).href;        // .../assets/dev/
  const SITE = new URL('../fonts/', DEV).href; // .../assets/fonts/ (polices du site)

  const F = (name, files, titleWeight, note = '') => ({ name, files, titleWeight, note });
  const FONTS = [
    F('Neco', [[700, DEV + 'fonts/Neco-Bold.woff2']], 700, 'serif'),
    F('Hind', [[400, DEV + 'fonts/Hind-Regular.woff2'], [700, DEV + 'fonts/Hind-Bold.woff2']], 700),
    F('Chillax', [[700, DEV + 'fonts/Chillax-Bold.woff2']], 700),
    F('Excon', [[700, DEV + 'fonts/Excon-Bold.woff2']], 700),
    F('Pally', [[700, DEV + 'fonts/Pally-Bold.woff2']], 700),
    F('Panchang', [[700, DEV + 'fonts/Panchang-Bold.woff2']], 700, 'très large'),
    F('Boxing', [[400, DEV + 'fonts/Boxing-Regular.woff2']], 400, 'très large'),
    F('Epilogue', [['100 900', DEV + 'fonts/Epilogue-Variable.woff2']], 800),
    F('Chubbo', [[400, DEV + 'fonts/Chubbo-Regular.woff2'], [700, DEV + 'fonts/Chubbo-Bold.woff2']], 700),
    F('Titan One', [[400, SITE + 'titan-one/TitanOne-Regular.woff2']], 400),
    F('Lilita One', [[400, DEV + 'fonts/LilitaOne-Regular.woff2']], 400),
    F('Handlee', [[400, DEV + 'fonts/Handlee-Regular.woff2']], 400),
    F('Patrick Hand', [[400, DEV + 'fonts/PatrickHand-Regular.woff2']], 400),
    F('Kalam', [[300, DEV + 'fonts/Kalam-Light.woff2'], [400, DEV + 'fonts/Kalam-Regular.woff2']], 400),
    F('Itim', [[400, SITE + 'itim/Itim-Regular.woff2']], 400),
    { name: 'Système sans-serif', css: 'system-ui, -apple-system, sans-serif', titleWeight: 700, files: [] },
    { name: 'Système serif', css: 'Georgia, "Times New Roman", serif', titleWeight: 700, files: [] },
  ];
  FONTS.forEach(f => { f.family = f.css ? null : 'FT ' + f.name; });

  const DEFAULTS = { title: 'Titan One', text: 'Itim', scale: 100, upper: true, open: true };
  let state = { ...DEFAULTS };
  try { state = { ...DEFAULTS, ...JSON.parse(safe.get(STORE) || '{}') }; } catch { /* défauts */ }
  const byName = n => FONTS.find(f => f.name === n) || FONTS[0];
  const save = () => safe.set(STORE, JSON.stringify(state));

  // --- Chargement paresseux des polices ----------------------------------
  const loaded = new Map();
  function load(font) {
    if (font.css || loaded.has(font.name)) return loaded.get(font.name);
    const p = Promise.all(font.files.map(([weight, url]) => {
      const face = new FontFace(font.family, `url(${url}) format('woff2')`, { weight: String(weight), display: 'swap' });
      document.fonts.add(face);
      return face.load();
    })).catch(() => {});
    loaded.set(font.name, p);
    return p;
  }
  const stack = (font, fallback) => (font.css || `'${font.family}'`) + ', ' + fallback;

  // --- Application sur la page -------------------------------------------
  const TITLES = 'h1, .rows a, .rows-work .rtitle, .contact-title, .big-link, .error-link';
  const style = document.createElement('style');
  style.id = 'ft-style';
  style.textContent = `
    ${TITLES} { font-weight: var(--ft-title-weight, 700) !important; }
    h1 { font-size: calc(clamp(2.2rem, 7vw, 5.5rem) * var(--ft-scale, 1)) !important; }
    .rows a { font-size: calc(clamp(2.4rem, 9vw, 7rem) * var(--ft-scale, 1)) !important; }
    .rows-work .rtitle { font-size: calc(clamp(2.2rem, 6vw, 4.6rem) * var(--ft-scale, 1)) !important; }
    .contact-title, .error-link { font-size: calc(clamp(1.3rem, 4.5vw, 3.2rem) * var(--ft-scale, 1)) !important; }
    .big-link { font-size: calc(clamp(1.2rem, 6.4vw, 5.5rem) * var(--ft-scale, 1)) !important; }
    .ft-nocase :is(h1, .rows a, .rows-work .rtitle, .contact-title, .error-link) { text-transform: none !important; }
  `;
  document.head.appendChild(style);

  function apply() {
    const t = byName(state.title);
    const b = byName(state.text);
    Promise.all([load(t), load(b)]).then(() => {
      const root = document.documentElement;
      root.style.setProperty('--font-display', stack(t, 'sans-serif'));
      root.style.setProperty('--font-body', stack(b, 'sans-serif'));
    });
    const root = document.documentElement;
    root.style.setProperty('--ft-title-weight', String(t.titleWeight));
    root.style.setProperty('--ft-scale', String(state.scale / 100));
    root.classList.toggle('ft-nocase', !state.upper);
    save();
    refreshUI();
  }

  // --- Interface ----------------------------------------------------------
  const ui = document.createElement('div');
  ui.id = 'ft-panel';
  ui.innerHTML = `
    <style>
      #ft-panel { position: fixed; left: 12px; bottom: 12px; z-index: 99999; width: 280px;
        background: #1a1818; color: #ece7e1; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,.4);
        font: 12px/1.4 system-ui, -apple-system, sans-serif; letter-spacing: 0; text-transform: none; }
      #ft-panel * { box-sizing: border-box; font: inherit; letter-spacing: inherit; text-transform: none; color: inherit; margin: 0; }
      #ft-panel .ft-head { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; cursor: default; }
      #ft-panel .ft-head b { font-weight: 600; }
      #ft-panel .ft-head span { display: flex; gap: 4px; }
      #ft-panel button { background: none; border: 0; cursor: pointer; border-radius: 5px; padding: 3px 8px; }
      #ft-panel button:hover { background: rgba(255,255,255,.14); }
      #ft-panel .ft-body { padding: 0 12px 12px; display: grid; gap: 10px; }
      #ft-panel[data-open="false"] .ft-body { display: none; }
      #ft-panel label { display: grid; gap: 4px; }
      #ft-panel label > span { opacity: .65; font-size: 11px; }
      #ft-panel .ft-row { display: grid; grid-template-columns: 28px 1fr 28px; gap: 4px; }
      #ft-panel select { width: 100%; background: #2c2929; border: 1px solid rgba(255,255,255,.18); border-radius: 5px; padding: 5px 6px; }
      #ft-panel .ft-row button { background: #2c2929; border: 1px solid rgba(255,255,255,.18); }
      #ft-panel input[type=range] { width: 100%; accent-color: #ece7e1; }
      #ft-panel .ft-check { display: flex; align-items: center; gap: 8px; cursor: pointer; }
      #ft-panel .ft-actions { display: flex; gap: 6px; }
      #ft-panel .ft-actions button { flex: 1; background: #2c2929; border: 1px solid rgba(255,255,255,.18); padding: 6px 8px; }
      #ft-panel .ft-hint { opacity: .5; font-size: 11px; }
    </style>
    <div class="ft-head"><b>Test des polices</b>
      <span><button type="button" data-a="toggle" title="Réduire / ouvrir">–</button><button type="button" data-a="close" title="Désactiver l'outil (Shift+F)">✕</button></span></div>
    <div class="ft-body">
      <label><span>Titres</span><div class="ft-row"><button type="button" data-a="t-prev">◀</button><select data-k="title"></select><button type="button" data-a="t-next">▶</button></div></label>
      <label><span>Texte</span><div class="ft-row"><button type="button" data-a="b-prev">◀</button><select data-k="text"></select><button type="button" data-a="b-next">▶</button></div></label>
      <label><span>Taille des titres : <em data-r="scale"></em></span><input type="range" min="60" max="130" step="5" data-k="scale"></label>
      <label class="ft-check"><input type="checkbox" data-k="upper"> Titres en majuscules</label>
      <div class="ft-actions"><button type="button" data-a="reset">Réinitialiser</button><button type="button" data-a="copy">Copier mon choix</button></div>
      <div class="ft-hint" data-r="msg">Shift+F pour afficher / masquer l'outil.</div>
    </div>`;

  const q = s => ui.querySelector(s);
  const selTitle = q('[data-k=title]');
  const selText = q('[data-k=text]');
  FONTS.forEach(f => {
    for (const sel of [selTitle, selText]) {
      const o = document.createElement('option');
      o.value = f.name;
      o.textContent = f.name + (f.note ? ` (${f.note})` : '');
      sel.appendChild(o);
    }
  });

  function refreshUI() {
    ui.dataset.open = String(state.open);
    selTitle.value = state.title;
    selText.value = state.text;
    q('[data-k=scale]').value = state.scale;
    q('[data-k=upper]').checked = state.upper;
    q('[data-r=scale]').textContent = state.scale + ' %';
  }

  const step = (name, dir) => FONTS[(FONTS.findIndex(f => f.name === name) + dir + FONTS.length) % FONTS.length].name;
  const summary = () => `Titres : ${state.title} · Texte : ${state.text} · Taille des titres : ${state.scale} % · Majuscules : ${state.upper ? 'oui' : 'non'}`;

  ui.addEventListener('change', e => {
    const k = e.target.dataset.k;
    if (k === 'title' || k === 'text') state[k] = e.target.value;
    if (k === 'upper') state.upper = e.target.checked;
    apply();
  });
  ui.addEventListener('input', e => {
    if (e.target.dataset.k === 'scale') { state.scale = Number(e.target.value); apply(); }
  });
  ui.addEventListener('click', e => {
    const a = e.target.closest('button')?.dataset.a;
    if (!a) return;
    if (a === 'toggle') { state.open = !state.open; apply(); }
    if (a === 'close') { safe.del(FLAG); location.reload(); }
    if (a === 't-prev') { state.title = step(state.title, -1); apply(); }
    if (a === 't-next') { state.title = step(state.title, 1); apply(); }
    if (a === 'b-prev') { state.text = step(state.text, -1); apply(); }
    if (a === 'b-next') { state.text = step(state.text, 1); apply(); }
    if (a === 'reset') { state = { ...DEFAULTS, open: state.open }; apply(); }
    if (a === 'copy') {
      const done = () => { q('[data-r=msg]').textContent = 'Copié : ' + summary(); };
      if (navigator.clipboard) navigator.clipboard.writeText(summary()).then(done, done); else done();
    }
  });

  document.body.appendChild(ui);
  apply();
})();
