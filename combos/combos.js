(function(){
var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@v1.0.0/combos/";})();
/* ===================== EDITA SOLO ESTE BLOQUE =====================
   t  = titulo que se ve en la tarjeta
   pr = precio que se muestra en el boton
   off= cartelito de descuento
   h  = handle del producto (lo que va despues de /productos/ en la URL)
   p  = product_id   |   v = variant_id   |   k = que juego de stickers usa
   mi = nombre del archivo de la foto del producto (para la miniatura del aviso)
   ================================================================== */
var TITULO="ELEGÍ TU COMBO";
var SUBTITULO="Más stickers, mejor precio. Vinilo UV resistente al agua y al sol.";
var P=[
 {k:"04", t:"COMBO MATES Y RUTA", pr:"11.760", off:"-30%", h:"combo-mates-y-ruta-outzf", p:"368857640", v:"1601915565", mi:"combo-mates-y-ruta2-1d478ac4d448c9ff8e17900172510935"},
 {k:"01", t:"COMBO MALVINAS", pr:"10.290", off:"-30%", h:"combo-malvinas-11rg8", p:"358681241", v:"1568801286", mi:"14-ed75bc75a5bd7d0b8b17855174061536"},
 {k:"02", t:"MEGACOMBO MALVINAS XL", pr:"17.599", off:"-30%", h:"megacombo-malvinas-buedv", p:"359846355", v:"1572899510", mi:"megacombo-malvinas-8fda70fd9c8b29e13117861250022255"},
 {k:"03", t:"COMBO MALVINAS MAX", pr:"29.990", off:"-32%", h:"combo-malvinas-max-4z78a", p:"365680415", v:"1591248734", mi:"combo-malvinas-max-3b3c3a1231b7051f7317886361043587"}
];
/* =================== FIN DEL BLOQUE EDITABLE ====================== */
var L={"04":[{"s":"t25","x":24.82,"y":20.34,"w":39.27,"hh":40.67,"r":32.4,"cx":64.1,"cy":72.9},{"s":"t22","x":81.56,"y":48.29,"w":31.14,"hh":43.94,"r":21.1,"cx":-101.4,"cy":3.9},{"s":"t23","x":66.98,"y":24.67,"w":20.08,"hh":38.65,"r":6.0,"cx":-84.6,"cy":65.5},{"s":"t20","x":76.28,"y":78.0,"w":26.56,"hh":44.0,"r":16.7,"cx":-98.9,"cy":-63.6},{"s":"t26","x":22.45,"y":47.25,"w":39.15,"hh":37.81,"r":-6.1,"cx":70.4,"cy":7.3},{"s":"t24","x":49.33,"y":20.77,"w":25.18,"hh":33.14,"r":6.9,"cx":2.7,"cy":88.2},{"s":"t21","x":25.54,"y":71.83,"w":24.48,"hh":27.54,"r":-11.0,"cx":99.9,"cy":-79.3},{"s":"t27","x":52.26,"y":60.04,"w":41.19,"hh":49.38,"r":-3.1,"cx":-5.5,"cy":-20.3}],"01":[{"s":"m27","x":35.01,"y":75.14,"w":65.82,"hh":23.07,"r":5.3,"cx":22.8,"cy":-108.9},{"s":"m24","x":56.47,"y":23.16,"w":34.83,"hh":19.65,"r":-8.6,"cx":-18.6,"cy":136.6},{"s":"m29","x":29.47,"y":51.63,"w":29.51,"hh":29.51,"r":-0.1,"cx":69.6,"cy":-5.5},{"s":"m23","x":55.24,"y":49.2,"w":29.69,"hh":28.7,"r":1.9,"cx":-17.6,"cy":2.8},{"s":"m26","x":85.23,"y":31.39,"w":27.06,"hh":31.05,"r":0.0,"cx":-130.2,"cy":59.9},{"s":"m22","x":83.65,"y":65.29,"w":32.7,"hh":36.91,"r":-0.0,"cx":-102.9,"cy":-41.4},{"s":"m25","x":18.4,"y":30.55,"w":36.8,"hh":31.83,"r":20.0,"cx":85.9,"cy":61.1}],"02":[{"s":"m22","x":84.01,"y":57.07,"w":25.54,"hh":28.83,"r":11.2,"cx":-133.2,"cy":-24.5},{"s":"m20","x":29.07,"y":18.72,"w":28.65,"hh":26.14,"r":-8.8,"cx":73.0,"cy":119.6},{"s":"m24","x":71.06,"y":43.01,"w":29.53,"hh":16.66,"r":16.5,"cx":-71.3,"cy":42.0},{"s":"m23","x":87.41,"y":79.19,"w":25.18,"hh":24.34,"r":16.1,"cx":-148.6,"cy":-119.9},{"s":"m19","x":57.78,"y":20.06,"w":21.62,"hh":14.91,"r":16.8,"cx":-36.0,"cy":200.8},{"s":"m28","x":46.07,"y":58.28,"w":38.98,"hh":39.21,"r":-0.0,"cx":10.1,"cy":-21.1},{"s":"m21","x":48.03,"y":32.84,"w":36.11,"hh":15.07,"r":0.0,"cx":5.5,"cy":113.8},{"s":"m29","x":69.05,"y":72.82,"w":24.7,"hh":24.7,"r":0.0,"cx":-77.1,"cy":-92.4},{"s":"m25","x":19.59,"y":46.99,"w":35.42,"hh":32.39,"r":30.0,"cx":85.9,"cy":9.3},{"s":"m26","x":14.25,"y":75.34,"w":28.49,"hh":32.7,"r":0.0,"cx":125.5,"cy":-77.5},{"s":"m18","x":74.32,"y":28.88,"w":18.4,"hh":12.65,"r":-0.0,"cx":-132.2,"cy":166.9},{"s":"m27","x":48.6,"y":86.67,"w":43.82,"hh":15.36,"r":-0.1,"cx":3.2,"cy":-238.7}],"03":[{"s":"m21","x":16.32,"y":27.6,"w":32.64,"hh":13.62,"r":-10.2,"cx":103.2,"cy":164.5},{"s":"m22","x":13.22,"y":45.5,"w":23.97,"hh":27.06,"r":-28.1,"cx":153.4,"cy":16.6},{"s":"x27","x":75.83,"y":84.17,"w":18.29,"hh":21.66,"r":16.1,"cx":-141.2,"cy":-157.8},{"s":"m20","x":87.38,"y":44.58,"w":25.23,"hh":23.02,"r":18.4,"cx":-148.2,"cy":23.5},{"s":"m24","x":18.27,"y":63.32,"w":24.85,"hh":14.02,"r":-11.1,"cx":127.7,"cy":-95.0},{"s":"m29","x":41.53,"y":19.62,"w":16.44,"hh":16.44,"r":4.0,"cx":51.5,"cy":184.8},{"s":"x25","x":80.66,"y":64.91,"w":28.24,"hh":23.02,"r":11.0,"cx":-108.6,"cy":-64.8},{"s":"m23","x":31.83,"y":44.57,"w":24.78,"hh":23.95,"r":15.8,"cx":73.3,"cy":22.7},{"s":"m18","x":36.45,"y":80.29,"w":16.99,"hh":11.68,"r":12.8,"cx":79.7,"cy":-259.2},{"s":"x23","x":65.71,"y":21.71,"w":24.16,"hh":26.58,"r":0.0,"cx":-65.0,"cy":106.4},{"s":"m28","x":56.16,"y":66.14,"w":25.3,"hh":25.44,"r":0.0,"cx":-24.3,"cy":-63.5},{"s":"x20","x":22.51,"y":16.07,"w":16.31,"hh":16.11,"r":0.0,"cx":168.5,"cy":210.6},{"s":"x24","x":85.14,"y":26.85,"w":16.72,"hh":19.13,"r":-10.0,"cx":-210.2,"cy":121.0},{"s":"x21","x":55.54,"y":12.85,"w":15.5,"hh":15.71,"r":0.0,"cx":-35.7,"cy":236.5},{"s":"x28","x":35.5,"y":67.13,"w":18.93,"hh":19.13,"r":-10.0,"cx":76.6,"cy":-89.5},{"s":"m26","x":18.18,"y":81.22,"w":19.33,"hh":22.35,"r":0.0,"cx":164.6,"cy":-139.7},{"s":"x26","x":69.23,"y":44.67,"w":21.95,"hh":28.2,"r":0.0,"cx":-87.6,"cy":18.9},{"s":"m27","x":36.51,"y":89.37,"w":23.36,"hh":8.06,"r":0.0,"cx":57.8,"cy":-488.7},{"s":"m19","x":55.07,"y":41.01,"w":21.29,"hh":14.68,"r":0.8,"cx":-23.8,"cy":61.2},{"s":"x22","x":46.7,"y":51.48,"w":14.91,"hh":14.91,"r":0.0,"cx":22.1,"cy":-9.9},{"s":"m25","x":56.34,"y":85.85,"w":21.15,"hh":15.5,"r":0.0,"cx":-30.0,"cy":-231.2}]};
var CSS="\n@font-face{font-family:'ComanFat';src:url('__B__fatfont.woff2') format('woff2');font-weight:400;font-display:swap}\n@font-face{font-family:'Bebas';src:url('__B__bebas.woff2') format('woff2');font-weight:400;font-display:swap}\n.mn-cmb{padding:34px 0 24px;margin-bottom:0;overflow-x:clip;background:#fff}\n.mn-cmb__in{max-width:1300px;margin:0 auto;padding:0 15px}\n.mn-cmb__tit{font-family:ComanFat,Montserrat,sans-serif;font-weight:400;font-size:clamp(32px,8.5vw,56px);line-height:1;color:#10233f;text-align:center;margin:0 0 8px;-webkit-text-stroke:.42em #fff;paint-order:stroke fill}\n.mn-cmb__sub{font-family:Poppins,sans-serif;font-size:15px;line-height:1.5;color:#4a5b73;text-align:center;margin:0 0 24px}\n.mn-cmb__grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:16px}\n.mn-cmb__card{position:relative;display:flex;flex-direction:column;border-radius:24px;padding:18px 16px 16px;background:var(--bg);isolation:isolate;transition:transform .4s cubic-bezier(.22,.7,.3,1),box-shadow .4s ease}\n.mn-cmb__card::after{content:\"\";position:absolute;inset:8px;border-radius:17px;border:1.5px solid var(--ln);pointer-events:none;z-index:4}\n.mn-cmb__off{align-self:center;font-family:Montserrat,sans-serif;font-weight:800;font-size:11px;letter-spacing:.09em;padding:4px 11px;border-radius:999px;background:var(--fg);color:var(--bg);margin:0 0 9px}\n.mn-cmb__name{font-family:Bebas,Montserrat,sans-serif;font-weight:400;font-size:clamp(28px,7.4vw,38px);line-height:1.05;text-align:center;color:var(--fg);margin:0 0 8px;min-height:2.1em;display:flex;align-items:center;justify-content:center;padding:0 4px;-webkit-text-stroke:.10em var(--bg);paint-order:stroke fill;text-wrap:balance}\n.mn-cmb__stage{position:relative;width:100%;aspect-ratio:27/34;display:flex;align-items:center;justify-content:center}\n.mn-cmb__scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .5s cubic-bezier(.22,.7,.3,1)}\n.mn-cmb__bot{position:relative;z-index:2;height:100%;width:auto;aspect-ratio:270/825;max-width:none;display:block;filter:drop-shadow(0 12px 20px rgba(16,35,63,.35))}\n.mn-cmb__cluster{position:absolute;z-index:1;left:50%;top:46%;width:118%;aspect-ratio:.76;transform:translate(-50%,-50%);pointer-events:none}\n.mn-cmb__st{position:absolute;left:var(--x);top:var(--y);width:var(--w);height:auto;opacity:0;transform:translate(calc(-50% + var(--cx)),calc(-50% + var(--cy))) scale(.22);transition:transform .62s cubic-bezier(.24,.9,.3,1),opacity .3s ease;transition-delay:calc(var(--i)*22ms);filter:drop-shadow(0 3px 5px rgba(16,35,63,.3))}\n.mn-cmb__act{position:absolute;z-index:3;left:16px;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .4s cubic-bezier(.22,.7,.3,1);pointer-events:none}\n.mn-cmb__f{margin:0}\n.mn-cmb__buy{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap;border:0;cursor:pointer;border-radius:12px;padding:13px 14px;font-family:Montserrat,sans-serif;font-weight:800;font-size:12px;letter-spacing:.02em;text-transform:uppercase;background:var(--fg);color:var(--bg);transition:filter .2s ease}\n.mn-cmb__pr{font-size:14px}\n.mn-cmb__see{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap;box-sizing:border-box;border-radius:12px;padding:11px 14px;font-family:Montserrat,sans-serif;font-weight:700;font-size:12px;letter-spacing:.02em;text-transform:uppercase;text-decoration:none;border:1.5px solid var(--ln2);color:var(--fg);background:var(--bg);transition:background .2s ease}\n.mn-cmb__see svg{flex:none;width:15px;height:15px;stroke:currentColor;stroke-width:2.2;fill:none}\n.mn-cmb__card.is-on,.mn-cmb__card:hover,.mn-cmb__card:focus-within{transform:translateY(-6px);box-shadow:0 20px 38px rgba(16,35,63,.3)}\n.mn-cmb__card.is-on .mn-cmb__scene,.mn-cmb__card:hover .mn-cmb__scene,.mn-cmb__card:focus-within .mn-cmb__scene{transform:scale(.7) translateY(-10%)}\n.mn-cmb__card.is-on .mn-cmb__st,.mn-cmb__card:hover .mn-cmb__st,.mn-cmb__card:focus-within .mn-cmb__st{opacity:1;transform:translate(-50%,-50%) rotate(var(--r)) scale(1)}\n.mn-cmb__card.is-on .mn-cmb__act,.mn-cmb__card:hover .mn-cmb__act,.mn-cmb__card:focus-within .mn-cmb__act{opacity:1;transform:translateY(0);pointer-events:auto}\n.mn-cmb__buy:hover{filter:brightness(1.15)}\n.mn-cmb__see:hover{background:var(--ln)}\n.mn-cmb__buy:focus-visible,.mn-cmb__see:focus-visible{outline:3px solid var(--fg);outline-offset:3px}\n@media (min-width:640px){.mn-cmb__grid{grid-template-columns:1fr 1fr;gap:18px}}\n@media (min-width:1000px){\n.mn-cmb{padding:44px 0 28px}\n.mn-cmb__sub{margin-bottom:32px}\n.mn-cmb__grid{grid-template-columns:repeat(4,1fr);gap:18px}\n.mn-cmb__name{font-size:30px;min-height:2.1em}\n.mn-cmb__card{padding:20px 16px 16px}\n}\n";
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function construir(){
var st=document.createElement("style");st.textContent=CSS.split("__B__").join(BASE);document.head.appendChild(st);
var s=document.createElement("section");
s.id="mn-combos";s.className="mn-cmb";s.setAttribute("aria-labelledby","mn-cmb-tit");
var h='<div class="mn-cmb__in"><h2 class="mn-cmb__tit" id="mn-cmb-tit">'+esc(TITULO)+'</h2>'
+'<p class="mn-cmb__sub">'+esc(SUBTITULO)+'</p>'
+'<ul class="mn-cmb__grid">';
for(var i=0;i<P.length;i++){
var p=P[i], dark=i%2===1;
var vars=dark?'--bg:#10233f;--fg:#fff;--ln:rgba(255,255,255,.22);--ln2:rgba(255,255,255,.5)'
             :'--bg:#87b4d3;--fg:#10233f;--ln:rgba(16,35,63,.18);--ln2:rgba(16,35,63,.45)';
var cl='';
var SS=L[p.k]||[];
for(var j=0;j<SS.length;j++){var k=SS[j];
cl+='<img class="mn-cmb__st" alt="" aria-hidden="true" decoding="async" data-src="'+BASE+'img/'+k.s+'.webp"'
  +' style="--x:'+k.x+'%;--y:'+k.y+'%;--w:'+k.w+'%;--r:'+k.r+'deg;--cx:'+k.cx+'%;--cy:'+k.cy+'%;--i:'+j+'">';
}
h+='<li class="mn-cmb__card" style="'+vars+'">'
+'<span class="mn-cmb__off">'+p.off+' OFF</span>'
+'<h3 class="mn-cmb__name">'+esc(p.t)+'</h3>'
+'<div class="mn-cmb__stage"><div class="mn-cmb__scene">'
+'<div class="mn-cmb__cluster">'+cl+'</div>'
+'<img class="mn-cmb__bot" width="270" height="825" loading="lazy" decoding="async" src="'+BASE+'img/b'+p.k+'.webp" alt="Termo con los stickers del '+esc(p.t)+'">'
+'</div></div>'
+'<div class="mn-cmb__act">'
+'<form class="mn-cmb__f js-product-form" method="post" action="/comprar/">'
+'<input type="hidden" name="add_to_cart" value="'+p.p+'">'
+'<input type="hidden" name="variant_id" value="'+p.v+'">'
+'<input type="hidden" name="quantity" value="1">'
+'<button type="submit" class="mn-cmb__buy js-addtocart js-prod-submit-form" data-mini="'+p.mi+'" data-nom="'+esc(p.t)+'" data-pr="'+p.pr+'">Agregar al carrito <span class="mn-cmb__pr">$'+p.pr+'</span></button>'
+'</form>'
+'<a class="mn-cmb__see" href="/productos/'+p.h+'/">Ver producto <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>'
+'</div></li>';
}
h+='</ul></div>';
s.innerHTML=h;
/* El aviso "Agregado al carrito" del tema saca foto, nombre y precio del contexto de
   la pagina (en la ficha los tiene; en una seccion inyectada como esta, no) y ADEMAS
   no limpia los slots: deja los datos del producto anterior. Por eso los PISAMOS con
   los del combo, no los rellenamos solo si estan vacios.
   Solo actua durante los 6 s posteriores a un clic nuestro. */
var CDNTN="https://acdn-us.mitiendanube.com/stores/001/911/110/products/";
s.addEventListener("click",function(e){
var b=e.target.closest?e.target.closest(".mn-cmb__buy"):null;
if(!b)return;
var mi=b.getAttribute("data-mini"); if(!mi)return;
var url=CDNTN+mi+"-240-0.webp";
var nom=b.getAttribute("data-nom")||"";
var pr=b.getAttribute("data-pr")||"";
var precio=pr?("$"+pr+(pr.indexOf(",")<0?",00":"")):"";
var fin=Date.now()+6000;
function poner(cls,val){
var es=document.querySelectorAll("."+cls), ok=es.length>0;
for(var i=0;i<es.length;i++){if(es[i].textContent!==val){es[i].textContent=val;ok=false;}}
return ok;
}
function ponerImg(){
var es=document.querySelectorAll(".js-cart-notification-item-img"), ok=es.length>0;
for(var i=0;i<es.length;i++){
if(es[i].getAttribute("srcset")){es[i].removeAttribute("srcset");ok=false;}
if(es[i].getAttribute("src")!==url){es[i].src=url;es[i].alt=nom;ok=false;}
}
return ok;
}
var iv=setInterval(function(){
var a=ponerImg();
var b1=poner("js-cart-notification-item-name",nom);
var c=poner("js-cart-notification-item-quantity","1");
var d=poner("js-cart-notification-item-price",precio);
if((a&&b1&&c&&d)||Date.now()>fin)clearInterval(iv);
},120);
});
var cards=s.querySelectorAll(".mn-cmb__card");
function warm(c){if(c.getAttribute("data-w"))return;c.setAttribute("data-w","1");
var im=c.querySelectorAll("img[data-src]");
for(var i=0;i<im.length;i++){im[i].src=im[i].getAttribute("data-src");im[i].removeAttribute("data-src");}}
for(var i=0;i<cards.length;i++){(function(c){
c.addEventListener("mouseenter",function(){warm(c);});
c.addEventListener("focusin",function(){warm(c);});
})(cards[i]);}
var mq=window.matchMedia("(max-width:999px)"),io=null,ip=null;
function on(){if(io||!("IntersectionObserver" in window))return;
ip=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)warm(e.target);});},{rootMargin:"60% 0px"});
io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("is-on",e.isIntersecting);});},{rootMargin:"-42% 0px -42% 0px",threshold:0});
for(var i=0;i<cards.length;i++){ip.observe(cards[i]);io.observe(cards[i]);}}
function off(){if(!io)return;io.disconnect();io=null;if(ip){ip.disconnect();ip=null;}
for(var i=0;i<cards.length;i++)cards[i].classList.remove("is-on");}
function sync(){mq.matches?on():off();}
sync();
mq.addEventListener?mq.addEventListener("change",sync):mq.addListener(sync);
return s;
}
/* #mn-reviews y #mn-calidad las crea OTRO script (Codigos externos), asi que pueden
   no existir todavia, o aparecer/moverse despues. En vez de insertar una sola vez y
   confiar, nos quedamos mirando el DOM y nos re-ubicamos si hace falta. */
var sec=null, mo=null, t0=Date.now();
function ubicar(){
if(!sec)return false;
var cal=document.getElementById("mn-calidad");
if(cal&&cal.parentNode){
if(cal.previousElementSibling!==sec)cal.parentNode.insertBefore(sec,cal);
return true;
}
if(Date.now()-t0>12000){ /* plan B: si #mn-calidad nunca aparece, va despues de resenas */
var r=document.getElementById("mn-reviews");
if(r&&r.parentNode){if(r.nextElementSibling!==sec)r.parentNode.insertBefore(sec,r.nextElementSibling);return true;}
}
return false;
}
function arrancar(){
if(!sec)sec=construir();
ubicar();
if(mo)return;
mo=new MutationObserver(function(){ubicar();});
mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(function(){ubicar();if(mo){mo.disconnect();mo=null;}},15000);
}
document.readyState!=="loading"?arrancar():document.addEventListener("DOMContentLoaded",arrancar);
window.addEventListener("pageshow",function(){t0=Date.now();arrancar();});
})();
