const triggers=[...document.querySelectorAll('.nav-trigger')];
const nav=document.querySelector('#navigation');
const mobile=document.querySelector('.mobile-toggle');
let hoverTimer;
function closeMenus(){clearTimeout(hoverTimer);triggers.forEach(t=>{t.setAttribute('aria-expanded','false');document.getElementById(t.getAttribute('aria-controls')).hidden=true})}
function openMenu(trigger){closeMenus();trigger.setAttribute('aria-expanded','true');document.getElementById(trigger.getAttribute('aria-controls')).hidden=false}
triggers.forEach(trigger=>{
 trigger.addEventListener('click',()=>trigger.getAttribute('aria-expanded')==='true'?closeMenus():openMenu(trigger));
 trigger.addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();openMenu(trigger);document.getElementById(trigger.getAttribute('aria-controls')).querySelector('a').focus()}});
 trigger.parentElement.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&window.matchMedia('(min-width:1051px)').matches){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>openMenu(trigger),140)}});
 trigger.parentElement.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&window.matchMedia('(min-width:1051px)').matches){clearTimeout(hoverTimer);hoverTimer=setTimeout(closeMenus,220)}});
});
mobile?.addEventListener('click',()=>{const open=mobile.getAttribute('aria-expanded')!=='true';mobile.setAttribute('aria-expanded',String(open));nav.classList.toggle('mobile-open',open);if(!open)closeMenus()});
function closeNavigation(){closeMenus();nav?.classList.remove('mobile-open');mobile?.setAttribute('aria-expanded','false')}
document.addEventListener('click',e=>{if(!e.target.closest('.header, #meet-team'))closeNavigation()});
window.matchMedia('(min-width:1051px)').addEventListener('change',closeNavigation);
document.addEventListener('focusin',e=>{if(!e.target.closest('.header'))closeMenus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const t=triggers.find(t=>t.getAttribute('aria-expanded')==='true');if(t){closeMenus();t.focus()}else if(nav?.classList.contains('mobile-open')){nav.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false');mobile.focus()}}});
document.querySelector('#meet-team')?.addEventListener('click',()=>{if(window.matchMedia('(max-width:1050px)').matches){nav.classList.add('mobile-open');mobile.setAttribute('aria-expanded','true')}const t=document.querySelector('[aria-controls="team-panel"]');openMenu(t);t.focus()});
const dialog=document.querySelector('#detail-dialog');
function showDetail(title,copy){closeMenus();nav?.classList.remove('mobile-open');mobile?.setAttribute('aria-expanded','false');document.querySelector('#detail-title').textContent=title;document.querySelector('#detail-copy').textContent=copy;dialog.showModal()}
document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showDetail(el.dataset.service,'This specialty page is part of the planned website. For this design preview, you can continue to Contact Us. Our office will help with current services, therapist fit, and scheduling.')}));
document.querySelectorAll('#navigation a:not([data-service])').forEach(a=>a.addEventListener('click',()=>{closeMenus();nav.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false')}));
document.querySelector('#chat-open')?.addEventListener('click',()=>showDetail('How can we help?','Chat preview: the custom assistant will be built in a later step. It will help visitors find practice information and connect with the office to schedule.'));
dialog?.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});

const insuranceWindow=document.querySelector('.insurance-window');
const teamTrack=document.querySelector('#team-track');
if(teamTrack){
 const arrows=[...document.querySelectorAll('[data-team-direction]')];
 function updateTeamArrows(){const end=teamTrack.scrollWidth-teamTrack.clientWidth;arrows.forEach(b=>b.setAttribute('aria-disabled',String(Number(b.dataset.teamDirection)<0?teamTrack.scrollLeft<=2:teamTrack.scrollLeft>=end-2)))}
 function scrollTeam(direction){const card=teamTrack.querySelector('li');const step=card.getBoundingClientRect().width+20;teamTrack.scrollBy({left:direction*step,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 arrows.forEach(b=>b.addEventListener('click',()=>{if(b.getAttribute('aria-disabled')!=='true')scrollTeam(Number(b.dataset.teamDirection))}));
 teamTrack.addEventListener('keydown',e=>{if(e.target===teamTrack&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();scrollTeam(e.key==='ArrowLeft'?-1:1)}});
 teamTrack.addEventListener('scroll',updateTeamArrows,{passive:true});
 new ResizeObserver(updateTeamArrows).observe(teamTrack);
 updateTeamArrows();
}
if(insuranceWindow){
 const list=insuranceWindow.querySelector('ul');

 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const originals=[...list.children];
 originals.forEach(item=>{const copy=item.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.dataset.duplicate='';copy.querySelector('img').alt='';list.append(copy)});
 let paused=false,hovered=false,focused=false,last=0,position=0;
 function updateMotion(){list.querySelectorAll('[data-duplicate]').forEach(item=>item.hidden=motion.matches);insuranceWindow.scrollLeft=0;position=0}
 updateMotion();motion.addEventListener('change',updateMotion);
 insuranceWindow.addEventListener('pointerenter',()=>{hovered=true});
 insuranceWindow.addEventListener('pointerleave',()=>{hovered=false});
 insuranceWindow.addEventListener('focusin',()=>{focused=true});
 insuranceWindow.addEventListener('focusout',()=>{focused=false});
 insuranceWindow.addEventListener('touchstart',()=>{paused=true},{passive:true});
 function advance(time){
  const elapsed=last?Math.min(time-last,50):0;last=time;
  if(!motion.matches&&!paused&&!hovered&&!focused&&!document.hidden){
   const cycle=list.children[originals.length].offsetLeft-list.children[0].offsetLeft;
   position+=elapsed*.025;
   if(cycle>0&&position>=cycle)position%=cycle;
   insuranceWindow.scrollLeft=position;
  }else{position=insuranceWindow.scrollLeft}
  requestAnimationFrame(advance);
 }
 requestAnimationFrame(advance);
}

