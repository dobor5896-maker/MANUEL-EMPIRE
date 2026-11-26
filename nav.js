/* MANUEL EMPIRE category pop-out navigation */
(()=>{
 
 const style=document.createElement("style");
 style.textContent=`
 .category-popout{
  position:fixed;z-index:45;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));
  gap:clamp(14px,2.4vw,30px);width:min(650px,calc(100vw - 125px));
  padding:0;background:transparent;border:0;box-shadow:none;
  opacity:0;visibility:hidden;transform:translateY(-12px);
  transition:opacity .32s ease,transform .32s ease,visibility .32s ease
 }
 .category-popout .category-choice{
  min-width:0;display:flex;flex-direction:column;align-items:center;text-align:center;
  gap:10px;padding:0;color:inherit;background:transparent;text-decoration:none
 }
 .category-popout .category-choice img{
  display:block;width:100%;height:clamp(105px,16vw,180px);object-fit:cover;
  filter:grayscale(100%);border:1px solid rgba(197,162,101,.5)
 }
 .category-popout .category-choice h3{
  margin:2px 0 0;color:var(--gold,#c5a265);font-size:clamp(13px,1.7vw,20px);
  font-weight:500;letter-spacing:.14em
 }
 .category-popout .category-choice p{
  margin:0;color:inherit;font-size:clamp(9px,1vw,12px);line-height:1.5;opacity:.78
 }
 .category-popout .category-choice .shop-category-link{
  display:inline-flex;align-items:center;gap:8px;margin-top:3px;padding:7px 14px;
  border:1px solid rgba(197,162,101,.65);border-radius:999px;
  color:var(--gold,#c5a265);font-size:clamp(9px,1vw,12px);letter-spacing:.12em;
  transition:background .2s,color .2s
 }
 .category-popout .category-choice:hover .shop-category-link{background:#c5a265;color:#111}
 body.categories-open .category-popout{opacity:1;visibility:visible;transform:translateY(0)}
 @media(max-width:700px){
  .category-popout{width:calc(100vw - 92px);gap:10px}
  .category-popout .category-choice{gap:7px}
  .category-popout .category-choice img{height:clamp(95px,28vw,140px)}
  .category-popout .category-choice h3{font-size:12px}
  .category-popout .category-choice p{font-size:8px}
  .category-popout .category-choice .shop-category-link{font-size:8px;padding:6px 9px}
 }
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
