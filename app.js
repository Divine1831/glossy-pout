const PRODUCTS = [
  {id:"moisturizing-lip-balm",name:"Moisturizing Lip Balm",type:"care",kind:"balm",price:1500,desc:"Everyday lip care"},
  {id:"cherry-pop",name:"Cherry Pop",type:"gloss",kind:"gloss",price:3000,desc:"A bold red lip gloss"},
  {id:"candy-cloud",name:"Candy Cloud",type:"gloss",kind:"gloss",price:3000,desc:"A soft pink lip gloss"},
  {id:"mystic-glow",name:"Mystic Glow",type:"gloss",kind:"gloss",price:3000,desc:"Colour-changing lip gloss"},
  {id:"peach-perfect",name:"Peach Perfect",type:"gloss",kind:"gloss",price:3000,desc:"A peachy nude lip gloss"},
  {id:"lipcare-kit",name:"Lipcare Kit",type:"care",kind:"balm",price:3000,desc:"A little care bundle"},
  {id:"clear-lipgloss",name:"Clear Lipgloss",type:"gloss",kind:"gloss",price:2500,desc:"A clear glossy finish"},
  {id:"lip-scrub",name:"Lip Scrub",type:"care",kind:"scrub",price:1500,desc:"A lip-care essential"},
  {id:"starlight",name:"Starlight",type:"gloss",kind:"gloss",price:3000,desc:"A glittery lip gloss"},
  {id:"choco-royale",name:"Choco Royale",type:"gloss",kind:"gloss",price:3000,desc:"A rich brown lip gloss"},
  {id:"pink-lip-balm",name:"Pink Lip Balm",type:"care",kind:"balm",price:3000,desc:"A touch of pink care"},
  {id:"lip-brush",name:"Lip Brush",type:"tools",kind:"tool",price:3000,desc:"A handy lip tool"},
  {id:"black-lip-liner",name:"Black Lip Liner",type:"liner",kind:"liner",price:1500,desc:"Define your look"},
  {id:"brown-lip-liner",name:"Brown Lip Liner",type:"liner",kind:"liner",price:1500,desc:"Define your look"},
  {id:"burgundy-lip-liner",name:"Burgundy Lip Liner",type:"liner",kind:"liner",price:1500,desc:"Define your look"}
];

