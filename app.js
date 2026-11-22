const PRODUCTS = [
 {id:"cherry-pop",name:"Cherry Pop",type:"gloss",price:3000,desc:"A bold red lip gloss",image:"https://drive.google.com/thumbnail?id=1ErqSBrclazr4dqiYbOJKEtTspC2A7lt7&sz=w1000"},
 {id:"candy-cloud",name:"Candy Cloud",type:"gloss",price:3000,desc:"A soft pink lip gloss",image:"https://drive.google.com/thumbnail?id=1UXIzZa5Y6hMhDGvf09AMS7e02sk5HCCE&sz=w1000"},
 {id:"mystic-glow",name:"Mystic Glow",type:"gloss",price:3000,desc:"Colour-changing lip gloss",image:"https://drive.google.com/thumbnail?id=1JBi8jnnfVecCypWUAI2OfAf4nOepvcYT&sz=w1000"},
 {id:"peach-perfect",name:"Peach Perfect",type:"gloss",price:3000,desc:"A peachy nude lip gloss",image:"https://drive.google.com/thumbnail?id=1ZrUW2i8BZ9cCG0pbwfo9NJOZ29cb8cf5&sz=w1000"},
 {id:"bare-essence",name:"Bare Essence",type:"gloss",price:3000,desc:"A beautiful nude lip gloss",image:"/images/bare-essence.jpg"},
 {id:"starlight",name:"Starlight",type:"gloss",price:3000,desc:"A glittery lip gloss",image:"https://drive.google.com/thumbnail?id=1f_bFx8Ia3Ugc13OKS4lYwXNxqgvsIJ3u&sz=w1000"},
 {id:"choco-royale",name:"Choco Royale",type:"gloss",price:3000,desc:"A rich brown lip gloss",image:"https://drive.google.com/thumbnail?id=1-uSs_jhNr7AkKuBiqtkRoWlPwXeRBw5g&sz=w1000"},
 {id:"clear-lipgloss",name:"Clear Lipgloss",type:"gloss",price:3000,desc:"A clear glossy finish",image:"https://drive.google.com/thumbnail?id=1LEAVRbTRGy2ZzyVGzB1UV1u1BAykK9pN&sz=w1000"},
 {id:"lipcare-kit",name:"Lipcare Kit",type:"care",price:3000,desc:"A little care bundle",image:"https://drive.google.com/thumbnail?id=1BeLzFGNgsSPn0rqMqln2mo-ernIzN96d&sz=w1000"},
 {id:"pink-lip-balm",name:"Pink Lip Balm",type:"care",price:3000,desc:"A touch of pink care",image:"https://drive.google.com/thumbnail?id=1b8a5isC9p2cZzb1b-kqvYZ5UZshoq8Or&sz=w1000"},
 {id:"moisturizing-lip-balm",name:"Moisturizing Lip Balm",type:"care",price:2000,desc:"Everyday lip care",image:"https://drive.google.com/thumbnail?id=1MncZOaldo6wVPgB35RSHegO9WkrOwSpN&sz=w1000"},
 {id:"lip-scrub",name:"Lip Scrub",type:"care",price:1500,desc:"A lip-care essential",image:"https://drive.google.com/thumbnail?id=1-FJzzBqAiNgpQUyKTNeW62h6esowxXIL&sz=w1000"},
 {id:"lip-brush",name:"Lip Brush",type:"tools",price:500,desc:"A handy lip tool",image:"https://drive.google.com/thumbnail?id=1PKuWCqYOT9RVLw4Ti6yBr2348wJjPV7L&sz=w1000"},
 {id:"black-lip-liner",name:"Black Lip Liner",type:"liner",price:1200,desc:"Define your look",image:"https://drive.google.com/thumbnail?id=1BhtYq6kqAjct1jQoFqA093el5ZUi70BN&sz=w1000"},
 {id:"brown-lip-liner",name:"Brown Lip Liner",type:"liner",price:1200,desc:"Define your look",image:"https://drive.google.com/thumbnail?id=1J4nlfgTb832ron0wyqq7hWZnGRrQiH9-&sz=w1000"},
 {id:"burgundy-lip-liner",name:"Burgundy Lip Liner",type:"liner",price:1200,desc:"Define your look",image:"https://drive.google.com/thumbnail?id=16ahT3Y-jiOaxzUUHA8BfJe5ZhjpagOUK&sz=w1000"}
];

