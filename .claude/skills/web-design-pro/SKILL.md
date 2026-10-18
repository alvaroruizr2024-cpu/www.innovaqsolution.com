---
name: web-design-pro
description: "Úsala SIEMPRE que el usuario pida crear, rediseñar o mejorar una página web, landing o UI con Claude y quiera un resultado visualmente profesional ('hazla profesional', 'diseño más pro', 'que se vea mejor', 'revisa el diseño', 'compara con el Figma', 'mejora la landing de INNOVAQ/SIG360/ERP360/PANASUR'). Aplica el método de 3 pasos: (1) criterios de diseño (tipografía, espaciado, jerarquía, animación), (2) referencia visual extraída de una web modelo, (3) bucle de revisión con Figma y Playwright por MCP. Use for any web build or redesign where design quality matters, not just generating code once."
---

# Web Design Pro

Origen: video "Crea webs increíbles paso a paso con Claude" (Migue Baena IA, 2026-10-14). Idea central: pedir "hazla profesional" no basta. Hay que darle a Claude **criterios visuales**, **una referencia** y **una forma de revisar el resultado**.

Los nombres de skills y herramientas del video (Impeccable, Emil Design, Taste Skill) vienen de una transcripción automática. Verifica que existan e instálalos solo si el usuario lo aprueba; si no están, aplica los criterios de este documento directamente.

## Flujo

### Paso 1. Criterios de diseño (antes de escribir código)

Si hay skills de diseño instaladas (Impeccable, Emil Design, `ui-ux-pro-max`, `design:*`), cárgalas. Si no, fija estos criterios por escrito antes de codificar:

- **Tipografía**: máximo 2 familias, escala modular (p. ej. 1.25), interlineado 1.5 en cuerpo, 1.1–1.2 en títulos.
- **Espaciado**: una escala base (4/8 px) usada de forma consistente; secciones con respiro vertical generoso.
- **Jerarquía visual**: un solo foco por sección, contraste claro entre título, subtítulo y CTA.
- **Color**: paleta de marca con tokens (CSS variables), contraste WCAG AA, modo oscuro si aplica.
- **Animación**: sutil y con propósito (150–300 ms), respetar `prefers-reduced-motion`.
- **Responsive**: diseñar móvil primero; sin scroll horizontal.

Para marcas INNOVAQ/PANASUR, usa `small-business:brand-style` o `launch-kit` para obtener los tokens de marca.

### Paso 2. Referencia (estilo "Taste")

1. Pide al usuario una web de referencia (URL) o una captura de Figma. Sin referencia, pregunta antes de inventar un estilo.
2. Extrae de la referencia: paleta (hex), tipografías, escala de espaciado, radios, sombras y patrones de layout. Usa Playwright (`page.evaluate` con `getComputedStyle`) o `WebFetch`.
3. Resume lo extraído en una tabla de tokens y úsala como fuente de verdad. No copies contenido ni assets con derechos; toma solo el estilo.

### Paso 3. Bucle de revisión con Figma y Playwright (MCP)

1. **Figma MCP**: si hay diseño, léelo para obtener estructura, medidas y tokens (`figma:figma-design-to-code`).
2. Implementa la página.
3. **Playwright**: abre la web local, toma capturas en 3 anchos (390, 768, 1440), recorre la navegación y revisa consola y enlaces rotos.
4. Compara contra la referencia o el Figma y lista diferencias concretas (espaciado, tamaños, colores, alineación).
5. Vuelve al código, corrige y repite hasta que las diferencias sean mínimas (máximo 3 iteraciones salvo que el usuario pida más).

Si no hay MCP de Figma o Playwright disponible, dilo y usa alternativas: Playwright vía script en Node (`/opt/pw-browsers/chromium`, no ejecutar `playwright install`) y capturas del usuario para Figma.

## Entrega

- Resume qué criterios, referencia y tokens se usaron.
- Adjunta las capturas finales por ancho y la lista de diferencias que quedan abiertas.
- Recuerda al usuario que el proceso sigue necesitando una buena referencia y su supervisión.
