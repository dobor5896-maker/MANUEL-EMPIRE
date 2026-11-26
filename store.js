/* MANUEL EMPIRE storefront. Product names/images are editorial starter entries; confirm actual stock and pricing before launch. */
const ME_PRODUCTS = [
  {
    "id": "me-001",
    "name": "Essential Heavyweight Tee",
    "category": "Men",
    "type": "Tops",
    "section": "tshirt",
    "description": "A clean everyday silhouette with a confident, easy fit.",
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Black",
      "White",
      "Stone"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "me-002",
    "name": "Modern Streetwear Set",
    "category": "Men",
    "type": "Sets",
    "description": "Relaxed streetwear styling for days that move at your pace.",
    "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Black",
      "Charcoal"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "me-003",
    "name": "Everyday Overshirt",
    "category": "Men",
    "type": "Shirts",
    "description": "A versatile layer that brings structure to everyday dressing.",
    "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "White",
      "Stone",
      "Olive"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "me-004",
    "name": "Signature Casual Look",
    "category": "Men",
    "type": "Tops",
    "description": "Understated styling with room for your own expression.",
    "image": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Cream",
      "Black"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "me-005",
    "name": "The Form Edit",
    "category": "Women",
    "type": "Tops",
    "description": "A considered everyday look with a modern, feminine shape.",
    "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Black",
      "Ivory",
      "Mocha"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "me-006",
    "name": "Effortless Statement",
    "category": "Women",
    "type": "Sets",
    "description": "An expressive outfit designed to feel as good as it looks.",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Ivory",
      "Stone"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ]
  },
  {
    "id": "me-007",
    "name": "The City Layer",
    "category": "Women",
    "type": "Outerwear",
    "description": "An easy layer for a polished look, from day into evening.",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "Black",
      "Camel"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "me-008",
    "name": "Daily Essential",
    "category": "Women",
    "type": "Tops",
    "description": "A versatile wardrobe staple with a clean finish.",
    "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    "colors": [
      "White",
      "Black",
      "Mocha"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ]
  }
];
const ME_CART_KEY = "manuel-empire-cart-v1";
const meMoney = value => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(value);
const meReadCart = () => { try { return JSON.parse(localStorage.getItem(ME_CART_KEY) || "[]"); } catch { return []; } };
const meWriteCart = cart => { localStorage.setItem(ME_CART_KEY,JSON.stringify(cart)); meUpdateCartCount(); };
const meUpdateCartCount = () => {
  const count = meReadCart().reduce((sum,item)=>sum+item.qty,0);
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
<article class="shop-card" data-category="${product.category.toLowerCase()}" data-name="${product.name.toLowerCase()}">
  <div class="shop-image">
    <img src="${product.image}" alt="${product.name}" loading="lazy">
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
      <label>Colour<select class="option-color">${product.colors.map(color=>`<option>${color}</option>`).join("")}</select></label>
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
  grid.innerHTML=shown.map(meProductCard).join("")||(section?'<p class="empty-shop">No pieces have been added to this edit yet.</p>':'<p class="empty-shop">No pieces match that search. Try another term.</p>');
};
const meRenderCart = () => {
  const host=document.querySelector("[data-cart-items]"); if(!host)return;
  const cart=meReadCart();
  if(!cart.length){host.innerHTML='<div class="empty-bag"><p class="eyebrow">YOUR BAG</p><h2>Your bag is waiting.</h2><p>Find the pieces that feel like you.</p><a class="gold-button" href="collection.html">Discover the collection</a></div>';document.querySelector("[data-cart-summary]")?.setAttribute("hidden","");return;}
  document.querySelector("[data-cart-summary]")?.removeAttribute("hidden");
  host.innerHTML=cart.map((item,index)=>{const p=ME_PRODUCTS.find(product=>product.id===item.id);if(!p)return "";return `
  <article class="bag-item"><img src="${p.image}" alt="${p.name}"><div class="bag-info"><p class="shop-category">${p.category} · ${p.type}</p><h3>${p.name}</h3><p>Size: ${item.size} <span>·</span> Colour: ${item.color}</p><strong>Price to be confirmed</strong><div class="quantity-control"><button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button><button type="button" class="remove-item" data-remove="${index}">Remove</button></div></div></article>`;}).join("");
};
const meOrderText = (details) => {
 const cart=meReadCart();
 const lines=cart.map(item=>{const p=ME_PRODUCTS.find(product=>product.id===item.id);return p?`${p.name} | Size ${item.size} | ${item.color} | Qty ${item.qty}`:"";}).filter(Boolean);
 return ["MANUEL EMPIRE — ORDER REQUEST","",...lines,"","Customer: "+details.name,"Phone: "+details.phone,"Delivery address: "+details.address,details.note?"Note: "+details.note:"","Please confirm availability, final prices and delivery details."].filter(Boolean).join("\n");
};
const ME_WISHLIST_KEY = "manuel-empire-wishlist-v1";
const meReadWishlist = () => { try{return JSON.parse(localStorage.getItem(ME_WISHLIST_KEY)||"[]");}catch{return [];} };
const meToggleWishlist = (id,button) => {
 const saved=meReadWishlist(), exists=saved.includes(id);
 const next=exists?saved.filter(item=>item!==id):[...saved,id];
 localStorage.setItem(ME_WISHLIST_KEY,JSON.stringify(next));
 button.classList.toggle("is-saved",!exists);
 button.setAttribute("aria-pressed",String(!exists));
 button.textContent=!exists?"♥":"♡";
};
document.addEventListener("click",event=>{
 const heart=event.target.closest("[data-wishlist]");
 if(heart){meToggleWishlist(heart.dataset.wishlist,heart);return;}
 const house=event.target.closest("[data-house-filter]");
 if(house){const filter=document.querySelector("[data-shop-filter]");if(filter){filter.value=house.dataset.houseFilter;meRenderShop();}}

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
 form?.addEventListener("submit",async event=>{
   event.preventDefault();if(!meReadCart().length)return;
   const data=new FormData(form);const text=meOrderText({name:data.get("name"),phone:data.get("phone"),address:data.get("address"),note:data.get("note")});
   const status=document.querySelector("[data-order-status]");
   try{await navigator.clipboard.writeText(text);status.textContent="Your order request has been copied. Paste it into your preferred messaging app to send it to MANUEL EMPIRE.";status.classList.add("is-visible");}
   catch{const area=document.querySelector("[data-order-copy]");area.hidden=false;area.value=text;area.focus();area.select();status.textContent="Copy the order details below and send them to MANUEL EMPIRE.";status.classList.add("is-visible");}
 });
});
