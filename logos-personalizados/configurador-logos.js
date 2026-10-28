// INICIO custom: configurador-logos-personalizados (v1: material, tamano, pack y carga de logos)
(function(){
"use strict";

/* ===== TEXTOS EDITABLES ===== */
var TXT={
  matTit:"Material",
  matNota:"Tu logo va siempre sin fondo: lo recortamos por el contorno.",
  holo:"Holográfico",holoDesc:"Reflejos de colores que cambian con la luz.",
  oro:"Dorado",oroDesc:"Terminación metalizada color oro.",
  bla:"Blanco",blaDesc:"Colores plenos sobre vinilo blanco.",
  tamTit:"Tamaño",
  tamNota:"El tamaño elegido corresponde al lado más largo de tu logo.",
  bloqueado:"Primero elegí el material",
  packTit:"Cantidad",
  packNota:"Cada logo que cargues lleva este pack. Cuantos más, menos te sale cada sticker.",
  bloqueadoP:"Primero elegí material y tamaño",
  stickers:"stickers",
  cu:"c/u",
  disTit:"Cargá tu logo",
  disNota:"Podés cargar hasta 10 logos con el mismo material, tamaño y pack. Formatos: jpg, jpeg o png, en la mejor calidad que tengas.",
  bloqueado3:"Primero elegí material, tamaño y cantidad",
  disN:"Logo N° ",
  soltar:"Arrastrá tu archivo acá o ",
  elegir:"elegí uno",
  formatos:"jpg, jpeg o png",
  otro:"+ Agregar otro logo",
  quitar:"Quitar logo",
  cambiar:"Cambiar",
  preparando:"Preparando…",
  subiendo:"Subiendo ",
  subido:"Subido",
  errTipo:"Ese archivo no es jpg ni png. Elegí otro.",
  errSubida:"No se pudo subir. ",
  reintentar:"Reintentar",
  maximo:"Llegaste al máximo de 10 logos.",
  valor:"Valor de tu orden",
  logos:"Logos",
  total:"Stickers",
  subtotal:"Subtotal",
  reiniciar:"Comenzar de nuevo",
  agregar:"Agregar al carrito",
  agregando:"Agregando…",
  falta:"Elegí material, tamaño y cantidad.",
  faltaDis:"Subí al menos un logo para agregar al carrito.",
  esperar:"Esperá a que terminen de subir tus logos.",
  agregado:"¡Listo! Agregamos tus logos al carrito.",
  errCarrito:"No pudimos agregar todos los logos. Revisá el carrito o probá de nuevo."
};
/* ===== FIN TEXTOS ===== */

/* ===== CONFIGURACION ===== */
var CFG={
  cloud:"x7i0tmkr",
  preset:"mn_personalizados",
  prop:"Diseño",
  maxDis:10,
  maxBytes:9500000
};
/* Valores tal cual estan en las variantes del producto (Material / Tamano / Cantidad) */
var MATS=[["Holografico","holo"],["Dorado","oro"],["Blanco","bla"]];
/* ===== FIN CONFIGURACION ===== */

if(location.pathname.indexOf("/productos/logos-personalizados")!==0)return;

var BASE=(function(){try{var e=document.currentScript;if(e&&e.src)return e.src.replace(/[^\/]+$/,"");}catch(x){}return "https://cdn.jsdelivr.net/gh/asuerp-creator/comancalcos@main/logos-personalizados/";})();
function img(n,w,h){return "<img src='"+BASE+"../stickers-personalizados/img/"+n+".webp' width='"+w+"' height='"+h+"' alt='' decoding='async'>";}

var CSS=".mn-cfg-hide{display:none!important}"+
".mn-cfg{font-family:Poppins,sans-serif;color:#10233f;margin:4px 0 18px;width:100%}"+
".mn-cfg__paso{margin:0 0 20px;transition:opacity .2s}"+
".mn-cfg__paso.is-off .mn-cfg__ops,.mn-cfg__paso.is-off .mn-cfg__dlist,.mn-cfg__paso.is-off .mn-cfg__otro{opacity:.45;pointer-events:none}"+
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
".mn-cfg__op:focus-visible,.mn-cfg__btn:focus-visible,.mn-cfg__q button:focus-visible,.mn-cfg__x:focus-visible,.mn-cfg__otro:focus-visible,.mn-cfg__lnk:focus-visible{outline:3px solid #10233f;outline-offset:2px}"+
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
".mn-cfg__dlist{display:flex;flex-direction:column;gap:12px;transition:opacity .2s}"+
".mn-cfg__dis{border:1px solid #c9d8e6;border-radius:10px;padding:10px;background:#fff}"+
".mn-cfg__dn{font-family:Montserrat,sans-serif;font-weight:700;font-size:13px;margin:0 0 8px}"+
".mn-cfg__drow{display:flex;flex-direction:column;gap:10px}"+
".mn-cfg__drop{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-height:96px;margin:0;padding:12px;border:2px dashed #87b4d3;border-radius:8px;background:#f4f8fb;text-align:center;font-size:13px;font-weight:400;cursor:pointer;transition:background-color .15s,border-color .15s}"+
".mn-cfg__drop:hover,.mn-cfg__drop.is-over{background:#eaf2f8;border-color:#10233f}"+
".mn-cfg__drop:focus-within{outline:3px solid #10233f;outline-offset:2px}"+
".mn-cfg__drop input{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0 0 0 0)}"+
".mn-cfg__drop u{font-weight:700}"+
".mn-cfg__drop small{font-size:11px;color:#4a5568}"+
".mn-cfg__drop svg{width:28px;height:28px}"+
".mn-cfg__file{display:flex;align-items:center;gap:10px;min-height:72px}"+
".mn-cfg__th{width:64px;height:64px;flex:none;border-radius:6px;background:#f4f8fb center/contain no-repeat;border:1px solid #c9d8e6}"+
".mn-cfg__fi{flex:1;min-width:0;font-size:12px;line-height:1.35}"+
".mn-cfg__fnm{display:block;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
".mn-cfg__st{display:block}"+
".mn-cfg__st.is-ok{color:#1d6b3a;font-weight:600}"+
".mn-cfg__st.is-err{color:#a12a1a;font-weight:600}"+
".mn-cfg__bar{display:block;height:4px;border-radius:2px;background:#eaf2f8;margin-top:4px;overflow:hidden}"+
".mn-cfg__bar i{display:block;height:100%;width:0;background:#10233f;transition:width .2s}"+
".mn-cfg__lnk input{position:absolute;width:1px;height:1px;opacity:0;overflow:hidden;clip:rect(0 0 0 0)}"+
".mn-cfg__lnk{position:relative;appearance:none;display:inline-block;margin:2px 0 0;background:none;border:0;padding:0;font:inherit;font-size:12px;font-weight:700;color:#10233f;text-decoration:underline;cursor:pointer}"+
".mn-cfg__ctl{display:flex;align-items:center;justify-content:space-between;gap:10px}"+
".mn-cfg__ql{font-size:12px;font-weight:600}"+
".mn-cfg__q{display:inline-flex;align-items:center;border:1px solid #c9d8e6;border-radius:8px;overflow:hidden}"+
".mn-cfg__q button{appearance:none;width:40px;height:40px;border:0;background:#fff;color:#10233f;font-size:20px;line-height:1;cursor:pointer}"+
".mn-cfg__q input{width:44px;height:40px;margin:0;padding:0;border:0;border-left:1px solid #c9d8e6;border-right:1px solid #c9d8e6;border-radius:0;text-align:center;font:inherit;font-weight:700;color:#10233f;-moz-appearance:textfield;appearance:textfield}"+
".mn-cfg__q input::-webkit-inner-spin-button,.mn-cfg__q input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"+
".mn-cfg__x{appearance:none;display:inline-flex;align-items:center;gap:4px;background:none;border:0;padding:8px 0;font:inherit;font-size:12px;color:#a12a1a;cursor:pointer}"+
".mn-cfg__otro{appearance:none;margin-top:12px;padding:10px 16px;border:2px solid #10233f;border-radius:8px;background:#fff;color:#10233f;font:inherit;font-weight:700;font-size:13px;cursor:pointer;transition:opacity .2s}"+
".mn-cfg__otro:hover{background:#eaf2f8}"+
".mn-cfg__otro:disabled{opacity:.45;cursor:not-allowed}"+
".mn-cfg__val{border-radius:10px;overflow:hidden;border:1px solid #c9d8e6;margin:0 0 12px}"+
".mn-cfg__vh{margin:0;padding:10px 14px;background:#10233f;color:#fff;font-family:Montserrat,sans-serif;font-weight:700;font-size:14px}"+
".mn-cfg__vb{padding:12px 14px;display:flex;flex-direction:column;gap:12px;background:#fff}"+
".mn-cfg__nums{display:flex;gap:24px}"+
".mn-cfg__nums span{display:block;font-size:12px}"+
".mn-cfg__nums b{display:block;font-family:Montserrat,sans-serif;font-size:18px;font-weight:800}"+
".mn-cfg__acc{display:flex;flex-direction:column-reverse;gap:8px}"+
".mn-cfg__btn{appearance:none;min-height:46px;padding:10px 16px;border-radius:8px;font:inherit;font-weight:700;font-size:14px;cursor:pointer;transition:background-color .15s,opacity .15s}"+
".mn-cfg__btn--sec{border:2px solid #10233f;background:#fff;color:#10233f}"+
".mn-cfg__btn--sec:hover{background:#eaf2f8}"+
".mn-cfg__btn--pri{border:2px solid #10233f;background:#10233f;color:#fff;text-transform:uppercase;letter-spacing:.04em}"+
".mn-cfg__btn--pri:hover{background:#1c3a63}"+
".mn-cfg__btn:disabled{opacity:.6;cursor:wait}"+
".mn-cfg__msg{display:none;margin:0;padding:8px 12px;border-radius:8px;font-size:13px;font-weight:600}"+
".mn-cfg__msg.is-on{display:block}"+
".mn-cfg__msg.is-warn{background:#fff4e5;color:#7a3e00}"+
".mn-cfg__msg.is-ok{background:#e6f4ea;color:#1d6b3a}"+
"@media(min-width:768px){.mn-cfg__cm{font-size:15px}.mn-cfg__drow{flex-direction:row;align-items:stretch}.mn-cfg__drow>:first-child{flex:1;min-width:0}.mn-cfg__ctl{flex-direction:column;justify-content:center;align-items:flex-end}.mn-cfg__acc{flex-direction:row;justify-content:flex-end}}"+
".mn-cfg__ops--mat{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}"+
".mn-cfg__ops--tm{grid-template-columns:1fr 1fr}"+
".mn-cfg__ops--pack{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}"+
".mn-cfg__sw{width:52px;height:52px;flex:none;border-radius:50%;display:block;border:1px solid #c9d8e6;box-shadow:inset 0 -4px 10px rgba(16,35,63,.14)}"+
".mn-cfg__sw--holo{background:conic-gradient(from 200deg,#f9c6ec,#c4ecff,#d5ffd0,#fff2b8,#e3cbff,#f9c6ec)}"+
".mn-cfg__sw--oro{background:linear-gradient(135deg,#7a5810 0%,#d4a537 30%,#fff1bf 50%,#d4a537 70%,#8a6512 100%)}"+
".mn-cfg__sw--bla{background:#fff}"+
".mn-cfg__pk{font-family:Montserrat,sans-serif;font-weight:800;font-size:19px;line-height:1}"+
".mn-cfg__pks{font-size:11px;line-height:1}"+
".mn-cfg__pu{font-size:11px;color:#4a5568;white-space:nowrap}"+
".mn-cfg__op[aria-pressed=true] .mn-cfg__pu{color:#10233f}"+
".mn-cfg__dis .mn-cfg__ctl{justify-content:flex-end}"+
"";

var ICO_UP="<svg viewBox='0 0 24 24' aria-hidden='true' fill='none' stroke='#10233f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 16V4M7 9l5-5 5 5'/><path d='M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3'/></svg>";
var ACEPTA="image/jpeg,image/png,.jpg,.jpeg,.png";

var S=[],form,box,nativeRow,nativeBtn,nativeQty,pid,mat=null,tam=null,pack=null,V=[],TAMS=[],PACKS=[],D=[],uid=0,permitir=false,ocupado=false;

function precio(n){return "$"+Math.round(n).toLocaleString("es-AR");}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}

function leerVariantes(){
  var vs=(window.LS&&LS.variants)||[];
  vs.forEach(function(v){
    if(v.option0==null||v.option1==null||v.option2==null)return;
    var m=/^(\d+)\s*cm$/i.exec(String(v.option1).trim()),n=parseInt(v.option2,10);
    if(!m||isNaN(n))return;
    V.push({m:v.option0,t:m[1],tv:v.option1,n:n,nv:v.option2,p:v.price_number,id:v.id,ok:v.available!==false});
    if(TAMS.indexOf(m[1])<0)TAMS.push(m[1]);
    if(PACKS.indexOf(n)<0)PACKS.push(n);
  });
  TAMS.sort(function(a,b){return a-b;});PACKS.sort(function(a,b){return a-b;});
  return V.length>0;
}
function busca(m,t,n){for(var i=0;i<V.length;i++){var v=V[i];if((m==null||v.m===m)&&(t==null||v.t===t)&&(n==null||v.n===n)&&v.ok)return v;}return null;}
function minimo(m,t,n){var r=null;V.forEach(function(v){if((m==null||v.m===m)&&(t==null||v.t===t)&&(n==null||v.n===n)&&v.ok&&v.p!=null&&(r==null||v.p<r))r=v.p;});return r;}
function actual(){return (mat&&tam&&pack)?busca(mat,tam,pack):null;}

function boton(html,on){
  var b=document.createElement("button");
  b.type="button";b.className="mn-cfg__op";b.innerHTML=html;b.setAttribute("aria-pressed","false");
  b.addEventListener("click",on);return b;
}

/* ---------- logos ---------- */
function nuevo(){return {id:++uid,file:null,name:"",prev:"",status:"vacio",pct:0,url:"",xhr:null};}

function liberar(d){
  if(d.xhr){try{d.xhr.abort();}catch(e){}d.xhr=null;}
  if(d.prev){try{URL.revokeObjectURL(d.prev);}catch(e){}d.prev="";}
}

function esImagen(f){
  return /^image\/(jpeg|png)$/i.test(f.type||"")||/\.(jpe?g|png)$/i.test(f.name||"");
}

function achicar(file){
  return new Promise(function(ok,mal){
    if(file.size<=CFG.maxBytes){ok(file);return;}
    var u=URL.createObjectURL(file),im=new Image();
    im.onload=function(){
      var tipo=/png$/i.test(file.type||file.name)?"image/png":"image/jpeg",lados=[4000,3200,2600,2000,1600],k=0;
      (function prueba(){
        if(k>=lados.length){URL.revokeObjectURL(u);mal(new Error("grande"));return;}
        var L=lados[k++],r=Math.min(1,L/Math.max(im.naturalWidth,im.naturalHeight));
        var c=document.createElement("canvas");c.width=Math.round(im.naturalWidth*r);c.height=Math.round(im.naturalHeight*r);
        c.getContext("2d").drawImage(im,0,0,c.width,c.height);
        c.toBlob(function(b){
          c.width=c.height=0;
          if(b&&b.size<=CFG.maxBytes){URL.revokeObjectURL(u);ok(b);}else{prueba();}
        },tipo,0.9);
      })();
    };
    im.onerror=function(){URL.revokeObjectURL(u);mal(new Error("leer"));};
    im.src=u;
  });
}

function subir(d){
  d.status="prep";d.pct=0;pintar();
  achicar(d.file).then(function(blob){
    if(D.indexOf(d)<0||d.status!=="prep")return;
    d.status="sube";pintar();
    var fd=new FormData();
    fd.append("file",blob,d.name||"logo");
    fd.append("upload_preset",CFG.preset);
    var x=new XMLHttpRequest();d.xhr=x;
    x.open("POST","https://api.cloudinary.com/v1_1/"+CFG.cloud+"/image/upload");
    x.upload.onprogress=function(e){
      if(!e.lengthComputable)return;
      d.pct=Math.min(99,Math.round(e.loaded/e.total*100));
      var row=box.querySelector("[data-d='"+d.id+"']");
      if(row){var bi=row.querySelector(".mn-cfg__bar i"),st=row.querySelector(".mn-cfg__st");if(bi)bi.style.width=d.pct+"%";if(st)st.textContent=TXT.subiendo+d.pct+"%";}
    };
    x.onload=function(){
      if(d.xhr!==x)return;
      d.xhr=null;var j=null;try{j=JSON.parse(x.responseText);}catch(e){}
      if(x.status>=200&&x.status<300&&j&&j.secure_url){d.url=j.secure_url;d.status="ok";}
      else{d.status="err";}
      pintar();
    };
    x.onerror=function(){if(d.xhr!==x)return;d.xhr=null;d.status="err";pintar();};
    x.send(fd);
  },function(){if(D.indexOf(d)<0)return;d.status="err";pintar();});
}

function cargar(files,d){
  var lista=[].slice.call(files||[]);if(!lista.length)return;
  var avisoMax=false;
  lista.forEach(function(f,i){
    var t=null;
    if(i===0&&d){t=d;}
    else{
      for(var k=0;k<D.length;k++){if(D[k].status==="vacio"||D[k].status==="tipo"){t=D[k];break;}}
      if(!t){if(D.length<CFG.maxDis){t=nuevo();D.push(t);}else{avisoMax=true;return;}}
    }
    liberar(t);
    t.file=f;t.name=f.name||"";t.url="";
    if(!esImagen(f)){t.status="tipo";t.file=null;return;}
    try{t.prev=URL.createObjectURL(f);}catch(e){t.prev="";}
    subir(t);
  });
  pintar();
  if(avisoMax)mensaje(TXT.maximo,"warn");
}

function filaHTML(d,n){
  var h="<div class='mn-cfg__dis' data-d='"+d.id+"'><p class='mn-cfg__dn'>"+TXT.disN+n+"</p><div class='mn-cfg__drow'>";
  if(d.status==="vacio"||d.status==="tipo"){
    h+="<label class='mn-cfg__drop'><input type='file' accept='"+ACEPTA+"' multiple>"+ICO_UP+
       "<span>"+TXT.soltar+"<u>"+TXT.elegir+"</u></span><small>"+TXT.formatos+"</small>"+
       (d.status==="tipo"?"<span class='mn-cfg__st is-err'>"+TXT.errTipo+"</span>":"")+"</label>";
  }else{
    var st="",cl="";
    if(d.status==="prep")st=TXT.preparando;
    else if(d.status==="sube")st=TXT.subiendo+d.pct+"%";
    else if(d.status==="ok"){st="✓ "+TXT.subido;cl=" is-ok";}
    else if(d.status==="err"){st=TXT.errSubida;cl=" is-err";}
    h+="<div class='mn-cfg__file'><span class='mn-cfg__th'"+(d.prev?" style=\"background-image:url('"+d.prev+"')\"":"")+"></span>"+
       "<span class='mn-cfg__fi'><span class='mn-cfg__fnm'>"+esc(d.name)+"</span><span class='mn-cfg__st"+cl+"' aria-live='polite'>"+st+"</span>"+
       (d.status==="prep"||d.status==="sube"?"<span class='mn-cfg__bar'><i style='width:"+d.pct+"%'></i></span>":"")+
       (d.status==="err"?"<button type='button' class='mn-cfg__lnk' data-a='retry'>"+TXT.reintentar+"</button>":"")+
       (d.status==="ok"?"<label class='mn-cfg__lnk'>"+TXT.cambiar+"<input type='file' accept='"+ACEPTA+"'></label>":"")+
       "</span></div>";
  }
  if(D.length>1||d.status!=="vacio")h+="<div class='mn-cfg__ctl'><button type='button' class='mn-cfg__x' data-a='quitar'>✕ "+TXT.quitar+"</button></div>";
  h+="</div></div>";
  return h;
}

function pintar(){
  var lst=box.querySelector(".mn-cfg__dlist");
  lst.innerHTML=D.map(function(d,i){return filaHTML(d,i+1);}).join("");
  var hayVacio=D.some(function(d){return d.status==="vacio"||d.status==="tipo";});
  box.querySelector(".mn-cfg__otro").disabled=D.length>=CFG.maxDis||hayVacio;
  totales();
}

function totales(){
  var u=0;D.forEach(function(d){if(d.status!=="vacio"&&d.status!=="tipo")u++;});
  var v=actual();
  box.querySelector("[data-v='l']").textContent=String(u);
  box.querySelector("[data-v='u']").textContent=(v?(u*v.n).toLocaleString("es-AR"):"0");
  box.querySelector("[data-v='s']").textContent=precio(v&&v.p!=null?u*v.p:0);
}

function mensaje(t,tipo){
  var m=box.querySelector(".mn-cfg__msg");
  if(!t){m.className="mn-cfg__msg";m.textContent="";return;}
  m.className="mn-cfg__msg is-on is-"+(tipo||"warn");m.textContent=t;
}

function filaDe(el){var r=el&&el.closest&&el.closest("[data-d]");if(!r)return null;var id=+r.getAttribute("data-d");for(var i=0;i<D.length;i++)if(D[i].id===id)return D[i];return null;}

function eventosDis(){
  var lst=box.querySelector(".mn-cfg__dlist");
  lst.addEventListener("change",function(e){
    var d=filaDe(e.target);if(!d)return;
    if(e.target.type==="file"){mensaje("");cargar(e.target.files,d);}
  });
  lst.addEventListener("click",function(e){
    var b=e.target.closest("[data-a]");if(!b)return;var d=filaDe(b);if(!d)return;
    var a=b.getAttribute("data-a");
    if(a==="quitar"){liberar(d);if(D.length>1)D.splice(D.indexOf(d),1);else D[0]=nuevo();pintar();}
    else if(a==="retry"){if(d.file){try{d.prev=d.prev||URL.createObjectURL(d.file);}catch(x){}subir(d);}}
  });
  ["dragenter","dragover"].forEach(function(ev){lst.addEventListener(ev,function(e){var z=e.target.closest&&e.target.closest(".mn-cfg__drop");if(!z)return;e.preventDefault();z.classList.add("is-over");});});
  ["dragleave","drop"].forEach(function(ev){lst.addEventListener(ev,function(e){var z=e.target.closest&&e.target.closest(".mn-cfg__drop");if(!z)return;e.preventDefault();z.classList.remove("is-over");if(ev==="drop"&&e.dataTransfer){mensaje("");cargar(e.dataTransfer.files,filaDe(z));}});});
  box.querySelector(".mn-cfg__otro").addEventListener("click",function(){if(D.length<CFG.maxDis){D.push(nuevo());pintar();}});
  box.querySelector("[data-b='reiniciar']").addEventListener("click",reiniciar);
  box.querySelector("[data-b='agregar']").addEventListener("click",agregar);
}

function reiniciar(){
  if(ocupado)return;
  D.forEach(liberar);D=[nuevo()];mat=null;tam=null;pack=null;mensaje("");actualizar();pintar();
  box.scrollIntoView({behavior:"smooth",block:"start"});
}

/* ---------- variante del tema ---------- */
function elegirEnTema(v){
  var vals=[v.m,v.tv,v.nv],cambio=false;
  for(var i=0;i<3;i++){if(S[i].value!==vals[i]){S[i].value=vals[i];cambio=true;}}
  if(!cambio)return;
  for(var k=0;k<3;k++){S[k].dispatchEvent(new Event("change",{bubbles:true}));if(window.jQuery)jQuery(S[k]).trigger("change");}
}

/* ---------- carrito ---------- */
function postCarrito(vid,url){
  var fd=new FormData();
  fd.append("add_to_cart",pid);fd.append("variant_id",vid);fd.append("quantity",1);fd.append("properties["+CFG.prop+"]",url);
  return fetch("/comprar/",{method:"POST",body:fd,credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest"}})
    .then(function(r){return r.json();}).then(function(j){if(!j||!j.success)throw new Error("carrito");return j;});
}

function agregarNativo(d){
  var h=form.querySelector("#mn-cfg-prop");
  if(!h){h=document.createElement("input");h.type="hidden";h.id="mn-cfg-prop";form.appendChild(h);}
  h.name="properties["+CFG.prop+"]";h.value=d.url;
  nativeQty.value=1;
  permitir=true;
  try{nativeBtn.click();}finally{permitir=false;}
  setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h);},4000);
}

