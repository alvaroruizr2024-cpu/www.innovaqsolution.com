# PRODUCT.md — INNOVAQ SOLUTIONS SAC

Verdad durable del producto para las herramientas de diseño (`/impeccable`, `/taste`,
skills de diseño). Aquí va lo que no cambia de una página a otra: quién es el cliente,
qué vendemos, con qué voz y con qué restricciones. Lo visual (colores, tipografía,
espaciado) vive en `DESIGN.md`.

## Qué es

INNOVAQ SOLUTIONS SAC es una consultora y casa de software de Trujillo, Perú.
Vende **capacitación especializada, auditoría MINTRA e implementación ISO** y una suite
de once productos SaaS "360" para sectores regulados. Tagline oficial:
*"Calidad Innovadora. Soluciones Prácticas."* Claim: *"Elevando Estándares en
Seguridad, Calidad y Cumplimiento Normativo."*

## Para quién

- Gerentes de SSOMA, calidad y operaciones en **minería, construcción, energía,
  agro, alimentos, salud, hotelería y sector público** del Perú.
- Empresas MYPE y medianas que necesitan cumplir normas (ISO 9001/14001/45001/37001,
  Annex SL, MINTRA, SUNAFIL) sin un departamento propio de cumplimiento.
- Compran por confianza técnica: el fundador es Auditor Líder ISO, Ingeniero
  Industrial CIP 210152 y MBA. Esa credencial aparece en la web y se respeta en el copy.

## Qué vendemos

| Producto | Sector / uso |
|----------|--------------|
| SIG 360° | Sistema integrado de gestión: 4 normas, 1 plataforma, Annex SL nativo |
| ERP 360 | ERP para MYPE y medianas |
| TPM360 / MTP360 | Mantenimiento productivo total |
| PMO360 | Oficina de proyectos |
| AGRO 360 | Agroindustria |
| FOOD 360 | Alimentos e inocuidad |
| HOTEL 360 | Hotelería |
| SALUD 360 | Salud |
| CATASTRO 360 | Sector público / catastro |
| MedCongress Pro | Eventos médicos |

El copy oficial de cada producto (nombre, sub, descripción ES/EN, planes y precios)
vive en el array `PRODUCTS` de `global/index.html`. Se lee de ahí, nunca de memoria.

## Superficies

1. **Showroom cinematográfico** (`index.html` → `cinematic/`): galería 3D de los once
   productos. Es la portada del dominio. Consultoría B2B, **sin precios**, CTA a WhatsApp.
2. **Suite / catálogo** (`global/index.html`): página bilingüe ES/EN con productos,
   planes, precios y enlaces de pago. Aquí sí hay precios y prueba gratis.
3. **Landings por producto** (`sig360/`, `ERP360/`, `TPM360/`, …): una carpeta por
   producto, HTML estático. Son las que más se benefician de las skills de diseño.
4. **Material de marca** (`brochures/`, `social-assets/`, `campaigns/`): PDF y piezas
   de redes generadas con la skill `launch-kit`.

## Voz

- Español de Perú, formal pero directo. Se habla de "usted" al cliente en formularios
  y de forma impersonal en titulares.
- Frases cortas con un dato concreto: "4 normas. 1 plataforma." funciona; "solución
  integral de clase mundial" no.
- Las credenciales técnicas (ISO, CIP, MBA, "único en Perú") son argumentos, no adorno.
- Inglés solo donde la página ya es bilingüe (`global/`); no mezclar idiomas en una
  misma frase.

## Restricciones

- **CTA principal: WhatsApp.** Número canónico según la marca: `+51 900 801 059`
  (`wa.me/51900801059`). El showroom todavía muestra `+51 939 521 784`; hasta que se
  unifique, cada página conserva el número que ya tiene y no se inventa un tercero.
- **Sin precios en el showroom.** Los precios solo aparecen en `global/` y salen de
  `PRODUCTS`. Los enlaces de Stripe de `global/` están en modo test.
- Sitio estático (GitHub Pages / Netlify). Nada que requiera servidor o build salvo
  el bundle ya compilado de `cinematic/`.
- Dominio: `https://www.innovaqsolution.com`. TikTok: `@innovaqsolutions`.
- Logo: `1000608638.jpg` (también `cinematic/logo.jpg`). Colores del logo = paleta.

## Evidencia

- Paleta canónica: objeto `B` en `global/index.html` y
  `.claude/skills/launch-kit/assets/brand-innovaq.json`.
- Tokens del showroom: variables CSS `--bg`, `--ink`, `--blue`, `--orange`, `--green`
  en `cinematic/assets/index-*.css`.
- Metadatos y descripción oficial: `<head>` de `index.html`.
