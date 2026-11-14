const crypto = require("crypto");
const {supabase}=require("./_config");
const {calculate}=require("./_products");
module.exports=async function handler(req,res){
 if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
 try{
  const {customer,items}=req.body||{};
  const name=String(customer?.customer_name||"").trim(),email=String(customer?.customer_email||"").trim(),phone=String(customer?.customer_phone||"").trim(),address=String(customer?.delivery_address||"").trim();
  if(name.length<2||name.length>100||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>160||phone.length<7||phone.length>25||address.length<8||address.length>500) return res.status(400).json({error:"Please enter valid name, email, phone and delivery address."});
  const order=calculate(items);
  const reference="GP_"+crypto.randomBytes(16).toString("hex");
  const orderNumber="GP-"+Date.now().toString(36).toUpperCase();
  const db=supabase();
  const {error:insertError}=await db.from("orders").insert({
   order_number:orderNumber,customer_name:name,customer_email:email,customer_phone:phone,delivery_address:address,
   items:order.clean,subtotal_kobo:order.subtotal,discount_kobo:order.discount,total_kobo:order.total,
   currency:"NGN",payment_reference:reference,payment_status:"pending"
  });
  if(insertError) throw new Error("Could not save your order. Please try again.");
  const paystack=await fetch("https://api.paystack.co/transaction/initialize",{
   method:"POST",headers:{"Authorization":"Bearer "+process.env.PAYSTACK_SECRET_KEY,"Content-Type":"application/json"},
   body:JSON.stringify({email,amount:order.total,currency:"NGN",reference,callback_url:process.env.PAYSTACK_CALLBACK_URL||undefined,metadata:{order_number:orderNumber,custom_fields:[{display_name:"Order Number",variable_name:"order_number",value:orderNumber}]}})
  });
  const data=await paystack.json();
  if(!paystack.ok||!data.status||!data.data?.authorization_url) throw new Error("Paystack could not start checkout. Please try again later.");
  return res.status(200).json({authorization_url:data.data.authorization_url,reference});
 }catch(e){console.error("create-payment:",e.message);return res.status(400).json({error:e.message||"Unable to create checkout."});}
};