function agregar(){
  if(ocupado)return;
  var v=actual();
  if(!v){mensaje(TXT.falta);box.scrollIntoView({behavior:"smooth",block:"start"});return;}
  if(D.some(function(d){return d.status==="prep"||d.status==="sube";})){mensaje(TXT.esperar);return;}
  var ok=D.filter(function(d){return d.status==="ok"&&d.url;});
  if(!ok.length){mensaje(TXT.faltaDis);return;}
  elegirEnTema(v);
  ocupado=true;var btn=box.querySelector("[data-b='agregar']");btn.disabled=true;btn.textContent=TXT.agregando;mensaje("");
  var resto=ok.slice(0,-1),ultimo=ok[ok.length-1],cadena=Promise.resolve();
  resto.forEach(function(d){cadena=cadena.then(function(){return postCarrito(v.id,d.url).then(function(){d.enCarrito=true;});});});
  cadena.then(function(){
    agregarNativo(ultimo);ultimo.enCarrito=true;
    mensaje(TXT.agregado,"ok");
  }).catch(function(){
    mensaje(TXT.errCarrito);
  }).then(function(){
    D.forEach(function(d){if(d.enCarrito)liberar(d);});
    D=D.filter(function(d){return !d.enCarrito;});if(!D.length)D=[nuevo()];
    pintar();
    ocupado=false;btn.disabled=false;btn.textContent=TXT.agregar;
  });
}

