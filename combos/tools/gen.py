import json, os, re
OUT='/tmp/claude-0/-home-claude/6c41f837-c0df-5d50-bf52-ab551653eeb2/scratchpad/combos/repo'
L=json.load(open(f'{OUT}/layout.json'))

PROD=[
 dict(k='04', t='COMBO MATES Y RUTA',     h='combo-mates-y-ruta-outzf', p='368857640', v='1601915565', pr='11.760', off='-30%'),
 dict(k='01', t='COMBO MALVINAS',         h='combo-malvinas-11rg8',     p='358681241', v='1568801286', pr='10.290', off='-30%'),
 dict(k='02', t='MEGACOMBO MALVINAS XL', h='megacombo-malvinas-buedv', p='359846355', v='1572899510', pr='17.599', off='-30%'),
 dict(k='03', t='COMBO MALVINAS MAX',     h='combo-malvinas-max-4z78a', p='365680415', v='1591248734', pr='29.990', off='-32%'),
]
STICKERS={d['k']: L[d['k']]['st'] for d in PROD}

CSS = """
@font-face{font-family:'ComanFat';src:url('__B__fatfont.woff2') format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Bebas';src:url('__B__bebas.woff2') format('woff2');font-weight:400;font-display:swap}
.mn-cmb{padding:34px 0 24px;margin-bottom:0;overflow-x:clip;background:#fff}
.mn-cmb__in{max-width:1300px;margin:0 auto;padding:0 15px}
.mn-cmb__tit{font-family:ComanFat,Montserrat,sans-serif;font-weight:400;font-size:clamp(32px,8.5vw,56px);line-height:1;color:#10233f;text-align:center;margin:0 0 8px;-webkit-text-stroke:.42em #fff;paint-order:stroke fill}
.mn-cmb__sub{font-family:Poppins,sans-serif;font-size:15px;line-height:1.5;color:#4a5b73;text-align:center;margin:0 0 24px}
.mn-cmb__grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:16px}
.mn-cmb__card{position:relative;display:flex;flex-direction:column;border-radius:24px;padding:18px 16px 16px;background:var(--bg);isolation:isolate;transition:transform .4s cubic-bezier(.22,.7,.3,1),box-shadow .4s ease}
.mn-cmb__card::after{content:"";position:absolute;inset:8px;border-radius:17px;border:1.5px solid var(--ln);pointer-events:none;z-index:4}
.mn-cmb__off{align-self:center;font-family:Montserrat,sans-serif;font-weight:800;font-size:11px;letter-spacing:.09em;padding:4px 11px;border-radius:999px;background:var(--fg);color:var(--bg);margin:0 0 9px}
.mn-cmb__name{font-family:Bebas,Montserrat,sans-serif;font-weight:400;font-size:clamp(28px,7.4vw,38px);line-height:1.05;text-align:center;color:var(--fg);margin:0 0 8px;min-height:2.1em;display:flex;align-items:center;justify-content:center;padding:0 4px;-webkit-text-stroke:.10em var(--bg);paint-order:stroke fill;text-wrap:balance}
.mn-cmb__stage{position:relative;width:100%;aspect-ratio:27/34;display:flex;align-items:center;justify-content:center}
.mn-cmb__scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transition:transform .5s cubic-bezier(.22,.7,.3,1)}
.mn-cmb__bot{position:relative;z-index:2;height:100%;width:auto;aspect-ratio:270/825;max-width:none;display:block;filter:drop-shadow(0 12px 20px rgba(16,35,63,.35))}
.mn-cmb__cluster{position:absolute;z-index:1;left:50%;top:46%;width:118%;aspect-ratio:.76;transform:translate(-50%,-50%);pointer-events:none}
.mn-cmb__st{position:absolute;left:var(--x);top:var(--y);width:var(--w);height:auto;opacity:0;transform:translate(calc(-50% + var(--cx)),calc(-50% + var(--cy))) scale(.22);transition:transform .62s cubic-bezier(.24,.9,.3,1),opacity .3s ease;transition-delay:calc(var(--i)*22ms);filter:drop-shadow(0 3px 5px rgba(16,35,63,.3))}
.mn-cmb__act{position:absolute;z-index:3;left:16px;right:16px;bottom:16px;display:flex;flex-direction:column;gap:8px;opacity:0;transform:translateY(12px);transition:opacity .3s ease,transform .4s cubic-bezier(.22,.7,.3,1);pointer-events:none}
.mn-cmb__f{margin:0}
.mn-cmb__buy{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap;border:0;cursor:pointer;border-radius:12px;padding:13px 14px;font-family:Montserrat,sans-serif;font-weight:800;font-size:12px;letter-spacing:.02em;text-transform:uppercase;background:var(--fg);color:var(--bg);transition:filter .2s ease}
.mn-cmb__pr{font-size:14px}
.mn-cmb__see{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;white-space:nowrap;box-sizing:border-box;border-radius:12px;padding:11px 14px;font-family:Montserrat,sans-serif;font-weight:700;font-size:12px;letter-spacing:.02em;text-transform:uppercase;text-decoration:none;border:1.5px solid var(--ln2);color:var(--fg);background:var(--bg);transition:background .2s ease}
.mn-cmb__see svg{flex:none;width:15px;height:15px;stroke:currentColor;stroke-width:2.2;fill:none}
.mn-cmb__card.is-on,.mn-cmb__card:hover,.mn-cmb__card:focus-within{transform:translateY(-6px);box-shadow:0 20px 38px rgba(16,35,63,.3)}
.mn-cmb__card.is-on .mn-cmb__scene,.mn-cmb__card:hover .mn-cmb__scene,.mn-cmb__card:focus-within .mn-cmb__scene{transform:scale(.7) translateY(-10%)}
.mn-cmb__card.is-on .mn-cmb__st,.mn-cmb__card:hover .mn-cmb__st,.mn-cmb__card:focus-within .mn-cmb__st{opacity:1;transform:translate(-50%,-50%) rotate(var(--r)) scale(1)}
.mn-cmb__card.is-on .mn-cmb__act,.mn-cmb__card:hover .mn-cmb__act,.mn-cmb__card:focus-within .mn-cmb__act{opacity:1;transform:translateY(0);pointer-events:auto}
.mn-cmb__buy:hover{filter:brightness(1.15)}
.mn-cmb__see:hover{background:var(--ln)}
.mn-cmb__buy:focus-visible,.mn-cmb__see:focus-visible{outline:3px solid var(--fg);outline-offset:3px}
@media (min-width:640px){.mn-cmb__grid{grid-template-columns:1fr 1fr;gap:18px}}
@media (min-width:1000px){
.mn-cmb{padding:44px 0 28px}
.mn-cmb__sub{margin-bottom:32px}
.mn-cmb__grid{grid-template-columns:repeat(4,1fr);gap:18px}
.mn-cmb__name{font-size:30px;min-height:2.1em}
.mn-cmb__card{padding:20px 16px 16px}
}
"""

