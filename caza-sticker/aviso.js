// INICIO custom: aviso-caza-sticker
// Cyber Coman (2 al 4/11/2026): en las fichas con un codigo CAZA### en la
// descripcion, muestra un recuadro grande con el codigo justo debajo del precio.
// Se carga desde Codigos externos con una sola linea <script src=...jsdelivr...>
// Sacarlo el jueves 5/11 (borrar esa linea de Codigos externos).
(function(){
  var CSS = "/* INICIO custom: aviso-caza-sticker */"
  + ".mn-caza{margin:0 0 16px;padding:14px 16px;border:3px dashed #e8b400;border-radius:12px;"
  + "background:#fff8d6;color:#1a1a1a;font-size:18px;line-height:1.35;text-align:center}"
  + ".mn-caza strong{display:block;font-size:22px;margin-bottom:4px}"
  + ".mn-caza code{display:inline-block;margin:6px 0 2px;padding:4px 12px;border-radius:8px;"
  + "background:#1a1a1a;color:#ffd84d;font-size:26px;font-weight:800;letter-spacing:2px;font-family:inherit}"
  + ".mn-caza__tarde{display:block;margin-top:8px;padding-top:8px;border-top:1px solid #e8d48a;font-size:13px;line-height:1.3;color:#6b5a1e}"
  + "@media (min-width:768px){.mn-caza{font-size:20px}.mn-caza strong{font-size:26px}.mn-caza code{font-size:30px}}"
  + "/* FIN custom */";

  function mnCaza(){
    var desc = document.querySelector(".product-description");
    var precio = document.querySelector(".js-price-container");
    if (!desc || !precio || document.querySelector(".mn-caza")) return;
    var m = desc.textContent.match(/CAZA\d{3}/);
    if (!m) return;

    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var box = document.createElement("div");
    box.className = "mn-caza";
    box.innerHTML = "<strong>🔎 ¡Encontraste un sticker a $1!</strong>"
      + "Usá este código en el carrito:<br><code>" + m[0] + "</code><br>"
      + "<small>1 sola unidad · el primero que lo usa se lo lleva</small>"
      + "<span class=\"mn-caza__tarde\">Si el código no anda, llegaste tarde: ya lo usaron. ¡Seguí buscando los demás!</span>";
    precio.parentNode.insertBefore(box, precio.nextSibling);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mnCaza);
  } else {
    mnCaza();
  }
})();
// FIN custom