/* ---------- armado ---------- */
function paso(n,tit,bloq,nota,cuerpo){
  return "<div class='mn-cfg__paso"+(n>1?" is-off":"")+"' data-p='"+n+"'><div class='mn-cfg__cab'><p class='mn-cfg__tit'>"+tit+"</p>"+
    (bloq?"<span class='mn-cfg__bloq'>"+bloq+"</span>":"")+"</div><p class='mn-cfg__nota'>"+nota+"</p>"+cuerpo+"</div>";
}

function armar(){
  box=document.createElement("div");
  box.className="mn-cfg";box.id="mn-cfg";
  box.innerHTML=
    paso(1,TXT.matTit,"",TXT.matNota,"<div class='mn-cfg__ops mn-cfg__ops--mat' role='group' aria-label='"+TXT.matTit+"'></div>")+
    paso(2,TXT.tamTit,TXT.bloqueado,TXT.tamNota,"<div class='mn-cfg__ops mn-cfg__ops--tm' role='group' aria-label='"+TXT.tamTit+"'></div>")+
    paso(3,TXT.packTit,TXT.bloqueadoP,TXT.packNota,"<div class='mn-cfg__ops mn-cfg__ops--pack' role='group' aria-label='"+TXT.packTit+"'></div>")+
    paso(4,TXT.disTit,TXT.bloqueado3,TXT.disNota,"<div class='mn-cfg__dlist'></div><button type='button' class='mn-cfg__otro'>"+TXT.otro+"</button>")+
    "<div class='mn-cfg__val'><p class='mn-cfg__vh'>"+TXT.valor+"</p><div class='mn-cfg__vb'>"+
    "<div class='mn-cfg__nums'><div><span>"+TXT.logos+"</span><b data-v='l'>0</b></div><div><span>"+TXT.total+"</span><b data-v='u'>0</b></div><div><span>"+TXT.subtotal+"</span><b data-v='s'>$0</b></div></div>"+
    "<p class='mn-cfg__msg' role='status'></p>"+
    "<div class='mn-cfg__acc'><button type='button' class='mn-cfg__btn mn-cfg__btn--sec' data-b='reiniciar'>"+TXT.reiniciar+"</button>"+
    "<button type='button' class='mn-cfg__btn mn-cfg__btn--pri' data-b='agregar'>"+TXT.agregar+"</button></div>"+
    "</div></div>";
  var gm=box.querySelector(".mn-cfg__ops--mat"),gt=box.querySelector(".mn-cfg__ops--tm"),gp=box.querySelector(".mn-cfg__ops--pack");
  MATS.forEach(function(o){
    if(!busca(o[0],null,null))return;
    var b=boton("<span class='mn-cfg__sw mn-cfg__sw--"+o[1]+"'></span><span class='mn-cfg__fn'>"+TXT[o[1]]+"</span><span class='mn-cfg__fd'>"+TXT[o[1]+"Desc"]+"</span>",function(){mat=(mat===o[0])?null:o[0];actualizar();});
    b.setAttribute("data-m",o[0]);gm.appendChild(b);
  });
  TAMS.forEach(function(t){
    var b=boton("<span class='mn-cfg__vis'>"+img("tam-"+t,240,240)+"</span><span class='mn-cfg__cm'>"+t+" cm</span><span class='mn-cfg__pr'></span>",function(){if(!mat)return;tam=(tam===t)?null:t;actualizar();});
    b.setAttribute("data-t",t);b.disabled=true;gt.appendChild(b);
  });
  PACKS.forEach(function(n){
    var b=boton("<span class='mn-cfg__pk'>"+n.toLocaleString("es-AR")+"</span><span class='mn-cfg__pks'>"+TXT.stickers+"</span><span class='mn-cfg__pr'></span><span class='mn-cfg__pu'></span>",function(){if(!(mat&&tam))return;pack=(pack===n)?null:n;actualizar();});
    b.setAttribute("data-n",String(n));b.disabled=true;gp.appendChild(b);
  });
  D=[nuevo()];
  eventosDis();
}

