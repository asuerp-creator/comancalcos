// INICIO custom: cantidad-tarjetas
// Selector de cantidad en las tarjetas de producto de Coman Calcos. v2 (24/10/2026)
// v2: botones - y + de 44x44 en celular (fila propia arriba del boton Agregar), letra 16px (sin zoom en iPhone)
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
(function(){
  // estilos: se inyectan una sola vez
  if(!document.getElementById("mn-qty-css")){
    var st=document.createElement("style"); st.id="mn-qty-css";
    // Celular: fila 1 = [-] numero [+] (44x44) a todo el ancho; fila 2 = boton Agregar de 44px de alto.
    // Compu (768px o mas): todo en una fila, como antes. El ::after es el texto "Agregar" que una regla global dibuja sobre el boton.
    st.textContent="/* INICIO custom:cantidad-tarjetas */ .item-actions form.mn-qf{display:flex;flex-wrap:wrap;align-items:center;gap:6px}.item-actions form.mn-qf .js-addtocart{flex:1 1 100%;min-width:0;height:44px}.mn-qty{flex:1 1 100%;height:46px;display:flex;align-items:stretch;background:#f2f2f2;border:1px solid #e1e1e1;border-radius:10px;overflow:hidden}.mn-qty button{flex:0 0 44px;display:flex;align-items:center;justify-content:center;border:0;padding:0;margin:0;background:transparent;color:#10233f;cursor:pointer;font-family:Poppins,sans-serif;font-size:20px;font-weight:600;line-height:1;touch-action:manipulation}.mn-qty button:active{background:#e1e1e1}.mn-qty button.mn-qty--tope{opacity:.25;cursor:default}.mn-qty input{flex:1 1 auto;width:100%;min-width:0;border:0;background:transparent;text-align:center;padding:0;font-family:Poppins,sans-serif;font-size:16px;font-weight:600;color:#10233f;-moz-appearance:textfield;appearance:textfield}.mn-qty input:focus{outline:none}.mn-qty input::-webkit-inner-spin-button,.mn-qty input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.item-actions form.mn-qf.js-product-form::after{content:\"Agregar\";left:0;top:50px}.item-actions form.mn-qf .js-addtocart-text::after{content:\"Agregar\"}@media(min-width:768px){.item-actions form.mn-qf{flex-wrap:nowrap}.mn-qty{flex:0 0 96px;height:34px}.mn-qty button{flex-basis:30px;font-size:16px}.mn-qty input{font-size:14px}.item-actions form.mn-qf .js-addtocart{flex:1 1 auto;height:auto}.item-actions form.mn-qf.js-product-form::after{left:102px;top:0}}/* FIN custom */";
    (document.head||document.documentElement).appendChild(st);
  }
  function armar(f){
    if(f.classList.contains("mn-qf")) return;
    var btn=f.querySelector("input.js-addtocart");
    if(!btn || !f.querySelector("input[name=add_to_cart]") || f.querySelector("[name=quantity]")) return;
    var box=document.createElement("div");
    box.className="mn-qty";
    box.innerHTML='<button type="button" data-d="-1" aria-label="Restar uno">&#8722;</button>'+
      '<input type="number" name="quantity" value="1" min="1" inputmode="numeric" aria-label="Cantidad">'+
      '<button type="button" data-d="1" aria-label="Sumar uno">+</button>';
    f.insertBefore(box, f.firstChild);
    f.classList.add("mn-qf");
    var inp=box.querySelector("input");
    var up=box.querySelector('[data-d="1"]');
    var down=box.querySelector('[data-d="-1"]');
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
      down.classList.toggle("mn-qty--tope", v<=1);
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
