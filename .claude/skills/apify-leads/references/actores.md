# Actores de Apify por plataforma

Un *actor* es un scraper listo en la Apify Store. Se ejecuta con un JSON de entrada y
deja los resultados en un *dataset* que se descarga como JSON o CSV. Todos se lanzan
igual: `POST https://api.apify.com/v2/acts/<usuario>~<actor>/runs?token=$APIFY_TOKEN`.

> Los nombres de campo de entrada de esta página se escribieron sin acceso a la red
> (apify.com está bloqueado en el entorno donde se creó la skill). Antes de la primera
> ejecución, abre la pestaña *Input* del actor en la Store y confirma los nombres; si
> alguno cambió, corrige `scripts/apify_leads.py` (función `google_maps_input`) y esta
> tabla.

## Google Maps — negocios locales

**Actor:** `compass/crawler-google-places` (Google Maps Scraper, 4.8 ★, ~370 K usuarios).
Es el que aparece en el video. Coste orientativo: por lugar extraído, más un extra si se
activa el enriquecimiento de contactos; 50 lugares caben de sobra en el crédito gratis.

Input recomendado:

```json
{
  "searchStringsArray": ["dentista"],
  "locationQuery": "Madrid, España",
  "maxCrawledPlacesPerSearch": 50,
  "language": "es",
  "skipClosedPlaces": true,
  "scrapeContacts": true,
  "website": "allPlaces",
  "maxReviews": 0,
  "maxImages": 0
}
```

- `searchStringsArray`: lo que escribirías en el buscador de Maps. Varias búsquedas en
  la misma ciudad = varios elementos.
- `locationQuery`: ciudad, distrito o "ciudad, país". Para más de ~120 resultados,
  divide por distritos y lanza varias veces.
- `scrapeContacts`: entra a la web de cada negocio y saca correos y redes. Es lo que
  convierte "teléfonos" en "teléfonos, correos y contactos".
- `website`: `allPlaces` | `withWebsite` | `withoutWebsite`. Si solo quieres los que
  pueden tener correo, `withWebsite`.
- `maxReviews` y `maxImages` en 0: no pagues por lo que no vas a usar.

Campos útiles de salida: `title`, `categoryName`, `phone`, `phoneUnformatted`,
`emails[]`, `website`, `address`, `city`, `postalCode`, `totalScore`, `reviewsCount`,
`instagrams[]`, `facebooks[]`, `linkedIns[]`, `url` (ficha de Maps), `placeId`,
`permanentlyClosed`, `temporarilyClosed`.

## LinkedIn — empresas y cargos

Para vender a empresas (SIG360 a un gerente SSOMA, ERP360 a un CFO, TPM360 a un jefe
de mantenimiento). Hay varios actores en la Store; busca "linkedin people search" o
"linkedin company" y elige el mejor valorado y con actividad reciente
(`curious_coder/linkedin-people-search-scraper` era una opción vigente). Suelen pedir
cookies de sesión de LinkedIn: úsalas solo con la cuenta del usuario y bajo su cuenta de
Apify. Input típico: cargo, empresa o sector, ubicación, cantidad.

Salida esperada: nombre, cargo, empresa, ubicación, URL del perfil; el correo
directo rara vez viene y no debe adivinarse.

## Instagram — marcas y creadores

**Actor:** `apify/instagram-scraper` (oficial). Sirve para perfiles por hashtag o
búsqueda (p. ej. `#restauranteslima`, `#clinicadental`). Salida: usuario, nombre,
biografía, seguidores, correo público de la bio si existe, web.

## Facebook — páginas y grupos

**Actor:** `apify/facebook-pages-scraper` (oficial). Input: URLs de páginas o
búsqueda; salida: nombre, categoría, teléfono, correo, web, dirección, likes.

## Cómo se lanza cualquiera (API REST)

```
POST   /v2/acts/{usuario}~{actor}/runs?token=…        → { data: { id, defaultDatasetId, status } }
GET    /v2/actor-runs/{runId}?token=…                  → status: READY | RUNNING | SUCCEEDED | FAILED | ABORTED
GET    /v2/datasets/{datasetId}/items?token=…&format=json&clean=true
```

`scripts/apify_leads.py` hace exactamente estas tres llamadas; con `--actor` y
`--input-json` funciona con cualquier actor de la tabla.

## Precios (los del video, septiembre 2026)

| Plan               | Precio  | Incluye                                                   |
|--------------------|---------|-----------------------------------------------------------|
| Gratis             | $0/mes  | crédito mensual para la Store o actores propios, comunidad |
| Motor de arranque  | $29/mes | $29 de crédito en la Store, soporte por chat, descuento Bronce |

Empieza con el gratis. Sube cuando una lista limpia de 50 ya convirtió en reuniones.
