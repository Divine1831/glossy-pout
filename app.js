const PRODUCTS = [
  {
    id: "moisturizing-lip-balm",
    name: "Moisturizing Lip Balm",
    type: "care",
    kind: "balm",
    price: 2000,
    swatch: "#f4c6d0",
    badge: "Daily Essential",
    desc: "Deeply hydrating everyday lip balm for soft, cushiony lips.",
    image: "https://drive.google.com/thumbnail?id=1MncZOaldo6wVPgB35RSHegO9WkrOwSpN&sz=w1000"
  },
  {
    id: "cherry-pop",
    name: "Cherry Pop",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#c81d38",
    badge: "Bestseller",
    desc: "A bold, juicy cherry-red lip gloss with high-glass shine.",
    image: "https://drive.google.com/thumbnail?id=1ErqSBrclazr4dqiYbOJKEtTspC2A7lt7&sz=w1000"
  },
  {
    id: "candy-cloud",
    name: "Candy Cloud",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#f39eb6",
    desc: "A dreamy soft-pink lip gloss for an effortless plush pout.",
    image: "https://drive.google.com/thumbnail?id=1UXIzZa5Y6hMhDGvf09AMS7e02sk5HCCE&sz=w1000"
  },
  {
    id: "mystic-glow",
    name: "Mystic Glow",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#e77aa8",
    badge: "Fan Favourite",
    desc: "pH-reactive colour-changing gloss that adapts to your unique pink.",
    image: "https://drive.google.com/thumbnail?id=1JBi8jnnfVecCypWUAI2OfAf4nOepvcYT&sz=w1000"
  },
  {
    id: "peach-perfect",
    name: "Peach Perfect",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#e5987e",
    desc: "A warm peachy-nude lip gloss that flatters every skin tone.",
    image: "https://drive.google.com/thumbnail?id=1ZrUW2i8BZ9cCG0pbwfo9NJOZ29cb8cf5&sz=w1000"
  },
  {
    id: "bare-essence",
    name: "Bare Essence",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#cfa08e",
    badge: "Bestseller",
    desc: "A silky, flattering neutral nude lip gloss for everyday glam.",
    image: "/images/bare-essence.jpg"
  },
  {
    id: "lipcare-kit",
    name: "Lipcare Kit",
    type: "care",
    kind: "balm",
    price: 3000,
    swatch: "#e5a3b5",
    badge: "Value Set",
    desc: "A complete pocket lip-care bundle to prep, soothe, and nourish.",
    image: "https://drive.google.com/thumbnail?id=1BeLzFGNgsSPn0rqMqln2mo-ernIzN96d&sz=w1000"
  },
  {
    id: "clear-lipgloss",
    name: "Clear Lipgloss",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#f7eef1",
    badge: "Must-Have",
    desc: "Crystal-clear mirror glaze—wear solo or layered over any liner.",
    image: "https://drive.google.com/thumbnail?id=1LEAVRbTRGy2ZzyVGzB1UV1u1BAykK9pN&sz=w1000"
  },
  {
    id: "lip-scrub",
    name: "Lip Scrub",
    type: "care",
    kind: "scrub",
    price: 1500,
    swatch: "#d99b8c",
    desc: "Gentle sugar exfoliator that buffs away dryness for smooth lips.",
    image: "https://drive.google.com/thumbnail?id=1-FJzzBqAiNgpQUyKTNeW62h6esowxXIL&sz=w1000"
  },
  {
    id: "starlight",
    name: "Starlight",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#f2d5df",
    desc: "Micro-shimmer glittery lip gloss that catches every light.",
    image: "https://drive.google.com/thumbnail?id=1f_bFx8Ia3Ugc13OKS4lYwXNxqgvsIJ3u&sz=w1000"
  },
  {
    id: "choco-royale",
    name: "Choco Royale",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    swatch: "#6b3a2e",
    badge: "Bestseller",
    desc: "A rich, decadent cocoa-brown gloss with a luscious glaze.",
    image: "https://drive.google.com/thumbnail?id=1-uSs_jhNr7AkKuBiqtkRoWlPwXeRBw5g&sz=w1000"
  },
  {
    id: "pink-lip-balm",
    name: "Pink Lip Balm",
    type: "care",
    kind: "balm",
    price: 3000,
    swatch: "#ee88a7",
    desc: "Nourishing moisture treatment with a soft rosy tint.",
    image: "https://drive.google.com/thumbnail?id=1b8a5isC9p2cZzb1b-kqvYZ5UZshoq8Or&sz=w1000"
  },
  {
    id: "lip-brush",
    name: "Lip Brush",
    type: "tools",
    kind: "tool",
    price: 500,
    swatch: "#a34d6a",
    desc: "Precision applicator tool for mess-free gloss, balm, and scrub.",
    image: "https://drive.google.com/thumbnail?id=1PKuWCqYOT9RVLw4Ti6yBr2348wJjPV7L&sz=w1000"
  },
  {
    id: "black-lip-liner",
    name: "Black Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1200,
    swatch: "#1c1619",
    desc: "Creamy, high-pigment black pencil for bold ombré lip combos.",
    image: "https://drive.google.com/thumbnail?id=1BhtYq6kqAjct1jQoFqA093el5ZUi70BN&sz=w1000"
  },
  {
    id: "brown-lip-liner",
    name: "Brown Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1200,
    swatch: "#5a3226",
    badge: "Bestseller",
    desc: "Rich espresso-brown liner—the ultimate pairing for nude glosses.",
    image: "https://drive.google.com/thumbnail?id=1J4nlfgTb832ron0wyqq7hWZnGRrQiH9-&sz=w1000"
  },
  {
    id: "burgundy-lip-liner",
    name: "Burgundy Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1200,
    swatch: "#751f37",
    desc: "Deep berry-wine liner to sculpt and define your pout.",
    image: "https://drive.google.com/thumbnail?id=16ahT3Y-jiOaxzUUHA8BfJe5ZhjpagOUK&sz=w1000"
  }
];

