// ============================================================
//  LG-DEV ARCHIVE — console.js
//  3 states: idle (no cartridge) | info | demo
//  Buttons: MORE → expand modal, DEMO → youtube, EJECT
// ============================================================

const ConsoleManager = (() => {

  let currentProject = null;
  let currentScreen  = 'idle'; // 'idle' | 'info' | 'demo'
  let isAnimating    = false;

  const device   = document.getElementById('console-device');
  const screenEl = document.getElementById('console-screen');
  const slot     = document.getElementById('cartridge-slot');
  const slotGlow = document.getElementById('slot-glow');
  const btnMore  = document.getElementById('btn-more');
  const btnDemo  = document.getElementById('btn-demo');
  const btnEject = document.getElementById('btn-eject');

  // ── Init ────────────────────────────────────────────────────
  function init() {
    renderIdleScreen();
    bindButtons();
    updateSysStatus();
    restoreSession();
  }

  // ── Session memory ───────────────────────────────────────────
  function restoreSession() {
    try {
      const saved = sessionStorage.getItem('lgdev_project');
      if (!saved || typeof PROJECTS === 'undefined') return;
      const project = PROJECTS.find(p => p.id === saved);
      if (project) {
        setTimeout(() => {
          document.querySelector(`[data-project-id="${project.id}"]`)?.classList.add('is-inserted');
          insertCartridge(project, true);
        }, 600);
      }
    } catch (e) {}
  }

  // ── Button bindings ─────────────────────────────────────────
  function bindButtons() {
    btnMore ?.addEventListener('click', () => { pulse(btnMore);  openMore(); });
    btnDemo ?.addEventListener('click', () => { pulse(btnDemo);  toggleDemo(); });
    btnEject?.addEventListener('click', () => { pulse(btnEject); ejectCartridge(); });

    document.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', () => {
        pulse(el);
        const a = el.dataset.action;
        if (a === 'more')  openMore();
        if (a === 'demo')  toggleDemo();
        if (a === 'eject') ejectCartridge();
      });
    });
  }

  function pulse(el) {
    el.classList.add('anim-button-press');
    setTimeout(() => el.classList.remove('anim-button-press'), 200);
  }

  // ── Sync buttons to state ────────────────────────────────────
  function syncButtons() {
    const hasProject = !!currentProject;
    const inDemo     = currentScreen === 'demo';

    // MORE and EJECT only when cartridge loaded
    if (btnMore)  btnMore.style.display  = hasProject ? '' : 'none';
    if (btnEject) btnEject.style.display = hasProject ? '' : 'none';

    // DEMO label toggles between DEMO and INFO when cartridge loaded
    if (btnDemo) {
      btnDemo.style.display = hasProject ? '' : 'none';
      btnDemo.querySelector('span').textContent = inDemo ? 'INFO' : 'DEMO';
    }

    // EJECT red tint
    if (btnEject) {
      btnEject.style.borderColor = 'rgba(255,80,80,0.4)';
      btnEject.style.color       = 'rgba(255,80,80,0.6)';
    }

    // Sync mobile bar too
    document.querySelectorAll('[data-action]').forEach(el => {
      const a = el.dataset.action;
      if (a === 'more')  el.style.display = hasProject ? '' : 'none';
      if (a === 'eject') el.style.display = hasProject ? '' : 'none';
      if (a === 'demo')  {
        el.style.display = hasProject ? '' : 'none';
        el.querySelector('span').textContent = inDemo ? 'INFO' : 'DEMO';
      }
    });
  }

  // ── Accent colour ────────────────────────────────────────────
  function setAccent(color) {
    document.documentElement.style.setProperty('--console-accent', color);
    if (device)   device.style.filter = `drop-shadow(0 0 32px ${color}55)`;
    if (slotGlow) { slotGlow.style.background = color; slotGlow.style.boxShadow = `0 0 8px ${color}`; }
  }
  function clearAccent() {
    document.documentElement.style.setProperty('--console-accent', '#00b4ff');
    if (device)   device.style.filter = '';
    if (slotGlow) { slotGlow.style.background = ''; slotGlow.style.boxShadow = ''; }
  }

  // ── Insert ───────────────────────────────────────────────────
  function insertCartridge(project, silent = false) {
    if (isAnimating) return;
    if (currentProject && currentProject.id === project.id) return;
    isAnimating = true;

    flashScreen(() => {
      currentProject = project;
      currentScreen  = 'info';
      slot.classList.add('has-cartridge');
      device.classList.add('cartridge-inserted');
      setAccent(project.accentColor || '#00b4ff');
      renderInfoScreen(project);
      updateSysStatus();
      syncButtons();
      isAnimating = false;
    });

    if (!silent) showToast(`// LOADING: ${project.title}`, 'success');
    try { sessionStorage.setItem('lgdev_project', project.id); } catch (e) {}
  }

  // ── Eject ────────────────────────────────────────────────────
  function ejectCartridge() {
    if (!currentProject || isAnimating) return;
    isAnimating = true;
    const title = currentProject.title;

    flashScreen(() => {
      document.querySelector(`[data-project-id="${currentProject.id}"]`)?.classList.remove('is-inserted');
      currentProject = null;
      currentScreen  = 'idle';
      slot.classList.remove('has-cartridge');
      device.classList.remove('cartridge-inserted');
      clearAccent();
      renderIdleScreen();
      updateSysStatus();
      syncButtons();
      isAnimating = false;
    });

    showToast(`// EJECTED: ${title}`, 'eject');
    try { sessionStorage.removeItem('lgdev_project'); } catch (e) {}
  }

  // ── Screens ──────────────────────────────────────────────────
  function renderIdleScreen() {
    screenEl.innerHTML = `
      <div class="screen-idle anim-fade-in">
        <div class="idle-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="6" width="20" height="14" rx="2"/>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            <line x1="12" y1="11" x2="12" y2="15"/>
            <line x1="10" y1="13" x2="14" y2="13"/>
          </svg>
        </div>
        <p class="idle-title">PLEASE INSERT CARTRIDGE</p>
        <p class="idle-sub">DRAG &amp; DROP OR CLICK BELOW</p>
      </div>`;
  }

  function renderInfoScreen(project) {
    const statusClass = {
      'RELEASED':       'released',
      'IN DEVELOPMENT': 'in-development',
      'PROTOTYPE':      'prototype',
    }[project.status] || 'released';

    const techs = (project.technologies || []).map(t => `<span class="tag">${t}</span>`).join('');
    const tags  = (project.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
    const links = project.links ? `
      <div class="info-field" style="grid-column:1/-1">
        <label>LINKS</label>
        <div class="info-techs">
          ${project.links.itchio  ? `<a class="info-link" href="${project.links.itchio}"  target="_blank">ITCH.IO</a>`  : ''}
          ${project.links.github  ? `<a class="info-link" href="${project.links.github}"  target="_blank">GITHUB</a>`  : ''}
          ${project.links.website ? `<a class="info-link" href="${project.links.website}" target="_blank">WEBSITE</a>` : ''}
        </div>
      </div>` : '';

    screenEl.innerHTML = `
      <div class="screen-info anim-screen-boot">
        <div class="info-header">
          <div>
            <div class="info-title">${project.title}</div>
            <div class="info-tagline">${project.tagline || ''}</div>
          </div>
          <div class="info-status ${statusClass}">${project.status}</div>
        </div>
        <p class="info-description">${project.description}</p>
        <div class="info-grid">
          <div class="info-field"><label>PLATFORM</label><p>${project.platform || '—'}</p></div>
          <div class="info-field"><label>YEAR</label><p>${project.year || '—'}</p></div>
          <div class="info-field" style="grid-column:1/-1"><label>ROLE</label><p>${project.role || '—'}</p></div>
          <div class="info-field" style="grid-column:1/-1"><label>TECHNOLOGIES</label><div class="info-techs">${techs}</div></div>
          <div class="info-field" style="grid-column:1/-1"><label>TAGS</label><div class="info-techs">${tags}</div></div>
          ${links}
        </div>
      </div>`;
  }

  function renderDemoScreen(project) {
    if (project.videoUrl) {
      const ytMatch = project.videoUrl.match(/(?:youtu\.be\/|watch\?v=)([A-Za-z0-9_-]+)/);
      const embed   = ytMatch
        ? `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`
        : project.videoUrl;
      screenEl.innerHTML = `
        <div class="screen-demo anim-screen-boot">
          <iframe src="${embed}" allowfullscreen allow="autoplay; encrypted-media"></iframe>
        </div>`;
    } else {
      screenEl.innerHTML = `
        <div class="screen-demo anim-screen-boot">
          <div class="demo-placeholder">
            <div class="play-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <p>NO DEMO AVAILABLE</p>
            <p style="font-size:8px;color:var(--text-dim);margin-top:4px;">ADD videoUrl TO PROJECTS DATA</p>
          </div>
        </div>`;
    }
  }

  // ── Actions ──────────────────────────────────────────────────
  function openMore() {
    if (!currentProject) return;
    if (typeof ExpandModal !== 'undefined') ExpandModal.open(currentProject);
  }

  function toggleDemo() {
    if (!currentProject) return;
    if (currentScreen === 'demo') {
      // Switch back to info
      currentScreen = 'info';
      flashScreen(() => { renderInfoScreen(currentProject); syncButtons(); });
    } else {
      currentScreen = 'demo';
      flashScreen(() => { renderDemoScreen(currentProject); syncButtons(); });
    }
  }

  // ── Flash transition ─────────────────────────────────────────
  function flashScreen(cb) {
    const ov = document.createElement('div');
    ov.className = 'screen-transition';
    screenEl.appendChild(ov);
    requestAnimationFrame(() => {
      ov.style.transition = 'opacity 0.1s ease';
      ov.style.opacity    = '0.9';
      setTimeout(() => { cb(); ov.style.opacity = '0'; setTimeout(() => ov.remove(), 200); }, 110);
    });
  }

  // ── Status text ──────────────────────────────────────────────
  function updateSysStatus() {
    const el = document.getElementById('sys-status');
    if (!el) return;
    const count  = typeof PROJECTS !== 'undefined' ? PROJECTS.length : 0;
    const loaded = currentProject ? `UNIT: ${currentProject.title}` : `${count} UNITS LOADED`;
    el.textContent = `SYS: ONLINE | ${loaded}`;
  }

  return { init, insertCartridge, ejectCartridge, getCurrentProject: () => currentProject };

})();
