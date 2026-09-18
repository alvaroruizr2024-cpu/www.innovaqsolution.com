# Estructura de los tres entregables

## 1. Deck de lanzamiento — 8 slides, un trabajo por slide

El video que originó esta skill lo dice tal cual: "eight slides, one job each". Cada
slide responde una sola pregunta; si necesitas dos ideas, son dos slides.

| # | Slide             | Trabajo de la slide                                          |
|---|-------------------|--------------------------------------------------------------|
| 1 | Portada           | Nombre del lanzamiento + fecha + una frase (la premisa)      |
| 2 | La premisa        | El problema del cliente en una frase memorable               |
| 3 | Qué lanzamos      | Producto/servicio en 1 línea + 3 bullets de qué incluye      |
| 4 | Para quién        | Segmento, tamaño de empresa, dolor concreto (minería, salud…) |
| 5 | Cómo funciona     | 3 pasos o diagrama simple                                    |
| 6 | Prueba            | Dato, caso, comparación de precio (ej. "hasta 50 % menos")   |
| 7 | Oferta y precio   | Plan, precio, vigencia, condición ("30 días gratis")         |
| 8 | Siguiente paso    | CTA único + WhatsApp + web                                   |

Estilo: fondo `color-bg` en portada y cierre, `color-surface` en el resto; titulares en
`font-heading`; acento `color-accent` solo para el dato clave y el CTA. Un deck de
lanzamiento no lleva más de 25 palabras por slide.

Herramienta: skill `pptx` (Claude Code / Cowork) o Claude Slides (claude.ai). Los hex
salen de `brand.json`, nunca de memoria.

## 2. Documento para el equipo — brief interno de 1 página

Es el documento que se manda al equipo comercial/soporte el día del lanzamiento.
Estructura fija:

```
# Lanzamiento: <nombre>  ·  <fecha>
## En una frase
## Qué cambia para el cliente (3 bullets)
## Mensajes clave (los 3 que todos repiten igual)
## Preguntas frecuentes y respuesta corta (5–7)
## Oferta, precio y vigencia
## Calendario de publicación (tabla: fecha · plataforma · pieza · copy)
## Copys listos por plataforma (LinkedIn, Instagram, Facebook, TikTok, WhatsApp)
## Responsables y contacto
```

Herramienta: skill `docx` si piden Word; si no, Markdown en la carpeta del kit (el equipo
lo lee en GitHub). En claude.ai, Claude Docs.

## 3. Piezas para redes — 4 formatos

Ver `formatos.md`. Una plantilla, un JSON de tokens, cuatro PNG. El titular de las
piezas es la premisa (slide 2), no el nombre del producto.

## Coherencia entre los tres

La regla del video ("cambias un color en la presentación y se corrige en todo lo demás")
se cumple porque los tres entregables leen el mismo `brand.json` del kit:

- piezas de redes → `render_social.py --tokens brand.json`
- deck → hex de `tokens.*` copiados al tema del pptx
- documento → nombres de producto, precios y CTA idénticos a los del deck

Si el usuario pide un cambio de color, tipografía o titular, edita `brand.json` y
regenera los tres. No parches una pieza suelta.
