/* MANUEL EMPIRE category pop-out navigation */
(()=>{
 
 const style=document.createElement("style");
 style.textContent=`
.category-popout{position:fixed;z-index:45;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(14px,2vw,24px);width:min(540px,calc(100vw - 112px));padding:0;background:transparent;border:0;box-shadow:none;opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .32s ease,transform .32s ease,visibility .32s ease}
.category-popout .category-choice{min-width:0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;padding:0;color:#fff;background:transparent;text-decoration:none}
.category-popout .category-choice img{display:block;width:100%;height:clamp(92px,10vw,126px);object-fit:cover;filter:grayscale(100%);border:1px solid rgba(197,162,101,.65)}
.category-popout .category-choice h3{margin:3px 0 0;color:#f0d7a5;font-size:clamp(15px,1.6vw,19px);font-weight:600;letter-spacing:.16em;text-shadow:0 2px 8px rgba(0,0,0,.8)}
.category-popout .category-choice p{margin:0;color:#fff;font-size:clamp(10px,.95vw,12px);line-height:1.55;font-weight:500;text-shadow:0 2px 7px rgba(0,0,0,.9);opacity:1}
.category-popout .category-choice .shop-category-link{display:inline-flex;align-items:center;gap:8px;margin-top:3px;padding:7px 15px;border:1px solid #d7b574;border-radius:999px;background:rgba(18,17,15,.72);color:#f0d7a5;font-size:10px;font-weight:700;letter-spacing:.13em;text-shadow:none;transition:background .2s,color .2s}
.category-popout .category-choice:hover .shop-category-link{background:#d7b574;color:#111}
body.categories-open .category-popout{opacity:1;visibility:visible;transform:translateY(0)}
@media(max-width:700px){.category-popout{width:calc(100vw - 94px);gap:10px}.category-popout .category-choice{gap:7px}.category-popout .category-choice img{height:clamp(78px,23vw,105px)}.category-popout .category-choice h3{font-size:14px}.category-popout .category-choice p{font-size:9px;line-height:1.4}.category-popout .category-choice .shop-category-link{font-size:8px;padding:6px 9px;gap:5px}}
 `;
 document.head.appendChild(style);

 const nav=document.querySelector(".side-nav");
 if(!nav)return;
 const links=[...nav.querySelectorAll(".nav-link")];
 if(links.length<4)return;
 links[0].href="index.html";
 links[0].setAttribute("aria-label","Home");
 links[0].title="Home";
 links[1].href="announcements.html";
 links[1].setAttribute("aria-label","Announcements");
 links[1].title="Announcements";
 const trigger=links[3];
 trigger.removeAttribute("href");
 trigger.setAttribute("role","button");
 trigger.setAttribute("tabindex","0");
 trigger.setAttribute("aria-label","Browse categories");
 trigger.title="Categories";
 trigger.setAttribute("aria-expanded","false");
 trigger.dataset.categoryToggle="true";
 const overlay=document.createElement("button");
 overlay.className="category-dim";
 overlay.type="button";
 overlay.setAttribute("aria-label","Close categories");
 const panel=document.createElement("div");
 panel.className="category-popout";
 panel.setAttribute("aria-label","Choose a collection");
 panel.innerHTML='<a class="category-choice" href="collection.html?category=men#shop"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85" alt="Men’s fashion"><h3>MEN</h3><p>Elevated everyday essentials.</p><span class="shop-category-link">SHOP MEN <b>→</b></span></a><a class="category-choice" href="collection.html?category=women#shop"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85" alt="Women’s fashion"><h3>WOMEN</h3><p>Effortless style, every day.</p><span class="shop-category-link">SHOP WOMEN <b>→</b></span></a>';
 document.body.append(overlay,panel);
 const close=()=>{document.body.classList.remove("categories-open");trigger.setAttribute("aria-expanded","false");};
 const toggle=()=>{
  const open=!document.body.classList.contains("categories-open");
  if(open){
   const r=trigger.getBoundingClientRect();
   panel.style.top=Math.min(window.innerHeight-250,r.bottom+12)+"px";
   panel.style.left=Math.max(82,nav.getBoundingClientRect().right+14)+"px";
   document.body.classList.add("categories-open");
   trigger.setAttribute("aria-expanded","true");
  }else close();
 };
 trigger.addEventListener("click",event=>{event.preventDefault();toggle();});
 trigger.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle();}});
 overlay.addEventListener("click",close);
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
 panel.addEventListener("click",event=>{if(event.target.closest("a"))close();});
 window.addEventListener("resize",()=>{if(document.body.classList.contains("categories-open")){const r=trigger.getBoundingClientRect();panel.style.top=Math.min(window.innerHeight-250,r.bottom+12)+"px";panel.style.left=Math.max(82,nav.getBoundingClientRect().right+14)+"px";}});
})();
