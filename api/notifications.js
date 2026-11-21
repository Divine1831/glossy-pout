const { createClient } = require("@supabase/supabase-js");

function getDatabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase configuration is incomplete.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const db = getDatabase();

    if (req.method === "GET") {
      const { data, error } = await db
        .from("notifications")
        .select("id,title,message,created_at")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw error;

      return res.status(200).json({ notifications: data });
    }

    const adminToken = process.env.NOTIFICATIONS_ADMIN_TOKEN;
    const suppliedToken = req.headers.authorization || "";

    if (!adminToken || suppliedToken !== `Bearer ${adminToken}`) {
      return res.status(401).json({ error: "Owner access required." });
    }

    if (req.method === "POST") {
      const title = String(req.body?.title || "").trim();
      const message = String(req.body?.message || "").trim();

      if (title.length < 2 || title.length > 100 ||
          message.length < 2 || message.length > 1000) {
        return res.status(400).json({
          error: "Enter a title and message within the allowed length."
        });
      }

      const { data, error } = await db
        .from("notifications")
        .insert({ title, message, is_published: true })
        .select("id,title,message,created_at")
        .single();

      if (error) throw error;

      return res.status(201).json({ notification: data });
    }

    if (req.method === "DELETE") {
      const id = String(req.body?.id || "");

      if (!/^[0-9a-f-]{36}$/i.test(id)) {
        return res.status(400).json({ error: "Invalid notification ID." });
      }

      const { data, error } = await db
        .from("notifications")
        .delete()
        .eq("id", id)
        .select("id")
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ error: "Notification not found." });
      }

      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", "GET, POST, DELETE");
    return res.status(405).json({ error: "Method not allowed." });

  } catch (error) {
    console.error("Notifications API:", error.message);
    return res.status(500).json({
      error: "Unable to process notifications right now."
    });
  }
};
