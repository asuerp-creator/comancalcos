// INICIO custom: seccion-collab-fadu
/* Seccion "Stickers para la FADU" (collab con @lachicadefadu) \u2014 Coman Calcos, 24/11/2026.
   Se inserta justo ARRIBA de "Eleg\u00ed tu combo" (#mn-combos), o sea entre el carrusel de
   categorias (#mn-catbar) y los combos. Agrega al carrito sin salir de la pagina usando el
   AJAX del tema (clases js-*), igual que #mn-combos. Para sacarla: borrar la linea del
   <script src=".../collab-fadu/collab-fadu.js"> en Configuracion > Codigos externos. */
(function(){
if(window.__mnFadu)return; window.__mnFadu=1;
var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@main/collab-fadu/";})();
var CDN="https://acdn-us.mitiendanube.com/stores/001/911/110/products/";

/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var CHIP="COMAN CALCOS \u00d7 @LACHICADEFADU";
var TITULO="STICKERS PARA LA FADU";
var TEXTO='Los armamos junto a <a href="https://www.instagram.com/lachicadefadu/" target="_blank" rel="noopener">@lachicadefadu</a>: entregas, renders eternos, la banqueta del taller y el Pantone de la facu. Tres combos para la notebook, el termo o la carpeta.';
var P=[
 {t:"Combo FADU Blanco", d:"8 stickers \u00b7 vinilo con borde blanco", pr:"14.720", ant:"18.400", off:"-20%", tag:"", h:"combo-fadu-blanco-x-lachicadefadu-8-stickers-10ey1", p:"383095720", v:"1645510393", mi:"combo-fadu-blanco-daf2a55e3a2db96d1817955385616797"},
 {t:"Combo Dise\u00f1o", d:"9 stickers \u00b7 vinilo con borde blanco", pr:"16.560", ant:"20.700", off:"-20%", tag:"EL M\u00c1S COMPLETO", h:"combo-diseno-x-lachicadefadu-9-stickers-1302g", p:"383094803", v:"1645507642", mi:"combo-fadu-diseno-fcac0a4a2d0997f9a417955385595737"},
 {t:"Combo FADU Negro", d:"9 stickers \u00b7 vinilo con borde negro", pr:"16.560", ant:"20.700", off:"-20%", tag:"", h:"combo-fadu-negro-x-lachicadefadu-9-stickers-y9kl7", p:"383096034", v:"1645511858", mi:"combo-fadu-negro-664497cf684309ab1b17955385636159"}
];
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

var CSS=''
/* INICIO custom: seccion-collab-fadu (css) */
+'.mn-fadu{position:relative;overflow:hidden;overflow-x:clip;margin:0 0 56px;padding:52px 0 44px;font-family:Poppins,sans-serif;color:#fff;'
+'background-color:#26684c;background-image:linear-gradient(rgba(220,240,225,.22) 2px,transparent 2px),linear-gradient(90deg,rgba(220,240,225,.22) 2px,transparent 2px),linear-gradient(rgba(220,240,225,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(220,240,225,.09) 1px,transparent 1px);background-size:120px 120px,120px 120px,24px 24px,24px 24px}'
+'.mn-fadu__in{position:relative;max-width:1240px;margin:0 auto;padding:0 20px;box-sizing:border-box}'
+'.mn-fadu__deco{position:absolute;height:auto;pointer-events:none;filter:drop-shadow(0 8px 14px rgba(5,20,15,.35));z-index:0}'
+'.mn-fadu__deco--1{width:84px;left:-10px;top:-24px;rotate:-14deg}'
+'.mn-fadu__deco--2{width:88px;right:-8px;top:-28px;rotate:12deg}'
+'.mn-fadu__deco--3,.mn-fadu__deco--4{display:none}'
+'.mn-fadu__head{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px;max-width:760px;margin:0 auto;padding-top:28px}'
+'.mn-fadu__chip{background:#fff;color:#10233f;font-weight:700;font-size:11px;letter-spacing:.12em;padding:7px 13px;border-radius:999px}'
+'.mn-fadu__tit{margin:0;font-family:MnAnton,Montserrat,sans-serif;font-weight:400;font-size:clamp(40px,11vw,68px);line-height:1;color:#fff;letter-spacing:.01em}'
+'.mn-fadu__txt{margin:0;font-size:15px;line-height:1.55;color:#eef6f1}'
+'.mn-fadu__txt a{color:#fff;font-weight:700;text-decoration:underline}'
/* mobile: carrusel horizontal */
+'.mn-fadu__list{position:relative;z-index:1;list-style:none;display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;margin:26px -20px 0;padding:6px 20px 22px;scroll-padding:20px;scrollbar-width:none;-webkit-overflow-scrolling:touch}'
+'.mn-fadu__list::-webkit-scrollbar{display:none}'
+'.mn-fadu__card{flex:none;width:min(78vw,300px);scroll-snap-align:center;background:#fff;border-radius:20px;padding:12px;box-shadow:0 14px 30px rgba(5,20,15,.35);display:flex;flex-direction:column;gap:10px;box-sizing:border-box;color:#10233f}'
+'.mn-fadu__ph{position:relative;display:block;border-radius:12px;overflow:hidden;aspect-ratio:1/1;background:#eaf1ec}'
+'.mn-fadu__ph img{display:block;width:100%;height:100%;object-fit:cover}'
+'.mn-fadu__off,.mn-fadu__tag{position:absolute;top:10px;font-weight:700;font-size:12px;line-height:1;padding:6px 10px;border-radius:999px;color:#fff}'
+'.mn-fadu__off{left:10px;background:#5E6B33}'
+'.mn-fadu__tag{right:10px;background:#10233f}'
+'.mn-fadu__info{padding:0 4px;display:flex;flex-direction:column;gap:2px}'
+'.mn-fadu__name{margin:0;font-family:Bebas,Montserrat,sans-serif;font-weight:400;font-size:28px;line-height:1.05;letter-spacing:.01em;color:#10233f}'
+'.mn-fadu__desc{margin:0;font-size:13px;color:#3d4a5c}'
+'.mn-fadu__price{margin:4px 0 0;display:flex;align-items:baseline;gap:8px}'
+'.mn-fadu__now{font-size:24px;font-weight:700;color:#10233f}'
+'.mn-fadu__old{font-size:14px;color:#5b6676;text-decoration:line-through}'
+'.mn-fadu__acts{display:flex;align-items:center;gap:8px;padding:0 4px 4px}'
+'.mn-fadu__form{flex:1;margin:0}'
+'html body .mn-fadu__buy{width:100%;min-height:48px;border:0;border-radius:12px;background:#5E6B33;color:#fff;font:700 15px Poppins,sans-serif;cursor:pointer;padding:0 12px}'
+'html body .mn-fadu__buy:hover{background:#4F5A2A}html body .mn-fadu__buy:active{background:#424B23}'
+'.mn-fadu__buy:focus-visible,.mn-fadu__see:focus-visible{outline:3px solid #fff;outline-offset:2px}'
+'.mn-fadu__see{min-height:48px;display:flex;align-items:center;padding:0 8px;font-weight:600;font-size:14px;color:#10233f;text-decoration:underline;white-space:nowrap}'
+'.mn-fadu__dots{display:flex;justify-content:center;gap:8px}'
+'.mn-fadu__dot{width:8px;height:8px;border-radius:4px;background:rgba(255,255,255,.45);transition:width .2s,background .2s}'
+'.mn-fadu__dot.is-on{width:22px;background:#fff}'
+'.mn-fadu__hint{margin:12px 0 0;text-align:center;font-size:13px;font-weight:600;color:#eef6f1}'
/* desktop: grilla de 3 */
+'@media (min-width:1000px){'
+'.mn-fadu{padding:72px 0 76px;margin-bottom:70px}'
+'.mn-fadu__in{padding:0 48px}'
+'.mn-fadu__head{padding-top:0;gap:14px}'
+'.mn-fadu__chip{font-size:13px;letter-spacing:.14em;padding:8px 16px}'
+'.mn-fadu__txt{font-size:18px}'
+'.mn-fadu__list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;overflow:visible;margin:44px 0 0;padding:0;scroll-snap-type:none}'
+'.mn-fadu__card{width:auto;padding:14px;border-radius:22px;gap:12px}'
+'.mn-fadu__card:nth-child(1){rotate:-1deg}.mn-fadu__card:nth-child(2){translate:0 -14px}.mn-fadu__card:nth-child(3){rotate:1deg}'
+'.mn-fadu__name{font-size:32px}.mn-fadu__desc{font-size:14px}.mn-fadu__now{font-size:28px}.mn-fadu__old{font-size:15px}'
+'.mn-fadu__dots,.mn-fadu__hint{display:none}'
+'.mn-fadu__deco--1{width:150px;left:10px;top:-40px}'
+'.mn-fadu__deco--2{width:150px;right:20px;top:-46px}'
+'.mn-fadu__deco--3{display:block;width:160px;right:-30px;bottom:-60px;rotate:-8deg}'
+'.mn-fadu__deco--4{display:block;width:150px;left:-40px;bottom:-40px;rotate:10deg}'
+'}'
+'@media (prefers-reduced-motion:reduce){.mn-fadu__dot{transition:none}}';
/* FIN custom */

function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

function construir(){
var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);
var s=document.createElement("section");
s.id="mn-fadu";s.className="mn-fadu";s.setAttribute("aria-labelledby","mn-fadu-tit");
var h='<div class="mn-fadu__in">'
+'<img class="mn-fadu__deco mn-fadu__deco--1" src="'+BASE+'img/corazon-fadu.webp" alt="" width="320" height="267" loading="lazy">'
+'<img class="mn-fadu__deco mn-fadu__deco--2" src="'+BASE+'img/gato.webp" alt="" width="309" height="320" loading="lazy">'
+'<img class="mn-fadu__deco mn-fadu__deco--3" src="'+BASE+'img/torta-negra.webp" alt="" width="320" height="206" loading="lazy">'
+'<img class="mn-fadu__deco mn-fadu__deco--4" src="'+BASE+'img/ilovez.webp" alt="" width="320" height="284" loading="lazy">'
+'<div class="mn-fadu__head"><span class="mn-fadu__chip">'+esc(CHIP)+'</span>'
+'<h2 class="mn-fadu__tit" id="mn-fadu-tit">'+esc(TITULO)+'</h2>'
+'<p class="mn-fadu__txt">'+TEXTO+'</p></div>'
+'<ul class="mn-fadu__list" aria-label="Combos de la collab">';
for(var i=0;i<P.length;i++){var p=P[i];
h+='<li class="mn-fadu__card">'
+'<a class="mn-fadu__ph" href="/productos/'+p.h+'/" tabindex="-1" aria-hidden="true">'
+'<img src="'+CDN+p.mi+'-640-0.webp" alt="'+esc(p.t)+'" width="640" height="640" loading="lazy" decoding="async">'
+(p.off?'<span class="mn-fadu__off">'+esc(p.off)+'</span>':'')
+(p.tag?'<span class="mn-fadu__tag">'+esc(p.tag)+'</span>':'')
+'</a>'
+'<div class="mn-fadu__info"><h3 class="mn-fadu__name">'+esc(p.t)+'</h3>'
+'<p class="mn-fadu__desc">'+esc(p.d)+'</p>'
+'<p class="mn-fadu__price"><span class="mn-fadu__now">$'+p.pr+'</span>'+(p.ant?'<span class="mn-fadu__old"><span class="sr-only" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Antes </span>$'+p.ant+'</span>':'')+'</p></div>'
+'<div class="mn-fadu__acts">'
+'<form class="mn-fadu__form js-product-form" method="post" action="/comprar/">'
+'<input type="hidden" name="add_to_cart" value="'+p.p+'">'
+'<input type="hidden" name="variant_id" value="'+p.v+'">'
+'<input type="hidden" name="quantity" value="1">'
+'<button type="submit" class="mn-fadu__buy js-addtocart js-prod-submit-form" data-mini="'+p.mi+'" data-nom="'+esc(p.t)+'" data-pr="'+p.pr+'">Agregar al carrito</button>'
+'</form>'
+'<a class="mn-fadu__see" href="/productos/'+p.h+'/">Ver combo</a>'
+'</div></li>';
}
h+='</ul><div class="mn-fadu__dots" aria-hidden="true">';
for(var j=0;j<P.length;j++)h+='<span class="mn-fadu__dot'+(j===0?' is-on':'')+'"></span>';
h+='</div><p class="mn-fadu__hint" aria-hidden="true">Desliz\u00e1 para ver los 3 combos \u2192</p></div>';
s.innerHTML=h;

/* Puntitos del carrusel (solo celular) */
var list=s.querySelector(".mn-fadu__list"),dots=s.querySelectorAll(".mn-fadu__dot"),raf=0;
list.addEventListener("scroll",function(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;
var c=list.querySelector(".mn-fadu__card");if(!c)return;
var step=c.offsetWidth+14,k=Math.round(list.scrollLeft/step);
for(var d=0;d<dots.length;d++)dots[d].classList.toggle("is-on",d===k);});},{passive:true});

