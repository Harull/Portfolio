// ============================================================
//  LG-DEV ARCHIVE — expand.js
//  Full-screen project detail modal, opened via EXPAND button
//  on the console info screen.
// ============================================================

const ExpandModal = (() => {

  let modal = null;

  function ensureModal() {
    if (document.getElementById('expand-modal')) return;
    modal = document.createElement('div');
    modal.id = 'expand-modal';
    modal.innerHTML = `
      <div class="expand-modal-inner" id="expand-modal-inner">
        <div class="expand-modal-header">
          <div>
            <div class="expand-modal-title"  id="em-title"></div>
            <div class="expand-modal-tagline" id="em-tagline"></div>
          </div>
          <button class="expand-modal-close" id="expand-modal-close">✕ CLOSE</button>
        </div>
        <div class="expand-modal-body" id="em-body"></div>
      </div>`;
    document.body.appendChild(modal);

    document.getElementById('expand-modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function open(project) {
    ensureModal();
    modal = document.getElementById('expand-modal');

    const accent = project.accentColor || '#00b4ff';
    const inner  = document.getElementById('expand-modal-inner');
    if (inner) {
      inner.style.borderColor = `${accent}55`;
      inner.style.boxShadow   = `0 0 60px rgba(0,0,0,0.9), 0 0 40px ${accent}18`;
    }

    // Header
    document.getElementById('em-title').textContent   = project.title;
    document.getElementById('em-title').style.color   = accent;
    document.getElementById('em-tagline').textContent = project.tagline || '';

    // Body
    const body = document.getElementById('em-body');

    // Cover
    const coverHtml = project.coverImage
      ? `<div class="expand-cover" style="min-height:300px;"><img src="${project.coverImage}" alt="${project.title}" height="1000"></div>`
      : `<div class="expand-cover">
          <div class="expand-cover-placeholder" style="color:${accent};text-shadow:0 0 40px ${accent}66;">
            <div class="expand-cover-placeholder-bg"></div>
            ${project.title.charAt(0)}
          </div>
        </div>`;

    // Status badge
    const statusClass = {
      'RELEASED':       'released',
      'IN DEVELOPMENT': 'in-development',
      'PROTOTYPE':      'prototype',
    }[project.status] || 'released';

    // Screenshots grid (if any)
    const screenshotsHtml = (project.screenshots || []).length > 0
      ? `<div>
           <div class="expand-meta-item" style="margin-bottom:8px;"><label>SCREENSHOTS</label></div>
           <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;">
             ${project.screenshots.map(s => `
               <div style="border-radius:4px;overflow:hidden;border:1px solid var(--accent-border);aspect-ratio:16/9;background:var(--bg-card);">
                 <img src="${s}" alt="" style="width:100%;height:100%;object-fit:cover;opacity:0.85;">
               </div>`).join('')}
           </div>
         </div>`
      : '';

    // Links
    const linksHtml = project.links
      ? `<div>
           <div class="expand-meta-item" style="margin-bottom:8px;"><label>LINKS</label></div>
           <div class="expand-links">
             ${project.links.itchio   ? `<a class="expand-link-btn" href="${project.links.itchio}"   target="_blank" rel="noopener">⬡ ITCH.IO</a>`   : ''}
             ${project.links.github   ? `<a class="expand-link-btn" href="${project.links.github}"   target="_blank" rel="noopener">⬡ GITHUB</a>`   : ''}
             ${project.links.website  ? `<a class="expand-link-btn" href="${project.links.website}"  target="_blank" rel="noopener">⬡ WEBSITE</a>`  : ''}
             ${project.links.trailer  ? `<a class="expand-link-btn" href="${project.links.trailer}"  target="_blank" rel="noopener">⬡ TRAILER</a>`  : ''}
             ${project.links.download ? `<a class="expand-link-btn" href="${project.links.download}" target="_blank" rel="noopener">⬡ DOWNLOAD</a>` : ''}
           </div>
         </div>`
      : '';

    const techs = (project.technologies || []).map(t => `<span class="tag">${t}</span>`).join('');
    const tags  = (project.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    body.innerHTML = `
      ${coverHtml}

      <p class="expand-description">${project.description}${project.descriptionLong ? '<br><br>' + project.descriptionLong : ''}</p>

      <div class="expand-meta-grid">
        <div class="expand-meta-item">
          <label>STATUS</label>
          <p><span class="info-status ${statusClass}" style="font-size:10px;padding:3px 8px;">${project.status}</span></p>
        </div>
        <div class="expand-meta-item"><label>YEAR</label><p>${project.year || '—'}</p></div>
        <div class="expand-meta-item"><label>PLATFORM</label><p>${project.platform || '—'}</p></div>
        <div class="expand-meta-item"><label>ENGINE</label>
          <p>${(project.technologies || []).find(t => t.toLowerCase().includes('unreal') || t.toLowerCase().includes('unity') || t.toLowerCase().includes('godot')) || '—'}</p>
        </div>
        <div class="expand-meta-item" style="grid-column:1/-1"><label>ROLE</label><p>${project.role || '—'}</p></div>
        <div class="expand-meta-item" style="grid-column:1/-1">
          <label>TECHNOLOGIES</label>
          <div class="expand-tags" style="margin-top:6px;">${techs}</div>
        </div>
        <div class="expand-meta-item" style="grid-column:1/-1">
          <label>TAGS</label>
          <div class="expand-tags" style="margin-top:6px;">${tags}</div>
        </div>
      </div>

      ${screenshotsHtml}
      ${linksHtml}
    `;

    // Open
    requestAnimationFrame(() => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function close() {
    const m = document.getElementById('expand-modal');
    if (!m) return;
    m.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, close };

})();
