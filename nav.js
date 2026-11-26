/* MANUEL EMPIRE category pop-out navigation */
(()=>{
 
 const style=document.createElement("style");
 style.textContent=`
.category-dim{position:fixed;inset:0;z-index:44;border:0;padding:0;background:rgba(0,0,0,.58);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease}
body.categories-open .category-dim{opacity:1;visibility:visible}
.category-popout{position:fixed;z-index:45;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;width:min(820px,calc(100vw - 112px));padding:30px;background:rgba(10,10,9,.88);-webkit-backdrop-filter:blur(28px) saturate(145%);backdrop-filter:blur(28px) saturate(145%);border:1px solid rgba(216,181,109,.42);box-shadow:0 28px 80px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.10);border-radius:8px;opacity:0;visibility:hidden;transform:translate(-50%,-46%);transition:opacity .3s ease,transform .3s ease,visibility .3s ease}
.category-popout .category-choice{position:relative;display:flex;align-items:center;justify-content:center;min-height:68px;padding:16px 12px;color:rgba(255,255,255,.92);background:rgba(255,255,255,.035);border:1px solid rgba(216,181,109,.38);border-radius:4px;text-decoration:none;text-align:center;font-size:clamp(12px,1.3vw,15px);font-weight:700;letter-spacing:.16em;text-shadow:0 1px 8px rgba(0,0,0,.25);transition:background .24s ease,color .24s ease,border-color .24s ease,transform .24s ease,box-shadow .24s ease}
.category-popout .category-choice:hover,.category-popout .category-choice:focus-visible{color:#171613;background:#d8b56d;border-color:#ead3a5;box-shadow:0 8px 24px rgba(216,181,109,.16);transform:translateY(-2px);outline:none}
body.categories-open .category-popout{opacity:1;visibility:visible;transform:translate(-50%,-50%)}
@media(max-width:700px){.category-popout{grid-template-columns:repeat(2,minmax(0,1fr));width:calc(100vw - 78px);gap:10px;padding:18px;background:rgba(10,10,9,.91);border-radius:7px}.category-popout .category-choice{min-height:58px;padding:12px 7px;font-size:clamp(10px,3vw,13px);letter-spacing:.09em}}
`;


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
  .me-slide-track{position:relative;width:min(310px,80vw);height:68px;border-radius:999px;isolation:isolate;overflow:hidden;background:rgba(255,255,255,.012);border:0;box-shadow:inset 0 1px 1px rgba(255,255,255,.24),inset 0 -1px 2px rgba(255,255,255,.08),0 18px 38px rgba(0,0,0,.34);-webkit-backdrop-filter:blur(28px) saturate(115%);backdrop-filter:blur(28px) saturate(115%)}
  .me-slide-track:before{content:"";position:absolute;inset:1px;border-radius:inherit;z-index:0;background:radial-gradient(ellipse 42% 90% at 8% 0%,rgba(255,255,255,.22),transparent 72%),radial-gradient(ellipse 38% 70% at 88% 100%,rgba(255,255,255,.12),transparent 72%),linear-gradient(180deg,rgba(255,255,255,.095),transparent 28%,transparent 72%,rgba(255,255,255,.045));filter:blur(2px);pointer-events:none}
  .me-slide-track:after{content:"";position:absolute;z-index:2;top:-45%;bottom:-45%;left:-35%;width:25%;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.24),rgba(255,255,255,.06),transparent);filter:blur(7px);transform:rotate(12deg);animation:me-wet-glint 7s ease-in-out infinite;pointer-events:none}
  @keyframes me-wet-glint{0%,35%{left:-35%;opacity:0}48%{opacity:.8}72%,100%{left:115%;opacity:0}}
  .me-slide-track.is-moving:after{animation:none;opacity:.16}
  .me-slide-thumb{position:absolute;z-index:3;left:5px;top:5px;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;transform:translateX(var(--slide-x,0px));transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .2s;overflow:hidden;border:0;outline:0;background:radial-gradient(ellipse 75% 42% at 34% 8%,rgba(255,255,255,.52),transparent 70%),linear-gradient(155deg,rgba(255,255,255,.16),rgba(255,255,255,.018) 46%,rgba(255,255,255,.085));-webkit-backdrop-filter:blur(24px) saturate(115%);backdrop-filter:blur(24px) saturate(115%);box-shadow:inset 0 1.5px 2px rgba(255,255,255,.62),inset 0 -7px 12px rgba(255,255,255,.07),0 4px 16px rgba(0,0,0,.58)}
  .me-slide-thumb:before{content:"";position:absolute;inset:2px 4px 48% 4px;border-radius:50%;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.82),rgba(255,255,255,.2) 42%,transparent 78%);filter:blur(1.2px);pointer-events:none}
  .me-slide-thumb:after{content:"";position:absolute;inset:6px 4px 3px;border-radius:50%;background:linear-gradient(145deg,transparent 35%,rgba(255,255,255,.09),transparent 72%);filter:blur(2px);pointer-events:none}
  .me-slide-label{position:absolute;inset:0;z-index:1;display:flex;align-items:center;justify-content:center;padding-left:44px;color:rgba(255,255,255,.62);font-size:9px;font-weight:650;letter-spacing:.22em;pointer-events:none;text-shadow:0 1px 8px rgba(0,0,0,.8);transition:opacity .2s}
  .me-slide-track.is-moving .me-slide-label{opacity:.22}
  .me-slide-thumb{position:absolute;z-index:3;left:5px;top:5px;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;transform:translateX(var(--slide-x,0px));transition:transform .16s cubic-bezier(.2,.8,.2,1),box-shadow .2s;overflow:hidden;border:0;background:radial-gradient(ellipse at 32% 12%,rgba(255,255,255,.42),transparent 37%),linear-gradient(145deg,rgba(255,255,255,.23),rgba(255,255,255,.035) 43%,rgba(255,255,255,.085) 78%,rgba(255,255,255,.16));-webkit-backdrop-filter:blur(30px) saturate(150%);backdrop-filter:blur(30px) saturate(150%);box-shadow:inset 0 2px 3px rgba(255,255,255,.72),inset 0 -9px 14px rgba(255,255,255,.1),inset 5px 0 9px rgba(255,255,255,.06),0 5px 18px rgba(0,0,0,.7)}
  .me-slide-thumb:before{content:"";position:absolute;inset:2px 3px 44% 3px;border-radius:50%;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.98),rgba(255,255,255,.34) 34%,rgba(255,255,255,.04) 76%,transparent);filter:blur(.8px);pointer-events:none}
  .me-slide-thumb:after{content:none;}
  .me-slide-thumb svg{position:relative;z-index:2;width:21px;height:21px;fill:none;stroke:rgba(255,255,255,.92);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 1px 2px rgba(0,0,0,.45))}
  .me-slide-thumb:active{cursor:grabbing;box-shadow:inset 0 1.5px 2px rgba(255,255,255,.82),inset 0 -7px 12px rgba(255,255,255,.06),0 5px 20px rgba(0,0,0,.55)}
  .me-welcome-foot{margin-top:22px;color:rgba(255,255,255,.34);font-size:8px;letter-spacing:.24em;text-transform:uppercase}
  /* Clear, colourless wet-glass treatment: transparent body, bright optical rims. */
  .me-slide-track{
    background:rgba(255,255,255,.012)!important;
    border:1px solid rgba(255,255,255,.34)!important;
    box-shadow:inset 0 1px 1px rgba(255,255,255,.42),inset 0 -1px 1px rgba(255,255,255,.12),0 8px 24px rgba(0,0,0,.18)!important;
    -webkit-backdrop-filter:blur(18px) saturate(180%) contrast(108%)!important;
    backdrop-filter:blur(18px) saturate(180%) contrast(108%)!important;
  }
  .me-slide-track:before{
    inset:1px!important;
    background:linear-gradient(180deg,rgba(255,255,255,.19),rgba(255,255,255,.035) 13%,transparent 43%,rgba(255,255,255,.025) 82%,rgba(255,255,255,.12))!important;
    filter:none!important;
  }
  .me-slide-track:after{
    top:1px!important;bottom:1px!important;left:-42%!important;width:30%!important;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.34),rgba(255,255,255,.08),transparent)!important;
    filter:blur(5px)!important;
  }
  .me-slide-thumb{
    background:linear-gradient(145deg,rgba(255,255,255,.29),rgba(255,255,255,.075) 38%,rgba(255,255,255,.025) 66%,rgba(255,255,255,.16))!important;
    border:1px solid rgba(255,255,255,.52)!important;
    -webkit-backdrop-filter:blur(12px) saturate(190%) contrast(112%)!important;
    backdrop-filter:blur(12px) saturate(190%) contrast(112%)!important;
    box-shadow:inset 0 1px 2px rgba(255,255,255,.82),inset 0 -1px 2px rgba(255,255,255,.2),0 3px 12px rgba(0,0,0,.2),0 0 12px rgba(255,255,255,.08)!important;
  }
  .me-slide-thumb:before{
    inset:1px 2px 42% 2px!important;
    background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.96),rgba(255,255,255,.28) 34%,rgba(255,255,255,.035) 74%,transparent)!important;
    filter:blur(.7px)!important;
  }
  .me-slide-thumb:after{
    content:""!important;position:absolute!important;inset:2px!important;border-radius:50%!important;
    background:linear-gradient(115deg,transparent 28%,rgba(255,255,255,.16) 48%,transparent 66%)!important;
    box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)!important;pointer-events:none!important;
  }
  .me-slide-thumb svg{filter:drop-shadow(0 1px 2px rgba(0,0,0,.22))!important}
  .me-slide-label{text-shadow:0 1px 5px rgba(0,0,0,.35)!important}
  /* Welcome slider handle: solid champagne gold, no glass bubble. */
  .me-slide-thumb{
    background:linear-gradient(145deg,#f0d49a 0%,#d8b56d 52%,#b88d45 100%)!important;
    border:1px solid rgba(255,239,202,.85)!important;
    -webkit-backdrop-filter:none!important;backdrop-filter:none!important;
    box-shadow:0 3px 10px rgba(0,0,0,.28),inset 0 1px 1px rgba(255,255,255,.42)!important;
    overflow:hidden!important;
  }
  .me-slide-thumb:before,.me-slide-thumb:after{display:none!important;content:none!important}
  .me-slide-thumb svg{stroke:#fff!important;filter:none!important}
  .me-slide-thumb:active{background:linear-gradient(145deg,#f4dca9,#cba45e)!important;box-shadow:0 2px 7px rgba(0,0,0,.24)!important}
  /* Both the outer track and inner handle are transparent, colourless wet glass. */
  .me-slide-track{
    background:rgba(255,255,255,.012)!important;
    border:1px solid rgba(255,255,255,.34)!important;
    box-shadow:inset 0 1px 1px rgba(255,255,255,.48),inset 0 -1px 1px rgba(255,255,255,.16),0 8px 24px rgba(0,0,0,.16)!important;
    -webkit-backdrop-filter:blur(22px) saturate(185%) contrast(112%)!important;
    backdrop-filter:blur(22px) saturate(185%) contrast(112%)!important;
  }
  .me-slide-thumb{
    background:linear-gradient(145deg,rgba(255,255,255,.24),rgba(255,255,255,.055) 42%,rgba(255,255,255,.012) 72%,rgba(255,255,255,.13))!important;
    border:1px solid rgba(255,255,255,.55)!important;
    -webkit-backdrop-filter:blur(16px) saturate(195%) contrast(115%)!important;
    backdrop-filter:blur(16px) saturate(195%) contrast(115%)!important;
    box-shadow:inset 0 1px 2px rgba(255,255,255,.78),inset 0 -1px 2px rgba(255,255,255,.2),0 3px 12px rgba(0,0,0,.2),0 0 12px rgba(255,255,255,.1)!important;
  }
  .me-slide-thumb:before{display:block!important;content:""!important;background:radial-gradient(ellipse at 50% 0%,rgba(255,255,255,.92),rgba(255,255,255,.22) 36%,transparent 76%)!important}
  .me-slide-thumb:after{display:block!important;content:""!important;position:absolute!important;inset:2px!important;border-radius:50%!important;background:linear-gradient(115deg,transparent 26%,rgba(255,255,255,.15) 49%,transparent 68%)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.13)!important;pointer-events:none!important}
  .me-slide-thumb svg{stroke:rgba(255,255,255,.96)!important}
  @media(prefers-reduced-motion:reduce){.me-welcome{transition:none}}
  `;
  document.head.appendChild(welcomeStyle);
  const welcome=document.createElement("section");
  welcome.className="me-welcome";
  welcome.setAttribute("role","dialog");
  welcome.setAttribute("aria-label","Welcome to MANUEL EMPIRE");
  welcome.innerHTML='<p class="me-welcome-brand">MANUEL EMPIRE</p><h1 class="me-welcome-title">WELCOME TO<span>MANUEL EMPIRE</span></h1><p class="me-welcome-instruction">SLIDE RIGHT TO ENTER</p><div class="me-slide-track"><span class="me-slide-label">SLIDE TO ENTER</span><div class="me-slide-thumb" role="slider" tabindex="0" aria-label="Slide right to enter the website" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div></div><p class="me-welcome-foot">WEAR YOUR IDENTITY</p>';
  document.body.appendChild(welcome);
  const track=welcome.querySelector(".me-slide-track");
  const slider=welcome.querySelector(".me-slide-thumb");
  let entered=false,dragging=false,startX=0,startOffset=0,offset=0;
  const maxOffset=()=>Math.max(0,track.clientWidth-slider.offsetWidth-10);
  const paint=next=>{offset=Math.max(0,Math.min(maxOffset(),next));slider.style.setProperty("--slide-x",offset+"px");slider.setAttribute("aria-valuenow",String(Math.round(maxOffset()?offset/maxOffset()*100:0)));};
  const enter=()=>{
   if(entered)return;
   entered=true;
   try{sessionStorage.setItem("me-welcome-completed","1");}catch(e){}
   welcome.classList.add("is-leaving");
   window.setTimeout(()=>welcome.remove(),900);
  };
  slider.addEventListener("pointerdown",event=>{if(entered)return;dragging=true;startX=event.clientX;startOffset=offset;slider.setPointerCapture(event.pointerId);slider.style.transition="none";track.classList.add("is-moving");});
  slider.addEventListener("pointermove",event=>{if(!dragging)return;paint(startOffset+event.clientX-startX);if(maxOffset()&&offset/maxOffset()>=.94)enter();});
  const release=()=>{if(!dragging)return;dragging=false;track.classList.remove("is-moving");slider.style.transition="";if(!entered)paint(0);};
  slider.addEventListener("pointerup",release);
  slider.addEventListener("pointercancel",release);
  slider.addEventListener("lostpointercapture",release);
  slider.addEventListener("keydown",event=>{if(entered)return;if(event.key==="ArrowRight"){event.preventDefault();paint(offset+maxOffset()*.12);if(maxOffset()&&offset/maxOffset()>=.94)enter();}else if(event.key==="ArrowLeft"){event.preventDefault();paint(offset-maxOffset()*.12);}else if(event.key==="Home"){event.preventDefault();paint(0);}else if(event.key==="End"){event.preventDefault();paint(maxOffset());if(maxOffset())enter();}});
  window.addEventListener("resize",()=>paint(0));
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
 
 // Fixed, minimal side navigation — no Liquid Glass surfaces or selection lens.
 nav.classList.add("me-liquid-dock");
 nav.setAttribute("aria-label","Main navigation");
 const dockStyle=document.createElement("style");
 dockStyle.id="me-liquid-dock-style";
 dockStyle.textContent=`
 .side-nav.me-liquid-dock{
   position:fixed!important;left:12px!important;right:auto!important;top:50%!important;bottom:auto!important;
   transform:translateY(-50%)!important;width:58px!important;height:auto!important;min-height:300px!important;
   padding:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;
   border:0!important;border-radius:0!important;overflow:visible!important;background:transparent!important;
   -webkit-backdrop-filter:none!important;backdrop-filter:none!important;box-shadow:none!important;z-index:999!important;
 }
 .side-nav.me-liquid-dock:before,.side-nav.me-liquid-dock:after{display:none!important;content:none!important}
 .side-nav.me-liquid-dock .nav-link{
   position:relative!important;z-index:2!important;width:48px!important;height:48px!important;min-width:48px!important;
   display:grid!important;place-items:center!important;color:#d8b56d!important;background:transparent!important;
   border:0!important;border-radius:0!important;box-shadow:none!important;backdrop-filter:none!important;
   -webkit-backdrop-filter:none!important;mix-blend-mode:normal!important;transform:none!important;outline:none!important;
   -webkit-tap-highlight-color:transparent!important;transition:opacity .18s ease,transform .18s ease!important;
 }
 .side-nav.me-liquid-dock .nav-link svg{width:23px!important;height:23px!important;stroke:currentColor!important;fill:none!important;stroke-width:1.85!important;filter:none!important}
 .side-nav.me-liquid-dock .nav-link:active{transform:scale(.94)!important;opacity:.75!important}
 .side-nav.me-liquid-dock{touch-action:pan-y}
 .side-nav.me-liquid-dock .nav-link{touch-action:pan-y}
 body{padding-bottom:0!important}
 @media(max-width:480px){.side-nav.me-liquid-dock{left:7px!important;width:50px!important;min-height:280px!important;gap:10px!important}.side-nav.me-liquid-dock .nav-link{width:44px!important;height:44px!important;min-width:44px!important}.side-nav.me-liquid-dock .nav-link svg{width:21px!important;height:21px!important}}
 `;
 document.head.appendChild(dockStyle);
 // Permanently strip every bubble/glass treatment from the five navigation controls.
 nav.querySelectorAll(".me-liquid-indicator,.nav-bubble,.nav-glass").forEach(el=>el.remove());
 const cleanNavStyle=document.createElement("style");
 cleanNavStyle.textContent=`
 .side-nav.me-liquid-dock,.side-nav.me-liquid-dock *{
   -webkit-backdrop-filter:none!important;backdrop-filter:none!important;
 }
 .side-nav.me-liquid-dock .nav-link,
 .side-nav.me-liquid-dock .nav-link:hover,
 .side-nav.me-liquid-dock .nav-link:focus,
 .side-nav.me-liquid-dock .nav-link:active,
 .side-nav.me-liquid-dock .nav-link[aria-current="page"]{
   color:#d8b56d!important;background:transparent!important;background-image:none!important;
   border:0!important;border-radius:0!important;outline:0!important;box-shadow:none!important;
 }
 .side-nav.me-liquid-dock .nav-link:before,
 .side-nav.me-liquid-dock .nav-link:after{display:none!important;content:none!important}
 .side-nav.me-liquid-dock .nav-link svg{color:#d8b56d!important;stroke:#d8b56d!important;fill:none!important;filter:none!important}
 `;
 document.head.appendChild(cleanNavStyle);
 // One combined support control at the bottom of the side navigation.
 const supportButton=document.createElement("button");
 supportButton.type="button";
 supportButton.className="nav-link me-support-toggle";
 supportButton.setAttribute("aria-label","Contact and customer care");
 supportButton.setAttribute("aria-expanded","false");
 supportButton.title="Support";
 supportButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4ZM17 19a5 5 0 0 1-5 2"/></svg>';
 const supportPanel=document.createElement("div");
 supportPanel.className="me-support-panel";
 supportPanel.innerHTML='<a href="contact.html">CONTACT</a><a href="customer-care.html">CUSTOMER CARE</a>';
 const supportStyle=document.createElement("style");
 supportStyle.textContent=`
 .side-nav.me-liquid-dock .me-support-toggle{margin-top:16px!important;flex:0 0 44px!important}
 .side-nav.me-liquid-dock .me-support-toggle svg{width:22px!important;height:22px!important;stroke:#d8b56d!important;fill:none!important;stroke-width:1.85!important}
 .me-support-panel{position:fixed;z-index:1001;display:flex;flex-direction:column;gap:16px;min-width:166px;padding:15px 18px;background:rgba(8,8,8,.94);border:1px solid rgba(216,181,109,.28);box-shadow:0 12px 32px rgba(0,0,0,.22);opacity:0;visibility:hidden;transform:translateY(7px);transition:opacity .2s ease,transform .2s ease,visibility .2s ease}
 .me-support-panel.is-open{opacity:1;visibility:visible;transform:translateY(0)}
 .me-support-panel a{color:#fff;text-decoration:none;font-size:11px;font-weight:700;letter-spacing:.16em;white-space:nowrap}
 .me-support-panel a:hover,.me-support-panel a:focus-visible{color:#d8b56d;outline:none}
 @media(max-width:480px){.me-support-panel{min-width:150px;padding:13px 14px}.me-support-panel a{font-size:10px}}
 `;
 document.head.appendChild(supportStyle);
 nav.appendChild(supportButton);
 document.body.appendChild(supportPanel);
 const closeSupport=()=>{supportPanel.classList.remove("is-open");supportButton.setAttribute("aria-expanded","false");};
 const toggleSupport=()=>{
   const open=!supportPanel.classList.contains("is-open");
   if(!open){closeSupport();return;}
   const rect=supportButton.getBoundingClientRect();
   supportPanel.style.left=Math.max(70,rect.right+12)+"px";
   supportPanel.style.top=Math.min(window.innerHeight-100,Math.max(12,rect.top-8))+"px";
   supportPanel.classList.add("is-open");
   supportButton.setAttribute("aria-expanded","true");
 };
 supportButton.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();toggleSupport();});
 document.addEventListener("click",event=>{if(!supportPanel.contains(event.target)&&!supportButton.contains(event.target))closeSupport();});
 document.addEventListener("keydown",event=>{if(event.key==="Escape")closeSupport();});
 window.addEventListener("resize",closeSupport);
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
 panel.innerHTML='<a class="category-choice" href="tshirt.html">TSHIRT</a><a class="category-choice" href="hoodies.html">HOODIES</a><a class="category-choice" href="joggers.html">JOGGERS</a><a class="category-choice" href="full-frames.html">FULL FRAMES</a><a class="category-choice" href="jean-short.html">JEAN SHORT</a><a class="category-choice" href="armless.html">ARMLESS</a>';
 document.body.append(overlay,panel);
 const close=()=>{document.body.classList.remove("categories-open");trigger.setAttribute("aria-expanded","false");};
 const positionPanel=()=>{
  panel.style.top="50%";
  panel.style.left="50%";
 };
 const toggle=()=>{
  const open=!document.body.classList.contains("categories-open");
  if(open){
   positionPanel();
   document.body.classList.add("categories-open");
   trigger.setAttribute("aria-expanded","true");
  }else close();
 };
 trigger.addEventListener("click",event=>{event.preventDefault();toggle();});
 trigger.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();toggle();}});
 overlay.addEventListener("click",close);
 document.addEventListener("keydown",event=>{if(event.key==="Escape")close();});
 panel.addEventListener("click",event=>{if(event.target.closest("a"))close();});
 window.addEventListener("resize",()=>{if(document.body.classList.contains("categories-open"))positionPanel();});



})();