# Plantilla del primer correo

Tres huecos son obligatorios y distintos por lead: `{dato_del_negocio}`,
`{dolor_del_segmento}`, `{producto}`. Si no puedes llenar el primero con algo real de la
ficha (barrio, rating, especialidad, número de sedes), ese lead no se escribe todavía.

Largo máximo: 120 palabras. Un solo enlace. Una sola pregunta.

---

**Asunto:** `{producto}` para `{nombre_corto}` en `{distrito}`

Hola, equipo de `{nombre}`:

Vi su ficha en Google Maps (`{dato_del_negocio}`, p. ej. "4.8 con 312 reseñas en
Miraflores") y me llamó la atención porque trabajamos con `{segmento}` que ya tienen
volumen y `{dolor_del_segmento}` (p. ej. "siguen llevando las historias clínicas en
papel o Excel").

Somos INNOVAQ, desde Perú. `{producto}` es `{una_línea_del_producto}` (copiar de
`global/index.html`, array `PRODUCTS`, campo `desc.es`). El plan MYPE parte en
`{precio}`/mes y hay 30 días de prueba sin tarjeta.

¿Les sirve una demo de 20 minutos esta semana o la próxima? Respondo con dos horarios.

Saludos,
`{nombre_remitente}` · `{cargo}` · INNOVAQ
`{teléfono}` · innovaqsolution.com

Si prefieren que no les escriba más, respondan BAJA y listo.

---

# Seguimiento (a los 4 días hábiles, solo uno)

**Asunto:** Re: `{asunto_original}`

Hola de nuevo. Por si quedó abajo en la bandeja: `{producto}` resuelve
`{dolor_del_segmento}` y la prueba es gratis 30 días. ¿Le reenvío el enlace de la demo
o lo dejamos aquí? Cualquiera de las dos está bien.

`{nombre_remitente}`

---

# Reglas

- Enviar como borradores primero (Gmail `create_draft`); enviar solo con "sí" del usuario.
- Máximo 20 correos por día y por remitente; dominio propio, nunca un Gmail personal
  para más de 10.
- Nombre, cargo y teléfono del remitente reales.
- Línea de baja siempre; una respuesta BAJA se registra en `leads.csv` (columna
  `estado = baja`) y nunca se vuelve a escribir.
- No adjuntar PDF en el primer correo; el brochure va en el segundo, si lo piden.