const DISCOUNT = 0.10;
const CART_KEY = "glossyPoutCart";
const WISH_KEY = "glossyPoutWishlist";
const NOTIF_SEEN_KEY = "glossyPoutSeenNotifications";

const money = n => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
}).format(n);

const byId = id => document.getElementById(id);
const discounted = price => Math.round(price * (1 - DISCOUNT));

let activeFilter = "all";
let activeSort = "featured";

let cart = [];
let wishlist = [];

try {
  const rawCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  if (Array.isArray(rawCart)) {
    cart = rawCart.filter(x => PRODUCTS.some(p => p.id === x.id) && Number.isInteger(x.qty) && x.qty > 0);
  }
  const rawWish = JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
  if (Array.isArray(rawWish)) {
    wishlist = rawWish.filter(id => PRODUCTS.some(p => p.id === id));
  }
} catch (_) {}

/* =====================================
   TOAST HELPER
===================================== */
let toastTimer = null;
function showToast(message) {
  const el = byId("toastBanner");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

/* =====================================
   PRODUCT RENDERING, FILTER & SORT
===================================== */
function getFilteredProducts() {
  const q = byId("searchInput").value.trim().toLowerCase();
  let list = PRODUCTS.filter(p =>
    (activeFilter === "all" || p.type === activeFilter) &&
    (p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.type.toLowerCase().includes(q))
  );

  if (activeSort === "price-asc") {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (activeSort === "price-desc") {
    list = [...list].sort((a, b) => b.price - a.price);
  } else if (activeSort === "name-asc") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  }
  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  const meta = byId("resultsCount");
  if (meta) {
    meta.textContent = list.length === PRODUCTS.length
      ? `Showing all ${PRODUCTS.length} products`
      : `Showing ${list.length} of ${PRODUCTS.length} products`;
  }

  byId("productGrid").innerHTML = list.length
    ? list.map(p => {
        const final = discounted(p.price);
        const isSaved = wishlist.includes(p.id);
        const typeLabel =
          p.type === "gloss" ? "Lip Gloss" :
          p.type === "care" ? "Lip Care" :
          p.type === "liner" ? "Lip Liner" : "Beauty Tool";

        return `
          <article class="product-card">
            <div class="product-visual" data-view="${p.id}">
              <div class="card-badges">
                <span class="discount-tag">10% OFF</span>
                ${p.badge ? `<span class="bestseller-tag">${p.badge}</span>` : ""}
              </div>

              <button
                class="wishlist-btn ${isSaved ? "saved" : ""}"
                type="button"
                data-wish="${p.id}"
                aria-label="${isSaved ? "Remove from favourites" : "Save to favourites"}"
                title="${isSaved ? "Saved" : "Save to favourites"}"
              >${isSaved ? "♥" : "♡"}</button>

              <img
                class="product-photo"
                src="${p.image || ""}"
                alt="${p.name}"
                loading="lazy"
                style="display:${p.image ? "block" : "none"}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              >

              <div class="product-art ${p.kind}" style="display:${p.image ? "none" : "flex"}">
                ${p.kind === "gloss" ? "GLOSSY<br>POUT" : p.kind === "scrub" ? "LIP<br>SCRUB" : "GP"}
              </div>

              <span class="quick-view-pill">Quick View & Zoom</span>
            </div>

            <div class="product-body">
              <div class="product-meta-top">
                <span class="product-category">${typeLabel}</span>
                <span class="shade-swatch" style="background:${p.swatch}" title="Shade tone"></span>
              </div>

              <h3 class="product-name" data-view="${p.id}">${p.name}</h3>
              <p class="product-desc">${p.desc}</p>

              <div class="product-footer">
                <div class="price-row">
                  <span class="price-now">${money(final)}</span>
                  <span class="price-old">${money(p.price)}</span>
                </div>
                <button class="add-button" type="button" data-add="${p.id}">
                  Add to bag
                </button>
              </div>
            </div>
          </article>
        `;
      }).join("")
    : `<div class="no-results">
         <p>No products match your search or filter.</p>
         <button class="button button-dark" type="button" id="resetFiltersBtn">Reset filters</button>
       </div>`;

  const resetBtn = byId("resetFiltersBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      byId("searchInput").value = "";
      activeFilter = "all";
      activeSort = "featured";
      byId("sortSelect").value = "featured";
      document.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x.dataset.filter === "all"));
      renderProducts();
    });
  }
}

