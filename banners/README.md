# Banners de portada — generador

Arma los banners del carrusel de la home de comancalcos.com.ar con el estilo aprobado en octubre de 2026:
foto real + panel celeste, título en Bricolage Grotesque, bajada dorada, botón de acción verde oliva.

```
pip install pillow numpy opencv-python-headless pillow-heif
python generar_banners.py banners.json salida/
```

- `banners.ejemplo.json`: los 7 banners que se subieron el 21/10/2026 (copiar, cambiar textos y fotos).
- Cada banner sale en dos archivos: `-computadora-3160x1200.jpg` y `-celular-1640x2400.jpg`.
- Las fotos NO se guardan en este repo (es público y hay fotos de personas): van en una carpeta `fotos/` al lado del JSON.
- Fuentes en `fonts/`: Bricolage Grotesque (instancias estáticas ExtraBold y SemiBold) y Poppins, ambas con licencia SIL Open Font License (Google Fonts).
