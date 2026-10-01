// INICIO custom: configurador-stickers-personalizados (paso 1: fondo y tamano, con fotos)
(function(){
"use strict";

/* ===== TEXTOS EDITABLES ===== */
var TXT={
  fondoTit:"Tipo de fondo",
  fondoNota:"Se imprime sobre vinilo blanco, con borde blanco.",
  con:"Con fondo",
  conDesc:"Se imprime la imagen tal cual la sub\u00eds.",
  sin:"Sin fondo",
  sinDesc:"Recortamos lo principal y sacamos el resto.",
  tamTit:"Tama\u00f1o",
  tamNota:"El tama\u00f1o elegido corresponde al lado m\u00e1s largo de tu dise\u00f1o.",
  bloqueado:"Primero eleg\u00ed el tipo de fondo",
  falta:"Eleg\u00ed el tipo de fondo y el tama\u00f1o para poder agregar al carrito."
};
/* ===== FIN TEXTOS ===== */

if(location.pathname.indexOf("/productos/stickers-personalizados1")!==0)return;

var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@v1.0.11/stickers-personalizados/";})();
function img(n,w,h){return "<img src='"+BASE+"img/"+n+".webp' width='"+w+"' height='"+h+"' alt='' decoding='async'>";}

var CSS=".mn-cfg-hide{display:none!important}"+
".mn-cfg{font-family:Poppins,sans-serif;color:#10233f;margin:4px 0 18px;width:100%}"+
".mn-cfg__paso{margin:0 0 20px;transition:opacity .2s}"+
".mn-cfg__paso.is-off .mn-cfg__ops{opacity:.45}"+
".mn-cfg__cab{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 8px;margin:0 0 10px;padding:0 0 6px;border-bottom:3px solid #87b4d3}"+
".mn-cfg__tit{font-family:Montserrat,sans-serif;font-weight:800;font-size:15px;margin:0}"+
".mn-cfg__tit::after{content:'*';color:#87b4d3}"+
".mn-cfg__bloq{font-size:12px;color:#4a5568}"+
".mn-cfg__nota{margin:0 0 10px;padding:8px 12px;border-radius:8px;background:#eaf2f8;color:#10233f;font-size:12px;font-weight:600;line-height:1.35}"+
".mn-cfg__ops{display:grid;gap:8px;transition:opacity .2s}"+
".mn-cfg__ops--fon{grid-template-columns:1fr 1fr}"+
".mn-cfg__ops--tam{grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}"+
".mn-cfg__op{appearance:none;-webkit-appearance:none;font:inherit;color:#10233f;background:#fff;border:2px solid #c9d8e6;border-radius:10px;padding:10px 6px;cursor:pointer;text-align:center;line-height:1.2;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;transition:border-color .15s,background-color .15s,box-shadow .15s}"+
".mn-cfg__op:hover{border-color:#87b4d3}"+
".mn-cfg__op:focus-visible{outline:3px solid #10233f;outline-offset:2px}"+
".mn-cfg__op[aria-pressed=true]{border-color:#10233f;background:#eaf2f8;box-shadow:0 0 0 1px #10233f}"+
".mn-cfg__op:disabled{cursor:not-allowed;background:#fff;color:#10233f}"+
".mn-cfg__op:disabled:hover{border-color:#c9d8e6}"+
".mn-cfg__ico{width:100%;max-width:160px;aspect-ratio:4/3;display:block}"+
".mn-cfg__ico img,.mn-cfg__vis img{width:100%;height:100%;object-fit:contain;display:block}"+
".mn-cfg__fn{font-family:Montserrat,sans-serif;font-weight:700;font-size:14px}"+
".mn-cfg__fd{font-size:11px;line-height:1.3}"+
".mn-cfg__vis{width:100%;max-width:90px;aspect-ratio:1/1;display:block}"+
".mn-cfg__cm{font-family:Montserrat,sans-serif;font-weight:800;font-size:14px;white-space:nowrap}"+
".mn-cfg__pr{font-size:11px;line-height:1.25;white-space:nowrap}"+
".mn-cfg__falta{display:none;margin:0;padding:8px 12px;border-radius:8px;background:#fff4e5;color:#7a3e00;font-size:13px;font-weight:600}"+
".mn-cfg__falta.is-on{display:block}"+
"@media(min-width:768px){.mn-cfg__cm{font-size:15px}}";

var sel,form,box,tam=null,fon=null,M={},TAMS=[];

function precio(n){return "$"+Math.round(n).toLocaleString("es-AR");}

function leerVariantes(){
  var vs=(window.LS&&LS.variants)||[];
  for(var i=0;i<sel.options.length;i++){
    var m=/^(\d+)\s*cm\s+(con|sin)\s+fondo$/i.exec(sel.options[i].value.trim());
    if(!m)return false;
    var t=m[1],f=m[2].toLowerCase(),p=null;
    for(var j=0;j<vs.length;j++){if(vs[j].option0===sel.options[i].value){p=vs[j].price_number;break;}}
    M[t]=M[t]||{};M[t][f]={v:sel.options[i].value,p:p};
    if(TAMS.indexOf(t)<0)TAMS.push(t);
  }
  TAMS.sort(function(a,b){return a-b;});
  return TAMS.length>0;
}

function boton(html,on){
  var b=document.createElement("button");
  b.type="button";b.className="mn-cfg__op";b.innerHTML=html;b.setAttribute("aria-pressed","false");
  b.addEventListener("click",on);return b;
}

function desde(t){
  var ps=[];if(M[t].con&&M[t].con.p!=null)ps.push(M[t].con.p);if(M[t].sin&&M[t].sin.p!=null)ps.push(M[t].sin.p);
  return ps.length?"desde<br>"+precio(Math.min.apply(null,ps)):"";
}

function armar(){
  box=document.createElement("div");
  box.className="mn-cfg";box.id="mn-cfg";
  box.innerHTML=
    "<div class='mn-cfg__paso' data-p='1'><div class='mn-cfg__cab'><p class='mn-cfg__tit'>"+TXT.fondoTit+"</p></div>"+
    "<p class='mn-cfg__nota'>"+TXT.fondoNota+"</p>"+
    "<div class='mn-cfg__ops mn-cfg__ops--fon' role='group' aria-label='"+TXT.fondoTit+"'></div></div>"+
    "<div class='mn-cfg__paso is-off' data-p='2'><div class='mn-cfg__cab'><p class='mn-cfg__tit'>"+TXT.tamTit+"</p><span class='mn-cfg__bloq'>"+TXT.bloqueado+"</span></div>"+
    "<p class='mn-cfg__nota'>"+TXT.tamNota+"</p>"+
    "<div class='mn-cfg__ops mn-cfg__ops--tam' role='group' aria-label='"+TXT.tamTit+"'></div></div>"+
    "<p class='mn-cfg__falta' role='alert'>"+TXT.falta+"</p>";
  var gf=box.querySelector(".mn-cfg__ops--fon"),gt=box.querySelector(".mn-cfg__ops--tam");
  [["con",TXT.con,TXT.conDesc,img("con-fondo",400,300)],["sin",TXT.sin,TXT.sinDesc,img("sin-fondo",400,300)]].forEach(function(o){
    var b=boton("<span class='mn-cfg__ico'>"+o[3]+"</span><span class='mn-cfg__fn'>"+o[1]+"</span><span class='mn-cfg__fd'>"+o[2]+"</span>",function(){fon=o[0];actualizar();});
    b.setAttribute("data-f",o[0]);gf.appendChild(b);
  });
  TAMS.forEach(function(t){
    var b=boton("<span class='mn-cfg__vis'>"+img("tam-"+t,240,240)+"</span><span class='mn-cfg__cm'>"+t+" cm</span><span class='mn-cfg__pr'>"+desde(t)+"</span>",function(){if(!fon)return;tam=t;actualizar();});
    b.setAttribute("data-t",t);b.disabled=true;gt.appendChild(b);
  });
}

function actualizar(){
  var p1=box.querySelector("[data-p='1']"),p2=box.querySelector("[data-p='2']");
  if(fon&&tam&&!M[tam][fon])tam=null;
  box.querySelectorAll("[data-f]").forEach(function(b){b.setAttribute("aria-pressed",b.getAttribute("data-f")===fon?"true":"false");});
  p1.classList.toggle("is-ok",!!fon);
  p2.classList.toggle("is-off",!fon);
  var bl=p2.querySelector(".mn-cfg__bloq");if(bl)bl.style.display=fon?"none":"";
  box.querySelectorAll("[data-t]").forEach(function(b){
    var t=b.getAttribute("data-t"),d=fon&&M[t][fon];
    b.disabled=!d;b.setAttribute("aria-pressed",t===tam?"true":"false");
    var pr=d&&d.p!=null?precio(d.p):desde(t);
    b.querySelector(".mn-cfg__pr").innerHTML=pr;
    b.setAttribute("aria-label",t+" cent\u00edmetros, "+pr.replace("<br>"," "));
  });
  if(tam&&fon){
    box.querySelector(".mn-cfg__falta").classList.remove("is-on");
    var v=M[tam][fon].v;
    if(sel.value!==v){sel.value=v;sel.dispatchEvent(new Event("change",{bubbles:true}));if(window.jQuery)jQuery(sel).trigger("change");}
  }
}

function frenar(e){
  if(tam&&fon)return;
  e.preventDefault();e.stopImmediatePropagation();
  box.querySelector(".mn-cfg__falta").classList.add("is-on");
  box.scrollIntoView({behavior:"smooth",block:"center"});
}

function init(){
  if(document.getElementById("mn-cfg"))return;
  sel=document.querySelector("#product_form #variation_1");
  form=document.getElementById("product_form");
  var grupo=form&&form.querySelector(".js-product-variants");
  if(!sel||!grupo||!leerVariantes())return;
  if(!document.getElementById("mn-cfg-css")){var s=document.createElement("style");s.id="mn-cfg-css";s.textContent=CSS;document.head.appendChild(s);}
  armar();
  grupo.parentNode.insertBefore(box,grupo);
  grupo.classList.add("mn-cfg-hide");
  document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".js-addtocart");if(b&&form.contains(b))frenar(e);},true);
  form.addEventListener("submit",frenar,true);
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
// FIN custom
