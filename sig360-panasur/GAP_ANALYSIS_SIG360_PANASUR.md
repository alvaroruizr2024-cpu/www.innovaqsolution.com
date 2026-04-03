# Análisis de Brechas — SIG 360° Tours Panasur E.I.R.L.

**Fecha:** 2026-04-03  
**Proyecto:** CSF Hanaqpampa — Central Solar Fotovoltaica, Moquegua  
**Cliente:** Tours Panasur E.I.R.L. (RUC: Transporte de Carga y Obras de Ingeniería)  
**Contratante:** ENGIE Energía Perú S.A.  
**Plataforma:** SIG 360° v8.0 — INNOVAQ SOLUTIONS SAC  
**Normas:** ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, ISO 37001:2016

---

## 1. Benchmark: Funcionalidades del Producto SIG 360°

Según el catálogo oficial (`brochures/SIG_360.pdf`) y la plataforma global (`global/index.html`), el producto SIG 360° ofrece **9 funcionalidades core**:

| # | Funcionalidad | Descripción |
|---|--------------|-------------|
| F1 | **Cumplimiento multi-norma ISO** | ISO 9001, 14001, 45001, 37001 unificados bajo Annex SL |
| F2 | **Control documentario** | Gestión de documentos, versiones, aprobaciones, distribución |
| F3 | **Gestión de auditorías** | Planificación, ejecución, hallazgos, seguimiento |
| F4 | **IPERC Dinámica** | Identificación de Peligros, Evaluación de Riesgos y Controles |
| F5 | **No conformidades** | Registro, seguimiento, acciones correctivas, cierre |
| F6 | **Evaluación de riesgos Bow-Tie** | Metodología Bow-Tie para análisis causal de riesgos |
| F7 | **Revisión por la dirección** | Informes de revisión gerencial del SIG |
| F8 | **Canal de denuncias E2EE** | Canal cifrado extremo a extremo (ISO 37001) |
| F9 | **84+ plantillas ISO** | Biblioteca de plantillas listas para usar |

**Funcionalidades de plataforma:** Soporte 24/7, SSL, actualizaciones, acceso API, SLA 99.9%, onboarding.

---

## 2. Estado Actual del Despliegue

### 2.1 Aplicación Web SPA

| Aspecto | Estado | Detalle |
|---------|--------|---------|
| URL | `innovaqsolution.com/sig360-panasur/` | Desplegada y accesible |
| Stack | React + Vite + Chart.js | Bundle `index-CnXdMCNj.js` (309 KB) |
| Módulos en UI | 9/9 funcionalidades | Dashboard, IPERC, Auditorías, Bow-Tie, NC, Canal Denuncias E2EE, Plantillas, Revisión, Capacitaciones |
| Exportación | PDF (jsPDF), Excel (xlsx) | Funcional |
| PWA | `manifest.json` presente | Instalable en dispositivos |
| Backend | **NO CONFIGURADO** | Datos demo hardcodeados en el bundle |

### 2.2 Módulo de Formación (100% operativo)

| Aspecto | Detalle |
|---------|---------|
| Inducción SSOMA | 15 secciones interactivas |
| Evaluación | 20 preguntas, 30 min, aprobación 14/20 |
| Certificados | Generación automática con firmas digitales |
| Plantel | 23 trabajadores configurados con DNI y cargo |
| Persistencia | `SHEET_URL = ''` — **NO CONFIGURADA** |

### 2.3 Documentación ISO

| Nivel | Cantidad | Archivos |
|-------|----------|----------|
| I — Política | 1 | TP-POL-SIG-001 |
| II — Procedimientos | 18 | SIG(5), SST(5), AMB(3), CAL(2), ADM(1), RRH(1), MAN(1) |
| III — Operativos | 31 | Matrices(6), PETs(15), Planes(5), Programas(5) |
| IV — Formatos/Registros | 25 | FOR(17), ACT(2), REG(2), INF(1), FOR-MAN(2), FOR-RRH(1) |
| **Total** | **75 plantillas** | de **84+ requeridas** |

