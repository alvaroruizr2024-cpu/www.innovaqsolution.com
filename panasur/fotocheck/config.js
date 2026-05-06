// ============================================================================
// PANASUR Fotocheck PWA — config.js
// ============================================================================

const CONFIG = {
  SUPABASE_URL: 'https://uinoropxppiuqgzktqjr.supabase.co',
  SUPABASE_KEY: 'sb_publishable_NHPCpOgHh5c-m-t9s4KhIw_xO4fRrtE',
  BUCKET: 'panasur-fotochecks',
  PROYECTO: 'HANAQPAMPA',
  EMPRESA: 'TOURS PANASUR E.I.R.L.',
  RUC: '20532012879',
  CLIENTE: 'ENGIE Energía Perú S.A.A.',
  AMBULANCIA: 'Toyota Hilux 4x4 EUH-394',
  TEL_EMERGENCIA: '988-XXX-XXX',

  // Usuarios autorizados (en producción esto va a tabla en BD con hash)
  USUARIOS: [
    { user: 'alvaro.ruiz', pin: '2026', nombre: 'Ing. Alvaro Ruiz Reyna', rol: 'admin_ssoma' },
    { user: 'asistente.ssoma', pin: '1234', nombre: 'Asistente SSOMA', rol: 'asistente_ssoma' },
    { user: 'demo', pin: '0000', nombre: 'Usuario Demo', rol: 'asistente_ssoma' }
  ],

  // Mapeo color → CSS
  COLOR_BG: {
    'AZUL NAVY': '#1F3864',
    'AZUL CLARO': '#2E75B6',
    'VERDE': '#548235',
    'DORADO': '#FFC000',
    'ROJO': '#C00000',
    'MORADO': '#7030A0'
  }
};

// Cliente Supabase
const sb = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
