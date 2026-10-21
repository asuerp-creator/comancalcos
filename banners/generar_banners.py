"""Generador de banners de portada — Coman Calcos (estilo "fotos reales", oct. 2026).

Uso:
    pip install pillow numpy opencv-python-headless pillow-heif
    python generar_banners.py banners.json salida/

Lee la lista de banners de un JSON (ver banners.ejemplo.json) y exporta, por cada uno:
    <key>-computadora-3160x1200.jpg   (escritorio, 1580x600 @2x)
    <key>-celular-1640x2400.jpg       (celular, 820x1200 @2x)

Las rutas de "foto" en el JSON son relativas al JSON. Acepta JPG, PNG y HEIC (iPhone).
Las fuentes se buscan en ./fonts al lado de este script.
"""
import json
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
FD = os.path.join(HERE, 'fonts') + os.sep

# ---------------- paleta (60-30-10) ----------------
CEL = (135, 180, 211)    # #87b4d3  60%: fondo
NAVY = (16, 35, 63)      # #10233f  30%: titulos, textos, contornos
OLIVA = (94, 107, 51)    # #5E6B33  10%: boton de accion y linea resaltada
GOLD = (122, 88, 16)     # #7A5810  bajada (el #9E741A no se lee sobre celeste)
WHITE = (255, 255, 255)

# ---------------- tipografia ----------------
TITLE_FONT = FD + 'Bricolage-ExtraBold.ttf'   # titulo, en minuscula tipo oracion
SUB_FONT = FD + 'Bricolage-SemiBold.ttf'      # bajada dorada
PBOLD = FD + 'Poppins-Bold.ttf'               # info en mayusculas + texto del boton
PMED = FD + 'Poppins-Medium.ttf'              # chips
TITLE_MAX, TITLE_LEAD, SUB_MAX = 230, 1.28, 80

# ---------------- medidas ----------------
DESK = (3160, 1200)
MOB = (1640, 2400)


def load_photo(path, patch=None):
    if path.lower().endswith(('.heic', '.heif')):
        from pillow_heif import register_heif_opener
        register_heif_opener()
    img = ImageOps.exif_transpose(Image.open(path)).convert('RGB')
    if patch:  # borra texto que ya traia la foto (rectangulo x0,y0,x1,y1 en px de la foto)
        a = cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)
        m = np.zeros(a.shape[:2], np.uint8)
        x0, y0, x1, y1 = patch
        m[y0:y1, x0:x1] = 255
        a = cv2.inpaint(a, m, 15, cv2.INPAINT_TELEA)
        img = Image.fromarray(cv2.cvtColor(a, cv2.COLOR_BGR2RGB))
    return img


def cover(img, w, h, focus):
    iw, ih = img.size
    s = max(w / iw, h / ih)
    nw, nh = round(iw * s), round(ih * s)
    img = img.resize((nw, nh), Image.LANCZOS)
    x = int(np.clip(focus[0] * nw - w / 2, 0, nw - w))
    y = int(np.clip(focus[1] * nh - h / 2, 0, nh - h))
    return img.crop((x, y, x + w, y + h))


def fit(path, text, maxw, maxsize):
    lo, hi = 10, maxsize
    while lo < hi:
        mid = (lo + hi + 1) // 2
        bb = ImageFont.truetype(path, mid).getbbox(text)
        if bb[2] - bb[0] <= maxw:
            lo = mid
        else:
            hi = mid - 1
    return ImageFont.truetype(path, lo)


def veil(w, h, stops):
    p = np.linspace(0, 1, h)
    a = np.interp(p, [s[0] for s in stops], [s[1] for s in stops])
    lay = np.zeros((h, w, 4), np.uint8)
    lay[..., :3] = CEL
    lay[..., 3] = (np.broadcast_to(a[:, None], (h, w)) * 255).astype(np.uint8)
    return Image.fromarray(lay, 'RGBA')


