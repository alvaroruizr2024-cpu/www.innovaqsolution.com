---
name: apify-leads
description: Consigue clientes potenciales ("clientes ilimitados") de cualquier parte de Internet con Apify conectado a Claude, y opcionalmente redacta el primer contacto a cada uno. Úsala SIEMPRE que el usuario pida "sácame N <negocios> de <ciudad>", "consígueme clientes", "lista de leads", "prospectos", "base de datos de restaurantes/clínicas/hoteles/dentistas", "scrapea Google Maps / LinkedIn / Instagram / Facebook", "teléfonos y correos de…", "Apify", "conéctate a Apify", "mándales un correo a cada uno", o cualquier prospección comercial para INNOVAQ (SIG360, ERP360, TPM360, MTP360, PMO360, AGRO360, FOOD360, HOTEL360, SALUD360, CATASTRO360, MedCongress) o PANASUR. Use for any lead generation, business list scraping or cold outreach request.
---

# Apify Leads — clientes ilimitados de cualquier parte de Internet

Esta skill nace de un video (TikTok de @revolutia.ai, "Clientes ilimitados"): Claude
conectado a Apify saca listas de clientes potenciales de Google Maps, LinkedIn,
Instagram o Facebook. Le dices *"sácame 50 dentistas de Madrid con sus teléfonos,
correos y contactos"* y en menos de cinco minutos tienes la lista completa; luego, si
quieres, Claude les manda un correo a cada uno.

Aquí lo reproducimos con lo que hay en cada entorno y con la suite de INNOVAQ como
razón para contactar. El valor no está en scrapear: está en **una lista limpia, del
segmento correcto, con un motivo de contacto que le importe al que la recibe**.

Guion original y lo que se ve en pantalla: `references/origen.md`.

---

## 0. Qué hay antes de empezar

**Apify.** Es la herramienta que ya está hecha para sacar datos de cualquier sitio. Se
entra en <https://apify.com>, plan *Gratis* ($0, con crédito mensual para probar) o
*Motor de arranque* ($29/mes). El token está en *Settings → Integrations → API tokens*.
Guárdalo como variable de entorno `APIFY_TOKEN`; nunca lo pegues en un archivo del repo.

**Dos formas de "conectar Apify a Claude".**

| Entorno                       | Cómo                                                                  |
|-------------------------------|-----------------------------------------------------------------------|
| claude.ai / Cowork            | Conector MCP de Apify (`https://mcp.apify.com`) desde *Ajustes → Conectores* |
| Claude Code (este repo)       | `scripts/apify_leads.py` contra la API REST de Apify con `APIFY_TOKEN` |

Si no hay token ni conector, dilo antes de prometer una lista. No inventes leads ni
"ejemplos representativos": una lista falsa es peor que ninguna.

**Qué actor usar según dónde están los clientes** (detalle en `references/actores.md`):

| Si le vendes a…                          | Plataforma   | Actor de Apify                        |
|------------------------------------------|--------------|---------------------------------------|
| Negocios locales (clínicas, restaurantes, hoteles, fundos) | Google Maps | `compass/crawler-google-places` |
| Empresas y cargos (gerentes SSOMA, CFO, jefes de planta)   | LinkedIn    | `curious_coder/linkedin-people-search-scraper` o similar |
| Marcas y creadores                        | Instagram    | `apify/instagram-scraper`             |
| Páginas y grupos                          | Facebook     | `apify/facebook-pages-scraper`        |

**Producto y segmento.** Antes de buscar, decide qué producto de la suite le sirve al
segmento; la tabla está en `references/segmentos-innovaq.md` y el copy oficial de cada
producto (nombre, descripción, planes y precios) en el array `PRODUCTS` de
`global/index.html:158`. Los precios salen de ahí, no de la memoria.

---

## 1. Flujo

### Paso 1 — El pedido en una línea

Deja escrito (y muestra al usuario) el pedido en esta forma. Si falta un dato,
pregúntalo solo si cambia el resultado; si no, asume y decláralo.

```
Segmento:   <dentistas | restaurantes | hoteles | fundos agroexportadores | …>
Lugar:      <ciudad o zona; para Google Maps sirve "Lima, Perú" o "Miraflores, Lima">
Cantidad:   <N; empieza con 50, sube cuando la lista salga limpia>
Campos:     nombre, teléfono, correo, web, dirección, rating, reseñas, redes
Producto:   <de references/segmentos-innovaq.md>
Salida:     leads/<slug>-<AAAAMMDD>.csv (+ .json crudo)
```

Ejemplo del video: *"50 dentistas de Madrid con sus teléfonos, correos y contactos"* →
segmento `dentistas`, lugar `Madrid, España`, N `50`, producto `SALUD360`.

### Paso 2 — Sacar la lista

**Claude Code:**

```bash
python3 .claude/skills/apify-leads/scripts/apify_leads.py run \
  --query "dentista" --location "Madrid, España" --max 50 \
  --out leads/dentistas-madrid-20260919
```

