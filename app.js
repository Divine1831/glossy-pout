
const PRODUCTS = [
  {
    id: "moisturizing-lip-balm",
    name: "Moisturizing Lip Balm",
    type: "care",
    kind: "balm",
    price: 1500,
    desc: "Everyday lip care",
    image: "https://drive.google.com/thumbnail?id=1MncZOaldo6wVPgB35RSHegO9WkrOwSpN&sz=w1000"
  },
  {
    id: "cherry-pop",
    name: "Cherry Pop",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "A bold red lip gloss",
    image: "https://drive.google.com/thumbnail?id=1ErqSBrclazr4dqiYbOJKEtTspC2A7lt7&sz=w1000"
  },
  {
    id: "candy-cloud",
    name: "Candy Cloud",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "A soft pink lip gloss",
    image: "https://drive.google.com/thumbnail?id=1UXIzZa5Y6hMhDGvf09AMS7e02sk5HCCE&sz=w1000"
  },
  {
    id: "mystic-glow",
    name: "Mystic Glow",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "Colour-changing lip gloss",
    image: "https://drive.google.com/thumbnail?id=1JBi8jnnfVecCypWUAI2OfAf4nOepvcYT&sz=w1000"
  },
  {
    id: "peach-perfect",
    name: "Peach Perfect",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "A peachy nude lip gloss",
    image: "https://drive.google.com/thumbnail?id=1ZrUW2i8BZ9cCG0pbwfo9NJOZ29cb8cf5&sz=w1000"
  },
  {
    id: "lipcare-kit",
    name: "Lipcare Kit",
    type: "care",
    kind: "balm",
    price: 3000,
    desc: "A little care bundle",
    image: "https://drive.google.com/thumbnail?id=1BeLzFGNgsSPn0rqMqln2mo-ernIzN96d&sz=w1000"
  },
  {
    id: "clear-lipgloss",
    name: "Clear Lipgloss",
    type: "gloss",
    kind: "gloss",
    price: 2500,
    desc: "A clear glossy finish",
    image: "https://drive.google.com/thumbnail?id=1LEAVRbTRGy2ZzyVGzB1UV1u1BAykK9pN&sz=w1000"
  },
  {
    id: "lip-scrub",
    name: "Lip Scrub",
    type: "care",
    kind: "scrub",
    price: 1500,
    desc: "A lip-care essential",
    image: "https://drive.google.com/thumbnail?id=1-FJzzBqAiNgpQUyKTNeW62h6esowxXIL&sz=w1000"
  },
  {
    id: "starlight",
    name: "Starlight",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "A glittery lip gloss",
    image: "https://drive.google.com/thumbnail?id=1f_bFx8Ia3Ugc13OKS4lYwXNxqgvsIJ3u&sz=w1000"
  },
  {
    id: "choco-royale",
    name: "Choco Royale",
    type: "gloss",
    kind: "gloss",
    price: 3000,
    desc: "A rich brown lip gloss",
    image: "https://drive.google.com/thumbnail?id=1-uSs_jhNr7AkKuBiqtkRoWlPwXeRBw5g&sz=w1000"
  },
  {
    id: "pink-lip-balm",
    name: "Pink Lip Balm",
    type: "care",
    kind: "balm",
    price: 3000,
    desc: "A touch of pink care",
    image: "https://drive.google.com/thumbnail?id=1b8a5isC9p2cZzb1b-kqvYZ5UZshoq8Or&sz=w1000"
  },
  {
    id: "lip-brush",
    name: "Lip Brush",
    type: "tools",
    kind: "tool",
    price: 3000,
    desc: "A handy lip tool",
    image: "https://drive.google.com/thumbnail?id=1PKuWCqYOT9RVLw4Ti6yBr2348wJjPV7L&sz=w1000"
  },
  {
    id: "black-lip-liner",
    name: "Black Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1500,
    desc: "Define your look",
    image: "https://drive.google.com/thumbnail?id=1BhtYq6kqAjct1jQoFqA093el5ZUi70BN&sz=w1000"
  },
  {
    id: "brown-lip-liner",
    name: "Brown Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1500,
    desc: "Define your look",
    image: "https://drive.google.com/thumbnail?id=1J4nlfgTb832ron0wyqq7hWZnGRrQiH9-&sz=w1000"
  },
  {
    id: "burgundy-lip-liner",
    name: "Burgundy Lip Liner",
    type: "liner",
    kind: "liner",
    price: 1500,
    desc: "Define your look",
    image: "https://drive.google.com/thumbnail?id=16ahT3Y-jiOaxzUUHA8BfJe5ZhjpagOUK&sz=w1000"
  }
];

