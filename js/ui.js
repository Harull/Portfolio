// ============================================================
//  LG-DEV ARCHIVE — ui.js
//  Vault rendering, 3D tilt, vault filter, boot animation,
//  clock, constellation particles, FPS cursor, scroll bar,
//  footer terminal, power-on. Driven by config.js.
// ============================================================

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className   = 'toast ' + type;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toast-out 0.3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, 2200);
}

// ── UI Module ─────────────────────────────────────────────────
const UI = (() => {

  let activeFilter = 'ALL';

  // ── Apply config to DOM ────────────────────────────────────
  function applyConfig() {
    if (typeof CONFIG === 'undefined') return;

    // Header title
    const brand = document.getElementById('header-brand');
    if (brand) {
      brand.textContent = CONFIG.headerTitle || 'LG-DEV ARCHIVE';
      brand.dataset.text = brand.textContent;
    }

    // Header subtitle
    const sub = document.querySelector('.header-brand-sub');
    if (sub) sub.textContent = '/ ' + (CONFIG.name || '').toUpperCase();

    // Nav links
    const links = CONFIG.links || {};
    const navMap = {
      'nav-github':   links.github,
      'nav-linkedin': links.linkedin,
      'nav-email':    links.email,
      'nav-itchio':   links.itchio,
      'nav-cv':       links.cv,
    };
    Object.entries(navMap).forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el && href) el.href = href;
    });

    // Footer
    const footerDev   = document.getElementById('footer-dev-name');
    const footerEmail = document.getElementById('footer-dev-email');
    const footerBuild = document.getElementById('footer-build');
    if (footerDev)   footerDev.textContent   = (CONFIG.name   || '').toUpperCase();
    if (footerEmail) footerEmail.textContent = CONFIG.email   || '';
    if (footerBuild) footerBuild.textContent = CONFIG.footerBuild || '';

    // Page title
    document.title = `${CONFIG.headerTitle || 'LG-DEV ARCHIVE'} — ${CONFIG.name || ''}`;
  }

  // ── Vault filter bar ───────────────────────────────────────
  function buildFilterBar() {
    const bar = document.getElementById('vault-filter-bar');
    if (!bar || typeof PROJECTS === 'undefined') return;

    // Collect all unique tags across projects
    const allTags = new Set();
    PROJECTS.forEach(p => (p.tags || []).forEach(t => allTags.add(t)));
    const tags = ['ALL', ...Array.from(allTags).sort()];

    bar.innerHTML = '';
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className   = 'filter-btn' + (tag === 'ALL' ? ' active' : '');
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.addEventListener('click', () => {
        activeFilter = tag;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterVault(tag);
      });
      bar.appendChild(btn);
    });
  }

  function filterVault(tag) {
    document.querySelectorAll('.cartridge').forEach(card => {
      const id      = card.dataset.projectId;
      const project = PROJECTS.find(p => p.id === id);
      if (!project) return;
      const match = tag === 'ALL' || (project.tags || []).includes(tag);
      card.style.display     = match ? '' : 'none';
      card.style.opacity     = match ? '' : '0';
      card.style.pointerEvents = match ? '' : 'none';
    });
    // Update count
    const cnt   = document.getElementById('vault-count');
    const shown = tag === 'ALL'
      ? PROJECTS.length
      : PROJECTS.filter(p => (p.tags || []).includes(tag)).length;
    if (cnt) cnt.textContent = `${shown} ENTRIES`;
  }

  // ── Vault rendering ────────────────────────────────────────
  function renderVault() {
    const grid = document.getElementById('vault-grid');
    const cnt  = document.getElementById('vault-count');
    if (!grid) return;
    grid.innerHTML = '';
    PROJECTS.forEach((project, index) => {
      const card = makeCard(project, index);
      grid.appendChild(card);
      DragDrop.attach(card, project.id);
    });
    if (cnt) cnt.textContent = `${PROJECTS.length} ENTRIES`;
  }

  function makeCard(project, index) {
    const el = document.createElement('div');
    el.className = 'cartridge anim-init anim-fade-in-up';
    el.dataset.projectId = project.id;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Load ${project.title}`);
    el.style.animationDelay = `${0.06 + index * 0.07}s`;

    const accent = project.accentColor || '#00b4ff';
    const letter = project.title.charAt(0);

    const coverHtml = project.coverImage
      ? `<img class="cartridge-cover-art" src="${project.coverImage}" alt="${project.title}" draggable="false">`
      : `<div class="cartridge-cover-default">
           <div class="cartridge-cover-bg"></div>
           <span class="cartridge-cover-letter" style="color:${accent};text-shadow:0 0 24px ${accent}88;">${letter}</span>
         </div>`;

    el.innerHTML = `
      <div class="cartridge-inner">
        <div class="cartridge-sheen"></div>
        <div class="cartridge-notch"></div>
        <div class="cartridge-cover">
          ${coverHtml}
          <div class="cartridge-scan"></div>
          <div class="cartridge-hover-badge">${project.year || ''} · ${(project.tags || [])[0] || ''}</div>
        </div>
        <div class="cartridge-label">
          <div class="cartridge-label-strip" style="background:linear-gradient(90deg,${accent},transparent);"></div>
          <div class="cartridge-name">${project.title}</div>
          <div class="cartridge-sub">${project.tagline || ''}</div>
        </div>
      </div>`;

    el.style.setProperty('--card-accent', accent);

    // 3D tilt on mouse move
    el.addEventListener('mousemove', e => tilt(e, el, accent));
    el.addEventListener('mouseleave', () => resetTilt(el));

    // Cursor hover class
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
      if (!el.classList.contains('is-inserted'))
        el.style.filter = `drop-shadow(0 12px 32px ${accent}44)`;
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      if (!el.classList.contains('is-inserted')) el.style.filter = '';
    });

    // Keyboard
    el.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && !el.classList.contains('is-inserted')) {
        e.preventDefault(); quickInsert(project, el);
      }
    });

    // Click
    let t0 = 0;
    el.addEventListener('mousedown', () => { t0 = Date.now(); });
    el.addEventListener('mouseup',   () => { if (Date.now() - t0 < 200) quickInsert(project, el); });

    return el;
  }

  // 3D tilt helper
  function tilt(e, el, accent) {
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    const rx = -dy * 10;
    const ry =  dx * 10;
    el.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.04)`;

    const sheen = el.querySelector('.cartridge-sheen');
    if (sheen) {
      const px = ((e.clientX - r.left) / r.width)  * 100;
      const py = ((e.clientY - r.top)  / r.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.10) 0%, transparent 65%)`;
    }
  }

  function resetTilt(el) {
    el.style.transform = '';
    const sheen = el.querySelector('.cartridge-sheen');
    if (sheen) sheen.style.background = '';
  }

  function dismissOnboarding() {
    const hint = document.getElementById('onboarding-hint');
    if (hint && !hint.classList.contains('hidden')) hint.classList.add('hidden');
  }

  function quickInsert(project, el) {
    if (el.classList.contains('is-inserted')) return;
    document.querySelector('.cartridge.is-inserted')?.classList.remove('is-inserted');
    el.classList.add('is-inserted');
    el.style.animation = 'insert-bounce 0.3s ease';
    setTimeout(() => el.style.animation = '', 300);
    ConsoleManager.insertCartridge(project);
    dismissOnboarding();
    if (window.innerWidth < 700)
      document.getElementById('console-device')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Boot scramble ──────────────────────────────────────────
  function bootSequence() {
    const brand = document.getElementById('header-brand');
    if (!brand) return;
    const final = brand.textContent || 'LG-DEV ARCHIVE';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let iter = 0;
    const iv = setInterval(() => {
      brand.textContent = final.split('').map((c, i) => {
        if (i < iter) return c;
        if (c === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iter >= final.length) clearInterval(iv);
      iter += 0.4;
    }, 35);
  }

  // ── Live clock ─────────────────────────────────────────────
  function startClock() {
    const el = document.getElementById('header-time');
    if (!el) return;
    const tick = () => {
      const n = new Date();
      el.textContent = [n.getHours(), n.getMinutes(), n.getSeconds()]
        .map(v => String(v).padStart(2, '0')).join(':');
    };
    tick(); setInterval(tick, 1000);
  }

  // ── Constellation particles ────────────────────────────────
  function startParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, mouse = { x: -9999, y: -9999 };

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const CONNECT_DIST = 120;
    const MOUSE_DIST   = 100;
    const MOUSE_FORCE  = 0.015;

    function mkParticle() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r:  Math.random() * 1.4 + 0.3,
        base: Math.random() * 0.45 + 0.08,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.018,
      };
    }

    const particles = [];
    for (let i = 0; i < 100; i++) particles.push(mkParticle());

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const a = p.base * (0.55 + 0.45 * Math.sin(p.pulse));
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST * MOUSE_FORCE;
          p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
        }
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.8) { p.vx *= 0.8 / speed; p.vy *= 0.8 / speed; }
        p.vx *= 0.995; p.vy *= 0.995;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,255,${a})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,180,255,${(1 - d / CONNECT_DIST) * 0.12})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ── FPS crosshair cursor ───────────────────────────────────
  function startCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
      cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-active'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-active'));
    const sel = 'a, button, [role="button"], .cartridge, .nav-icon, .ctrl-btn, .top-btn, .home-btn, .filter-btn';
    document.addEventListener('mouseover', e => { if (e.target.closest(sel)) document.body.classList.add('cursor-hover'); });
    document.addEventListener('mouseout',  e => { if (e.target.closest(sel)) document.body.classList.remove('cursor-hover'); });
  }

  // ── Scroll progress bar ────────────────────────────────────
  function startScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  // ── Footer mini terminal (driven by CONFIG) ────────────────
  function startFooterTerminal() {
    const el = document.getElementById('footer-terminal-line');
    if (!el) return;
    const lines = (typeof CONFIG !== 'undefined' && CONFIG.terminalLines)
      ? CONFIG.terminalLines
      : ['> sys.status: ONLINE', '> portfolio.load() OK'];
    let i = 0, charIdx = 0, current = '';
    function typeNext() {
      if (charIdx < lines[i].length) {
        current += lines[i][charIdx++];
        el.textContent = current;
        setTimeout(typeNext, 38 + Math.random() * 30);
      } else {
        setTimeout(() => {
          const erase = setInterval(() => {
            current = current.slice(0, -1);
            el.textContent = current;
            if (!current) {
              clearInterval(erase);
              i = (i + 1) % lines.length; charIdx = 0;
              setTimeout(typeNext, 400);
            }
          }, 18);
        }, 2200);
      }
    }
    typeNext();
  }

  // ── Power-on overlay ───────────────────────────────────────
  function powerOn() {
    const ov = document.getElementById('poweron-overlay');
    if (!ov) return;
    setTimeout(() => ov.remove(), 1000);
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    applyConfig();
    powerOn();
    renderVault();
    buildFilterBar();
    bootSequence();
    startClock();
    startParticles();
    startCursor();
    startScrollProgress();
    startFooterTerminal();
  }

  return { init };

})();
