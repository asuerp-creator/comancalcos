// INICIO custom: resenas-stack
// Seccion "Reseñas 100% reales" de la home: stack de 4 tarjetas que rota cada 3,5 s.
// Reemplaza a los bloques mn-reviews (1/2) y (2/2) de Codigos externos.
// Mantiene el id #mn-reviews (lo usan combos.js y el bloque "stickers laterales")
// y la clase .mnr-t del titulo (la estiliza el bloque "titulos-unificados").
(function(){
  /* ===================== EDITA SOLO ESTE BLOQUE ===================== */
  // Reseñas reales de Google Maps (perfil "Coman Calcos"), leidas el 25/10/2026.
  // q = fragmento textual de la reseña; "…" marca donde se recorto.
  var TITULO="Reseñas 100% reales";
  var PROMEDIO="5,0", CANTIDAD="47";
  var LINK="https://www.google.com/maps/place/Coman+Calcos/@-34.5915801,-58.5064272,17z/data=!4m6!3m5!1s0x95bcb7f8d4d7441d:0xc845ec5a011aff7a!8m2!3d-34.5915801!4d-58.5064272!16s%2Fg%2F11nv342nqt";
  var R=[
    {n:"Luciana Etchart",r:"Diseñadora gráfica · Google",q:"Los tengo pegados en mi auto, y termo hace un año y están impecables"},
    {n:"Marcos Scotto",r:"5 reseñas · Google",q:"Me fui de vacaciones a la playa y volvieron intactos. Sol, arena, agua.. se la re bancaron."},
    {n:"Ezequiel Perez",r:"Equipo docente, Instituto Vélez · Google",q:"…hemos comprado más de 700 stickers para regalar a los alumnos"},
    {n:"Sofia Vieira",r:"1 reseña · Google",q:"Los tengo hace 4 años realmente y estan intactos, no se les fue el color"},
    {n:"Laura Demergasso",r:"1 reseña · Google",q:"…los tengo en la botella que uso todos los días y siguen perfectos"},
    {n:"Susana Darre",r:"Local Guide · Google",q:"El único inconveniente es que me los sacaron mis hijos porque les encantaron"},
    {n:"Maximiliano Mendoza",r:"Emprendedor · Google",q:"Me ayudo muchísimo emprender con Coman Calcos"},
    {n:"Yanina Rodríguez",r:"5 reseñas · Google",q:"Excelente calidad!!! Y me llegó el mismo día q los compré x la tienda online!!"},
    {n:"Lucia Ayuso",r:"3 reseñas · Google",q:"…llegaron super rápido y se comunicaron para ver qué me parecieron"},
    {n:"Tomi Lazzaroni",r:"1 reseña · Google",q:"Quedaron de 10 en el termo y notebook. Volvería a comprar sin dudas!"}
  ];
  var STEP=3500; // milisegundos entre tarjeta y tarjeta
  /* =================== FIN DEL BLOQUE EDITABLE ====================== */

  var Y=26, SC=.06, DIM=.05, N=4;

  var CSS=
  "#mn-reviews.mn-rv{position:relative;background:#fff;margin-top:-46px;padding:16px 16px 40px;font-family:Poppins,sans-serif;text-align:center;overflow-x:clip}"+
  "#mn-reviews.mn-rv *{box-sizing:border-box}"+
  ".mn-rv .mnr-t{margin:0 0 4px;text-wrap:balance}"+
  ".mn-rv__stage{--mn-rv-h:236px;position:relative;z-index:2;width:min(640px,100%);height:var(--mn-rv-h);margin:82px auto 0;touch-action:pan-y;text-align:left}"+
  ".mn-rv__card{position:absolute;inset:0;display:flex;flex-direction:column;gap:12px;padding:22px 22px 20px;border-radius:18px;background:#fff;color:#14243b;border:1px solid #e6e9ee;box-shadow:0 14px 34px -16px rgba(16,35,63,.28);transform-origin:50% 0;transition:transform .6s cubic-bezier(.65,0,.35,1),opacity .45s ease;will-change:transform,opacity}"+
  ".mn-rv__card::after{content:'';position:absolute;inset:-1px;border-radius:inherit;pointer-events:none;background:#10233f;opacity:var(--mn-rv-dim,0);transition:opacity .6s cubic-bezier(.65,0,.35,1)}"+
  ".mn-rv__stars{display:flex;gap:5px}"+
  ".mn-rv__stars svg{width:18px;height:18px;fill:#e2e5ea;transition:fill .15s ease}"+
  ".mn-rv__stars svg.on{fill:#EF6237;animation:mn-rv-pop .32s cubic-bezier(.34,1.56,.64,1)}"+
  "@keyframes mn-rv-pop{0%{transform:scale(.6)}60%{transform:scale(1.3)}100%{transform:scale(1)}}"+
  ".mn-rv__q{margin:0;flex:1;min-width:0;color:#10233f;font:700 19px/1.32 Poppins,sans-serif;letter-spacing:-.01em;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}"+
  ".mn-rv__who{display:flex;align-items:center;gap:11px}"+
  ".mn-rv__av{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#10233f;color:#fff;font:700 14px/1 Poppins,sans-serif;letter-spacing:.02em}"+
  ".mn-rv__n{margin:0;font:600 14.5px/1.25 Poppins,sans-serif;color:#10233f}"+
  ".mn-rv__r{margin:0;font:400 12.5px/1.3 Poppins,sans-serif;color:#6b7482}"+
  ".mn-rv__avg{margin:22px 0 0;display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:center;font:400 14px/1.4 Poppins,sans-serif;color:#6b7482}"+
  ".mn-rv__avg b{color:#10233f;font-weight:700}"+
  ".mn-rv__avg i{font-style:normal;color:#EF6237}"+
  ".mn-rv__all{display:inline-flex;align-items:center;gap:8px;min-height:48px;margin-top:18px;padding:0 30px;border-radius:8px;background:#10233f;color:#fff;text-decoration:none;font:700 16px/1 Poppins,sans-serif}"+
  ".mn-rv__all:hover,.mn-rv__all:focus{background:#1b3459;color:#fff}"+
  ".mn-rv__all:focus-visible{outline:3px solid #EF6237;outline-offset:3px}"+
  "@media (min-width:768px){#mn-reviews.mn-rv{margin-top:-56px;padding-top:20px}.mn-rv__stage{--mn-rv-h:214px}.mn-rv__card{padding:26px 32px 22px}.mn-rv__q{font-size:24px;line-height:1.3;-webkit-line-clamp:2}}";

  var STAR='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z"/></svg>';

  function ini(n){var p=n.trim().split(" ");return ((p[0]||"")[0]+((p[1]||"")[0]||"")).toUpperCase();}
  function build(){
    var c=document.createElement("article");c.className="mn-rv__card";
    c.innerHTML='<div class="mn-rv__stars" role="img" aria-label="5 de 5 estrellas">'+STAR+STAR+STAR+STAR+STAR+'</div>'+
      '<p class="mn-rv__q"></p><div class="mn-rv__who"><span class="mn-rv__av"></span><div><p class="mn-rv__n"></p><p class="mn-rv__r"></p></div></div>';
    return c;
  }
  function fill(c,i){
    var d=R[i%R.length];
    c.querySelector(".mn-rv__q").textContent="“"+d.q+"”";
    c.querySelector(".mn-rv__av").textContent=ini(d.n);
    c.querySelector(".mn-rv__n").textContent=d.n;
    c.querySelector(".mn-rv__r").textContent=d.r;
    var s=c.querySelectorAll(".mn-rv__stars svg");for(var k=0;k<s.length;k++)s[k].classList.remove("on");
  }
  function place(c,i){
    c.style.transform="translateY("+(-Y*i)+"px) scale("+(1-SC*i)+")";
    c.style.zIndex=String(10-i);
    c.style.setProperty("--mn-rv-dim",String(DIM*i));
    c.setAttribute("aria-hidden",i?"true":"false");
  }
  function stars(c){
    var s=c.querySelectorAll(".mn-rv__stars svg");
    [].forEach.call(s,function(el,k){setTimeout(function(){el.classList.add("on")},110*k)});
  }

  function init(){
    var box=document.querySelector(".js-home-sections-container");
    if(!box) return false;
    if(document.getElementById("mn-reviews")) return true;

    if(!document.getElementById("mn-rv-css")){
      var st=document.createElement("style");st.id="mn-rv-css";st.textContent=CSS;document.head.appendChild(st);
    }
    var s=document.createElement("section");
    s.id="mn-reviews";s.className="mn-rv";s.setAttribute("aria-label","Reseñas de clientes en Google");
    s.innerHTML='<h2 class="mnr-t"></h2><div class="mn-rv__stage"></div>'+
      '<p class="mn-rv__avg"><i aria-hidden="true">★</i><b></b><span></span></p>'+
      '<div><a class="mn-rv__all" target="_blank" rel="noopener"><span aria-hidden="true">💬</span> Ver todas las opiniones</a></div>';
    s.querySelector(".mnr-t").textContent=TITULO;
    s.querySelector(".mn-rv__avg b").textContent=PROMEDIO;
    s.querySelector(".mn-rv__avg span").textContent="de promedio en "+CANTIDAD+" reseñas de Google";
    s.querySelector(".mn-rv__all").href=LINK;

    var stage=s.querySelector(".mn-rv__stage"),cards=[],next=N;
    for(var i=0;i<N;i++){var c=build();fill(c,i);place(c,i);cards.push(c);stage.appendChild(c);}

    // misma ubicacion que antes: arriba de "Los mas elegidos"
    var a=document.querySelector('section[data-store="home-products-featured"]');
    while(a&&a.parentNode!==box)a=a.parentNode;
    if(a)box.insertBefore(s,a);else box.appendChild(s);

    // solo anima cuando la seccion esta en pantalla y sin el mouse encima
    var visible=true,hover=false,started=false;
    stage.addEventListener("mouseenter",function(){hover=true});
    stage.addEventListener("mouseleave",function(){hover=false});
    if("IntersectionObserver" in window){
      visible=false;
      new IntersectionObserver(function(e){
        visible=e[0].isIntersecting;
        if(visible&&!started){started=true;setTimeout(function(){stars(cards[0])},300);}
      },{threshold:.25}).observe(stage);
    }else{started=true;setTimeout(function(){stars(cards[0])},300);}

    function tick(){
      if(!visible||hover||document.hidden||!started){setTimeout(tick,400);return;}
      var out=cards.shift();
      out.style.transition="transform .55s cubic-bezier(.5,0,.75,0),opacity .45s ease";
      out.style.transform="translate(-118%,14px) rotate(-10deg)";
      out.style.opacity="0";
      cards.forEach(function(c,i){place(c,i)});
      setTimeout(function(){stars(cards[0])},260);
      setTimeout(function(){
        fill(out,next);next=(next+1)%R.length;
        out.style.transition="none";
        place(out,N-1);
        void out.offsetWidth;
        out.style.transition="";
        out.style.opacity="1";
        cards.push(out);
      },580);
      setTimeout(tick,STEP);
    }
    setTimeout(tick,STEP);
    return true;
  }

  function start(){
    if(init()) return;
    if(!("MutationObserver" in window)) return;
    var mo=new MutationObserver(function(){if(init())mo.disconnect();});
    mo.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){mo.disconnect();},15000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
  window.addEventListener("pageshow",function(){try{init()}catch(e){}});
})();
// FIN custom
