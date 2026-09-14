// Progressively enhance only below-the-fold content; all content works without JS.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(preference.matches || !('IntersectionObserver' in window))return;
 const targets=[...document.querySelectorAll('.ivory-service, .ivory-person, .faith-copy > :not(.faith-leaves), .ivory-next > div, .services-heading > *, .highlight-card, .why-copy > .eyebrow, .why-copy > h2, .why-intro, .why-values > section, .why-links, .why-copy > .button, .founders-story, .therapist-heading > *, .therapist-card, .therapist-bottom, .getting-started-heading > *, .starting-steps > li, .getting-started-actions')];
 const reveal=element=>{
  element.classList.remove('scroll-pending');
  observer.unobserve(element);
  if(!preference.matches)element.classList.add('scroll-enter');
 };
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target)});
 },{threshold:0,rootMargin:'0px 0px -35px 0px'});
 targets.forEach(element=>{
  if(element.getBoundingClientRect().top<innerHeight)return;
  if(element.matches('.highlight-card,.therapist-card,.starting-steps > li')){
   const index=[...element.parentElement.children].indexOf(element);
   element.style.setProperty('--rise-delay',`${index*140}ms`);
  }
  element.classList.add('scroll-pending');observer.observe(element);
  element.addEventListener('animationend',()=>element.classList.remove('scroll-enter'),{once:true});
 });
 document.addEventListener('focusin',event=>{
  const target=event.target.closest('.scroll-pending,.scroll-enter');
  if(target){target.classList.remove('scroll-pending','scroll-enter');observer.unobserve(target)}
 });
 preference.addEventListener('change',()=>{
  if(preference.matches){observer.disconnect();targets.forEach(e=>e.classList.remove('scroll-pending','scroll-enter'))}
 });
})();
