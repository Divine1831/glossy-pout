
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
let wishlistOnly = false;
let favorites = new Set();
try {
  const saved = JSON.parse(localStorage.getItem('glossyPoutFavorites') || '[]');
  if (Array.isArray(saved)) favorites = new Set(saved.filter(id => PRODUCTS.some(p => p.id === id)));
} catch {}
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
  let list = PRODUCTS.filter(p =>
    (filter === 'all' || p.type === filter) &&
    (`${p.name} ${p.desc}`.toLowerCase().includes(q)) &&
    (!wishlistOnly || favorites.has(p.id))
  );

  const sort = $('sortProducts')?.value || 'featured';
  if (sort === 'price-low') list.sort((a,b) => reduced(a.price)-reduced(b.price));
  if (sort === 'price-high') list.sort((a,b) => reduced(b.price)-reduced(a.price));
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

  $('wishlistCount').textContent = favorites.size;
  $('wishlistFilter').classList.toggle('active', wishlistOnly);
  $('wishlistFilter').setAttribute('aria-pressed', String(wishlistOnly));
  $('productGrid').innerHTML = list.length ? list.map(p => `
    <article class="product-card reveal" tabindex="0" data-view="${p.id}" aria-label="View ${p.name}">
      <div class="product-media">
        ${imageMarkup(p)}
        <span class="product-index">GP / ${String(PRODUCTS.indexOf(p) + 1).padStart(2,'0')}</span>
        <span class="discount-tag">10% OFF</span>
        <button class="favorite-button ${favorites.has(p.id) ? 'is-favorite' : ''}" type="button"
          data-favorite="${p.id}" aria-label="${favorites.has(p.id) ? 'Remove' : 'Save'} ${p.name}"
          aria-pressed="${favorites.has(p.id)}">${favorites.has(p.id) ? '♥' : '♡'}</button>
      </div>

      <div class="product-meta">
        <div>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-type">${p.type === 'care' ? 'LIP CARE' : p.type === 'liner' ? 'LIP LINER' : p.type === 'tools' ? 'BEAUTY TOOL' : 'LIP GLOSS'}</p>
        </div>
        <div class="product-price">
          ${money(reduced(p.price))}
          <del>${money(p.price)}</del>
        </div>
      </div>

      <div class="product-actions">
        <button class="product-open" type="button" data-view="${p.id}">
          DISCOVER PRODUCT <span>↗</span>
        </button>
        <button class="add-to-cart-btn" type="button" data-add-cart="${p.id}">
          ADD TO CART +
        </button>
      </div>
    </article>
  `).join('') : `<p class="no-results">${wishlistOnly && !favorites.size ? 'Your saved list is empty. Tap the heart on a product to keep it here.' : 'No products match your search. Try another name.'}</p>`;

  attachImageFallback($('productGrid'));
  observeReveals();
}