const DISCOUNT = 0.10;
const money = n => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);
const byId = id => document.getElementById(id);
let activeFilter = "all";
let cart = JSON.parse(localStorage.getItem("glossyPoutCart") || "[]");
const safeCart = () => cart.filter(x => PRODUCTS.some(p=>p.id===x.id) && Number.isInteger(x.qty) && x.qty>0);
cart = safeCart();
function discounted(price){return Math.round(price*(1-DISCOUNT));}
function renderProducts(){
 const q=byId("searchInput").value.trim().toLowerCase();
 const list=PRODUCTS.filter(p=>(activeFilter==="all"||p.type===activeFilter)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)));
 byId("productGrid").innerHTML=list.length?list.map(p=>{
  const available=p.price!==null, final=available?discounted(p.price):null;
  return `<article class="product-card"><div class="product-visual">${available?'<span class="discount-tag">10% OFF</span>':''}<div class="product-art ${p.kind}">${p.kind==="gloss"?"GLOSSY<br>POUT":p.kind==="liner"?"GP":p.kind==="tool"?"GP":p.kind==="scrub"?"LIP<br>SCRUB":"LIP<br>CARE"}</div></div><h3 class="product-name">${p.name}</h3><p class="product-type">${p.type==="gloss"?"Lip gloss":p.type==="care"?"Lip care":p.type==="liner"?"Lip liner":"Beauty tool"}</p><p class="product-type">${p.desc}</p><div class="price-row">${available?`<span class="price-now">${money(final)}</span><span class="price-old">${money(p.price)}</span>`:'<span class="price-soon">Price coming soon</span>'}</div><div class="product-actions"><button class="add-button" data-add="${p.id}" ${available?"":"disabled"}>${available?"Add to bag":"Coming soon"}</button></div></article>`;
 }).join(""):'<p class="no-results">No products match your search. Try another name.</p>';
}
function persist(){localStorage.setItem("glossyPoutCart",JSON.stringify(cart));renderCart();}
function totals(){
 let subtotal=0,discount=0;
 for(const item of cart){const p=PRODUCTS.find(x=>x.id===item.id);if(p&&p.price!==null){subtotal+=p.price*item.qty;discount+=(p.price-discounted(p.price))*item.qty;}}
 return {subtotal,discount,total:subtotal-discount};
}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);byId("cartCount").textContent=count;
 byId("cartLines").innerHTML=cart.length?cart.map(x=>{const p=PRODUCTS.find(y=>y.id===x.id);return `<div class="cart-line"><div><b>${p.name}</b><small>${money(discounted(p.price))} each</small><button class="remove-line" data-remove="${p.id}">Remove</button></div><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase">+</button></div></div>`}).join(""):'<p class="empty-cart">Your bag is waiting for a little shine.</p>';
 const t=totals();byId("cartSubtotal").textContent=money(t.subtotal);byId("cartDiscount").textContent="−"+money(t.discount);byId("cartTotal").textContent=money(t.total);byId("checkoutButton").disabled=!cart.length;
}
function openCart(){document.body.classList.add("cart-open");byId("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.body.classList.remove("cart-open");byId("cartDrawer").setAttribute("aria-hidden","true");}
byId("productGrid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=b.dataset.add;const p=PRODUCTS.find(x=>x.id===id);if(!p||p.price===null)return;const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});persist();b.textContent="Added ✓";setTimeout(()=>b.textContent="Add to bag",900);});
byId("cartLines").addEventListener("click",e=>{const rm=e.target.closest("[data-remove]");if(rm){cart=cart.filter(x=>x.id!==rm.dataset.remove);persist();return;}const q=e.target.closest("[data-qty]");if(q){const item=cart.find(x=>x.id===q.dataset.qty);if(item){item.qty+=Number(q.dataset.delta);if(item.qty<1)cart=cart.filter(x=>x.id!==item.id);persist();}}});
byId("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts();});
byId("searchInput").addEventListener("input",renderProducts);
byId("cartTrigger").addEventListener("click",openCart);byId("closeCart").addEventListener("click",closeCart);byId("drawerBackdrop").addEventListener("click",closeCart);
byId("checkoutButton").addEventListener("click",()=>{closeCart();byId("checkoutDialog").showModal();});
byId("closeCheckout").addEventListener("click",()=>byId("checkoutDialog").close());
byId("checkoutForm").addEventListener("submit",async e=>{
 e.preventDefault();const button=byId("payButton"),msg=byId("checkoutMessage");button.disabled=true;button.textContent="Preparing secure checkout…";msg.textContent="";
 try{
  const form=new FormData(e.currentTarget);const customer=Object.fromEntries(form.entries());
  const response=await fetch("/api/create-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customer,items:cart})});
  const data=await response.json();if(!response.ok)throw new Error(data.error||"Could not start payment.");
  window.location.href=data.authorization_url;
 }catch(err){msg.textContent=err.message||"Something went wrong. Please try again.";button.disabled=false;button.textContent="Pay securely with Paystack ↗";}
});
byId("newsletterForm").addEventListener("submit",e=>{e.preventDefault();byId("newsletterMessage").textContent="Thanks for your interest! Newsletter sign-up will be available soon.";e.currentTarget.reset();});
byId("menuToggle").addEventListener("click",()=>{const nav=byId("mainNav"),open=nav.classList.toggle("open");byId("menuToggle").setAttribute("aria-expanded",String(open));});
byId("year").textContent=new Date().getFullYear();renderProducts();renderCart();
