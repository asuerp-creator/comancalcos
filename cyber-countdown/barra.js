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
// INICIO custom: pre-cyber-mail
var MAIL_PH    = "Tu email";                          // texto gris adentro del campo
var MAIL_BOTON = "Avisame";                            // botón del formulario
var MAIL_OK    = "¡Listo! Te avisamos cuando arranque."; // mensaje después de anotarse
var MAIL_ERR   = "No se pudo anotar, probá de nuevo.";
// FIN custom
/* =================== FIN DEL BLOQUE EDITABLE ====================== */

if (new Date() >= FIN) return;
if (location.pathname.indexOf("/checkout") !== -1) return; // nunca en el checkout

var CSS = "/* INICIO custom: barra-cyber-countdown */"
+ ".mn-cyb{background:#5E6B33;border-bottom:1px solid #4F5A2A;color:#fff;font-family:inherit}"
+ ".mn-cyb__in{max-width:1100px;margin:0 auto;padding:8px 10px;display:flex;align-items:center;justify-content:center;gap:8px}"
+ ".mn-cyb__big{color:#fff;font-weight:800;line-height:1;display:flex;flex-direction:column;align-items:center;flex:0 0 auto}"
+ ".mn-cyb__num{font-size:26px}"
+ ".mn-cyb__lbl{font-size:8px;letter-spacing:.5px;text-transform:uppercase;margin-top:2px}"
+ ".mn-cyb__txt{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;text-align:center}"
+ ".mn-cyb__tit{font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin:0;color:#fff;line-height:1.2;white-space:nowrap}"
+ ".mn-cyb__tit-l{display:none}"
+ ".mn-cyb__sub{font-size:12px;color:#e9edd9;margin:0;line-height:1.3}"
+ ".mn-cyb__sub-l{display:none}"
+ ".mn-cyb__timer{display:inline-block;color:#fff;font-family:inherit;font-weight:700;font-size:13px;border:1px dashed rgba(255,255,255,.7);border-radius:4px;padding:1px 5px;margin-left:4px;font-variant-numeric:tabular-nums}"
+ ".mn-cyb__btn{flex:0 0 auto;display:inline-block;background:#10233f;color:#fff;font-weight:800;font-size:11px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:8px 10px;border-radius:999px;white-space:nowrap}"
+ ".mn-cyb__btn:hover,.mn-cyb__btn:focus{background:#1c3157;color:#fff;text-decoration:none}"
/* INICIO custom: pre-cyber-mail */
+ ".mn-cyb__in{flex-wrap:wrap}"
+ ".mn-cyb__form{flex:1 0 100%;display:flex;justify-content:center;gap:6px;margin:0}"
+ ".mn-cyb__mail{flex:1 1 auto;min-width:0;max-width:240px;height:32px;padding:0 12px;border:1px solid rgba(255,255,255,.7);border-radius:999px;background:#fff;color:#10233f;font-family:inherit;font-size:16px}"
+ ".mn-cyb__send{flex:0 0 auto;height:32px;padding:0 14px;border:0;border-radius:999px;background:#10233f;color:#fff;font-family:inherit;font-weight:800;font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer}"
+ ".mn-cyb__send:hover,.mn-cyb__send:focus{background:#1c3157}"
+ ".mn-cyb__send[disabled]{opacity:.6;cursor:default}"
+ ".mn-cyb__msg{flex:1 0 100%;text-align:center;font-size:12px;font-weight:700;color:#fff;margin:0}"
/* FIN custom */
+ "@media (min-width:768px){"
+ ".mn-cyb__in{padding:12px 16px;gap:32px}"
+ ".mn-cyb__num{font-size:40px}"
+ ".mn-cyb__lbl{font-size:10px;letter-spacing:1px}"
+ ".mn-cyb__tit{font-size:16px;letter-spacing:1.5px;white-space:normal}"
+ ".mn-cyb__tit-c{display:none}.mn-cyb__tit-l{display:inline}"
+ ".mn-cyb__sub{font-size:13px}.mn-cyb__sub-l{display:inline}"
+ ".mn-cyb__timer{font-size:14px}"
+ ".mn-cyb__btn{font-size:13px;letter-spacing:1.5px;padding:11px 26px}"
/* INICIO custom: pre-cyber-mail */
+ ".mn-cyb__in{flex-wrap:nowrap;gap:24px}"
+ ".mn-cyb__btn{order:2}"
+ ".mn-cyb__form{flex:0 0 auto}"
+ ".mn-cyb__mail{width:210px;height:40px;font-size:14px}"
+ ".mn-cyb__send{height:40px;padding:0 20px;font-size:13px;letter-spacing:1.5px}"
+ ".mn-cyb__msg{flex:0 1 auto;font-size:14px}"
/* FIN custom */
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
    // INICIO custom: pre-cyber-mail (en celular va en una segunda fila; en compu, antes del botón)
    + '<form class="mn-cyb__form" novalidate><input class="mn-cyb__mail" type="email" name="email" autocomplete="email" required aria-label="Email para el Cyber Coman"><button class="mn-cyb__send" type="submit"></button></form>'
    // FIN custom
    + '</div>';
  bar.querySelector(".mn-cyb__num").textContent = BIG;
  bar.querySelector(".mn-cyb__lbl").textContent = BIG_SUB;
  bar.querySelector(".mn-cyb__sub-l").textContent = SUB + " ·";
  var btn = bar.querySelector(".mn-cyb__btn");
  btn.textContent = BOTON;
  btn.href = LINK;

  // INICIO custom: pre-cyber-mail
  // Anota el mail en la misma lista de newsletter que el formulario nativo del pie (POST a /winnie-pooh).
  var form = bar.querySelector(".mn-cyb__form");
  var mail = bar.querySelector(".mn-cyb__mail");
  var send = bar.querySelector(".mn-cyb__send");
  mail.placeholder = MAIL_PH;
  send.textContent = MAIL_BOTON;
  function mensaje(txt) {
    var p = document.createElement("p");
    p.className = "mn-cyb__msg";
    p.textContent = txt;
    form.parentNode.replaceChild(p, form);
    avisarAltura();
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = (mail.value || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { mail.focus(); mail.style.borderColor = "#ffb4a8"; return; }
    mail.style.borderColor = "";
    send.disabled = true;
    var datos = new URLSearchParams();
    datos.append("email", v);
    datos.append("winnie-pooh", "");
    datos.append("name", "Sin nombre");
    datos.append("message", "Pedido de inscripción a newsletter");
    datos.append("type", "newsletter");
    datos.append("contact", "");
    fetch("/winnie-pooh", { method: "POST", body: datos, credentials: "same-origin" })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        try { localStorage.setItem("mn-cyb-mail", "1"); } catch (e2) {}
        mensaje(MAIL_OK);
      })
      .catch(function () {
        send.disabled = false;
        send.textContent = "Reintentar";
        mail.style.borderColor = "#ffb4a8";
        mail.title = MAIL_ERR;
      });
  });
  var yaAnotado = false;
  try { yaAnotado = localStorage.getItem("mn-cyb-mail") === "1"; } catch (e3) {}
  if (yaAnotado) mensaje(MAIL_OK);
  // FIN custom

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
      // INICIO custom: pre-cyber-mail — cuando arranca el Cyber se saca el formulario
      var fm = bar.querySelector(".mn-cyb__form, .mn-cyb__msg");
      if (fm) fm.parentNode.removeChild(fm);
      // FIN custom
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
