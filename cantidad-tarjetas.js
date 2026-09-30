// INICIO custom: cantidad-tarjetas
// Selector de cantidad en las tarjetas de producto de Coman Calcos. v1 (30/09/2026)
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
(function(){
  // estilos: se inyectan una sola vez
  if(!document.getElementById("mn-qty-css")){
    var st=document.createElement("style"); st.id="mn-qty-css";
    st.textContent="/* INICIO custom:cantidad-tarjetas */ .item-actions form.mn-qf{display:flex;align-items:flex-start;gap:6px}.item-actions form.mn-qf .js-addtocart{flex:1 1 auto;min-width:0}.mn-qty{position:relative;flex:0 0 54px;height:34px;display:flex;align-items:stretch;background:#f2f2f2;border:1px solid #e1e1e1;border-radius:10px;overflow:hidden}.mn-qty input{width:100%;min-width:0;border:0;background:transparent;text-align:center;padding:0 16px 0 2px;font-family:Poppins,sans-serif;font-size:14px;font-weight:600;color:#10233f;-moz-appearance:textfield;appearance:textfield}.mn-qty input:focus{outline:none}.mn-qty input::-webkit-inner-spin-button,.mn-qty input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.mn-qty__arr{position:absolute;right:0;top:0;bottom:0;width:18px;display:flex;flex-direction:column}.mn-qty__arr button{flex:1;display:flex;align-items:center;justify-content:center;border:0;padding:0;margin:0;background:transparent;color:#555;cursor:pointer;font-size:9px;line-height:1}.mn-qty__arr button:active{background:#e1e1e1}.mn-qty__arr button.mn-qty--tope{opacity:.25;cursor:default}.item-actions form.mn-qf.js-product-form::after{content:\"Agregar\";left:60px}.item-actions form.mn-qf .js-addtocart-text::after{content:\"Agregar\"}@media(min-width:768px){.mn-qty{flex-basis:62px}.item-actions form.mn-qf.js-product-form::after{left:68px}}/* FIN custom */";
    (document.head||document.documentElement).appendChild(st);
  }
  function armar(f){
    if(f.classList.contains("mn-qf")) return;
    var btn=f.querySelector("input.js-addtocart");
    if(!btn || !f.querySelector("input[name=add_to_cart]") || f.querySelector("[name=quantity]")) return;
    var box=document.createElement("div");
    box.className="mn-qty";
    box.innerHTML='<input type="number" name="quantity" value="1" min="1" inputmode="numeric" aria-label="Cantidad">'+
      '<div class="mn-qty__arr"><button type="button" data-d="1" aria-label="Sumar uno">&#9650;</button>'+
      '<button type="button" data-d="-1" aria-label="Restar uno">&#9660;</button></div>';
    f.insertBefore(box, f.firstChild);
    f.classList.add("mn-qf");
    var inp=box.querySelector("input");
    var up=box.querySelector('[data-d="1"]');
    // stock: lo lee de los datos que la plantilla ya pone en la tarjeta (null = stock ilimitado)
    var max=null;
    try{
      var cont=f.closest("[data-variants]");
      var vs=JSON.parse(cont.getAttribute("data-variants"));
      if(vs.length===1 && vs[0].stock!==null && vs[0].stock!==undefined) max=parseInt(vs[0].stock,10);
    }catch(x){}
    if(max>0) inp.setAttribute("max",max);
    function fijar(v){
      v=parseInt(v,10); if(!v||v<1) v=1;
      if(max>0 && v>max) v=max;
      inp.value=v;
      up.classList.toggle("mn-qty--tope", max>0 && v>=max);
    }
    fijar(1);
    box.addEventListener("click",function(e){
      var b=e.target.closest("button"); if(!b) return;
      e.preventDefault();
      fijar((parseInt(inp.value,10)||1)+parseInt(b.getAttribute("data-d"),10));
    });
    inp.addEventListener("change",function(){ fijar(inp.value); });
    // el aviso "Agregado al carrito" del tema siempre dice 1: le ponemos la cantidad real
    btn.addEventListener("click",function(){
      var q=inp.value, t=0;
      var iv=setInterval(function(){
        document.querySelectorAll(".js-cart-notification-item-quantity").forEach(function(n){ if(n.textContent.trim()!==q) n.textContent=q; });
        if(++t>=30) clearInterval(iv);
      },200);
    });
  }
  function todo(root){
    (root||document).querySelectorAll(".js-item-product .item-actions form.js-product-form").forEach(armar);
  }
  function init(){
    todo();
    var pend=false;
    new MutationObserver(function(){
      if(pend) return; pend=true;
      setTimeout(function(){ pend=false; todo(); },300);
    }).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
// FIN custom
