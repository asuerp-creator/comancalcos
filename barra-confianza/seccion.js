// INICIO custom: barra-confianza-home
// Barra verde de confianza en la home, entre el slider y la barra de categorias (#mn-catbar). v1 (28/10/2026)
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
(function(){
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var ITEMS=[
  {grande:"+10.000",        chico:"clientes felices"},
  {grande:"5.0 ★",     chico:"estrellas en Google"},
  {grande:"40% off",        chico:"por cantidad"},
  {grande:"Envío gratis", chico:"desde $35.000", texto:true}
];
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if(location.pathname.replace(/\/+$/,"")!=="") return; // solo en la home

var NOISE="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix values=%270 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .35 0%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E";

var CSS="/* INICIO custom: barra-confianza-home */"
+".mn-trust{padding:4px 0 20px}"
+".mn-trust__card{position:relative;overflow:hidden;border-radius:14px;padding:16px 6px;color:#fff;background-color:#5E6B33;"
+"background-image:url(\""+NOISE+"\"),"
+"radial-gradient(ellipse 60% 120% at 18% 10%,rgba(205,215,150,.40),transparent 60%),"
+"radial-gradient(ellipse 45% 90% at 70% 30%,rgba(185,200,125,.28),transparent 65%),"
+"repeating-linear-gradient(115deg,rgba(0,0,0,0) 0 60px,rgba(25,30,8,.22) 90px,rgba(0,0,0,0) 140px),"
+"linear-gradient(110deg,#6B7A3C 0%,#5E6B33 45%,#394220 100%)}"
+".mn-trust__grid{display:grid;grid-template-columns:1fr 1fr;row-gap:14px;margin:0;padding:0;list-style:none}"
+".mn-trust__item{text-align:center;padding:2px 6px;margin:0}"
+".mn-trust__item:nth-child(odd){border-right:1px solid rgba(255,255,255,.25)}"
+".mn-trust__big{display:block;font-size:22px;font-weight:500;line-height:1.15;color:#fff;white-space:nowrap}"
+".mn-trust__big--txt{font-size:19px}"
+".mn-trust__star{color:#F5C542;font-size:.8em}"
+".mn-trust__small{display:block;font-size:12px;line-height:1.3;color:rgba(255,255,255,.88);margin-top:3px}"
+"@media (min-width:768px){"
+".mn-trust{padding:0 0 36px}"
+".mn-trust__card{border-radius:18px;padding:24px 12px}"
+".mn-trust__grid{grid-template-columns:repeat(4,1fr)}"
+".mn-trust__item{border-right:1px solid rgba(255,255,255,.25)}"
+".mn-trust__item:last-child{border-right:0}"
+".mn-trust__big,.mn-trust__big--txt{font-size:clamp(24px,2.6vw,34px)}"
+".mn-trust__small{font-size:13px}}"
+"/* FIN custom */";

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];});}

function build(){
  var lis="";
  for(var i=0;i<ITEMS.length;i++){
    var it=ITEMS[i];
    var g=esc(it.grande).replace("★","<span class=\"mn-trust__star\" aria-hidden=\"true\">★</span>");
    lis+="<li class=\"mn-trust__item\"><span class=\"mn-trust__big"+(it.texto?" mn-trust__big--txt":"")+"\">"+g+"</span>"
       +"<span class=\"mn-trust__small\">"+esc(it.chico)+"</span></li>";
  }
  var sec=document.createElement("section");
  sec.id="mn-trust";
  sec.className="mn-trust";
  sec.setAttribute("aria-label","Por qué comprar en Coman Calcos");
  sec.innerHTML="<div class=\"container\"><div class=\"mn-trust__card\"><ul class=\"mn-trust__grid\">"+lis+"</ul></div></div>";
  return sec;
}

var sec=null, obs=null;

// Siempre entre el slider y la barra de categorias, aunque esa barra cargue despues
function place(){
  var slider=document.querySelector("[data-store=\"home-slider\"]");
  if(!slider) return false;
  if(!document.getElementById("mn-trust-css")){
    var st=document.createElement("style");
    st.id="mn-trust-css";
    st.textContent=CSS;
    document.head.appendChild(st);
  }
  if(!sec) sec=document.getElementById("mn-trust")||build();
  var cat=document.getElementById("mn-catbar");
  if(cat&&cat.parentNode===slider.parentNode){
    if(sec.nextElementSibling!==cat) cat.parentNode.insertBefore(sec,cat);
  }else if(slider.nextElementSibling!==sec){
    slider.insertAdjacentElement("afterend",sec);
  }
  return true;
}

function init(){
  place();
  if(obs) return;
  obs=new MutationObserver(function(){place();});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(function(){obs.disconnect();obs=null;},15000);
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
window.addEventListener("pageshow",function(e){if(e.persisted) init();});
})();
// FIN custom