/* Aviso "Agregado al carrito": el tema deja datos del producto anterior en una seccion
   inyectada. Durante 6 s despues del clic pisamos foto, nombre, cantidad y precio
   (mismo arreglo que #mn-combos). */
s.addEventListener("click",function(e){
var b=e.target.closest?e.target.closest(".mn-fadu__buy"):null;
if(!b)return;
var url=CDN+b.getAttribute("data-mini")+"-240-0.webp";
var nom=b.getAttribute("data-nom")||"",pr=b.getAttribute("data-pr")||"";
var precio=pr?("$"+pr+",00"):"",fin=Date.now()+6000;
function poner(cls,val){var es=document.querySelectorAll("."+cls),ok=es.length>0;
for(var i=0;i<es.length;i++){if(es[i].textContent!==val){es[i].textContent=val;ok=false;}}return ok;}
function ponerImg(){var es=document.querySelectorAll(".js-cart-notification-item-img"),ok=es.length>0;
for(var i=0;i<es.length;i++){if(es[i].getAttribute("srcset")){es[i].removeAttribute("srcset");ok=false;}
if(es[i].getAttribute("src")!==url){es[i].src=url;es[i].alt=nom;ok=false;}}return ok;}
var iv=setInterval(function(){
var a=ponerImg(),b1=poner("js-cart-notification-item-name",nom),c=poner("js-cart-notification-item-quantity","1"),d=poner("js-cart-notification-item-price",precio);
if((a&&b1&&c&&d)||Date.now()>fin)clearInterval(iv);},120);
});
return s;
}

