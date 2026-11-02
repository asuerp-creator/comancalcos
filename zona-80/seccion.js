// INICIO custom: zona-80-off-home
// Franja "Zona 80% OFF" en la home, justo debajo del slider principal. v1 (02/11/2026)
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
// Se agrega como ULTIMO HIJO de la seccion del slider, asi no compite con
// barra-confianza (que se ubica como hermana inmediata del slider).
(function(){
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var LINK   = "/zona-80-off/";
var CHIP   = "CYBER COMAN";
var TITULO = "ZONA";
var NUMERO = "80% OFF";
var TEXTO  = "Stickers seleccionados con hasta 80% de descuento.";
var BOTON  = "VER LA ZONA 80% OFF";
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if(location.pathname.replace(/\/+$/,"")!=="") return; // solo en la home

var CSS="/* INICIO custom: zona-80-off-home */"
+".mn-z80{padding:16px 0 4px}"
+".mn-z80__card{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;gap:14px;"
+"padding:22px 18px;border-radius:14px;text-align:center;text-decoration:none;color:#fff;"
+"background-color:#10233f;background-image:"
+"radial-gradient(ellipse 55% 140% at 0% 50%,rgba(135,180,211,.28),transparent 70%),"
+"radial-gradient(ellipse 45% 120% at 100% 0%,rgba(94,107,51,.55),transparent 70%),"
+"repeating-linear-gradient(-55deg,rgba(255,255,255,0) 0 22px,rgba(255,255,255,.035) 22px 44px)}"
+".mn-z80__card:hover,.mn-z80__card:focus{color:#fff;text-decoration:none}"
+".mn-z80__chip{display:inline-block;font:700 11px/1 Montserrat,sans-serif;letter-spacing:.14em;"
+"padding:6px 10px;border-radius:999px;background:#5E6B33;color:#fff}"
+".mn-z80__tit{margin:0;font-family:Montserrat,sans-serif;font-weight:800;line-height:.95;color:#fff;"
+"font-size:clamp(34px,11vw,52px);letter-spacing:-.01em}"
+".mn-z80__tit span{display:block;color:#87b4d3}"
+".mn-z80__txt{margin:0;font:400 14px/1.45 Poppins,sans-serif;color:rgba(255,255,255,.88);max-width:34em}"
+".mn-z80__btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:999px;"
+"background:#87b4d3;color:#10233f;font:700 14px/1 Montserrat,sans-serif;letter-spacing:.04em;"
+"transition:transform .2s ease,background-color .2s ease}"
+".mn-z80__btn svg{width:16px;height:16px;transition:transform .2s ease}"
+".mn-z80__card:hover .mn-z80__btn{background:#fff}"
+".mn-z80__card:hover .mn-z80__btn svg{transform:translateX(3px)}"
+".mn-z80__card:focus-visible{outline:3px solid #87b4d3;outline-offset:3px}"
+"@media (min-width:768px){"
+".mn-z80{padding:28px 0 8px}"
+".mn-z80__card{flex-direction:row;justify-content:space-between;text-align:left;gap:28px;padding:30px 44px;border-radius:18px}"
+".mn-z80__left{display:flex;align-items:center;gap:26px}"
+".mn-z80__tit{font-size:clamp(46px,4.6vw,64px);white-space:nowrap}"
+".mn-z80__txt{font-size:16px;margin-top:8px}"
+".mn-z80__btn{flex-shrink:0;padding:16px 28px;font-size:15px}}"
+"@media (prefers-reduced-motion:reduce){.mn-z80__btn,.mn-z80__btn svg{transition:none}}"
+"/* FIN custom */";

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}

function build(){
  var sec=document.createElement("section");
  sec.id="mn-z80";
  sec.className="mn-z80";
  sec.setAttribute("aria-label",TITULO+" "+NUMERO);
  sec.innerHTML="<div class=\"container\"><a class=\"mn-z80__card\" href=\""+esc(LINK)+"\">"
    +"<div class=\"mn-z80__left\"><div>"
    +"<span class=\"mn-z80__chip\">"+esc(CHIP)+"</span>"
    +"</div><div>"
    +"<h2 class=\"mn-z80__tit\">"+esc(TITULO)+" <span>"+esc(NUMERO)+"</span></h2>"
    +"<p class=\"mn-z80__txt\">"+esc(TEXTO)+"</p>"
    +"</div></div>"
    +"<span class=\"mn-z80__btn\">"+esc(BOTON)
    +"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg>"
    +"</span></a></div>";
  return sec;
}

var sec=null, obs=null;

function place(){
  var slider=document.querySelector("[data-store=\"home-slider\"]");
  if(!slider) return false;
  if(!document.getElementById("mn-z80-css")){
    var st=document.createElement("style");
    st.id="mn-z80-css";
    st.textContent=CSS;
    document.head.appendChild(st);
  }
  if(!sec) sec=document.getElementById("mn-z80")||build();
  if(slider.lastElementChild!==sec) slider.appendChild(sec);
  return true;
}

function init(){
  if(place()||obs) return;
  obs=new MutationObserver(function(){if(place()){obs.disconnect();obs=null;}});
  obs.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(function(){if(obs){obs.disconnect();obs=null;}},15000);
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
window.addEventListener("pageshow",function(e){if(e.persisted) init();});
})();
// FIN custom
