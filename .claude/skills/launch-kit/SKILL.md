---
name: launch-kit
description: Arma el "kit de lanzamiento" completo de un producto, servicio, campaña o comunicado a partir de UN solo brief y en UNA sola conversación — deck de 8 slides, documento interno para el equipo y piezas para redes en los cuatro formatos (16:9, 1:1, 4:5, 9:16) — todo con la misma marca, de modo que cambiar un color o un titular corrige los tres entregables a la vez. Úsala SIEMPRE que el usuario pida "el kit", "la presentación de mi lanzamiento", "las piezas para redes", "el material del lanzamiento", "slides + posts + doc", "campaña de lanzamiento", "tres piezas con mi marca", un anuncio de producto/feature/precio/evento, o un reporte o presentación semanal recurrente; también cuando pida solo uno de los tres entregables pero mencione marca, lanzamiento, campaña, redes o equipo. Aplica a INNOVAQ (SIG360, ERP360, TPM360, AGRO360, FOOD360, HOTEL360, SALUD360, CATASTRO360, PMO360, MedCongress) y a PANASUR. Use for any launch kit, product announcement or multi-format brand deliverable request.
---

# Launch Kit — un brief, tres entregables, una marca

Esta skill nace de un video (TikTok de @joacocierra, "Anthropic ataca a los gigantes"):
Claude integró Slides, Design y Docs en el chat, así que le pides la presentación de tu
lanzamiento y te arma **las slides, las piezas para redes en cuatro formatos y el
documento para tu equipo**, todo en la misma conversación, listo para descargar, y si
cambias un color en la presentación se corrige en todo lo demás.

Aquí lo reproducimos con lo que hay en cada entorno, y con la marca del repositorio en
vez de una marca inventada. El valor no está en ninguna pieza suelta: está en que las
tres digan lo mismo, con los mismos colores, y salgan en una sola pasada.

---

## 0. Qué hay antes de empezar

**Marca.** No inventes colores ni copies hex de memoria. La paleta canónica de INNOVAQ
es el objeto `B` en `global/index.html:26-36`; ya está volcada en
`assets/brand-innovaq.json`. La de PANASUR (marca de cliente) está en
`assets/brand-panasur.json`. Si el kit es para un tercero, crea su `brand.json` con la
misma forma y pídele al usuario logo y dos colores como mínimo.

