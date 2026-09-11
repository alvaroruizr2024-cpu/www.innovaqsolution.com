export const BRAND = {
  blue: '#126695',
  orange: '#F1912B',
  green: '#7AB648',
  wa: '#25D366',
}

export const COMPANY = {
  name: 'INNOVAQ SOLUTIONS SAC',
  ruc: '20606205105',
  city: 'Trujillo, La Libertad, Perú',
  phone: '+51 939 521 784',
  waDigits: '51939521784',
  email: 'contacto@innovaqsolution.com',
  portal: 'https://www.innovaqsolution.com/global',
  slogan: {
    es: 'Calidad Innovadora. Soluciones Prácticas.',
    en: 'Innovative Quality. Practical Solutions.',
  },
}

export const PRODUCTS = [
  {
    code: 'SIG360',
    name: 'SIG 360°',
    color: BRAND.green,
    accent: '#c8f08a',
    shape: 'shield',
    sub: { en: 'Integrated Management System', es: 'Sistema Integrado de Gestión' },
    desc: {
      en: 'ISO 9001, 14001, 45001, 37001 unified under Annex SL. The only platform in Peru integrating 4 standards.',
      es: 'ISO 9001, 14001, 45001, 37001 unificados bajo Annex SL. Única plataforma en Perú que integra 4 normas.',
    },
    features: {
      en: ['Multi-standard ISO compliance', 'Document control', 'Audit management', 'IPERC Dynamic', 'Bow-Tie risk', 'E2EE compliance channel', '84+ ISO templates'],
      es: ['Cumplimiento multi-norma ISO', 'Control documentario', 'Gestión de auditorías', 'IPERC Dinámica', 'Riesgos Bow-Tie', 'Canal de denuncias E2EE', '84+ plantillas ISO'],
    },
  },
  {
    code: 'ERP360',
    name: 'ERP 360',
    alias: 'SumaERP',
    color: BRAND.orange,
    accent: '#ffd19a',
    shape: 'stack',
    sub: { en: 'Enterprise Resource Planning', es: 'SumaERP — Planificación de Recursos' },
    desc: {
      en: 'Complete ERP with SUNAT e-invoicing, foreign trade with Landed Cost, Peruvian HR and CFO Cockpit.',
      es: 'ERP completo con facturación SUNAT, ComEx con Landed Cost, RRHH peruano y CFO Cockpit.',
    },
    features: {
      en: ['SUNAT e-invoicing', 'Foreign trade & Landed Cost', 'Accounting PCGE/IFRS', 'HR & Peruvian payroll', 'Tax engine', 'CFO Cockpit', 'Multi-currency'],
      es: ['Facturación electrónica SUNAT', 'ComEx y Landed Cost', 'Contabilidad PCGE/NIIF', 'RRHH y planilla peruana', 'Motor tributario', 'CFO Cockpit', 'Multi-moneda'],
    },
  },
  {
    code: 'TPM360',
    name: 'TPM360',
    color: BRAND.blue,
    accent: '#8fd4f2',
    shape: 'gears',
    sub: { en: 'Total Productive Maintenance', es: 'Mantenimiento Productivo Total' },
    desc: {
      en: 'Predictive maintenance with AI, equipment lifecycle management and mobile inspections.',
      es: 'Mantenimiento predictivo con IA, gestión del ciclo de vida de equipos e inspecciones móviles.',
    },
    features: {
      en: ['Equipment lifecycle', 'Predictive AI', 'KPI dashboards', 'Mobile inspections', 'CMMS integration', 'Work orders'],
      es: ['Ciclo de vida de equipos', 'IA predictiva', 'Dashboards de KPIs', 'Inspecciones móviles', 'Integración CMMS', 'Órdenes de trabajo'],
    },
  },
  {
    code: 'MTP360',
    name: 'MTP360',
    color: '#7c3aed',
    accent: '#d8b4fe',
    shape: 'book',
    sub: { en: 'Master Training Plan', es: 'Plan Maestro de Capacitación' },
    desc: {
      en: 'Training and competency management for regulated industries with ICAM and BowTie methodologies.',
      es: 'Gestión de capacitación y competencias con metodologías ICAM y BowTie para industrias reguladas.',
    },
    features: {
      en: ['Competency matrix', 'Training scheduling', 'Certification tracking', 'Compliance reports', 'E-learning', 'Gap analysis'],
      es: ['Matriz de competencias', 'Programación de capacitaciones', 'Seguimiento de certificaciones', 'Reportes de cumplimiento', 'E-learning', 'Análisis de brechas'],
    },
  },
  {
    code: 'PMO360',
    name: 'PMO360',
    color: '#2563eb',
    accent: '#93c5fd',
    shape: 'bars',
    sub: { en: 'PMO Value Delivery System', es: 'Sistema de Entrega de Valor PMO' },
    desc: {
      en: 'Project portfolio management with value delivery tracking, resource optimization and real-time dashboards.',
      es: 'Gestión de portafolio de proyectos con seguimiento de entrega de valor, optimización de recursos y dashboards en tiempo real.',
    },
    features: {
      en: ['Project portfolio', 'Value delivery tracking', 'Resource optimization', 'Gantt & dashboards', 'Risk management', 'Stakeholder reports'],
      es: ['Portafolio de proyectos', 'Seguimiento de entrega de valor', 'Optimización de recursos', 'Gantt y dashboards', 'Gestión de riesgos', 'Reportes a stakeholders'],
    },
  },
  {
    code: 'AGRO360',
    name: 'AGRO 360',
    color: '#16a34a',
    accent: '#bbf7d0',
    shape: 'plant',
    sub: { en: 'Agroindustrial Management', es: 'Gestión Agroindustrial Integral' },
    desc: {
      en: 'Complete agroindustrial ERP with crop traceability, harvest management, field IoT and SENASA compliance.',
      es: 'ERP agroindustrial completo con trazabilidad de cultivos, gestión de cosecha, IoT de campo y cumplimiento SENASA.',
    },
    features: {
      en: ['Crop traceability', 'Harvest management', 'Field IoT sensors', 'SENASA compliance', 'Cost per hectare', 'Export certifications'],
      es: ['Trazabilidad de cultivos', 'Gestión de cosecha', 'Sensores IoT de campo', 'Cumplimiento SENASA', 'Costo por hectárea', 'Certificaciones de exportación'],
    },
  },
  {
    code: 'FOOD360',
    name: 'FOOD 360',
    color: '#ea580c',
    accent: '#fdba74',
    shape: 'plate',
    sub: { en: 'Food & Beverage ERP', es: 'ERP Alimentos y Bebidas' },
    desc: {
      en: 'Integrated ERP for food industry with recipe costing, inventory, traceability and HACCP/BRC compliance.',
      es: 'ERP integral para industria alimentaria con costeo de recetas, inventario, trazabilidad y cumplimiento HACCP/BRC.',
    },
    features: {
      en: ['Recipe costing (BOM)', 'Lot traceability', 'HACCP/BRC compliance', 'Quality control', 'Production planning', 'Expiry management'],
      es: ['Costeo de recetas (escandallos)', 'Trazabilidad por lote', 'Cumplimiento HACCP/BRC', 'Control de calidad', 'Planificación de producción', 'Gestión de vencimientos'],
    },
  },
  {
    code: 'HOTEL360',
    name: 'HOTEL 360',
    color: '#0891b2',
    accent: '#a5f3fc',
    shape: 'tower',
    sub: { en: 'Smart Hospitality ERP', es: 'ERP Hotelero Inteligente' },
    desc: {
      en: 'Complete hotel management with PMS, revenue management, channel manager and guest experience AI.',
      es: 'Gestión hotelera completa con PMS, revenue management, channel manager e IA de experiencia del huésped.',
    },
    features: {
      en: ['PMS & reservations', 'Revenue management', 'Channel manager', 'Guest experience AI', 'Housekeeping module', 'F&B integration'],
      es: ['PMS y reservas', 'Revenue management', 'Channel manager', 'IA de experiencia del huésped', 'Módulo housekeeping', 'Integración A&B'],
    },
  },
  {
    code: 'SALUD360',
    name: 'SALUD 360',
    color: '#dc2626',
    accent: '#fecaca',
    shape: 'cross',
    sub: { en: 'Clinical ERP with AI', es: 'ERP Clínico con IA' },
    desc: {
      en: 'Healthcare management platform with AI-powered clinical records, appointment scheduling and MINSA compliance.',
      es: 'Plataforma de gestión de salud con historias clínicas potenciadas por IA, agenda de citas y cumplimiento MINSA.',
    },
    features: {
      en: ['AI clinical records', 'Appointment scheduling', 'MINSA compliance', 'Lab integration', 'Pharmacy module', 'Telemedicine'],
      es: ['Historias clínicas con IA', 'Agenda de citas', 'Cumplimiento MINSA', 'Integración de laboratorio', 'Módulo de farmacia', 'Telemedicina'],
    },
  },
  {
    code: 'CATASTRO360',
    name: 'CATASTRO 360',
    color: '#7c3aed',
    accent: '#ddd6fe',
    shape: 'city',
    sub: { en: 'AI Cadastral Management', es: 'Gestión Catastral con IA' },
    desc: {
      en: 'Cadastral management platform with AI-powered property valuation, GIS integration and tax assessment.',
      es: 'Plataforma de gestión catastral con valoración predial potenciada por IA, integración GIS y tributación.',
    },
    features: {
      en: ['AI property valuation', 'GIS integration', 'Tax assessment', 'Property registry', 'Urban planning', 'Inspection module'],
      es: ['Valoración predial con IA', 'Integración GIS', 'Tributación predial', 'Registro de propiedades', 'Planificación urbana', 'Módulo de inspección'],
    },
  },
  {
    code: 'MEDCONGRESS',
    name: 'MedCongress Pro',
    color: '#9333ea',
    accent: '#e9d5ff',
    shape: 'mic',
    sub: { en: 'Medical Congress Manager', es: 'Gestor de Congresos Médicos' },
    desc: {
      en: 'Complete platform for medical congress management with registration, QR accreditation and speaker coordination.',
      es: 'Plataforma completa para gestión de congresos médicos con registro, acreditación QR y coordinación de ponentes.',
    },
    features: {
      en: ['Event registration', 'QR accreditation', 'Speaker management', 'Session scheduling', 'Attendee analytics', 'Certificate generation'],
      es: ['Registro de eventos', 'Acreditación QR', 'Gestión de ponentes', 'Programación de sesiones', 'Analítica de asistentes', 'Generación de certificados'],
    },
  },
]