const DISCOUNT = 0.10;

const money = n => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
}).format(n);

const byId = id => document.getElementById(id);

let activeFilter = "all";
let cart = JSON.parse(localStorage.getItem("glossyPoutCart") || "[]");

const safeCart = () => cart.filter(x =>
  PRODUCTS.some(p => p.id === x.id) &&
  Number.isInteger(x.qty) &&
  x.qty > 0
);

cart = safeCart();

function discounted(price) {
  return Math.round(price * (1 - DISCOUNT));
}

/* =====================================
   PRODUCT QUICK VIEW POP-UP
===================================== */

const quickViewStyle = document.createElement("style");

quickViewStyle.textContent = `
  #productQuickView {
    position: fixed;
    width: min(92%, 520px);
    max-width: 520px;
    max-height: 90vh;
    padding: 0;
    border: none;
    border-radius: 22px;
    overflow: auto;
    background: #fff;
    color: #29202a;
    box-shadow: 0 20px 70px rgba(0,0,0,.3);
  }

  #productQuickView::backdrop {
    background: rgba(20, 10, 20, .72);
    backdrop-filter: blur(5px);
  }

  .quick-view-image {
    width: 100%;
    height: 360px;
    object-fit: contain;
    background: #fff5f8;
    display: block;
  }

  .quick-view-content {
    padding: 22px;
  }

  .quick-view-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: white;
    color: #333;
    font-size: 25px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,.12);
  }

  .quick-view-content h2 {
    margin: 0 0 8px;
    font-size: 25px;
  }

  .quick-view-content p {
    color: #777;
    margin: 8px 0;
  }

  .quick-view-price {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0;
    font-size: 22px;
    font-weight: 700;
    color: #d94f83;
  }

  .quick-view-old {
    color: #999;
    text-decoration: line-through;
    font-size: 15px;
    font-weight: 400;
  }

  .quick-view-discount {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 20px;
    background: #ffe6ef;
    color: #c13b70;
    font-size: 12px;
    font-weight: 700;
  }

  .quick-view-add {
    width: 100%;
    padding: 15px;
    border: 0;
    border-radius: 12px;
    background: #d94f83;
    color: white;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background .2s ease;
  }

  .quick-view-add:hover {
    background: #bd356b;
  }

  .product-visual,
  .product-name {
    cursor: pointer;
  }

  .product-visual img {
    cursor: zoom-in;
  }

  @media (max-width: 480px) {
    #productQuickView {
      width: 94%;
      border-radius: 18px;
    }

    .quick-view-image {
      height: 290px;
    }

    .quick-view-content {
      padding: 18px;
    }
  }
`;

document.head.appendChild(quickViewStyle);

const quickView = document.createElement("dialog");
quickView.id = "productQuickView";

quickView.innerHTML = `
  <button
    class="quick-view-close"
    type="button"
    aria-label="Close product details"
  >×</button>

  <div id="quickViewDetails"></div>
`;

document.body.appendChild(quickView);

function openProductView(id) {
  const p = PRODUCTS.find(x => x.id === id);

  if (!p) return;

  const finalPrice = discounted(p.price);

  byId("quickViewDetails").innerHTML = `
    <img
      class="quick-view-image"
      src="${p.image}"
      alt="${p.name}"
    >

    <div class="quick-view-content">
      <span class="quick-view-discount">10% OFF</span>

      <h2>${p.name}</h2>

      <p>${p.desc}</p>

      <div class="quick-view-price">
        ${money(finalPrice)}
        <span class="quick-view-old">${money(p.price)}</span>
      </div>

      <button
        class="quick-view-add"
        type="button"
        data-quick-add="${p.id}"
      >
        Add to bag
      </button>
    </div>
  `;

  quickView.showModal();
}