**Documentos faltantes** (referenciados en `SINCRONIZAR_CON_DRIVE.md`):
- `TP-MAN-SIG-001` — Manual del SIG v2.0
- `TP-MAT-SST-001` — IPERC Línea Base
- `TP-MAT-SST-002` — IPERC Cerro Verde
- `TP-MAT-AMB-001` — Matriz IAIA (Identificación de Aspectos e Impactos Ambientales)

**Documentos adicionales necesarios** para alcanzar 84+:
- `TP-FOR-SST-011` — Formato Permiso de Trabajo
- `TP-FOR-SST-012` — Formato ATS (Análisis de Trabajo Seguro)
- `TP-FOR-CAL-001` — Formato Control de Calidad de Obra
- `TP-FOR-AMB-003` — Formato Gestión de Residuos
- `TP-REG-SST-003` — Registro de Estadísticas SST

---

## 3. Análisis de Brechas por Funcionalidad

| # | Funcionalidad | Frontend | Docs | Backend | % Operativo | Estado |
|---|--------------|:--------:|:----:|:-------:|:-----------:|--------|
| F1 | Multi-norma ISO | OK | Parcial | Demo | **75%** | ISO 37001 sin docs específicos; datos demo |
| F2 | Control documentario | OK | 75 docs | Sin backend | **60%** | Docs DOCX estáticos, sin versionado digital |
| F3 | Gestión auditorías | OK | OK | Demo | **50%** | Sin auditorías reales de Panasur registradas |
| F4 | IPERC Dinámica | OK | Parcial | Demo | **55%** | Falta IPERC LB y CV en docs; datos demo en SPA |
| F5 | No conformidades | OK | OK | Demo | **45%** | Sin NC reales registradas |
| F6 | Bow-Tie | OK | NO | Demo | **40%** | Sin escenarios Bow-Tie de Panasur |
| F7 | Revisión dirección | OK | OK | Demo | **50%** | Sin revisiones reales |
| F8 | Canal denuncias E2EE | OK | NO | Demo | **35%** | UI completa pero sin backend real |
| F9 | 84+ plantillas | Parcial | 75/84 | N/A | **89%** | Faltan 9 plantillas |

### Resumen de Avance

| Componente | Avance | Observación |
|-----------|:------:|-------------|
| Frontend SPA | **95%** | Todos los módulos compilados y funcionales |
| Formación/Inducción | **95%** | Contenido completo y operativo |
| Evaluación | **80%** | Funcional, sin persistencia de datos |
| Documentación ISO | **89%** | 75 de 84+ plantillas |
| Backend/Persistencia | **10%** | No hay BD ni API configurada |
| Datos reales Panasur | **15%** | Solo plantel en formación es real |
| Integraciones | **5%** | Google Sheets vacío, sin Supabase |

### Avance ponderado global: **~55%**

---

## 4. Brechas Críticas

### BRECHA 1 — Sin backend ni persistencia (CRÍTICA)

**Impacto:** Todos los módulos operan con datos demo. Registros de auditorías, NC, IPERC, denuncias se pierden al refrescar la página.

**Acción:** Configurar Supabase como backend con tablas para cada módulo, o implementar Google Apps Script como alternativa ligera.

### BRECHA 2 — Evaluaciones sin registro (ALTA)

**Impacto:** Los resultados de evaluaciones de inducción de los 23 trabajadores no se almacenan. Incumple requisito de evidencia formativa para ENGIE.

**Archivo:** `formacion/evaluacion.html` — variable `SHEET_URL = ''`

**Acción:** Crear Google Sheet + Apps Script Web App y configurar la URL.

### BRECHA 3 — Datos demo en toda la plataforma (ALTA)

**Impacto:** Dashboard, IPERC, auditorías y NC muestran información ficticia de un proyecto genérico de construcción.

**Acción:** Cargar datos reales del proyecto CSF Hanaqpampa: IPERC de rutas, inspecciones, NC, auditorías programadas 2026.

### BRECHA 4 — Control documentario solo offline (MEDIA)

**Impacto:** Los 75 docs DOCX existen como archivos estáticos sin workflow de aprobación, versionado ni distribución controlada.

**Acción:** Sincronizar con Google Drive + integrar catálogo en el módulo de Control Documentario del SPA.

### BRECHA 5 — Plantillas faltantes (MEDIA)

