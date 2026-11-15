/* ML Jewellery prototype: shared sample data, browser storage, helpers and page shells.
   Front end only. Data is kept in localStorage so it survives moving between pages;
   "Reset demo data" (staff page / sidebar) puts the samples back. */

// ponytail: fixed demo date so "due this week" / "days late" stay stable; use new Date() once there is a backend
const TODAY = '2026-11-15';
const STAGES = ['Received', 'Design agreed', 'Making', 'Finishing', 'Ready', 'Delivered'];
const STAGE_COLOR = ['#8d7f88', '#6d5aa8', '#7a2d58', '#b0567f', '#a9812f', '#3f7a5a'];
const TYPES = ['Ring', 'Necklace', 'Earrings', 'Bracelet'];
const SOURCES = ['Website', 'WhatsApp'];
const RATE = 400; // Rs. per hour of making time
const STEP_SHOTS = ['images/bench-tools.jpg', 'images/ring-making.jpg', 'images/bench-hands.jpg'];
const MONTHS = {
  'November 2026': { income: 185000, expenses: 92000, avg: 4.2, weeks: [38000, 52000, 31000, 64000], best: [['Pearl drop necklace', 6], ['Beaded earrings', 5], ['Wire wrap ring', 4]] },
  'October 2026': { income: 162000, expenses: 84000, avg: 4.5, weeks: [41000, 36000, 47000, 38000], best: [['Beaded earrings', 7], ['Pearl studs', 5], ['Layered chain', 3]] },
};

