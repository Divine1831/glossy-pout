
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

/* Notifications */
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

/* Intro animation */
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

/* ==========================================================
   REAL PRODUCT 3D HERO
   Uses the actual product photos from the catalogue.
   No artificial bottle models are created.
========================================================== */

function initThreeHero() {
  const host = $('heroCanvas');
  if (!host || host.dataset.heroInitialized === 'true') return;
  host.dataset.heroInitialized = 'true';

  const heroProducts = PRODUCTS.filter(p => p.type === 'gloss');
  let selectedIndex = 4;
  let renderer, scene, camera, carousel, animationFrame;
  let resizeObserver;
  let dragging = false;
  let lastX = 0;
  let rotation = 0;
  let cards = [];
  let fallbackMode = false;

  const shadeProducts = {
    bare: 'bare-essence',
    cherry: 'cherry-pop',
    peach: 'peach-perfect',
    cocoa: 'choco-royale'
  };

  const shadeNames = {
    bare: 'BARE ESSENCE',
    cherry: 'CHERRY POP',
    peach: 'PEACH PERFECT',
    cocoa: 'CHOCO ROYALE'
  };

  function updateShadeButtons(btn) {
    document.querySelectorAll('[data-shade]').forEach(x => {
      x.classList.toggle('active', x === btn);
    });
    if ($('shadeName')) {
      $('shadeName').textContent = shadeNames[btn.dataset.shade] || 'GLOSSY POUT';
    }
  }

  function setSelectedProduct(id) {
    const index = heroProducts.findIndex(p => p.id === id);
    if (index < 0) return;
    selectedIndex = index;

    if ($('shadeName')) {
      $('shadeName').textContent = heroProducts[index].name.toUpperCase();
    }

    cards.forEach((card, i) => {
      if (!card) return;
      const active = i === selectedIndex;
      if (window.gsap) {
        gsap.to(card.scale, {
          x: active ? 1.18 : .88,
          y: active ? 1.18 : .88,
          z: active ? 1.18 : .88,
          duration: .55,
          ease: 'back.out(1.8)'
        });
      } else {
        card.scale.setScalar(active ? 1.18 : .88);
      }
    });
  }

  function showImageFallback() {
    if (fallbackMode) return;
    fallbackMode = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    if (resizeObserver) resizeObserver.disconnect();

    host.replaceChildren();

    const wrap = document.createElement('div');
    wrap.className = 'gp-real-product-fallback';
    wrap.style.cssText = `
      position:absolute;inset:0;width:100%;height:100%;
      display:flex;align-items:center;justify-content:center;
      perspective:1000px;overflow:hidden;isolation:isolate;
    `;

    const stage = document.createElement('div');
    stage.style.cssText = `
      position:relative;width:100%;height:100%;
      display:flex;align-items:center;justify-content:center;
      transform-style:preserve-3d;
    `;

    const visible = [
      heroProducts[0],
      heroProducts[2],
      heroProducts[4],
      heroProducts[6],
      heroProducts[7]
    ].filter(Boolean);

    visible.forEach((product, index) => {
      const card = document.createElement('div');
      card.style.cssText = `
        position:absolute;width:clamp(95px,19%,155px);
        height:clamp(155px,48%,285px);
        display:flex;align-items:center;justify-content:center;
        padding:9px;border-radius:18px;
        background:rgba(255,255,255,.08);
        border:1px solid rgba(226,190,128,.5);
        box-shadow:0 18px 45px rgba(0,0,0,.22);
        backdrop-filter:blur(8px);
        transform-style:preserve-3d;
        animation:gpProductFloat ${3.2 + index * .35}s ease-in-out ${index * -.4}s infinite alternate;
        left:${index * 18 + 5}%;
        z-index:${index === 2 ? 5 : 3};
      `;

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.loading = 'eager';
      img.style.cssText = `
        display:block;width:100%;height:100%;object-fit:contain;
        filter:drop-shadow(0 12px 12px rgba(0,0,0,.18));
        border-radius:12px;
      `;

      const label = document.createElement('span');
      label.textContent = product.name.toUpperCase();
      label.style.cssText = `
        position:absolute;bottom:8px;left:0;right:0;
        text-align:center;font-size:9px;letter-spacing:2px;
        color:#fff;text-shadow:0 2px 5px rgba(0,0,0,.7);
      `;

      card.append(img, label);
      stage.appendChild(card);
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes gpProductFloat {
        from { transform:translateY(12px) rotateY(-9deg) rotateZ(-3deg); }
        to { transform:translateY(-14px) rotateY(9deg) rotateZ(3deg); }
      }
    `;

    wrap.append(stage);
    host.append(style, wrap);

    document.querySelectorAll('[data-shade]').forEach(btn => {
      btn.onclick = () => {
        const id = shadeProducts[btn.dataset.shade];
        if (!id) return;
        updateShadeButtons(btn);
        const product = PRODUCTS.find(p => p.id === id);
        if ($('shadeName')) $('shadeName').textContent = product.name.toUpperCase();
      };
    });
  }

  if (!window.THREE) {
    console.warn('Three.js did not load. Using real product image animation.');
    showImageFallback();
    return;
  }

  try {
    const THREE = window.THREE;
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(38, width / height, .1, 100);
    camera.position.set(0, 0, 9.5);

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.cssText = `
      display:block;width:100%;height:100%;
      touch-action:pan-y;cursor:grab;
    `;

    host.replaceChildren(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const keyLight = new THREE.DirectionalLight(0xffe5c0, 3.5);
    keyLight.position.set(4, 5, 7);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xf5b8c8, 22, 20);
    fillLight.position.set(-4, 1, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xd9b36b, 28, 20);
    rimLight.position.set(3, 2, -4);
    scene.add(rimLight);

    carousel = new THREE.Group();
    scene.add(carousel);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4b16f,
      metalness: .88,
      roughness: .2
    });

    const cardsData = heroProducts;
    let loadedCount = 0;
    let failedCount = 0;

    function createProductCard(product, index, texture) {
      const group = new THREE.Group();

      const ratio = texture.image.width / texture.image.height || .7;
      const cardHeight = 2.35;
      const cardWidth = Math.min(1.75, cardHeight * ratio);

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(cardWidth + .12, cardHeight + .12, .09),
        goldMaterial
      );

      group.add(frame);

      const photoMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
        toneMapped: false
      });

      const photo = new THREE.Mesh(
        new THREE.PlaneGeometry(cardWidth, cardHeight),
        photoMaterial
      );

      photo.position.z = .052;
      group.add(photo);

      const back = new THREE.Mesh(
        new THREE.PlaneGeometry(cardWidth, cardHeight),
        new THREE.MeshStandardMaterial({
          color: 0x241b20,
          roughness: .32,
          metalness: .18,
          side: THREE.DoubleSide
        })
      );

      back.position.z = -.052;
      group.add(back);

      const angle = (index / cardsData.length) * Math.PI * 2;
      const radius = 2.05;

      group.position.set(
        Math.sin(angle) * radius,
        Math.cos(angle * 2) * .22,
        Math.cos(angle) * .6
      );

      group.rotation.y = -angle * .25;
      group.scale.setScalar(index === selectedIndex ? 1.18 : .88);

      carousel.add(group);
      cards[index] = group;

      const labelCanvas = document.createElement('canvas');
      labelCanvas.width = 512;
      labelCanvas.height = 96;

      const ctx = labelCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f4dfba';
        ctx.font = 'bold 34px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(product.name.toUpperCase(), 256, 57);
      }

      const labelTexture = new THREE.CanvasTexture(labelCanvas);
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(cardWidth, .24),
        new THREE.MeshBasicMaterial({
          map: labelTexture,
          transparent: true,
          side: THREE.DoubleSide
        })
      );

      label.position.set(0, -cardHeight / 2 - .19, .06);
      group.add(label);
    }

    cardsData.forEach((product, index) => {
      loader.load(
        product.image,
        texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          createProductCard(product, index, texture);
          loadedCount++;

          if (loadedCount === cardsData.length) {
            setSelectedProduct(heroProducts[selectedIndex].id);
          }
        },
        undefined,
        error => {
          console.warn('Could not load 3D product image:', product.name, error);
          failedCount++;

          if (failedCount === cardsData.length) {
            showImageFallback();
          }
        }
      );
    });

    let startX = 0;

    renderer.domElement.addEventListener('pointerdown', e => {
      dragging = true;
      lastX = e.clientX;
      startX = e.clientX;
      renderer.domElement.style.cursor = 'grabbing';
      try {
        renderer.domElement.setPointerCapture(e.pointerId);
      } catch {}
    });

    renderer.domElement.addEventListener('pointermove', e => {
      if (!dragging) return;
      rotation += (e.clientX - lastX) * .009;
      lastX = e.clientX;
    });

    function stopDrag() {
      dragging = false;
      if (renderer && renderer.domElement) {
        renderer.domElement.style.cursor = 'grab';
      }
    }

    renderer.domElement.addEventListener('pointerup', stopDrag);
    renderer.domElement.addEventListener('pointercancel', stopDrag);
    renderer.domElement.addEventListener('lostpointercapture', stopDrag);

    document.querySelectorAll('[data-shade]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = shadeProducts[btn.dataset.shade];
        if (!id) return;

        updateShadeButtons(btn);
        setSelectedProduct(id);

        const target = heroProducts.findIndex(p => p.id === id);
        if (target >= 0) {
          rotation += (selectedIndex - target) * .18;
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
      animationFrame = requestAnimationFrame(render);

      if (!dragging) rotation += .0018;

      carousel.rotation.y = rotation;
      carousel.position.y = Math.sin(time * .0007) * .12;

      cards.forEach((card, i) => {
        if (!card) return;
        card.rotation.x = Math.sin(time * .0005 + i) * .06;
        card.position.y =
          Math.cos(time * .0008 + i * .7) * .18;
      });

      renderer.render(scene, camera);
    }

    render(0);

    window.addEventListener('pagehide', () => {
      cancelAnimationFrame(animationFrame);
      if (resizeObserver) resizeObserver.disconnect();

      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();

        if (obj.material) {
          const materials = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];

          materials.forEach(material => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
      });

      renderer.dispose();
    }, { once: true });

  } catch (err) {
    console.warn('3D product display could not start:', err);
    showImageFallback();
  }
}

/* Smooth page transitions */
document.querySelectorAll('a[href$=".html"]').forEach(a => a.addEventListener('click', e => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  const overlay = $('pageTransition');
  if (window.gsap && overlay) {
    gsap.to(overlay, {
      scaleY:1,
      transformOrigin:'bottom',
      duration:.45,
      ease:'power2.inOut',
      onComplete:() => location.href = url.href
    });
  } else {
    location.href = url.href;
  }
}));

startIntro();
initMotion();
