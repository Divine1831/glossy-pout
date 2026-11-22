const {supabase}=require("./_config");
module.exports=async function handler(req,res){
 if(req.method!=="GET") return res.status(405).json({error:"Method not allowed"});
 const reference=String(req.query.reference||"");
 if(!/^GP_[a-f0-9]{32}$/.test(reference)) return res.status(400).json({error:"Invalid payment reference."});
 try{
  const db=supabase();
  const {data:order,error}=await db.from("orders").select("id,total_kobo,currency,payment_status").eq("payment_reference",reference).single();
  if(error||!order) return res.status(404).json({error:"Order not found."});
  if(order.payment_status==="paid") return res.status(200).json({status:"paid"});
  const check=await fetch("https://api.paystack.co/transaction/verify/"+encodeURIComponent(reference),{headers:{"Authorization":"Bearer "+process.env.PAYSTACK_SECRET_KEY}});
  const result=await check.json(),tx=result.data;
  if(!check.ok||!result.status||!tx||tx.status!=="success"||tx.amount!==Number(order.total_kobo)||tx.currency!==order.currency||tx.reference!==reference){
   return res.status(200).json({status:"pending",message:"Payment has not been confirmed yet. If you paid, please wait a moment and refresh this page."});
  }
  const {error:updateError}=await db.from("orders").update({payment_status:"paid",paystack_transaction_id:tx.id}).eq("id",order.id).eq("payment_status","pending");
  if(updateError) throw new Error("Could not update order status.");
  return res.status(200).json({status:"paid"});
 }catch(e){console.error("verify-payment:",e.message);return res.status(500).json({error:"Could not verify payment right now."});}
};