/* ---------- sample data ---------- */
function seed() {
  const D = (id, name, type, material, colour, style, price, materials, hours, matCost, brand, steps, craft, care, notes, photos) =>
    ({ id, name, type, material, colour, style, price, materials, hours, matCost, brand, steps, craft, care, notes, photos: photos.map(p => `images/${p}.jpg`), published: true });
  const designs = [
    D('pearl-drop', 'Pearl drop necklace', 'Necklace', 'Pearl', 'White', 'Classic', 6500, 'Freshwater pearls, crystal beads, silver-plated wire', 4.5, 2400, 1000,
      ['Cut and shape the wire', 'Thread the pearls', 'Attach the clasp', 'Check and clean'],
      'Each pearl is chosen and wired by hand to give a light, simple look.', 'Keep away from water and perfume. Store in the pouch.', 'Keep the loop small so the pearl sits flat.',
      ['pearl-drop', 'pearl-drop-2', 'pearl-drop-3']),
    D('wire-wrap', 'Wire wrap ring', 'Ring', 'Brass wire', 'Blue', 'Minimal', 3500, 'Brass wire, blue stone bead, brass band', 2, 900, 600,
      ['Measure the ring size', 'Seat the stone on the band', 'Wrap the wire around the stone', 'Tuck and file the wire ends'],
      'One length of brass wire is wrapped by hand around a single blue stone, so every ring comes out slightly different.', 'Take it off before washing hands. Polish with a soft cloth.', 'Wrap three full turns before tucking the end.',
      ['wire-wrap', 'wire-wrap-2', 'ring-making']),
    D('beaded', 'Beaded earrings', 'Earrings', 'Glass beads', 'Turquoise', 'Boho', 3500, 'Turquoise glass beads, brass hooks', 2.5, 800, 600,
      ['Pick two matching beads', 'Thread each bead onto a head pin', 'Loop and close the wire', 'Attach the hooks'],
      'Each turquoise bead is picked for its markings, then wired onto a brass hook by hand.', 'Store flat so the hooks do not bend. Keep dry.', 'Match the two beads for size before closing.',
      ['beaded', 'beaded-2', 'beaded-3']),
    D('layered', 'Layered chain', 'Necklace', 'Gold-plated chain', 'Gold', 'Modern', 5500, 'Gold-plated chain, bar and disc charms, brass clasp', 3, 2100, 800,
      ['Cut three chain lengths', 'Add the bar and disc charms', 'Join the layers at the clasp', 'Check the drop of each layer'],
      'Three chains are cut and joined by hand so the layers sit neatly without tangling.', 'Hang it to store. Keep away from perfume and sweat.', 'Leave 2 cm between layers.',
      ['layered', 'layered-2', 'layered-3']),
    D('studs', 'Pearl studs', 'Earrings', 'Pearl', 'White', 'Classic', 2800, 'Freshwater pearls, gold-plated posts', 1.5, 700, 500,
      ['Pair pearls by size', 'Glue to the posts', 'Leave to set', 'Check and clean'],
      'Pearls are paired by eye for size and shine before they are set.', 'Wipe with a soft cloth after wearing. Store in the pouch.', 'Let the glue set overnight.',
      ['studs', 'studs-2']),
    D('charm', 'Charm bracelet', 'Bracelet', 'Gold-plated chain', 'Gold', 'Playful', 4800, 'Gold-plated chain, anchor charm, brass clasp', 3.5, 1600, 800,
      ['Cut the chain to wrist size', 'Attach the charm with a jump ring', 'Attach the clasp and extender', 'Check and clean'],
      'The charm is chosen with the customer and attached by hand to a fine gold-plated chain.', 'Take it off before swimming or bathing.', 'Leave 3 cm of extender chain.',
      ['charm', 'charm-2', 'charm-3']),
  ];
  const O = (id, designId, customer, phone, source, stage, due, updated, assigned) =>
    ({ id, designId, item: designs.find(d => d.id === designId).name, customer, phone, source, stage, due, updated, assigned: !!assigned, done: false, notes: '', photos: [] });
  return {
    seq: 128, spent: 0, designs,
    orders: [
      O('ML-0118', 'studs', 'Customer H', '0777000118', 'Website', 'Delivered', '2026-11-10', '2026-11-09'),
      O('ML-0119', 'charm', 'Customer G', '0777000119', 'WhatsApp', 'Making', '2026-11-12', '2026-11-08'),
      O('ML-0123', 'pearl-drop', 'Customer A', '0771234567', 'Website', 'Making', '2026-11-24', '2026-11-15', 1),
      O('ML-0124', 'beaded', 'Customer B', '0777000124', 'WhatsApp', 'Ready', '2026-11-20', '2026-11-14', 1),
      O('ML-0125', 'wire-wrap', 'Customer C', '0777000125', 'Website', 'Design agreed', '2026-11-26', '2026-11-13', 1),
      O('ML-0126', 'layered', 'Customer D', '0777000126', 'WhatsApp', 'Received', '2026-11-30', '2026-11-14'),
      O('ML-0127', 'studs', 'Customer E', '0777000127', 'Website', 'Finishing', '2026-11-27', '2026-11-15'),
      O('ML-0128', 'charm', 'Customer F', '0777000128', 'WhatsApp', 'Making', '2026-12-02', '2026-11-12'),
    ],
    materials: [
      { name: 'Freshwater pearls', stock: 40, min: 100, unit: '' },
      { name: 'Silver wire 0.5 mm', stock: 1, min: 3, unit: 'roll' },
      { name: 'Brass clasps', stock: 12, min: 30, unit: '' },
      { name: 'Glass beads', stock: 260, min: 150, unit: '' },
      { name: 'Gold-plated chain', stock: 8, min: 5, unit: 'm' },
      { name: 'Jump rings', stock: 500, min: 200, unit: '' },
    ],
    suppliers: [
      { name: 'Vendor A', place: 'Pettah', last: '2026-11-12', prices: [{ material: 'Freshwater pearls', price: 1200, unit: 'string' }, { material: 'Silver wire 0.5 mm', price: 850, unit: 'roll' }, { material: 'Brass clasps', price: 15, unit: 'piece' }] },
      { name: 'Vendor B', place: 'Pettah', last: '2026-10-30', prices: [{ material: 'Glass beads', price: 450, unit: 'pack' }, { material: 'Jump rings', price: 300, unit: 'pack' }] },
      { name: 'Vendor C', place: 'Online', last: '2026-10-05', prices: [{ material: 'Gold-plated chain', price: 950, unit: 'm' }, { material: 'Brass clasps', price: 14, unit: 'piece' }] },
      { name: 'Vendor D', place: 'Pettah', last: '2026-09-18', prices: [{ material: 'Freshwater pearls', price: 1250, unit: 'string' }] },
    ],
    scarce: { name: 'Keshi pearls', subs: ['Freshwater pearls, similar size', 'Glass pearls, ivory finish', 'Shell beads'], used: null },
  };
}

