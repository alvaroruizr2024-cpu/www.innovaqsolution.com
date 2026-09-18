# Los cuatro formatos de redes

`scripts/render_social.py` produce exactamente estos cuatro PNG a partir de una sola
plantilla. Son los mismos cuatro que Claude Design genera al pedir "piezas para redes".

| Clave       | Píxeles     | Ratio | Dónde va                                                         |
|-------------|-------------|-------|------------------------------------------------------------------|
| `landscape` | 1920 × 1080 | 16:9  | LinkedIn (post con imagen), X, miniatura de YouTube, banner web  |
| `square`    | 1080 × 1080 | 1:1   | Instagram feed, Facebook, WhatsApp (difusión), LinkedIn          |
| `portrait`  | 1080 × 1350 | 4:5   | Instagram/Facebook feed (ocupa más pantalla que el cuadrado)     |
| `story`     | 1080 × 1920 | 9:16  | Stories, Reels, TikTok (portada), WhatsApp Status                |

## Qué cambia entre formatos (y qué no)

No cambia: paleta, tipografía, logo, titular, subtítulo, CTA. Es la misma pieza.

Cambia solo el layout, y lo controla el CSS de la plantilla vía `[data-format="…"]`:

- **landscape**: texto en la mitad izquierda (≈60 % de ancho), arte o producto a la derecha.
- **square / portrait**: texto centrado verticalmente, arte al fondo como apoyo.
- **story**: márgenes verticales más generosos (la UI de TikTok/IG tapa ~250 px arriba
  y ~300 px abajo); footer en columna; el CTA sube.

Regla práctica: el titular cabe en **3 líneas o menos** en los cuatro formatos. Si en
`story` se va a 4, acorta el titular en `brand.json`, no toques la plantilla.

## Zonas seguras

- story: deja libres los 250 px superiores y los 300 px inferiores para la interfaz.
- landscape en LinkedIn: el recorte de vista previa es 1.91:1, mantén lo importante
  dentro del 85 % central.

## Copys por plataforma (van en el documento, no en la imagen)

| Plataforma | Longitud del texto           | Tono                                   | Hashtags |
|------------|------------------------------|----------------------------------------|----------|
| LinkedIn   | 900–1300 caracteres          | profesional, dato + beneficio, CTA     | 3–5      |
| Instagram  | 150–300 caracteres + saltos  | directo, emoji con moderación          | 5–10     |
| Facebook   | 200–400 caracteres           | cercano, pregunta o beneficio          | 2–4      |
| TikTok     | 60–120 caracteres (caption)  | gancho + CTA "comenta X"               | 3–5      |
| WhatsApp   | 300–600 caracteres           | mensaje de difusión, 1 link            | 0        |

El repositorio ya tiene un precedente de este esquema por plataforma: el array `POSTS`
en `campaigns/index.html` (ids `LI-01`, `IG-…`, `FB-…`, `TT-…`). Reutiliza esa forma.