export const SERVICES = [
  {
    title: { en: 'ISO Implementation', es: 'Implementación ISO' },
    desc: {
      en: 'Full implementation of ISO 9001, 14001, 45001 and 37001 with Annex SL integration.',
      es: 'Implementación integral de normas ISO 9001, 14001, 45001 y 37001 con integración Annex SL.',
    },
    items: {
      en: ['ISO 9001 Quality', 'ISO 14001 Environmental', 'ISO 45001 Safety (Law 29783)', 'ISO 37001 Anti-Bribery (Law 30424)'],
      es: ['ISO 9001 Calidad', 'ISO 14001 Medio Ambiente', 'ISO 45001 Seguridad (Ley 29783)', 'ISO 37001 Antisoborno (Ley 30424)'],
    },
  },
  {
    title: { en: 'MINTRA Audits', es: 'Auditorías MINTRA' },
    desc: {
      en: 'Legal audits under Law 29783 with SUNAFIL validity. 500+ accredited audit hours.',
      es: 'Auditorías legales bajo Ley 29783 con validez SUNAFIL. +500 horas de auditoría acreditadas.',
    },
    items: {
      en: ['First & second party audits', 'SUNAFIL inspection readiness', '500+ accredited hours', 'Legal compliance reports'],
      es: ['Auditorías 1ra y 2da parte', 'Preparación inspección SUNAFIL', '+500 horas acreditadas', 'Informes de cumplimiento legal'],
    },
  },
  {
    title: { en: 'Specialized Training', es: 'Capacitación Especializada' },
    desc: {
      en: 'World-class methodologies: ICAM, BowTie, High-Risk Work for mining and industrial operations.',
      es: 'Metodologías de clase mundial: ICAM, BowTie, Trabajos de Alto Riesgo para minería e industria.',
    },
    items: {
      en: ['ICAM Incident Investigation', 'BowTie Risk Management', 'High-Risk Work', 'ISO Lead Auditor courses'],
      es: ['Investigación ICAM', 'Gestión de Riesgos BowTie', 'Trabajos de Alto Riesgo', 'Cursos Auditor Líder ISO'],
    },
  },
  {
    title: { en: 'Custom Software', es: 'Software a Medida' },
    desc: {
      en: 'React/Full-Stack applications, APIs, Supabase integration and Progressive Web Apps.',
      es: 'Aplicaciones React/Full-Stack, APIs, integración Supabase y Progressive Web Apps.',
    },
    items: {
      en: ['React / Full-Stack apps', 'APIs & microservices', 'Supabase / Cloud', 'Progressive Web Apps'],
      es: ['Aplicaciones React/Full-Stack', 'APIs y microservicios', 'Supabase / Cloud', 'Progressive Web Apps'],
    },
  },
  {
    title: { en: 'AI Automation', es: 'Automatización con IA' },
    desc: {
      en: 'AI integration in operational and management processes for predictive analysis.',
      es: 'Integración de IA en procesos operativos y de gestión para análisis predictivo.',
    },
    items: {
      en: ['Shadow AI audits', 'Predictive financial analysis', 'Document auto-classification', 'Corporate chatbots'],
      es: ['Auditorías Shadow AI', 'Análisis predictivo financiero', 'Clasificación documental automática', 'Chatbots corporativos'],
    },
  },
  {
    title: { en: 'Training & Support', es: 'Capacitación & Soporte' },
    desc: {
      en: 'Onboarding programs, manuals, video tutorials and guaranteed SLA support.',
      es: 'Programas de onboarding, manuales, video-tutoriales y soporte con SLA garantizado.',
    },
    items: {
      en: ['Personalized onboarding', 'Manuals & video tutorials', 'L1/L2/L3 Spanish support', 'Guaranteed SLA'],
      es: ['Onboarding personalizado', 'Manuales y video-tutoriales', 'Soporte L1/L2/L3 en español', 'SLA garantizado'],
    },
  },
]

