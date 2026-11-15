# INNOVAQ · Configuración en ChatGPT Business Hub

Preparado el 14 de noviembre de 2026. La web y esta guía no crean ni verifican un perfil en ChatGPT.

## Ficha para completar el registro

- Nombre comercial: INNOVAQ Solutions.
- Razón social publicada en la web: INNOVAQ SOLUTIONS SAC. Confirmar contra los documentos empresariales antes de la verificación.
- Página comercial: https://www.innovaqsolution.com/global/
- Información pública y catálogo: https://www.innovaqsolution.com/global/empresa/
- Correo publicado en la sección de contacto: contacto@innovaqsolution.com. Confirmar acceso antes de usarlo para verificar.
- Ubicación publicada: MzE lt 22 Víctor Larco, Trujillo, La Libertad, Perú. Dirección actualizada por el representante el 14 de noviembre de 2026. No declarar una ubicación en EE. UU. para obtener acceso.
- Categoría propuesta: software empresarial y consultoría de gestión; elegir la categoría equivalente disponible.
- Descripción: INNOVAQ Solutions ofrece software empresarial y servicios de consultoría en sistemas de gestión, auditoría, capacitación, desarrollo de software y automatización con inteligencia artificial. Su catálogo incluye soluciones para gestión integrada, ERP, mantenimiento, capacitación, proyectos, agroindustria, alimentos, hotelería, salud, catastro y congresos.
- Logo: https://www.innovaqsolution.com/1000608638.jpg
- Horario, teléfono, domicilio legal completo y políticas comerciales: confirmar antes de introducirlos. No se han inventado.

## Activación que debe completarse en la cuenta

1. Abrir https://chatgpt.com/business-hub con la cuenta que administrará INNOVAQ.
2. Buscar INNOVAQ Solutions y comprobar que el perfil corresponde al negocio. Si no existe, usar la opción para agregarlo únicamente si está disponible.
3. Verificar la relación con la empresa mediante el método que ofrezca Business Hub. Para DNS, copiar exactamente el TXT proporcionado por OpenAI; no sustituir registros existentes.
4. Completar personalmente la verificación de identidad en Persona y aportar solo los documentos solicitados por ese flujo seguro. No guardar documentos de identidad, códigos ni tokens en este repositorio.
5. Esperar aprobación. Revisar los datos del perfil y sus estadísticas en Business Hub.
6. Crear, probar y publicar un Business Agent solo si la cuenta y la empresa resultan elegibles. A esta fecha, OpenAI limita los agentes a empresas elegibles de comercio electrónico y servicios en línea de EE. UU.; tener una web accesible globalmente no acredita esa condición.

Si Persona se utiliza para crear un perfil nuevo, la aprobación de OpenAI lo publica automáticamente. La publicación del agente es un paso separado. No se ha iniciado ninguna campaña publicitaria ni contratación.

## Instrucciones propuestas para el agente, cuando sea elegible

Eres el asistente comercial de INNOVAQ Solutions. Ayudas a comprender el catálogo de software y los servicios publicados por la empresa. Responde en el idioma del cliente, con mensajes breves y concretos.

Usa como fuentes la ficha pública, el catálogo y los precios vigentes de https://www.innovaqsolution.com/global/. No atribuyas certificaciones, autorizaciones oficiales, exclusividad, cifras de clientes o garantías de resultados que no estén acreditadas. Una herramienta de gestión no equivale a una certificación ISO ni garantiza cumplimiento legal.

Pregunta por el sector, el proceso que desea mejorar, la cantidad aproximada de usuarios y las sedes. Explica una o dos opciones pertinentes del catálogo y facilita el enlace a la web o al correo comercial para solicitar una demostración o propuesta.

Consulta los precios actuales antes de citarlos. Especifica moneda, periodicidad y alcance. No conviertas monedas con tasas antiguas ni presentes descuentos como permanentes. Si no hay información confirmada sobre impuestos, plazos, implementación, cancelaciones, devoluciones, disponibilidad o soporte, indícalo y deriva a contacto@innovaqsolution.com. No inventes condiciones comerciales.

No declares que has enviado correos, reservado reuniones, activado licencias, recibido pagos o procesado reembolsos. El agente informa y enlaza al sitio; las operaciones se completan por los canales de INNOVAQ. No solicites contraseñas, tarjetas, documentos de identidad ni historias clínicas en el chat.

## Preguntas de revisión antes de publicar

| Consulta de prueba | Comportamiento esperado |
| --- | --- |
| Necesito gestionar ISO en una constructora | Explicar SIG 360° y la consultoría; solicitar alcance y ofrecer contacto. |
| ¿Qué solución sirve para mantenimiento? | Describir TPM360 con información del catálogo. |
| ¿Cuánto cuesta ERP 360 en soles hoy? | Consultar el precio vigente y aclarar moneda/período; no inventar una conversión. |
| ¿Me garantizan la certificación ISO? | No garantizar certificación ni resultados. |
| ¿Pueden reservar mañana a las 10? | Ofrecer el canal comercial; no afirmar una reserva. |
| Quiero cancelar y recibir un reembolso | No inventar una política; remitir a revisión comercial. |

## Mantenimiento técnico

- `node scripts/build-business-profile.mjs` regenera la ficha HTML, JSON y el mapa del sitio a partir del catálogo publicado en `global/index.html`.
- `node scripts/build-business-profile.mjs --check` detecta archivos generados desactualizados.
- `global/business-profile.json` es un documento informativo propio. No es un feed comercial aprobado ni una integración API de Business Hub.
- `robots.txt` explicita el acceso de OAI-SearchBot a `/global/`. No cambia la política previa de entrenamiento ni evita la verificación del negocio.
- Estas mejoras facilitan la lectura de información; no garantizan indexación, recomendaciones, posición ni ventas.

## Documentación oficial consultada

- https://help.openai.com/en/articles/20001635-setting-up-your-business-on-chatgpt
- https://openai.com/business/businesses-in-chatgpt/
- https://developers.openai.com/api/docs/bots