/* =====================================
   QUICK VIEW MODAL
===================================== */
const quickView = byId("productQuickView");

function openProductView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;

  const finalPrice = discounted(p.price);
  const isSaved = wishlist.includes(p.id);

  byId("quickViewDetails").innerHTML = `
    <div class="quick-view-image-wrap">
      <img class="quick-view-image" src="${p.image}" alt="${p.name}" title="Click to zoom">
    </div>
    <div class="quick-view-content">
      <div class="quick-view-tags">
        <span class="quick-view-discount">10% OFF AUTOMATIC</span>
        ${p.badge ? `<span class="bestseller-tag">${p.badge}</span>` : ""}
      </div>
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      <p style="font-size:12px">Tip: Tap the product image above to zoom in on details.</p>
      <div class="quick-view-price">
        ${money(finalPrice)}
        <span class="quick-view-old">${money(p.price)}</span>
      </div>
      <div class="quick-view-actions">
        <button class="quick-view-add" type="button" data-quick-add="${p.id}">Add to bag</button>
        <button class="quick-view-wish ${isSaved ? "saved" : ""}" type="button" data-quick-wish="${p.id}" aria-label="Toggle favourite">
          ${isSaved ? "♥" : "♡"}
        </button>
      </div>
    </div>
  `;

  const img = byId("quickViewDetails").querySelector(".quick-view-image");
  img.addEventListener("click", () => img.classList.toggle("zoomed"));
  quickView.showModal();
}

quickView.querySelector(".quick-view-close").addEventListener("click", () => quickView.close());
quickView.addEventListener("click", e => { if (e.target === quickView) quickView.close(); });
quickView.addEventListener("click", e => {
  const addBtn = e.target.closest("[data-quick-add]");
  if (addBtn) {
    addToCart(addBtn.dataset.quickAdd);
    addBtn.textContent = "Added to bag ✓";
    setTimeout(() => { addBtn.textContent = "Add to bag"; }, 1100);
    return;
  }
  const wishBtn = e.target.closest("[data-quick-wish]");
  if (wishBtn) {
    const id = wishBtn.dataset.quickWish;
    toggleWishlist(id);
    const saved = wishlist.includes(id);
    wishBtn.classList.toggle("saved", saved);
    wishBtn.textContent = saved ? "♥" : "♡";
  }
});

/* =====================================
   CART & WISHLIST STATE
===================================== */
function persistCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function persistWishlist() {
  localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  renderWishlist();
  renderProducts();
}

function toggleWishlist(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(x => x !== id);
    showToast(`Removed ${p.name} from favourites`);
  } else {
    wishlist.push(id);
    showToast(`Saved ${p.name} to favourites ♡`);
  }
  persistWishlist();
}

