const { createClient } = require("@supabase/supabase-js");
function config() {
  const required = ["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","PAYSTACK_SECRET_KEY"];
  const missing = required.filter(k=>!process.env[k]);
  if(missing.length) throw new Error("Server configuration is incomplete: "+missing.join(", "));
}
function supabase() {
  config();
  return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
}
module.exports={config,supabase};