/* ---------- storage ---------- */
const KEY = 'mlj-demo-v3';
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch { /* storage blocked: fall back to samples */ }
if (!S || !S.designs) S = seed();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch { toast('This browser could not save the change, so it will be lost when you leave this page.'); }
}
// small per-tab memory for hand-offs between pages (tracking details)
const mem = (k, v) => { try { if (v === undefined) return JSON.parse(sessionStorage.getItem(k)); sessionStorage.setItem(k, JSON.stringify(v)); } catch { return null; } };
const Q = new URLSearchParams(location.search);

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rs = n => 'Rs. ' + Number(n).toLocaleString('en-US');
const fd = (d, y) => new Date(d + 'T00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(y && { year: 'numeric' }) });
const plus = (d, n) => new Date(Date.parse(d) + n * 864e5).toISOString().slice(0, 10);
const dig = s => String(s).replace(/\D/g, '');
const qty = (n, u) => u ? `${n} ${u === 'roll' && n != 1 ? 'rolls' : u}` : `${n}`;
const byId = id => S.designs.find(d => d.id === id);
const order = id => S.orders.find(o => o.id === id);
const designOf = o => byId(o.designId);
const nextOrderId = () => 'ML-0' + (++S.seq);
const isLow = m => m.stock <= m.min;
const isOpen = o => o.stage !== 'Delivered';
const isOver = o => isOpen(o) && o.due < TODAY;
const dueSoon = o => isOpen(o) && o.due >= TODAY && o.due <= plus(TODAY, 7);
// ponytail: tracking history is generated from the current stage (canned notes, 3 days apart); store real events per order once there is a backend
const STAGE_NOTE = ['Request received. The owner will reply to confirm the details.', 'Design and price agreed with you.', 'Your piece is being made by hand.', 'Polishing, final checks and packing.', 'Ready for pickup or delivery. The owner will message you.', 'Delivered. Enjoy your piece.'];
const updates = o => { const cur = STAGES.indexOf(o.stage); return STAGES.slice(0, cur + 1).map((stage, i) => ({ stage, date: plus(o.updated, (i - cur) * 3), note: STAGE_NOTE[i] })).reverse(); };
const price = d => d.price ? 'From ' + rs(d.price) : 'Price on request';
// ponytail: canned markup heuristic standing in for "prices of similar past pieces"; replace with real sales history
const cost = d => { const time = d.hours * RATE, total = d.matCost + time + d.brand, r = n => Math.round(n / 500) * 500; return { time, total, lo: r(total * 1.25), hi: r(total * 1.45) }; };
console.assert((c => c.total === 5200 && c.lo === 6500 && c.hi === 7500)(cost({ hours: 4.5, matCost: 2400, brand: 1000 })), 'costing self-check failed');
// uploaded photos are shrunk to a small JPEG data URL so they fit in localStorage
const shrink = async file => {
  const b = await createImageBitmap(file), s = Math.min(1, 800 / Math.max(b.width, b.height));
  const c = Object.assign(document.createElement('canvas'), { width: Math.round(b.width * s), height: Math.round(b.height * s) });
  c.getContext('2d').drawImage(b, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg', .75);
};

const pic = (src, alt, cls = '') => src
  ? `<img class="ph ${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
  : `<div class="ph none ${cls}">No photo yet</div>`;
const opts = (arr, sel, first) => (first ? `<option value="">${first}</option>` : '') + arr.map(o => { const [v, l] = [].concat(o); return `<option value="${esc(v)}"${String(v) === String(sel) ? ' selected' : ''}>${esc(l ?? v)}</option>`; }).join('');
const table = (heads, rows, empty = 'Nothing to show.') => `<div class="panel"><div class="scroll"><table class="t"><thead><tr>${heads.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.join('') || `<tr><td colspan="${heads.length}" class="mute">${empty}</td></tr>`}</tbody></table></div></div>`;
const row = (cells, attrs = '') => `<tr ${attrs}>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
const pick = (act, id, on) => `id="${act}-${esc(id)}" data-act="${act}" data-id="${esc(id)}" tabindex="0"${on ? ' class="on" aria-current="true"' : ''}`;
const fld = (label, html) => `<label class="f"><span>${label}</span>${html}</label>`;
const stageTag = s => `<span class="tag"><i style="background:${STAGE_COLOR[STAGES.indexOf(s)]}"></i>${s}</span>`;

document.body.insertAdjacentHTML('beforeend', '<dialog id="dlg"></dialog><div id="toast" role="status" aria-live="polite"></div>');
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3800); }
function dlg(title, body, onOk) {
  const d = $('#dlg');
  d.innerHTML = `<form><h2>${title}</h2>${body}<div class="row" style="margin-top:6px"><button class="btn">Save</button><button class="btn ghost" type="button" data-act="closeDlg">Cancel</button></div></form>`;
  d.firstChild.onsubmit = async e => { e.preventDefault(); await onOk(Object.fromEntries(new FormData(e.target)), e.target); d.close(); save(); render(); };
  d.showModal();
}