function toggleFavorite(id) {
  if (!PRODUCTS.some(p => p.id === id)) return;
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  try { localStorage.setItem('glossyPoutFavorites', JSON.stringify([...favorites])); } catch {}
  renderProducts();
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
  if ($('mobileCartCount')) $('mobileCartCount').textContent = count;
  $('bagItemCount').textContent = `(${count})`;

  $('cartLines').innerHTML = cart.length ? cart.map(x => {
    const p = PRODUCTS.find(p => p.id === x.id);

    return `
      <div class="cart-line">
        <div class="cart-thumb">${imageMarkup(p)}</div>
        <div>
          <b>${p.name}</b>
          <small>${money(reduced(p.price))} each <del>${money(p.price)}</del></small>
          <div class="qty-controls">
            <button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Decrease ${p.name}">−</button>
            <span>${x.qty}</span>
            <button type="button" data-qty="${p.id}" data-delta="1" aria-label="Increase ${p.name}">+</button>
          </div>
          <button class="remove-line" type="button" data-remove="${p.id}">REMOVE</button>
        </div>
        <strong>${money(reduced(p.price) * x.qty)}</strong>
      </div>
    `;
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

  $('whatsappOrder').href =
    `https://wa.me/2348110878047?text=${encodeURIComponent('Hello Glossy Pout! I would like to order:%0A' + decodeURIComponent(summary) + '%0AEstimated total: ' + money(t.total))}`;

  attachImageFallback($('cartLines'));
}

function addToCart(id, qty = 1) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;

  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty = Math.min(20, item.qty + qty);
  } else {
    cart.push({ id, qty: Math.min(20, qty) });
  }

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

  $('productDetails').innerHTML = `
    <div class="product-detail">
      <div class="product-detail-media">${imageMarkup(p,'detail-image')}</div>
      <div class="product-detail-copy">
        <p class="eyebrow">GLOSSY POUT · ${p.type.toUpperCase()}</p>
        <span class="quick-view-discount">10% OFF</span>
        <h2>${p.name}</h2>
        <p>${p.desc}. A little everyday essential, selected to bring a touch of Glossy Pout to your routine.</p>
        <div class="detail-price">${money(reduced(p.price))}<del>${money(p.price)}</del></div>
        <div class="quantity-picker">
          <button type="button" id="detailMinus" aria-label="Decrease quantity">−</button>
          <output id="detailQty">1</output>
          <button type="button" id="detailPlus" aria-label="Increase quantity">+</button>
        </div>
        <button class="button button-dark" id="detailAdd" type="button">ADD TO BAG <span>↗</span></button>
      </div>
    </div>
  `;

  attachImageFallback($('productDetails'));

  const img = $('productDetails').querySelector('img');
  if (img) img.addEventListener('click', () => img.classList.toggle('zoomed'));

  $('detailMinus').onclick = () => {
    detailQty = Math.max(1, detailQty - 1);
    $('detailQty').textContent = detailQty;
  };

  $('detailPlus').onclick = () => {
    detailQty = Math.min(20, detailQty + 1);
    $('detailQty').textContent = detailQty;
  };

  $('detailAdd').onclick = () => {
    addToCart(id, detailQty);
    $('productDialog').close();
    openCart();
  };

  $('productDialog').showModal();
}

/* Product card actions: discover and add directly to cart */
$('productGrid').addEventListener('click', e => {
  const favoriteButton = e.target.closest('[data-favorite]');
  if (favoriteButton) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(favoriteButton.dataset.favorite);
    return;
  }

  const addButton = e.target.closest('[data-add-cart]');

  if (addButton) {
    e.stopPropagation();

    const id = addButton.dataset.addCart;
    addToCart(id);

    const originalText = 'ADD TO CART +';
    addButton.textContent = 'ADDED ✓';
    addButton.classList.add('added');
    addButton.disabled = true;

    setTimeout(() => {
      addButton.textContent = originalText;
      addButton.classList.remove('added');
      addButton.disabled = false;
    }, 1200);

    return;
  }

  const viewButton = e.target.closest('[data-view]');
  if (viewButton) openProduct(viewButton.dataset.view);
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
$('sortProducts').addEventListener('change', renderProducts);
$('wishlistFilter').addEventListener('click', () => {
  wishlistOnly = !wishlistOnly;
  renderProducts();
});
$('mobileSaved').addEventListener('click', () => {
  wishlistOnly = true;
  renderProducts();
  $('shop').scrollIntoView({behavior:'smooth'});
});
$('mobileBag').addEventListener('click', openCart);

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
$('checkoutButton').onclick = () => {
  closeCart();
  $('checkoutDialog').showModal();
};
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

try {
  seen = new Set(JSON.parse(localStorage.getItem('glossyPoutSeenNotifications') || '[]').map(String));
} catch {}

function renderNotifications() {
  const list = $('notificationList');

  if (!notifications.length) {
    list.innerHTML = '<p class="notification-empty">No new notes just yet. Check back soon.</p>';
    return;
  }

  list.innerHTML = notifications.map(n => `
    <article class="notification-card">
      <h3>${escapeHTML(n.title)}</h3>
      <p>${escapeHTML(n.message)}</p>
      <small class="notification-date">${new Date(n.created_at).toLocaleDateString('en-NG',{dateStyle:'medium'})}</small>
    </article>
  `).join('');

  const unread = notifications.filter(n => !seen.has(String(n.id))).length;
  $('notificationCount').hidden = !unread;
  $('notificationCount').textContent = unread > 9 ? '9+' : String(unread);
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[c]));
}