function addToCart(id, silent = false) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty = Math.min(20, existing.qty + 1);
  } else {
    cart.push({ id, qty: 1 });
  }
  persistCart();
  if (!silent) showToast(`${p.name} added to your bag`);
}

function totals() {
  let subtotal = 0;
  let discount = 0;
  for (const item of cart) {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (p) {
      subtotal += p.price * item.qty;
      discount += (p.price - discounted(p.price)) * item.qty;
    }
  }
  return { subtotal, discount, total: subtotal - discount };
}

function renderCart() {
  const count = cart.reduce((s, x) => s + x.qty, 0);
  byId("cartCount").textContent = count;

  byId("cartLines").innerHTML = cart.length
    ? cart.map(x => {
        const p = PRODUCTS.find(y => y.id === x.id);
        return `
          <div class="cart-line">
            <img class="cart-thumb" src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
            <div class="cart-line-info">
              <b>${p.name}</b>
              <small>${money(discounted(p.price))} each</small>
              <button class="remove-line" type="button" data-remove="${p.id}">Remove</button>
            </div>
            <div class="qty-controls">
              <button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Decrease">−</button>
              <span>${x.qty}</span>
              <button type="button" data-qty="${p.id}" data-delta="1" aria-label="Increase">+</button>
            </div>
          </div>
        `;
      }).join("")
    : '<p class="empty-cart">Your bag is empty — explore our glosses & lip care to get glowing.</p>';

  const t = totals();
  byId("cartSubtotal").textContent = money(t.subtotal);
  byId("cartDiscount").textContent = "−" + money(t.discount);
  byId("cartTotal").textContent = money(t.total);
  byId("checkoutButton").disabled = !cart.length;

  const itemPreview = byId("checkoutItemCount");
  const totalPreview = byId("checkoutTotalPreview");
  if (itemPreview) itemPreview.textContent = `${count} ${count === 1 ? "item" : "items"}`;
  if (totalPreview) totalPreview.textContent = `Total: ${money(t.total)}`;
}

function renderWishlist() {
  const badge = byId("wishlistCount");
  if (badge) {
    badge.textContent = wishlist.length;
    badge.hidden = wishlist.length === 0;
  }

  byId("wishlistLines").innerHTML = wishlist.length
    ? wishlist.map(id => {
        const p = PRODUCTS.find(y => y.id === id);
        if (!p) return "";
        return `
          <div class="cart-line">
            <img class="cart-thumb" src="${p.image}" alt="${p.name}" onerror="this.style.display='none'">
            <div class="cart-line-info">
              <b>${p.name}</b>
              <small>${money(discounted(p.price))}</small>
              <button class="remove-line" type="button" data-wish-remove="${p.id}">Remove</button>
            </div>
            <button class="combo-add-btn" type="button" data-wish-to-bag="${p.id}">Move to bag</button>
          </div>
        `;
      }).join("")
    : '<p class="empty-cart">No saved favourites yet. Tap ♡ on any product card to save it here.</p>';
}

/* =====================================
   DRAWERS
===================================== */
function closeAllDrawers() {
  document.body.classList.remove("cart-open", "wishlist-open");
  byId("cartDrawer").setAttribute("aria-hidden", "true");
  byId("wishlistDrawer").setAttribute("aria-hidden", "true");
}

function openCart() {
  closeAllDrawers();
  document.body.classList.add("cart-open");
  byId("cartDrawer").setAttribute("aria-hidden", "false");
}

function openWishlist() {
  closeAllDrawers();
  document.body.classList.add("wishlist-open");
  byId("wishlistDrawer").setAttribute("aria-hidden", "false");
}

/* =====================================
   EVENT LISTENERS
===================================== */
byId("productGrid").addEventListener("click", e => {
  const wish = e.target.closest("[data-wish]");
  if (wish) {
    e.stopPropagation();
    toggleWishlist(wish.dataset.wish);
    return;
  }
  const view = e.target.closest("[data-view]");
  if (view) {
    openProductView(view.dataset.view);
    return;
  }
  const add = e.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add);
    add.textContent = "Added ✓";
    add.classList.add("added");
    setTimeout(() => {
      add.textContent = "Add to bag";
      add.classList.remove("added");
    }, 950);
  }
});

