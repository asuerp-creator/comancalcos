// INICIO custom: precio-destacado-ficha
// Ficha de producto: estrellas + reseñas de Google bajo el titulo, precio grande,
// linea de cuotas y recuadro "Por transferencia $X  10% OFF". v1 (28/10/2026)
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
// Los precios, cuotas y % se leen de la plantilla (se actualizan solos al cambiar de variante).
(function(){
  /* ===================== EDITA SOLO ESTE BLOQUE ===================== */
  // Perfil de Google Maps "Coman Calcos". Cantidad de reseñas actualizada a 53 el 28/10/2026 (dato de Manu).
  var PROMEDIO="5,0", CANTIDAD="53";
  var LINK="https://www.google.com/maps/place/Coman+Calcos/@-34.5915801,-58.5064272,17z/data=!4m6!3m5!1s0x95bcb7f8d4d7441d:0xc845ec5a011aff7a!8m2!3d-34.5915801!4d-58.5064272!16s%2Fg%2F11nv342nqt";
  /* =================== FIN DEL BLOQUE EDITABLE ====================== */

  function estilos(){
    if(document.getElementById("mn-pd-css")) return;
    var st=document.createElement("style"); st.id="mn-pd-css";
    st.textContent="/* INICIO custom:precio-destacado-ficha */"+
      ".mn-pd-rv{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;margin:6px 0 4px;font-size:14px;line-height:1.3;color:#10233f}"+
      ".mn-pd-rv__st{color:#e0a92e;font-size:16px;letter-spacing:1px}"+
      ".mn-pd-rv__n{font-weight:700}"+
      ".mn-pd-rv__sep{color:#9aa3b0}"+
      ".mn-pd-rv a{color:#10233f;text-decoration:underline;text-underline-offset:3px;text-transform:uppercase;font-size:13px;letter-spacing:.3px}"+
      ".section-single-product .js-price-container #price_display{font-size:34px;font-weight:800;line-height:1.1;letter-spacing:-.5px}"+
      ".section-single-product .js-price-container.mn-pd-on .js-payment-discount-price-product-container{display:none}"+
      ".mn-pd{margin-top:12px}"+
      ".mn-pd__cuotas{margin:0 0 10px;font-size:15px;line-height:1.3;color:#4a4a4a}"+
      ".mn-pd__cuotas strong{color:#10233f;font-weight:700}"+
      ".mn-pd__transf{display:inline-flex;align-items:center;flex-wrap:wrap;gap:6px 8px;max-width:100%;padding:10px 12px;background:#f5f7ee;border:1px solid #cfd6b0;border-radius:10px}"+
      ".mn-pd__transf-lbl{font-size:14px;color:#10233f}"+
      ".mn-pd__transf-precio{font-size:20px;font-weight:800;line-height:1;color:#10233f}"+
      ".mn-pd__transf-off{padding:4px 9px;border-radius:999px;background:#5e6b33;color:#fff;font-size:12px;font-weight:700;letter-spacing:.5px}"+
      ".mn-pd [hidden],.mn-pd[hidden]{display:none}"+
      "@media(min-width:768px){.section-single-product .js-price-container #price_display{font-size:42px}.mn-pd__transf{padding:12px 16px;gap:6px 10px}.mn-pd__transf-lbl{font-size:15px}.mn-pd__transf-precio{font-size:22px}.mn-pd__transf-off{padding:4px 10px}}"+
      "/* FIN custom */";
    (document.head||document.documentElement).appendChild(st);
  }

  // Estrellas + cantidad de reseñas, debajo del titulo
  function resenas(){
    var h1=document.querySelector(".section-single-product .js-product-name");
    if(!h1 || document.querySelector(".mn-pd-rv")) return;
    var d=document.createElement("div"); d.className="mn-pd-rv";
    d.innerHTML='<span class="mn-pd-rv__st" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>'+
      '<span class="mn-pd-rv__n"></span><span class="mn-pd-rv__sep">&middot;</span>'+
      '<a target="_blank" rel="noopener">Ver reseñas</a>';
    d.querySelector(".mn-pd-rv__n").textContent=PROMEDIO+" en Google ("+CANTIDAD+" reseñas)";
    d.querySelector("a").href=LINK;
    h1.parentElement.appendChild(d);
  }

  // Precio grande + cuotas + recuadro de transferencia
  function precio(){
    var pc=document.querySelector(".section-single-product .js-price-container");
    var pr=pc && pc.querySelector("#price_display");
    if(!pc || !pr || pc.querySelector(".mn-pd")) return;
    var pay=document.querySelector(".section-single-product .js-product-payments-container");
    var cAmt=pay && pay.querySelector(".js-installment-amount");
    var cVal=pay && pay.querySelector(".js-installment-price");
    var descCont=pc.querySelector(".js-payment-discount-price-product-container");
    var desc=pc.querySelector(".js-payment-discount-price-product");
    var descNom=pc.querySelector(".js-payment-discount-name-product");

    var box=document.createElement("div"); box.className="mn-pd";
    box.innerHTML='<p class="mn-pd__cuotas" hidden><span class="mn-pd__cn"></span> cuotas<span class="mn-pd__si"> sin interés</span> de <strong class="mn-pd__cv"></strong></p>'+
      '<div class="mn-pd__transf" hidden><span class="mn-pd__transf-lbl"></span><span class="mn-pd__transf-precio"></span><span class="mn-pd__transf-off"></span></div>';
    pc.appendChild(box); pc.classList.add("mn-pd-on");
    var q=function(s){return box.querySelector(s);};
    var lC=q(".mn-pd__cuotas"), lT=q(".mn-pd__transf");
    function set(el,t){ if(el.textContent!==t) el.textContent=t; }
    function num(t){ return parseFloat((t||"").replace(/[^\d,]/g,"").replace(",","."))||0; }

    function render(){
      // cuotas: solo si la plantilla las esta mostrando
      var n=cAmt ? parseInt(cAmt.textContent,10) : 0;
      var v=cVal ? cVal.textContent.trim() : "";
      var cont=cVal && (cVal.closest(".js-max-installments-container")||cVal);
      var okC=n>1 && v && cont && getComputedStyle(cont).display!=="none";
      lC.hidden=!okC;
      if(okC){
        set(q(".mn-pd__cn"),String(n));
        set(q(".mn-pd__cv"),v);
        q(".mn-pd__si").hidden=!pay.querySelector(".installment-no-interest");
      }
      // transferencia: solo si hay precio con descuento menor al precio
      var p=num(pr.textContent), dd=desc ? num(desc.textContent) : 0;
      var okD=dd>0 && dd<p && !(descCont && descCont.style.display==="none");
      lT.hidden=!okD;
      if(okD){
        set(q(".mn-pd__transf-lbl"),"Por "+((descNom && descNom.textContent.trim())||"transferencia").toLowerCase());
        set(q(".mn-pd__transf-precio"),desc.textContent.trim());
        set(q(".mn-pd__transf-off"),Math.round((1-dd/p)*100)+"% OFF");
      }
    }
    render();
    // se re-dibuja cuando la plantilla cambia los precios (cambio de variante)
    var obs=new MutationObserver(render);
    [pr,desc,descCont,cAmt,cVal].forEach(function(el){
      if(el) obs.observe(el,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:["style","class"]});
    });
  }

  function init(){
    if(!document.querySelector(".section-single-product .js-price-container")) return; // no es ficha de producto
    estilos(); resenas(); precio();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
// FIN custom
