from PIL import Image
import json, math
U='/mnt/user-data/uploads/'
IMG='/home/claude/comancalcos/combos/img/'
SRC={'s01':'5116132c','s02':'b53c823b','s03':'b37904fa','s04':'7e18d7c1','s05':'c4c9a727','s06':'c2174b36',
     's07':'a1e4f85b','s08':'cb0f3d23','s09':'67379519','s10':'3c66c2d7','s11':'1fd2a034'}
# slot: (sticker, x, y, w, r)  -- % de la caja del cluster (ancho / alto), orden = apilado
SLOTS=[
 ('s07',50,90,22,-3),
 ('s05',16,83,19,-8),
 ('s11',84,83,23,8),
 ('s02',18,65,26,-6),
 ('s04',82,65,28,7),
 ('s08',20,46,23,5),
 ('s06',82,46,21,-6),
 ('s10',17,28,19,-6),
 ('s03',80,28,22,7),
 ('s01',22,11,18,-5),
 ('s09',79,11,19,6),
]
CL_AR=.76  # ancho/alto del cluster
def export():
    for k,f in SRC.items():
        im=Image.open(U+f+'-image.png').convert('RGBA'); im=im.crop(im.getbbox())
        s=300/max(im.size); im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
        im.save(IMG+k+'.webp','WEBP',quality=82,method=6)
    t=Image.open('/home/claude/boca/termo_combo_boca_sudamericana.png')
    t=t.resize((270,round(t.height*270/t.width)),Image.LANCZOS)
    c=Image.new('RGBA',(270,825),(0,0,0,0)); c.alpha_composite(t,(0,(825-t.height)//2))
    c.save(IMG+'b06.webp','WEBP',quality=85,method=6)
def layout():
    out=[]
    for s,x,y,w,r in SLOTS:
        im=Image.open(IMG+s+'.webp')
        hh=w*im.height/im.width*CL_AR   # alto en % del alto del cluster
        out.append({"s":s,"x":x,"y":y,"w":w,"hh":round(hh,2),"r":r,
                    "cx":round((50-x)/w*100,1),"cy":round((50-y)/hh*100,1)})
    return out
if __name__=='__main__':
    import sys
    if 'export' in sys.argv: export()
    json.dump(layout(),open('/home/claude/work/L06.json','w'))
    print(json.dumps(layout()))
