const PRODUCTS = {
 "moisturizing-lip-balm":{name:"Moisturizing Lip Balm",price:150000},
 "cherry-pop":{name:"Cherry Pop",price:null},
 "candy-cloud":{name:"Candy Cloud",price:300000},
 "mystic-glow":{name:"Mystic Glow",price:null},
 "peach-perfect":{name:"Peach Perfect",price:null},
 "lipcare-kit":{name:"Lipcare Kit",price:null},
 "clear-lipgloss":{name:"Clear Lipgloss",price:250000},
 "lip-scrub":{name:"Lip Scrub",price:150000},
 "starlight":{name:"Starlight",price:null},
 "choco-royale":{name:"Choco Royale",price:300000},
 "pink-lip-balm":{name:"Pink Lip Balm",price:null},
 "lip-brush":{name:"Lip Brush",price:null},
 "black-lip-liner":{name:"Black Lip Liner",price:null},
 "brown-lip-liner":{name:"Brown Lip Liner",price:null},
 "burgundy-lip-liner":{name:"Burgundy Lip Liner",price:null}
};
function calculate(items){
 if(!Array.isArray(items)||items.length<1||items.length>30) throw new Error("Your cart is empty or contains too many items.");
 let subtotal=0, discount=0; const clean=[];
 for(const item of items){
  const p=PRODUCTS[item.id],qty=Number(item.qty);
  if(!p) throw new Error("A product in your cart is not recognised.");
  if(!Number.isInteger(qty)||qty<1||qty>20) throw new Error("Please check product quantities.");
  if(p.price===null) throw new Error(p.name+" price is not available yet. Please remove it from your bag.");
  const line=p.price*qty, reduced=Math.round(p.price*0.9)*qty;
  subtotal+=line;discount+=line-reduced;
  clean.push({id:item.id,name:p.name,quantity:qty,unit_price_kobo:p.price,discounted_unit_price_kobo:Math.round(p.price*0.9)});
 }
 return {clean,subtotal,discount,total:subtotal-discount};
}
module.exports={calculate};