export const SECTORS = [
  { icon: '⛏️', name: { en: 'Mining', es: 'Minería' } },
  { icon: '🏗️', name: { en: 'Construction', es: 'Construcción' } },
  { icon: '⚡', name: { en: 'Energy & Oil/Gas', es: 'Energía y Petróleo' } },
  { icon: '🌾', name: { en: 'Agroindustry', es: 'Agroindustria' } },
  { icon: '🏥', name: { en: 'Healthcare', es: 'Salud' } },
  { icon: '🏨', name: { en: 'Hospitality', es: 'Hotelería' } },
  { icon: '🏛️', name: { en: 'Public Sector', es: 'Sector Público' } },
  { icon: '🏭', name: { en: 'Manufacturing', es: 'Manufactura' } },
  { icon: '🚢', name: { en: 'Foreign Trade', es: 'Comercio Exterior' } },
  { icon: '🚚', name: { en: 'Logistics', es: 'Logística' } },
  { icon: '🎓', name: { en: 'Education', es: 'Educación' } },
  { icon: '🛒', name: { en: 'Retail', es: 'Retail' } },
]

export const ISO = [
  { n: '9001', label: { en: 'QUALITY', es: 'CALIDAD' }, color: BRAND.blue },
  { n: '14001', label: { en: 'ENVIRONMENT', es: 'AMBIENTE' }, color: BRAND.green },
  { n: '45001', label: { en: 'SAFETY', es: 'SEGURIDAD' }, color: BRAND.orange },
  { n: '37001', label: { en: 'ANTI-BRIBERY', es: 'ANTISOBORNO' }, color: '#7c3aed' },
]