function bloq(p,on){p.classList.toggle("is-off",!on);var b=p.querySelector(".mn-cfg__bloq");if(b)b.style.display=on?"none":"";}

function actualizar(){
  var p2=box.querySelector("[data-p='2']"),p3=box.querySelector("[data-p='3']"),p4=box.querySelector("[data-p='4']");
  box.querySelectorAll("[data-m]").forEach(function(b){
    var m=b.getAttribute("data-m"),mn=minimo(m,null,null);
    b.setAttribute("aria-pressed",m===mat?"true":"false");
    b.setAttribute("aria-label",TXT[MATS.filter(function(o){return o[0]===m;})[0][1]]+(mn!=null?", desde "+precio(mn):""));
  });
  bloq(p2,!!mat);
  box.querySelectorAll("[data-t]").forEach(function(b){
    var t=b.getAttribute("data-t"),mn=mat?minimo(mat,t,null):minimo(null,t,null);
    b.disabled=!mat||mn==null;b.setAttribute("aria-pressed",t===tam?"true":"false");
    b.querySelector(".mn-cfg__pr").innerHTML=mn!=null?"desde<br>"+precio(mn):"";
    b.setAttribute("aria-label",t+" centímetros"+(mn!=null?", desde "+precio(mn):""));
  });
  var mt=!!(mat&&tam);
  bloq(p3,mt);
  box.querySelectorAll("[data-n]").forEach(function(b){
    var n=+b.getAttribute("data-n"),v=mt?busca(mat,tam,n):null;
    b.disabled=!v;b.setAttribute("aria-pressed",n===pack?"true":"false");
    b.querySelector(".mn-cfg__pr").textContent=v&&v.p!=null?precio(v.p):"";
    b.querySelector(".mn-cfg__pu").textContent=v&&v.p!=null?precio(v.p/n)+" "+TXT.cu:"";
    b.setAttribute("aria-label",n+" "+TXT.stickers+(v&&v.p!=null?", "+precio(v.p):""));
  });
  var v=actual();
  bloq(p4,!!v);
  if(v)elegirEnTema(v);
  totales();
}

