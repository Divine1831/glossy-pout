const { supabase } = require("./_config");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const orderNumber = String(req.body?.order_number || "").trim().toUpperCase();
    const email = String(req.body?.customer_email || "").trim().toLowerCase();

    if (!/^GP-[A-Z0-9]+$/.test(orderNumber) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        email.length > 160) {
      return res.status(400).json({ error: "Enter a valid order number and checkout email." });
    }

    const db = supabase();
    const { data: order, error } = await db
      .from("orders")
      .select("order_number,customer_email,payment_status,total_kobo,items")
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (error) throw error;

    // Return the same response for an unknown order and an email mismatch.
    if (!order || String(order.customer_email || "").trim().toLowerCase() !== email) {
      return res.status(404).json({ error: "We could not find an order matching those details." });
    }

    const safeItems = Array.isArray(order.items) ? order.items.map(item => ({
      name: String(item?.name || "Product").slice(0, 100),
      quantity: Math.max(0, Math.min(20, Number(item?.quantity) || 0))
    })) : [];

    return res.status(200).json({
      order_number: order.order_number,
      payment_status: order.payment_status,
      total_kobo: Number(order.total_kobo) || 0,
      items: safeItems
    });
  } catch (error) {
    console.error("track-order:", error.message);
    return res.status(500).json({ error: "Order tracking is temporarily unavailable. Please try again later." });
  }
};