export const STATS = [
  { n: '19+', es: 'Años de experiencia', en: 'Years of experience' },
  { n: '500+', es: 'Horas de auditoría', en: 'Accredited audit hours' },
  { n: '4', es: 'Normas ISO integradas', en: 'Integrated ISO standards' },
  { n: '11', es: 'Productos en showroom', en: 'Products in the showroom' },
]

export const COPY = {
  es: {
    badge: 'Showroom cinemático · 11 productos en órbita igual',
    title: 'El estándar industrial, en escena.',
    subtitle:
      'Soluciones integrales en SIG 360, ERP 360, capacitación especializada, auditoría MINTRA e implementación ISO para minería, construcción, energía, agro, salud, hotelería y sector público.',
    skip: 'Saltar órbita',
    settle: 'Explorar showroom',
    orbitHint: 'Órbita de apertura 360°',
    interactHint: 'Arrastra · hover · clic · ← →',
    keysHint: 'Teclado: ← → explora · Esc cierra · Enter selecciona',
    next: 'Siguiente',
    prev: 'Anterior',
    exploreNext: 'Explorar el siguiente producto',
    qualityUltra: 'Ultra 4K',
    qualityPerf: 'Rendimiento',
    chapter: 'Capítulo',
    film: 'Galería 4K · 11 productos',
    equalNote: 'Once piezas. Misma órbita. Sin pieza central.',
    wa: 'WhatsApp comercial',
    waHint: 'Conversación directa con un especialista',
    demo: 'Solicitar demo',
    trial: 'Pedir prueba',
    consult: 'Solo consultoría — sin precios en esta experiencia',
    lang: 'EN',
    products: 'Productos',
    services: 'Servicios',
    sectors: 'Sectores',
    motion: 'Motion generado',
    credentials: 'Credenciales',
    credSub: 'Auditor Líder ISO · Ingeniero Industrial CIP 210152 · MBA',
    isoTitle: 'Normas ISO integradas',
    isoSub: '4 normas. 1 plataforma. Integración nativa Annex SL — único en Perú.',
    formTitle: 'Solicitar una demo o prueba',
    formSub: 'El equipo técnico responde en 24 horas. Esta página no muestra precios: cotización a medida.',
    name: 'Nombre completo',
    company: 'Empresa',
    email: 'Correo corporativo',
    interest: 'Interés',
    message: 'Mensaje',
    send: 'Enviar solicitud',
    sent: 'Solicitud lista en su correo',
    sentBody: 'Se abrió el cliente de correo con los datos. También puede continuar por WhatsApp.',
    portal: 'Portal /global',
    footer: '© 2026 INNOVAQ SOLUTIONS SAC. Todos los derechos reservados.',
    videoTitle: 'Slots Higgsfield / Seedance',
    videoSub:
      'Motion cinemático por drop-in. Sin APIs inventadas: deposite loops en /cinematic/public/motion/ y stills 4K Nano Banana 2 en /cinematic/public/products/<CODIGO>/.',
    videoEmpty: 'Slot vacío — el 3D procedural cubre este producto hasta que deposite el archivo',
    videoReady: 'Loop listo',
    stillReady: 'Still 4K listo',
    close: 'Cerrar',
    consultCta: 'Consultar este producto',
    reduced: 'Modo reducido',
    hintTitle: 'Cómo recorrer el showroom',
    hintBody: 'Once productos, misma órbita. Use ← →, la cinta inferior o Siguiente/Anterior. WhatsApp +51 939 521 784 es el canal principal — sin precios.',
    hintDismiss: 'Entendido, explorar',
    waNumber: '+51 939 521 784',
  },
  en: {
    badge: 'Cinematic showroom · 11 products in equal orbit',
    title: 'The industrial standard, on stage.',
    subtitle:
      'Integrated solutions in SIG 360, ERP 360, specialized training, MINTRA audits and ISO implementation for mining, construction, energy, agro, health, hospitality and the public sector.',
    skip: 'Skip orbit',
    settle: 'Explore showroom',
    orbitHint: '360° opening orbit',
    interactHint: 'Drag · hover · click · ← →',
    keysHint: 'Keys: ← → browse · Esc close · Enter select',
    next: 'Next',
    prev: 'Previous',
    exploreNext: 'Explore the next product',
    qualityUltra: 'Ultra 4K',
    qualityPerf: 'Performance',
    chapter: 'Chapter',
    film: '4K gallery · 11 products',
    equalNote: 'Eleven pieces. Same orbit. No centerpiece.',
    wa: 'Commercial WhatsApp',
    waHint: 'Direct conversation with a specialist',
    demo: 'Request a demo',
    trial: 'Request a trial',
    consult: 'Consultation only — no prices on this experience',
    lang: 'ES',
    products: 'Products',
    services: 'Services',
    sectors: 'Sectors',
    motion: 'Generated motion',
    credentials: 'Credentials',
    credSub: 'ISO Lead Auditor · Licensed Industrial Engineer CIP 210152 · MBA',
    isoTitle: 'Integrated ISO standards',
    isoSub: '4 standards. 1 platform. Native Annex SL integration — unique in Peru.',
    formTitle: 'Request a demo or trial',
    formSub: 'The technical team replies within 24 hours. This page shows no prices: custom quotation only.',
    name: 'Full name',
    company: 'Company',
    email: 'Corporate email',
    interest: 'Interest',
    message: 'Message',
    send: 'Send request',
    sent: 'Request ready in your mail client',
    sentBody: 'Your email client opened with the details. You can also continue on WhatsApp.',
    portal: '/global portal',
    footer: '© 2026 INNOVAQ SOLUTIONS SAC. All rights reserved.',
    videoTitle: 'Higgsfield / Seedance slots',
    videoSub:
      'Cinematic motion by drop-in. No invented APIs: put loops in /cinematic/public/motion/ and Nano Banana 2 4K stills in /cinematic/public/products/<CODE>/.',
    videoEmpty: 'Empty slot — procedural 3D covers this product until you drop the file',
    videoReady: 'Loop ready',
    stillReady: '4K still ready',
    close: 'Close',
    consultCta: 'Consult this product',
    reduced: 'Reduced mode',
    hintTitle: 'How to browse the showroom',
    hintBody: 'Eleven products, same orbit. Use ← →, the film rail, or Next/Previous. WhatsApp +51 939 521 784 is the primary channel — no prices.',
    hintDismiss: 'Got it, explore',
    waNumber: '+51 939 521 784',
  },
}

