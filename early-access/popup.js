// INICIO custom: early-access-popup
// Pop-up "Early Access · Cyber Coman" (compu y celular). v1 (19/10/2026)
// Se carga desde Códigos externos con una sola línea <script src=...jsdelivr...>
// Aparece una sola vez: a los 9 segundos o al 40% de scroll. Si lo cierran, no vuelve por 3 días.
// No aparece a quien ya se anotó (en la sección o en el pop-up). Se apaga solo el 2/11/2026.
(function(){
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var ENDPOINT="https://script.google.com/macros/s/AKfycbygRcED1tLhlUsGt1ETsGHU_p6kHvVqoGxlSMomVhj_Dswxi_a77Dkfp5f5si_nTF-p-Q/exec";
var FOTO="https://acdn-us.mitiendanube.com/stores/001/911/110/products/img_20250430_160355-7d224f6ff7123cc35b17924229524260-1024-1024.webp";
var CHIP="EARLY ACCESS · CYBER COMAN";
var TITULO_1="Llega el descuento";
var TITULO_2="más importante del año";
var TEXTO="Anotate y entrá antes que nadie, con promociones exclusivas para los que se suman.";
var DEMORA_MS=9000;   // aparece a los 9 segundos...
var SCROLL=0.4;       // ...o al 40% de scroll, lo que pase primero
var PAUSA_DIAS=3;     // si lo cierran, no vuelve por 3 días
var FIN=new Date("2026-11-02T00:00:00-03:00"); // desde acá no se muestra más
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if(new Date()>=FIN) return;
// No interrumpir el proceso de compra
if(/checkout|comprar|carrito|cart/i.test(location.pathname)) return;

var SUB_KEY="mnEarly26Sub", SNOOZE_KEY="mnEarly26Snooze";
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
if(store(SUB_KEY)==="1") return;
if(Date.now()-Number(store(SNOOZE_KEY)||0)<PAUSA_DIAS*86400000) return;

var FONT="https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@v1.0.24/combos/bebas.woff2";
var CSS="/* INICIO custom: early-access-popup */"
+"@font-face{font-family:'mnBebas';src:url('"+FONT+"') format('woff2');font-weight:400;font-display:swap}"
+".mn-eap{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(10,20,38,.65);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}"
+".mn-eap.mn-eap--open{opacity:1;visibility:visible}"
+".mn-eap *{box-sizing:border-box}"
+".mn-eap__box{position:relative;width:100%;max-width:520px;max-height:calc(100vh - 32px);overflow-y:auto;background:#fff;color:#10233f;border-radius:22px;text-align:center;transform:translateY(16px) scale(.98);transition:transform .25s;box-shadow:0 24px 60px rgba(0,0,0,.35)}"
+".mn-eap--open .mn-eap__box{transform:none}"
+".mn-eap__img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:center 32%;background:#87b4d3}"
+".mn-eap__body{padding:20px 18px 14px}"
+".mn-eap__close{position:absolute;top:12px;right:12px;width:36px;height:36px;border:0;border-radius:50%;background:rgba(16,35,63,.75);color:#fff;font-size:22px;line-height:36px;padding:0;cursor:pointer;z-index:1}"
+".mn-eap__chip{display:inline-block;font-family:Montserrat,sans-serif;font-weight:800;font-size:11px;letter-spacing:.14em;color:#10233f;background:#87b4d3;padding:5px 12px;border-radius:999px;margin-bottom:12px}"
+".mn-eap__tit{font-family:mnBebas,Bebas,Montserrat,sans-serif;font-weight:400;font-size:34px;line-height:.95;margin:0 0 10px;color:#10233f;text-transform:uppercase}"
+".mn-eap__tit span{display:inline-block;background:#10233f;color:#fff;padding:3px 12px 0;border-radius:8px;margin-top:4px}"
+".mn-eap__txt{font-family:Poppins,sans-serif;font-size:15px;line-height:1.5;color:#41506b;margin:0 auto 18px;max-width:26em}"
+".mn-eap__form{display:flex;flex-direction:column;gap:10px;margin:0}"
+".mn-eap__form input{width:100%;height:50px;border-radius:999px;border:2px solid transparent;background:#eef2f7;padding:0 20px;font-family:Poppins,sans-serif;font-size:16px;color:#10233f;outline:none}"
+".mn-eap__form input:focus{border-color:#87b4d3}"
+".mn-eap__form button{width:100%;height:50px;border:0;border-radius:999px;padding:0 22px;cursor:pointer;background:#10233f;color:#fff;font-family:Montserrat,sans-serif;font-weight:800;font-size:14px;letter-spacing:.02em;text-transform:uppercase}"
+".mn-eap__form button:disabled{opacity:.6;cursor:default}"
+".mn-eap__msg{min-height:18px;margin:8px 0 0;font-family:Poppins,sans-serif;font-size:14px;color:#c0392b}"
+".mn-eap__done{display:none;font-family:Poppins,sans-serif;font-weight:600;font-size:15px;line-height:1.5;padding:4px 0 10px}"
+".mn-eap__done strong{display:block;font-family:mnBebas,Bebas,Montserrat,sans-serif;font-weight:400;font-size:32px}"
+".mn-eap__skip{background:none;border:0;color:#7a8aa3;font-family:Poppins,sans-serif;font-size:13px;margin-top:4px;padding:6px;cursor:pointer;text-decoration:underline}"
+".mn-eap--done .mn-eap__form,.mn-eap--done .mn-eap__msg,.mn-eap--done .mn-eap__skip{display:none}"
+".mn-eap--done .mn-eap__done{display:block}"
+"@media (min-width:600px){"
+".mn-eap__img{aspect-ratio:16/9;object-position:center 35%}"
+".mn-eap__body{padding:24px 28px 18px}"
+".mn-eap__tit{font-size:52px}"
+".mn-eap__form{flex-direction:row;gap:0;background:#eef2f7;border-radius:999px;padding:5px}"
+".mn-eap__form input{flex:1 1 auto;width:auto;min-width:0;height:46px;background:transparent;border:0}"
+".mn-eap__form button{width:auto;height:46px;white-space:nowrap}"
+"}"
+"/* FIN custom */";

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}

var pop=null, shown=false, lastFocus=null;
function construir(){
var st=document.createElement("style");st.id="mn-eap-css";st.textContent=CSS;
(document.head||document.documentElement).appendChild(st);
pop=document.createElement("div");
pop.className="mn-eap";pop.id="mn-eap";
pop.setAttribute("role","dialog");pop.setAttribute("aria-modal","true");
pop.setAttribute("aria-labelledby","mn-eap-tit");pop.setAttribute("aria-hidden","true");
pop.innerHTML='<div class="mn-eap__box">'
+'<button class="mn-eap__close" type="button" aria-label="Cerrar" data-mn-close>×</button>'
+'<img class="mn-eap__img" src="'+esc(FOTO)+'" alt="Stickers de vinilo UV de Coman Calcos" decoding="async">'
+'<div class="mn-eap__body">'
+'<div><span class="mn-eap__chip">'+esc(CHIP)+'</span></div>'
+'<h2 class="mn-eap__tit" id="mn-eap-tit">'+esc(TITULO_1)+'<br><span>'+esc(TITULO_2)+'</span></h2>'
+'<p class="mn-eap__txt">'+esc(TEXTO)+'</p>'
+'<form class="mn-eap__form" novalidate>'
+'<input type="email" name="email" placeholder="Tu mail" autocomplete="email" aria-label="Tu mail" required>'
+'<button type="submit">Quiero mi acceso</button>'
+'</form>'
+'<p class="mn-eap__msg" role="status"></p>'
+'<div class="mn-eap__done"><strong>¡Ya estás adentro!</strong>Revisá tu mail: te vamos a ir mandando novedades hasta el 31/10.</div>'
+'<button class="mn-eap__skip" type="button" data-mn-close>No, gracias</button>'
+'</div></div>';
document.body.appendChild(pop);

[].forEach.call(pop.querySelectorAll("[data-mn-close]"),function(b){b.addEventListener("click",cerrar);});
pop.addEventListener("click",function(e){if(e.target===pop)cerrar();});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&pop.classList.contains("mn-eap--open"))cerrar();});