document.querySelectorAll("[data-combo]").forEach(btn => {
  btn.addEventListener("click", () => {
    const ids = btn.dataset.combo.split(",");
    ids.forEach(id => addToCart(id.trim(), true));
    showToast("Signature Lip Combo added to your bag ✨");
    openCart();
  });
});

byId("cartLines").addEventListener("click", e => {
  const rm = e.target.closest("[data-remove]");
  if (rm) {
    cart = cart.filter(x => x.id !== rm.dataset.remove);
    persistCart();
    return;
  }
  const q = e.target.closest("[data-qty]");
  if (q) {
    const item = cart.find(x => x.id === q.dataset.qty);
    if (item) {
      item.qty += Number(q.dataset.delta);
      if (item.qty < 1) cart = cart.filter(x => x.id !== item.id);
      persistCart();
    }
  }
});

byId("wishlistLines").addEventListener("click", e => {
  const rm = e.target.closest("[data-wish-remove]");
  if (rm) {
    toggleWishlist(rm.dataset.wishRemove);
    return;
  }
  const move = e.target.closest("[data-wish-to-bag]");
  if (move) {
    addToCart(move.dataset.wishToBag);
    openCart();
  }
});

byId("filters").addEventListener("click", e => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  activeFilter = b.dataset.filter;
  document.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x === b));
  renderProducts();
});

byId("sortSelect").addEventListener("change", e => {
  activeSort = e.target.value;
  renderProducts();
});

byId("searchInput").addEventListener("input", renderProducts);
byId("cartTrigger").addEventListener("click", openCart);
byId("wishlistTrigger").addEventListener("click", openWishlist);
byId("closeCart").addEventListener("click", closeAllDrawers);
byId("closeWishlist").addEventListener("click", closeAllDrawers);
byId("drawerBackdrop").addEventListener("click", closeAllDrawers);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAllDrawers();
});

/* CHECKOUT */
byId("checkoutButton").addEventListener("click", () => {
  closeAllDrawers();
  byId("checkoutDialog").showModal();
});

byId("closeCheckout").addEventListener("click", () => byId("checkoutDialog").close());

byId("checkoutForm").addEventListener("submit", async e => {
  e.preventDefault();
  const button = byId("payButton");
  const msg = byId("checkoutMessage");

  button.disabled = true;
  button.textContent = "Preparing secure checkout…";
  msg.textContent = "";

  try {
    const form = new FormData(e.currentTarget);
    const customer = Object.fromEntries(form.entries());

    const response = await fetch("/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, items: cart })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not start payment.");

    window.location.href = data.authorization_url;
  } catch (err) {
    msg.textContent = err.message || "Something went wrong. Please try again.";
    button.disabled = false;
    button.textContent = "Pay securely with Paystack ↗";
  }
});

/* NEWSLETTER */
byId("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  byId("newsletterMessage").textContent = "You're on the list! Stay tuned for new shade drops ♡";
  showToast("Welcome to the Gloss Bar list ♡");
  e.currentTarget.reset();
});

/* MOBILE MENU & SCROLL EFFECTS */
byId("menuToggle").addEventListener("click", () => {
  const nav = byId("mainNav");
  const open = nav.classList.toggle("open");
  byId("menuToggle").setAttribute("aria-expanded", String(open));
});