El script lanza el actor de Google Maps, espera a que termine, descarga el dataset y
escribe `…json` (crudo) y `…csv` (normalizado: `nombre, categoria, telefono, correo,
web, direccion, ciudad, rating, resenas, instagram, facebook, linkedin, maps_url`).
Con `--actor` y `--input-json` sirve para cualquier otro actor; con `fetch --run-id`
recupera un run ya hecho; con `normalize --json` convierte un dataset descargado a mano.

**claude.ai con el conector:** pide al conector que ejecute el actor con el input de
`references/actores.md`, espera el dataset y pásalo al paso 3.

Los correos salen del sitio web de cada negocio (opción de enriquecimiento de contactos
del actor). Muchos negocios locales no publican correo: es normal que el 40–60 % de la
lista traiga solo teléfono. No rellenes los vacíos.

### Paso 3 — Limpiar antes de entregar

Una lista de 50 con 10 duplicados no es una lista de 50. Revisa exactamente esto:

- Duplicados por teléfono o por web (misma clínica con dos fichas).
- Fichas cerradas o sin teléfono ni web: fuera, salvo que el usuario las quiera.
- Correos genéricos de plataformas (`@sentry.io`, `@wixpress.com`, `noreply@`): fuera.
- Teléfonos en formato internacional (`+51 …`, `+34 …`).
- Rating y número de reseñas: sirven para priorizar (un negocio con 300 reseñas y 4.8
  tiene más volumen y más que perder sin sistema; uno con 3 reseñas, menos).

Entrega el CSV, el conteo real (`N con teléfono / N con correo / N con web`) y las tres
primeras filas como muestra.

### Paso 4 — Contactar (solo si el usuario lo pide)

El video termina con *"dile a Claude que les mande un correo a cada uno"*. Se hace en
dos tiempos, nunca en uno:

1. **Redactar.** Un correo por lead con la plantilla de `assets/outreach-template.md`:
   asunto de 6 palabras, un dato del negocio que demuestre que no es masivo (barrio,
   rating, especialidad), el producto de la suite que le corresponde y una sola llamada
   a la acción (demo de 20 minutos). Muéstrale al usuario tres correos completos antes
   de generar el resto.
2. **Enviar.** Solo con un "sí" explícito del usuario a esos tres. Primero como
   borradores (Gmail `create_draft`), en tandas de 20 al día como máximo, con nombre y
   empresa reales del remitente y una línea de baja ("responde BAJA y no volvemos a
   escribir"). Un envío masivo es una acción difícil de deshacer: si hay duda, se queda
   en borradores.

Prospección B2B a datos publicados por el propio negocio es legítima; aun así aplica
la Ley 29733 (Perú) o el RGPD (España): motivo comercial claro, identidad del
remitente, baja en un clic, y nada de reventa de la lista.

### Paso 5 — Guardar

```
leads/
└── <segmento>-<ciudad>-<AAAAMMDD>/
    ├── pedido.md          # el pedido del paso 1
    ├── leads.json         # dataset crudo de Apify
    ├── leads.csv          # lista normalizada y limpia
    └── correos/           # (si hubo paso 4) un .md por lead
```

`leads/` está en el `.gitignore` de la raíz del repo: son datos personales y no van al
repositorio público. Si el usuario quiere versionarlos, que lo diga.

---

## 2. Modo automático

Solo cuando el usuario lo pida explícitamente: una rutina semanal (`create_trigger`,
sesión nueva por disparo) que corre el paso 2 y 3 para un segmento y ciudad fijos, deja
el CSV en la carpeta de leads y avisa con el conteo. Nunca automatices el paso 4: los
correos siempre pasan por el usuario. Muestra el prompt y el horario y espera el visto
bueno; convierte la hora local (Perú, UTC-5) a UTC en el cron.

---

## 3. Errores que ya conocemos

- **Pedir 500 de golpe.** Cada lugar cuesta crédito de Apify; 50 primero, mira la
  calidad, luego sube. El plan gratis alcanza para varios cientos al mes.
- **Buscar "clínicas" en una ciudad entera.** Google Maps devuelve máximo ~120 por
  búsqueda; para más, divide por distritos (Miraflores, San Isidro, Surco…).
- **Confiar en el correo del scraping.** Verifica dominio contra la web del negocio
  antes de escribir; un correo rebotado quema el dominio del remitente.
- **Un mismo correo para todos.** Es spam y se nota. La plantilla tiene tres huecos
  obligatorios por lead.
- **Pegar el token en el chat, el script o el commit.** Va en `APIFY_TOKEN`.
- **Prometer la lista sin token.** Sin acceso a Apify no hay lista. Dilo primero.

## Referencias

- `references/origen.md` — guion del video y lo que se ve en pantalla.
- `references/actores.md` — actores de Apify por plataforma, input recomendado y costes.
- `references/segmentos-innovaq.md` — qué producto ofrecer a cada segmento y qué buscar.
- `assets/outreach-template.md` — plantilla del primer correo y del seguimiento.
- `scripts/apify_leads.py` — lanzar actor, descargar dataset y normalizar a CSV.
