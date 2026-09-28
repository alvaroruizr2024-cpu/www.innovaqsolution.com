# Plantilla de skill generada desde un video

Copia esta estructura en `.claude/skills/<nombre>/`. Lo que está entre `<>` se
sustituye; lo demás se conserva porque es la convención de este repositorio
(ver `launch-kit`, `video-to-skill`).

## Estructura de carpetas

```
.claude/skills/<nombre>/
├── SKILL.md                 # obligatorio
├── references/
│   ├── origen.md            # ficha del video: guion, pantalla, verificación
│   └── <tema>.md            # material de apoyo que no cabe en SKILL.md
└── scripts/                 # solo si automatizan algo real y probado
    └── <accion>.sh | .py
```

## Reglas de frontmatter

- `name`: kebab-case, igual al nombre de la carpeta, 2–3 palabras, describe la
  capacidad, no el video (`ventas-consultivas`, no `video-joe-girard`).
- `description`: **máximo 1024 caracteres**; un solo párrafo; qué hace + cuándo
  dispararse con frases literales del usuario entre comillas, en español; cierra con
  una frase en inglés ("Use for any … request"). **Prohibido `: ` (dos puntos y
  espacio) dentro del texto**: rompe el YAML. Usa guiones, paréntesis o "—".
- Nada más en el frontmatter salvo que el host lo pida.

Comprobación:

```bash
bash .claude/skills/video-to-skill/scripts/install_skill.sh .claude/skills/<nombre> --check
```

## SKILL.md

```markdown
---
name: <nombre>
description: <qué hace, en una frase> — <cómo, en una frase>. Úsala SIEMPRE que el usuario pida "<frase 1>", "<frase 2>", "<frase 3>" o <situación>. Aplica a <INNOVAQ / productos / PANASUR si procede>. Use for any <tema> request.
---

# <Título> — <la promesa en seis palabras>

Esta skill nace de un video (<plataforma> de @<autor>, "<título o primera frase>"):
<el mensaje central del video en dos o tres frases, con sus palabras>. El guion completo
y lo que se ve en pantalla están en `references/origen.md`.

Aquí lo reproducimos con <uno o dos matices que el video omite: límites, requisitos,
qué no es automático>. El valor está en <la idea de fondo, no en la herramienta>.

---

## 0. Qué hay antes de empezar

<Requisitos, entorno, dónde están los datos reales del repo (precios, marca, copy),
qué herramienta hay en cada entorno. Tabla si son más de dos.>

---

## 1. Flujo

### Paso 1 — <verbo + objeto>
<Instrucciones concretas, comandos copiables, salida esperada.>

### Paso 2 — …

---

## 2. Reglas

- <Qué NO hacer, en negativo y con motivo.>
- <Qué verificar antes de afirmar.>

---

## 3. Para INNOVAQ / PANASUR

<A qué producto, proceso o carpeta del repo se aplica; si no aplica, omitir la sección.>

---

## 4. Referencias

- `references/origen.md` — …
- `scripts/…` — …
```

## Si el video enseña un estilo (vendedor, creador, presentador)

Captura el estilo como reglas que Claude pueda ejecutar, no como descripción:

```markdown
## Reglas de estilo
- Apertura: <patrón> (ej. "pregunta que duele + promesa en 8 palabras").
- Estructura: <n bloques con nombre y duración o longitud>.
- Tono: <2–3 adjetivos con ejemplo literal del video>.
- Frases gancho literales: "<…>", "<…>".
- Manejo de objeciones / giros: <patrón>.
- Cierre / llamada a la acción: <patrón>.

## Ejemplos reconstruidos del video
1. <situación> → <cómo lo hace el experto, citando>.
2. …
```

## Checklist antes del commit

- [ ] `name` = carpeta; descripción ≤ 1024 y sin `: `.
- [ ] Párrafo de origen con autor y plataforma; `references/origen.md` con guion,
      cronología de pantalla y tabla de verificación.
- [ ] Cada comando de `SKILL.md` se ejecutó al menos una vez (o se dice que no se pudo).
- [ ] Sin llaves, tokens, correos ni medios (video, fotogramas, audio) en el repo.
- [ ] Instalada en `~/.claude/skills/<nombre>` con `scripts/install_skill.sh`.
- [ ] Probada con una frase de la descripción.
