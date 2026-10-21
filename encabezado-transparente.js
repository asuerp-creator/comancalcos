// INICIO custom: encabezado-transparente
// Solo en la portada: el encabezado queda transparente encima del primer banner
// y se vuelve celeste solido apenas se baja un poco. La franja negra de arriba no se toca.
(function () {
  if (!document.body || !document.body.classList.contains('template-home')) return;
  if (document.getElementById('mn-hdr-css')) return;

  var CSS =
    /* encabezado transparente mientras estas arriba de todo */
    'body.template-home header.js-head-main{background:transparent;transition:background-color .28s ease,box-shadow .28s ease}' +
    /* sombra azul suave detras del menu para que el texto blanco se lea sobre la foto */
    'body.template-home header.js-head-main:not(.mn-hdr-solid)>.container-fluid{background:linear-gradient(to bottom,rgba(16,35,63,.32),rgba(16,35,63,.18) 65%,rgba(16,35,63,0))}' +
    'body.template-home header.js-head-main:not(.mn-hdr-solid) .container-fluid a,' +
    'body.template-home header.js-head-main:not(.mn-hdr-solid) .container-fluid span{text-shadow:0 1px 4px rgba(16,35,63,.55)}' +
    /* al bajar: celeste solido con sombra */
    'body.template-home header.js-head-main.mn-hdr-solid{background:#87b4d3;box-shadow:0 4px 18px rgba(16,35,63,.22)}' +
    /* el banner sube por debajo del encabezado (el alto lo mide el script) */
    'body.template-home .js-home-sections-container>[data-store="home-slider"]{margin-top:calc(-1 * var(--mn-hdr-h,0px))}' +
    /* esconde la barrita de desplazamiento del menu de categorias en celular */
    'body.template-home header.js-head-main *{scrollbar-width:none}' +
    'body.template-home header.js-head-main *::-webkit-scrollbar{display:none}';

  var st = document.createElement('style');
  st.id = 'mn-hdr-css';
  st.textContent = CSS;
  document.head.appendChild(st);

  function start() {
    var h = document.querySelector('header.js-head-main');
    if (!h) return;
    var tb = h.querySelector('.section-topbar');

    // alto del encabezado sin la franja negra = cuanto tiene que subir el banner
    function medir() {
      if (h.classList.contains('mn-hdr-solid')) return; // con el encabezado achicado no se mide
      var alto = h.offsetHeight - (tb ? tb.offsetHeight : 0);
      if (alto > 0) document.documentElement.style.setProperty('--mn-hdr-h', alto + 'px');
    }

    var solido = null;
    function alScrollear() {
      var s = window.scrollY > 40;
      if (s !== solido) {
        solido = s;
        h.classList.toggle('mn-hdr-solid', s);
        if (!s) setTimeout(medir, 450); // al volver arriba, re-medir cuando el encabezado ya se agrando
      }
    }

    medir();
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', medir);
    window.addEventListener('load', medir);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
// FIN custom