**Impacto:** 75 de 84+ plantillas disponibles. Faltan 9 documentos.

**Acción:** Crear los 9 documentos faltantes (ver listado en sección 2.3).

### BRECHA 6 — Canal de denuncias sin backend (MEDIA)

**Impacto:** La interfaz E2EE existe pero las denuncias no se envían ni almacenan.

**Acción:** Conectar con Supabase (RLS + cifrado) o servicio dedicado.

### BRECHA 7 — Bow-Tie sin escenarios Panasur (BAJA)

**Impacto:** Módulo funcional con datos genéricos.

**Acción:** Crear análisis Bow-Tie para: volcadura de transporte, caída de altura, exposición MATPEL.

---

## 5. Plan de Acción — 5 Fases para Despliegue 100%

### Fase 1: Persistencia Inmediata (Semana 1-2) — CRÍTICA

| # | Acción | Responsable |
|---|--------|------------|
| 1.1 | Configurar Google Sheets para evaluaciones | Dev |
| 1.2 | Crear proyecto Supabase con tablas (auditorías, NC, IPERC, denuncias, inspecciones) | Dev |
| 1.3 | Conectar SPA con Supabase (reemplazar demo data) | Dev |

### Fase 2: Datos Reales Panasur (Semana 2-3) — ALTA

| # | Acción | Responsable |
|---|--------|------------|
| 2.1 | Cargar IPERC Línea Base y Continuo de Hanaqpampa | SST + Dev |
| 2.2 | Registrar auditorías programadas 2026 | SIG |
| 2.3 | Registrar inspecciones y hallazgos reales | SST |
| 2.4 | Personalizar KPIs: IF < 1.0, IG < 50, 100% cumplimiento | Gerencia |
| 2.5 | Completar perfiles de 23 trabajadores con competencias | RRHH |

### Fase 3: Documentación Completa (Semana 3-4) — MEDIA

| # | Acción | Responsable |
|---|--------|------------|
| 3.1 | Crear 9 plantillas faltantes | SIG + Dev |
| 3.2 | Sincronizar estructura completa con Google Drive | Dev |
| 3.3 | Integrar catálogo de docs en módulo Control Documentario | Dev |

### Fase 4: Módulos Especializados (Semana 4-5) — MEDIA

| # | Acción | Responsable |
|---|--------|------------|
| 4.1 | Crear 3 análisis Bow-Tie específicos de Panasur | SST |
| 4.2 | Activar backend del canal de denuncias | Dev |
| 4.3 | Generar primer informe de Revisión por Dirección Q1 2026 | Gerencia + SIG |

### Fase 5: Go-Live y Validación (Semana 5-6) — ALTA

| # | Acción | Responsable |
|---|--------|------------|
| 5.1 | Pruebas end-to-end de todos los módulos | Dev + QA |
| 5.2 | Capacitación a 23 trabajadores + gerencia | Instructor SST |
| 5.3 | Validación cruzada con `HSEQ_Homologacion_Engie_v2.docx` | SIG |
| 5.4 | Certificación de despliegue y conformidad del cliente | Gerencia |

---

## 6. Criterios de Aceptación — Despliegue 100%

- [ ] Todas las evaluaciones de inducción registradas en Google Sheets
- [ ] Supabase operativo con datos reales de Panasur en todos los módulos
- [ ] 84+ plantillas ISO disponibles en `/docs/`
- [ ] Dashboard mostrando KPIs reales del proyecto Hanaqpampa
- [ ] Al menos 1 auditoría interna registrada en plataforma
- [ ] Al menos 1 ciclo completo de NC (registro → acción correctiva → cierre)
- [ ] IPERC Línea Base cargado con riesgos reales del proyecto
- [ ] Canal de denuncias funcional con backend activo
- [ ] 3 escenarios Bow-Tie específicos de Panasur configurados
- [ ] Primer informe de Revisión por Dirección generado
- [ ] Estructura de docs sincronizada con Google Drive
- [ ] 100% de checklist ENGIE homologación cubierto
- [ ] Capacitación completada para los 23 trabajadores

---

*Documento generado por INNOVAQ SOLUTIONS SAC — SIG 360° v8.0*