def draw_block(canvas, b, x, y, maxw, align, scale):
    """Titulo + bajada + info + fila de accion (boton oliva + chips). Devuelve la y final."""
    d = ImageDraw.Draw(canvas)
    # titulo: todas las lineas al tamano de la mas larga
    tl = b['titulo']
    longest = max(tl, key=lambda s: ImageFont.truetype(TITLE_FONT, 100).getlength(s))
    ft = fit(TITLE_FONT, longest, maxw, int(TITLE_MAX * scale))
    th = ft.getbbox('H')[3] - ft.getbbox('H')[1]
    sw = max(2, round(ft.size * 0.030))
    for n, line in enumerate(tl):
        bb = ft.getbbox(line)
        lx = x if align == 'l' else x + (maxw - (bb[2] - bb[0])) / 2
        color = OLIVA if n == b.get('resaltar_linea') else NAVY
        d.text((lx - bb[0], y - bb[1]), line, font=ft, fill=color, stroke_width=sw, stroke_fill=WHITE)
        y += th * TITLE_LEAD
    y += th * 0.12
    # bajada dorada
    gl = b['bajada']
    fg = fit(SUB_FONT, max(gl, key=len), maxw * 0.92, int(SUB_MAX * scale))
    gh = fg.getbbox('H')[3] - fg.getbbox('H')[1]
    for line in gl:
        bb = fg.getbbox(line)
        lx = x if align == 'l' else x + (maxw - (bb[2] - bb[0])) / 2
        d.text((lx - bb[0], y - bb[1]), line, font=fg, fill=GOLD)
        y += gh * 1.50
    y += gh * 0.55
    # info
    info = b['info'].upper()
    fi = ImageFont.truetype(PBOLD, int(38 * scale))
    bb = fi.getbbox(info)
    if bb[2] - bb[0] > maxw:
        fi = fit(PBOLD, info, maxw, int(38 * scale))
        bb = fi.getbbox(info)
    lx = x if align == 'l' else x + (maxw - (bb[2] - bb[0])) / 2
    d.text((lx - bb[0], y - bb[1]), info, font=fi, fill=NAVY)
    y += (bb[3] - bb[1]) + 40 * scale
    # fila de accion
    fb = ImageFont.truetype(PBOLD, int(40 * scale))
    label = b['boton'].upper()
    bw_txt = fb.getlength(label)
    aw, pad, bh = 38 * scale, 56 * scale, 104 * scale
    bw = bw_txt + aw + 26 * scale + 2 * pad
    fc = ImageFont.truetype(PMED, int(30 * scale))
    cpad, ch, gap = 26 * scale, 64 * scale, 16 * scale
    chips = b.get('chips', [])
    cw = [fc.getlength(c) + 2 * cpad for c in chips]
    chips_w = sum(cw) + gap * max(0, len(cw) - 1)
    same_row = bw + 28 * scale + chips_w <= maxw
    row_w = bw + 28 * scale + chips_w if same_row else bw
    bx = x if align == 'l' else x + (maxw - row_w) / 2
    d.rounded_rectangle((bx, y, bx + bw, y + bh), radius=16 * scale, fill=OLIVA)
    bb = fb.getbbox(label)
    tx = bx + pad
    d.text((tx - bb[0], y + (bh - (bb[3] - bb[1])) / 2 - bb[1]), label, font=fb, fill=WHITE)
    ax, ay = tx + bw_txt + 26 * scale, y + bh / 2
    lw = max(3, round(6 * scale))
    d.line((ax, ay, ax + aw, ay), fill=WHITE, width=lw)
    d.line((ax + aw - 14 * scale, ay - 14 * scale, ax + aw, ay), fill=WHITE, width=lw)
    d.line((ax + aw - 14 * scale, ay + 14 * scale, ax + aw, ay), fill=WHITE, width=lw)
    if not chips:
        return y + bh
    if same_row:
        cx, cy, end = bx + bw + 28 * scale, y + (bh - ch) / 2, y + bh
    else:
        cx = x if align == 'l' else x + (maxw - chips_w) / 2
        cy = y + bh + 24 * scale
        end = cy + ch
    for c, wdt in zip(chips, cw):
        d.rounded_rectangle((cx, cy, cx + wdt, cy + ch), radius=12 * scale, outline=NAVY, width=max(2, round(3 * scale)))
        bb = fc.getbbox(c)
        d.text((cx + cpad - bb[0], cy + (ch - (bb[3] - bb[1])) / 2 - bb[1]), c, font=fc, fill=NAVY)
        cx += wdt + gap
    return end


def place(can, b, x, top, bottom, maxw, align, scale):
    """Mide el bloque en seco y lo centra en la zona libre; si no entra, lo achica."""
    h = 0
    for _ in range(12):
        h = draw_block(Image.new('RGB', can.size), b, x, 0, maxw, align, scale)
        if h <= bottom - top:
            break
        scale *= 0.93
        if align == 'l':
            maxw *= 0.97
    draw_block(can, b, x, top + ((bottom - top) - h) / 2, maxw, align, scale)


def desktop(b, foto):
    W, H = DESK
    can = Image.new('RGB', (W, H), CEL)
    PX = 1500  # la foto ocupa de x=1500 a la derecha y se funde con el panel celeste
    ph = cover(foto, W - PX, H, b.get('foco_compu', (0.5, 0.5)))
    ramp = np.clip(np.arange(W - PX) / 420.0, 0, 1)
    mask = np.broadcast_to((ramp * ramp * (3 - 2 * ramp))[None, :], (H, W - PX))
    can.paste(ph, (PX, 0), Image.fromarray((mask * 255).astype(np.uint8)))
    can = can.convert('RGBA')
    can.alpha_composite(veil(W, H, [(0, .70), (.30, .25), (.42, 0), (1, 0)]))  # velo para el encabezado
    can = can.convert('RGB')
    place(can, b, 170, 450, 1130, 1260, 'l', 1.0)  # texto debajo de la zona del encabezado
    return can


def mobile(b, foto):
    W, H = MOB
    can = cover(foto, W, H, b.get('foco_celu', (0.5, 0.5))).convert('RGBA')
    can.alpha_composite(veil(W, H, [(0, .70), (.24, .22), (.34, 0), (.50, 0), (.62, .85), (.70, 1), (1, 1)]))
    can = can.convert('RGB')
    place(can, b, 110, 1520, 2320, W - 220, 'c', 1.12)  # texto abajo, foto arriba
    return can


def main():
    cfg_path, out = sys.argv[1], sys.argv[2]
    base = os.path.dirname(os.path.abspath(cfg_path))
    os.makedirs(out, exist_ok=True)
    for b in json.load(open(cfg_path, encoding='utf-8'))['banners']:
        foto = load_photo(os.path.join(base, b['foto']), b.get('borrar_texto'))
        for nombre, img in ((f"{b['key']}-computadora-3160x1200.jpg", desktop(b, foto)),
                            (f"{b['key']}-celular-1640x2400.jpg", mobile(b, foto))):
            img.save(os.path.join(out, nombre), quality=88, subsampling=0, optimize=True)
        print(b['key'], 'ok')


if __name__ == '__main__':
    main()
