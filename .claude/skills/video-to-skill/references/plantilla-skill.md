# Plantillas

Dos esqueletos: el de `SKILL.md` y el de `references/video-transcripcion.md`. Sustituye
lo que va entre `<>`; borra las secciones que no apliquen, no las dejes vacías.

---

## SKILL.md

```markdown
---
name: <nombre-en-kebab-case>
description: <Qué hace, en una frase con verbos>. Úsala SIEMPRE que el usuario pida <frases reales, 6 a 10, en español>, o cuando <situación en la que no nombra la herramienta>. También para <caso INNOVAQ/PANASUR>. Use for any <resumen en inglés> request.
---

# <Título> — <promesa en una línea>

Esta skill nace de un video (<plataforma> de <autor>, "<título o primera frase>"):
<qué muestra el video en dos frases>. Aquí lo reproducimos con <los matices que el
video omite: permisos, credenciales, límites>.

---

## 0. Qué es <la herramienta> (y qué no es)
- <capacidad real, en una línea, con la fuente>
- <coste, licencia, dónde quedan los datos>
- <tabla: qué funciona sin configurar / con configuración / quién la aporta>

## 1. Cuándo aplicar esta skill y qué ruta tomar
1. "<pedido A>" → sección 2
2. "<pedido B>" → sección 3
3. <cuándo NO usarla o cuándo preguntar antes>

## 2. <Flujo principal>, paso a paso
### Paso 1 — <verbo>
<comando o acción>. <Por qué>.
### Paso 2 — <verbo>
...

## 3. Uso diario: qué comando para cada pedido
| Pedido del usuario | Qué hacer |
|--------------------|-----------|

### Casos INNOVAQ / PANASUR
- <caso 1 con producto concreto>
- <caso 2>

## 4. Mantener, reparar, desinstalar
- <actualizar>
- <diagnóstico y errores frecuentes>
- <desinstalar>

## 5. Límites que no se negocian
- <lo que exige aprobación del usuario>
- <lo que el usuario hace a mano>
- <dónde se crean archivos y dónde nunca>

## Archivos de esta skill
| Archivo | Cuándo leerlo |
|---------|---------------|
| `references/...` | ... |
| `scripts/...` | ... |
```

---

## references/video-transcripcion.md

```markdown
# Transcripción del video de origen

- **Fuente:** <plataforma> de <autor> (<formato>, <duración>, <idioma>).
- **Tema:** <herramienta o flujo>, <enlace a la fuente primaria>.
- **Método:** <voz con faster-whisper | subtítulos grabados leídos fotograma a fotograma>.

## Texto completo
> <transcripción en párrafos; entre corchetes lo inferido>

## Lo que se ve en pantalla (cronología)
| Tiempo | Pantalla |
|--------|----------|
| 0–5 s | <...> |

## Lo que el video afirma y cómo lo verifica esta skill
| Afirmación del video | Verificación contra la fuente (<fecha>) |
|----------------------|------------------------------------------|
| "<cita>" | <cierto / cierto con condición X / exagerado, con el dato> |
```
