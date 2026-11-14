const crypto=require("crypto");
const {supabase}=require("./_config");
module.exports=async function handler(req,res){
 if(req.method!=="POST") return res.status(405).end();
 try{
  const raw=Buffer.isBuffer(req.body)?req.body:Buffer.from(JSON.stringify(req.body||{}));
  const signature=req.headers["x-paystack-signature"];
  const expected=crypto.createHmac("sha512",process.env.PAYSTACK_SECRET_KEY).update(raw).digest("hex");
  if(typeof signature!=="string"||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected))) return res.status(401).end();
  const event=JSON.parse(raw.toString("utf8"));
  if(event.event==="charge.success"){
   const tx=event.data,db=supabase();
   const {data:order}=await db.from("orders").select("id,total_kobo,currency,payment_status").eq("payment_reference",tx.reference).maybeSingle();
   if(order&&order.payment_status==="pending"&&tx.status==="success"&&Number(tx.amount)===Number(order.total_kobo)&&tx.currency===order.currency){
    await db.from("orders").update({payment_status:"paid",paystack_transaction_id:tx.id}).eq("id",order.id).eq("payment_status","pending");
   }
  }
  return res.status(200).json({received:true});
 }catch(e){console.error("paystack-webhook:",e.message);return res.status(400).end();}
};
module.exports.config={api:{bodyParser:false}};