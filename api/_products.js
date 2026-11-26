const PRODUCTS = {
  "moisturizing-lip-balm": { name: "Moisturizing Lip Balm", price: 200000 },
  "cherry-pop": { name: "Cherry Pop", price: 300000 },
  "candy-cloud": { name: "Candy Cloud", price: 300000 },
  "mystic-glow": { name: "Mystic Glow", price: 300000 },
  "peach-perfect": { name: "Peach Perfect", price: 300000 },
  "bare-essence": { name: "Bare Essence", price: 300000 },
  "lipcare-kit": { name: "Lipcare Kit", price: 300000 },
  "clear-lipgloss": { name: "Clear Lipgloss", price: 300000 },
  "lip-scrub": { name: "Lip Scrub", price: 150000 },
  "starlight": { name: "Starlight", price: 300000 },
  "choco-royale": { name: "Choco Royale", price: 300000 },
  "pink-lip-balm": { name: "Pink Lip Balm", price: 300000 },
  "lip-brush": { name: "Lip Brush", price: 50000 },
  "black-lip-liner": { name: "Black Lip Liner", price: 120000 },
  "brown-lip-liner": { name: "Brown Lip Liner", price: 120000 },
  "burgundy-lip-liner": { name: "Burgundy Lip Liner", price: 120000 }
};

function calculate(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 30) {
    throw new Error("Your cart is empty or contains too many items.");
  }

  let subtotal = 0;
  let discount = 0;
  const clean = [];

  for (const item of items) {
    const p = PRODUCTS[item.id];
    const qty = Number(item.qty);

    if (!p) throw new Error("A product in your cart is not recognised.");
    if (!Number.isInteger(qty) || qty < 1 || qty > 20) {
      throw new Error("Please check product quantities.");
    }

    const line = p.price * qty;
    const reduced = Math.round(p.price * 0.9) * qty;

    subtotal += line;
    discount += line - reduced;

    clean.push({
      id: item.id,
      name: p.name,
      quantity: qty,
      unit_price_kobo: p.price,
      discounted_unit_price_kobo: Math.round(p.price * 0.9)
    });
  }

  return { clean, subtotal, discount, total: subtotal - discount };
}

module.exports = { calculate };