byId("mainNav").addEventListener("click", e => {
  if (e.target.tagName === "A") {
    byId("mainNav").classList.remove("open");
    byId("menuToggle").setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  byId("siteHeader").classList.toggle("scrolled", y > 12);
  byId("backToTop").classList.toggle("visible", y > 450);
}, { passive: true });

byId("backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
byId("year").textContent = new Date().getFullYear();

/* =====================================
   NOTIFICATIONS & OWNER PANEL
===================================== */
(() => {
  const bell = byId("notificationTrigger");
  const dialog = byId("notificationDialog");
  const closeButton = byId("closeNotifications");
  const list = byId("notificationList");
  const count = byId("notificationCount");

  const ownerLogin = byId("showOwnerLogin");
  const ownerPanel = byId("ownerPanel");
  const ownerToken = byId("ownerToken");
  const ownerTitle = byId("notificationTitle");
  const ownerMessage = byId("notificationMessageInput");
  const publishButton = byId("publishNotification");
  const ownerStatus = byId("ownerStatus");
  const ownerList = byId("ownerNotificationList");
  const logoutButton = byId("ownerLogout");

  let notifications = [];
  let seenIds = new Set();
  let firstLoad = true;

  try {
    const saved = localStorage.getItem(NOTIF_SEEN_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) seenIds = new Set(parsed.map(String));
    }
  } catch (_) {}

  function saveSeenNotifications() {
    try {
      localStorage.setItem(NOTIF_SEEN_KEY, JSON.stringify([...seenIds]));
    } catch (_) {}
  }

  function updateBadge() {
    const unread = notifications.filter(item => !seenIds.has(String(item.id))).length;
    count.textContent = unread > 99 ? "99+" : String(unread);
    count.hidden = unread === 0;
  }

  function markNotificationsAsRead() {
    notifications.forEach(item => seenIds.add(String(item.id)));
    saveSeenNotifications();
    updateBadge();
  }

  async function loadNotifications() {
    try {
      const response = await fetch("/api/notifications", { method: "GET", cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load notifications.");
      const data = await response.json();
      notifications = Array.isArray(data.notifications) ? data.notifications : [];

      if (firstLoad) {
        if (localStorage.getItem(NOTIF_SEEN_KEY) === null) markNotificationsAsRead();
        firstLoad = false;
      }
      if (dialog.open) markNotificationsAsRead();
      else updateBadge();

      renderNotifications();
    } catch (_) {
      if (firstLoad) {
        list.innerHTML = '<p class="notification-empty">Announcements are temporarily unavailable.</p>';
      }
    }
  }

  function renderNotifications() {
    if (!notifications.length) {
      list.innerHTML = '<p class="notification-empty">No announcements yet. Check back soon! ♡</p>';
      renderOwnerList();
      return;
    }
    list.innerHTML = "";
    notifications.forEach(n => {
      const card = document.createElement("article");
      card.className = "notification-card";
      const h = document.createElement("h3");
      h.textContent = n.title || "Announcement";
      const p = document.createElement("p");
      p.textContent = n.message || "";
      const d = document.createElement("span");
      d.className = "notification-date";
      const created = new Date(n.created_at);
      d.textContent = Number.isNaN(created.getTime()) ? "" : created.toLocaleString();
      card.append(h, p, d);
      list.appendChild(card);
    });
    renderOwnerList();
  }

  function renderOwnerList() {
    ownerList.innerHTML = "";
    notifications.forEach(n => {
      const card = document.createElement("div");
      card.className = "notification-card";
      const h = document.createElement("h3");
      h.textContent = n.title || "Announcement";
      const rm = document.createElement("button");
      rm.className = "owner-delete";
      rm.type = "button";
      rm.textContent = "Delete notification";
      rm.addEventListener("click", async () => {
        if (!confirm("Delete this notification?")) return;
        await ownerRequest("DELETE", { id: n.id });
      });
      card.append(h, rm);
      ownerList.appendChild(card);
    });
  }

  async function ownerRequest(method, body) {
    const token = ownerToken.value.trim();
    if (!token) {
      ownerStatus.textContent = "Enter your private owner token first.";
      return;
    }
    ownerStatus.textContent = "Please wait...";
    try {
      const response = await fetch("/api/notifications", {
        method,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Request failed.");
      ownerStatus.textContent = method === "POST" ? "Announcement published!" : "Notification deleted.";
      if (method === "POST") {
        ownerTitle.value = "";
        ownerMessage.value = "";
      }
      await loadNotifications();
    } catch (err) {
      ownerStatus.textContent = err.message;
    }
  }

  bell.addEventListener("click", async () => {
    dialog.showModal();
    markNotificationsAsRead();
    await loadNotifications();
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
  ownerLogin.addEventListener("click", () => {
    ownerPanel.classList.remove("owner-hidden");
    ownerLogin.classList.add("owner-hidden");
  });
  publishButton.addEventListener("click", () => {
    ownerRequest("POST", { title: ownerTitle.value, message: ownerMessage.value });
  });
  logoutButton.addEventListener("click", () => {
    ownerToken.value = "";
    ownerTitle.value = "";
    ownerMessage.value = "";
    ownerStatus.textContent = "";
    ownerPanel.classList.add("owner-hidden");
    ownerLogin.classList.remove("owner-hidden");
  });

  loadNotifications();
  setInterval(loadNotifications, 15000);
})();

/* INITIALIZE */
renderProducts();
renderCart();
renderWishlist();