**Productos.** El copy oficial (nombre, sub, descripción ES/EN, planes y precios) vive en
el array `PRODUCTS` de `global/index.html:158`. Léelo antes de escribir una sola slide
sobre un producto de la suite; los precios y las condiciones ("30 días gratis", "plan
MYPE desde S/70") salen de ahí, no de la memoria.

**Herramientas por entorno.**

| Entregable          | Claude Code / Cowork (este repo)                    | claude.ai            |
|---------------------|-----------------------------------------------------|----------------------|
| Deck                | skill `pptx`                                         | Claude Slides        |
| Documento de equipo | Markdown en la carpeta del kit, o skill `docx`       | Claude Docs          |
| Piezas de redes ×4  | `scripts/render_social.py` (Chromium headless)       | Claude Design        |

Si una herramienta no está (p. ej. no hay Chromium), dilo y entrega los otros dos
igual. Nunca reduzcas el alcance en silencio.

---

## 1. Flujo

### Paso 1 — Brief en cinco líneas

Antes de generar nada, deja escrito (y muestra al usuario) este brief. Si falta un
dato, pregúntalo solo si cambia el resultado; si no, asume y decláralo.

```
Qué se lanza:     <producto / feature / servicio / evento>
Para quién:       <segmento y dolor concreto>
La premisa:       <una frase memorable, es el titular de todo el kit>
Oferta:           <precio, plan, vigencia, condición>
Fecha y canales:  <día · LinkedIn / IG / FB / TikTok / WhatsApp>
Marca:            innovaq | panasur | otra
```

La **premisa** es la pieza que más trabajo merece. En el video, el ejemplo era
*"Rain is a given. Shells should come prepared."*: problema en 4 palabras, promesa en 4.
Escribe tres opciones, elige una, y esa frase abre el deck, encabeza las piezas de redes
y es la primera línea del documento.

### Paso 2 — Carpeta del kit y `brand.json`

```
campaigns/<slug>-<AAAAMM>/
├── brief.md            # el brief del paso 1
├── brand.json          # copia de assets/brand-<marca>.json con los textos del kit
├── deck.pptx
├── equipo.md           # (o equipo.docx)
└── social/
    ├── <slug>-landscape-1920x1080.png
    ├── <slug>-square-1080x1080.png
    ├── <slug>-portrait-1080x1350.png
    └── <slug>-story-1080x1920.png
```

`brand.json` es la única fuente de verdad del kit. Copia el de la marca, rellena
`text.headline` (la premisa), `text.sub`, `text.cta`, `text.kicker`, y ajusta
`assets.logo` (ruta relativa a la raíz del repo; INNOVAQ usa `1000608638.jpg`).

### Paso 3 — Los tres entregables, en este orden

1. **Deck** (8 slides, un trabajo por slide; estructura en `references/entregables.md`).
   Va primero porque fija los mensajes: lo que no cabe en el deck no va en el resto.
2. **Piezas de redes.** Una sola orden:
   ```bash
   python3 .claude/skills/launch-kit/scripts/render_social.py \
     --template .claude/skills/launch-kit/assets/social-template.html \
     --tokens campaigns/<slug>-<AAAAMM>/brand.json \
     --out campaigns/<slug>-<AAAAMM>/social --prefix <slug>
   ```
   Ejecútalo desde la raíz del repo para que la ruta del logo resuelva. Si la plantilla
   base no encaja con el lanzamiento (p. ej. hace falta foto de producto de
   `assets/hero-v6/` o `tiktok-engine/assets/products/`), copia la plantilla a la carpeta
   del kit y edítala ahí; los tokens y el `data-format` siguen funcionando.
3. **Documento para el equipo** (estructura en `references/entregables.md`). Incluye
   los copys por plataforma y el calendario: es lo que el equipo comercial necesita el
   día del lanzamiento, no un resumen del deck.

### Paso 4 — Revisar como una sola cosa

Abre las cuatro piezas (una tira de vista previa ayuda: escala cada PNG y ponlas lado a
lado) y compara con la portada del deck. Revisa exactamente esto:

- El titular cabe en 3 líneas en `story`; si no, acórtalo en `brand.json`.
- Mismo hex de acento en deck, piezas y documento (búscalo, no lo supongas).
- Precio, vigencia y CTA idénticos en los tres. Un precio distinto en un solo
  entregable es el error más caro del kit.
- El logo se ve (si la ruta falla, la plantilla cae al nombre en texto; eso es un
  aviso, no una solución).

### Paso 5 — Un cambio, tres correcciones

Cuando el usuario diga "cámbiame el naranja", "pon otro titular" o "sube el precio":
edita `brand.json` (o el deck si es contenido de slide), y regenera **los tres**. Es la
promesa central del video y lo que distingue un kit de tres archivos sueltos. Cuesta un
minuto; parchar una pieza suelta cuesta una publicación con el color equivocado.

### Paso 6 — Entregar

Lista las rutas de los archivos generados, muestra la tira de vista previa y el brief.
Si hay herramienta para presentar archivos, envía el deck y las cuatro piezas. Si el
usuario quiere el kit en la web, recuerda que el sitio publica desde `main` por GitHub
Pages y que los brochures se mapean a mano en `global/index.html:1115-1130`.

---

## 2. Modo automático (reportes o presentaciones semanales)

La segunda parte del video: "programar a Claude para que te entregue tus reportes y
presentaciones cada semana en modo automático". Solo cuando el usuario lo pida
explícitamente:

- **Claude Code remoto / Cowork:** crea una rutina (`create_trigger`, sesión nueva por
  disparo) con un prompt autocontenido: qué kit o reporte, de qué fuente de datos, con
  qué `brand.json`, a qué carpeta y rama, y que abra PR en vez de tocar `main`.
  Convierte la hora local (Perú, UTC-5) a UTC en el cron.
- **claude.ai:** tareas programadas de Cowork con el mismo prompt.

Antes de crearla, muestra el prompt y el horario y espera el visto bueno: una rutina que
genera archivos y commits cada semana es una acción difícil de deshacer.

---

## 3. Errores que ya conocemos

- **Deck de 20 slides.** El kit es de 8. Si el usuario quiere más, es un brochure
  (carpeta `brochures/`), no el deck de lanzamiento.
- **Piezas con el nombre del producto como titular.** El titular es la premisa; el
  nombre del producto va en el kicker o el footer.
- **Copys iguales en todas las redes.** Longitud y tono por plataforma en
  `references/formatos.md`; LinkedIn y TikTok no comparten texto.
- **Hex "parecidos".** `#F1912B` es INNOVAQ; `#FFC000` es PANASUR; `#F68D2E` es el
  naranja viejo del `index.html` raíz. Mezclarlos es el error más común.
- **Texto en zonas tapadas.** En `story` la interfaz cubre ~250 px arriba y ~300 px
  abajo.

## Referencias

- `references/entregables.md` — estructura del deck (8 slides), del documento de equipo
  y la regla de coherencia entre los tres.
- `references/formatos.md` — los cuatro formatos, zonas seguras y copys por plataforma.
- `assets/brand-innovaq.json`, `assets/brand-panasur.json` — tokens de marca.
- `assets/social-template.html` — plantilla base adaptable por formato.
- `scripts/render_social.py` — render de las cuatro piezas con Chromium headless.