/* ---------- page shells ---------- */
const shop = (cur, body) => `<a class="skip" href="#main">Skip to content</a>
<header class="top"><a class="brand" href="index.html">ML Jewellery</a><nav aria-label="Main">${
  [['index', 'Shop'], ['request', 'Custom request'], ['track', 'Track order'], ['about', 'About']].map(([h, l]) => `<a href="${h}.html"${h === cur ? ' aria-current="page"' : ''}>${l}</a>`).join('')
}</nav></header><main id="main" class="wrap">${body}</main>
<footer class="foot"><span>ML Jewellery. Handmade to order.</span><a href="staff.html">Staff sign in</a></footer>`;
const OWNER_NAV = [['dashboard', 'Dashboard'], ['orders', 'Orders'], ['inventory', 'Inventory'], ['suppliers', 'Suppliers'], ['costing', 'Costing'], ['designs', 'Design library'], ['pages', 'Product pages'], ['reports', 'Reports']];
const owner = (cur, body) => `<a class="skip" href="#main">Skip to content</a><div class="app"><aside class="side">
<a class="brand" href="owner-dashboard.html">ML Jewellery<span class="role">Owner</span></a>
<nav aria-label="Owner">${OWNER_NAV.map(([h, l]) => `<a href="owner-${h}.html"${h === cur ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
<div class="sidefoot"><a href="index.html">View shop</a><a href="staff.html">Switch role</a><button data-act="reset">Reset demo data</button></div>
</aside><main id="main">${body}</main></div>`;

/* ---------- page runtime ---------- */
let P;
function render() {
  const id = document.activeElement?.id;
  $('#app').innerHTML = P.view();
  if (id) document.getElementById(id)?.focus();
}
function page(p) {
  P = p;
  const acts = {
    closeDlg: () => $('#dlg').close(),
    print: () => print(),
    reset: () => { if (confirm('Put all sample data back? Orders, stock and pages you changed will be lost.')) { try { localStorage.removeItem(KEY); sessionStorage.clear(); } catch { } location.reload(); return new Promise(() => { }); } },
    ...p.acts,
  };
  document.addEventListener('click', async e => { const el = e.target.closest('[data-act]'); if (!el) return; await acts[el.dataset.act](el.dataset, el); save(); render(); });
  document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('tr[data-act]')) e.target.click(); });
  document.addEventListener('change', e => { const el = e.target, fn = p.changes?.[el.dataset.ch]; if (fn && fn(el.value, el.dataset, el) !== false) { save(); render(); } });
  document.addEventListener('input', e => p.inputs?.[e.target.dataset.in]?.(e.target.value, e.target));
  document.addEventListener('submit', async e => { e.preventDefault(); const f = e.target, fn = p.forms?.[f.dataset.form]; if (fn) { await fn(Object.fromEntries(new FormData(f)), f, e.submitter); save(); render(); } });
  render();
}
