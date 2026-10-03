// INICIO custom: barra-categorias-productos
// Barra de categorías + carrusel infinito de productos (home). Coman Calcos.
// Para sumar/sacar categorías: editar la lista CATS de abajo ([nombre, ruta, [subcategorías]]).
(function(){
var TITLE="https://acdn-us.mitiendanube.com/stores/001/911/110/products/mn-titulo-categorias-5f0628a04be10fce3b17891557991629-640-0.webp";
var LIMIT=12, SPEED=35;
var CATS=[
["Malvinas","/malvinas/"],
["Deportes","/deportes/",[["Argentina","/deportes/stickers-especiales/"],["Messi","/deportes/stickers-especiales/messi/"],["Diego","/deportes/stickers-especiales/diego/"],["La Scaloneta","/deportes/stickers-especiales/la-scaloneta/"],["Boca Juniors","/deportes/boca-juniors/"],["Básquet","/deportes/nba/"],["River Plate","/deportes/river-plate/"],["Fútbol Argentino","/deportes/futbol-argentino/"],["Racing","/deportes/futbol-argentino/racing/"],["Independiente","/deportes/futbol-argentino/independiente/"],["Estudiantes","/deportes/futbol-argentino/estudiantes/"],["San Lorenzo","/deportes/futbol-argentino/san-lorenzo/"],["Vélez","/deportes/futbol-argentino/velez/"],["Huracán","/deportes/futbol-argentino/huracan/"],["Rosario Central","/deportes/futbol-argentino/rosario-central1/"],["Otros Equipos","/deportes/futbol-argentino/otros-equipos/"]]],
["Mayorista","/stickers-por-mayor/"],
["Personalizados","/stickers-personalizados/"],
["DTF UV","/dtf-uv/"],
["Combos","/combos/"],
["Stickers para Termo","/stickers-para-termo/"],
["Super Stickers XL","/super-stickers-xl/"],
["Planchas","/planchas/"],
["Viajes","/viajes/"],
["Pelis y TV","/series-y-tv/",[["Series","/series-y-tv/series/"],["Películas","/series-y-tv/peliculas/"]]],
["Más stickers","/mas/",[["Anime","/mas/anime/"],["Automovilismo","/mas/automovilismo/"],["Marcas","/mas/marcas/"],["Música","/mas/musica/"],["Los Simpsons","/mas/los-simpsons/"],["Aesthetic","/mas/otros/"]]]
];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function pickImg(img){
if(!img)return"";
var ss=img.getAttribute("data-srcset")||img.getAttribute("srcset")||"",best="",bw=0;
ss.split(",").forEach(function(p){var m=p.trim().split(/\s+/),w=parseInt(m[1],10)||0;if(m[0]&&w&&(!best||(w>=480&&(bw<480||w<bw))||(bw<480&&w>bw))){best=m[0];bw=w}});
if(!best){var s=img.getAttribute("data-src")||img.getAttribute("src")||"";if(s.indexOf("data:")!==0)best=s}
return best;
}
function parse(html){
var d=new DOMParser().parseFromString(html,"text/html"),out=[];
d.querySelectorAll(".js-item-product").forEach(function(it){
var a=it.querySelector("a.item-link")||it.querySelector("a[href]"),n=it.querySelector(".js-item-name"),p=it.querySelector(".js-price-display"),c=it.querySelector(".js-compare-price-display");
var img=it.querySelector("img.item-image-featured")||it.querySelector("img");
var cs=c&&!/display:\s*none/.test(c.getAttribute("style")||"")&&c.textContent.trim();
if(a&&n)out.push({u:a.getAttribute("href"),n:n.textContent.trim(),p:p?p.textContent.trim():"",c:cs||"",i:pickImg(img)});
});
return out;
}
function init(){
var home=document.querySelector(".js-home-sections-container");
if(!home||document.getElementById("mn-catbar"))return;
if(!document.getElementById("mn-catbar-css")){var st=document.createElement("style");st.id="mn-catbar-css";st.textContent=".mn-catbar{margin:0 0 70px;overflow-x:clip}.mn-catbar__title{margin:0 0 22px;text-align:center;line-height:0}.mn-catbar__title img{height:clamp(22px,6vw,30px);width:auto;max-width:90%}.mn-catbar__nav{display:flex;justify-content:center;padding:0 16px;margin:0 0 14px}.mn-catbar__bar{position:relative;display:flex;gap:2px;max-width:100%;overflow-x:auto;scrollbar-width:none;background:#10233f;border:1px solid rgba(135,180,211,.35);border-radius:999px;padding:5px;box-shadow:0 8px 24px rgba(16,35,63,.18)}.mn-catbar__bar::-webkit-scrollbar,.mn-catbar__subs::-webkit-scrollbar{display:none}.mn-catbar__tab{flex:0 0 auto;background:none;border:0;color:rgba(255,255,255,.6);font:600 14px/1 Poppins,sans-serif;padding:11px 15px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:color .25s}.mn-catbar__tab:hover,.mn-catbar__tab.is-on{color:#fff}.mn-catbar__ind{position:absolute;left:0;bottom:3px;width:0;height:2px;border-radius:2px;background:linear-gradient(90deg,rgba(135,180,211,0),#87b4d3 35%,#fff 70%,rgba(255,255,255,0));box-shadow:0 0 10px 1px rgba(135,180,211,.75);transition:transform .45s cubic-bezier(.4,0,.2,1),width .45s cubic-bezier(.4,0,.2,1);pointer-events:none}.mn-catbar__subs{position:relative;display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;padding:2px 16px 4px;margin:0 auto 16px;max-width:1200px}.mn-catbar__subs:empty{display:none}.mn-catbar__chip:first-child{margin-left:auto}.mn-catbar__chip:last-child{margin-right:auto}.mn-catbar__chip{flex:0 0 auto;border:1px solid #10233f;background:#fff;color:#10233f;font:600 13px/1 Poppins,sans-serif;padding:8px 14px;border-radius:999px;cursor:pointer;white-space:nowrap}.mn-catbar__chip.is-on{background:#87b4d3;border-color:#87b4d3}.mn-catbar__vp{overflow:hidden;touch-action:pan-y;cursor:grab;padding:6px 0 12px;-webkit-user-select:none;user-select:none}.mn-catbar__track{display:flex;gap:14px;width:max-content;padding:0 7px;will-change:transform}.mn-catbar__card{flex:0 0 auto;width:clamp(150px,42vw,210px);background:#fff;border-radius:14px;box-shadow:0 4px 14px rgba(16,35,63,.12);overflow:hidden;color:#10233f;text-decoration:none;display:flex;flex-direction:column;transition:transform .25s}.mn-catbar__card:hover{color:#10233f;text-decoration:none}.mn-catbar__img{display:block;aspect-ratio:1/1;background:#fff}.mn-catbar__img img{width:100%;height:100%;object-fit:contain;display:block;-webkit-user-drag:none}.mn-catbar__name{font:600 13px/1.3 Poppins,sans-serif;margin:10px 12px 4px;min-height:2.6em;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.mn-catbar__price{font:700 15px/1.2 Montserrat,sans-serif;margin:0 12px 12px}.mn-catbar__price s{font-weight:500;font-size:12px;opacity:.55;margin-right:6px}.mn-catbar__sk .mn-catbar__img,.mn-catbar__sk .mn-catbar__name,.mn-catbar__sk .mn-catbar__price{background:linear-gradient(90deg,#e9f0f6 25%,#f5f8fb 50%,#e9f0f6 75%);background-size:200% 100%;animation:mnCbSk 1.2s linear infinite;border-radius:6px;color:transparent}.mn-catbar__sk .mn-catbar__img{border-radius:0}@keyframes mnCbSk{to{background-position:-200% 0}}.mn-catbar__msg{text-align:center;padding:30px 16px;font:500 14px/1.4 Poppins,sans-serif;color:#10233f}.mn-catbar__more{text-align:center;margin-top:16px}.mn-catbar__all{display:inline-block;background:#10233f;color:#fff;font:700 14px/1 Poppins,sans-serif;padding:13px 26px;border-radius:999px;text-decoration:none}.mn-catbar__all:hover{color:#fff;text-decoration:none;opacity:.9}@media (hover:hover){.mn-catbar__card:hover{transform:translateY(-4px)}}@media (min-width:768px){.mn-catbar__tab{padding:12px 13px}.mn-catbar__track{gap:18px}}";document.head.appendChild(st);}
var old=home.querySelector(".section-banners-home");
var sec=document.createElement("section");
sec.id="mn-catbar";sec.className="mn-catbar";
sec.innerHTML='<h2 class="mn-catbar__title"><img src="'+TITLE+'" alt="Elegí tu categoría"></h2><div class="mn-catbar__nav"><div class="mn-catbar__bar" role="tablist"><span class="mn-catbar__ind"></span></div></div><div class="mn-catbar__subs"></div><div class="mn-catbar__vp"><div class="mn-catbar__track"></div></div><div class="mn-catbar__more"><a class="mn-catbar__all" href="#">Ver todos</a></div>';
if(old){old.parentNode.insertBefore(sec,old);old.style.display="none"}else{home.insertBefore(sec,home.children[1]||null)}
var bar=sec.querySelector(".mn-catbar__bar"),ind=sec.querySelector(".mn-catbar__ind"),subs=sec.querySelector(".mn-catbar__subs"),vp=sec.querySelector(".mn-catbar__vp"),track=sec.querySelector(".mn-catbar__track"),all=sec.querySelector(".mn-catbar__all");
var cache={},curPath="",curItems=null,reqId=0,started=false;
CATS.forEach(function(c,i){var b=document.createElement("button");b.type="button";b.className="mn-catbar__tab";b.setAttribute("role","tab");b.textContent=c[0];b.addEventListener("click",function(){selectCat(i)});bar.appendChild(b)});
var tabs=bar.querySelectorAll(".mn-catbar__tab");
function ctr(box,b){var l=b.offsetLeft-(box.clientWidth-b.offsetWidth)/2;if(box.scrollTo)box.scrollTo({left:l,behavior:"smooth"});else box.scrollLeft=l}
function moveInd(b){ind.style.width=b.offsetWidth+"px";ind.style.transform="translateX("+b.offsetLeft+"px)";ctr(bar,b)}
function selectCat(i){
var c=CATS[i];
tabs.forEach(function(t,k){t.classList.toggle("is-on",k===i);t.setAttribute("aria-selected",k===i?"true":"false")});
moveInd(tabs[i]);
subs.innerHTML="";
if(c[2]){
var list=[["Todo",c[1]]].concat(c[2]);
list.forEach(function(s,k){var b=document.createElement("button");b.type="button";b.className="mn-catbar__chip"+(k===0?" is-on":"");b.textContent=s[0];b.addEventListener("click",function(){subs.querySelectorAll(".mn-catbar__chip").forEach(function(x){x.classList.remove("is-on")});b.classList.add("is-on");ctr(subs,b);load(s[1],k===0?c[0]:s[0])});subs.appendChild(b)});
subs.scrollLeft=0;
}
load(c[1],c[0]);
}
function load(path,name){
curPath=path;all.href=path;all.textContent="Ver todo en "+name;
if(!started)return;
var my=++reqId;
if(cache[path]){render(cache[path]);return}
skeleton();
fetch(path+"page/1/?results_only=true&limit="+LIMIT,{credentials:"same-origin"}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(h){var it=parse(h);cache[path]=it;if(my===reqId)render(it)}).catch(function(){if(my===reqId){curItems=null;half=0;x=0;paint();track.innerHTML='<div class="mn-catbar__msg">No pudimos cargar los productos. <a href="'+esc(path)+'">Ver la categoría</a></div>'}});
}
function skeleton(){curItems=null;half=0;x=0;var s="";for(var k=0;k<8;k++)s+='<div class="mn-catbar__card mn-catbar__sk"><span class="mn-catbar__img"></span><span class="mn-catbar__name">&nbsp;</span><span class="mn-catbar__price">&nbsp;</span></div>';track.innerHTML=s;paint()}
function card(p){return'<a class="mn-catbar__card" href="'+esc(p.u)+'" draggable="false"><span class="mn-catbar__img">'+(p.i?'<img src="'+esc(p.i)+'" alt="'+esc(p.n)+'" decoding="async" draggable="false">':'')+'</span><span class="mn-catbar__name">'+esc(p.n)+'</span><span class="mn-catbar__price">'+(p.c?'<s>'+esc(p.c)+'</s>':'')+esc(p.p)+'</span></a>'}
function render(items){
curItems=items;x=0;half=0;
if(!items.length){track.innerHTML='<div class="mn-catbar__msg">Muy pronto vas a encontrar productos acá.</div>';paint();return}
var one=items.map(card).join("");
track.innerHTML=one;
var w=track.scrollWidth||1,reps=Math.max(1,Math.ceil((vp.clientWidth+40)/w)),set="";
for(var k=0;k<reps;k++)set+=one;
track.innerHTML=set+set;
var cs=track.children,n=items.length*reps;
half=cs[n].offsetLeft-cs[0].offsetLeft;
paint();
}
var x=0,half=0,last=0,raf=0,visible=false,hover=false,drag=null,blockClick=false;
function wrap(){if(half>0){while(x<=-half)x+=half;while(x>0)x-=half}}
function paint(){track.style.transform="translate3d("+x+"px,0,0)"}
function frame(t){
if(!last)last=t;var dt=Math.min(64,t-last);last=t;
if(!hover&&!drag&&half>0){x-=SPEED*dt/1000;wrap();paint()}
raf=visible?requestAnimationFrame(frame):0;if(!raf)last=0;
}
function startLoop(){if(!raf&&visible)raf=requestAnimationFrame(frame)}
if(window.matchMedia&&matchMedia("(hover:hover)").matches){vp.addEventListener("mouseenter",function(){hover=true});vp.addEventListener("mouseleave",function(){hover=false})}
vp.addEventListener("pointerdown",function(e){if(half<=0)return;drag={sx:e.clientX,sy:e.clientY,x0:x,moved:false}});
window.addEventListener("pointermove",function(e){if(!drag)return;var dx=e.clientX-drag.sx;if(!drag.moved&&Math.abs(dx)>6)drag.moved=true;if(drag.moved){x=drag.x0+dx;wrap();paint()}});
function endDrag(){if(drag&&drag.moved){blockClick=true;setTimeout(function(){blockClick=false},50)}drag=null}
window.addEventListener("pointerup",endDrag);window.addEventListener("pointercancel",function(){drag=null});
vp.addEventListener("click",function(e){if(blockClick){e.preventDefault();e.stopPropagation()}},true);
vp.addEventListener("dragstart",function(e){e.preventDefault()});
var rt;window.addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){var on=bar.querySelector(".is-on");if(on)moveInd(on);if(curItems)render(curItems)},200)});
function begin(){if(started)return;started=true;var on=bar.querySelector(".mn-catbar__tab.is-on"),i=0;tabs.forEach(function(t,k){if(t===on)i=k});var chip=subs.querySelector(".mn-catbar__chip.is-on");load(curPath,chip&&chip.textContent!=="Todo"?chip.textContent:CATS[i][0])}
selectCat(0);
if("IntersectionObserver" in window){
new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)begin()})},{rootMargin:"400px 0px"}).observe(sec);
new IntersectionObserver(function(en){en.forEach(function(e){visible=e.isIntersecting;if(visible)startLoop()})}).observe(vp);
}else{visible=true;begin();startLoop()}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
// FIN custom