quickView.querySelector(".quick-view-close").addEventListener("click", () => {
  quickView.close();
});

quickView.addEventListener("click", e => {
  if (e.target === quickView) {
    quickView.close();
  }
});

/* =====================================
   RENDER PRODUCTS
===================================== */

function renderProducts() {
  const q = byId("searchInput").value.trim().toLowerCase();

  const list = PRODUCTS.filter(p =>
    (activeFilter === "all" || p.type === activeFilter) &&
    (p.name.toLowerCase().includes(q) ||
     p.desc.toLowerCase().includes(q))
  );

  byId("productGrid").innerHTML = list.length
    ? list.map(p => {
        const available = p.price !== null;
        const final = available ? discounted(p.price) : null;

        return `
          <article class="product-card">

            <div class="product-visual" data-view="${p.id}">
              ${available ? '<span class="discount-tag">10% OFF</span>' : ''}

              <img
                class="product-photo"
                src="${p.image || ''}"
                alt="${p.name}"
                loading="lazy"
                style="width:100%;height:220px;object-fit:contain;display:${p.image ? 'block' : 'none'}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              >

              <div
                class="product-art ${p.kind}"
                style="display:${p.image ? 'none' : 'flex'}"
              >
                ${
                  p.kind === "gloss" ? "GLOSSY<br>POUT" :
                  p.kind === "liner" ? "GP" :
                  p.kind === "tool" ? "GP" :
                  p.kind === "scrub" ? "LIP<br>SCRUB" :
                  "LIP<br>CARE"
                }
              </div>
            </div>

            <h3 class="product-name" data-view="${p.id}">
              ${p.name}
            </h3>

            <p class="product-type">
              ${
                p.type === "gloss" ? "Lip gloss" :
                p.type === "care" ? "Lip care" :
                p.type === "liner" ? "Lip liner" :
                "Beauty tool"
              }
            </p>

            <p class="product-type">${p.desc}</p>

            <div class="price-row">
              ${
                available
                  ? `<span class="price-now">${money(final)}</span>
                     <span class="price-old">${money(p.price)}</span>`
                  : '<span class="price-soon">Price coming soon</span>'
              }
            </div>

            <div class="product-actions">
              <button
                class="add-button"
                data-add="${p.id}"
                ${available ? "" : "disabled"}
              >
                ${available ? "Add to bag" : "Coming soon"}
              </button>
            </div>

          </article>
        `;
      }).join("")
    : '<p class="no-results">No products match your search. Try another name.</p>';
}

/* =====================================
   CART FUNCTIONS
===================================== */

function persist() {
  localStorage.setItem("glossyPoutCart", JSON.stringify(cart));
  renderCart();
}

function totals() {
  let subtotal = 0;
  let discount = 0;

  for (const item of cart) {
    const p = PRODUCTS.find(x => x.id === item.id);

    if (p && p.price !== null) {
      subtotal += p.price * item.qty;
      discount += (p.price - discounted(p.price)) * item.qty;
    }
  }

  return {
    subtotal,
    discount,
    total: subtotal - discount
  };
}

function renderCart() {
  const count = cart.reduce((s, x) => s + x.qty, 0);

  byId("cartCount").textContent = count;

  byId("cartLines").innerHTML = cart.length
    ? cart.map(x => {
        const p = PRODUCTS.find(y => y.id === x.id);

        return `
          <div class="cart-line">
            <div>
              <b>${p.name}</b>
              <small>${money(discounted(p.price))} each</small>

              <button class="remove-line" data-remove="${p.id}">
                Remove
              </button>
            </div>

            <div class="qty-controls">
              <button data-qty="${p.id}" data-delta="-1" aria-label="Decrease">−</button>
              <span>${x.qty}</span>
              <button data-qty="${p.id}" data-delta="1" aria-label="Increase">+</button>
            </div>
          </div>
        `;
      }).join("")
    : '<p class="empty-cart">Your bag is waiting for a little shine.</p>';

  const t = totals();

  byId("cartSubtotal").textContent = money(t.subtotal);
  byId("cartDiscount").textContent = "−" + money(t.discount);
  byId("cartTotal").textContent = money(t.total);

  byId("checkoutButton").disabled = !cart.length;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);

  if (!p || p.price === null) return;

  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  persist();
}

