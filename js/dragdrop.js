// ============================================================
//  LG-DEV ARCHIVE — dragdrop.js
//  Drag & drop module — mouse and touch support
// ============================================================

const DragDrop = (() => {

  let draggedId = null;
  let ghostEl   = null;
  let ox = 0, oy = 0;

  const dev = document.getElementById('console-device');

  // ── Init ──────────────────────────────────────────────────
  function init() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend',  onTouchEnd);
  }

  // ── Attach to a cartridge element ─────────────────────────
  function attach(el, id) {
    el.addEventListener('mousedown', e => {
      if (e.button !== 0 || el.classList.contains('is-inserted')) return;
      e.preventDefault();
      startDrag(id, el, e.clientX, e.clientY);
    });
    el.addEventListener('touchstart', e => {
      if (el.classList.contains('is-inserted')) return;
      const t = e.touches[0];
      startDrag(id, el, t.clientX, t.clientY);
    }, { passive: false });
  }

  // ── Mouse handlers ────────────────────────────────────────
  function onMouseMove(e) {
    if (!draggedId) return;
    moveGhost(e.clientX, e.clientY);
    const under = document.elementFromPoint(e.clientX, e.clientY);
    dev?.classList.toggle('drag-over', !!(under && dev.contains(under)));
    document.body.classList.add('cursor-drag');
  }

  function onMouseUp(e) {
    if (!draggedId) return;
    document.body.classList.remove('cursor-drag');
    const under = document.elementFromPoint(e.clientX, e.clientY);
    if (under && dev?.contains(under)) dropOnConsole(draggedId);
    endDrag();
  }

  // ── Touch handlers ────────────────────────────────────────
  function onTouchMove(e) {
    if (!draggedId) return;
    e.preventDefault();
    const t = e.touches[0];
    moveGhost(t.clientX, t.clientY);
    const under = document.elementFromPoint(t.clientX, t.clientY);
    dev?.classList.toggle('drag-over', !!(under && dev.contains(under)));
  }

  function onTouchEnd(e) {
    if (!draggedId) return;
    const t = e.changedTouches[0];
    const under = document.elementFromPoint(t.clientX, t.clientY);
    if (under && dev?.contains(under)) dropOnConsole(draggedId);
    endDrag();
  }

  // ── Core drag logic ───────────────────────────────────────
  function startDrag(id, src, cx, cy) {
    draggedId = id;
    src.classList.add('dragging');

    ghostEl = document.createElement('div');
    ghostEl.className   = 'drag-ghost';
    // Use a fixed width independent of the source card
    ghostEl.style.width = '100px';
    ghostEl.innerHTML   = src.innerHTML;
    document.body.appendChild(ghostEl);

    moveGhost(cx, cy);
    document.body.style.cursor = 'none';
  }

  function moveGhost(cx, cy) {
    if (!ghostEl) return;
    // Offset slightly so the ghost sits to the bottom-right of the cursor
    ghostEl.style.left = (cx + 12) + 'px';
    ghostEl.style.top  = (cy + 12) + 'px';
  }

  function endDrag() {
    document.querySelector('.dragging')?.classList.remove('dragging');
    ghostEl?.remove();
    ghostEl = null;
    dev?.classList.remove('drag-over');
    draggedId = null;
    document.body.style.cursor = '';
  }

  function dropOnConsole(id) {
    const project = PROJECTS.find(p => p.id === id);
    if (!project) return;

    // Deselect previously inserted card
    document.querySelector('.cartridge.is-inserted')?.classList.remove('is-inserted');

    // Mark new card as inserted
    const card = document.querySelector(`[data-project-id="${id}"]`);
    if (card) card.classList.add('is-inserted');

    ConsoleManager.insertCartridge(project);
    const hint = document.getElementById('onboarding-hint');
    if (hint) hint.classList.add('hidden');
    dev?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Public API ────────────────────────────────────────────
  return { init, attach };

})();
