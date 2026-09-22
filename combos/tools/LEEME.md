# Herramientas para regenerar la seccion de combos

Estos scripts NO los usa la web. Estan guardados aca para poder rehacer la seccion
sin tener que recalcular a mano la posicion de cada sticker.

## Orden de uso
1. `match2.py 01|02|03|04` — localiza cada sticker dentro de su artboard con SIFT.
2. `fallback.py 01|02|03` — resuelve los que SIFT no encuentra (bandera, sol, pelota,
   escarapela) con template matching de escala acotada.
3. `render.py 01 02 03 04` — dibuja la reconstruccion al lado de la artboard original
   para verificar a ojo, y deduce el orden de apilado.
4. `build.py` — exporta los WebP (stickers y termos) y escribe `layout.json`.
5. `gen.py` — arma `combos.js` juntando `layout.json` con los datos de producto.

## layout.json
Posicion, tamano, rotacion y punto de origen de cada sticker, en % de una caja cuadrada.
Si se pierde, hay que rehacer los pasos 1 a 3 (tarda ~20 minutos de computo).

## Rutas
Los scripts esperan los PNG originales en /mnt/user-data/uploads/ (artboars, Combo Malvinas,
combo mate). Si se corren en otro lado hay que cambiar la constante UP al principio de cada uno.
