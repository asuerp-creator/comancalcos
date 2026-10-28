// INICIO custom: titulos-anton
// Titulos de la home en Anton + "datito" manuscrito (Yellowtail) en verde oliva. v1 (28/10/2026)
// Reemplaza la letra gorda (MnFat / ComanFat) y la imagen de "Elegi tu categoria".
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
// Fuentes: Anton (SIL OFL) y Yellowtail (Apache 2.0), recortadas a latin, en esta misma carpeta.
(function(){
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
// selector del titulo -> datito que va abajo (dejar "" para no poner datito)
var DATITOS={
  ".mn-tt":"hay para todos",                       // Elegi tu categoria
  ".mn-cmb__tit":"y ahorrá en serio",          // Elegi tu combo
  ".mnr-t":"de clientes de verdad",                 // Resenas 100% reales
  ".js-products-featured-title":"los que más salen", // Los mas elegidos
  ".js-welcome-message-title":"desde Argentina",    // Somos Coman Calcos
  ".js-products-new-title":"recién salidos",   // Stickers nuevos para tu termo
  ".mn-mat__title":"hechos para durar",             // Nuestros materiales y medidas
  ".js-products-sale-title":"nuestros favoritos",   // Los elegidos de Coman
  ".mn-cal__title":""                               // Calidad y resistencia
};
var TITULO_CATEGORIAS="ELEGÍ TU CATEGORÍA";
var OLIVA="#5E6B33";
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if(location.pathname.replace(/\/+$/,"")!=="") return; // solo en la home

var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@main/titulos/";})();

var SEL=Object.keys(DATITOS).map(function(s){return "html body "+s;}).join(",");
var CSS="/* INICIO custom: titulos-anton */"
+"@font-face{font-family:MnAnton;src:url("+BASE+"anton.woff2) format(\"woff2\");font-display:swap}"
+"@font-face{font-family:MnScript;src:url("+BASE+"yellowtail.woff2) format(\"woff2\");font-display:swap}"
+SEL+"{font-family:MnAnton,Montserrat,sans-serif;font-weight:400;-webkit-text-stroke:0;paint-order:normal;letter-spacing:.01em;line-height:1.02;font-size:clamp(40px,10.5vw,68px);color:#10233f;text-transform:uppercase}"
+"html body .mn-mat__title,html body .mn-cal__title,html body .js-welcome-message-title{font-size:clamp(36px,9vw,54px)}"
+"html body .mn-catbar__title{line-height:1}"
+"html body .mn-catbar__title img.mn-tt-old{display:none}"
+"html body .mn-tt{margin:0;text-align:center}"
+".mn-dato{display:block;font-family:MnScript,cursive;font-weight:400;text-transform:none;font-size:.52em;line-height:1;color:"+OLIVA+";transform:rotate(-5deg);margin:.02em 0 0 34%;text-align:center;letter-spacing:0;white-space:nowrap;-webkit-text-stroke:0}"
+"/* FIN custom */";

function apply(){
  if(!document.getElementById("mn-titulos-css")){
    var st=document.createElement("style");
    st.id="mn-titulos-css";
    st.textContent=CSS;
    document.head.appendChild(st);
  }
  // "Elegi tu categoria": la imagen pasa a texto
  var ct=document.querySelector(".mn-catbar__title");
  if(ct&&!ct.querySelector(".mn-tt")){
    var img=ct.querySelector("img");
    if(img) img.classList.add("mn-tt-old");
    var h=document.createElement("h2");
    h.className="mn-tt";
    h.textContent=TITULO_CATEGORIAS;
    ct.appendChild(h);
  }
  for(var k in DATITOS){
    if(!DATITOS[k]) continue;
    var els=document.querySelectorAll(k);
    for(var i=0;i<els.length;i++){
      if(els[i].querySelector(".mn-dato")) continue;
      var s=document.createElement("span");
      s.className="mn-dato";
      s.setAttribute("aria-hidden","true");
      s.textContent=DATITOS[k];
      els[i].appendChild(s);
    }
  }
}

var obs=null;
function init(){
  apply();
  if(obs) return;
  // varias secciones las crean otros scripts despues: mirar el DOM un rato
  obs=new MutationObserver(function(){apply();});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(function(){obs.disconnect();obs=null;},15000);
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
window.addEventListener("pageshow",function(e){if(e.persisted) init();});
})();
// FIN custom