function frenar(e){
  if(permitir)return;
  e.preventDefault();e.stopImmediatePropagation();
  mensaje(actual()?TXT.faltaDis:TXT.falta);
  box.querySelector(".mn-cfg__val").scrollIntoView({behavior:"smooth",block:"center"});
}

function init(){
  if(document.getElementById("mn-cfg"))return;
  form=document.getElementById("product_form");
  if(!form)return;
  S=[form.querySelector("#variation_1"),form.querySelector("#variation_2"),form.querySelector("#variation_3")];
  var grupo=form.querySelector(".js-product-variants");
  nativeBtn=form.querySelector(".js-addtocart");
  nativeQty=form.querySelector("input[name=quantity]");
  var pinp=form.querySelector("input[name=add_to_cart]");
  if(!S[0]||!S[1]||!S[2]||!grupo||!nativeBtn||!nativeQty||!pinp||!leerVariantes())return;
  pid=pinp.value;
  nativeRow=nativeBtn;while(nativeRow.parentElement&&nativeRow.parentElement!==form)nativeRow=nativeRow.parentElement;
  if(!document.getElementById("mn-lg-css")){var s=document.createElement("style");s.id="mn-lg-css";s.textContent=CSS;document.head.appendChild(s);}
  armar();
  grupo.parentNode.insertBefore(box,grupo);
  grupo.classList.add("mn-cfg-hide");
  if(nativeRow.parentElement===form)nativeRow.classList.add("mn-cfg-hide");
  pintar();actualizar();
  document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest(".js-addtocart");if(b&&form.contains(b))frenar(e);},true);
  form.addEventListener("submit",frenar,true);
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
// FIN custom
