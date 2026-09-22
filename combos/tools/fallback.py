import cv2, numpy as np, json, math, sys

UP='/mnt/user-data/uploads'; A=f'{UP}/artboars'; M=f'{UP}/Combo Malvinas'; T=f'{UP}/combo mate'

def load(p):
    im=cv2.imread(p,cv2.IMREAD_UNCHANGED)
    return cv2.cvtColor(im,cv2.COLOR_BGR2BGRA) if im.shape[2]==3 else im
def flat(im,bg=255):
    a=im[:,:,3:4].astype(np.float32)/255.
    return (im[:,:,:3].astype(np.float32)*a+bg*(1-a)).astype(np.uint8)

def rs(t,scale,deg):
    h,w=t.shape[:2]; nw,nh=max(8,int(w*scale)),max(8,int(h*scale))
    r=cv2.resize(t,(nw,nh),interpolation=cv2.INTER_AREA)
    if abs(deg)<.01: return r
    d=int(math.hypot(nw,nh))+2; pad=np.zeros((d,d,4),np.uint8)
    oy,ox=(d-nh)//2,(d-nw)//2; pad[oy:oy+nh,ox:ox+nw]=r
    Mx=cv2.getRotationMatrix2D((d/2,d/2),deg,1.)
    r=cv2.warpAffine(pad,Mx,(d,d),borderValue=(0,0,0,0))
    ys,xs=np.where(r[:,:,3]>8)
    return r[ys.min():ys.max()+1,xs.min():xs.max()+1]

def err(board,t):
    th,tw=t.shape[:2]; bh,bw=board.shape[:2]
    if th>=bh or tw>=bw: return 1e18,0,0
    a=t[:,:,3]; m=cv2.merge([a,a,a]).astype(np.float32)/255.
    n=float(m.sum())
    if n<200: return 1e18,0,0
    r=cv2.matchTemplate(board.astype(np.float32),t[:,:,:3].astype(np.float32),cv2.TM_SQDIFF,mask=m)
    mn,_,loc,_=cv2.minMaxLoc(r)
    return mn/n,loc[0],loc[1]

def find(board_rgb,BW,tpath,smin,smax,fw=560):
    t0=load(tpath); bh,bw=board_rgb.shape[:2]
    bf=cv2.resize(board_rgb,(fw,int(bh*fw/bw)),interpolation=cv2.INTER_AREA); k=fw/bw
    best=None
    for s in np.arange(smin,smax+1e-6,0.035):
        for d in range(-30,31,5):
            t=rs(t0,s*k,d); e,x,y=err(bf,t)
            if best is None or e<best[0]:
                best=(e,x/k,y/k,s,d,t.shape[1]/k,t.shape[0]/k)
    e,x,y,s,d,w,h=best
    return dict(scale=round(float(s),4),rot=round(float(d),1),
                cx=round(x+w/2,1),cy=round(y+h/2,1),w=round(w,1),h=round(h,1),
                err=round(e,1),inliers=-1,matches=-1)

JOBS={
 '01':('Sin título-3-01.png',[('BP25',f'{M}/BASE PLACAS-25.png')],0.45,1.15),
 '02':('Sin título-3-02.png',[('BP25',f'{M}/BASE PLACAS-25.png'),('BP29',f'{M}/BASE PLACAS-29.png')],0.35,1.0),
 '03':('Sin título-3-03.png',[('BP25',f'{M}/BASE PLACAS-25.png'),('BP29',f'{M}/BASE PLACAS-29.png'),
       ('CM21',f'{M}/combo max-21.png'),('CM24',f'{M}/combo max-24.png'),('CM26',f'{M}/combo max-26.png'),
       ('BP27',f'{M}/BASE PLACAS-27.png'),('CM20',f'{M}/combo max-20.png'),('CM23',f'{M}/combo max-23.png'),
       ('CM28',f'{M}/combo max-28.png'),('BP26',f'{M}/BASE PLACAS-26.png')],0.25,0.75),
}
w=sys.argv[1]; bf,tp,smin,smax=JOBS[w]
board=load(f'{A}/{bf}'); BW=board.shape[1]; BH=board.shape[0]
brgb=flat(board)
out=json.load(open(f'/tmp/pos_{w}.json'))
for name,p in tp:
    r=find(brgb,BW,p,smin,smax)
    r['xpct']=round(r['cx']/BW*100,2); r['ypct']=round(r['cy']/BH*100,2); r['wpct']=round(r['w']/BW*100,2)
    out['items'][name]=r
    print(f"{name:6s} s={r['scale']:.3f} rot={r['rot']:+5.1f} x={r['xpct']:5.1f}% y={r['ypct']:5.1f}% w={r['wpct']:5.1f}% err={r['err']}",flush=True)
json.dump(out,open(f'/tmp/pos_{w}.json','w'),indent=1)
