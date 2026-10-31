// INICIO custom: early-access-seccion
// Sección "Pre Cyber" en la home, arriba de "Elegí tu combo". v3 (31/10/2026): inscripción hasta el lunes 2/11, muestra el código PRECYBER al anotarse
// Se carga desde Códigos externos con una sola línea <script src=...jsdelivr...>
// Los mails se guardan en el Google Sheet "Cyber Coman – Early Access (mails)" vía Apps Script.
// Se apaga sola el 2/11/2026 a las 00:00.
(function(){
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var ENDPOINT="https://script.google.com/macros/s/AKfycbygRcED1tLhlUsGt1ETsGHU_p6kHvVqoGxlSMomVhj_Dswxi_a77Dkfp5f5si_nTF-p-Q/exec";
var FOTO="https://acdn-us.mitiendanube.com/stores/001/911/110/products/img_20250430_160355-7d224f6ff7123cc35b17924229524260-1024-1024.webp";
var CHIP="PRE CYBER · HASTA EL LUNES";
var TITULO_1="El Pre Cyber";
var TITULO_2="ya está corriendo";
var TEXTO="Dejanos tu mail y recibí al instante tu código de descuento exclusivo. Te podés anotar hasta el lunes 2/11 a las 00:00.";
var CODIGO="PRECYBER";
var CODIGO_TXT="30% OFF · Cargalo al finalizar tu compra.";
var INICIO=new Date("2026-11-02T00:00:00-03:00"); // el contador cuenta hasta acá (lunes 2/11 00:00)
var FIN=new Date("2026-11-02T00:00:00-03:00");    // desde acá no se muestra más
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if(new Date()>=FIN) return;
if(location.pathname.replace(/\/+$/,"")!=="") return; // solo en la home
var SUB_KEY="mnEarly26Sub";

var CSS="/* INICIO custom: early-access-seccion */"
+".mn-ea{--mn-navy:#10233f;--mn-navy-2:#1c3157;--mn-sky:#87b4d3;--mn-sky-soft:#dbe8f3;padding:32px 15px;background:#fff}"
+".mn-ea *{box-sizing:border-box}"
+".mn-ea__card{position:relative;overflow:hidden;max-width:1300px;margin:0 auto;background:var(--mn-navy);color:#fff;border-radius:24px;display:flex;flex-direction:column}"
+".mn-ea__media{position:relative;width:100%;height:240px}"
+".mn-ea__media img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 33%}"
+".mn-ea__media::after{content:\"\";position:absolute;inset:0;background:linear-gradient(180deg,rgba(16,35,63,0) 55%,var(--mn-navy) 100%)}"
+".mn-ea__content{position:relative;z-index:1;padding:0 22px 30px;margin-top:-28px}"
+".mn-ea__chip{display:inline-block;background:var(--mn-sky);color:var(--mn-navy);font-family:Montserrat,sans-serif;font-weight:800;font-size:11px;letter-spacing:.12em;padding:5px 12px;border-radius:999px;margin-bottom:14px}"
+".mn-ea__tit{font-family:Bebas,Montserrat,sans-serif;font-weight:400;font-size:44px;line-height:.95;margin:0 0 12px;color:#fff;text-transform:uppercase}"
+".mn-ea__tit span{color:var(--mn-sky)}"
+".mn-ea__txt{font-family:Poppins,sans-serif;font-size:15px;line-height:1.5;margin:0 0 20px;color:var(--mn-sky-soft)}"
+".mn-ea__count{display:flex;gap:6px;margin-bottom:16px;max-width:420px}"
+".mn-ea__unit{flex:1;min-width:0;background:var(--mn-navy-2);border:1px solid rgba(135,180,211,.35);border-radius:14px;text-align:center;padding:8px 2px}"
+".mn-ea__num{display:block;font-family:Bebas,Montserrat,sans-serif;font-size:34px;line-height:1}"
+".mn-ea__lbl{display:block;font-family:Poppins,sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--mn-sky);margin-top:2px}"
+".mn-ea__live{display:none;font-family:Bebas,Montserrat,sans-serif;font-size:30px;color:#f3c24c;margin-bottom:14px}"
+".mn-ea__form{display:flex;flex-direction:column;gap:10px;max-width:480px;margin:0}"
+".mn-ea__form input{width:100%;height:50px;border-radius:999px;border:2px solid transparent;padding:0 20px;font-family:Poppins,sans-serif;font-size:16px;color:var(--mn-navy);background:#fff;outline:none}"
+".mn-ea__form input:focus{border-color:var(--mn-sky)}"
+".mn-ea__form button{width:100%;height:50px;border:0;border-radius:999px;padding:0 24px;cursor:pointer;background:var(--mn-sky);color:var(--mn-navy);font-family:Montserrat,sans-serif;font-weight:800;font-size:14px;letter-spacing:.02em;text-transform:uppercase}"
+".mn-ea__form button:disabled{opacity:.6;cursor:default}"
+".mn-ea__msg{min-height:20px;margin:8px 4px 0;font-family:Poppins,sans-serif;font-size:14px;color:#ffb4b4}"
+".mn-ea__done{display:none;font-family:Poppins,sans-serif;font-weight:600;font-size:15px;line-height:1.5}"
+".mn-ea__done strong{display:block;font-family:Bebas,Montserrat,sans-serif;font-weight:400;font-size:32px;color:var(--mn-sky)}"
+".mn-ea--done .mn-ea__form,.mn-ea--done .mn-ea__msg{display:none}"
+".mn-ea--done .mn-ea__done{display:block}"
+".mn-ea__code{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:12px 0 8px}"
+".mn-ea__code b{font-family:Montserrat,sans-serif;font-weight:800;font-size:24px;letter-spacing:.08em;color:var(--mn-navy);background:#fff;border:2px dashed var(--mn-sky);border-radius:12px;padding:8px 16px}"
+".mn-ea__copy{height:44px;border:0;border-radius:999px;padding:0 20px;cursor:pointer;background:var(--mn-sky);color:var(--mn-navy);font-family:Montserrat,sans-serif;font-weight:800;font-size:13px;text-transform:uppercase}"
+".mn-ea__codetxt{display:block;font-weight:400;font-size:14px;color:var(--mn-sky-soft)}"
+"@media (min-width:821px){"
+".mn-ea{padding:44px 15px 12px}"
+".mn-ea__card{display:block;min-height:460px;border-radius:28px}"
+".mn-ea__media{position:absolute;top:0;right:0;bottom:0;width:58%;height:auto}"
+".mn-ea__media img{object-position:center 35%}"
+".mn-ea__media::after{background:linear-gradient(90deg,var(--mn-navy) 0%,rgba(16,35,63,.85) 14%,rgba(16,35,63,0) 46%)}"
+".mn-ea__content{width:50%;margin:0;padding:48px 40px}"
+".mn-ea__tit{font-size:66px}"
+".mn-ea__txt{font-size:16px}"
+".mn-ea__count{gap:10px}"
+".mn-ea__num{font-size:40px}"
+".mn-ea__form{flex-direction:row}"
+".mn-ea__form input{flex:1 1 auto;width:auto;min-width:0}"
+".mn-ea__form button{width:auto;white-space:nowrap}"
+"}"
+"/* FIN custom */";

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
function pad(n){return (n<10?"0":"")+n;}

function construir(){
if(!document.getElementById("mn-ea-css")){
var st=document.createElement("style");st.id="mn-ea-css";st.textContent=CSS;
(document.head||document.documentElement).appendChild(st);
}
var s=document.createElement("section");
s.id="mn-ea";s.className="mn-ea";s.setAttribute("aria-label","Pre Cyber Coman: inscripción");
s.innerHTML='<div class="mn-ea__card">'
+'<div class="mn-ea__media"><img src="'+esc(FOTO)+'" alt="Stickers de vinilo UV de Coman Calcos" loading="lazy" decoding="async"></div>'
+'<div class="mn-ea__content">'
+'<div><span class="mn-ea__chip">'+esc(CHIP)+'</span></div>'
+'<h2 class="mn-ea__tit">'+esc(TITULO_1)+' <span>'+esc(TITULO_2)+'</span></h2>'
+'<p class="mn-ea__txt">'+esc(TEXTO)+'</p>'
+'<div class="mn-ea__count">'
+'<div class="mn-ea__unit"><span class="mn-ea__num" data-d>--</span><span class="mn-ea__lbl">días</span></div>'
+'<div class="mn-ea__unit"><span class="mn-ea__num" data-h>--</span><span class="mn-ea__lbl">horas</span></div>'
+'<div class="mn-ea__unit"><span class="mn-ea__num" data-m>--</span><span class="mn-ea__lbl">min</span></div>'
+'<div class="mn-ea__unit"><span class="mn-ea__num" data-s>--</span><span class="mn-ea__lbl">seg</span></div>'
+'</div>'
+'<div class="mn-ea__live">¡Arrancó el Cyber Coman!</div>'
+'<form class="mn-ea__form" novalidate>'
+'<input type="email" name="email" placeholder="Tu mail" autocomplete="email" aria-label="Tu mail" required>'
+'<button type="submit">Quiero mi código</button>'
+'</form>'
+'<p class="mn-ea__msg" role="status"></p>'
+'<div class="mn-ea__done"><strong>¡Listo, ya estás anotado!</strong>Tu código de descuento es:'
+'<div class="mn-ea__code"><b>'+esc(CODIGO)+'</b><button type="button" class="mn-ea__copy">Copiar código</button></div>'
+'<span class="mn-ea__codetxt">'+esc(CODIGO_TXT)+'</span></div>'
+'</div></div>';

if(store(SUB_KEY)==="1") s.classList.add("mn-ea--done");

// cuenta regresiva
var count=s.querySelector(".mn-ea__count"), live=s.querySelector(".mn-ea__live");
(function tick(){
var diff=INICIO-new Date();
if(diff<=0){count.style.display="none";live.style.display="block";return;}
var x=Math.floor(diff/1000);
count.querySelector("[data-d]").textContent=pad(Math.floor(x/86400));
count.querySelector("[data-h]").textContent=pad(Math.floor(x%86400/3600));
count.querySelector("[data-m]").textContent=pad(Math.floor(x%3600/60));
count.querySelector("[data-s]").textContent=pad(x%60);
setTimeout(tick,1000);
})();

// boton copiar codigo
var copy=s.querySelector(".mn-ea__copy");
copy.addEventListener("click",function(){
var ok=function(){copy.textContent="¡Copiado!";setTimeout(function(){copy.textContent="Copiar código";},2000);};
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(CODIGO).then(ok,function(){});}
else{try{var t=document.createElement("textarea");t.value=CODIGO;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();ok();}catch(e){}}
});

// formulario -> Google Sheet
var form=s.querySelector(".mn-ea__form"), msg=s.querySelector(".mn-ea__msg");
form.addEventListener("submit",function(ev){
ev.preventDefault();
var input=form.querySelector("input"), btn=form.querySelector("button");
var email=(input.value||"").trim();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){msg.textContent="Revisá el mail, parece que tiene un error.";input.focus();return;}
msg.textContent="";btn.disabled=true;btn.textContent="Anotando…";
var data=new URLSearchParams();data.append("email",email);data.append("origen","seccion");
fetch(ENDPOINT,{method:"POST",body:data,mode:"no-cors"})
.then(function(){store(SUB_KEY,"1");s.classList.add("mn-ea--done");})
.catch(function(){btn.disabled=false;btn.textContent="Quiero mi código";msg.textContent="No pudimos anotarte. Probá de nuevo en un ratito.";});
});
return s;
}

/* "Elegí tu combo" (#mn-combos) lo crea OTRO script (combos.js) y se puede mover después,
   así que miramos el DOM un rato y nos quedamos siempre justo arriba de él. */
var sec=null, mo=null;
function ubicar(){
var c=document.getElementById("mn-combos");
if(!c||!c.parentNode) return false;
if(!sec) sec=construir();
if(c.previousElementSibling!==sec) c.parentNode.insertBefore(sec,c);
return true;
}
function arrancar(){
ubicar();
if(mo) return;
mo=new MutationObserver(function(){ubicar();});
mo.observe(document.documentElement,{childList:true,subtree:true});
setTimeout(function(){ubicar();if(mo){mo.disconnect();mo=null;}},15000);
}
document.readyState!=="loading"?arrancar():document.addEventListener("DOMContentLoaded",arrancar);
})();
// FIN custom
