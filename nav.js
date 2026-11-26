/* MANUEL EMPIRE category pop-out navigation */
(()=>{
 
 const style=document.createElement("style");
 style.textContent=`
 .category-popout{position:fixed;z-index:45;display:flex;flex-direction:row;align-items:flex-start;gap:18px;min-width:0;padding:0;background:transparent;border:0;box-shadow:none;opacity:0;visibility:hidden;transform:translateY(-9px);transition:opacity .28s ease,transform .28s ease,visibility .28s ease}
 .category-popout .category-choice{display:flex;flex-direction:column;align-items:center;gap:7px;width:86px;padding:0;color:#171613;background:transparent;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:.16em}
 .category-popout .category-choice img{display:block;width:78px;height:88px;object-fit:cover;filter:grayscale(100%);border:1px solid rgba(197,162,101,.7)}
 .category-popout .category-choice span{color:#d2b477;text-shadow:0 1px 5px rgba(0,0,0,.18)}
 body.categories-open .category-popout{opacity:1;visibility:visible;transform:translateY(0)}
 @media(max-width:700px){.category-popout{gap:12px}.category-popout .category-choice{width:72px;font-size:9px}.category-popout .category-choice img{width:66px;height:76px}}
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
 panel.innerHTML='<a class="category-choice" href="collection.html?category=men#shop"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80" alt=""><span>MEN</span></a><a class="category-choice" href="collection.html?category=women#shop"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" alt=""><span>WOMEN</span></a>';
 document.body.append(overlay,panel);
 const close=()=>{document.body.classList.remove("categories-open");trigger.setAttribute("aria-expanded","false");};
 const toggle=()=>{
  const open=!document.body.classList.contains("categories-open");
  if(open){
   const r=trigger.getBoundingClientRect();
   panel.style.top=Math.min(window.innerHeight-130,r.bottom+10)+"px";
   panel.style.left=Math.max(12,nav.getBoundingClientRect().left)+"px";
   document.body.classList.add("categories-open");
   trigger.setAttribute("aria-expanded","true");
  }else close();
 };
 trigger.addEventListener("click",event=>{event.preventDefault();toggle();});
 trigger.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle();}});
 overlay.addEventListener("click",close);
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
 panel.addEventListener("click",event=>{if(event.target.closest("a"))close();});
 window.addEventListener("resize",()=>{if(document.body.classList.contains("categories-open")){const r=trigger.getBoundingClientRect();panel.style.top=Math.min(window.innerHeight-130,r.bottom+10)+"px";panel.style.left=Math.max(12,nav.getBoundingClientRect().left)+"px";}});
})();
