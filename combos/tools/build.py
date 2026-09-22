import json, math, os, cv2, numpy as np
from PIL import Image

UP='/mnt/user-data/uploads'; M=f'{UP}/Combo Malvinas'; T=f'{UP}/combo mate'
OUT='/tmp/claude-0/-home-claude/6c41f837-c0df-5d50-bf52-ab551653eeb2/scratchpad/combos/repo'
PATH={**{f'BP{i}':f'{M}/BASE PLACAS-{i}.png' for i in range(18,30)},
      **{f'CM{i}':f'{M}/combo max-{i}.png' for i in range(20,29)},
      **{f'MT{i}':f'{T}/BASE PLACAS-{i}.png' for i in range(20,28)}}
SLUG={**{f'BP{i}':f'm{i}' for i in range(18,30)},
      **{f'CM{i}':f'x{i}' for i in range(20,29)},
      **{f'MT{i}':f't{i}' for i in range(20,28)}}

CLUSTER_PX = 720          # ancho de render del racimo a 2x
combos = {}
need = {}                 # slug -> px necesarios (maximo entre combos)

for key in ['01','02','03','04']:
    d=json.load(open(f'/tmp/pos_{key}.json'))
    BW,BH=d['board']; items=d['items']; order=d['order']
    xs0=min(it['cx']-it['w']/2 for it in items.values())
    xs1=max(it['cx']+it['w']/2 for it in items.values())
    ys0=min(it['cy']-it['h']/2 for it in items.values())
    ys1=max(it['cy']+it['h']/2 for it in items.values())
    CW, CH = xs1-xs0, ys1-ys0
    cx0, cy0 = (xs0+xs1)/2, (ys0+ys1)/2
    S = max(CW, CH)                      # caja cuadrada que contiene al racimo
    xs0, ys0 = cx0-S/2, cy0-S/2
    CW = CH = S
    st=[]
    for n in order:                      # order = de abajo hacia arriba
        it=items[n]
        px=(it['cx']-xs0)/CW; py=(it['cy']-ys0)/CH
        pw=it['w']/CW
        # vector de dispersion desde el centro del racimo
        vx, vy = it['cx']-cx0, it['cy']-cy0
        L=math.hypot(vx,vy) or 1.0
        ph=it['h']/CH
        st.append(dict(s=SLUG[n], x=round(px*100,2), y=round(py*100,2),
                       w=round(pw*100,2), hh=round(ph*100,2), r=round(it['rot'],1),
                       cx=round((50-px*100)/(pw*100)*100,1),
                       cy=round((50-py*100)/(ph*100)*100,1)))
        w_px = math.ceil(pw*CLUSTER_PX/10)*10
        need[SLUG[n]] = max(need.get(SLUG[n],0), w_px)
    combos[key]=dict(ratio=round(CW/CH,4), st=st)

os.makedirs(f'{OUT}/img', exist_ok=True)
total=0; rows=[]
for name,p in PATH.items():
    sl=SLUG[name]
    if sl not in need: continue
    im=Image.open(p).convert('RGBA')
    w=min(need[sl], im.size[0])
    h=round(im.size[1]*w/im.size[0])
    im=im.resize((w,h), Image.LANCZOS)
    f=f'{OUT}/img/{sl}.webp'
    im.save(f, 'WEBP', quality=82, method=6)
    b=os.path.getsize(f); total+=b
    rows.append((sl,w,h,b))
rows.sort(key=lambda r:-r[3])
for sl,w,h,b in rows: print(f'  {sl:5s} {w:4d}x{h:4d}  {b/1024:6.1f} KB')
print(f'TOTAL {len(rows)} stickers = {total/1024:.0f} KB')
json.dump(combos, open(f'{OUT}/layout.json','w'), indent=1)
for k,v in combos.items():
    print(k, 'ratio', v['ratio'], 'n', len(v['st']))

# --- botellas ---
BOT={'04':'combo mates y ruta.png','01':'combo malvinas.png','02':'mega combo malvinas.png','03':'combo MALVINAS MAX 2.png'}
import numpy as np
bt=0
for k,f in BOT.items():
    im=Image.open(f'{UP}/artboars/{f}').convert('RGBA')
    a=np.array(im)[:,:,3]; ys,xs=np.where(a>8)
    im=im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
    w=270; h=round(im.size[1]*w/im.size[0])
    im=im.resize((w,h), Image.LANCZOS)
    fp=f'{OUT}/img/b{k}.webp'
    im.save(fp,'WEBP',quality=80,method=6)
    sz=os.path.getsize(fp); bt+=sz
    print(f'  botella b{k}  {w}x{h}  {sz/1024:.1f} KB')
print(f'BOTELLAS {bt/1024:.0f} KB  |  TOTAL IMG {(total+bt)/1024:.0f} KB')
