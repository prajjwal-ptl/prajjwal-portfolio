const progress=document.querySelector('.page-progress');
const updateProgress=()=>{if(!progress)return;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`};
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});reveals.forEach(el=>observer.observe(el));}else reveals.forEach(el=>el.classList.add('visible'));
const menu=document.querySelector('.menu-toggle');const mobile=document.querySelector('[data-mobile-nav]');
if(menu&&mobile){menu.addEventListener('click',()=>mobile.classList.toggle('open'));mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')))}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const id=link.getAttribute('href');if(id&&id!=='#'){const target=document.querySelector(id);if(target){setTimeout(()=>target.scrollIntoView({behavior:'smooth',block:'start'}),0)}}}));