async function loadNotifications() {
  try {
    const r = await fetch('/api/notifications', { cache: 'no-store' });
    if (!r.ok) throw new Error();

    const d = await r.json();
    notifications = Array.isArray(d.notifications) ? d.notifications : [];

    if (!localStorage.getItem('glossyPoutSeenNotifications')) {
      seen = new Set(notifications.map(n => String(n.id)));
    }

    renderNotifications();

  } catch {
    $('notificationList').innerHTML =
      '<p class="notification-empty">Updates are taking a little break. Please check again soon.</p>';
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        title: $('notificationTitle').value,
        message: $('notificationMessageInput').value
      })
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

/* Order lookup: the server matches both order number and checkout email. */
function openTracking() {
  $('trackingResult').innerHTML = '';
  $('trackingMessage').textContent = '';
  $('trackingDialog').showModal();
}
$('openTracking').addEventListener('click', openTracking);
$('closeTracking').addEventListener('click', () => $('trackingDialog').close());

$('trackingForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const button = $('trackButton');
  const message = $('trackingMessage');
  const resultBox = $('trackingResult');
  const values = Object.fromEntries(new FormData(form).entries());
  button.disabled = true;
  button.textContent = 'Checking order…';
  message.textContent = '';
  resultBox.innerHTML = '';

  try {
    const response = await fetch('/api/track-order', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'We could not find that order.');
    const paid = data.payment_status === 'paid';
    const items = Array.isArray(data.items) ? data.items : [];
    resultBox.innerHTML = `
      <div class="tracking-status ${paid ? 'is-paid' : 'is-pending'}">
        <span>${paid ? '✓' : '◷'}</span>
        <div><b>${paid ? 'Payment confirmed' : 'Payment pending'}</b>
        <small>${paid ? 'Your payment has been verified.' : 'Payment has not yet been confirmed.'}</small></div>
      </div>
      <p><b>Order:</b> ${escapeHTML(data.order_number)}</p>
      <p><b>Total:</b> ${money(Number(data.total_kobo || 0) / 100)}</p>
      <div class="tracking-items">${items.map(item => `<p>${escapeHTML(item.name || 'Product')} × ${Number(item.quantity || 0)}</p>`).join('')}</div>
      <p class="tracking-note">For delivery updates, please contact the shop using the contact details on this website.</p>`;
  } catch (err) {
    message.textContent = err.message || 'Could not check this order. Please try again.';
  } finally {
    button.disabled = false;
    button.textContent = 'Find my order ↗';
  }
});

$('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();

  const email = $('newsletterEmail').value.trim();
  const subject = encodeURIComponent('Glossy Pout newsletter sign-up');
  const body = encodeURIComponent(`Please add this email to the Glossy Pout updates list: ${email}`);

  $('newsletterMessage').textContent = 'Opening your email app so you can send your sign-up request.';

  window.location.href =
    `mailto:okohchristabel06@gmail.com?subject=${subject}&body=${body}`;

  e.currentTarget.reset();
});

$('menuToggle').onclick = () => {
  const open = $('mainNav').classList.toggle('open');
  $('menuToggle').setAttribute('aria-expanded', String(open));
  $('menuToggle').textContent = open ? '×' : '☰';
};

document.querySelectorAll('#mainNav a[href^="#"]').forEach(a =>
  a.addEventListener('click', () => {
    $('mainNav').classList.remove('open');
    $('menuToggle').setAttribute('aria-expanded', 'false');
    $('menuToggle').textContent = '☰';
  })
);