export const VIDEO_SLOTS = [
  { id: 'hero-orbit', file: 'hero-orbit.mp4', es: 'Órbita de showroom', en: 'Showroom orbit' },
  { id: 'sectors', file: 'sectors-reel.mp4', es: 'Sectores industriales', en: 'Industrial sectors' },
  { id: 'detail', file: 'product-detail.mp4', es: 'Detalle de producto', en: 'Product detail' },
]

export function neighbor(code, dir = 1) {
  const i = PRODUCTS.findIndex((p) => p.code === code)
  const idx = i < 0 ? 0 : (i + dir + PRODUCTS.length) % PRODUCTS.length
  return PRODUCTS[idx]
}

export function productIndex(code) {
  return Math.max(0, PRODUCTS.findIndex((p) => p.code === code))
}

export function waUrl(lang, product) {
  const name = product?.name || 'portafolio 360'
  const text =
    lang === 'es'
      ? `Hola INNOVAQ SOLUTIONS SAC, soy de una empresa en Perú y quiero una consultoría sobre ${name}. Sin precios por web — coordinar por este canal. +51 939 521 784`
      : `Hello INNOVAQ SOLUTIONS SAC, I represent a company and would like a consultation on ${name}. No web pricing — please coordinate here. +51 939 521 784`
  return `https://wa.me/${COMPANY.waDigits}?text=${encodeURIComponent(text)}`
}
