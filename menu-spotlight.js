// INICIO custom: menu-spotlight
// Barra de categorias como pastilla azul translucida (en todas las paginas).
// Compu: una luz suave sigue al mouse y la categoria en la que estas queda marcada con una linea brillante.
// Celular: misma pastilla, se desliza de costado, con la categoria actual marcada.
// No toca los menus desplegables del tema ni el checkout.
(function () {
  if (document.getElementById('mn-spot-css')) return;

  var CSS =
    /* ---------- compu ---------- */
    '.nav-desktop{isolation:isolate}' +
    '.js-nav-desktop-list{display:inline-flex;align-items:center;height:44px;margin:3px 0;padding:0 8px;white-space:nowrap}' +
    '.js-nav-desktop-list>li{padding:0 6px}' +
    '.js-nav-desktop-list .nav-list-link{display:inline-block;padding:8px 9px;border-radius:999px;letter-spacing:.5px}' +
    /* la pastilla se dibuja en una capa aparte, detras del texto, para no mover los desplegables */
    '.mn-spot-layer{position:absolute;z-index:-1;border-radius:999px;overflow:hidden;pointer-events:none;' +
    'background:rgba(16,35,63,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);' +
    'border:1px solid rgba(255,255,255,.22);box-shadow:0 6px 20px rgba(16,35,63,.18);box-sizing:border-box}' +
    '.mn-spot-light{position:absolute;bottom:-120px;width:240px;height:240px;margin-left:-120px;border-radius:50%;' +
    'background:radial-gradient(circle,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 50%);opacity:0;transition:opacity .3s ease}' +
    '.mn-spot-layer.is-hover .mn-spot-light{opacity:1}' +
    '.mn-spot-line{position:absolute;bottom:0;width:110px;height:2px;margin-left:-55px;display:none;' +
    'background:radial-gradient(ellipse at center,#fff 0%,rgba(255,255,255,0) 70%);box-shadow:0 0 12px 2px rgba(255,255,255,.55)}' +
    '.mn-spot-layer.has-cur .mn-spot-line{display:block}' +
    '@media (max-width:1100px){.js-nav-desktop-list .nav-list-link{font-size:13px;padding:8px 6px}.js-nav-desktop-list>li{padding:0 3px}}' +
    /* ---------- celular ---------- */
    '.nav-categories{scrollbar-width:none}.nav-categories::-webkit-scrollbar{display:none}' +
    '.nav-list-mobile-categories{display:inline-flex;align-items:center;width:max-content;height:42px;margin:4px 12px;padding:0 6px;' +
    'border-radius:999px;background:rgba(16,35,63,.55);border:1px solid rgba(255,255,255,.22);box-sizing:border-box}' +
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
    }

    // compu
    var nd = document.querySelector('.nav-desktop');
    var ul = nd && nd.querySelector('.js-nav-desktop-list');
    if (!ul) return;
    var links = [].slice.call(ul.querySelectorAll(':scope > li > .nav-item-container > a, :scope > li > a'));
    var cur = marcarActual(links);
    if (cur) cur.setAttribute('aria-current', 'page');

    var layer = document.createElement('div');
    layer.className = 'mn-spot-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<div class="mn-spot-light"></div><div class="mn-spot-line"></div>';
    nd.insertBefore(layer, nd.firstChild);
    var light = layer.firstChild, line = layer.lastChild;

    function ubicar() {
      var r = ul.getBoundingClientRect(), p = nd.getBoundingClientRect();
      if (!r.width) return;
      layer.style.left = (r.left - p.left) + 'px';
      layer.style.top = (r.top - p.top) + 'px';
      layer.style.width = r.width + 'px';
      layer.style.height = r.height + 'px';
      if (cur) {
        var c = cur.getBoundingClientRect();
        line.style.left = (c.left - r.left + c.width / 2) + 'px';
        layer.classList.add('has-cur');
      }
    }

    var raf = 0, mx = 0;
    ul.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        light.style.left = (mx - ul.getBoundingClientRect().left) + 'px';
      });
      layer.classList.add('is-hover');
    });
    ul.addEventListener('mouseleave', function () { layer.classList.remove('is-hover'); });

    ubicar();
    window.addEventListener('resize', ubicar);
    window.addEventListener('load', ubicar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ubicar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
// FIN custom
