/**
 * ═══════════════════════════════════════════════════════════════
 * SIG 360° — Configuración de Supabase para Tours Panasur
 * ═══════════════════════════════════════════════════════════════
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 *
 * 1. Crear proyecto en https://supabase.com/dashboard
 *    - Nombre: sig360-panasur
 *    - Región: South America (São Paulo)
 *    - Password: [generar segura]
 *
 * 2. Copiar las credenciales del proyecto:
 *    - Project URL: https://xxxxx.supabase.co
 *    - Anon Key: eyJhbGciOiJIUzI1NiIs...
 *
 * 3. Ejecutar el SQL de creación de tablas (ver sección SQL abajo)
 *
 * 4. Configurar las variables en este archivo
 *
 * 5. Importar este archivo en el SPA o configurar las variables
 *    de entorno en el build de Vite
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ═══ CREDENCIALES — Configurar antes del despliegue ═══
const SUPABASE_CONFIG = {
  url: '',       // ← Pegar Project URL aquí
  anonKey: '',   // ← Pegar anon public key aquí

  // Configuración del proyecto
  project: {
    empresa: 'Tours Panasur E.I.R.L.',
    ruc: '20259263230',
    proyecto: 'CSF Hanaqpampa — Central Solar Fotovoltaica',
    ubicacion: 'Moquegua, Perú',
    cliente: 'ENGIE Energía Perú S.A.',
    normas: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'ISO 37001:2016'],
  }
};

/**
 * ═══════════════════════════════════════════════════════════════
 * SQL — Ejecutar en Supabase SQL Editor
 * ═══════════════════════════════════════════════════════════════
 *
 * Copiar y ejecutar el siguiente SQL en:
 * Supabase Dashboard → SQL Editor → New Query
 */

