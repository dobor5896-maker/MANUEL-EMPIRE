/* MANUEL EMPIRE category pop-out navigation */
(()=>{
 
 const style=document.createElement("style");
 style.textContent=`
.category-popout{position:fixed;z-index:45;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,3vw,30px) clamp(24px,5vw,54px);width:min(480px,calc(100vw - 112px));padding:0;background:transparent;border:0;box-shadow:none;opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .32s ease,transform .32s ease,visibility .32s ease}
.category-popout .category-choice{display:flex;align-items:center;justify-content:flex-start;min-height:42px;padding:4px 0;color:#fff;background:transparent;text-decoration:none;font-size:clamp(15px,2vw,19px);font-weight:800;letter-spacing:.12em;text-shadow:0 2px 10px rgba(0,0,0,.9);transition:color .2s ease,transform .2s ease}
.category-popout .category-choice:hover,.category-popout .category-choice:focus-visible{color:#e2c17f;transform:translateX(5px);outline:none}
body.categories-open .category-popout{opacity:1;visibility:visible;transform:translateY(0)}
@media(max-width:700px){.category-popout{width:calc(100vw - 104px);gap:14px 22px}.category-popout .category-choice{min-height:38px;font-size:clamp(13px,3.5vw,16px);letter-spacing:.09em}}
`;
 document.head.appendChild(style);

 /* Opening welcome / slide-to-enter experience */
 const navEntry = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
 if(navEntry && navEntry.type==="reload"){try{sessionStorage.removeItem("me-welcome-completed");}catch(e){}}
 let showWelcome=true;
 try{showWelcome=!sessionStorage.getItem("me-welcome-completed");}catch(e){}
 if(showWelcome){
  const welcomeStyle=document.createElement("style");
  welcomeStyle.textContent=`
  .me-welcome{position:fixed;inset:0;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;background:#000;color:#fff;opacity:1;visibility:visible;transition:opacity .85s cubic-bezier(.2,.7,.2,1),visibility .85s}
  .me-welcome.is-leaving{opacity:0;visibility:hidden;pointer-events:none}
  .me-welcome-brand{margin:0 0 18px;color:#d7b574;font-size:10px;font-weight:600;letter-spacing:.34em;text-transform:uppercase}
  .me-welcome-title{max-width:720px;margin:0;text-align:center;color:#fff;font-size:clamp(30px,7vw,66px);font-weight:700;letter-spacing:.055em;line-height:1.12;text-transform:uppercase}
  .me-welcome-title span{display:block;color:#d7b574}
  .me-welcome-instruction{margin:42px 0 18px;color:#fff;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase}
  .me-slide-track{position:relative;width:min(290px,78vw);height:64px;border:1px solid rgba(226,193,127,.34);border-radius:999px;background:linear-gradient(110deg,rgba(255,255,255,.075),rgba(255,255,255,.018) 48%,rgba(226,193,127,.045));box-shadow:inset 0 1px 1px rgba(255,255,255,.24),inset 0 -8px 18px rgba(255,255,255,.018),0 10px 32px rgba(0,0,0,.3),0 0 22px rgba(226,193,127,.055);overflow:hidden;backdrop-filter:blur(22px) saturate(185%);-webkit-backdrop-filter:blur(22px) saturate(185%)}
  .me-slide-track:before{content:"";position:absolute;inset:1px 2px auto;height:45%;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.19),rgba(255,255,255,.035) 55%,transparent);pointer-events:none}
  .me-slide-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding-left:34px;color:rgba(255,255,255,.7);font-size:9px;font-weight:650;letter-spacing:.2em;pointer-events:none;text-shadow:0 1px 5px rgba(0,0,0,.55)}
  .me-slide-range{position:absolute;inset:0;z-index:2;display:block;width:100%;height:100%;margin:0;appearance:none;-webkit-appearance:none;background:transparent;outline:none;cursor:grab;touch-action:pan-y}
  .me-slide-range:active{cursor:grabbing}
  .me-slide-range::-webkit-slider-runnable-track{height:100%;background:transparent}
  .me-slide-range::-moz-range-track{height:100%;background:transparent}
  .me-slide-range::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:56px;height:56px;margin-top:3px;border-radius:50%;border:1px solid rgba(255,255,255,.58);background:linear-gradient(145deg,rgba(255,255,255,.38),rgba(255,255,255,.13) 42%,rgba(226,193,127,.2) 100%);-webkit-backdrop-filter:blur(18px) saturate(210%);backdrop-filter:blur(18px) saturate(210%);box-shadow:inset 0 1px 2px rgba(255,255,255,.72),inset 0 -5px 10px rgba(255,255,255,.08),0 3px 14px rgba(0,0,0,.48),0 0 18px rgba(226,193,127,.22);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f5e4c2' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M13 6l6 6-6 6'/%3E%3C/svg%3E"),linear-gradient(145deg,rgba(255,255,255,.38),rgba(255,255,255,.13) 42%,rgba(226,193,127,.2) 100%);background-repeat:no-repeat;background-position:center;background-size:22px,cover}
  .me-slide-range::-moz-range-thumb{width:54px;height:54px;border-radius:50%;border:1px solid rgba(255,255,255,.58);background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f5e4c2' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14M13 6l6 6-6 6'/%3E%3C/svg%3E") center/22px no-repeat,linear-gradient(145deg,rgba(255,255,255,.38),rgba(255,255,255,.13) 42%,rgba(226,193,127,.2) 100%);backdrop-filter:blur(18px) saturate(210%);box-shadow:inset 0 1px 2px rgba(255,255,255,.72),inset 0 -5px 10px rgba(255,255,255,.08),0 3px 14px rgba(0,0,0,.48),0 0 18px rgba(226,193,127,.22)}
  .me-welcome-foot{margin-top:22px;color:rgba(255,255,255,.34);font-size:8px;letter-spacing:.24em;text-transform:uppercase}
  @media(prefers-reduced-motion:reduce){.me-welcome{transition:none}}
  `;
  document.head.appendChild(welcomeStyle);
  const welcome=document.createElement("section");
  welcome.className="me-welcome";
  welcome.setAttribute("role","dialog");
  welcome.setAttribute("aria-label","Welcome to MANUEL EMPIRE");
  welcome.innerHTML='<p class="me-welcome-brand">MANUEL EMPIRE</p><h1 class="me-welcome-title">WELCOME TO<span>MANUEL EMPIRE</span></h1><p class="me-welcome-instruction">SLIDE RIGHT TO ENTER</p><div class="me-slide-track"><span class="me-slide-label">SLIDE TO ENTER</span><input class="me-slide-range" type="range" min="0" max="100" value="0" aria-label="Slide right to enter the website"></div><p class="me-welcome-foot">WEAR YOUR IDENTITY</p>';
  document.body.appendChild(welcome);
  const slider=welcome.querySelector(".me-slide-range");
  let entered=false;
  const enter=()=>{
   if(entered)return;
   entered=true;
   try{sessionStorage.setItem("me-welcome-completed","1");}catch(e){}
   welcome.classList.add("is-leaving");
   window.setTimeout(()=>welcome.remove(),900);
  };
  slider.addEventListener("input",()=>{if(Number(slider.value)>=92)enter();});
  slider.addEventListener("change",()=>{if(Number(slider.value)>=80)enter();else slider.value=0;});
  slider.addEventListener("keydown",event=>{if(event.key==="Enter"&&Number(slider.value)>=80)enter();});
 }

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
 panel.innerHTML='<a class="category-choice" href="collection.html#shop">TSHIRT</a><a class="category-choice" href="collection.html#shop">HOODIES</a><a class="category-choice" href="collection.html#shop">JOGGERS</a><a class="category-choice" href="collection.html#shop">FULL FRAMES</a><a class="category-choice" href="collection.html#shop">JEAN SHORT</a><a class="category-choice" href="collection.html#shop">ARMLESS</a>';
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