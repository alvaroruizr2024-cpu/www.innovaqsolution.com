# DESIGN.md — Sistema visual de INNOVAQ

Sistema visual extraído del código existente del sitio. Toda página nueva o rediseño
se apoya en estos tokens. Si un valor no está aquí, se toma del código de la
superficie equivalente, no se inventa. El contexto de producto y voz está en
`PRODUCT.md`.

## Dos superficies, una paleta

INNOVAQ tiene dos temas que comparten los tres colores del logo:

| Superficie | Fondo | Uso |
|------------|-------|-----|
| **Cinematic (oscuro)** | `#05070c` | Showroom en `index.html` / `cinematic/`. Portada del dominio. |
| **Suite (claro)** | `#FBFBF9` | `global/index.html` y landings de producto. |

Regla: una página elige un tema y lo mantiene. No se mezclan fondos oscuros y claros
en la misma vista salvo en secciones de cierre (CTA) claramente delimitadas.

## Color

### Acentos de marca (iguales en ambos temas)

| Token | Hex | Rol |
|-------|-----|-----|
| `--blue` / primary | `#126695` | Color principal, enlaces, botones secundarios |
| primary-light | `#2B9BCB` | Hover y estados activos sobre fondo oscuro |
| primary-dark | `#0d4a6e` | Fondos de bloque, portada de decks |
| `--orange` / accent | `#F1912B` | **Un solo acento por vista**: dato clave, badge, CTA principal |
| accent-light / dark | `#f5aa5a` / `#d4741a` | Hover del acento |
| `--green` / success | `#7AB648` | Éxito, "incluido", checks |
| `--wa` | `#25D366` | Exclusivo para el botón de WhatsApp |

### Tema cinematic (oscuro)

| Token | Hex |
|-------|-----|
| `--bg` | `#05070c` |
| superficies elevadas | `#080b11`, `#0a111a`, `#0b1017` |
| `--ink` (texto) | `#e8eef6` |
| texto secundario | `#cfdae6` |
| `--muted` | `#93a0b3` |
| `--line` | `rgba(232,238,246,.12)` |
| `--glass` | `rgba(8,12,18,.55)` + `backdrop-filter: blur(16px)` |
| azules de profundidad | `#0e2238`, `#102033`, `#12314a` |

### Tema suite (claro)

| Token | Hex |
|-------|-----|
| bg | `#FBFBF9` |
| bgCard | `#FFFFFF` |
| text | `#1a1a2e` |
| textMuted | `#5a5a6e` |
| textLight | `#8a8a9e` |
| gray | `#777873` |
| border | `#e2e2dc` |
| borderLight | `#eeeeea` |

Contraste mínimo AA (4.5:1) para texto. El naranja `#F1912B` no se usa como color de
texto sobre blanco; sobre `#05070c` sí funciona.

## Tipografía

| Superficie | Titulares | Texto | Detalle |
|------------|-----------|-------|---------|
| Cinematic | **Instrument Serif** (regular e itálica) | **Manrope** 400–800 | Kickers en Manrope mayúsculas, `letter-spacing: .12em`–`.16em` |
| Suite | **DM Sans** 300–800 | DM Sans | Cifras y códigos en **Space Mono** |

- Máximo dos familias por página. La landing `sig360/` ya usa DM Sans y encaja en el
  tema suite; no introducir una tercera fuente (Inter figura en un JSON de marca antiguo
  pero no se usa en ninguna página).
- Escala del showroom: H1 `clamp(40px, 6vw, 76px)`, H2 `clamp(32px, 4vw, 54px)`.
  Cuerpo 16–18px, interlineado 1.5–1.6.
- Titulares cortos: una idea por línea, sin punto final. Itálica serif solo para
  resaltar una palabra dentro del titular (patrón `Titular con <em>una idea</em>`).

## Espaciado y forma

- Grid de 8px. Secciones con `padding` vertical de 64–120px en escritorio, 40–64px en
  móvil. Gutter lateral mínimo 16px.
- Radios: `8px` controles, `10–12px` tarjetas pequeñas, `16–18px` tarjetas y paneles
  grandes, `999px` píldoras y botones de WhatsApp.
- Bordes de 1px con `--line` (oscuro) o `border` (claro). Sin sombras duras en el tema
  oscuro: profundidad con capas de fondo y `backdrop-filter`. En el tema claro, sombra
  suave solo en tarjetas elevadas.

## Componentes

- **Botón primario**: fondo `#F1912B`, texto blanco, radio 10px, peso 700. Uno por vista.
- **Botón WhatsApp**: fondo `#25D366`, píldora, icono + "Escríbenos por WhatsApp".
  Enlace `wa.me/<número de PRODUCT.md>`. Flotante en móvil.
- **Badge**: fondo `#F1912B` (o `#7AB648` para éxito), texto blanco, radio 6px, 11px, 700.
- **Tarjeta de producto**: nombre + sub de `PRODUCTS`, sector, un CTA. En suite muestra
  plan y precio; en cinematic nunca.
- **Kicker**: texto pequeño en mayúsculas sobre el titular, `letter-spacing .14em`,
  color `--muted` o primary-light.

## Movimiento

- Transiciones de 150–250ms con `ease-out` en hover y foco.
- El showroom usa órbita 3D y encuadre de cámara; en landings estáticas el movimiento se
  limita a aparición al hacer scroll y hover de tarjetas. Respetar
  `prefers-reduced-motion`.

## Imágenes

- Fotografía real de obra, planta o equipo antes que ilustración genérica. Nada de
  stock de oficinas sonrientes.
- Generación de imágenes y video: skill `innovaq-gemini-proxy` (ruta sancionada).
- Logo sobre fondo oscuro o claro sin recuadro; margen de seguridad igual a la altura
  de la "I".

## Antipatrones a evitar

- Degradados morados, tarjetas con "glassmorphism" arcoíris, iconos de IA genéricos.
- Más de un acento naranja por pantalla.
- Precios o "prueba gratis" en el showroom.
- Titulares con tres adjetivos ("integral, innovador y líder").
- Idiomas mezclados en una frase; mayúsculas sostenidas en párrafos.

## Flujo recomendado con las skills

1. `/impeccable critique <carpeta>` sobre la landing actual.
2. `/taste <url de referencia>` para tomar ritmo y jerarquía, aplicados con esta paleta.
3. Rediseñar la sección pedida citando este archivo.
4. `/impeccable audit` y captura con Playwright en móvil y escritorio antes de commitear.
