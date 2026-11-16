'use strict';

async function fetchJson(url) {
  const resp = await fetch(url, { cache: 'no-cache' });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  return resp.json();
}

function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmtScore(n) {
  return n % 1 === 0.5 ? Math.floor(n) + '½' : String(n);
}

function buildSectionTabs(containerId, sections, onSelect) {
  const el = document.getElementById(containerId);
  if (!el || sections.length <= 1) { if (el) el.hidden = true; return; }
  el.innerHTML = sections.map((s, i) =>
    '<button class="section-tab' + (i === 0 ? ' active' : '') +
    '" data-slug="' + esc(s.slug) + '">' + esc(s.name) + '</button>'
  ).join('');
  el.querySelectorAll('.section-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.section-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sec = sections.find(s => s.slug === btn.dataset.slug);
      if (sec) onSelect(sec);
    });
  });
}

// Mark the nav link that matches the current page as active.
(function () {
  const page = document.documentElement.dataset.page;
  document.querySelectorAll('nav.site-nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
}());