const DISCOUNT = .10;
const money = n => new Intl.NumberFormat('en-NG',{style:'currency',currency:'NGN',maximumFractionDigits:0}).format(n);
const $ = id => document.getElementById(id);
const reduced = p => Math.round(p * (1 - DISCOUNT));

let filter = 'all', cart = [];
try { cart = JSON.parse(localStorage.getItem('glossyPoutCart') || '[]'); } catch {}
cart = Array.isArray(cart) ? cart.filter(x => PRODUCTS.some(p => p.id === x.id) && Number.isInteger(x.qty) && x.qty > 0) : [];

function imageMarkup(p, cls = '') {
  return `<img class="${cls}" src="${p.image}" alt="${p.name}" loading="lazy" data-image-name="${p.name}">`;
}

function attachImageFallback(scope = document) {
  scope.querySelectorAll('img[data-image-name]').forEach(img => {
    img.addEventListener('error', () => {
      const box = document.createElement('div');
      box.className = 'image-fallback';
      box.innerHTML = `<span>${img.dataset.imageName}<small>GLOSSY POUT · PRODUCT IMAGE</small></span>`;
      img.replaceWith(box);
    }, { once: true });
  });
}

function renderProducts() {
  const q = $('searchInput').value.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (filter === 'all' || p.type === filter) && (`${p.name} ${p.desc}`.toLowerCase().includes(q)));
  $('productGrid').innerHTML = list.length ? list.map(p => `
    <article class="product-card reveal" tabindex="0" data-view="${p.id}" aria-label="View ${p.name}">
      <div class="product-media">${imageMarkup(p)}<span class="product-index">GP / ${String(PRODUCTS.indexOf(p) + 1).padStart(2,'0')}</span><span class="discount-tag">10% OFF</span></div>
      <div class="product-meta"><div><h3 class="product-name">${p.name}</h3><p class="product-type">${p.type === 'care' ? 'LIP CARE' : p.type === 'liner' ? 'LIP LINER' : p.type === 'tools' ? 'BEAUTY TOOL' : 'LIP GLOSS'}</p></div>
      <div class="product-price">${money(reduced(p.price))}<del>${money(p.price)}</del></div></div>
      <button class="product-open" type="button" data-view="${p.id}">DISCOVER PRODUCT <span>↗</span></button>
    </article>`).join('') : '<p class="no-results">No products match your search. Try another name.</p>';
  attachImageFallback($('productGrid'));
  observeReveals();
}

function persist() {
  localStorage.setItem('glossyPoutCart', JSON.stringify(cart));
  renderCart();
}

function totals() {
  let subtotal = 0, discount = 0;
  cart.forEach(x => {
    const p = PRODUCTS.find(p => p.id === x.id);
    if (p) {
      subtotal += p.price * x.qty;
      discount += (p.price - reduced(p.price)) * x.qty;
    }
  });
  return { subtotal, discount, total: subtotal - discount };
}

function renderCart() {
  const count = cart.reduce((s,x) => s + x.qty, 0);
  $('cartCount').textContent = count;
  $('bagItemCount').textContent = `(${count})`;
  $('cartLines').innerHTML = cart.length ? cart.map(x => {
    const p = PRODUCTS.find(p => p.id === x.id);
    return `<div class="cart-line"><div class="cart-thumb">${imageMarkup(p)}</div><div><b>${p.name}</b><small>${money(reduced(p.price))} each <del>${money(p.price)}</del></small><div class="qty-controls"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Decrease ${p.name}">−</button><span>${x.qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="Increase ${p.name}">+</button></div><button class="remove-line" type="button" data-remove="${p.id}">REMOVE</button></div><strong>${money(reduced(p.price) * x.qty)}</strong></div>`;
  }).join('') : '<p class="empty-cart">Your bag is waiting for a little shine.</p>';
  const t = totals();
  $('cartSubtotal').textContent = money(t.subtotal);
  $('cartDiscount').textContent = '−' + money(t.discount);
  $('cartTotal').textContent = money(t.total);
  $('checkoutButton').disabled = !cart.length;
  const summary = cart.map(x => {
    const p = PRODUCTS.find(p => p.id === x.id);
    return `${p.name} × ${x.qty} — ${money(reduced(p.price) * x.qty)}`;
  }).join('%0A');
  $('whatsappOrder').href = `https://wa.me/2348110878047?text=${encodeURIComponent('Hello Glossy Pout! I would like to order:%0A' + decodeURIComponent(summary) + '%0AEstimated total: ' + money(t.total))}`;
  attachImageFallback($('cartLines'));
}

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  const item = cart.find(x => x.id === id);
  if (item) item.qty = Math.min(20, item.qty + qty);
  else cart.push({ id, qty: Math.min(20, qty) });
  persist();
}