var form=pop.querySelector(".mn-eap__form"), msg=pop.querySelector(".mn-eap__msg");
form.addEventListener("submit",function(ev){
ev.preventDefault();
var input=form.querySelector("input"), btn=form.querySelector("button");
var email=(input.value||"").trim();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){msg.textContent="Revisá el mail, parece que tiene un error.";input.focus();return;}
msg.textContent="";btn.disabled=true;btn.textContent="Anotando…";
var data=new URLSearchParams();data.append("email",email);data.append("origen","popup");
fetch(ENDPOINT,{method:"POST",body:data,mode:"no-cors"})
.then(function(){
store(SUB_KEY,"1");pop.classList.add("mn-eap--done");
var sec=document.getElementById("mn-ea");if(sec)sec.classList.add("mn-ea--done"); // la sección de la home también pasa a "ya estás adentro"
})
.catch(function(){btn.disabled=false;btn.textContent="Quiero mi acceso";msg.textContent="No pudimos anotarte. Probá de nuevo en un ratito.";});
});
}

function abrir(){
if(shown||store(SUB_KEY)==="1")return;
shown=true;
window.removeEventListener("scroll",onScroll);
if(!pop)construir();
lastFocus=document.activeElement;
requestAnimationFrame(function(){pop.classList.add("mn-eap--open");pop.setAttribute("aria-hidden","false");});
}
function cerrar(){
if(!pop)return;
pop.classList.remove("mn-eap--open");pop.setAttribute("aria-hidden","true");
if(store(SUB_KEY)!=="1")store(SNOOZE_KEY,String(Date.now()));
if(lastFocus&&lastFocus.focus)try{lastFocus.focus();}catch(e){}
}
function onScroll(){
var h=document.documentElement;
if(h.scrollHeight>0&&(h.scrollTop+window.innerHeight)/h.scrollHeight>=SCROLL)abrir();
}
function arrancar(){
setTimeout(abrir,DEMORA_MS);
window.addEventListener("scroll",onScroll,{passive:true});
}
document.readyState!=="loading"?arrancar():document.addEventListener("DOMContentLoaded",arrancar);
})();
// FIN custom
