/* MANUEL EMPIRE storefront. Live catalogue stays empty until real product listings and stock are supplied. */
const ME_PRODUCTS = [
 {id:"joggers-01",name:"JOGGERS 01",category:"Unisex",type:"Joggers",section:"joggers",images:["1.JPG","2.JPG","3.JPG","4.JPG"],description:"A closer look at this MANUEL EMPIRE joggers piece.",sizes:["M","L","XL"],colors:["Gray","Black","White","Pink"]},
 {id:"joggers-02",name:"JOGGERS 02",category:"Unisex",type:"Joggers",section:"joggers",images:["13.JPG"],description:"A closer look at this MANUEL EMPIRE joggers piece.",sizes:["M","L","XL"],colors:["Gray","Black","White","Pink"]},
 {id:"joggers-03",name:"JOGGERS 03",category:"Unisex",type:"Joggers",section:"joggers",images:["14.JPG"],description:"A closer look at this MANUEL EMPIRE joggers piece.",sizes:["M","L","XL"],colors:["Gray","Black","White","Pink"]},
 {id:"joggers-04",name:"JOGGERS 04",category:"Unisex",type:"Joggers",section:"joggers",images:["16.JPG","18.JPG"],description:"A closer look at this MANUEL EMPIRE joggers piece.",sizes:["M","L","XL"],colors:["Gray","Black","White","Pink"]},
 {id:"joggers-05",name:"JOGGERS 05",category:"Unisex",type:"Joggers",section:"joggers",images:["17.JPG"],description:"A closer look at this MANUEL EMPIRE joggers piece.",sizes:["M","L","XL"],colors:["Gray","Black","White","Pink"]},
 {id:"jeans-01",name:"JEANS 01",category:"Men",type:"Jeans",section:"jeans",images:["5.JPG","6.JPG"],description:"A closer look at this MANUEL EMPIRE denim piece.",sizes:["Confirm size"],colors:["As pictured"]},
 {id:"jeans-02",name:"JEANS 02",category:"Men",type:"Jeans",section:"jeans",images:["7.JPG","8.JPG"],description:"A closer look at this MANUEL EMPIRE denim piece.",sizes:["Confirm size"],colors:["As pictured"]},
 {id:"jeans-03",name:"JEANS 03",category:"Men",type:"Jeans",section:"jeans",images:["9.JPG","11.JPG"],description:"A closer look at this MANUEL EMPIRE denim piece.",sizes:["Confirm size"],colors:["As pictured"]},
 {id:"jeans-04",name:"JEANS 04",category:"Men",type:"Jeans",section:"jeans",images:["10.JPG"],description:"A closer look at this MANUEL EMPIRE denim piece.",sizes:["Confirm size"],colors:["As pictured"]},
 {id:"jeans-05",name:"JEANS 05",category:"Men",type:"Jeans",section:"jeans",images:["12.JPG"],description:"A closer look at this MANUEL EMPIRE denim piece.",sizes:["Confirm size"],colors:["As pictured"]}
];
const ME_CART_KEY = "manuel-empire-cart-v1";
const meMoney = value => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);
let meMemoryCart = [];
const meReadCart = () => { try { const saved=localStorage.getItem(ME_CART_KEY); return saved ? JSON.parse(saved) : meMemoryCart; } catch { return meMemoryCart; } };
const meWriteCart = cart => { meMemoryCart=cart; try { localStorage.setItem(ME_CART_KEY,JSON.stringify(cart)); } catch {} meUpdateCartCount(); };
const meUpdateCartCount = () => {
  const count = meReadCart().filter(item=>ME_PRODUCTS.some(product=>product.id===item.id)).reduce((sum,item)=>sum+item.qty,0);
  document.querySelectorAll("[data-cart-count]").forEach(el=>{el.textContent=count;el.hidden=count===0;});
};
const meAddToCart = (productId,size,color) => {
  const product=ME_PRODUCTS.find(item=>item.id===productId); if(!product)return;
  const cart=meReadCart(); const found=cart.find(item=>item.id===productId&&item.size===size&&item.color===color);
  if(found)found.qty+=1; else cart.push({id:productId,size,color,qty:1});
  meWriteCart(cart);
  const notice=document.querySelector("[data-store-notice]");
  if(notice){notice.textContent=product.name+" added to your bag.";notice.classList.add("is-visible");window.setTimeout(()=>notice.classList.remove("is-visible"),2600);}
};
const meProductCard = product => `
<article class="shop-card" data-category="${product.category.toLowerCase()}" data-name="${product.name.toLowerCase()}" data-gallery-images="${product.images.join("|")}">
  <div class="shop-image">
    <img src="${product.images[0]}" alt="${product.name}" loading="lazy" data-gallery-image data-gallery-index="0">
    ${product.images.length>1?'<button class="gallery-arrow gallery-prev" type="button" data-gallery-step="-1" aria-label="Previous product image">‹</button><button class="gallery-arrow gallery-next" type="button" data-gallery-step="1" aria-label="Next product image">›</button><span class="gallery-count" data-gallery-count>1 / '+product.images.length+'</span>':''}
    <span class="image-tag">MANUEL EMPIRE</span>
    <button class="wishlist-button" type="button" data-wishlist="${product.id}" aria-label="Add ${product.name} to wishlist" aria-pressed="false">♡</button>
  </div>
  <div class="shop-card-info">
    <div class="shop-card-heading">
      <p class="shop-category">${product.category} / ${product.type}</p>
      <h3>${product.name}</h3>
      <p class="shop-price">Price on request</p>
    </div>
    <p class="shop-description">${product.description}</p>
    <div class="product-options">
      <label>Size<select class="option-size">${product.sizes.map(size=>`<option>${size}</option>`).join("")}</select></label>
      <div class="colour-picker"><span class="colour-label">Colour</span><div class="colour-swatches" role="group" aria-label="Choose a colour">${product.colors.map((color,index)=>`<button type="button" class="colour-swatch${index===0?" is-selected":""}" data-color="${color}" aria-label="${color}" aria-pressed="${index===0}" title="${color}"><span class="swatch-dot swatch-${color.toLowerCase()}"></span><span class="swatch-name">${color}</span></button>`).join("")}</div><select class="option-color" aria-label="Selected colour" tabindex="-1">${product.colors.map(color=>`<option>${color}</option>`).join("")}</select></div>
    </div>
    <button type="button" class="gold-button add-to-bag" data-id="${product.id}">Add to bag <span aria-hidden="true">＋</span></button>
  </div>
</article>`;
const meRenderShop = () => {
  const grid=document.querySelector("[data-shop-grid]"); if(!grid)return;
  const filter=document.querySelector("[data-shop-filter]")?.value||"all";
  const type=document.querySelector("[data-shop-type]")?.value||"all";
  const section=grid.dataset.shopSection||"";
  const query=(document.querySelector("[data-shop-search]")?.value||"").trim().toLowerCase();
  const shown=ME_PRODUCTS.filter(p=>(filter==="all"||p.category.toLowerCase()===filter)&&(type==="all"||p.type.toLowerCase()===type)&&(!section||p.section===section)&&(!query||(p.name+" "+p.category+" "+p.type).toLowerCase().includes(query)));
  grid.innerHTML=shown.map(meProductCard).join("") || (ME_PRODUCTS.length===0 ? '<div class="empty-shop"><span class="empty-shop-kicker">MANUEL EMPIRE · THE COLLECTION</span><h3>The next edit is being prepared.</h3><p>Our collection is being carefully curated. Contact us on WhatsApp for current availability and enquiries.</p><a class="gold-button" href="https://wa.me/2349042833912" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></div>' : '<p class="empty-shop">No pieces match that search. Try another term.</p>');
};
const meRenderCart = () => {
  const host=document.querySelector("[data-cart-items]"); if(!host)return;
  const cart=meReadCart().filter(item=>ME_PRODUCTS.some(product=>product.id===item.id));
  if(cart.length!==meReadCart().length)meWriteCart(cart);
  if(!cart.length){host.innerHTML='<div class="empty-bag"><p class="eyebrow">YOUR BAG</p><h2>Your bag is waiting.</h2><p>Find the pieces that feel like you.</p><a class="gold-button" href="collection.html">Discover the collection</a></div>';document.querySelector("[data-cart-summary]")?.setAttribute("hidden","");return;}
  document.querySelector("[data-cart-summary]")?.removeAttribute("hidden");
  host.innerHTML=cart.map((item,index)=>{const p=ME_PRODUCTS.find(product=>product.id===item.id);if(!p)return "";return `
  <article class="bag-item"><img src="${p.images[0]}" alt="${p.name}"><div class="bag-info"><p class="shop-category">${p.category} · ${p.type}</p><h3>${p.name}</h3><p>Size: ${item.size} <span>·</span> Colour: ${item.color}</p><strong>Price to be confirmed</strong><div class="quantity-control"><button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button><button type="button" class="remove-item" data-remove="${index}">Remove</button></div></div></article>`;}).join("");
};
const meOrderText = (details) => {
 const cart=meReadCart();
 const lines=cart.map(item=>{const p=ME_PRODUCTS.find(product=>product.id===item.id);return p?`${p.name} | Size ${item.size} | ${item.color} | Qty ${item.qty}`:"";}).filter(Boolean);
 return ["MANUEL EMPIRE — ORDER REQUEST","",...lines,"","Customer: "+details.name,"Phone: "+details.phone,"Delivery address: "+details.address,"Payment method: BANK TRANSFER",details.note?"Note: "+details.note:"","Please confirm availability, final prices and delivery charges, then send verified bank transfer details. I will transfer only after receiving the confirmed total and payment instructions."].filter(Boolean).join("\n");
};
const ME_WISHLIST_KEY = "manuel-empire-wishlist-v1";
let meMemoryWishlist = [];
const meReadWishlist = () => { try{return JSON.parse(localStorage.getItem(ME_WISHLIST_KEY)||"[]");}catch{return meMemoryWishlist;} };
const meToggleWishlist = (id,button) => {
 const saved=meReadWishlist(), exists=saved.includes(id);
 const next=exists?saved.filter(item=>item!==id):[...saved,id];
 meMemoryWishlist=next; try{localStorage.setItem(ME_WISHLIST_KEY,JSON.stringify(next));}catch{}
 button.classList.toggle("is-saved",!exists);
 button.setAttribute("aria-pressed",String(!exists));
 button.textContent=!exists?"♥":"♡";
};
document.addEventListener("click",event=>{
 const heart=event.target.closest("[data-wishlist]");
 if(heart){meToggleWishlist(heart.dataset.wishlist,heart);return;}
 const house=event.target.closest("[data-house-filter]");
 if(house){const filter=document.querySelector("[data-shop-filter]");if(filter){filter.value=house.dataset.houseFilter;meRenderShop();}}

 const swatch=event.target.closest(".colour-swatch");
 if(swatch){const picker=swatch.closest(".colour-picker");const select=picker?.querySelector(".option-color");if(select){select.value=swatch.dataset.color;picker.querySelectorAll(".colour-swatch").forEach(button=>{const active=button===swatch;button.classList.toggle("is-selected",active);button.setAttribute("aria-pressed",String(active));});}return;}
 const add=event.target.closest(".add-to-bag");
 if(add){const card=add.closest(".shop-card");meAddToCart(add.dataset.id,card.querySelector(".option-size").value,card.querySelector(".option-color").value);}
 const qty=event.target.closest("[data-qty]");
 if(qty){const cart=meReadCart(),i=Number(qty.dataset.index);if(cart[i]){cart[i].qty+=Number(qty.dataset.qty);if(cart[i].qty<1)cart.splice(i,1);meWriteCart(cart);meRenderCart();}}
 const remove=event.target.closest("[data-remove]");
 if(remove){const cart=meReadCart();cart.splice(Number(remove.dataset.remove),1);meWriteCart(cart);meRenderCart();}
});
document.addEventListener("DOMContentLoaded",()=>{
 meUpdateCartCount();meRenderShop();meRenderCart();
 const requestedCategory=new URLSearchParams(location.search).get("category");
 if(requestedCategory && ["men","women"].includes(requestedCategory)){const selector=document.querySelector("[data-shop-filter]");if(selector){selector.value=requestedCategory;meRenderShop();}}
 document.querySelector("[data-shop-filter]")?.addEventListener("change",meRenderShop);
 document.querySelector("[data-shop-type]")?.addEventListener("change",meRenderShop);
 document.querySelector("[data-shop-search]")?.addEventListener("input",meRenderShop);
 document.querySelectorAll("[data-wishlist]").forEach(button=>{const saved=meReadWishlist().includes(button.dataset.wishlist);button.classList.toggle("is-saved",saved);button.setAttribute("aria-pressed",String(saved));button.textContent=saved?"♥":"♡";});
 const form=document.querySelector("[data-order-form]");
 form?.addEventListener("submit",event=>{
   event.preventDefault();
   if(!meReadCart().length)return;
   if(!form.reportValidity())return;
   const data=new FormData(form);
   const orderText=meOrderText({name:data.get("name"),phone:data.get("phone"),address:data.get("address"),note:data.get("note")});
   const status=document.querySelector("[data-order-status]");
   const whatsappUrl="https://wa.me/2349042833912?text="+encodeURIComponent(orderText);
   const opened=window.open(whatsappUrl,"_blank");
   if(opened){try{opened.opener=null;}catch{}
     status.textContent="Your order is ready in WhatsApp. Review the message and tap Send to place your request.";
     status.classList.add("is-visible");
   }else{
     const area=document.querySelector("[data-order-copy]");
     area.hidden=false;
     area.value=orderText;
     area.focus();
     area.select();
     status.textContent="WhatsApp could not open automatically. Copy this order message and send it to 09042833912.";
     status.classList.add("is-visible");
   }
 });
});