/* =====================================
   CART DRAWER
===================================== */

function openCart() {
  document.body.classList.add("cart-open");
  byId("cartDrawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  byId("cartDrawer").setAttribute("aria-hidden", "true");
}

/* =====================================
   PRODUCT GRID EVENTS
===================================== */

byId("productGrid").addEventListener("click", e => {

  // Open product quick view
  const view = e.target.closest("[data-view]");

  if (view) {
    openProductView(view.dataset.view);
    return;
  }

  // Add product from normal product card
  const b = e.target.closest("[data-add]");

  if (!b) return;

  const id = b.dataset.add;

  addToCart(id);

  b.textContent = "Added ✓";

  setTimeout(() => {
    b.textContent = "Add to bag";
  }, 900);
});

/* =====================================
   ADD TO CART FROM QUICK VIEW
===================================== */

quickView.addEventListener("click", e => {
  const b = e.target.closest("[data-quick-add]");

  if (!b) return;

  const id = b.dataset.quickAdd;

  addToCart(id);

  b.textContent = "Added to bag ✓";
});

/* =====================================
   CART LINE EVENTS
===================================== */

byId("cartLines").addEventListener("click", e => {

  const rm = e.target.closest("[data-remove]");

  if (rm) {
    cart = cart.filter(x => x.id !== rm.dataset.remove);
    persist();
    return;
  }

  const q = e.target.closest("[data-qty]");

  if (q) {
    const item = cart.find(x => x.id === q.dataset.qty);

    if (item) {
      item.qty += Number(q.dataset.delta);

      if (item.qty < 1) {
        cart = cart.filter(x => x.id !== item.id);
      }

      persist();
    }
  }
});

/* =====================================
   FILTERS
===================================== */

byId("filters").addEventListener("click", e => {
  const b = e.target.closest("[data-filter]");

  if (!b) return;

  activeFilter = b.dataset.filter;

  document.querySelectorAll(".filter").forEach(x =>
    x.classList.toggle("active", x === b)
  );

  renderProducts();
});

/* =====================================
   SEARCH
===================================== */

byId("searchInput").addEventListener("input", renderProducts);

/* =====================================
   CART BUTTONS
===================================== */

byId("cartTrigger").addEventListener("click", openCart);

byId("closeCart").addEventListener("click", closeCart);

byId("drawerBackdrop").addEventListener("click", closeCart);

/* =====================================
   CHECKOUT
===================================== */

byId("checkoutButton").addEventListener("click", () => {
  closeCart();
  byId("checkoutDialog").showModal();
});

byId("closeCheckout").addEventListener("click", () =>
  byId("checkoutDialog").close()
);

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

    if (!response.ok) {
      throw new Error(data.error || "Could not start payment.");
    }

    window.location.href = data.authorization_url;

  } catch (err) {
    msg.textContent = err.message || "Something went wrong. Please try again.";

    button.disabled = false;
    button.textContent = "Pay securely with Paystack ↗";
  }
});

/* =====================================
   NEWSLETTER
===================================== */

byId("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();

  byId("newsletterMessage").textContent =
    "Thanks for your interest! Newsletter sign-up will be available soon.";

  e.currentTarget.reset();
});

/* =====================================
   MOBILE MENU
===================================== */

byId("menuToggle").addEventListener("click", () => {
  const nav = byId("mainNav");
  const open = nav.classList.toggle("open");

  byId("menuToggle").setAttribute("aria-expanded", String(open));
});

/* =====================================
   CURRENT YEAR
===================================== */

byId("year").textContent = new Date().getFullYear();

/* =====================================
   INITIAL RENDER
===================================== */

renderProducts();
renderCart();
