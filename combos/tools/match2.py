import cv2, numpy as np, json, math, sys

UP = '/mnt/user-data/uploads'
A  = f'{UP}/artboars'
M  = f'{UP}/Combo Malvinas'
T  = f'{UP}/combo mate'

sift = cv2.SIFT_create(nfeatures=6000, contrastThreshold=0.02)

def load(p):
    im = cv2.imread(p, cv2.IMREAD_UNCHANGED)
    if im.shape[2] == 3:
        im = cv2.cvtColor(im, cv2.COLOR_BGR2BGRA)
    return im

def flat(im, bg=255):
    a = im[:,:,3:4].astype(np.float32)/255.0
    return (im[:,:,:3].astype(np.float32)*a + bg*(1-a)).astype(np.uint8)

def locate(board_gray, bkp, bdes, tpl_path):
    t = load(tpl_path)
    th, tw = t.shape[:2]
    tg = cv2.cvtColor(flat(t), cv2.COLOR_BGR2GRAY)
    mask = (t[:,:,3] > 40).astype(np.uint8)*255
    mask = cv2.erode(mask, np.ones((5,5), np.uint8))
    kp, des = sift.detectAndCompute(tg, mask)
    if des is None or len(kp) < 6:
        return None
    bf = cv2.BFMatcher()
    raw = bf.knnMatch(des, bdes, k=2)
    good = [m for m, n in raw if m.distance < 0.78*n.distance]
    if len(good) < 6:
        return None
    src = np.float32([kp[m.queryIdx].pt for m in good]).reshape(-1,1,2)
    dst = np.float32([bkp[m.trainIdx].pt for m in good]).reshape(-1,1,2)
    Mx, inl = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC,
                                          ransacReprojThreshold=4.0, maxIters=8000)
    if Mx is None:
        return None
    ninl = int(inl.sum())
    a, b = Mx[0,0], Mx[1,0]
    s = math.hypot(a, b)
    rot = math.degrees(math.atan2(b, a))
    # project the template's corners
    cor = np.float32([[0,0],[tw,0],[tw,th],[0,th]]).reshape(-1,1,2)
    pc = cv2.transform(cor, Mx).reshape(-1,2)
    cx, cy = pc[:,0].mean(), pc[:,1].mean()
    return dict(scale=s, rot=rot, cx=float(cx), cy=float(cy),
                w=tw*s, h=th*s, inliers=ninl, matches=len(good))

def run(board_file, tpls, out):
    board = load(f'{A}/{board_file}')
    BH, BW = board.shape[:2]
    bg = cv2.cvtColor(flat(board), cv2.COLOR_BGR2GRAY)
    bkp, bdes = sift.detectAndCompute(bg, None)
    print(f'board {BW}x{BH} kp={len(bkp)}', flush=True)
    res = {}
    for name, p in tpls:
        r = locate(bg, bkp, bdes, p)
        if r is None:
            print(f'{name:6s} FALLO'); continue
        r['xpct'] = round(r['cx']/BW*100, 2)
        r['ypct'] = round(r['cy']/BH*100, 2)
        r['wpct'] = round(r['w']/BW*100, 2)
        res[name] = {k: (round(v,2) if isinstance(v,float) else v) for k,v in r.items()}
        print(f"{name:6s} inl={r['inliers']:3d}/{r['matches']:3d} s={r['scale']:.3f} "
              f"rot={r['rot']:+6.1f} x={r['xpct']:5.1f}% y={r['ypct']:5.1f}% w={r['wpct']:5.1f}%", flush=True)
    json.dump({'board': [BW, BH], 'items': res}, open(out,'w'), indent=1)

SETS = {
 '01': ('Sin título-3-01.png', [(f'BP{i}', f'{M}/BASE PLACAS-{i}.png') for i in [22,23,24,25,26,27,29]]),
 '02': ('Sin título-3-02.png', [(f'BP{i}', f'{M}/BASE PLACAS-{i}.png') for i in range(18,30)]),
 '03': ('Sin título-3-03.png', [(f'BP{i}', f'{M}/BASE PLACAS-{i}.png') for i in range(18,30)] +
                               [(f'CM{i}', f'{M}/combo max-{i}.png') for i in range(20,29)]),
 '04': ('Sin título-3-04.png', [(f'MT{i}', f'{T}/BASE PLACAS-{i}.png') for i in range(20,28)]),
}
w = sys.argv[1]
run(SETS[w][0], SETS[w][1], f'/tmp/pos_{w}.json')
