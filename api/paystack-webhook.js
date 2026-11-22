
const crypto = require("crypto");
const { supabase } = require("./_config");

async function getRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Buffer.from(req.body);

  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;

    if (size > 1024 * 1024) {
      throw new Error("Webhook payload too large.");
    }

    chunks.push(buffer);
  }

  return Buffer.concat(chunks);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret) {
      console.error("Paystack secret is missing.");
      return res.status(500).end();
    }

    // Read the exact original request bytes.
    const raw = await getRawBody(req);

    const signature = req.headers["x-paystack-signature"];

    if (
      typeof signature !== "string" ||
      !/^[a-f0-9]{128}$/i.test(signature)
    ) {
      return res.status(401).end();
    }

    const expected = crypto
      .createHmac("sha512", secret)
      .update(raw)
      .digest();

    const supplied = Buffer.from(signature, "hex");

    if (!crypto.timingSafeEqual(supplied, expected)) {
      return res.status(401).end();
    }

    const event = JSON.parse(raw.toString("utf8"));

    if (event.event === "charge.success") {
      const tx = event.data;

      if (
        !tx ||
        !tx.reference ||
        tx.status !== "success" ||
        !Number.isSafeInteger(Number(tx.amount)) ||
        !tx.id
      ) {
        return res.status(200).json({ received: true });
      }

      const db = supabase();

      const { data: order, error: lookupError } = await db
        .from("orders")
        .select("id,total_kobo,currency,payment_status")
        .eq("payment_reference", tx.reference)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (
        order &&
        order.payment_status === "pending" &&
        Number(tx.amount) === Number(order.total_kobo) &&
        tx.currency === order.currency
      ) {
        const { error: updateError } = await db
          .from("orders")
          .update({
            payment_status: "paid",
            paystack_transaction_id: tx.id
          })
          .eq("id", order.id)
          .eq("payment_status", "pending");

        if (updateError) throw updateError;
      }
    }

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error("Paystack webhook:", error.message);

    // Non-2xx response allows Paystack to retry.
    return res.status(500).json({
      error: "Webhook processing failed."
    });
  }
};

module.exports.config = {
  api: {
    bodyParser: false
  }
};
