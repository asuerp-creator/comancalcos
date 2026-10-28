// INICIO custom: barra-cyber-countdown
// Barra "Cyber Coman" con cuenta regresiva, arriba del logo (va dentro del header sticky).
// Se carga desde Códigos externos con una sola línea <script src=...jsdelivr...>
// Antes del 31/10: cuenta regresiva. 31/10 y 1/11: "¡Arrancó el Cyber Coman!". Desde el 2/11 no se muestra.
(function () {
/* ===================== EDITA SOLO ESTE BLOQUE ===================== */
var INICIO = new Date("2026-10-31T00:00:00-03:00"); // arranca el Cyber
var FIN    = new Date("2026-11-02T00:00:00-03:00"); // desde acá la barra no aparece más
var BIG    = "80%";
var BIG_SUB = "de descuento";
var TIT_ANTES   = "Sábado 31 a las 00:00 hs arranca el Cyber Coman";
var TIT_MANANA  = "Mañana 00:00 hs arranca el Cyber Coman";
var TIT_ACTIVO  = "¡Arrancó el Cyber Coman!";
var TIT_CORTO   = "Cyber Coman · Sáb 31"; // título en celular, antes de arrancar
var SUB    = "Hasta 80% de descuento en toda la web";
var BOTON  = "Ver productos";
var LINK   = "/productos/";
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if (new Date() >= FIN) return;
if (location.pathname.indexOf("/checkout") !== -1) return; // nunca en el checkout

var CSS = "/* INICIO custom: barra-cyber-countdown */"
+ ".mn-cyb{background:#151212;border-bottom:1px solid #2c2424;color:#fff;font-family:inherit}"
+ ".mn-cyb__in{max-width:1100px;margin:0 auto;padding:8px 10px;display:flex;align-items:center;justify-content:center;gap:8px}"
+ ".mn-cyb__big{color:#dcb45a;font-weight:800;line-height:1;display:flex;flex-direction:column;align-items:center;flex:0 0 auto}"
+ ".mn-cyb__num{font-size:26px}"
+ ".mn-cyb__lbl{font-size:8px;letter-spacing:.5px;text-transform:uppercase;margin-top:2px}"
+ ".mn-cyb__txt{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;text-align:center}"
+ ".mn-cyb__tit{font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin:0;color:#fff;line-height:1.2;white-space:nowrap}"
+ ".mn-cyb__tit-l{display:none}"
+ ".mn-cyb__sub{font-size:12px;color:#cfc8c0;margin:0;line-height:1.3}"
+ ".mn-cyb__sub-l{display:none}"
+ ".mn-cyb__timer{display:inline-block;color:#f0c75e;font-family:monospace;font-weight:700;font-size:13px;border:1px dashed #dcb45a;border-radius:4px;padding:1px 5px;margin-left:4px;font-variant-numeric:tabular-nums}"
+ ".mn-cyb__btn{flex:0 0 auto;display:inline-block;background:#dcb45a;color:#1a1414;font-weight:800;font-size:11px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:8px 10px;border-radius:999px;white-space:nowrap}"
+ ".mn-cyb__btn:hover,.mn-cyb__btn:focus{background:#e8c56f;color:#1a1414;text-decoration:none}"
+ "@media (min-width:768px){"
+ ".mn-cyb__in{padding:12px 16px;gap:32px}"
+ ".mn-cyb__num{font-size:40px}"
+ ".mn-cyb__lbl{font-size:10px;letter-spacing:1px}"
+ ".mn-cyb__tit{font-size:16px;letter-spacing:1.5px;white-space:normal}"
+ ".mn-cyb__tit-c{display:none}.mn-cyb__tit-l{display:inline}"
+ ".mn-cyb__sub{font-size:13px}.mn-cyb__sub-l{display:inline}"
+ ".mn-cyb__timer{font-size:14px}"
+ ".mn-cyb__btn{font-size:13px;letter-spacing:1.5px;padding:11px 26px}"
+ "}"
// En la home el slider sube por detrás del encabezado transparente: le descontamos la altura de la barra
// para que la barra no le tape la parte de arriba a la foto.
+ "html body.template-home .js-home-sections-container>[data-store=\"home-slider\"]{margin-top:calc(-1 * var(--mn-hdr-h,0px) + var(--mn-cyb-h,0px))}"
+ "/* FIN custom */";

function pad(n) { return (n < 10 ? "0" : "") + n; }

function armar() {
  if (document.getElementById("mn-cyb")) return;
  if (!document.getElementById("mn-cyb-css")) {
    var st = document.createElement("style");
    st.id = "mn-cyb-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  var bar = document.createElement("div");
  bar.id = "mn-cyb";
  bar.className = "mn-cyb";
  bar.innerHTML =
    '<div class="mn-cyb__in">'
    + '<div class="mn-cyb__big"><span class="mn-cyb__num"></span><span class="mn-cyb__lbl"></span></div>'
    + '<div class="mn-cyb__txt">'
    +   '<p class="mn-cyb__tit"><span class="mn-cyb__tit-c"></span><span class="mn-cyb__tit-l"></span></p>'
    +   '<p class="mn-cyb__sub"><span class="mn-cyb__sub-l"></span><span class="mn-cyb__falta"> faltan</span><span class="mn-cyb__timer">--:--:--</span></p>'
    + '</div>'
    + '<a class="mn-cyb__btn"></a>'
    + '</div>';
  bar.querySelector(".mn-cyb__num").textContent = BIG;
  bar.querySelector(".mn-cyb__lbl").textContent = BIG_SUB;
  bar.querySelector(".mn-cyb__sub-l").textContent = SUB + " ·";
  var btn = bar.querySelector(".mn-cyb__btn");
  btn.textContent = BOTON;
  btn.href = LINK;

  // Va adentro del encabezado (que es sticky), entre la franja negra de arriba y el logo/menú.
  // No va abajo del menú porque en la home el slider sube por detrás del menú transparente
  // y la barra le cortaría la foto al medio.
  var header = document.querySelector("header.js-head-main") || document.querySelector("header");
  var topbar = header && header.querySelector(".js-topbar");
  if (topbar && topbar.parentNode === header) header.insertBefore(bar, topbar.nextSibling);
  else if (header) header.insertBefore(bar, header.firstChild);
  else document.body.insertBefore(bar, document.body.firstChild);

  var titC = bar.querySelector(".mn-cyb__tit-c");
  var titL = bar.querySelector(".mn-cyb__tit-l");
  var subL = bar.querySelector(".mn-cyb__sub-l");
  var falta = bar.querySelector(".mn-cyb__falta");
  var timer = bar.querySelector(".mn-cyb__timer");
  var iv;

  function tick() {
    var ahora = Date.now();
    if (ahora >= FIN.getTime()) {
      if (iv) clearInterval(iv);
      if (bar.parentNode) bar.parentNode.removeChild(bar);
      avisarAltura();
      return;
    }
    var diff = INICIO.getTime() - ahora;
    if (diff <= 0) {
      titC.textContent = TIT_ACTIVO;
      titL.textContent = TIT_ACTIVO;
      subL.textContent = SUB;
      subL.style.display = "inline";
      falta.style.display = "none";
      timer.style.display = "none";
      if (!bar.mnActivo) { bar.mnActivo = true; avisarAltura(); }
      return;
    }
    var s = Math.floor(diff / 1000);
    var d = Math.floor(s / 86400);
    var h = Math.floor((s % 86400) / 3600);
    var m = Math.floor((s % 3600) / 60);
    timer.textContent = (d > 0 ? d + "d " : "") + pad(h) + ":" + pad(m) + ":" + pad(s % 60);
    var tl = diff <= 86400000 ? TIT_MANANA : TIT_ANTES;
    titL.textContent = tl;
    titC.textContent = diff <= 86400000 ? "Cyber Coman · mañana 00 hs" : TIT_CORTO;
  }

  tick();
  iv = setInterval(tick, 1000);
  avisarAltura();
}

// El encabezado transparente de la home mide la altura del header en "resize":
// se lo avisamos, y guardamos la altura de la barra en --mn-cyb-h para descontarla.
function avisarAltura() {
  var b = document.getElementById("mn-cyb");
  document.documentElement.style.setProperty("--mn-cyb-h", (b ? b.offsetHeight : 0) + "px");
  try { window.dispatchEvent(new Event("resize")); } catch (e) {}
}
window.addEventListener("resize", function () {
  var b = document.getElementById("mn-cyb");
  document.documentElement.style.setProperty("--mn-cyb-h", (b ? b.offsetHeight : 0) + "px");
});

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", armar);
else armar();
window.addEventListener("pageshow", function () { armar(); });
})();
// FIN custom