const SUPABASE_SCHEMA_SQL = `
-- ═══════════════════════════════════════════════════════════════
-- SIG 360° Tours Panasur — Schema de Base de Datos
-- Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. TABLA: Trabajadores
CREATE TABLE IF NOT EXISTS trabajadores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  dni VARCHAR(8) NOT NULL UNIQUE,
  cargo TEXT NOT NULL,
  area TEXT DEFAULT 'Operaciones',
  fecha_ingreso DATE DEFAULT CURRENT_DATE,
  estado VARCHAR(20) DEFAULT 'activo',
  competencias JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: Evaluaciones de Inducción
CREATE TABLE IF NOT EXISTS evaluaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trabajador_id UUID REFERENCES trabajadores(id),
  nombre TEXT NOT NULL,
  dni VARCHAR(8) NOT NULL,
  cargo TEXT,
  nota INTEGER NOT NULL,
  resultado VARCHAR(20) NOT NULL, -- APROBADO / DESAPROBADO
  correctas INTEGER,
  incorrectas INTEGER,
  tiempo VARCHAR(10),
  codigo_certificado TEXT,
  detalle JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: IPERC (Identificación de Peligros y Evaluación de Riesgos)
CREATE TABLE IF NOT EXISTS iperc (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  tipo VARCHAR(30) NOT NULL, -- 'linea_base' / 'continuo'
  area TEXT NOT NULL,
  actividad TEXT NOT NULL,
  peligro TEXT NOT NULL,
  riesgo TEXT NOT NULL,
  probabilidad INTEGER,
  severidad INTEGER,
  nivel_riesgo INTEGER GENERATED ALWAYS AS (probabilidad * severidad) STORED,
  clasificacion TEXT,
  controles TEXT,
  responsable TEXT,
  fecha DATE DEFAULT CURRENT_DATE,
  estado VARCHAR(20) DEFAULT 'vigente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: Auditorías
CREATE TABLE IF NOT EXISTS auditorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  norma TEXT[], -- '{ISO 9001, ISO 14001, ISO 45001}'
  tipo VARCHAR(20) NOT NULL, -- 'interna' / 'externa'
  alcance TEXT,
  auditor TEXT NOT NULL,
  fecha_programada DATE NOT NULL,
  fecha_ejecucion DATE,
  hallazgos_nc_mayor INTEGER DEFAULT 0,
  hallazgos_nc_menor INTEGER DEFAULT 0,
  observaciones INTEGER DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'planificada',
  informe_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: No Conformidades
CREATE TABLE IF NOT EXISTS no_conformidades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  norma TEXT NOT NULL,
  clausula TEXT NOT NULL,
  tipo VARCHAR(20) NOT NULL, -- 'mayor' / 'menor' / 'observacion'
  descripcion TEXT NOT NULL,
  causa_raiz TEXT,
  accion_correctiva TEXT,
  responsable TEXT NOT NULL,
  fecha_deteccion DATE DEFAULT CURRENT_DATE,
  fecha_limite DATE,
  fecha_cierre DATE,
  estado VARCHAR(20) DEFAULT 'abierta', -- abierta / en_proceso / cerrada / verificada
  evidencia_cierre TEXT,
  auditoria_id UUID REFERENCES auditorias(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA: Inspecciones
CREATE TABLE IF NOT EXISTS inspecciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- 'EPP', 'Orden y Limpieza', 'Vehicular', etc.
  area TEXT NOT NULL,
  inspector TEXT NOT NULL,
  fecha DATE DEFAULT CURRENT_DATE,
  hallazgos INTEGER DEFAULT 0,
  estado VARCHAR(20) DEFAULT 'completada',
  observaciones TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA: Canal de Denuncias
CREATE TABLE IF NOT EXISTS denuncias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  anonimo BOOLEAN DEFAULT TRUE,
  categoria TEXT NOT NULL, -- soborno, fraude, conflicto_interes, lavado, otro
  descripcion TEXT NOT NULL,
  estado VARCHAR(20) DEFAULT 'recibida', -- recibida / investigacion / resuelta / archivada
  fecha_recepcion TIMESTAMPTZ DEFAULT NOW(),
  fecha_resolucion TIMESTAMPTZ,
  investigador TEXT,
  resolucion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA: Capacitaciones
CREATE TABLE IF NOT EXISTS capacitaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  tema TEXT NOT NULL,
  tipo VARCHAR(30), -- 'induccion', 'especifica', 'reentrenamiento'
  instructor TEXT NOT NULL,
  fecha DATE NOT NULL,
  duracion_horas NUMERIC(4,1),
  asistentes_count INTEGER DEFAULT 0,
  evaluacion_promedio NUMERIC(4,2),
  estado VARCHAR(20) DEFAULT 'programada',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLA: Revisiones por la Dirección
CREATE TABLE IF NOT EXISTS revisiones_direccion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  periodo TEXT NOT NULL, -- 'Q1 2026', 'Q2 2026', etc.
  fecha DATE NOT NULL,
  presidente TEXT NOT NULL,
  participantes TEXT[],
  temas_revision JSONB,
  decisiones JSONB,
  acciones_compromisos JSONB,
  proxima_revision DATE,
  estado VARCHAR(20) DEFAULT 'programada',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TABLA: Indicadores KPI
CREATE TABLE IF NOT EXISTS kpis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  periodo VARCHAR(7) NOT NULL, -- '2026-01', '2026-02', etc.
  num_trabajadores INTEGER,
  hht NUMERIC(10,1), -- Horas Hombre Trabajadas
  accidentes INTEGER DEFAULT 0,
  dias_perdidos INTEGER DEFAULT 0,
  incidentes INTEGER DEFAULT 0,
  indice_frecuencia NUMERIC(6,2),
  indice_gravedad NUMERIC(6,2),
  indice_accidentabilidad NUMERIC(6,4),
  capacitaciones_programadas INTEGER DEFAULT 0,
  capacitaciones_ejecutadas INTEGER DEFAULT 0,
  inspecciones_programadas INTEGER DEFAULT 0,
  inspecciones_ejecutadas INTEGER DEFAULT 0,
  nc_abiertas INTEGER DEFAULT 0,
  nc_cerradas INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABLA: Eventos del Calendario SIG
CREATE TABLE IF NOT EXISTS eventos_sig (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo VARCHAR(30) NOT NULL, -- auditoria, capacitacion, simulacro, revision_direccion, inspeccion
  titulo TEXT NOT NULL,
  fecha DATE NOT NULL,
  responsable TEXT,
  estado VARCHAR(20) DEFAULT 'programado',
  notas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══ DATOS INICIALES — Tours Panasur ═══

-- Insertar trabajadores
INSERT INTO trabajadores (nombre, dni, cargo, area) VALUES
  ('Eugenio Huamani Quispe', '29384756', 'Gerente General', 'Gerencia'),
  ('Víctor Raúl Cáceres Murillo', '30192837', 'Gerente de Obra', 'Obras'),
  ('Alvaro Ruiz Reyna', '41526374', 'Supervisor SST', 'SST'),
  ('Luis Alberto Vargas Condori', '29475836', 'Ingeniero de Calidad', 'Calidad'),
  ('María Elena Quispe Torres', '30284756', 'Coordinadora Ambiental', 'Ambiental'),
  ('Jorge Luis Mamani Flores', '41637485', 'Supervisor de Campo', 'Operaciones'),
  ('Carlos Eduardo Pinto Ramos', '29586475', 'Operador de Rodillo', 'Operaciones'),
  ('Pedro Alejandro Cruz Mendoza', '30395867', 'Operador de Cisterna', 'Operaciones'),
  ('Fernando José Díaz Huanca', '41748596', 'Operador de Volquete', 'Operaciones'),
  ('Roberto Daniel Soto Quispe', '29607485', 'Operador de Cargador', 'Operaciones'),
  ('Javier Antonio Lima Paredes', '30416978', 'Conductor', 'Transporte'),
  ('Diego Martín Ramos Apaza', '41859607', 'Conductor', 'Transporte'),
  ('Oscar Enrique Flores Tejada', '29718596', 'Topógrafo', 'Ingeniería'),
  ('Hugo Ricardo Medina Cáceres', '30527089', 'Topógrafo Asistente', 'Ingeniería'),
  ('Raúl Andrés Chávez Huamán', '41960718', 'Mecánico', 'Mantenimiento'),
  ('Miguel Ángel Torres Valdez', '29829607', 'Electricista', 'Mantenimiento'),
  ('Julio César Gutierrez Puma', '30638190', 'Vigía de Seguridad', 'SST'),
  ('William Franco Salazar Ríos', '42071829', 'Vigía de Seguridad', 'SST'),
  ('Andrés Felipe Castro Delgado', '29940718', 'Almacenero', 'Logística'),
  ('Gonzalo Martín Herrera Salas', '30749201', 'Asistente Administrativo', 'Administración'),
  ('Sergio Iván Paz Cornejo', '42182940', 'Operador de Volquete', 'Operaciones'),
  ('Darío Alonso Ríos Benavides', '30051829', 'Conductor', 'Transporte'),
  ('Héctor Manuel Cueva Lazo', '42293051', 'Operador de Rodillo', 'Operaciones')
ON CONFLICT (dni) DO NOTHING;

-- Insertar KPIs 2026
INSERT INTO kpis (periodo, num_trabajadores, hht, accidentes, dias_perdidos, incidentes,
  indice_frecuencia, indice_gravedad, indice_accidentabilidad,
  capacitaciones_programadas, capacitaciones_ejecutadas,
  inspecciones_programadas, inspecciones_ejecutadas,
  nc_abiertas, nc_cerradas) VALUES
  ('2026-01', 23, 4416, 0, 0, 1, 0.00, 0.00, 0.0000, 2, 2, 4, 4, 2, 1),
  ('2026-02', 23, 3984, 0, 0, 0, 0.00, 0.00, 0.0000, 2, 2, 4, 3, 1, 2),
  ('2026-03', 23, 4416, 0, 0, 1, 0.00, 0.00, 0.0000, 3, 3, 4, 4, 1, 1);

-- Insertar auditorías programadas 2026
INSERT INTO auditorias (codigo, norma, tipo, alcance, auditor, fecha_programada, estado) VALUES
  ('AUD-2026-001', '{ISO 9001,ISO 14001,ISO 45001}', 'interna', 'Operaciones de transporte y obra civil', 'Alvaro Ruiz Reyna', '2026-04-15', 'planificada'),
  ('AUD-2026-002', '{ISO 45001}', 'interna', 'Gestión SST y cumplimiento Ley 29783', 'Luis Alberto Vargas Condori', '2026-06-20', 'planificada'),
  ('AUD-2026-003', '{ISO 14001}', 'interna', 'Gestión ambiental y residuos', 'María Elena Quispe Torres', '2026-08-15', 'planificada'),
  ('AUD-2026-004', '{ISO 9001,ISO 14001,ISO 45001}', 'externa', 'Auditoría de homologación ENGIE (externo)', 'Por designar (ENGIE)', '2026-10-10', 'planificada');

-- Insertar eventos del calendario SIG 2026
INSERT INTO eventos_sig (tipo, titulo, fecha, responsable, estado) VALUES
  ('auditoria', 'Auditoría Interna SIG Q1', '2026-04-15', 'Alvaro Ruiz Reyna', 'programado'),
  ('capacitacion', 'Inducción SSOMA — Nuevo Personal', '2026-04-05', 'Alvaro Ruiz Reyna', 'completado'),
  ('capacitacion', 'Capacitación IPERC Continuo', '2026-04-20', 'Alvaro Ruiz Reyna', 'programado'),
  ('capacitacion', 'Capacitación Trabajos en Altura', '2026-05-10', 'Alvaro Ruiz Reyna', 'programado'),
  ('capacitacion', 'Manejo Defensivo — Conductores', '2026-05-25', 'Jorge Luis Mamani Flores', 'programado'),
  ('simulacro', 'Simulacro de Volcadura de Vehículo', '2026-06-08', 'Alvaro Ruiz Reyna', 'programado'),
  ('simulacro', 'Simulacro de Sismo y Evacuación', '2026-07-15', 'Alvaro Ruiz Reyna', 'programado'),
  ('simulacro', 'Simulacro de Derrame MATPEL', '2026-09-12', 'María Elena Quispe Torres', 'programado'),
  ('revision_direccion', 'Revisión por la Dirección Q1', '2026-04-28', 'Eugenio Huamani Quispe', 'programado'),
  ('revision_direccion', 'Revisión por la Dirección Q2', '2026-07-28', 'Eugenio Huamani Quispe', 'programado'),
  ('inspeccion', 'Inspección EPP — Todo el personal', '2026-04-10', 'Julio César Gutierrez Puma', 'programado'),
  ('inspeccion', 'Inspección Vehicular — Flota completa', '2026-04-12', 'Raúl Andrés Chávez Huamán', 'programado'),
  ('inspeccion', 'Inspección Orden y Limpieza — Obra', '2026-04-18', 'Jorge Luis Mamani Flores', 'programado'),
  ('auditoria', 'Auditoría Interna SST Q2', '2026-06-20', 'Luis Alberto Vargas Condori', 'programado'),
  ('auditoria', 'Auditoría Ambiental Q3', '2026-08-15', 'María Elena Quispe Torres', 'programado'),
  ('auditoria', 'Auditoría Homologación ENGIE', '2026-10-10', 'Por designar (ENGIE)', 'programado');

-- ═══ ROW LEVEL SECURITY ═══
ALTER TABLE trabajadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE iperc ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE no_conformidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspecciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE denuncias ENABLE ROW LEVEL SECURITY;
ALTER TABLE capacitaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE revisiones_direccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_sig ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso público (lectura) para la app SPA
-- En producción, reemplazar con autenticación adecuada
CREATE POLICY "Allow public read" ON trabajadores FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON evaluaciones FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON evaluaciones FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON iperc FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON auditorias FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON no_conformidades FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON inspecciones FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON denuncias FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON denuncias FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON capacitaciones FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON revisiones_direccion FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON kpis FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON eventos_sig FOR SELECT USING (true);

-- ═══ VISTAS ═══

-- Vista de Dashboard KPIs
CREATE OR REPLACE VIEW v_dashboard AS
SELECT
  periodo,
  num_trabajadores,
  hht,
  accidentes,
  dias_perdidos,
  incidentes,
  indice_frecuencia,
  indice_gravedad,
  ROUND(capacitaciones_ejecutadas::numeric / NULLIF(capacitaciones_programadas, 0) * 100, 1) AS pct_capacitaciones,
  ROUND(inspecciones_ejecutadas::numeric / NULLIF(inspecciones_programadas, 0) * 100, 1) AS pct_inspecciones,
  nc_abiertas,
  nc_cerradas
FROM kpis
ORDER BY periodo DESC;
`;

// ═══ Exportar configuración ═══
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SUPABASE_CONFIG, SUPABASE_SCHEMA_SQL };
}