var sec=null,mo=null,saltado=false;
function ubicar(){
if(!sec)return false;
var ok=false,c=document.getElementById("mn-combos");
if(c&&c.parentNode){if(c.previousElementSibling!==sec)c.parentNode.insertBefore(sec,c);ok=true;}
else{var cb=document.getElementById("mn-catbar");
if(cb&&cb.parentNode){var ref=cb.nextElementSibling;
while(ref&&ref!==sec&&ref.getAttribute("data-store")==="home-banner-categories")ref=ref.nextElementSibling;
if(ref!==sec)cb.parentNode.insertBefore(sec,ref);ok=true;}}
/* Si se llego desde el banner (/#mn-fadu), bajar hasta la seccion una vez insertada */
if(ok&&!saltado&&location.hash==="#mn-fadu"){saltado=true;setTimeout(function(){sec.scrollIntoView({block:"start"});},60);}
return ok;
}
function arrancar(){
if(!document.querySelector(".js-home-sections-container")&&!document.getElementById("mn-catbar")&&!document.getElementById("mn-combos")){
/* puede que la home todavia no este armada: dejamos que el observer lo intente */}
if(!sec)sec=construir();
ubicar();
if(mo)return;
mo=new MutationObserver(function(){ubicar();});
mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(function(){ubicar();if(mo){mo.disconnect();mo=null;}},15000);
}
/* Solo en la portada */
var path=location.pathname.replace(/\/+$/,"");
if(path!==""&&path!=="/")return;
document.readyState!=="loading"?arrancar():document.addEventListener("DOMContentLoaded",arrancar);
window.addEventListener("pageshow",function(){arrancar();});
})();
// FIN custom