JS = """(function(){
var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "%%BASE%%";})();
/* ===================== EDITA SOLO ESTE BLOQUE =====================
   t  = titulo que se ve en la tarjeta
   pr = precio que se muestra en el boton
   off= cartelito de descuento
   h  = handle del producto (lo que va despues de /productos/ en la URL)
   p  = product_id   |   v = variant_id   |   k = que juego de stickers usa
   ================================================================== */
var TITULO="ELEGÍ TU COMBO";
var SUBTITULO="Más stickers, mejor precio. Vinilo UV resistente al agua y al sol.";
var P=%%DATA%%
/* =================== FIN DEL BLOQUE EDITABLE ====================== */
var L=%%STICKERS%%;
var CSS=%%CSS%%;
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function init(){
if(document.getElementById("mn-combos"))return true;
var ancla=document.getElementById("mn-calidad");
if(!ancla){var r=document.getElementById("mn-reviews");if(r)ancla=r.nextElementSibling;}
if(!ancla)return false;
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
+'<button type="submit" class="mn-cmb__buy js-addtocart js-prod-submit-form">Agregar al carrito <span class="mn-cmb__pr">$'+p.pr+'</span></button>'
+'</form>'
+'<a class="mn-cmb__see" href="/productos/'+p.h+'/">Ver producto <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></a>'
+'</div></li>';
}
h+='</ul></div>';
s.innerHTML=h;
ancla.parentNode.insertBefore(s,ancla);
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
return true;
}
/* Las secciones ancla (#mn-reviews, #mn-calidad) las crea otro script.
   Si todavia no estan, esperamos a que aparezcan en vez de rendirnos. */
var mo=null;
function arrancar(){
if(init())return;
if(mo)return;
mo=new MutationObserver(function(){if(init()&&mo){mo.disconnect();mo=null;}});
mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(function(){if(mo){mo.disconnect();mo=null;}},15000);
}
document.readyState!=="loading"?arrancar():document.addEventListener("DOMContentLoaded",arrancar);
window.addEventListener("pageshow",function(){arrancar();});
})();
"""

def make(base):
    css = CSS
    prod = "[\n" + ",\n".join(
        ' {k:"%s", t:"%s", pr:"%s", off:"%s", h:"%s", p:"%s", v:"%s"}' %
        (d['k'], d['t'], d['pr'], d['off'], d['h'], d['p'], d['v']) for d in PROD) + "\n];"
    return (JS.replace('%%BASE%%', base)
              .replace('%%DATA%%', prod)
              .replace('%%STICKERS%%', json.dumps(STICKERS, separators=(',',':'), ensure_ascii=False))
              .replace('%%CSS%%', json.dumps(css)))

BASE_CDN='https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@v1.0.0/combos/'
open(f'{OUT}/combos.js','w').write(make(BASE_CDN))
open('/tmp/combos.local.js','w').write(make('./'))
print('combos.js', os.path.getsize(f'{OUT}/combos.js'), 'bytes')
