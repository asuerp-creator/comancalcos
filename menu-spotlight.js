// INICIO custom: menu-spotlight
// Barra de categorias como pastilla azul translucida (en todas las paginas).
// Compu: la pastilla es el propio menu (se adapta sola a las categorias); luz que sigue al mouse y linea bajo la categoria actual.
// Celular: misma pastilla, se desliza de costado, con la categoria actual marcada.
// No toca los menus desplegables del tema ni el checkout.
(function () {
  if (document.getElementById('mn-spot-css')) return;

  var CSS =
    /* ---------- compu ---------- */
    /* la pastilla ES el menu: siempre mide lo mismo que las categorias, sean las que sean */
    '.js-nav-desktop-list{display:inline-flex;align-items:center;height:44px;margin:3px 0;padding:0 8px;white-space:nowrap;' +
    'border-radius:999px;box-sizing:border-box;border:1px solid rgba(255,255,255,.22);box-shadow:0 6px 20px rgba(16,35,63,.18);' +
    'background-color:rgba(16,35,63,.6);background-repeat:no-repeat}' +
    '.js-nav-desktop-list>li{padding:0 6px}' +
    '.js-nav-desktop-list .nav-list-link{display:inline-block;padding:8px 9px;border-radius:999px;letter-spacing:.5px}' +
    /* linea brillante bajo la categoria actual y luz que sigue al mouse: fondos del mismo menu */
    '.js-nav-desktop-list.mn-has-cur{background-image:radial-gradient(56px 2px at var(--mn-cx,50%) calc(100% - 1px),#fff 0%,rgba(255,255,255,0) 100%)}' +
    '.js-nav-desktop-list.mn-hover{background-image:radial-gradient(70px circle at var(--mn-mx,50%) 100%,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 100%)}' +
    '.js-nav-desktop-list.mn-hover.mn-has-cur{background-image:radial-gradient(56px 2px at var(--mn-cx,50%) calc(100% - 1px),#fff 0%,rgba(255,255,255,0) 100%),' +
    'radial-gradient(70px circle at var(--mn-mx,50%) 100%,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 100%)}' +
    '@media (max-width:1100px){.js-nav-desktop-list .nav-list-link{font-size:13px;padding:8px 6px}.js-nav-desktop-list>li{padding:0 3px}}' +
    /* ---------- celular ---------- */
    /* la pastilla es el contenedor (queda fija); adentro solo se deslizan los nombres */
    '.nav-categories-container::before,.nav-categories-container::after{display:none}' +
    '.nav-categories{margin:4px 12px;height:42px;border-radius:999px;overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;' +
    'background:rgba(16,35,63,.55);border:1px solid rgba(255,255,255,.22);box-sizing:border-box;scrollbar-width:none}' +
    '.nav-categories::-webkit-scrollbar{display:none}' +
    '.nav-list-mobile-categories{display:inline-flex;align-items:center;width:max-content;height:100%;margin:0;padding:0 8px;background:none;border:0;transition:none}' +
    '.nav-list-mobile-categories .nav-list-link{position:relative;display:inline-block;padding:8px 10px;border-radius:999px}' +
    '.nav-list-mobile-categories .nav-list-link.mn-spot-cur::after{content:"";position:absolute;left:15%;right:15%;bottom:2px;height:2px;' +
    'background:radial-gradient(ellipse at center,#fff 0%,rgba(255,255,255,0) 75%);box-shadow:0 0 10px 1px rgba(255,255,255,.55)}';

  var st = document.createElement('style');
  st.id = 'mn-spot-css';
  st.textContent = CSS;
  document.head.appendChild(st);

  // categoria actual: el link cuyo camino coincide mas largo con la pagina abierta
  function marcarActual(links) {
    var path = location.pathname, best = null, bestLen = 0;
    links.forEach(function (a) {
      var p;
      try { p = new URL(a.href, location.href).pathname; } catch (e) { return; }
      if (p.length > 1 && path.indexOf(p) === 0 && p.length > bestLen) { best = a; bestLen = p.length; }
    });
    return best;
  }

  function start() {
    // celular
    var mob = [].slice.call(document.querySelectorAll('.nav-list-mobile-categories > li > a, .nav-list-mobile-categories > li .nav-list-link'));
    var curM = marcarActual(mob);
    if (curM) {
      curM.classList.add('mn-spot-cur');
      curM.setAttribute('aria-current', 'page');
      // deja la categoria actual centrada dentro de la pastilla
      var box = document.querySelector('.nav-categories');
      if (box) {
        var rb = box.getBoundingClientRect(), ra = curM.getBoundingClientRect();
        box.scrollLeft += (ra.left - rb.left) - (rb.width - ra.width) / 2;
      }
    }

    // compu
    var ul = document.querySelector('.nav-desktop .js-nav-desktop-list');
    if (!ul) return;
    var links = [].slice.call(ul.querySelectorAll(':scope > li > .nav-item-container > a, :scope > li > a'));
    var cur = marcarActual(links);
    if (cur) cur.setAttribute('aria-current', 'page');

    function ubicarLinea() {
      if (!cur) return;
      var r = ul.getBoundingClientRect(), c = cur.getBoundingClientRect();
      if (!r.width) return;
      ul.style.setProperty('--mn-cx', (c.left - r.left + c.width / 2) + 'px');
      ul.classList.add('mn-has-cur');
    }

    var raf = 0, mx = 0;
    ul.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        ul.style.setProperty('--mn-mx', (mx - ul.getBoundingClientRect().left) + 'px');
        ul.classList.add('mn-hover');
      });
    });
    ul.addEventListener('mouseleave', function () { ul.classList.remove('mn-hover'); });

    ubicarLinea();
    if (window.ResizeObserver) new ResizeObserver(ubicarLinea).observe(ul);
    window.addEventListener('resize', ubicarLinea);
    window.addEventListener('load', ubicarLinea);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', ubicarLinea);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
// FIN custom