$('year').textContent = new Date().getFullYear();

renderProducts();
renderCart();
loadNotifications();
setInterval(loadNotifications, 90000);

/* First-visit welcome and optional product personalisation */
let welcomeVibe = 'all';
function openWelcome() {
  const screen = $('welcomeScreen');
  if (!screen) return;
  screen.classList.add('is-open');
  screen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('welcome-open');
  $('closeWelcome').focus();
}
function closeWelcome() {
  const screen = $('welcomeScreen');
  if (!screen) return;
  screen.classList.remove('is-open');
  screen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('welcome-open');
}
function showWelcomeForFirstVisit() {
  try {
    if (!localStorage.getItem('gpWelcomeCompleted')) {
      window.setTimeout(openWelcome, 350);
    }
  } catch { /* If storage is unavailable, keep the storefront usable. */ }
}
function finishWelcome(shouldFilter = true) {
  try { localStorage.setItem('gpWelcomeCompleted', '1'); } catch {}
  closeWelcome();
  if (shouldFilter) {
    filter = welcomeVibe;
    document.querySelectorAll('#filters [data-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === filter);
    });
    renderProducts();
  }
  document.querySelector('#shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('[data-vibe]').forEach(button => {
  button.addEventListener('click', () => {
    welcomeVibe = button.dataset.vibe;
    document.querySelectorAll('[data-vibe]').forEach(choice => {
      const selected = choice === button;
      choice.classList.toggle('active', selected);
      choice.setAttribute('aria-pressed', String(selected));
    });
  });
});
$('openWelcome').addEventListener('click', () => {
  $('mainNav').classList.remove('open');
  $('menuToggle').setAttribute('aria-expanded', 'false');
  $('menuToggle').textContent = '☰';
  openWelcome();
});
$('closeWelcome').addEventListener('click', closeWelcome);
$('welcomeContinue').addEventListener('click', () => finishWelcome(true));
$('welcomeSkip').addEventListener('click', () => finishWelcome(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && $('welcomeScreen').classList.contains('is-open')) closeWelcome();
});

/* Intro animation */
function startIntro() {
  const intro = $('intro');
  const skip = $('skipIntro');
  const progress = $('introProgress');
  const percent = $('introPercent');

  const done = () => {
    intro.classList.add('done');
    document.body.classList.remove('is-loading');
    sessionStorage.setItem('gpIntroSeen', '1');
    setTimeout(() => intro.remove(), 850);
    animateHero();
    showWelcomeForFirstVisit();
  };

  if (sessionStorage.getItem('gpIntroSeen')) {
    intro.remove();
    document.body.classList.remove('is-loading');
    animateHero();
    showWelcomeForFirstVisit();
    return;
  }

  let value = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    done();
    return;
  }

  const timer = setInterval(() => {
    value = Math.min(100, value + Math.ceil(Math.random() * 13));
    progress.style.width = value + '%';
    percent.textContent = String(value).padStart(2,'0') + '%';

    if (value >= 100) {
      clearInterval(timer);
      setTimeout(done, 280);
    }
  }, 95);

  skip.onclick = () => {
    clearInterval(timer);
    done();
  };
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
    gsap.from('.hero-intro,.hero-actions,.hero-foot', {
      y:20, autoAlpha:0, duration:.7, stagger:.12, delay:.55
    });
    gsap.from('.hero-stage', {
      scale:.92, autoAlpha:0, duration:1.2, ease:'power2.out', delay:.25
    });
  } else {
    document.querySelectorAll('.hero-copy>*').forEach(x => x.style.opacity = 1);
  }
}

function initMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced && window.Lenis) {
    const lenis = new Lenis({
      duration:1.05,
      smoothWheel:true,
      gestureOrientation:'vertical'
    });

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
        y:0,
        autoAlpha:1,
        duration:.85,
        ease:'power2.out',
        scrollTrigger:{
          trigger:el,
          start:'top 88%',
          once:true
        },
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

  const dot = $('cursorDot');
  const ring = $('cursorRing');

  if (!dot || !ring) return;

  let x = 0, y = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    x = e.clientX;
    y = e.clientY;

    dot.style.opacity = '1';
    ring.style.opacity = '1';
    dot.style.transform = `translate(${x-3}px,${y-3}px)`;
  });

  function tick() {
    rx += (x-rx)*.18;
    ry += (y-ry)*.18;
    ring.style.transform = `translate(${rx-17}px,${ry-17}px)`;
    requestAnimationFrame(tick);
  }

  tick();

  document.querySelectorAll('a,button,.product-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
  });
}

/* 3D hero using actual Glossy Pout product pictures */
function initThreeHero() {
  const host = $('heroCanvas');
  if (!host || host.dataset.heroInitialized === 'true') return;
  host.dataset.heroInitialized = 'true';

  const heroProducts = PRODUCTS.filter(p => p.type === 'gloss');
  const shadeProducts = {
    bare: 'bare-essence',
    cherry: 'cherry-pop',
    peach: 'peach-perfect',
    cocoa: 'choco-royale'
  };

  let selectedId = 'bare-essence';
  let rotation = 0;
  let dragging = false;
  let lastX = 0;
  let renderer, scene, camera, carousel, frame;
  let resizeObserver;
  const cards = [];

  function updateLabel(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (product && $('shadeName')) {
      $('shadeName').textContent = product.name.toUpperCase();
    }
  }

  function showFallback() {
    host.replaceChildren();

    const stage = document.createElement('div');
    stage.style.cssText = `
      position:absolute;inset:0;display:flex;align-items:center;
      justify-content:center;perspective:1000px;overflow:hidden;
    `;

    heroProducts.slice(0,5).forEach((p,i) => {
      const card = document.createElement('div');
      card.style.cssText = `
        position:absolute;width:18%;height:55%;
        left:${5 + i*17}%;top:20%;
        border:1px solid rgba(212,177,111,.6);
        border-radius:15px;padding:7px;
        background:rgba(255,255,255,.08);
        box-shadow:0 18px 40px rgba(0,0,0,.2);
        animation:gpFloat ${3+i*.25}s ease-in-out infinite alternate;
      `;

      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.name;
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;';

      card.appendChild(img);
      stage.appendChild(card);
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes gpFloat {
        from { transform:translateY(12px) rotateY(-9deg); }
        to { transform:translateY(-12px) rotateY(9deg); }
      }
    `;

    host.append(style, stage);
  }

  if (!window.THREE) {
    showFallback();
    return;
  }

  try {
    const THREE = window.THREE;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      38,
      Math.max(1,host.clientWidth) / Math.max(1,host.clientHeight),
      .1,
      100
    );

    camera.position.set(0,0,9);

    renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1,1.6));
    renderer.setSize(host.clientWidth,host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab';

    host.replaceChildren(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff,2));

    const light = new THREE.DirectionalLight(0xffe5c0,3.5);
    light.position.set(4,5,7);
    scene.add(light);

    const pinkLight = new THREE.PointLight(0xf5b8c8,22,20);
    pinkLight.position.set(-4,1,4);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xd9b36b,28,20);
    goldLight.position.set(3,2,-4);
    scene.add(goldLight);

    carousel = new THREE.Group();
    scene.add(carousel);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const gold = new THREE.MeshStandardMaterial({
      color:0xd4b16f,
      metalness:.88,
      roughness:.2
    });

    let successfulLoads = 0;
    let failedLoads = 0;

    function addProductCard(product,index,texture) {
      const group = new THREE.Group();
      const ratio = texture.image.width / texture.image.height || .7;
      const h = 2.35;
      const w = Math.min(1.75,h*ratio);

      const frameMesh = new THREE.Mesh(
        new THREE.BoxGeometry(w+.12,h+.12,.09),
        gold
      );
      group.add(frameMesh);

      const photo = new THREE.Mesh(
        new THREE.PlaneGeometry(w,h),
        new THREE.MeshBasicMaterial({
          map:texture,
          side:THREE.DoubleSide,
          toneMapped:false
        })
      );
      photo.position.z = .052;
      group.add(photo);

      const angle = index / heroProducts.length * Math.PI * 2;
      const radius = 2.1;

      group.position.set(
        Math.sin(angle)*radius,
        Math.cos(angle*2)*.2,
        Math.cos(angle)*.6
      );

      group.rotation.y = -angle*.25;
      group.scale.setScalar(product.id === selectedId ? 1.18 : .88);

      carousel.add(group);
      cards[index] = group;
    }

    heroProducts.forEach((product,index) => {
      loader.load(product.image,texture => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        addProductCard(product,index,texture);
        successfulLoads++;
      },undefined,() => {
        failedLoads++;
        console.warn('Product image failed:',product.name);

        if (failedLoads === heroProducts.length) showFallback();
      });
    });

    function selectProduct(id) {
      selectedId = id;
      updateLabel(id);

      const selectedIndex = heroProducts.findIndex(p => p.id === id);

      cards.forEach((card,index) => {
        if (!card) return;
        const scale = index === selectedIndex ? 1.18 : .88;

        if (window.gsap) {
          gsap.to(card.scale,{
            x:scale,y:scale,z:scale,
            duration:.5,
            ease:'back.out(1.8)'
          });
        } else {
          card.scale.setScalar(scale);
        }
      });
    }

    document.querySelectorAll('[data-shade]').forEach(btn => {
      btn.addEventListener('click',() => {
        const id = shadeProducts[btn.dataset.shade];
        if (!id) return;

        document.querySelectorAll('[data-shade]').forEach(b => {
          b.classList.toggle('active',b === btn);
        });

        selectProduct(id);
      });
    });

    renderer.domElement.addEventListener('pointerdown',e => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.style.cursor = 'grabbing';
      try { renderer.domElement.setPointerCapture(e.pointerId); } catch {}
    });

    renderer.domElement.addEventListener('pointermove',e => {
      if (!dragging) return;
      rotation += (e.clientX-lastX)*.009;
      lastX = e.clientX;
    });

    const stop = () => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
    };

    renderer.domElement.addEventListener('pointerup',stop);
    renderer.domElement.addEventListener('pointercancel',stop);
    renderer.domElement.addEventListener('lostpointercapture',stop);

    function resize() {
      const w = Math.max(1,host.clientWidth);
      const h = Math.max(1,host.clientHeight);
      camera.aspect = w/h;
      camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    }

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
    } else {
      window.addEventListener('resize',resize);
    }

    function render(time) {
      frame = requestAnimationFrame(render);

      if (!dragging) rotation += .0018;

      carousel.rotation.y = rotation;
      carousel.position.y = Math.sin(time*.0007)*.12;

      cards.forEach((card,i) => {
        if (!card) return;
        card.rotation.x = Math.sin(time*.0005+i)*.06;
        card.position.y = Math.cos(time*.0008+i*.7)*.18;
      });

      renderer.render(scene,camera);
    }

    render(0);

    window.addEventListener('pagehide',() => {
      cancelAnimationFrame(frame);
      if (resizeObserver) resizeObserver.disconnect();
      renderer.dispose();

      scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach(m => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
    },{once:true});

  } catch(err) {
    console.warn('3D hero failed:',err);
    showFallback();
  }
}

/* Internal page transitions */
document.querySelectorAll('a[href$=".html"]').forEach(a =>
  a.addEventListener('click',e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = new URL(a.href,location.href);
    if (url.origin !== location.origin) return;

    e.preventDefault();
    const overlay = $('pageTransition');

    if (window.gsap && overlay) {
      gsap.to(overlay,{
        scaleY:1,
        transformOrigin:'bottom',
        duration:.45,
        ease:'power2.inOut',
        onComplete:() => location.href = url.href
      });
    } else {
      location.href = url.href;
    }
  })
);

startIntro();
initMotion();
