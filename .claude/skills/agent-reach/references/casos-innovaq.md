# Casos de uso INNOVAQ y PANASUR — prompts listos para pegar

Cada caso indica qué canales de Agent Reach necesita, qué debe aportar el usuario y el
prompt que se pega en Claude Code. Los prompts asumen que la skill `agent-reach` está
instalada; Claude elegirá la herramienta aguas arriba (Exa, yt-dlp, twitter, opencli,
mcporter, feedparser, Jina) según lo que `agent-reach doctor` marque en ✅.

Salida estándar de todos los informes: tabla con **fuente (URL), fecha, cita textual,
sentimiento (+ / 0 / −), qué hacer con ello**, y al final tres conclusiones. Se guarda
en `inteligencia/<tema>-<AAAAMM>.md` del repo, con ese nombre para que `launch-kit` y
los informes semanales lo encuentren.

---

## 1. Escucha social por producto

**Canales:** Exa (sin login) + X (cookies) + Reddit (sesión OpenCLI). Sin X ni Reddit
funciona igual con Exa y `site:x.com` / `site:reddit.com`, con menos profundidad.

```
Haz un informe de escucha social sobre ERP para restaurantes en Perú para FOOD360.
Busca en Exa, X y Reddit lo que dicen dueños de restaurantes sobre PANCA, Restaurant.pe,
Fudo y sistemas con facturación SUNAT: quejas, funciones que echan en falta, precios que
consideran caros. Tabla con fuente, fecha, cita, sentimiento y qué implica para FOOD360.
Cierra con tres oportunidades de posicionamiento. Guarda en inteligencia/food360-escucha-<AAAAMM>.md.
```

Variantes: SIG360 (software de sistema integrado de gestión ISO 9001/14001/45001 en
minería y construcción), TPM360 (mantenimiento productivo total), HOTEL360, SALUD360,
AGRO360, CATASTRO360, PMO360. Cambia el producto, el segmento y los competidores.

## 2. Inteligencia de competencia

**Canales:** Jina Reader (web), gh (GitHub), LinkedIn (login manual una vez).

```
Perfil de competencia para el servicio de auditoría MINTRA e implementación ISO de INNOVAQ.
Lee con Jina las webs de QUAMA Group, APSSOMA, Certificarte Perú, Huascarán Asesores,
CBZ Consultores y QHSE: servicios, precios si los publican, sectores, certificaciones
y promesa principal. En LinkedIn, tamaño de equipo y vacantes abiertas de cada una.
Tabla comparativa y tres huecos donde INNOVAQ puede diferenciarse. Guarda en
inteligencia/competencia-auditoria-mintra-<AAAAMM>.md.
```

## 3. Prospección para PANASUR y servicios SSOMA

**Canales:** LinkedIn (mcp-server-linkedin, login manual) + Exa.

```
Busca en LinkedIn empleos publicados en los últimos 30 días en Perú con los cargos
"supervisor SSOMA", "jefe de seguridad", "prevencionista de riesgos", "coordinador SST"
en minería y construcción. Para cada empresa: nombre, sector, ciudad, cuántas vacantes,
enlace. Una vacante de seguridad es señal de proyecto nuevo o de auditoría pendiente:
marca las que parezcan obras en arranque. Guarda en inteligencia/prospeccion-ssoma-<AAAAMM>.md.
```

## 4. Vigilancia normativa y sectorial

**Canales:** RSS (feedparser o el script incluido, sin login).

```bash
python3 .claude/skills/agent-reach/scripts/vigilancia_rss.py --hours 168 --out inteligencia/normativa-semana-<AAAAMMDD>.md
```

Fuentes por defecto: MTPE, SUNAFIL, MINEM, OSINERGMIN, INACAL y normas legales de
El Peruano. Palabras clave: SST, SUNAFIL, MINTRA, ISO 45001/9001/14001, minería,
construcción, Ley 29783, decretos, resoluciones, HACCP, catastro, agro. Para añadir
fuentes, un archivo con `Nombre | URL` por línea y `--feeds archivo.txt`.

Prompt para que Claude lo interprete:

```
Ejecuta el digest de vigilancia normativa de la última semana y resume en cinco líneas
qué afecta a clientes de minería y construcción, qué afecta a alimentos (FOOD360) y qué
debería entrar en la próxima capacitación de INNOVAQ. Marca cualquier plazo legal.
```

## 5. Monitoreo de marca (INNOVAQ, productos, PANASUR y Alvaro)

**Canales:** Exa + X + LinkedIn. En OpenClaw, `agent-reach watch` en tarea programada.

```
Busca menciones de la última semana de "INNOVAQ", "innovaqsolution", "SIG360", "ERP360",
"FOOD360", "TPM360", "PANASUR" y "Alvaro Ruiz INNOVAQ" en Exa, X y LinkedIn.
Separa: menciones propias, de terceros, y confusiones con otras empresas de nombre
parecido (Innova Solutions, Innovaq Edge, Innovai). Si hay reseñas o quejas, cítalas
textualmente con enlace. Si no hay nada nuevo, dilo en una línea y no inventes.
```

## 6. Videos → material propio

**Canales:** yt-dlp (YouTube, TikTok) sin login.

```
Descarga los subtítulos de <URL> con yt-dlp, transcribe, y prepara un brief de
lanzamiento para launch-kit: premisa, tres mensajes, y qué diría INNOVAQ distinto.
```

Para convertir el video en una skill del equipo, usa la skill `video-to-skill`.

## 7. Evidencia para decidir entrar a un sector

```
Antes de invertir en CATASTRO360: busca en Exa, Reddit y X qué dicen municipalidades
y consultores de catastro en Perú sobre COFOPRI, software catastral y sus problemas
(2025-2026). Quiero dolores reales con citas, no páginas de proveedores. Termina con
una recomendación: entrar, esperar o descartar, y por qué.
```

---

## Ritmo sugerido

| Frecuencia | Caso | Cómo |
|-----------|------|------|
| Semanal (lunes) | 4 + 5 | Digest RSS + monitoreo de marca; rutina programada |
| Mensual | 1 (un producto por mes) | Escucha social rotando la suite |
| Trimestral | 2 | Competencia de auditoría MINTRA e ISO |
| Antes de cada campaña | 6 | Videos y referencias para `launch-kit` |
| Antes de cada decisión de producto | 7 | Evidencia de sector |