function openCart() {
  $('cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
  $('closeCart').focus();
}

function closeCart() {
  $('cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
}

let detailQty = 1;

function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  detailQty = 1;
  $('productDetails').innerHTML = `<div class="product-detail"><div class="product-detail-media">${imageMarkup(p,'detail-image')}</div><div class="product-detail-copy"><p class="eyebrow">GLOSSY POUT · ${p.type.toUpperCase()}</p><span class="quick-view-discount">10% OFF</span><h2>${p.name}</h2><p>${p.desc}. A little everyday essential, selected to bring a touch of Glossy Pout to your routine.</p><div class="detail-price">${money(reduced(p.price))}<del>${money(p.price)}</del></div><div class="quantity-picker"><button type="button" id="detailMinus" aria-label="Decrease quantity">−</button><output id="detailQty">1</output><button type="button" id="detailPlus" aria-label="Increase quantity">+</button></div><button class="button button-dark" id="detailAdd" type="button">ADD TO BAG <span>↗</span></button></div></div>`;
  attachImageFallback($('productDetails'));
  const img = $('productDetails').querySelector('img');
  if (img) img.addEventListener('click', () => img.classList.toggle('zoomed'));
  $('detailMinus').onclick = () => { detailQty = Math.max(1, detailQty - 1); $('detailQty').textContent = detailQty; };
  $('detailPlus').onclick = () => { detailQty = Math.min(20, detailQty + 1); $('detailQty').textContent = detailQty; };
  $('detailAdd').onclick = () => { addToCart(id, detailQty); $('productDialog').close(); openCart(); };
  $('productDialog').showModal();
}

$('productGrid').addEventListener('click', e => {
  const v = e.target.closest('[data-view]');
  if (v) openProduct(v.dataset.view);
});
$('productGrid').addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.product-card')) {
    e.preventDefault();
    openProduct(e.target.dataset.view);
  }
});
$('filters').addEventListener('click', e => {
  const b = e.target.closest('[data-filter]');
  if (!b) return;
  filter = b.dataset.filter;
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x === b));
  renderProducts();
});
$('searchInput').addEventListener('input', renderProducts);

$('cartTrigger').onclick = openCart;
$('closeCart').onclick = closeCart;
$('drawerBackdrop').onclick = closeCart;
$('cartLines').addEventListener('click', e => {
  const rm = e.target.closest('[data-remove]');
  if (rm) cart = cart.filter(x => x.id !== rm.dataset.remove);
  const q = e.target.closest('[data-qty]');
  if (q) {
    const item = cart.find(x => x.id === q.dataset.qty);
    if (item) {
      item.qty += Number(q.dataset.delta);
      if (item.qty < 1) cart = cart.filter(x => x !== item);
      if (item.qty > 20) item.qty = 20;
    }
  }
  persist();
});
$('closeProduct').onclick = () => $('productDialog').close();
$('checkoutButton').onclick = () => { closeCart(); $('checkoutDialog').showModal(); };
$('closeCheckout').onclick = () => $('checkoutDialog').close();

$('checkoutForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('payButton'), msg = $('checkoutMessage');
  btn.disabled = true;
  btn.textContent = 'Preparing secure checkout…';
  msg.textContent = '';
  try {
    const customer = Object.fromEntries(new FormData(e.currentTarget).entries());
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer, items: cart })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not start payment.');
    if (!data.authorization_url) throw new Error('Payment link was not returned.');
    window.location.href = data.authorization_url;
  } catch (err) {
    msg.textContent = err.message || 'Something went wrong. Please try again.';
    btn.disabled = false;
    btn.textContent = 'Pay securely with Paystack ↗';
  }
});

