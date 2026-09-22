import cv2, numpy as np, json, math, sys
from PIL import Image

UP='/mnt/user-data/uploads'; A=f'{UP}/artboars'; M=f'{UP}/Combo Malvinas'; T=f'{UP}/combo mate'
PATH={**{f'BP{i}':f'{M}/BASE PLACAS-{i}.png' for i in range(18,30)},
      **{f'CM{i}':f'{M}/combo max-{i}.png' for i in range(20,29)},
      **{f'MT{i}':f'{T}/BASE PLACAS-{i}.png' for i in range(20,28)}}
BOARD={'01':'Sin título-3-01.png','02':'Sin título-3-02.png','03':'Sin título-3-03.png','04':'Sin título-3-04.png'}

def load(p):
    im=cv2.imread(p,cv2.IMREAD_UNCHANGED)
    return cv2.cvtColor(im,cv2.COLOR_BGR2BGRA) if im.shape[2]==3 else im
def rs(t,scale,deg):
    h,w=t.shape[:2]; nw,nh=max(8,int(round(w*scale))),max(8,int(round(h*scale)))
    r=cv2.resize(t,(nw,nh),interpolation=cv2.INTER_AREA)
    if abs(deg)<.01: return r
    d=int(math.hypot(nw,nh))+2; pad=np.zeros((d,d,4),np.uint8)
    oy,ox=(d-nh)//2,(d-nw)//2; pad[oy:oy+nh,ox:ox+nw]=r
    Mx=cv2.getRotationMatrix2D((d/2,d/2),deg,1.)
    r=cv2.warpAffine(pad,Mx,(d,d),borderValue=(0,0,0,0))
    ys,xs=np.where(r[:,:,3]>8); return r[ys.min():ys.max()+1,xs.min():xs.max()+1]
def paste(canvas,t,cx,cy):
    th,tw=t.shape[:2]; H,W=canvas.shape[:2]
    x0,y0=int(round(cx-tw/2)),int(round(cy-th/2))
    xa,ya=max(0,x0),max(0,y0); xb,yb=min(W,x0+tw),min(H,y0+th)
    if xa>=xb or ya>=yb: return
    sub=t[ya-y0:yb-y0, xa-x0:xb-x0]
    a=sub[:,:,3:4].astype(np.float32)/255.
    roi=canvas[ya:yb,xa:xb]
    roi[:,:,:3]=(sub[:,:,:3]*a+roi[:,:,:3]*(1-a)).astype(np.uint8)
    roi[:,:,3]=np.maximum(roi[:,:,3],sub[:,:,3])

def visibility(board_rgb, name, it):
    """fraction of the sticker's pixels that actually match the artboard"""
    t=rs(load(PATH[name]), it['scale'], it['rot'])
    th,tw=t.shape[:2]; H,W=board_rgb.shape[:2]
    x0,y0=int(round(it['cx']-tw/2)),int(round(it['cy']-th/2))
    xa,ya=max(0,x0),max(0,y0); xb,yb=min(W,x0+tw),min(H,y0+th)
    if xa>=xb or ya>=yb: return 0.0
    sub=t[ya-y0:yb-y0, xa-x0:xb-x0]
    m=sub[:,:,3]>128
    if m.sum()<50: return 0.0
    d=np.abs(sub[:,:,:3].astype(np.int16)-board_rgb[ya:yb,xa:xb].astype(np.int16)).sum(2)
    return float(((d<60)&m).sum())/float(m.sum())

def go(key):
    d=json.load(open(f'/tmp/pos_{key}.json')); items=d['items']; W,H=d['board']
    bd=load(f'{A}/{BOARD[key]}')
    a=bd[:,:,3:4].astype(np.float32)/255.
    brgb=(bd[:,:,:3]*a+255*(1-a)).astype(np.uint8)
    vis={n:visibility(brgb,n,it) for n,it in items.items()}
    order=sorted(items, key=lambda n: vis[n])           # menos visible = más abajo
    canvas=np.zeros((H,W,4),np.uint8)
    for n in order:
        it=items[n]
        paste(canvas,rs(load(PATH[n]),it['scale'],it['rot']),it['cx'],it['cy'])
    ca=canvas[:,:,3:4].astype(np.float32)/255.
    out=(canvas[:,:,:3]*ca+255*(1-ca)).astype(np.uint8)
    cmp=np.concatenate([brgb,out],axis=1)
    im=Image.fromarray(cv2.cvtColor(cmp,cv2.COLOR_BGR2RGB)); im.thumbnail((1200,900))
    im.save(f'/tmp/cmp_{key}.png')
    for n in order: print(f'  {n:6s} vis={vis[n]:.2f}')
    json.dump({'board':[W,H],'order':order,'items':items,'vis':{k:round(v,3) for k,v in vis.items()}},
              open(f'/tmp/pos_{key}.json','w'),indent=1)
    print(f'-> /tmp/cmp_{key}.png')

for k in sys.argv[1:]: print('==',k); go(k)