/* Notifications: existing /api/notifications endpoint and owner token contract */
let notifications = [], seen = new Set();
try { seen = new Set(JSON.parse(localStorage.getItem('glossyPoutSeenNotifications') || '[]').map(String)); } catch {}

function renderNotifications() {
  const list = $('notificationList');
  if (!notifications.length) {
    list.innerHTML = '<p class="notification-empty">No new notes just yet. Check back soon.</p>';
    return;
  }
  list.innerHTML = notifications.map(n => `<article class="notification-card"><h3>${escapeHTML(n.title)}</h3><p>${escapeHTML(n.message)}</p><small class="notification-date">${new Date(n.created_at).toLocaleDateString('en-NG',{dateStyle:'medium'})}</small></article>`).join('');
  const unread = notifications.filter(n => !seen.has(String(n.id))).length;
  $('notificationCount').hidden = !unread;
  $('notificationCount').textContent = unread > 9 ? '9+' : String(unread);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function loadNotifications() {
  try {
    const r = await fetch('/api/notifications', { cache: 'no-store' });
    if (!r.ok) throw new Error();
    const d = await r.json();
    notifications = Array.isArray(d.notifications) ? d.notifications : [];
    if (!localStorage.getItem('glossyPoutSeenNotifications')) seen = new Set(notifications.map(n => String(n.id)));
    renderNotifications();
  } catch {
    $('notificationList').innerHTML = '<p class="notification-empty">Updates are taking a little break. Please check again soon.</p>';
  }
}

$('notificationTrigger').onclick = () => {
  $('notificationDialog').showModal();
  notifications.forEach(n => seen.add(String(n.id)));
  localStorage.setItem('glossyPoutSeenNotifications', JSON.stringify([...seen]));
  renderNotifications();
};
$('closeNotifications').onclick = () => $('notificationDialog').close();
$('publishNotification').onclick = async () => {
  const status = $('ownerStatus');
  status.textContent = 'Publishing…';
  try {
    const token = $('ownerToken').value.trim();
    const r = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ title: $('notificationTitle').value, message: $('notificationMessageInput').value })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'Could not publish.');
    $('notificationTitle').value = '';
    $('notificationMessageInput').value = '';
    status.textContent = 'Update published.';
    await loadNotifications();
  } catch (err) {
    status.textContent = err.message;
  }
};

$('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('newsletterEmail').value.trim();
  const subject = encodeURIComponent('Glossy Pout newsletter sign-up');
  const body = encodeURIComponent(`Please add this email to the Glossy Pout updates list: ${email}`);
  $('newsletterMessage').textContent = 'Opening your email app so you can send your sign-up request.';
  window.location.href = `mailto:okohchristabel06@gmail.com?subject=${subject}&body=${body}`;
  e.currentTarget.reset();
});

$('menuToggle').onclick = () => {
  const open = $('mainNav').classList.toggle('open');
  $('menuToggle').setAttribute('aria-expanded', String(open));
  $('menuToggle').textContent = open ? '×' : '☰';
};
document.querySelectorAll('#mainNav a[href^="#"]').forEach(a => a.addEventListener('click', () => {
  $('mainNav').classList.remove('open');
  $('menuToggle').setAttribute('aria-expanded', 'false');
  $('menuToggle').textContent = '☰';
}));
$('year').textContent = new Date().getFullYear();
renderProducts();
renderCart();
loadNotifications();
setInterval(loadNotifications, 90000);

/* Intro animation once per tab visit */
function startIntro() {
  const intro = $('intro'), skip = $('skipIntro'), progress = $('introProgress'), percent = $('introPercent');
  const done = () => {
    intro.classList.add('done');
    document.body.classList.remove('is-loading');
    sessionStorage.setItem('gpIntroSeen', '1');
    setTimeout(() => intro.remove(), 850);
    animateHero();
  };
  if (sessionStorage.getItem('gpIntroSeen')) {
    intro.remove();
    document.body.classList.remove('is-loading');
    animateHero();
    return;
  }
  let value = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) { done(); return; }
  const timer = setInterval(() => {
    value = Math.min(100, value + Math.ceil(Math.random() * 13));
    progress.style.width = value + '%';
    percent.textContent = String(value).padStart(2,'0') + '%';
    if (value >= 100) {
      clearInterval(timer);
      setTimeout(done, 280);
    }
  }, 95);
  skip.onclick = () => { clearInterval(timer); done(); };
}

function observeReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('is-visible');
      io.unobserve(en.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => io.observe(el));
}

function animateHero() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.gsap) {
    gsap.from('.hero-eyebrow', { y:18, autoAlpha:0, duration:.7, delay:.1 });
    gsap.from('.hero h1', { y:50, autoAlpha:0, duration:1, ease:'power3.out', delay:.2 });
    gsap.from('.hero-intro,.hero-actions,.hero-foot', { y:20, autoAlpha:0, duration:.7, stagger:.12, delay:.55 });
    gsap.from('.hero-stage', { scale:.92, autoAlpha:0, duration:1.2, ease:'power2.out', delay:.25 });
  } else {
    document.querySelectorAll('.hero-copy>*').forEach(x => x.style.opacity = 1);
  }
}

function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && window.Lenis) {
    const lenis = new Lenis({ duration:1.05, smoothWheel:true, gestureOrientation:'vertical' });
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.classList.contains('is-visible')) return;
      gsap.fromTo(el, { y:28, autoAlpha:0 }, {
        y:0, autoAlpha:1, duration:.85, ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 88%', once:true },
        onStart:() => el.classList.add('is-visible')
      });
    });
  } else {
    observeReveals();
  }
  initCursor();
  initThreeHero();
}

function initCursor() {
  if (!window.matchMedia('(pointer:fine)').matches) return;
  const dot = $('cursorDot'), ring = $('cursorRing');
  if (!dot || !ring) return;
  let x = 0, y = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.opacity = '1'; ring.style.opacity = '1';
    dot.style.transform = `translate(${x-3}px,${y-3}px)`;
  });
  function tick() {
    rx += (x-rx)*.18; ry += (y-ry)*.18;
    ring.style.transform = `translate(${rx-17}px,${ry-17}px)`;
    requestAnimationFrame(tick);
  }
  tick();
  document.querySelectorAll('a,button,.product-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

/* Three.js hero: glossy bottles, gold caps, shade switching, drag and safe fallback */
function initThreeHero() {
  const host = $('heroCanvas');
  if (!host || host.dataset.heroInitialized === 'true') return;
  host.dataset.heroInitialized = 'true';

  const shadeNames = {
    bare: 'BARE ESSENCE',
    cherry: 'CHERRY POP',
    peach: 'PEACH PERFECT',
    cocoa: 'CHOCO ROYALE'
  };
  const shadeColors = {
    bare: 0xc88f88,
    cherry: 0x8b263d,
    peach: 0xd89c75,
    cocoa: 0x684033
  };

  let selectedShade = 'bare';
  let fallbackCanvas = null;
  let fallbackObserver = null;
  let activeGlass = null;
  let activeBottle = null;

  function updateShadeButtons(btn) {
    document.querySelectorAll('[data-shade]').forEach(x => x.classList.toggle('active', x === btn));
    if ($('shadeName')) $('shadeName').textContent = shadeNames[btn.dataset.shade];
  }

  function drawFallback() {
    host.replaceChildren();
    fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.setAttribute('aria-label', 'Illustration of three glossy lip gloss bottles with gold caps');
    fallbackCanvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
    host.appendChild(fallbackCanvas);
    const ctx = fallbackCanvas.getContext('2d');
    if (!ctx) return;

    function paint() {
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, rect.width), h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      fallbackCanvas.width = Math.round(w * dpr);
      fallbackCanvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const shades = [
        { color:'#8b263d', x:.25, scale:.82 },
        { color:'#' + shadeColors[selectedShade].toString(16).padStart(6,'0'), x:.5, scale:1 },
        { color:'#d89c75', x:.75, scale:.82 }
      ];

      shades.forEach(bottle => {
        const bw = Math.min(w * .19, 112) * bottle.scale;
        const bh = Math.min(h * .58, 270) * bottle.scale;
        const x = w * bottle.x - bw / 2;
        const y = h * .26 + (1 - bottle.scale) * 28;
        const capH = bh * .27;
        const bodyY = y + capH * .78;
        const bodyH = bh - capH * .78;

        const gold = ctx.createLinearGradient(x, 0, x + bw, 0);
        gold.addColorStop(0, '#8c6938');
        gold.addColorStop(.35, '#f2dca7');
        gold.addColorStop(.65, '#b68b4d');
        gold.addColorStop(1, '#f8e7bd');

        const gloss = ctx.createLinearGradient(x, 0, x + bw, 0);
        gloss.addColorStop(0, 'rgba(255,255,255,.35)');
        gloss.addColorStop(.25, bottle.color);
        gloss.addColorStop(.72, bottle.color);
        gloss.addColorStop(1, 'rgba(255,255,255,.48)');

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.2)';
        ctx.shadowBlur = 18;
        ctx.fillStyle = gold;
        ctx.fillRect(x + bw*.18, y, bw*.64, capH);
        ctx.fillStyle = gloss;
        ctx.beginPath();
        ctx.roundRect(x, bodyY, bw, bodyH, [12,12,18,18]);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255,255,255,.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + bw*.2, bodyY + 12);
        ctx.lineTo(x + bw*.2, bodyY + bodyH - 18);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,244,226,.85)';
        ctx.font = `600 ${Math.max(8, bw*.105)}px Manrope, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('GLOSSY', x + bw/2, bodyY + bodyH*.53);
        ctx.fillText('POUT', x + bw/2, bodyY + bodyH*.63);
        ctx.restore();
      });
    }

    paint();
    if ('ResizeObserver' in window) {
      fallbackObserver = new ResizeObserver(paint);
      fallbackObserver.observe(host);
    } else {
      window.addEventListener('resize', paint);
    }
  }

  if (!window.THREE) {
    console.warn('Three.js did not load; showing the hero fallback.');
    drawFallback();
  } else {
    try {
      const THREE = window.THREE;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, width / height, .1, 100);
      camera.position.set(0, 1.1, 8.8);

      const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
      host.replaceChildren(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 1.55));
      const key = new THREE.DirectionalLight(0xffe7c1, 3.1);
      key.position.set(4, 6, 7);
      scene.add(key);
      const fill = new THREE.PointLight(0xffd8c0, 24, 18);
      fill.position.set(-4, 2, 3);
      scene.add(fill);
      const rim = new THREE.PointLight(0x5bb7a1, 28, 18);
      rim.position.set(4, 1, -3);
      scene.add(rim);

      const gold = new THREE.MeshStandardMaterial({ color:0xc6a15e, metalness:.88, roughness:.2 });
      const goldTop = new THREE.MeshStandardMaterial({ color:0xe8d2a2, metalness:.9, roughness:.16 });
      const bandMaterial = new THREE.MeshStandardMaterial({ color:0x8e6a39, metalness:.9, roughness:.2 });
      const labelMaterial = new THREE.MeshStandardMaterial({ color:0xf1dfc2, metalness:.08, roughness:.42 });
      const carousel = new THREE.Group();
      scene.add(carousel);
      const bottles = [];

      function makeBottle(color, index) {
        const group = new THREE.Group();
        const glass = new THREE.MeshPhysicalMaterial({
          color,
          metalness:.1,
          roughness:.14,
          transmission:.12,
          thickness:.5,
          clearcoat:1,
          clearcoatRoughness:.06
        });

        const body = new THREE.Mesh(new THREE.CylinderGeometry(.48, .52, 2.55, 48), glass);
        body.position.y = -.15;
        group.add(body);

        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(.49, .49, .12, 48),
          new THREE.MeshStandardMaterial({ color:0x6c3848, metalness:.32, roughness:.26 })
        );
        base.position.y = -1.48;
        group.add(base);

        const neck = new THREE.Mesh(new THREE.CylinderGeometry(.25, .25, .28, 32), gold);
        neck.position.y = 1.25;
        group.add(neck);

        const cap = new THREE.Mesh(new THREE.CylinderGeometry(.34, .35, .85, 40), gold);
        cap.position.y = 1.78;
        group.add(cap);

        const capTop = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .08, 40), goldTop);
        capTop.position.y = 2.245;
        group.add(capTop);

        const band = new THREE.Mesh(new THREE.CylinderGeometry(.355, .355, .08, 40), bandMaterial);
        band.position.y = 1.38;
        group.add(band);

        const label = new THREE.Mesh(new THREE.PlaneGeometry(.78, .58), labelMaterial);
        label.position.set(0, -.18, .505);
        group.add(label);

        group.position.x = (index - 1) * 1.75;
        group.position.y = index === 1 ? -.05 : -.3;
        group.rotation.z = (index - 1) * -.08;
        group.scale.setScalar(index === 1 ? 1.04 : .84);
        carousel.add(group);
        bottles.push({ group, glass, index });
      }

      makeBottle(shadeColors.cherry, 0);
      makeBottle(shadeColors.bare, 1);
      makeBottle(shadeColors.peach, 2);

      const floor = new THREE.Mesh(
        new THREE.CircleGeometry(2.3, 64),
        new THREE.MeshBasicMaterial({ color:0x1b4942, transparent:true, opacity:.2 })
      );
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.55;
      scene.add(floor);

      let dragging = false;
      let lastX = 0;
      let rotation = 0;
      let frame = 0;
      let resizeObserver;

      renderer.domElement.addEventListener('pointerdown', e => {
        dragging = true;
        lastX = e.clientX;
        renderer.domElement.style.cursor = 'grabbing';
        try { renderer.domElement.setPointerCapture(e.pointerId); } catch {}
      });
      renderer.domElement.addEventListener('pointermove', e => {
        if (!dragging) return;
        rotation += (e.clientX - lastX) * .009;
        lastX = e.clientX;
      });

      const stopDrag = () => {
        dragging = false;
        renderer.domElement.style.cursor = 'grab';
      };
      renderer.domElement.addEventListener('pointerup', stopDrag);
      renderer.domElement.addEventListener('pointercancel', stopDrag);
      renderer.domElement.addEventListener('lostpointercapture', stopDrag);

      document.querySelectorAll('[data-shade]').forEach(btn => {
        btn.addEventListener('click', () => {
          const shade = btn.dataset.shade;
          if (!shadeColors[shade]) return;
          selectedShade = shade;
          updateShadeButtons(btn);
          bottles[1].glass.color.setHex(shadeColors[shade]);
          bottles[1].glass.needsUpdate = true;
          if (window.gsap) {
            gsap.fromTo(bottles[1].group.scale,
              { x:1.12, y:1.12, z:1.12 },
              { x:1.04, y:1.04, z:1.04, duration:.45, ease:'back.out(2)' }
            );
          }
        });
      });

      function resize() {
        const w = Math.max(1, host.clientWidth);
        const h = Math.max(1, host.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }

      if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
      } else {
        window.addEventListener('resize', resize);
      }

      function render(time) {
        frame = requestAnimationFrame(render);
        if (!dragging) rotation += .0015;
        carousel.rotation.y = rotation;
        carousel.position.y = Math.sin(time * .0007) * .07;
        bottles.forEach((b, i) => {
          b.group.rotation.y = Math.sin(time * .00045 + i) * .08;
        });
        renderer.render(scene, camera);
      }
      render(0);

      window.addEventListener('pagehide', () => {
        cancelAnimationFrame(frame);
        if (resizeObserver) resizeObserver.disconnect();
        else window.removeEventListener('resize', resize);
        if (fallbackObserver) fallbackObserver.disconnect();
        renderer.dispose();
        scene.traverse(obj => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
            else obj.material.dispose();
          }
        });
      }, { once:true });

    } catch (err) {
      console.warn('3D hero could not start; showing the fallback.', err);
      drawFallback();
    }
  }

  if (!window.THREE) {
    document.querySelectorAll('[data-shade]').forEach(btn => {
      btn.addEventListener('click', () => {
        const shade = btn.dataset.shade;
        if (!shadeNames[shade]) return;
        selectedShade = shade;
        updateShadeButtons(btn);
        drawFallback();
      });
    });
  }
}

/* Smooth page transitions for internal page links */
document.querySelectorAll('a[href$=".html"]').forEach(a => a.addEventListener('click', e => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  const overlay = $('pageTransition');
  if (window.gsap) {
    gsap.to(overlay, { scaleY:1, transformOrigin:'bottom', duration:.45, ease:'power2.inOut', onComplete:() => location.href = url.href });
  } else {
    location.href = url.href;
  }
}));

startIntro();
initMotion();
