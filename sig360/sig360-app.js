// SIG CONSTRUCCION 360 v7.0 Enterprise — INNOVAQ SOLUTIONS SAC
// CDN: React 18 + ReactDOM + Recharts (loaded in index.html)
var useState = React.useState, useEffect = React.useEffect, useCallback = React.useCallback, useMemo = React.useMemo, useRef = React.useRef;
var LineChart = Recharts.LineChart, Line = Recharts.Line, AreaChart = Recharts.AreaChart, Area = Recharts.Area;
var BarChart = Recharts.BarChart, Bar = Recharts.Bar, PieChart = Recharts.PieChart, Pie = Recharts.Pie, Cell = Recharts.Cell;
var XAxis = Recharts.XAxis, YAxis = Recharts.YAxis, CartesianGrid = Recharts.CartesianGrid, Tooltip = Recharts.Tooltip;
var ResponsiveContainer = Recharts.ResponsiveContainer, Legend = Recharts.Legend;
var RadarChart = Recharts.RadarChart, Radar = Recharts.Radar, PolarGrid = Recharts.PolarGrid;
var PolarAngleAxis = Recharts.PolarAngleAxis, PolarRadiusAxis = Recharts.PolarRadiusAxis;
var ComposedChart = Recharts.ComposedChart, Treemap = Recharts.Treemap;

// ═══════════════════════════════════════════════════════════════════════════
// SIG CONSTRUCCION 360 — V7  |  Control Documental Integral ISO + SGS
// ISO 9001 · ISO 14001 · ISO 45001 · ISO 37001
// Modulos: Dashboard BI · Docs · Auditoria IA · Legal Tech · Lista Maestra
// Recursos PDCA · Modulos ISO Editables · Incidentes SST
// ═══════════════════════════════════════════════════════════════════════════

var C = {
  bg:"#06090f", sf:"#0c1220", sa:"#111a2d", card:"#0f1728", cardH:"#142035",
  bd:"#1a2744", bdL:"#243354", tx:"#e4ecf7", tm:"#8da0bc", td:"#4d6484",
  pr:"#2d7ff9", pl:"#5da3ff", pd:"#1a5fd4", ac:"#00d68f", acD:"#00b377",
  wn:"#ffb020", wnD:"#e09500", dn:"#ff4757", dnD:"#d63040",
  pp:"#8c6bfa", ppL:"#aa90ff", cy:"#00d4ff", tl:"#1abc9c",
  i9:"#2d7ff9", i14:"#00c853", i45:"#ffab00", i37:"#8c6bfa",
  g1:"linear-gradient(135deg,#2d7ff9,#00d4ff)",
  g2:"linear-gradient(135deg,#00d68f,#00b377)",
  g3:"linear-gradient(135deg,#ffb020,#ff8c00)",
  g4:"linear-gradient(135deg,#8c6bfa,#d946ef)",
};

// ═══ SVG ICON HELPERS ═══
function svgI(d, w, h) {
  w = w || 18; h = h || 18;
  return React.createElement("svg", {
    width: w, height: h, viewBox: "0 0 24 24", fill: "none",
    stroke: "currentColor", strokeWidth: 1.7,
    strokeLinecap: "round", strokeLinejoin: "round"
  }, d);
}

var Icons = {
  Dash: function() { return svgI([
    React.createElement("rect", { key:"a", x:3, y:3, width:7, height:7, rx:1.5 }),
    React.createElement("rect", { key:"b", x:14, y:3, width:7, height:7, rx:1.5 }),
    React.createElement("rect", { key:"c", x:3, y:14, width:7, height:7, rx:1.5 }),
    React.createElement("rect", { key:"d", x:14, y:14, width:7, height:7, rx:1.5 })
  ]); },
  Doc: function() { return svgI([
    React.createElement("path", { key:"a", d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
    React.createElement("polyline", { key:"b", points:"14 2 14 8 20 8" })
  ]); },
  Folder: function() { return svgI([
    React.createElement("path", { key:"a", d:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" })
  ]); },
  Upload: function() { return svgI([
    React.createElement("path", { key:"a", d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
    React.createElement("polyline", { key:"b", points:"17 8 12 3 7 8" }),
    React.createElement("line", { key:"c", x1:12, y1:3, x2:12, y2:15 })
  ]); },
  Download: function() { return svgI([
    React.createElement("path", { key:"a", d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" }),
    React.createElement("polyline", { key:"b", points:"7 10 12 15 17 10" }),
    React.createElement("line", { key:"c", x1:12, y1:15, x2:12, y2:3 })
  ]); },
  Eye: function() { return svgI([
    React.createElement("path", { key:"a", d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
    React.createElement("circle", { key:"b", cx:12, cy:12, r:3 })
  ]); },
  Check: function() { return svgI([
    React.createElement("polyline", { key:"a", points:"20 6 9 17 4 12" })
  ]); },
  X: function() { return svgI([
    React.createElement("line", { key:"a", x1:18, y1:6, x2:6, y2:18 }),
    React.createElement("line", { key:"b", x1:6, y1:6, x2:18, y2:18 })
  ]); },
  Alert: function() { return svgI([
    React.createElement("path", { key:"a", d:"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" }),
    React.createElement("line", { key:"b", x1:12, y1:9, x2:12, y2:13 }),
    React.createElement("line", { key:"c", x1:12, y1:17, x2:12.01, y2:17 })
  ]); },
  Shield: function() { return svgI([
    React.createElement("path", { key:"a", d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
  ]); },
  Leaf: function() { return svgI([
    React.createElement("path", { key:"a", d:"M17 8C8 10 5.9 16.17 3.82 21.34" }),
    React.createElement("path", { key:"b", d:"M20.2 2.8a1 1 0 00-1.4 0C15 6.6 11 9 6 11a1 1 0 00-.6 1.2c1.4 5 5 8.6 10 9.8a1 1 0 001.2-.6c2-5 2.4-11 .6-14.8" })
  ]); },
  Star: function() { return svgI([
    React.createElement("path", { key:"a", d:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
  ]); },
  Brain: function() { return svgI([
    React.createElement("path", { key:"a", d:"M9.5 2A5.5 5.5 0 005 7.5c0 1.3.5 2.5 1.3 3.4" }),
    React.createElement("path", { key:"b", d:"M14.5 2A5.5 5.5 0 0120 7.5c0 1.3-.5 2.5-1.3 3.4" }),
    React.createElement("path", { key:"c", d:"M6.3 10.9A5.5 5.5 0 004 15.5 5.5 5.5 0 009.5 21h5a5.5 5.5 0 005.5-5.5c0-1.8-.9-3.4-2.3-4.4" }),
    React.createElement("line", { key:"d", x1:12, y1:2, x2:12, y2:21 })
  ]); },
  Scale: function() { return svgI([
    React.createElement("path", { key:"a", d:"M12 3v18" }),
    React.createElement("path", { key:"b", d:"M5 7l7-4 7 4" }),
    React.createElement("path", { key:"c", d:"M3 13l2-6 4 6a4 4 0 01-6 0z" }),
    React.createElement("path", { key:"d", d:"M15 13l2-6 4 6a4 4 0 01-6 0z" })
  ]); },
  Menu: function() { return svgI([
    React.createElement("line", { key:"a", x1:3, y1:12, x2:21, y2:12 }),
    React.createElement("line", { key:"b", x1:3, y1:6, x2:21, y2:6 }),
    React.createElement("line", { key:"c", x1:3, y1:18, x2:21, y2:18 })
  ]); },
  Bell: function() { return svgI([
    React.createElement("path", { key:"a", d:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" }),
    React.createElement("path", { key:"b", d:"M13.73 21a2 2 0 01-3.46 0" })
  ]); },
  Search: function() { return svgI([
    React.createElement("circle", { key:"a", cx:11, cy:11, r:8 }),
    React.createElement("line", { key:"b", x1:21, y1:21, x2:16.65, y2:16.65 })
  ]); },
  Plus: function() { return svgI([
    React.createElement("line", { key:"a", x1:12, y1:5, x2:12, y2:19 }),
    React.createElement("line", { key:"b", x1:5, y1:12, x2:19, y2:12 })
  ]); },
  Bar: function() { return svgI([
    React.createElement("rect", { key:"a", x:3, y:10, width:4, height:11, rx:1 }),
    React.createElement("rect", { key:"b", x:10, y:3, width:4, height:18, rx:1 }),
    React.createElement("rect", { key:"c", x:17, y:7, width:4, height:14, rx:1 })
  ]); },
  Users: function() { return svgI([
    React.createElement("path", { key:"a", d:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }),
    React.createElement("circle", { key:"b", cx:9, cy:7, r:4 }),
    React.createElement("path", { key:"c", d:"M23 21v-2a4 4 0 00-3-3.87" }),
    React.createElement("path", { key:"d", d:"M16 3.13a4 4 0 010 7.75" })
  ]); },
  Settings: function() { return svgI([
    React.createElement("circle", { key:"a", cx:12, cy:12, r:3 }),
    React.createElement("path", { key:"b", d:"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" })
  ]); },
  Trend: function() { return svgI([
    React.createElement("polyline", { key:"a", points:"23 6 13.5 15.5 8.5 10.5 1 18" }),
    React.createElement("polyline", { key:"b", points:"17 6 23 6 23 12" })
  ]); },
  Clock: function() { return svgI([
    React.createElement("circle", { key:"a", cx:12, cy:12, r:10 }),
    React.createElement("polyline", { key:"b", points:"12 6 12 12 16 14" })
  ]); },
  Clipboard: function() { return svgI([
    React.createElement("path", { key:"a", d:"M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" }),
    React.createElement("rect", { key:"b", x:8, y:2, width:8, height:4, rx:1, ry:1 })
  ]); },
  Gavel: function() { return svgI([
    React.createElement("path", { key:"a", d:"M14 3l-4 4 7 7 4-4-7-7z" }),
    React.createElement("path", { key:"b", d:"M3 21l5-5" }),
    React.createElement("path", { key:"c", d:"M7 17l-4 4" }),
    React.createElement("path", { key:"d", d:"M11 7L7 3" })
  ]); },
  Filter: function() { return svgI([
    React.createElement("polygon", { key:"a", points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" })
  ]); },
  ChevDown: function() { return svgI([
    React.createElement("polyline", { key:"a", points:"6 9 12 15 18 9" })
  ]); },
  ChevRight: function() { return svgI([
    React.createElement("polyline", { key:"a", points:"9 18 15 12 9 6" })
  ]); },
  RefreshCw: function() { return svgI([
    React.createElement("polyline", { key:"a", points:"23 4 23 10 17 10" }),
    React.createElement("polyline", { key:"b", points:"1 20 1 14 7 14" }),
    React.createElement("path", { key:"c", d:"M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" })
  ]); },
  FileText: function() { return svgI([
    React.createElement("path", { key:"a", d:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
    React.createElement("polyline", { key:"b", points:"14 2 14 8 20 8" }),
    React.createElement("line", { key:"c", x1:16, y1:13, x2:8, y2:13 }),
    React.createElement("line", { key:"d", x1:16, y1:17, x2:8, y2:17 }),
    React.createElement("polyline", { key:"e", points:"10 9 9 9 8 9" })
  ]); },
  Building: function() { return svgI([
    React.createElement("rect", { key:"a", x:4, y:2, width:16, height:20, rx:2, ry:2 }),
    React.createElement("line", { key:"b", x1:9, y1:6, x2:9.01, y2:6 }),
    React.createElement("line", { key:"c", x1:15, y1:6, x2:15.01, y2:6 }),
    React.createElement("line", { key:"d", x1:9, y1:10, x2:9.01, y2:10 }),
    React.createElement("line", { key:"e", x1:15, y1:10, x2:15.01, y2:10 }),
    React.createElement("line", { key:"f", x1:9, y1:14, x2:9.01, y2:14 }),
    React.createElement("line", { key:"g", x1:15, y1:14, x2:15.01, y2:14 }),
    React.createElement("line", { key:"h", x1:9, y1:18, x2:15, y2:18 })
  ]); },
  ListIcon: function() { return svgI([
    React.createElement("line", { key:"a", x1:8, y1:6, x2:21, y2:6 }),
    React.createElement("line", { key:"b", x1:8, y1:12, x2:21, y2:12 }),
    React.createElement("line", { key:"c", x1:8, y1:18, x2:21, y2:18 }),
    React.createElement("line", { key:"d", x1:3, y1:6, x2:3.01, y2:6 }),
    React.createElement("line", { key:"e", x1:3, y1:12, x2:3.01, y2:12 }),
    React.createElement("line", { key:"f", x1:3, y1:18, x2:3.01, y2:18 })
  ]); },
  Database: function() { return svgI([
    React.createElement("ellipse", { key:"a", cx:12, cy:5, rx:9, ry:3 }),
    React.createElement("path", { key:"b", d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
    React.createElement("path", { key:"c", d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
  ]); },
  Wrench: function() { return svgI([
    React.createElement("path", { key:"a", d:"M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" })
  ]); },
  Package: function() { return svgI([
    React.createElement("path", { key:"a", d:"M16.5 9.4l-9-5.19" }),
    React.createElement("path", { key:"b", d:"M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" }),
    React.createElement("polyline", { key:"c", points:"3.27 6.96 12 12.01 20.73 6.96" }),
    React.createElement("line", { key:"d", x1:12, y1:22.08, x2:12, y2:12 })
  ]); },
  Edit: function() { return svgI([
    React.createElement("path", { key:"a", d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" }),
    React.createElement("path", { key:"b", d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" })
  ]); },
  Zap: function() { return svgI([
    React.createElement("polygon", { key:"a", points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
  ]); },
};


// ═══ AUDIT DATA (Auditor Inteligente IA) ═══
var _aUid = function() { return Math.random().toString(36).substr(2, 8); };
var _aToday = function() { return new Date().toISOString().split("T")[0]; };
var _aFmtDate = function(d) { if (!d) return "\u2014"; return new Date(d + "T12:00:00").toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" }); };
var _aInputS = { background: C.sa, border: "1px solid " + C.bd, borderRadius: 6, padding: "6px 10px", color: C.tx, fontSize: 11, outline: "none", width: "100%", fontFamily: "inherit" };
var _aSelectS = Object.assign({}, _aInputS, { cursor: "pointer" });
var _aBtnS = function(bg, c) { return { background: bg, color: c || "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 10, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all .15s" }; };

var AUDIT_CHECKLISTS = {
  "9001": [
    { clausula: "4.1", req: "Contexto de la organizaci\u00f3n", docs: ["An\u00e1lisis FODA/PESTEL", "Informaci\u00f3n documentada del contexto"] },
    { clausula: "4.2", req: "Partes interesadas", docs: ["Matriz de partes interesadas"] },
    { clausula: "5.2", req: "Pol\u00edtica de calidad", docs: ["Pol\u00edtica documentada", "Evidencia de comunicaci\u00f3n"] },
    { clausula: "6.1", req: "Riesgos y oportunidades", docs: ["Matriz de riesgos", "Plan de tratamiento"] },
    { clausula: "6.2", req: "Objetivos de calidad", docs: ["Objetivos e indicadores KPIs"] },
    { clausula: "7.2", req: "Competencia", docs: ["Matriz de competencias", "Registros de formaci\u00f3n"] },
    { clausula: "7.5", req: "Informaci\u00f3n documentada", docs: ["Procedimiento de control documental", "Lista maestra"] },
    { clausula: "8.1", req: "Planificaci\u00f3n y control operacional", docs: ["Procedimientos operativos"] },
    { clausula: "8.4", req: "Control de proveedores externos", docs: ["Evaluaci\u00f3n de proveedores"] },
    { clausula: "8.7", req: "Salidas no conformes", docs: ["Procedimiento de PNC", "Registros de NC"] },
    { clausula: "9.1", req: "Seguimiento y medici\u00f3n", docs: ["Indicadores", "Tablero de control"] },
    { clausula: "9.2", req: "Auditor\u00eda interna", docs: ["Programa e informes de auditor\u00eda"] },
    { clausula: "9.3", req: "Revisi\u00f3n por la direcci\u00f3n", docs: ["Acta de revisi\u00f3n"] },
    { clausula: "10.2", req: "No conformidad y acci\u00f3n correctiva", docs: ["Registro de NC", "Acciones correctivas"] }
  ],
  "14001": [
    { clausula: "4.1", req: "Contexto ambiental", docs: ["An\u00e1lisis de contexto ambiental"] },
    { clausula: "6.1.2", req: "Aspectos ambientales significativos", docs: ["Matriz de aspectos e impactos"] },
    { clausula: "6.1.3", req: "Requisitos legales ambientales", docs: ["Matriz legal ambiental"] },
    { clausula: "6.2", req: "Objetivos ambientales", docs: ["Objetivos y metas ambientales"] },
    { clausula: "8.1", req: "Control operacional ambiental", docs: ["Gesti\u00f3n de residuos", "Control de emisiones"] },
    { clausula: "8.2", req: "Emergencias ambientales", docs: ["Plan de contingencia ambiental"] },
    { clausula: "9.1.1", req: "Monitoreo ambiental", docs: ["Registros de medici\u00f3n ECA/LMP"] },
    { clausula: "9.1.2", req: "Cumplimiento legal ambiental", docs: ["Informe de cumplimiento"] },
    { clausula: "9.2", req: "Auditor\u00eda interna ambiental", docs: ["Programa e informes"] },
    { clausula: "10.2", req: "NC y acci\u00f3n correctiva ambiental", docs: ["NC ambientales"] }
  ],
  "45001": [
    { clausula: "4.1", req: "Contexto SST", docs: ["An\u00e1lisis de contexto SST"] },
    { clausula: "5.2", req: "Pol\u00edtica de SST", docs: ["Pol\u00edtica de SST", "Difusi\u00f3n"] },
    { clausula: "5.4", req: "Consulta y participaci\u00f3n de trabajadores", docs: ["Comit\u00e9 de SST", "Actas de reuni\u00f3n"] },
    { clausula: "6.1.2", req: "IPERC", docs: ["IPERC l\u00ednea base", "IPERC continuo", "Mapa de riesgos"] },
    { clausula: "6.1.3", req: "Requisitos legales SST (Ley 29783)", docs: ["Matriz legal SST"] },
    { clausula: "6.2", req: "Objetivos de SST", docs: ["Objetivos SST", "Indicadores IF/IS/IA"] },
    { clausula: "7.2", req: "Competencia en SST", docs: ["Programa de capacitaci\u00f3n", "Registros SCTR"] },
    { clausula: "8.1", req: "Control operacional SST", docs: ["PETAR", "ATS", "Procedimientos de trabajo seguro"] },
    { clausula: "8.1.2", req: "Jerarqu\u00eda de controles", docs: ["Controles operacionales", "EPP"] },
    { clausula: "8.2", req: "Preparaci\u00f3n y respuesta ante emergencias", docs: ["Plan de emergencias", "Simulacros"] },
    { clausula: "9.1", req: "Seguimiento SST", docs: ["Estad\u00edsticas SST", "Inspecciones"] },
    { clausula: "9.2", req: "Auditor\u00eda interna SST", docs: ["Programa e informes"] },
    { clausula: "10.2", req: "Investigaci\u00f3n de incidentes y NC", docs: ["Registros de investigaci\u00f3n"] }
  ],
  "37001": [
    { clausula: "4.5", req: "Evaluaci\u00f3n del riesgo de soborno", docs: ["Matriz de riesgos de soborno"] },
    { clausula: "5.2", req: "Pol\u00edtica antisoborno", docs: ["Pol\u00edtica firmada", "Difusi\u00f3n"] },
    { clausula: "5.3", req: "Funci\u00f3n de cumplimiento", docs: ["Designaci\u00f3n del Oficial"] },
    { clausula: "7.2", req: "Competencia antisoborno", docs: ["Capacitaci\u00f3n antisoborno", "C\u00f3digo de \u00e9tica"] },
    { clausula: "8.2", req: "Debida diligencia", docs: ["Procedimiento de due diligence"] },
    { clausula: "8.7", req: "Regalos y hospitalidad", docs: ["Registro de regalos"] },
    { clausula: "8.9", req: "Canal de denuncias", docs: ["Canal de denuncias", "Protecci\u00f3n al denunciante"] },
    { clausula: "8.10", req: "Investigaci\u00f3n de soborno", docs: ["Procedimiento de investigaci\u00f3n"] },
    { clausula: "9.2", req: "Auditor\u00eda interna antisoborno", docs: ["Programa e informes"] },
    { clausula: "9.4", req: "Informes al \u00f3rgano de gobierno", docs: ["Reportes peri\u00f3dicos"] }
  ]
};

var AUDIT_TYPES = [
  { id: "interna", label: "Auditor\u00eda Interna", desc: "Primera parte seg\u00fan cl\u00e1usula 9.2", icon: "\uD83D\uDD0D", color: C.pr },
  { id: "mintra", label: "Auditor\u00eda MINTRA / SUNAFIL", desc: "Verificaci\u00f3n Ley 29783 y D.S. 005-2012-TR", icon: "\uD83C\uDFDB\uFE0F", color: C.wn },
  { id: "homologacion", label: "Auditor\u00eda de Homologaci\u00f3n", desc: "Evaluaci\u00f3n de contratistas", icon: "\uD83E\uDD1D", color: C.ac },
  { id: "certificacion", label: "Auditor\u00eda de Certificaci\u00f3n (3ra Parte)", desc: "SGS, Bureau Veritas, T\u00dcV, etc.", icon: "\uD83C\uDFC5", color: C.pp },
  { id: "seguimiento", label: "Auditor\u00eda de Seguimiento", desc: "Cierre de NC y eficacia", icon: "\uD83D\uDCCB", color: C.cy }
];

var AUDIT_SYSTEMS = [
  { id: "9001", label: "ISO 9001:2015 \u2014 Calidad", color: C.i9, icon: "\u2B50" },
  { id: "14001", label: "ISO 14001:2015 \u2014 Ambiental", color: C.i14, icon: "\uD83C\uDF3F" },
  { id: "45001", label: "ISO 45001:2018 \u2014 SST", color: C.i45, icon: "\uD83D\uDEE1\uFE0F" },
  { id: "37001", label: "ISO 37001:2016 \u2014 Antisoborno", color: C.i37, icon: "\uD83D\uDEAB" },
  { id: "integrado", label: "SIG Completo (Integrado)", color: C.tl, icon: "\uD83D\uDD17" }
];

// HTML export builder
function buildReportHTML(r) {
  var rs = r.resumen_hallazgos || {};
  var h = r.hallazgos || [];
  var pa = r.plan_accion_sugerido || [];
  var recs = r.recomendaciones_generales || [];
  var s = "border:1px solid #ccc;padding:6px";

  function typeStyle(t) {
    if (t === "nc_mayor") return "background:#ffe0e0;color:#d63040";
    if (t === "nc_menor") return "background:#fff3cd;color:#e09500";
    if (t === "observacion") return "background:#cce5ff;color:#2d7ff9";
    if (t === "fortaleza") return "background:#d4edda;color:#00b377";
    return "background:#e8daff;color:#8c6bfa";
  }
  function riskBg(rk) {
    if (rk === "alto") return "background:#ffe0e0";
    if (rk === "medio") return "background:#fff3cd";
    return "background:#d4edda";
  }

  var hRows = h.map(function(x) {
    return "<tr><td style='" + s + ";font-weight:bold;text-align:center'>" + (x.numero || "") +
      "</td><td style='" + s + ";text-align:center'><span style='padding:2px 8px;border-radius:12px;font-size:9px;font-weight:bold;" + typeStyle(x.tipo) + "'>" + (x.tipo || "").replace(/_/g, " ").toUpperCase() +
      "</span></td><td style='" + s + ";text-align:center;font-weight:bold'>" + (x.clausula || "") +
      "</td><td style='" + s + ";text-align:center'>" + (x.norma || "") +
      "</td><td style='" + s + "'>" + (x.descripcion || "") +
      "</td><td style='" + s + ";font-size:10px'>" + (x.evidencia || "") +
      "</td><td style='" + s + ";text-align:center'><span style='padding:2px 6px;border-radius:8px;font-size:9px;" + riskBg(x.riesgo) + "'>" + (x.riesgo || "").toUpperCase() +
      "</span></td><td style='" + s + ";font-size:10px'>" + (x.recomendacion || "") + "</td></tr>";
  }).join("");

  var pRows = pa.map(function(p) {
    return "<tr><td style='" + s + ";font-weight:bold'>" + (p.hallazgo || "") +
      "</td><td style='" + s + "'>" + (p.accion || "") +
      "</td><td style='" + s + "'>" + (p.responsable || "") +
      "</td><td style='" + s + "'>" + (p.plazo || "") + "</td></tr>";
  }).join("");

  var recItems = recs.map(function(rc) { return "<li style='margin:4px 0'>" + rc + "</li>"; }).join("");

  return [
    "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + (r.titulo || "Informe") + "</title>",
    "<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Segoe UI,sans-serif;font-size:11px;color:#1a1a2e;padding:30px;max-width:1000px;margin:0 auto}",
    ".hdr{border:2px solid #1a1a2e;padding:15px;margin-bottom:20px;text-align:center}.hdr h1{font-size:16px;color:#2d7ff9;margin-bottom:5px}",
    ".mt{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:15px 0;font-size:10px}.mi{border:1px solid #ddd;padding:6px 10px;border-radius:4px}.mi strong{color:#2d7ff9}",
    ".sec{margin:20px 0}.sec h2{font-size:13px;color:#2d7ff9;border-bottom:2px solid #2d7ff9;padding-bottom:4px;margin-bottom:10px}.sec p{line-height:1.6}",
    "table{width:100%;border-collapse:collapse;margin:10px 0;font-size:10px}th{background:#f0f4f8;border:1px solid #ccc;padding:6px;font-size:9px;text-transform:uppercase}",
    ".sg{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:15px 0}.sc{border:1px solid #ddd;border-radius:8px;padding:10px;text-align:center}.sc .v{font-size:24px;font-weight:bold}",
    ".ft{margin-top:30px;border-top:2px solid #1a1a2e;padding-top:10px;text-align:center;font-size:9px;color:#666}",
    "@media print{body{padding:15px}}</style></head><body>",
    "<div class='hdr'><p style='font-size:10px;color:#666'>ISO 19011:2018</p><h1>" + (r.titulo || "INFORME DE AUDITORIA") + "</h1><h2>" + (r.normas_referencia || "") + "</h2><p>N: " + (r.numero || "") + " | Fecha: " + (r.fecha || "") + "</p></div>",
    "<div class='mt'><div class='mi'><strong>Tipo:</strong> " + (r.tipo_auditoria || "") + "</div><div class='mi'><strong>Normas:</strong> " + (r.normas_referencia || "") + "</div><div class='mi'><strong>Area:</strong> " + (r.area_auditada || "") + "</div><div class='mi'><strong>Auditor:</strong> " + (r.auditor_lider || "") + "</div><div class='mi'><strong>Equipo:</strong> " + (r.equipo_auditor || "") + "</div><div class='mi'><strong>Metodo:</strong> " + (r.metodo || "") + "</div></div>",
    "<div class='sec'><h2>1. OBJETIVO</h2><p>" + (r.objetivo || "") + "</p></div>",
    "<div class='sec'><h2>2. ALCANCE</h2><p>" + (r.alcance || "") + "</p></div>",
    "<div class='sec'><h2>3. CRITERIOS</h2><p>" + (r.criterios_auditoria || "") + "</p></div>",
    "<div class='sec'><h2>4. RESUMEN EJECUTIVO</h2><p>" + (r.resumen_ejecutivo || "") + "</p></div>",
    "<div class='sec'><h2>5. RESUMEN DE HALLAZGOS</h2><div class='sg'>",
    "<div class='sc' style='border-color:#d63040'><div class='v' style='color:#d63040'>" + (rs.nc_mayores || 0) + "</div><div>NC Mayores</div></div>",
    "<div class='sc' style='border-color:#e09500'><div class='v' style='color:#e09500'>" + (rs.nc_menores || 0) + "</div><div>NC Menores</div></div>",
    "<div class='sc' style='border-color:#2d7ff9'><div class='v' style='color:#2d7ff9'>" + (rs.observaciones || 0) + "</div><div>Observaciones</div></div>",
    "<div class='sc' style='border-color:#8c6bfa'><div class='v' style='color:#8c6bfa'>" + (rs.oportunidades_mejora || 0) + "</div><div>Oport. Mejora</div></div>",
    "<div class='sc' style='border-color:#00b377'><div class='v' style='color:#00b377'>" + (rs.fortalezas || 0) + "</div><div>Fortalezas</div></div>",
    "</div></div>",
    "<div class='sec'><h2>6. HALLAZGOS</h2><table><thead><tr><th>No</th><th>Tipo</th><th>Clausula</th><th>Norma</th><th>Descripcion</th><th>Evidencia</th><th>Riesgo</th><th>Recomendacion</th></tr></thead><tbody>" + hRows + "</tbody></table></div>",
    "<div class='sec'><h2>7. CONCLUSIONES</h2><p>" + (r.conclusion || "") + "</p></div>",
    "<div class='sec'><h2>8. RECOMENDACIONES</h2><ul>" + recItems + "</ul></div>",
    "<div class='sec'><h2>9. PLAN DE ACCION</h2><table><thead><tr><th>Hallazgo</th><th>Accion</th><th>Responsable</th><th>Plazo</th></tr></thead><tbody>" + pRows + "</tbody></table></div>",
    "<div class='sec'><h2>10. PROXIMA AUDITORIA</h2><p>" + (r.proxima_auditoria || "") + "</p></div>",
    "<div class='ft'><p><strong>" + (r.declaracion_confidencialidad || "Documento confidencial") + "</strong></p><p>SIG Construccion 360 | ISO 19011:2018</p></div>",
    "</body></html>"
  ].join("\n");
}

function downloadHTML(name, html) {
  var blob = new Blob([html], { type: "text/html;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

// ═══ SECTORS LIST ═══
var SECTORS = [
  "Construccion","Mineria","Energia y Gas","Petroleo y Petroquimica","Manufactura",
  "Agroindustria","Pesca y Acuicultura","Transporte y Logistica","Telecomunicaciones",
  "Salud y Farmaceutica","Educacion","Turismo y Hoteleria","Servicios Financieros",
  "Tecnologia e Informatica","Alimentos y Bebidas","Textil y Confecciones",
  "Quimica e Industria","Inmobiliaria","Retail y Comercio","Saneamiento y Agua",
  "Metalurgia y Siderurgia","Cementos y Materiales","Automotriz","Defensa y Seguridad",
  "Gobierno y Sector Publico","Medio Ambiente y Residuos","Consultoria"
];

// ═══ DOCUMENT DATABASE ═══
var DOCUMENTS = [
  { id:"DOC-001", name:"Manual del SIG", iso:"9001", area:"Direccion", pdca:"P", status:"vigente", version:"4.0", date:"2025-11-10", pages:42 },
  { id:"DOC-002", name:"Politica Integrada SIG", iso:"multi", area:"Direccion", pdca:"P", status:"vigente", version:"3.2", date:"2025-10-15", pages:4 },
  { id:"DOC-003", name:"Mapa de Procesos", iso:"9001", area:"Calidad", pdca:"P", status:"vigente", version:"2.1", date:"2025-09-20", pages:8 },
  { id:"DOC-004", name:"Matriz IPERC", iso:"45001", area:"SSOMA", pdca:"P", status:"vigente", version:"5.0", date:"2025-12-01", pages:35 },
  { id:"DOC-005", name:"Plan de Gestion Ambiental", iso:"14001", area:"Ambiental", pdca:"P", status:"vigente", version:"3.0", date:"2025-11-05", pages:28 },
  { id:"DOC-006", name:"Procedimiento Control Documentos", iso:"9001", area:"Calidad", pdca:"D", status:"vigente", version:"4.1", date:"2025-10-22", pages:12 },
  { id:"DOC-007", name:"PETAR - Trabajos en Altura", iso:"45001", area:"SSOMA", pdca:"D", status:"vigente", version:"3.3", date:"2025-11-18", pages:6 },
  { id:"DOC-008", name:"ATS - Analisis de Trabajo Seguro", iso:"45001", area:"SSOMA", pdca:"D", status:"vigente", version:"2.8", date:"2025-12-10", pages:4 },
  { id:"DOC-009", name:"Procedimiento Gestion Residuos", iso:"14001", area:"Ambiental", pdca:"D", status:"vigente", version:"2.5", date:"2025-10-30", pages:15 },
  { id:"DOC-010", name:"Registro No Conformidades", iso:"9001", area:"Calidad", pdca:"C", status:"vigente", version:"3.7", date:"2025-11-25", pages:18 },
  { id:"DOC-011", name:"Informe Auditoria Interna", iso:"multi", area:"Calidad", pdca:"C", status:"revision", version:"2.0", date:"2025-12-05", pages:32 },
  { id:"DOC-012", name:"Accion Correctiva AC-2025-041", iso:"9001", area:"Produccion", pdca:"A", status:"abierto", version:"1.0", date:"2025-12-12", pages:3 },
  { id:"DOC-013", name:"Plan Emergencias y Evacuacion", iso:"45001", area:"SSOMA", pdca:"P", status:"vigente", version:"4.2", date:"2025-09-15", pages:45 },
  { id:"DOC-014", name:"Matriz Aspectos Ambientales", iso:"14001", area:"Ambiental", pdca:"P", status:"vigente", version:"3.1", date:"2025-10-08", pages:22 },
  { id:"DOC-015", name:"Politica Antisoborno", iso:"37001", area:"Compliance", pdca:"P", status:"vigente", version:"2.0", date:"2025-08-20", pages:8 },
  { id:"DOC-016", name:"Registro Due Diligence", iso:"37001", area:"Compliance", pdca:"D", status:"vigente", version:"1.5", date:"2025-11-30", pages:14 },
  { id:"DOC-017", name:"Procedimiento LOTO", iso:"45001", area:"SSOMA", pdca:"D", status:"vigente", version:"2.2", date:"2025-10-12", pages:10 },
  { id:"DOC-018", name:"Plan de Capacitacion Anual", iso:"multi", area:"RRHH", pdca:"P", status:"vigente", version:"2.0", date:"2025-08-01", pages:16 },
  { id:"DOC-019", name:"Procedimiento Excavaciones", iso:"45001", area:"SSOMA", pdca:"D", status:"vigente", version:"3.0", date:"2025-09-25", pages:12 },
  { id:"DOC-020", name:"Matriz de Riesgos Soborno", iso:"37001", area:"Compliance", pdca:"P", status:"vigente", version:"2.3", date:"2025-11-20", pages:20 },
  { id:"DOC-021", name:"Procedimiento Izaje y Gruas", iso:"45001", area:"SSOMA", pdca:"D", status:"vigente", version:"3.5", date:"2025-10-05", pages:14 },
  { id:"DOC-022", name:"Control Operacional Ambiental", iso:"14001", area:"Ambiental", pdca:"D", status:"vigente", version:"2.8", date:"2025-11-15", pages:18 },
  { id:"DOC-023", name:"Revision por la Direccion", iso:"multi", area:"Direccion", pdca:"C", status:"vigente", version:"2.1", date:"2025-12-01", pages:25 },
  { id:"DOC-024", name:"Programa Auditorias Anuales", iso:"multi", area:"Calidad", pdca:"C", status:"vigente", version:"2.0", date:"2025-07-15", pages:10 },
  { id:"DOC-025", name:"Canal de Denuncias Etico", iso:"37001", area:"Compliance", pdca:"D", status:"vigente", version:"1.8", date:"2025-09-10", pages:8 },
];

// ═══ LEGAL REQUIREMENTS DATABASE ═══
var LEGAL_DB = [
  { id:"LEG-001", norma:"Ley 29783", titulo:"Ley de Seguridad y Salud en el Trabajo", tipo:"Ley", entidad:"Congreso", aplica:["Construccion","Mineria","Manufactura","Energia y Gas","Todas"], iso:"45001", estado:"vigente", ultima:"DS 001-2025-TR (Feb 2025)", riesgo:"critico", cumplimiento:88 },
  { id:"LEG-002", norma:"DS 005-2012-TR", titulo:"Reglamento de la Ley 29783", tipo:"Decreto Supremo", entidad:"MTPE", aplica:["Todas"], iso:"45001", estado:"vigente", ultima:"DS 020-2024-TR (Nov 2024)", riesgo:"critico", cumplimiento:85 },
  { id:"LEG-003", norma:"G.050", titulo:"Seguridad durante la Construccion", tipo:"Norma Tecnica", entidad:"MVCS", aplica:["Construccion"], iso:"45001", estado:"vigente", ultima:"RM 050-2024-VIVIENDA", riesgo:"critico", cumplimiento:90 },
  { id:"LEG-004", norma:"Ley 28611", titulo:"Ley General del Ambiente", tipo:"Ley", entidad:"Congreso", aplica:["Todas"], iso:"14001", estado:"vigente", ultima:"DL 1613 (Dic 2024)", riesgo:"alto", cumplimiento:82 },
  { id:"LEG-005", norma:"DS 017-2015-PRODUCE", titulo:"Reglamento de Gestion Ambiental Industrial", tipo:"Decreto Supremo", entidad:"PRODUCE", aplica:["Manufactura","Quimica e Industria"], iso:"14001", estado:"vigente", ultima:"Mod. 2024", riesgo:"medio", cumplimiento:78 },
  { id:"LEG-006", norma:"DS 011-2019-TR", titulo:"Reglamento SST en Construccion", tipo:"Decreto Supremo", entidad:"MTPE", aplica:["Construccion"], iso:"45001", estado:"vigente", ultima:"RM 245-2024-TR (Set 2024)", riesgo:"critico", cumplimiento:92 },
  { id:"LEG-007", norma:"Ley 27446", titulo:"Ley del SEIA", tipo:"Ley", entidad:"Congreso", aplica:["Construccion","Mineria","Energia y Gas","Inmobiliaria"], iso:"14001", estado:"vigente", ultima:"DS 004-2024-MINAM", riesgo:"alto", cumplimiento:75 },
  { id:"LEG-008", norma:"Ley 30424", titulo:"Responsabilidad Administrativa de PJ", tipo:"Ley", entidad:"Congreso", aplica:["Todas"], iso:"37001", estado:"vigente", ultima:"DL 1610 (Nov 2024)", riesgo:"alto", cumplimiento:70 },
  { id:"LEG-009", norma:"DS 002-2019-JUS", titulo:"Reglamento Ley 30424 - Compliance", tipo:"Decreto Supremo", entidad:"MINJUS", aplica:["Todas"], iso:"37001", estado:"vigente", ultima:"DS 010-2024-JUS (Oct 2024)", riesgo:"alto", cumplimiento:68 },
  { id:"LEG-010", norma:"Ley 29325", titulo:"Ley del SINEFA", tipo:"Ley", entidad:"Congreso", aplica:["Mineria","Energia y Gas","Construccion"], iso:"14001", estado:"vigente", ultima:"DL 1607 (2024)", riesgo:"medio", cumplimiento:80 },
  { id:"LEG-011", norma:"DS 024-2016-EM", titulo:"Reglamento SST en Mineria", tipo:"Decreto Supremo", entidad:"MINEM", aplica:["Mineria"], iso:"45001", estado:"vigente", ultima:"DS 023-2024-EM (Ago 2024)", riesgo:"critico", cumplimiento:87 },
  { id:"LEG-012", norma:"Ley 26842", titulo:"Ley General de Salud", tipo:"Ley", entidad:"Congreso", aplica:["Todas"], iso:"45001", estado:"vigente", ultima:"Mod. DL 1620 (2025)", riesgo:"medio", cumplimiento:90 },
  { id:"LEG-013", norma:"DS 003-2013-VIVIENDA", titulo:"Reglamento para Gestion de Residuos Solidos de la Construccion", tipo:"Decreto Supremo", entidad:"MVCS", aplica:["Construccion"], iso:"14001", estado:"vigente", ultima:"RM 120-2024-VIVIENDA", riesgo:"alto", cumplimiento:73 },
  { id:"LEG-014", norma:"Ley 28256", titulo:"Ley de Transporte de Materiales Peligrosos", tipo:"Ley", entidad:"Congreso", aplica:["Transporte y Logistica","Quimica e Industria","Mineria"], iso:"45001", estado:"vigente", ultima:"DS 005-2024-MTC", riesgo:"alto", cumplimiento:80 },
  { id:"LEG-015", norma:"DS 015-2006-EM", titulo:"Reglamento Proteccion Ambiental Electricidad", tipo:"Decreto Supremo", entidad:"MINEM", aplica:["Energia y Gas"], iso:"14001", estado:"vigente", ultima:"RM 380-2024-MINEM", riesgo:"medio", cumplimiento:76 },
];

// ═══ REUSABLE COMPONENTS ═══
function Btn(props) {
  var base = {
    padding: props.sm ? "5px 10px" : "8px 16px",
    borderRadius: 8, border: "1px solid " + C.bd, cursor: "pointer",
    fontSize: props.sm ? 10 : 11, fontWeight: 600, display: "inline-flex",
    alignItems: "center", gap: 6, transition: "all 0.2s",
    fontFamily: "inherit",
  };
  if (props.primary) {
    base.background = C.pr; base.color = "#fff"; base.border = "none";
  } else if (props.accent) {
    base.background = C.ac; base.color = "#000"; base.border = "none";
  } else if (props.danger) {
    base.background = C.dn; base.color = "#fff"; base.border = "none";
  } else {
    base.background = C.sa; base.color = C.tm;
  }
  return React.createElement("button", {
    style: Object.assign({}, base, props.style || {}),
    onClick: props.onClick, disabled: props.disabled
  }, props.children);
}

function Card(props) {
  return React.createElement("div", {
    style: Object.assign({
      background: C.card, border: "1px solid " + C.bd, borderRadius: 12,
      padding: props.p || 16, overflow: "hidden",
    }, props.style || {}),
    onClick: props.onClick,
  }, props.children);
}

function Badge(props) {
  var colors = {
    green: { bg: C.ac + "20", color: C.ac },
    red: { bg: C.dn + "20", color: C.dn },
    yellow: { bg: C.wn + "20", color: C.wn },
    blue: { bg: C.pr + "20", color: C.pr },
    purple: { bg: C.pp + "20", color: C.pp },
    cyan: { bg: C.cy + "20", color: C.cy },
  };
  var c = colors[props.color] || colors.blue;
  return React.createElement("span", {
    style: {
      padding: "3px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700,
      background: c.bg, color: c.color, letterSpacing: 0.5,
      textTransform: "uppercase"
    }
  }, props.children);
}

function Modal(props) {
  if (!props.open) return null;
  return React.createElement("div", {
    style: {
      position: "fixed", inset: 0, zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)"
    },
    onClick: function(e) { if (e.target === e.currentTarget) props.onClose(); }
  },
    React.createElement("div", {
      style: {
        background: C.sf, border: "1px solid " + C.bd, borderRadius: 16,
        width: props.wide ? "90%" : "560px", maxWidth: props.wide ? 1000 : 560,
        maxHeight: "85vh", overflow: "auto", padding: 24,
      }
    },
      React.createElement("div", {
        style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }
      },
        React.createElement("h3", { style: { margin: 0, fontSize: 16, fontWeight: 700, color: C.tx } }, props.title),
        React.createElement("button", {
          onClick: props.onClose,
          style: { background: "none", border: "none", color: C.tm, cursor: "pointer" }
        }, React.createElement(Icons.X))
      ),
      props.children
    )
  );
}

function TabBar(props) {
  return React.createElement("div", {
    style: {
      display: "flex", gap: 2, padding: 3, background: C.sa,
      borderRadius: 10, marginBottom: 16, flexWrap: "wrap",
    }
  }, props.tabs.map(function(t) {
    var active = props.active === t.key;
    return React.createElement("button", {
      key: t.key,
      onClick: function() { props.onChange(t.key); },
      style: {
        padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
        fontSize: 10, fontWeight: 600, fontFamily: "inherit",
        background: active ? C.pr : "transparent",
        color: active ? "#fff" : C.tm,
        transition: "all 0.2s",
      }
    }, t.icon ? React.createElement("span", { style: { marginRight: 5 } }, React.createElement(t.icon)) : null, t.label);
  }));
}

function KPICard(props) {
  var glow = props.glow || C.pr;
  return React.createElement("div", {
    style: {
      background: C.card, border: "1px solid " + C.bd, borderRadius: 12,
      padding: 16, position: "relative", overflow: "hidden", flex: 1, minWidth: 150,
    }
  },
    React.createElement("div", {
      style: {
        position: "absolute", top: -20, right: -20, width: 60, height: 60,
        borderRadius: "50%", background: glow, opacity: 0.08, filter: "blur(12px)"
      }
    }),
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }
    },
      React.createElement("div", {
        style: {
          width: 32, height: 32, borderRadius: 8,
          background: glow + "18", display: "flex",
          alignItems: "center", justifyContent: "center", color: glow,
        }
      }, props.icon),
      React.createElement("span", { style: { fontSize: 10, color: C.tm, fontWeight: 500 } }, props.label)
    ),
    React.createElement("div", {
      style: { fontSize: 22, fontWeight: 800, color: C.tx, marginBottom: 4 }
    }, props.value),
    props.sub ? React.createElement("div", {
      style: { fontSize: 9, color: props.subColor || C.ac, fontWeight: 600 }
    }, props.sub) : null
  );
}

function ProgressBar(props) {
  var pct = props.value || 0;
  var clr = pct >= 85 ? C.ac : pct >= 60 ? C.wn : C.dn;
  return React.createElement("div", {
    style: { width: "100%", height: props.h || 6, borderRadius: 4, background: C.sa, overflow: "hidden" }
  },
    React.createElement("div", {
      style: {
        height: "100%", borderRadius: 4,
        width: pct + "%", background: props.color || clr,
        transition: "width 0.5s ease",
      }
    })
  );
}

// ═══════════════════════════════════════════════════════════════════════
// EXPORT XLS UTILITY — Genera archivo Excel (.xls) desde datos tabulares
// ═══════════════════════════════════════════════════════════════════════
function exportToXLS(headers, rows, filename, sheetTitle) {
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?mso-application progid="Excel.Sheet"?>\n';
  xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
  xml += '<Styles>\n';
  xml += '<Style ss:ID="hdr"><Font ss:Bold="1" ss:Size="11" ss:Color="#FFFFFF"/><Interior ss:Color="#1a1a2e" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="2" ss:Color="#6c5ce7"/></Borders></Style>\n';
  xml += '<Style ss:ID="cell"><Font ss:Size="10"/><Alignment ss:Vertical="Center" ss:WrapText="1"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CCCCCC"/></Borders></Style>\n';
  xml += '<Style ss:ID="title"><Font ss:Bold="1" ss:Size="14" ss:Color="#6c5ce7"/><Alignment ss:Horizontal="Left"/></Style>\n';
  xml += '<Style ss:ID="subtitle"><Font ss:Size="9" ss:Color="#888888"/></Style>\n';
  xml += '<Style ss:ID="num"><Font ss:Size="10"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><NumberFormat ss:Format="0"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#CCCCCC"/></Borders></Style>\n';
  xml += '</Styles>\n';
  xml += '<Worksheet ss:Name="' + (sheetTitle || "Datos").substring(0, 31) + '">\n<Table>\n';
  // Column widths
  headers.forEach(function() { xml += '<Column ss:Width="120"/>\n'; });
  // Title row
  xml += '<Row ss:Height="30"><Cell ss:StyleID="title" ss:MergeAcross="' + (headers.length - 1) + '"><Data ss:Type="String">' + (sheetTitle || filename) + '</Data></Cell></Row>\n';
  xml += '<Row ss:Height="18"><Cell ss:StyleID="subtitle" ss:MergeAcross="' + (headers.length - 1) + '"><Data ss:Type="String">SIG 360 v7.0 Enterprise | Exportado: ' + new Date().toISOString().slice(0, 19).replace("T", " ") + '</Data></Cell></Row>\n';
  xml += '<Row></Row>\n';
  // Header row
  xml += '<Row ss:Height="28">';
  headers.forEach(function(h) { xml += '<Cell ss:StyleID="hdr"><Data ss:Type="String">' + h + '</Data></Cell>'; });
  xml += '</Row>\n';
  // Data rows
  rows.forEach(function(row) {
    xml += '<Row>';
    row.forEach(function(cell) {
      var val = cell === null || cell === undefined ? "" : String(cell);
      var isNum = !isNaN(val) && val.trim() !== "" && val.length < 15;
      xml += '<Cell ss:StyleID="' + (isNum ? "num" : "cell") + '"><Data ss:Type="' + (isNum ? "Number" : "String") + '">' + val.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</Data></Cell>';
    });
    xml += '</Row>\n';
  });
  xml += '</Table>\n</Worksheet>\n</Workbook>';
  var blob = new Blob([xml], { type: "application/vnd.ms-excel" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a"); a.href = url; a.download = (filename || "export") + ".xls";
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

// ── Export button component ──
function ExportXLSBtn(props) {
  return React.createElement("button", {
    onClick: props.onClick, title: "Exportar a Excel",
    style: { background: "#217346" + "20", border: "1px solid #21734650", borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: "#217346", fontSize: 10, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 5 }
  }, React.createElement("span", { style: { fontSize: 13 } }, "\uD83D\uDCCA"), props.label || "Exportar XLS");
}

function SelectField(props) {
  return React.createElement("div", { style: { marginBottom: 12 } },
    props.label ? React.createElement("label", {
      style: { fontSize: 10, fontWeight: 600, color: C.tm, display: "block", marginBottom: 4 }
    }, props.label) : null,
    React.createElement("select", {
      value: props.value, onChange: function(e) { props.onChange(e.target.value); },
      style: {
        width: "100%", padding: "8px 12px", borderRadius: 8, fontSize: 11,
        background: C.sa, border: "1px solid " + C.bd, color: C.tx,
        fontFamily: "inherit", outline: "none",
      }
    },
      React.createElement("option", { value: "" }, props.placeholder || "Seleccionar..."),
      (props.options || []).map(function(o) {
        var val = typeof o === "string" ? o : o.value;
        var lab = typeof o === "string" ? o : o.label;
        return React.createElement("option", { key: val, value: val }, lab);
      })
    )
  );
}

function InputField(props) {
  return React.createElement("div", { style: { marginBottom: 12 } },
    props.label ? React.createElement("label", {
      style: { fontSize: 10, fontWeight: 600, color: C.tm, display: "block", marginBottom: 4 }
    }, props.label) : null,
    React.createElement("input", {
      type: props.type || "text", value: props.value,
      onChange: function(e) { props.onChange(e.target.value); },
      placeholder: props.placeholder || "",
      style: {
        width: "100%", padding: "8px 12px", borderRadius: 8, fontSize: 11,
        background: C.sa, border: "1px solid " + C.bd, color: C.tx,
        fontFamily: "inherit", outline: "none", boxSizing: "border-box",
      }
    })
  );
}

// ═══ DOC TEMPLATE GENERATOR ═══
function generateDocHTML(doc) {
  var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + doc.name + "</title>";
  html += "<style>body{font-family:Calibri,sans-serif;margin:40px;color:#222}";
  html += ".header{border:2px solid #333;padding:12px;display:flex;justify-content:space-between;margin-bottom:20px}";
  html += ".header-logo{width:120px;height:60px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;color:#999;font-size:11px}";
  html += ".header-info{text-align:right;font-size:11px;line-height:1.6}";
  html += ".header-title{text-align:center;flex:1;font-size:16px;font-weight:bold}";
  html += "h1{color:#1a5276;border-bottom:2px solid #2d7ff9;padding-bottom:8px}";
  html += "h2{color:#2d7ff9;margin-top:24px}h3{color:#444}";
  html += "table{width:100%;border-collapse:collapse;margin:12px 0}";
  html += "th,td{border:1px solid #ccc;padding:8px;text-align:left;font-size:12px}";
  html += "th{background:#2d7ff9;color:white}";
  html += ".footer{margin-top:40px;border-top:2px solid #333;padding-top:12px;font-size:10px;color:#666}";
  html += ".signatures{display:flex;justify-content:space-between;margin-top:40px}";
  html += ".sig-block{text-align:center;width:30%;border-top:1px solid #333;padding-top:8px;font-size:11px}";
  html += "</style></head><body>";
  html += "<div class='header'><div class='header-logo'>[LOGO]</div>";
  html += "<div class='header-title'>" + doc.name.toUpperCase() + "</div>";
  html += "<div class='header-info'>Codigo: " + doc.id + "<br>Version: " + doc.version + "<br>Fecha: " + doc.date + "<br>Paginas: " + doc.pages + "</div></div>";
  html += "<h1>1. OBJETIVO</h1><p>Establecer los lineamientos para " + doc.name.toLowerCase() + " en conformidad con la norma ISO " + doc.iso + ".</p>";
  html += "<h1>2. ALCANCE</h1><p>Aplica a todas las actividades del area de " + doc.area + " y procesos relacionados.</p>";
  html += "<h1>3. REFERENCIAS NORMATIVAS</h1><ul><li>ISO " + doc.iso + "</li><li>Politica Integrada SIG</li><li>Manual del SIG</li></ul>";
  html += "<h1>4. DEFINICIONES</h1><p>[Definiciones aplicables al documento]</p>";
  html += "<h1>5. RESPONSABILIDADES</h1><table><tr><th>Cargo</th><th>Responsabilidad</th></tr>";
  html += "<tr><td>Gerente de Area</td><td>Aprobar y asegurar cumplimiento</td></tr>";
  html += "<tr><td>Supervisor</td><td>Implementar y supervisar actividades</td></tr>";
  html += "<tr><td>Trabajadores</td><td>Cumplir lineamientos establecidos</td></tr></table>";
  html += "<h1>6. DESARROLLO</h1><p>[Contenido principal del procedimiento]</p>";
  html += "<h1>7. REGISTROS</h1><table><tr><th>Codigo</th><th>Nombre</th><th>Responsable</th><th>Retencion</th></tr>";
  html += "<tr><td>" + doc.id + "-R01</td><td>Registro asociado</td><td>" + doc.area + "</td><td>3 anios</td></tr></table>";
  html += "<h1>8. CONTROL DE CAMBIOS</h1><table><tr><th>Version</th><th>Fecha</th><th>Descripcion</th></tr>";
  html += "<tr><td>" + doc.version + "</td><td>" + doc.date + "</td><td>Version vigente</td></tr></table>";
  html += "<div class='signatures'><div class='sig-block'>Elaborado por<br><br><br>_________________</div>";
  html += "<div class='sig-block'>Revisado por<br><br><br>_________________</div>";
  html += "<div class='sig-block'>Aprobado por<br><br><br>_________________</div></div>";
  html += "<div class='footer'>Documento confidencial - SIG Construccion 360 | ISO " + doc.iso + " | Ciclo PDCA: " + doc.pdca + "</div>";
  html += "</body></html>";
  return html;
}

function downloadDoc(doc) {
  // Si tiene archivo original subido → descargar ESE MISMO archivo tal cual
  if (doc._dataUrl) {
    var a = document.createElement("a");
    a.href = doc._dataUrl;
    a.download = doc._fileName || (doc.id + "_" + doc.name.replace(/\s+/g, "_"));
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    return;
  }
  // Sin archivo original → generar plantilla Word
  var html = generateDocHTML(doc);
  var wordHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->" + html.substring(html.indexOf("<style"), html.indexOf("</head>")) + "</head>" + html.substring(html.indexOf("<body"));
  var blob = new Blob(["\ufeff" + wordHtml], { type: "application/msword" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a"); a.href = url;
  a.download = doc.id + "_" + doc.name.replace(/\s+/g, "_") + ".doc";
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildDocWordHTML(doc) {
  var content = doc._content || "";
  // If content is already HTML, wrap it
  var isHtml = content.trim().indexOf("<") === 0 || content.indexOf("<html") >= 0 || content.indexOf("<body") >= 0 || content.indexOf("<div") >= 0 || content.indexOf("<p") >= 0;
  
  var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + doc.name + "</title>";
  html += "<style>@page{size:A4;margin:2cm}body{font-family:Calibri,'Segoe UI',Arial,sans-serif;margin:40px;color:#222;line-height:1.6;font-size:12px}";
  html += ".header-table{width:100%;border-collapse:collapse;border:2px solid #1a5276;margin-bottom:20px}";
  html += ".header-table td{border:1px solid #1a5276;padding:8px;vertical-align:middle}";
  html += ".logo-cell{width:120px;text-align:center}.title-cell{text-align:center;font-size:14px;font-weight:bold;color:#1a5276}";
  html += ".info-cell{width:160px;font-size:10px;line-height:1.8}";
  html += "h1{color:#1a5276;border-bottom:2px solid #2d7ff9;padding-bottom:8px;font-size:14px}";
  html += "h2{color:#2d7ff9;font-size:13px}h3{color:#444;font-size:12px}";
  html += "table{width:100%;border-collapse:collapse;margin:12px 0}th,td{border:1px solid #bbb;padding:6px 8px;font-size:11px}";
  html += "th{background:#2d7ff9;color:white;font-weight:bold}";
  html += "pre{background:#f4f4f4;padding:12px;border-radius:4px;font-size:10px;overflow-x:auto;white-space:pre-wrap;word-wrap:break-word}";
  html += ".footer{margin-top:40px;border-top:2px solid #1a5276;padding-top:12px;font-size:9px;color:#666}";
  html += "</style></head><body>";
  
  // Header
  html += "<table class='header-table'><tr>";
  html += "<td class='logo-cell' rowspan='2'><div style='width:100px;height:50px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;color:#999;font-size:10px'>[LOGO]</div></td>";
  html += "<td class='title-cell' rowspan='2'>" + doc.name.toUpperCase() + "<br><span style='font-size:10px;color:#555'>SIG Construccion 360 — Control Documental</span></td>";
  html += "<td class='info-cell'>Codigo: <b>" + doc.id + "</b> | Version: <b>" + (doc.version || "1.0") + "</b><br>Fecha: <b>" + (doc.date || new Date().toISOString().slice(0,10)) + "</b> | ISO: <b>" + (doc.iso || "multi") + "</b></td>";
  html += "</tr></table>";

  // Content
  if (isHtml) {
    // Strip outer html/head/body tags if present, keep inner content
    var bodyMatch = content.match(/<body[^>]*>([ -￿]*?)<\/body>/i);
    html += bodyMatch ? bodyMatch[1] : content;
  } else {
    // Plain text — format paragraphs
    var lines = content.split("\n");
    var inPre = false;
    lines.forEach(function(line) {
      var trimmed = line.trim();
      if (!trimmed) { html += "<br>"; return; }
      // Detect headings (lines in CAPS or starting with numbers like "1.", "1.1")
      if (/^\d+\.\s/.test(trimmed) || /^[A-Z\s]{10,}$/.test(trimmed)) {
        html += "<h2>" + trimmed + "</h2>";
      } else if (/^\d+\.\d+/.test(trimmed)) {
        html += "<h3>" + trimmed + "</h3>";
      } else {
        html += "<p>" + trimmed + "</p>";
      }
    });
  }

  // Footer
  html += "<div class='footer'>Documento importado — SIG Construccion 360 v7.0 Enterprise | ISO " + (doc.iso || "multi");
  html += " | Codigo: " + doc.id + " | Generado: " + new Date().toISOString().slice(0,10) + "</div>";
  html += "</body></html>";
  return html;
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
function SIGConstruccion360() {
  var _s = useState, _e = useEffect, _m = useMemo, _c = useCallback;
  var s = _s("dashboard"), view = s[0], setView = s[1];
  var s2 = _s(true), sbOpen = s2[0], setSbOpen = s2[1];
  var s3 = _s(false), mobMenu = s3[0], setMobMenu = s3[1];
  var s4 = _s(""), empresa = s4[0], setEmpresa = s4[1];
  var s5 = _s(null), previewDoc = s5[0], setPreviewDoc = s5[1];
  var s6 = _s("general"), dashTab = s6[0], setDashTab = s6[1];
  var s7 = _s(0), legalStep = s7[0], setLegalStep = s7[1];
  var s8 = _s({ sector: "Construccion", alcance: "", workers: "100-500" }), legalProfile = s8[0], setLegalProfile = s8[1];
  var _sLegalDB = _s(LEGAL_DB), legalDB = _sLegalDB[0], setLegalDB = _sLegalDB[1];
  var _sLegalUpdating = _s(false), legalUpdating = _sLegalUpdating[0], setLegalUpdating = _sLegalUpdating[1];
  var _sLegalUpdateMsg = _s(""), legalUpdateMsg = _sLegalUpdateMsg[0], setLegalUpdateMsg = _sLegalUpdateMsg[1];
  var s9 = _s(""), docSearch = s9[0], setDocSearch = s9[1];
  var s10 = _s("all"), docFilter = s10[0], setDocFilter = s10[1];
  var _sDocsDB = _s(DOCUMENTS.map(function(d,i){ return Object.assign({},d,{mlId:i+1,origen:"Sistema",responsable:"Coord. SIG",ubicacion:"Servidor SIG",retencion:"3 anios"});})), docsDB = _sDocsDB[0], setDocsDB = _sDocsDB[1];
  var _sShowNewDoc = _s(false), showNewDoc = _sShowNewDoc[0], setShowNewDoc = _sShowNewDoc[1];
  var _sNewDocForm = _s({ id:"", name:"", iso:"9001", area:"", pdca:"P", version:"1.0" }), newDocForm = _sNewDocForm[0], setNewDocForm = _sNewDocForm[1];
  var _sShowDocImport = _s(false), showDocImport = _sShowDocImport[0], setShowDocImport = _sShowDocImport[1];
  var _sDocImportText = _s(""), docImportText = _sDocImportText[0], setDocImportText = _sDocImportText[1];
  var _sDocUpFiles = _s([]), docUpFiles = _sDocUpFiles[0], setDocUpFiles = _sDocUpFiles[1];
  var _sDocUpContents = _s({}), docUpContents = _sDocUpContents[0], setDocUpContents = _sDocUpContents[1];
  var _sDocBlobUrls = _s({}), docBlobUrls = _sDocBlobUrls[0], setDocBlobUrls = _sDocBlobUrls[1];
  var _sDocDataUrls = _s({}), docDataUrls = _sDocDataUrls[0], setDocDataUrls = _sDocDataUrls[1];
  var _sDocUpParsed = _s([]), docUpParsed = _sDocUpParsed[0], setDocUpParsed = _sDocUpParsed[1];
  var _sDocUpAnalyzing = _s(false), docUpAnalyzing = _sDocUpAnalyzing[0], setDocUpAnalyzing = _sDocUpAnalyzing[1];
  var _sDocUpMsg = _s(""), docUpMsg = _sDocUpMsg[0], setDocUpMsg = _sDocUpMsg[1];
  var docFileInputRef = useRef(null);
  var s11 = _s(0), aiStep = s11[0], setAiStep = s11[1];
  var s12 = _s({ tipo: "", sistemas: [], alcance: "", area: "", objetivo: "", auditor_lider: "", equipo: "", fecha: _aToday() }), aiConfig = s12[0], setAiConfig = s12[1];
  var s13 = _s([]), aiFiles = s13[0], setAiFiles = s13[1];
  var s14 = _s({}), aiFileContents = s14[0], setAiFileContents = s14[1];
  var sA1 = _s(false), aiAnalyzing = sA1[0], setAiAnalyzing = sA1[1];
  var sA2 = _s(0), aiProgress = sA2[0], setAiProgress = sA2[1];
  var sA3 = _s(null), aiReport = sA3[0], setAiReport = sA3[1];
  var sA4 = _s([]), aiMessages = sA4[0], setAiMessages = sA4[1];
  var sA5 = _s([]), auditReports = sA5[0], setAuditReports = sA5[1];
  var fileInputRef = useRef(null);
  var s15 = _s("dashboard-q"), qTab = s15[0], setQTab = s15[1];
  var s16 = _s("dashboard-a"), aTab = s16[0], setATab = s16[1];
  var s17 = _s("dashboard-s"), sTab = s17[0], setSTab = s17[1];
  var s18 = _s("dashboard-ab"), abTab = s18[0], setAbTab = s18[1];
  var s19 = _s([]), ncList = s19[0], setNcList = s19[1];
  var s20 = _s(false), showNcForm = s20[0], setShowNcForm = s20[1];
  var s21 = _s({ tipo:"menor", proceso:"", desc:"", responsable:"", plazo:"" }), ncForm = s21[0], setNcForm = s21[1];
  var s22 = _s([]), inspList = s22[0], setInspList = s22[1];

  // ═══ EDITABLE DATABASES STATE ═══
  var s23 = _s([
    {id:"INC-001",tipo:"Incidente Peligroso",fecha:"2025-12-08",area:"Obras civiles",desc:"Desprendimiento de material en excavacion profunda sin previo aviso",lesion:"Ninguna",diasP:0,invest:"Completa",accion:"Reforzar entibado + vigias permanentes",est:"cerrado"},
    {id:"INC-002",tipo:"Cuasi Accidente",fecha:"2025-12-15",area:"Estructura",desc:"Herramienta cae desde andamio 3er nivel hacia zona de transito",lesion:"Ninguna",diasP:0,invest:"Completa",accion:"Rodapie en andamios + malla perimetral",est:"cerrado"},
    {id:"INC-003",tipo:"Accidente Leve",fecha:"2025-12-20",area:"Almacen",desc:"Corte superficial en mano por manipulacion de laminas metalicas sin guante",lesion:"Corte leve",diasP:0,invest:"Completa",accion:"Capacitacion uso EPP + supervision",est:"cerrado"},
    {id:"INC-004",tipo:"Incidente Peligroso",fecha:"2025-12-28",area:"Inst. electricas",desc:"Arco electrico en tablero provisional por conexion defectuosa",lesion:"Ninguna",diasP:0,invest:"En curso",accion:"Revision total tableros + LOTO obligatorio",est:"abierto"},
    {id:"INC-005",tipo:"Cuasi Accidente",fecha:"2026-01-05",area:"Equipos pesados",desc:"Retroexcavadora gira sin verificar punto ciego con personal cercano",lesion:"Ninguna",diasP:0,invest:"Completa",accion:"Vigia obligatorio + alarma retroceso",est:"cerrado"},
  ]), incidentsDB = s23[0], setIncidentsDB = s23[1];
  var s24 = _s(false), showIncForm = s24[0], setShowIncForm = s24[1];
  var s25 = _s({tipo:"",fecha:"",area:"",desc:"",lesion:"Ninguna",diasP:0}), incForm = s25[0], setIncForm = s25[1];
  // ═══ NC SST STATE ═══
  var _sNcSST = _s([
    {id:"NC-SST-012",tipo:"Mayor",area:"Obras civiles",desc:"IPERC no actualizada para actividades de excavacion >4m profundidad",estado:"abierta",fecha:"2025-12-18",resp:"J. Perez",plazo:"2026-01-20",avance:30,acc:"Actualizar IPERC e incluir controles para excavacion profunda",norma:"Cl.6.1.2"},
    {id:"NC-SST-011",tipo:"Menor",area:"Estructura",desc:"Arneses de seguridad sin inspeccion trimestral documentada",estado:"en proceso",fecha:"2025-12-10",resp:"M. Torres",plazo:"2026-01-05",avance:65,acc:"Implementar programa de inspeccion trimestral de arneses",norma:"Cl.8.1.2"},
    {id:"NC-SST-010",tipo:"Menor",area:"Almacen",desc:"Extintores en zona de acopio sin revision mensual vigente",estado:"cerrada",fecha:"2025-11-25",resp:"R. Diaz",plazo:"2025-12-15",avance:100,acc:"Cronograma de revision mensual implementado",norma:"Cl.8.2"},
    {id:"NC-SST-009",tipo:"Mayor",area:"Inst. electricas",desc:"Procedimiento LOTO no aplicado en tablero general durante mantenimiento",estado:"cerrada",fecha:"2025-11-15",resp:"C. Vargas",plazo:"2025-12-10",avance:100,acc:"Reforzamiento de procedimiento LOTO y capacitacion",norma:"Cl.8.1"},
    {id:"OBS-SST-005",tipo:"Observacion",area:"General",desc:"Senalizacion temporal insuficiente en desvio peatonal de obra",estado:"abierta",fecha:"2025-12-22",resp:"A. Ruiz",plazo:"2026-01-10",avance:15,acc:"Instalar senalizacion conforme a G.050",norma:"Cl.8.1"},
  ]), ncSSTDB = _sNcSST[0], setNcSSTDB = _sNcSST[1];
  var _sShowNcSSTForm = _s(false), showNcSSTForm = _sShowNcSSTForm[0], setShowNcSSTForm = _sShowNcSSTForm[1];
  var _sNcSSTForm = _s({tipo:"Mayor",area:"",desc:"",resp:"",plazo:"",acc:"",norma:"",avance:0}), ncSSTForm = _sNcSSTForm[0], setNcSSTForm = _sNcSSTForm[1];
  var _sNcSSTEdit = _s(null), ncSSTEditId = _sNcSSTEdit[0], setNcSSTEditId = _sNcSSTEdit[1];
  var _sNcSSTImport = _s(false), showNcSSTImport = _sNcSSTImport[0], setShowNcSSTImport = _sNcSSTImport[1];
  var _sNcSSTImportData = _s([]), ncSSTImportData = _sNcSSTImportData[0], setNcSSTImportData = _sNcSSTImportData[1];
  var _sNcSSTImporting = _s(false), ncSSTImporting = _sNcSSTImporting[0], setNcSSTImporting = _sNcSSTImporting[1];
  // ═══ INCIDENTES IMPORT/EDIT STATE ═══
  var _sIncImport = _s(false), showIncImport = _sIncImport[0], setShowIncImport = _sIncImport[1];
  var _sIncImportData = _s([]), incImportData = _sIncImportData[0], setIncImportData = _sIncImportData[1];
  var _sIncImporting = _s(false), incImporting = _sIncImporting[0], setIncImporting = _sIncImporting[1];
  var _sIncEditId = _s(null), incEditId = _sIncEditId[0], setIncEditId = _sIncEditId[1];
  // ═══ INSPECCIONES STATE ═══
  var _sInspDB = _s([
    {id:"INS-125",tipo:"EPP",area:"Obras civiles",fecha:"2025-12-20",hall:2,crit:0,insp:"J. Perez",est:"cerrada",obs:"EPP completo verificado en todas las cuadrillas"},
    {id:"INS-124",tipo:"Orden/Limpieza",area:"Almacen",fecha:"2025-12-18",hall:3,crit:1,insp:"M. Garcia",est:"abierta",obs:"Materiales obstruyendo ruta de evacuacion"},
    {id:"INS-123",tipo:"Herramientas",area:"Estructura",fecha:"2025-12-15",hall:1,crit:0,insp:"R. Torres",est:"cerrada",obs:"Herramientas en buen estado"},
    {id:"INS-122",tipo:"Protecciones",area:"Fachada",fecha:"2025-12-12",hall:4,crit:2,insp:"C. Vargas",est:"abierta",obs:"Barandas provisionales incompletas en 4to piso"},
    {id:"INS-121",tipo:"Senalizacion",area:"Perimetro",fecha:"2025-12-10",hall:2,crit:0,insp:"A. Ruiz",est:"cerrada",obs:"Senalizacion conforme a G.050"},
  ]), inspDBSt = _sInspDB[0], setInspDBSt = _sInspDB[1];
  var _sShowInspForm = _s(false), showInspForm = _sShowInspForm[0], setShowInspForm = _sShowInspForm[1];
  var _sInspForm = _s({tipo:"EPP",area:"",fecha:"",insp:"",hall:0,crit:0,obs:""}), inspForm = _sInspForm[0], setInspForm = _sInspForm[1];
  var _sInspImport = _s(false), showInspImport = _sInspImport[0], setShowInspImport = _sInspImport[1];
  var _sInspImportData = _s([]), inspImportData = _sInspImportData[0], setInspImportData = _sInspImportData[1];
  var _sInspImporting = _s(false), inspImporting = _sInspImporting[0], setInspImporting = _sInspImporting[1];
  var _sInspEditId = _s(null), inspEditId = _sInspEditId[0], setInspEditId = _sInspEditId[1];
  var s26 = _s(null), editDbRow = s26[0], setEditDbRow = s26[1];
  var s27 = _s(null), editDbModule = s27[0], setEditDbModule = s27[1];
  var s28 = _s(""), mlSearch = s28[0], setMlSearch = s28[1];
  var s29 = _s("all"), mlFilter = s29[0], setMlFilter = s29[1];
  var s30 = _s(false), showImport = s30[0], setShowImport = s30[1];
  var s31 = _s(""), importText = s31[0], setImportText = s31[1];
  // masterListDB integrado con docsDB (fuente unica) — s32 mantiene conteo de hooks estable
  var s32 = _s(null);
  var masterListDB = docsDB;
  var s33 = _s("dashboard-s"), sTab2 = s33[0], setSTab2 = s33[1];
  var _sPdcaTabR = _s("P"), pdcaTabR = _sPdcaTabR[0], setPdcaTabR = _sPdcaTabR[1];
  var _sPdcaPreviewR = _s(null), pdcaPreviewDocR = _sPdcaPreviewR[0], setPdcaPreviewDocR = _sPdcaPreviewR[1];
  var _sPdcaPreviewHTMLR = _s(""), pdcaPreviewHTMLR = _sPdcaPreviewHTMLR[0], setPdcaPreviewHTMLR = _sPdcaPreviewHTMLR[1];
  var _sDragOver = _s(false), dragOverUp = _sDragOver[0], setDragOverUp = _sDragOver[1];
  // ═══ DUE DILIGENCE ISO 37001 STATE ═══
  var _sDDReg = _s([
    {id:"DD-001",ent:"Constructora XYZ SAC",tipo:"Proveedor",sector:"Construccion",pais:"Peru",contacto:"Ing. Carlos Ruiz",ruc:"20456789012",transVal:"S/ 2.4M",factores:{pais:3,sector:4,transaccion:3,oportunidad:4,historial:3},score:35,nivel:"Alto",est:"En revision",fecha:"2025-12-10",obs:"PEP identificado en directorio. Requiere DD reforzada.",medidas:"DD reforzada + monitoreo trimestral + clausula antisoborno"},
    {id:"DD-002",ent:"Minera Andina SRL",tipo:"Cliente",sector:"Mineria",pais:"Peru",contacto:"Lic. Maria Vasquez",ruc:"20567890123",transVal:"S/ 5.1M",factores:{pais:3,sector:3,transaccion:2,oportunidad:2,historial:2},score:62,nivel:"Medio",est:"Aprobado condic.",fecha:"2025-11-28",obs:"Sector con riesgo inherente medio. Sin antecedentes negativos.",medidas:"Clausula antisoborno + revision anual"},
    {id:"DD-003",ent:"Transportes Lima SAC",tipo:"Proveedor",sector:"Transporte",pais:"Peru",contacto:"Sr. Juan Torres",ruc:"20678901234",transVal:"S/ 850K",factores:{pais:3,sector:2,transaccion:1,oportunidad:1,historial:1},score:85,nivel:"Bajo",est:"Aprobado",fecha:"2025-12-05",obs:"Empresa formal, buena reputacion, sin señales de alerta.",medidas:"Clausula estandar + revision bienal"},
    {id:"DD-004",ent:"Gob. Regional Junin",tipo:"Cliente Publico",sector:"Gobierno",pais:"Peru",contacto:"Dir. Infraestructura",ruc:"20123456789",transVal:"S/ 12M",factores:{pais:3,sector:5,transaccion:4,oportunidad:5,historial:3},score:40,nivel:"Alto",est:"En revision",fecha:"2025-12-15",obs:"Entidad publica. Proyecto de gran envergadura con multiples subcontratistas.",medidas:"DD reforzada + compliance officer dedicado + auditorias trimestrales"},
    {id:"DD-005",ent:"Aceros del Peru SA",tipo:"Proveedor",sector:"Manufactura",pais:"Peru",contacto:"Gerencia Comercial",ruc:"20234567890",transVal:"S/ 1.2M",factores:{pais:3,sector:2,transaccion:1,oportunidad:1,historial:1},score:92,nivel:"Bajo",est:"Aprobado",fecha:"2025-10-20",obs:"Proveedor recurrente con historial limpio de 5 anios.",medidas:"Revision bienal"},
  ]), ddReg = _sDDReg[0], setDDReg = _sDDReg[1];
  var _sDDForm = _s(false), showDDForm = _sDDForm[0], setShowDDForm = _sDDForm[1];
  var _sDDStep = _s(0), ddStep = _sDDStep[0], setDDStep = _sDDStep[1];
  var _sDDData = _s({ent:"",tipo:"Proveedor",sector:"",pais:"Peru",contacto:"",ruc:"",transVal:"",obs:""}), ddData = _sDDData[0], setDDData = _sDDData[1];
  var _sDDFactores = _s({pais:1,sector:1,transaccion:1,oportunidad:1,historial:1}), ddFactores = _sDDFactores[0], setDDFactores = _sDDFactores[1];
  var _sDDDetail = _s(null), ddDetail = _sDDDetail[0], setDDDetail = _sDDDetail[1];
  // ═══ GENERIC IMPORT/EDIT STATE ═══
  var _sGI = _s({}), gImp = _sGI[0], setGImp = _sGI[1];
  var _sGE = _s({}), gEdit = _sGE[0], setGEdit = _sGE[1];
  // ═══ HOISTED DATA STATE (from static arrays) ═══
  var _sipercDB = _s([
      {act:"Excavacion >2m",pel:"Derrumbe/Atrapamiento",prob:3,sev:4,nrp:12,niv:"Intolerable",ctrl:"Entibado + vigias + PETAR"},
      {act:"Trabajo altura >1.8m",pel:"Caida distinto nivel",prob:3,sev:4,nrp:12,niv:"Intolerable",ctrl:"Arnes + linea vida + PETAR"},
      {act:"Izaje con grua",pel:"Caida carga suspendida",prob:2,sev:4,nrp:8,niv:"Importante",ctrl:"Rigger certificado + inspeccion"},
      {act:"Soldadura/Oxicorte",pel:"Quemaduras/Incendio",prob:2,sev:3,nrp:6,niv:"Moderado",ctrl:"EPP especifico + vigias"},
      {act:"Herramientas manuales",pel:"Golpes/Cortes",prob:3,sev:2,nrp:6,niv:"Moderado",ctrl:"Inspeccion pre-uso + ATS"},
      {act:"Trabajos electricos",pel:"Electrocucion",prob:2,sev:4,nrp:8,niv:"Importante",ctrl:"LOTO + PETAR"},
      {act:"Manipulacion quimicos",pel:"Intoxicacion",prob:2,sev:3,nrp:6,niv:"Moderado",ctrl:"MSDS + EPP + ventilacion"},
      {act:"Transporte materiales",pel:"Atropello/Volcadura",prob:2,sev:4,nrp:8,niv:"Importante",ctrl:"Vigia + vel. controlada"},
    ]), ipercDB = _sipercDB[0], setIpercDB = _sipercDB[1];
  var _scapsDB = _s([
      {tema:"Induccion General SST",tipo:"Obligatoria",h:8,a:100,f:"Al ingreso"},{tema:"Trabajos en Altura",tipo:"Especifica",h:4,a:98,f:"Semestral"},
      {tema:"Excavaciones y Zanjas",tipo:"Especifica",h:4,a:95,f:"Semestral"},{tema:"IPERC y ATS",tipo:"Obligatoria",h:4,a:97,f:"Trimestral"},
      {tema:"Primeros Auxilios",tipo:"Obligatoria",h:8,a:92,f:"Anual"},{tema:"Uso de Extintores",tipo:"Obligatoria",h:2,a:96,f:"Semestral"},
      {tema:"LOTO",tipo:"Especifica",h:4,a:90,f:"Semestral"},{tema:"Manejo Defensivo",tipo:"Especifica",h:4,a:88,f:"Anual"},
    ]), capsDB = _scapsDB[0], setCapsDB = _scapsDB[1];
  var _sprocDB = _s([
      {name:"Gestion Comercial",eficacia:91,meta:85,dueno:"Gerencia Comercial",tipo:"Core",docs:8,nc:1},
      {name:"Diseno y Desarrollo",eficacia:88,meta:85,dueno:"Ing. Proyectos",tipo:"Core",docs:12,nc:2},
      {name:"Adquisiciones",eficacia:85,meta:80,dueno:"Logistica",tipo:"Core",docs:6,nc:1},
      {name:"Ejecucion de Obra",eficacia:92,meta:90,dueno:"Residente de Obra",tipo:"Core",docs:15,nc:0},
      {name:"Control de Calidad",eficacia:94,meta:90,dueno:"Jefe QA/QC",tipo:"Core",docs:10,nc:0},
      {name:"Entrega y Cierre",eficacia:87,meta:85,dueno:"Gerencia Proyectos",tipo:"Core",docs:5,nc:1},
      {name:"Gestion RRHH",eficacia:82,meta:80,dueno:"Jefe RRHH",tipo:"Soporte",docs:7,nc:0},
      {name:"Gestion Financiera",eficacia:90,meta:85,dueno:"Contabilidad",tipo:"Soporte",docs:4,nc:0},
      {name:"Planificacion SIG",eficacia:86,meta:85,dueno:"Coord. SIG",tipo:"Estrategico",docs:9,nc:1},
      {name:"Mejora Continua",eficacia:83,meta:80,dueno:"Coord. SIG",tipo:"Estrategico",docs:6,nc:2},
    ]), procDB = _sprocDB[0], setProcDB = _sprocDB[1];
  var _snc9DB = _s([
      {id:"NC-2025-041",tipo:"Mayor",proceso:"Adquisiciones",desc:"Evaluacion de proveedores criticos sin evidencia documentada de criterios de seleccion",estado:"abierta",fecha:"2025-12-12",responsable:"J. Lopez",plazo:"2026-01-15",avance:40},
      {id:"NC-2025-038",tipo:"Menor",proceso:"Ejecucion de Obra",desc:"Registros de inspeccion de materiales incompletos en recepcion de acero",estado:"en proceso",fecha:"2025-11-28",responsable:"M. Torres",plazo:"2026-01-10",avance:70},
      {id:"NC-2025-035",tipo:"Menor",proceso:"Diseno",desc:"Planos de detalle sin control de version actualizado en carpeta de obra",estado:"cerrada",fecha:"2025-11-15",responsable:"R. Diaz",plazo:"2025-12-15",avance:100},
      {id:"NC-2025-032",tipo:"Mayor",proceso:"Control de Calidad",desc:"Ensayos de concreto sin certificacion de laboratorio vigente",estado:"cerrada",fecha:"2025-10-20",responsable:"C. Vargas",plazo:"2025-11-20",avance:100},
      {id:"NC-2025-029",tipo:"Menor",proceso:"Mejora Continua",desc:"Indicadores de proceso sin analisis de tendencia en ultimo trimestre",estado:"abierta",fecha:"2025-10-05",responsable:"A. Ruiz",plazo:"2026-01-05",avance:55},
      {id:"OBS-2025-018",tipo:"Observacion",proceso:"Gestion RRHH",desc:"Perfiles de puesto no alineados con competencias ISO 9001 Cl.7.2",estado:"abierta",fecha:"2025-12-01",responsable:"P. Mendez",plazo:"2026-02-01",avance:20},
    ]), nc9DB = _snc9DB[0], setNc9DB = _snc9DB[1];
  var _saspDB = _s([
      {asp:"Generacion de polvo",imp:"Contamin. aire",sig:18,tipo:"Negativo",ctrl:"Riego + mallas",est:"controlado"},
      {asp:"Generacion de ruido",imp:"Afect. comunidad",sig:15,tipo:"Negativo",ctrl:"Horarios + barreras",est:"controlado"},
      {asp:"Uso de agua",imp:"Agotamiento recurso",sig:14,tipo:"Negativo",ctrl:"Recirculacion 60%",est:"controlado"},
      {asp:"Generacion RCD",imp:"Contamin. suelo",sig:16,tipo:"Negativo",ctrl:"Segregacion + disposicion",est:"en mejora"},
      {asp:"Emisiones vehiculares",imp:"Contamin. aire",sig:12,tipo:"Negativo",ctrl:"Mantenimiento flota",est:"controlado"},
      {asp:"Derrame combustible",imp:"Contamin. suelo/agua",sig:20,tipo:"Negativo",ctrl:"Bandejas + Kit antiderrame",est:"controlado"},
      {asp:"Revegetacion",imp:"Recuperacion ecosistema",sig:10,tipo:"Positivo",ctrl:"Plan de cierre",est:"en ejecucion"},
    ]), aspDB = _saspDB[0], setAspDB = _saspDB[1];
  var _sresDB = _s([{tipo:"Desmonte",vol:450,pct:45,disp:"Relleno autorizado"},{tipo:"Chatarra",vol:80,pct:8,disp:"Reciclaje"},{tipo:"Madera",vol:120,pct:12,disp:"Reutilizacion"},{tipo:"Plasticos",vol:45,pct:4.5,disp:"Reciclaje"},{tipo:"Concreto",vol:200,pct:20,disp:"Reciclaje/Relleno"},{tipo:"Peligrosos",vol:25,pct:2.5,disp:"EO-RS autorizada"},{tipo:"Otros",vol:80,pct:8,disp:"Relleno sanitario"}]), resDB = _sresDB[0], setResDB = _sresDB[1];
  var _ssatDB = _s([{dim:"Cumplimiento de plazo",score:4.5},{dim:"Calidad del acabado",score:4.8},{dim:"Atencion post-entrega",score:4.2},{dim:"Comunicacion",score:4.6},{dim:"Relacion precio-calidad",score:4.3},{dim:"Documentacion entregada",score:4.7}]), satDB = _ssatDB[0], setSatDB = _ssatDB[1];
  var _sindDB = _s([
        {ind:"Satisfaccion del cliente",cl:"9.1.2",form:"Promedio encuestas",meta:">=4.5",actual:"4.7",tend:"\u2191",ok:true},
        {ind:"Conformidad del producto",cl:"8.6",form:"(Conformes/Total)x100",meta:">=95%",actual:"97.8%",tend:"\u2191",ok:true},
        {ind:"Eficacia de procesos",cl:"4.4",form:"Promedio eficacia",meta:">=85%",actual:"88.4%",tend:"\u2191",ok:true},
        {ind:"Cierre de NC",cl:"10.2",form:"(Cerradas a tiempo/Total)x100",meta:">=90%",actual:"92%",tend:"\u2191",ok:true},
        {ind:"Reclamos clientes",cl:"9.1.2",form:"Cantidad mensual",meta:"<=5",actual:"2",tend:"\u2193",ok:true},
        {ind:"Desempeno proveedores",cl:"8.4",form:"Promedio evaluacion",meta:">=75%",actual:"81%",tend:"\u2192",ok:true},
        {ind:"Cumplimiento capacitacion",cl:"7.2",form:"(Ejecutado/Programado)x100",meta:">=90%",actual:"94%",tend:"\u2191",ok:true},
        {ind:"Costo de no calidad",cl:"10.1",form:"Falla int.+ext.",meta:"<=S/60K",actual:"S/51K",tend:"\u2193",ok:true},
        {ind:"Auditorias completadas",cl:"9.2",form:"(Ejecutadas/Programadas)x100",meta:"100%",actual:"83%",tend:"\u2192",ok:false},
        {ind:"Acciones de mejora",cl:"10.3",form:"Implementadas",meta:">=80%",actual:"72%",tend:"\u2191",ok:false},
      ]), indDB = _sindDB[0], setIndDB = _sindDB[1];
  var _smonDB = _s([{p:"PM10",lmp:"150 ug/m3",r:"85 ug/m3",ok:true,f:"Mensual"},{p:"PM2.5",lmp:"50 ug/m3",r:"28 ug/m3",ok:true,f:"Mensual"},{p:"Ruido Diurno",lmp:"80 dB",r:"72 dB",ok:true,f:"Quincenal"},{p:"Ruido Nocturno",lmp:"70 dB",r:"58 dB",ok:true,f:"Quincenal"},{p:"DBO5 efluentes",lmp:"100 mg/L",r:"45 mg/L",ok:true,f:"Trimestral"},{p:"pH efluentes",lmp:"6.5-8.5",r:"7.2",ok:true,f:"Trimestral"},{p:"Aceites y grasas",lmp:"20 mg/L",r:"8 mg/L",ok:true,f:"Trimestral"}]), monDB = _smonDB[0], setMonDB = _smonDB[1];


  // ═══ GENERIC IMPORT/EDIT HELPERS ═══
  function gDoImport(key, files, prompt) {
    if (!files || !files.length) return;
    setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: [], loading: true, show: false }; return n; });
    var pending = files.length; var results = [];
    Array.from(files).forEach(function(file) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        var text = ev.target.result.substring(0, 8000);
        fetch("https://api.anthropic.com/v1/messages", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt + "\n\nDocumento:\n" + text }] })
        }).then(function(r) { return r.json(); }).then(function(data) {
          try { var t = data.content[0].text.replace(/```json|```/g, "").trim(); var parsed = JSON.parse(t); results = results.concat(Array.isArray(parsed) ? parsed : [parsed]); } catch(e) {}
          pending--; if (pending === 0) { setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: results, loading: false, show: true }; return n; }); }
        }).catch(function() { pending--; if (pending === 0) { setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: results, loading: false, show: true }; return n; }); } });
      };
      reader.readAsText(file);
    });
  }
  function gConfirmImp(key, setDb, idGen, defaults) {
    var imp = (gImp[key] || {}).data || [];
    var items = imp.map(function(d, i) { var r = Object.assign({}, defaults || {}, d); r.id = idGen(i); return r; });
    setDb(function(p) { return p.concat(items); });
    setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: [], loading: false, show: false }; return n; });
  }
  function gSetImpF(key, idx, field, val) {
    setGImp(function(p) { var n = Object.assign({}, p); var d = (n[key] || {}).data || []; var nd = d.slice(); nd[idx] = Object.assign({}, nd[idx]); nd[idx][field] = val; n[key] = Object.assign({}, n[key], { data: nd }); return n; });
  }
  function gDelImpRow(key, idx) {
    setGImp(function(p) { var n = Object.assign({}, p); var d = (n[key] || {}).data || []; n[key] = Object.assign({}, n[key], { data: d.filter(function(_, j) { return j !== idx; }) }); return n; });
  }
  function gSaveRow(setDb, id, field, val, numFields) {
    setDb(function(p) { return p.map(function(r) {
      if (r.id !== id) return r;
      var u = Object.assign({}, r); u[field] = numFields && numFields.indexOf(field) >= 0 ? (parseFloat(val) || 0) : val;
      if (field === "avance" && u.avance >= 100 && u.estado) u.estado = "cerrada";
      return u;
    }); });
  }
  function gSetEdit(key, id) { setGEdit(function(p) { var n = Object.assign({}, p); n[key] = (p[key] === id) ? null : id; return n; }); }
  function gIsEdit(key, id) { return gEdit[key] === id; }
  function gImpState(key) { return gImp[key] || { data: [], loading: false, show: false }; }
  // ── Render helpers ──
  var _eS = { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9 };
  function rEC(isE, val, type, onCh, opts, w) {
    if (!isE) return null;
    if (type === "select") return React.createElement("select", { value: val || "", style: Object.assign({}, _eS, { width: w || 90 }), onChange: function(e) { onCh(e.target.value); } }, (opts || []).map(function(o) { return React.createElement("option", { key: o, value: o }, o); }));
    if (type === "date") return React.createElement("input", { type: "date", value: val || "", style: Object.assign({}, _eS, { width: w || 110 }), onChange: function(e) { onCh(e.target.value); } });
    if (type === "number") return React.createElement("input", { type: "number", value: val, style: Object.assign({}, _eS, { width: w || 50, textAlign: "center" }), onChange: function(e) { onCh(e.target.value); } });
    return React.createElement("input", { value: val || "", style: Object.assign({}, _eS, { width: w || "100%", minWidth: w || 80 }), onChange: function(e) { onCh(e.target.value); } });
  }
  function rEB(key, id) {
    var isE = gIsEdit(key, id);
    return React.createElement("button", { onClick: function() { gSetEdit(key, id); }, title: isE ? "Guardar" : "Editar",
      style: { background: isE ? C.ac + "20" : C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: isE ? C.ac : C.pr, fontSize: 11 } }, isE ? "\u2713" : "\u270F\uFE0F");
  }
  function rImpBtn(key, prompt, label) {
    return React.createElement("label", { style: { cursor: "pointer", display: "inline-flex" } },
      React.createElement("input", { type: "file", accept: ".pdf,.doc,.docx,.txt,.csv", multiple: true, style: { display: "none" },
        onChange: function(e) { gDoImport(key, e.target.files, prompt); e.target.value = ""; } }),
      React.createElement("span", { style: { padding: "8px 16px", borderRadius: 8, border: "1px solid " + C.bd, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, background: C.sa, color: C.tm, cursor: "pointer" } }, React.createElement(Icons.Upload), " " + (label || "Importar"))
    );
  }
  function rImpLoading(key, msg) {
    if (!gImpState(key).loading) return null;
    return React.createElement(Card, { style: { padding: 16, marginBottom: 12, textAlign: "center" } },
      React.createElement("div", { className: "typing" }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)),
      React.createElement("div", { style: { fontSize: 10, color: C.tm, marginTop: 8 } }, msg || "Analizando documento con IA...")
    );
  }
  function rImpPreview(key, headers, fields, types, opts, clr) {
    var st = gImpState(key); if (!st.show || !st.data.length) return null;
    return React.createElement("div", null,
      React.createElement(Btn, { onClick: function() { setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: [], loading: false, show: false }; return n; }); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
      React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + (clr || C.pr) } },
        React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Importacion IA \u2014 " + st.data.length + " registros detectados"),
        React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "Revisa y edita los campos antes de confirmar."),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "2px solid " + C.bd } },
              headers.concat([""]).map(function(h) { return React.createElement("th", { key: h, style: { padding: "8px 4px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
            )),
            React.createElement("tbody", null, st.data.map(function(d, i) {
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50" } },
                fields.map(function(f, fi) {
                  var tp = types[fi] || "text";
                  var fopts = opts && opts[f] ? opts[f] : null;
                  if (tp === "select" && fopts) {
                    return React.createElement("td", { key: f, style: { padding: "4px" } }, React.createElement("select", { value: d[f] || fopts[0], style: Object.assign({}, _eS, { width: 100 }), onChange: function(e) { var v = e.target.value; var idx = i; gSetImpF(key, idx, f, v); } }, fopts.map(function(o) { return React.createElement("option", { key: o, value: o }, o); })));
                  }
                  if (tp === "number") {
                    return React.createElement("td", { key: f, style: { padding: "4px" } }, React.createElement("input", { type: "number", value: d[f] || 0, style: Object.assign({}, _eS, { width: 50, textAlign: "center" }), onChange: function(e) { var v = e.target.value; var idx = i; gSetImpF(key, idx, f, parseFloat(v) || 0); } }));
                  }
                  if (tp === "date") {
                    return React.createElement("td", { key: f, style: { padding: "4px" } }, React.createElement("input", { type: "date", value: d[f] || "", style: Object.assign({}, _eS, { width: 110 }), onChange: function(e) { var v = e.target.value; var idx = i; gSetImpF(key, idx, f, v); } }));
                  }
                  return React.createElement("td", { key: f, style: { padding: "4px" } }, React.createElement("input", { value: d[f] || "", style: Object.assign({}, _eS, { width: "100%" }), onChange: function(e) { var v = e.target.value; var idx = i; gSetImpF(key, idx, f, v); } }));
                }),
                React.createElement("td", { style: { padding: "4px" } }, React.createElement("button", { onClick: function() { var idx = i; gDelImpRow(key, idx); },
                  style: { background: C.dn + "20", border: "none", borderRadius: 4, padding: "4px 6px", cursor: "pointer", color: C.dn, fontSize: 10 } }, "\u2716"))
              );
            }))
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
          React.createElement(Btn, { onClick: function() { setGImp(function(p) { var n = Object.assign({}, p); n[key] = { data: [], loading: false, show: false }; return n; }); } }, "Cancelar"),
          React.createElement(Btn, { accent: true, onClick: function() { if (typeof opts === "object" && opts._confirm) { opts._confirm(); } } }, React.createElement(Icons.Check), " Confirmar " + st.data.length + " registros")
        )
      )
    );
  }

  var titles = {
    dashboard: "Dashboard BI",
    documents: "Control Documental",
    "ai-audit": "Auditoria IA",
    legal: "Requisitos Legales",
    "lista-maestra": "Lista Maestra de Documentos",
    recursos: "Recursos PDCA",
    "iso9001-v2": "ISO 9001 Calidad v02",
    "iso14001-v2": "ISO 14001 Ambiente v02",
    "iso45001-v2": "ISO 45001 SST v02",
    "iso37001-v2": "ISO 37001 Antisoborno v02",
    settings: "Configuracion",
  };

  var navItems = [
    { key: "dashboard", icon: Icons.Dash, label: "Dashboard BI" },
    { key: "documents", icon: Icons.Doc, label: "Control Documental" },
    { key: "lista-maestra", icon: Icons.ListIcon, label: "Lista Maestra" },
    { key: "recursos", icon: Icons.Package, label: "Recursos PDCA" },
    { key: "ai-audit", icon: Icons.Brain, label: "Auditoria IA" },
    { key: "legal", icon: Icons.Scale, label: "Requisitos Legales" },
    { key: "iso9001-v2", icon: Icons.Star, label: "ISO 9001 v02" },
    { key: "iso14001-v2", icon: Icons.Leaf, label: "ISO 14001 v02" },
    { key: "iso45001-v2", icon: Icons.Shield, label: "ISO 45001 v02" },
    { key: "iso37001-v2", icon: Icons.Gavel, label: "ISO 37001 v02" },
    { key: "settings", icon: Icons.Settings, label: "Configuracion" },
  ];

  // ═══ SIDEBAR ═══
  function Sidebar(props) {
    var mobile = props && props.mobile;
    return React.createElement("div", {
      style: {
        width: sbOpen || mobile ? 220 : 56, background: C.sf,
        borderRight: "1px solid " + C.bd, display: "flex", flexDirection: "column",
        transition: "width 0.25s", flexShrink: 0, overflow: "hidden",
        position: mobile ? "fixed" : "relative",
        top: 0, left: 0, bottom: 0, zIndex: mobile ? 1000 : 1,
      }
    },
      React.createElement("div", {
        style: {
          padding: sbOpen || mobile ? "16px 14px" : "16px 10px",
          borderBottom: "1px solid " + C.bd,
          display: "flex", alignItems: "center", gap: 10,
        }
      },
        React.createElement("div", {
          style: {
            width: 32, height: 32, borderRadius: 10,
            background: C.g1, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 14, color: "#fff", flexShrink: 0,
          }
        }, "S"),
        (sbOpen || mobile) ? React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, lineHeight: 1.2 } }, "SIG 360"),
          React.createElement("div", { style: { fontSize: 8, color: C.td, fontWeight: 500 } }, "v7.0 Enterprise")
        ) : null
      ),
      React.createElement("nav", { style: { padding: "8px 6px", flex: 1 } },
        navItems.map(function(item) {
          var active = view === item.key;
          return React.createElement("button", {
            key: item.key,
            onClick: function() { setView(item.key); if (mobile) setMobMenu(false); },
            style: {
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: sbOpen || mobile ? "9px 12px" : "9px 0",
              justifyContent: sbOpen || mobile ? "flex-start" : "center",
              borderRadius: 8, border: "none", cursor: "pointer",
              background: active ? C.pr + "18" : "transparent",
              color: active ? C.pl : C.tm, fontSize: 11, fontWeight: 600,
              marginBottom: 2, transition: "all 0.15s", fontFamily: "inherit",
            }
          },
            React.createElement(item.icon),
            (sbOpen || mobile) ? React.createElement("span", null, item.label) : null
          );
        })
      ),
      (sbOpen || mobile) ? React.createElement("div", {
        style: { padding: 12, borderTop: "1px solid " + C.bd }
      },
        React.createElement("div", {
          style: {
            padding: "8px 10px", borderRadius: 8, background: C.sa,
            fontSize: 9, color: C.td, textAlign: "center"
          }
        }, "ISO 9001 \u00B7 14001 \u00B7 45001 \u00B7 37001")
      ) : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // EDITABLE DB VIEW (Reusable for all ISO modules)
  // ═══════════════════════════════════════════════════════════════════════
  function EditableDBView(props) {
    var _ed = _s(null), editing = _ed[0], setEditing = _ed[1];
    var _rd = _s(props.rows), rows = _rd[0], setRows = _rd[1];
    var _nf = _s(false), showNew = _nf[0], setShowNew = _nf[1];
    var _nr = _s(props.columns.map(function(){return "";})), newRow = _nr[0], setNewRow = _nr[1];

    function saveEdit(id, colIdx, val) {
      setRows(rows.map(function(r) {
        if (r.id === id) { var v = r.vals.slice(); v[colIdx] = val; return Object.assign({}, r, {vals:v}); }
        return r;
      }));
    }
    function addRow() {
      var nr = { id: rows.length + 1, vals: newRow.slice() };
      setRows(rows.concat([nr]));
      setNewRow(props.columns.map(function(){return "";}));
      setShowNew(false);
    }
    function deleteRow(id) { setRows(rows.filter(function(r){return r.id!==id;})); }

    return React.createElement("div", null,
      React.createElement(Card, { style: { padding: 16 } },
        React.createElement("div", { style: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize:13, fontWeight:700, color:C.tx } }, props.title),
            React.createElement("div", { style: { fontSize:9, color:C.td, marginTop:2 } }, "Datos editables — Fuente de Dashboard | " + rows.length + " registros")
          ),
          React.createElement("div", { style: { display:"flex", gap:6 } },
            React.createElement(Btn, { primary:true, onClick:function(){setShowNew(!showNew);} }, React.createElement(Icons.Plus), " Agregar"),
            React.createElement(Btn, { onClick:function(){ alert("Datos guardados exitosamente"); } }, React.createElement(Icons.Check), " Guardar")
          )
        ),
        showNew ? React.createElement("div", { style: { padding:12, background:C.sa, borderRadius:10, marginBottom:12 } },
          React.createElement("div", { style: { fontSize:11, fontWeight:600, color:C.tx, marginBottom:8 } }, "Nuevo Registro"),
          React.createElement("div", { style: { display:"grid", gridTemplateColumns:"repeat("+props.columns.length+",1fr)", gap:6 } },
            props.columns.map(function(col, ci) {
              return React.createElement("input", { key:ci, placeholder:col, value:newRow[ci],
                onChange:function(e){ var nr2=newRow.slice(); nr2[ci]=e.target.value; setNewRow(nr2); },
                style: { padding:"6px 8px", borderRadius:6, border:"1px solid "+C.bd, background:C.card, color:C.tx, fontSize:10, fontFamily:"inherit" }
              });
            })
          ),
          React.createElement("div", { style: { display:"flex", gap:6, marginTop:8, justifyContent:"flex-end" } },
            React.createElement(Btn, { onClick:function(){setShowNew(false);} }, "Cancelar"),
            React.createElement(Btn, { accent:true, onClick:addRow }, React.createElement(Icons.Check), " Agregar")
          )
        ) : null,
        React.createElement("div", { style: { overflowX:"auto" } },
          React.createElement("table", { style: { width:"100%", borderCollapse:"collapse", fontSize:10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom:"1px solid "+C.bd } },
              React.createElement("th", { style: { padding:"10px 8px", textAlign:"left", fontSize:8, fontWeight:700, color:C.td, textTransform:"uppercase", width:30 } }, "#"),
              props.columns.map(function(h) {
                return React.createElement("th", { key:h, style: { padding:"10px 8px", textAlign:"left", fontSize:8, fontWeight:700, color:C.td, textTransform:"uppercase" } }, h);
              }),
              React.createElement("th", { style: { padding:"10px 8px", textAlign:"center", fontSize:8, fontWeight:700, color:C.td, textTransform:"uppercase", width:80 } }, "Acciones")
            )),
            React.createElement("tbody", null, rows.map(function(r) {
              return React.createElement("tr", { key:r.id, style: { borderBottom:"1px solid "+C.bd+"50" },
                onMouseEnter:function(e){e.currentTarget.style.background=C.cardH;}, onMouseLeave:function(e){e.currentTarget.style.background="transparent";} },
                React.createElement("td", { style: { padding:"8px", color:C.td, fontSize:9 } }, r.id),
                r.vals.map(function(v, ci) {
                  var isEd = editing && editing.id === r.id && editing.col === ci;
                  return React.createElement("td", { key:ci, style: { padding:"4px 6px" } },
                    isEd ? React.createElement("input", { autoFocus:true, value:v,
                      onChange:function(e){ saveEdit(r.id, ci, e.target.value); },
                      onBlur:function(){setEditing(null);},
                      onKeyDown:function(e){if(e.key==="Enter")setEditing(null);},
                      style: { padding:"4px 6px", borderRadius:4, border:"1px solid "+props.color, background:C.sa, color:C.tx, fontSize:10, fontFamily:"inherit", width:"100%", boxSizing:"border-box" }
                    })
                    : React.createElement("span", {
                      onClick:function(){setEditing({id:r.id,col:ci});},
                      style: { cursor:"pointer", padding:"4px 6px", borderRadius:4, display:"inline-block",
                        color: ci===0?C.tx:ci===props.columns.length-1?(v==="\u2191"?C.ac:v==="\u2193"?C.ac:C.wn):C.tm,
                        fontWeight: ci===0?600:400, fontSize:10 }
                    }, v, " ", React.createElement("span",{style:{fontSize:8,color:C.td}},"\u270E"))
                  );
                }),
                React.createElement("td", { style: { padding:"8px", textAlign:"center" } },
                  React.createElement("button", { onClick:function(){deleteRow(r.id);},
                    style: { background:"none", border:"none", color:C.dn, cursor:"pointer", fontSize:10, fontWeight:600 }
                  }, "\u2716 Eliminar")
                )
              );
            }))
          )
        ),
        React.createElement("div", { style: { padding:"10px 0", fontSize:9, color:C.td, display:"flex", gap:12 } },
          React.createElement("span", null, "\u270E Click en celda para editar"),
          React.createElement("span", null, "\u2716 Eliminar registros"),
          React.createElement("span", null, "\u2713 Guardar cambios"),
          React.createElement("span", { style:{color:props.color} }, "Los cambios se reflejan en Dashboard")
        )
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DASHBOARD BI VIEW
  // ═══════════════════════════════════════════════════════════════════════
  function DashboardView() {
    var dashTabs = [
      { key: "general", label: "General", icon: Icons.Dash },
      { key: "iso9001", label: "ISO 9001 Calidad", icon: Icons.Star },
      { key: "iso14001", label: "ISO 14001 Ambiente", icon: Icons.Leaf },
      { key: "iso45001", label: "ISO 45001 SST", icon: Icons.Shield },
      { key: "iso37001", label: "ISO 37001 Antisoborno", icon: Icons.Gavel },
    ];

    // Data generators
    var trendData = [
      { mes: "Jul", calidad: 78, ambiente: 72, sst: 80, compliance: 65 },
      { mes: "Ago", calidad: 80, ambiente: 75, sst: 82, compliance: 68 },
      { mes: "Sep", calidad: 83, ambiente: 78, sst: 79, compliance: 72 },
      { mes: "Oct", calidad: 85, ambiente: 80, sst: 85, compliance: 75 },
      { mes: "Nov", calidad: 87, ambiente: 82, sst: 88, compliance: 78 },
      { mes: "Dic", calidad: 89, ambiente: 84, sst: 90, compliance: 80 },
    ];

    var radarData = [
      { subject: "Liderazgo", A: 88 }, { subject: "Planificacion", A: 82 },
      { subject: "Apoyo", A: 75 }, { subject: "Operacion", A: 90 },
      { subject: "Evaluacion", A: 78 }, { subject: "Mejora", A: 85 },
    ];

    var docsByIso = [
      { name: "ISO 9001", value: 8, color: C.i9 },
      { name: "ISO 14001", value: 5, color: C.i14 },
      { name: "ISO 45001", value: 8, color: C.i45 },
      { name: "ISO 37001", value: 4, color: C.i37 },
    ];

    var ncData = [
      { mes: "Jul", mayores: 3, menores: 8, obs: 12 },
      { mes: "Ago", mayores: 2, menores: 7, obs: 10 },
      { mes: "Sep", mayores: 1, menores: 6, obs: 9 },
      { mes: "Oct", mayores: 2, menores: 5, obs: 8 },
      { mes: "Nov", mayores: 1, menores: 4, obs: 7 },
      { mes: "Dic", mayores: 0, menores: 3, obs: 5 },
    ];

    var riskMatrix = [
      { area: "Produccion", riesgo: 85 }, { area: "SSOMA", riesgo: 92 },
      { area: "Ambiental", riesgo: 78 }, { area: "Calidad", riesgo: 88 },
      { area: "Compliance", riesgo: 72 }, { area: "Logistica", riesgo: 80 },
    ];

    function GeneralDash() {
      return React.createElement("div", null,
        // KPI Row
        React.createElement("div", {
          style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }
        },
          React.createElement(KPICard, {
            icon: React.createElement(Icons.Star), label: "Cumplimiento SIG",
            value: "86.2%", sub: "\u2191 3.1% vs mes anterior", glow: C.ac
          }),
          React.createElement(KPICard, {
            icon: React.createElement(Icons.Doc), label: "Docs Vigentes",
            value: "22/25", sub: "88% al dia", glow: C.pr
          }),
          React.createElement(KPICard, {
            icon: React.createElement(Icons.Alert), label: "NC Abiertas",
            value: "3", sub: "\u2193 57% reduccion", subColor: C.ac, glow: C.wn
          }),
          React.createElement(KPICard, {
            icon: React.createElement(Icons.Shield), label: "Dias sin Accidentes",
            value: "127", sub: "Record: 145 dias", glow: C.i45
          }),
          React.createElement(KPICard, {
            icon: React.createElement(Icons.Scale), label: "Cumplimiento Legal",
            value: "82%", sub: "15 normas rastreadas", glow: C.pp
          })
        ),
        // Charts Row 1
        React.createElement("div", {
          style: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }
        },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }
            }, "Tendencia de Cumplimiento por Sistema"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 220 },
              React.createElement(AreaChart, { data: trendData },
                React.createElement("defs", null,
                  React.createElement("linearGradient", { id: "gc", x1: 0, y1: 0, x2: 0, y2: 1 },
                    React.createElement("stop", { offset: "5%", stopColor: C.i9, stopOpacity: 0.3 }),
                    React.createElement("stop", { offset: "95%", stopColor: C.i9, stopOpacity: 0 })
                  ),
                  React.createElement("linearGradient", { id: "ga", x1: 0, y1: 0, x2: 0, y2: 1 },
                    React.createElement("stop", { offset: "5%", stopColor: C.i14, stopOpacity: 0.3 }),
                    React.createElement("stop", { offset: "95%", stopColor: C.i14, stopOpacity: 0 })
                  ),
                  React.createElement("linearGradient", { id: "gs", x1: 0, y1: 0, x2: 0, y2: 1 },
                    React.createElement("stop", { offset: "5%", stopColor: C.i45, stopOpacity: 0.3 }),
                    React.createElement("stop", { offset: "95%", stopColor: C.i45, stopOpacity: 0 })
                  )
                ),
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 10, domain: [60, 100] }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Area, { type: "monotone", dataKey: "calidad", stroke: C.i9, fill: "url(#gc)", strokeWidth: 2, name: "Calidad" }),
                React.createElement(Area, { type: "monotone", dataKey: "ambiente", stroke: C.i14, fill: "url(#ga)", strokeWidth: 2, name: "Ambiente" }),
                React.createElement(Area, { type: "monotone", dataKey: "sst", stroke: C.i45, fill: "url(#gs)", strokeWidth: 2, name: "SST" }),
                React.createElement(Line, { type: "monotone", dataKey: "compliance", stroke: C.i37, strokeWidth: 2, dot: false, name: "Compliance" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 10 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }
            }, "Madurez Organizacional"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 220 },
              React.createElement(RadarChart, { data: radarData, outerRadius: 70 },
                React.createElement(PolarGrid, { stroke: C.bd }),
                React.createElement(PolarAngleAxis, { dataKey: "subject", fontSize: 9, stroke: C.tm }),
                React.createElement(Radar, { dataKey: "A", stroke: C.cy, fill: C.cy, fillOpacity: 0.2, strokeWidth: 2 })
              )
            )
          )
        ),
        // Charts Row 2
        React.createElement("div", {
          style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }
        },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }
            }, "Documentos por ISO"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(PieChart, null,
                React.createElement(Pie, {
                  data: docsByIso, dataKey: "value", nameKey: "name",
                  cx: "50%", cy: "50%", innerRadius: 35, outerRadius: 60,
                  paddingAngle: 3, strokeWidth: 0,
                },
                  docsByIso.map(function(entry, i) {
                    return React.createElement(Cell, { key: i, fill: entry.color });
                  })
                ),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }
            }, "No Conformidades (Tendencia)"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(BarChart, { data: ncData },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 9 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 9 }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Bar, { dataKey: "mayores", fill: C.dn, radius: [3, 3, 0, 0], name: "Mayores" }),
                React.createElement(Bar, { dataKey: "menores", fill: C.wn, radius: [3, 3, 0, 0], name: "Menores" }),
                React.createElement(Bar, { dataKey: "obs", fill: C.pr, radius: [3, 3, 0, 0], name: "Observaciones" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", {
              style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }
            }, "Gestion de Riesgos por Area"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 8 } },
              riskMatrix.map(function(r) {
                return React.createElement("div", { key: r.area },
                  React.createElement("div", {
                    style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 3 }
                  },
                    React.createElement("span", null, r.area),
                    React.createElement("span", { style: { fontWeight: 700, color: r.riesgo >= 85 ? C.ac : r.riesgo >= 70 ? C.wn : C.dn } }, r.riesgo + "%")
                  ),
                  React.createElement(ProgressBar, { value: r.riesgo })
                );
              })
            )
          )
        )
      );
    }

    // ═══ ISO 9001 DASH ═══
    function ISO9001Dash() {
      var satisfData = [
        { mes: "Jul", score: 4.1 }, { mes: "Ago", score: 4.2 }, { mes: "Sep", score: 4.0 },
        { mes: "Oct", score: 4.3 }, { mes: "Nov", score: 4.4 }, { mes: "Dic", score: 4.5 },
      ];
      var processData = [
        { proceso: "Diseno", eficacia: 92 }, { proceso: "Adquisiciones", eficacia: 85 },
        { proceso: "Ejecucion", eficacia: 88 }, { proceso: "Entrega", eficacia: 91 },
        { proceso: "Postventa", eficacia: 78 },
      ];
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Star), label: "Satisfaccion Cliente", value: "4.5/5", sub: "\u2191 0.3 pts", glow: C.i9 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Check), label: "Productos Conformes", value: "97.2%", sub: "Meta: 95%", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "NC Calidad", value: "2", sub: "\u2193 60% vs trim. anterior", subColor: C.ac, glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.RefreshCw), label: "Acciones Correctivas", value: "89%", sub: "Cierre efectivo", glow: C.pr })
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Satisfaccion del Cliente (Tendencia)"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 200 },
              React.createElement(LineChart, { data: satisfData },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 10, domain: [3.5, 5] }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Line, { type: "monotone", dataKey: "score", stroke: C.i9, strokeWidth: 3, dot: { fill: C.i9, r: 4 }, name: "Score" })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Eficacia de Procesos Clave"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              processData.map(function(p) {
                return React.createElement("div", { key: p.proceso },
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 3 } },
                    React.createElement("span", null, p.proceso),
                    React.createElement("span", { style: { fontWeight: 700, color: p.eficacia >= 90 ? C.ac : p.eficacia >= 80 ? C.wn : C.dn } }, p.eficacia + "%")
                  ),
                  React.createElement(ProgressBar, { value: p.eficacia, color: C.i9 })
                );
              })
            )
          )
        )
      );
    }

    // ═══ ISO 14001 DASH ═══
    function ISO14001Dash() {
      var emissionData = [
        { mes: "Jul", co2: 45, residuos: 12, agua: 320 },
        { mes: "Ago", co2: 42, residuos: 11, agua: 310 },
        { mes: "Sep", co2: 40, residuos: 10, agua: 295 },
        { mes: "Oct", co2: 38, residuos: 9, agua: 280 },
        { mes: "Nov", co2: 36, residuos: 8, agua: 270 },
        { mes: "Dic", co2: 34, residuos: 8, agua: 260 },
      ];
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Leaf), label: "Huella Carbono", value: "34 tCO2e", sub: "\u2193 24% vs semestre", subColor: C.ac, glow: C.i14 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Incidentes Ambientales", value: "0", sub: "Sin derrames / fugas", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.RefreshCw), label: "Residuos Reciclados", value: "72%", sub: "Meta: 70%", glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Bar), label: "Consumo Agua", value: "260 m3", sub: "\u2193 19% ahorro", subColor: C.ac, glow: C.cy })
        ),
        React.createElement(Card, { style: { padding: 16 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Indicadores Ambientales (Tendencia Semestral)"),
          React.createElement(ResponsiveContainer, { width: "100%", height: 230 },
            React.createElement(ComposedChart, { data: emissionData },
              React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
              React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "left", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "right", orientation: "right", stroke: C.td, fontSize: 10 }),
              React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
              React.createElement(Bar, { yAxisId: "left", dataKey: "co2", fill: C.i14, radius: [3, 3, 0, 0], name: "CO2 (ton)" }),
              React.createElement(Bar, { yAxisId: "left", dataKey: "residuos", fill: C.wn, radius: [3, 3, 0, 0], name: "Residuos (ton)" }),
              React.createElement(Line, { yAxisId: "right", type: "monotone", dataKey: "agua", stroke: C.cy, strokeWidth: 2, dot: { fill: C.cy }, name: "Agua (m3)" }),
              React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
            )
          )
        )
      );
    }

    // ═══ ISO 45001 DASH ═══
    function ISO45001Dash() {
      var accidentData = [
        { mes: "Jul", IF: 2.1, IS: 45, IA: 0 },
        { mes: "Ago", IF: 1.8, IS: 38, IA: 0 },
        { mes: "Sep", IF: 1.5, IS: 30, IA: 0 },
        { mes: "Oct", IF: 1.2, IS: 25, IA: 0 },
        { mes: "Nov", IF: 0.9, IS: 18, IA: 0 },
        { mes: "Dic", IF: 0.7, IS: 12, IA: 0 },
      ];
      var inspData = [
        { tipo: "EPP", cumpl: 95 }, { tipo: "Senalizacion", cumpl: 88 },
        { tipo: "Herramientas", cumpl: 92 }, { tipo: "Orden y Limpieza", cumpl: 85 },
        { tipo: "Protecciones", cumpl: 90 },
      ];
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Shield), label: "Indice Frecuencia", value: "0.7", sub: "Meta < 1.0 \u2713", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Accidentes Incapac.", value: "0", sub: "127 dias sin accidentes", glow: C.i45 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Users), label: "Capacitaciones SST", value: "98%", sub: "Personal capacitado", glow: C.pr }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Clipboard), label: "Inspecciones", value: "45", sub: "12 hallazgos abiertos", subColor: C.wn, glow: C.wn })
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Indices de Siniestralidad"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 200 },
              React.createElement(LineChart, { data: accidentData },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 10 }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Line, { type: "monotone", dataKey: "IF", stroke: C.i45, strokeWidth: 2, dot: { fill: C.i45, r: 4 }, name: "Ind. Frecuencia" }),
                React.createElement(Line, { type: "monotone", dataKey: "IS", stroke: C.dn, strokeWidth: 2, dot: { fill: C.dn, r: 4 }, name: "Ind. Severidad" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Cumplimiento por Inspeccion"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              inspData.map(function(p) {
                return React.createElement("div", { key: p.tipo },
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 3 } },
                    React.createElement("span", null, p.tipo),
                    React.createElement("span", { style: { fontWeight: 700 } }, p.cumpl + "%")
                  ),
                  React.createElement(ProgressBar, { value: p.cumpl, color: C.i45 })
                );
              })
            )
          )
        )
      );
    }

    // ═══ ISO 37001 DASH ═══
    function ISO37001Dash() {
      var ddData = [
        { mes: "Jul", evaluaciones: 8, riesgo_alto: 2 },
        { mes: "Ago", evaluaciones: 12, riesgo_alto: 3 },
        { mes: "Sep", evaluaciones: 10, riesgo_alto: 1 },
        { mes: "Oct", evaluaciones: 15, riesgo_alto: 2 },
        { mes: "Nov", evaluaciones: 11, riesgo_alto: 1 },
        { mes: "Dic", evaluaciones: 14, riesgo_alto: 0 },
      ];
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Gavel), label: "Due Diligence", value: "70", sub: "Evaluaciones realizadas", glow: C.i37 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Denuncias Canal Etico", value: "3", sub: "2 resueltas, 1 en proceso", subColor: C.wn, glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Users), label: "Capacitacion Antisoborno", value: "94%", sub: "Personal capacitado", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Shield), label: "Riesgo Residual", value: "Bajo", sub: "Matriz actualizada Dic 2025", glow: C.ac })
        ),
        React.createElement(Card, { style: { padding: 16 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Due Diligence - Evaluaciones Mensuales"),
          React.createElement(ResponsiveContainer, { width: "100%", height: 220 },
            React.createElement(BarChart, { data: ddData },
              React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
              React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { stroke: C.td, fontSize: 10 }),
              React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
              React.createElement(Bar, { dataKey: "evaluaciones", fill: C.i37, radius: [3, 3, 0, 0], name: "Evaluaciones" }),
              React.createElement(Bar, { dataKey: "riesgo_alto", fill: C.dn, radius: [3, 3, 0, 0], name: "Riesgo Alto" }),
              React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
            )
          )
        )
      );
    }

    return React.createElement("div", null,
      React.createElement(TabBar, {
        tabs: dashTabs, active: dashTab, onChange: setDashTab
      }),
      dashTab === "general" ? GeneralDash() : null,
      dashTab === "iso9001" ? ISO9001Dash() : null,
      dashTab === "iso14001" ? ISO14001Dash() : null,
      dashTab === "iso45001" ? ISO45001Dash() : null,
      dashTab === "iso37001" ? ISO37001Dash() : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // DOCUMENT CONTROL VIEW
  // ═══════════════════════════════════════════════════════════════════════
  // ═══ DOC IMPORT HELPERS ═══
  function docHandleFileUpload(files) {
    var newFiles = Array.from(files);
    setDocUpFiles(function(prev) { return prev.concat(newFiles); });

    newFiles.forEach(function(file) {
      // 1. Create persistent blob URL for viewing the original
      var blobUrl = URL.createObjectURL(file);
      setDocBlobUrls(function(prev) { var n = Object.assign({}, prev); n[file.name] = blobUrl; return n; });

      // 2. Create base64 data URL for persistent storage
      var dataReader = new FileReader();
      dataReader.onload = function(ev) {
        setDocDataUrls(function(prev) { var n = Object.assign({}, prev); n[file.name] = ev.target.result; return n; });
      };
      dataReader.readAsDataURL(file);

      // 3. Extract text content for AI analysis + Word generation
      var ext = file.name.split(".").pop().toLowerCase();
      if (["txt","csv","json","xml","html","htm","svg","md","rtf","log"].indexOf(ext) >= 0) {
        var textReader = new FileReader();
        textReader.onload = function(e) {
          setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = e.target.result; return n; });
        };
        textReader.readAsText(file);
      } else if (ext === "pdf") {
        // Extract PDF text using pdf.js
        extractPDFText(file);
      } else {
        // Binary files (docx, xlsx, pptx) - extract what we can
        var binReader = new FileReader();
        binReader.onload = function(e) {
          try {
            var arr = new Uint8Array(e.target.result);
            var chunks = []; var current = "";
            for (var i = 0; i < Math.min(arr.length, 50000); i++) {
              var ch = arr[i];
              if ((ch >= 32 && ch <= 126) || ch === 10 || ch === 13 || ch === 9) {
                current += String.fromCharCode(ch);
              } else {
                if (current.length > 4) chunks.push(current);
                current = "";
              }
            }
            if (current.length > 4) chunks.push(current);
            // Filter meaningful text chunks (>10 chars, not binary gibberish)
            var text = chunks.filter(function(c) { return c.length > 10 && /[a-zA-ZÀ-ɏ]{3,}/.test(c); }).join("\n");
            setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = text || "[Archivo " + ext.toUpperCase() + ": " + file.name + "]"; return n; });
          } catch(ex) {
            setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = "[Archivo " + ext.toUpperCase() + ": " + file.name + "]"; return n; });
          }
        };
        binReader.readAsArrayBuffer(file);
      }
    });
  }

  function extractPDFText(file) {
    // Load pdf.js from CDN dynamically
    if (window.pdfjsLib) {
      _doPDFExtract(file);
    } else {
      var script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = function() {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        _doPDFExtract(file);
      };
      script.onerror = function() {
        // Fallback: read binary
        setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = "[PDF cargado: " + file.name + " - Contenido disponible para visualizacion]"; return n; });
      };
      document.head.appendChild(script);
    }
  }

  function _doPDFExtract(file) {
    var fr = new FileReader();
    fr.onload = function(e) {
      var typedArray = new Uint8Array(e.target.result);
      window.pdfjsLib.getDocument({ data: typedArray }).promise.then(function(pdf) {
        var allText = [];
        var promises = [];
        for (var p = 1; p <= Math.min(pdf.numPages, 50); p++) {
          promises.push(pdf.getPage(p).then(function(page) {
            return page.getTextContent().then(function(tc) {
              return tc.items.map(function(item) { return item.str; }).join(" ");
            });
          }));
        }
        Promise.all(promises).then(function(pages) {
          var fullText = pages.join("\n\n--- Pagina ---\n\n");
          setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = fullText; return n; });
        });
      }).catch(function() {
        setDocUpContents(function(prev) { var n = Object.assign({}, prev); n[file.name] = "[PDF cargado: " + file.name + "]"; return n; });
      });
    };
    fr.readAsArrayBuffer(file);
  }

  function docQuickImport() {
    var parsed = docUpFiles.map(function(f, i) {
      var ext = f.name.split(".").pop().toLowerCase();
      var baseName = f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
      var isoGuess = "multi";
      var areaGuess = "General";
      var pdcaGuess = "D";
      var nameL = baseName.toLowerCase();
      if (nameL.indexOf("calidad") >= 0 || nameL.indexOf("9001") >= 0) isoGuess = "9001";
      else if (nameL.indexOf("ambient") >= 0 || nameL.indexOf("14001") >= 0) isoGuess = "14001";
      else if (nameL.indexOf("seguridad") >= 0 || nameL.indexOf("sst") >= 0 || nameL.indexOf("45001") >= 0 || nameL.indexOf("iperc") >= 0 || nameL.indexOf("petar") >= 0) isoGuess = "45001";
      else if (nameL.indexOf("soborno") >= 0 || nameL.indexOf("37001") >= 0 || nameL.indexOf("compliance") >= 0) isoGuess = "37001";
      if (nameL.indexOf("plan") >= 0 || nameL.indexOf("politic") >= 0 || nameL.indexOf("manual") >= 0 || nameL.indexOf("matri") >= 0) pdcaGuess = "P";
      else if (nameL.indexOf("procedimiento") >= 0 || nameL.indexOf("instructivo") >= 0 || nameL.indexOf("formato") >= 0) pdcaGuess = "D";
      else if (nameL.indexOf("audit") >= 0 || nameL.indexOf("inspeccion") >= 0 || nameL.indexOf("monitoreo") >= 0 || nameL.indexOf("registro") >= 0 || nameL.indexOf("informe") >= 0) pdcaGuess = "C";
      else if (nameL.indexOf("correcti") >= 0 || nameL.indexOf("mejora") >= 0 || nameL.indexOf("leccion") >= 0) pdcaGuess = "A";
      return {
        id: "DOC-" + String(docsDB.length + i + 1).padStart(3, "0"),
        name: baseName.charAt(0).toUpperCase() + baseName.slice(1),
        iso: isoGuess, area: areaGuess, pdca: pdcaGuess, version: "1.0",
        _fileType: ext.toUpperCase() + " (" + (f.size/1024).toFixed(0) + "KB)"
      };
    });
    setDocUpParsed(parsed);
    setDocUpMsg("Importacion rapida completada. Revise y edite los campos antes de confirmar.");
  }

  var docAnalyzeWithAI = useCallback(async function() {
    setDocUpAnalyzing(true);
    setDocUpMsg("Leyendo contenido de archivos...");

    var filesInfo = docUpFiles.map(function(f) {
      var ext = f.name.split(".").pop().toLowerCase();
      var content = docUpContents[f.name] || "";
      return "\n=== ARCHIVO: " + f.name + " (Tipo: " + ext.toUpperCase() + ", Tamano: " + (f.size/1024).toFixed(0) + "KB) ===\n" + (content.substring(0, 3000) || "[Sin contenido extraible]");
    }).join("\n");

    var systemPrompt = "Eres un especialista en gestion documental ISO (9001, 14001, 45001, 37001) para el sector construccion en Peru. Analiza los archivos subidos y extrae metadatos estructurados.\n\nPara CADA archivo, identifica:\n- id: Codigo del documento si aparece (ej: SGC-PRO-001), si no, genera uno logico\n- name: Nombre/titulo del documento\n- iso: Norma ISO principal (9001, 14001, 45001, 37001, o multi)\n- area: Area funcional (Calidad, SST, Medio Ambiente, Operaciones, RRHH, Legal, etc.)\n- pdca: Fase del ciclo PDCA (P=planificar, D=hacer, C=verificar, A=actuar)\n- version: Numero de version si se detecta\n- responsable: Cargo o nombre del responsable si aparece\n\nResponde UNICAMENTE en JSON valido sin markdown:\n{\"documentos\":[{\"id\":\"...\",\"name\":\"...\",\"iso\":\"...\",\"area\":\"...\",\"pdca\":\"...\",\"version\":\"...\",\"responsable\":\"...\"}]}";

    try {
      setDocUpMsg("Analizando con IA especializada...");
      var response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: systemPrompt,
          messages: [{ role: "user", content: "Analiza estos " + docUpFiles.length + " archivo(s) y extrae los metadatos documentales:\n" + filesInfo }]
        })
      });

      var data = await response.json();
      var text = (data.content || []).map(function(i) { return i.text || ""; }).join("\n");
      var parsed;
      try {
        var clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
        parsed = JSON.parse(clean);
      } catch (e2) {
        var jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) { parsed = JSON.parse(jsonMatch[0]); }
        else { throw new Error("No se pudo parsear respuesta IA"); }
      }

      var docs = (parsed.documentos || []).map(function(d, i) {
        return {
          id: d.id || "DOC-" + String(docsDB.length + i + 1).padStart(3, "0"),
          name: d.name || docUpFiles[i] ? docUpFiles[i].name.replace(/\.[^.]+$/, "") : "Documento " + (i+1),
          iso: ["9001","14001","45001","37001","multi"].indexOf(d.iso) >= 0 ? d.iso : "multi",
          area: d.area || "General",
          pdca: ["P","D","C","A"].indexOf(d.pdca) >= 0 ? d.pdca : "D",
          version: d.version || "1.0",
          responsable: d.responsable || "Coord. SIG",
          _fileType: docUpFiles[i] ? docUpFiles[i].name.split(".").pop().toUpperCase() : ""
        };
      });

      if (docs.length > 0) {
        setDocUpParsed(docs);
        setDocUpMsg("\u2705 IA identifico " + docs.length + " documento(s). Revise los campos y confirme.");
      } else {
        setDocUpMsg("IA no pudo extraer metadatos. Intente importacion rapida.");
      }
    } catch (err) {
      setDocUpMsg("Error: " + err.message + ". Intente importacion rapida.");
      // Fallback to quick import
      docQuickImport();
    }
    setDocUpAnalyzing(false);
  }, [docUpFiles, docUpContents, docsDB.length]);

  function DocumentsView() {
    var filteredDocs = docsDB.filter(function(d) {
      var matchSearch = docSearch === "" || d.name.toLowerCase().indexOf(docSearch.toLowerCase()) >= 0 || d.id.toLowerCase().indexOf(docSearch.toLowerCase()) >= 0;
      var matchFilter = docFilter === "all" || d.iso === docFilter || (docFilter === "vigente" && d.status === "vigente") || (docFilter === "revision" && d.status === "revision") || (docFilter === "abierto" && d.status === "abierto");
      return matchSearch && matchFilter;
    });

    var statusColor = { vigente: "green", revision: "yellow", abierto: "red" };
    var isoColor = { "9001": "blue", "14001": "green", "45001": "yellow", "37001": "purple", multi: "cyan" };
    var pdcaLabels = { P: "Plan", D: "Do", C: "Check", A: "Act" };

    return React.createElement("div", null,
      // Toolbar
      React.createElement("div", {
        style: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }
      },
        React.createElement("div", {
          style: {
            flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8,
            background: C.sa, border: "1px solid " + C.bd, borderRadius: 8, padding: "6px 12px",
          }
        },
          React.createElement(Icons.Search),
          React.createElement("input", {
            value: docSearch, onChange: function(e) { var v=e.target.value; setDocSearch(v); },
            placeholder: "Buscar documento por nombre o codigo...",
            style: {
              flex: 1, background: "none", border: "none", color: C.tx,
              fontSize: 11, outline: "none", fontFamily: "inherit",
            }
          })
        ),
        React.createElement("select", {
          value: docFilter, onChange: function(e) { var v=e.target.value; setDocFilter(v); },
          style: {
            padding: "8px 12px", borderRadius: 8, background: C.sa,
            border: "1px solid " + C.bd, color: C.tx, fontSize: 11, fontFamily: "inherit",
          }
        },
          React.createElement("option", { value: "all" }, "Todos"),
          React.createElement("option", { value: "9001" }, "ISO 9001"),
          React.createElement("option", { value: "14001" }, "ISO 14001"),
          React.createElement("option", { value: "45001" }, "ISO 45001"),
          React.createElement("option", { value: "37001" }, "ISO 37001"),
          React.createElement("option", { value: "vigente" }, "Vigentes"),
          React.createElement("option", { value: "revision" }, "En Revision"),
          React.createElement("option", { value: "abierto" }, "Abiertos")
        ),
        React.createElement(Btn, { primary: true, onClick: function() { setShowNewDoc(true); setNewDocForm({ id: "DOC-" + String(docsDB.length + 1).padStart(3, "0"), name: "", iso: "9001", area: "", pdca: "P", version: "1.0" }); } }, React.createElement(Icons.Plus), " Nuevo Documento"),
        React.createElement(Btn, { onClick: function() { setShowDocImport(!showDocImport); } }, React.createElement(Icons.Upload), " Importar")
      ),
      // Modal Nuevo Documento
      showNewDoc ? React.createElement(Modal, { open: true, onClose: function() { setShowNewDoc(false); }, title: "Nuevo Documento", wide: false },
        React.createElement("div", { style: { display: "grid", gap: 10 } },
          React.createElement(InputField, { label: "Codigo", value: newDocForm.id, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { id: v }); }); } }),
          React.createElement(InputField, { label: "Nombre del Documento", value: newDocForm.name, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { name: v }); }); }, placeholder: "Ej: Procedimiento de Control de Calidad" }),
          React.createElement(SelectField, { label: "Norma ISO", value: newDocForm.iso, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { iso: v }); }); }, options: [{ value: "9001", label: "ISO 9001" }, { value: "14001", label: "ISO 14001" }, { value: "45001", label: "ISO 45001" }, { value: "37001", label: "ISO 37001" }, { value: "multi", label: "Multi-norma" }] }),
          React.createElement(InputField, { label: "Area", value: newDocForm.area, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { area: v }); }); }, placeholder: "Ej: Calidad, SST, Operaciones..." }),
          React.createElement(SelectField, { label: "Fase PDCA", value: newDocForm.pdca, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { pdca: v }); }); }, options: [{ value: "P", label: "P - Planificar" }, { value: "D", label: "D - Hacer" }, { value: "C", label: "C - Verificar" }, { value: "A", label: "A - Actuar" }] }),
          React.createElement(InputField, { label: "Version", value: newDocForm.version, onChange: function(v) { setNewDocForm(function(p){ return Object.assign({}, p, { version: v }); }); } }),
          React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 } },
            React.createElement(Btn, { onClick: function() { setShowNewDoc(false); } }, "Cancelar"),
            React.createElement(Btn, { primary: true, onClick: function() {
              if (!newDocForm.name) return;
              var nd = { id: newDocForm.id, name: newDocForm.name, iso: newDocForm.iso, area: newDocForm.area || "General", pdca: newDocForm.pdca, version: newDocForm.version, date: new Date().toISOString().slice(0,10), pages: 1, status: "vigente", mlId: docsDB.length + 1, origen: "Creacion Manual", responsable: "Coord. SIG", ubicacion: "Servidor SIG", retencion: "3 anios" };
              setDocsDB(docsDB.concat([nd]));
              setShowNewDoc(false);
            } }, React.createElement(Icons.Plus), " Crear Documento")
          )
        )
      ) : null,
      // Panel Importar Documentos
      showDocImport ? React.createElement(Card, { style: { padding: 16, marginBottom: 12, borderLeft: "3px solid " + C.pr } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
            React.createElement("div", { style: { width: 32, height: 32, borderRadius: 8, background: C.g1, display: "flex", alignItems: "center", justifyContent: "center" } }, React.createElement(Icons.Upload)),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx } }, "Importar Documentos"),
              React.createElement("div", { style: { fontSize: 9, color: C.td } }, "Suba archivos PDF, Word, Excel, TXT u otros — la IA identificara los campos automaticamente")
            )
          ),
          React.createElement(Btn, { sm: true, onClick: function() { setShowDocImport(false); setDocUpFiles([]); setDocUpContents({}); setDocBlobUrls({}); setDocDataUrls({}); setDocUpParsed([]); setDocUpMsg(""); } }, "\u2715 Cerrar")
        ),
        // Drag & Drop zone
        React.createElement("div", {
          onDrop: function(e) {
            e.preventDefault(); e.currentTarget.style.borderColor = C.bd;
            docHandleFileUpload(e.dataTransfer.files);
          },
          onDragOver: function(e) { e.preventDefault(); e.currentTarget.style.borderColor = C.pr; },
          onDragLeave: function(e) { e.currentTarget.style.borderColor = C.bd; },
          onClick: function() { if (docFileInputRef.current) docFileInputRef.current.click(); },
          style: { border: "2px dashed " + C.bd, borderRadius: 12, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 14, background: C.sa, transition: "all .2s" }
        },
          React.createElement("input", { ref: docFileInputRef, type: "file", multiple: true, style: { display: "none" },
            accept: ".pdf,.doc,.docx,.xls,.xlsx,.txt,.html,.csv,.json,.xml,.ppt,.pptx,.rtf,.odt",
            onChange: function(e) { docHandleFileUpload(e.target.files); }
          }),
          React.createElement("div", { style: { fontSize: 32, marginBottom: 6 } }, "\uD83D\uDCC2"),
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx } }, "Arrastra archivos aqui o haz clic para seleccionar"),
          React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 4 } }, "PDF, Word, Excel, PowerPoint, TXT, HTML, CSV, JSON, XML, RTF, ODT")
        ),
        // File list
        docUpFiles.length > 0 ? React.createElement("div", { style: { marginBottom: 14 } },
          React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: C.ac, marginBottom: 6 } }, "\uD83D\uDCCE " + docUpFiles.length + " archivo(s) cargado(s)"),
          docUpFiles.map(function(f, i) {
            var ext = f.name.split(".").pop().toLowerCase();
            var icon = ext === "pdf" ? "\uD83D\uDCC4" : ext === "doc" || ext === "docx" ? "\uD83D\uDCD8" : ext === "xls" || ext === "xlsx" ? "\uD83D\uDCCA" : "\uD83D\uDCC3";
            return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 10px", background: C.card, borderRadius: 6, marginBottom: 3, border: "1px solid " + C.bd } },
              React.createElement("span", { style: { fontSize: 14 } }, icon),
              React.createElement("span", { style: { fontSize: 10, fontWeight: 600, color: C.tx, flex: 1 } }, f.name),
              React.createElement("span", { style: { fontSize: 8, color: C.td } }, (f.size / 1024).toFixed(1) + " KB"),
              React.createElement("span", { style: { fontSize: 9, color: docUpContents[f.name] ? C.ac : C.wn } }, docUpContents[f.name] ? "\u2705 Leido" : "\u23F3 Leyendo..."),
              React.createElement("button", { onClick: function() {
                setDocUpFiles(function(p) { return p.filter(function(_, j) { return j !== i; }); });
                var nc = Object.assign({}, docUpContents); delete nc[f.name]; setDocUpContents(nc);
                var nb = Object.assign({}, docBlobUrls); if(nb[f.name]){URL.revokeObjectURL(nb[f.name]); delete nb[f.name];} setDocBlobUrls(nb);
                var nd = Object.assign({}, docDataUrls); delete nd[f.name]; setDocDataUrls(nd);
              }, style: { background: "none", border: "none", color: C.dn, cursor: "pointer", fontSize: 11 } }, "\u2715")
            );
          })
        ) : null,
        // Action buttons
        docUpFiles.length > 0 && !docUpAnalyzing && docUpParsed.length === 0 ? React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 12 } },
          React.createElement(Btn, { primary: true, onClick: function() { docAnalyzeWithAI(); } }, React.createElement(Icons.Brain), " Analizar con IA e Identificar Campos"),
          React.createElement(Btn, { onClick: function() { docQuickImport(); } }, React.createElement(Icons.Zap), " Importacion Rapida (sin IA)")
        ) : null,
        // Analyzing status
        docUpAnalyzing ? React.createElement("div", { style: { textAlign: "center", padding: 20 } },
          React.createElement("div", { style: { fontSize: 28, marginBottom: 8, animation: "pulse 2s infinite" } }, "\uD83E\uDD16"),
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.pr } }, "Analizando documentos con IA..."),
          React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 4 } }, docUpMsg)
        ) : null,
        // Preview parsed results
        docUpParsed.length > 0 ? React.createElement("div", null,
          React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.ac } }, "\u2705 " + docUpParsed.length + " documento(s) identificado(s) — Revise y confirme:"),
            React.createElement("div", { style: { display: "flex", gap: 6 } },
              React.createElement(Btn, { sm: true, accent: true, onClick: function() {
                var enriched = docUpParsed.map(function(d, i) {
                  // Map by index (files and parsed are 1:1)
                  var f = docUpFiles[i];
                  var fName = f ? f.name : (d._fileName || "");
                  return Object.assign({}, d, {
                    date: new Date().toISOString().slice(0,10), pages: 1, status: "vigente",
                    _content: docUpContents[fName] || "",
                    _blobUrl: docBlobUrls[fName] || null,
                    _dataUrl: docDataUrls[fName] || null,
                    _fileName: fName,
                    _fileSize: f ? f.size : 0,
                    _fileType: f ? f.name.split(".").pop().toUpperCase() : "",
                    _hasFile: true,
                    mlId: docsDB.length + i + 1,
                    origen: "Importacion IA",
                    responsable: d.responsable || "Coord. SIG",
                    ubicacion: "Servidor SIG",
                    retencion: "3 anios"
                  });
                });
                setDocsDB(function(prev) { return prev.concat(enriched); });
                setDocUpParsed([]); setDocUpFiles([]); setDocUpContents({}); setDocBlobUrls({}); setDocDataUrls({}); setShowDocImport(false); setDocUpMsg("");
              } }, React.createElement(Icons.Check), " Confirmar e Importar Todo"),
              React.createElement(Btn, { sm: true, onClick: function() { setDocUpParsed([]); } }, "Limpiar")
            )
          ),
          React.createElement("div", { style: { overflowX: "auto", maxHeight: 300, border: "1px solid " + C.bd, borderRadius: 8 } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
              React.createElement("thead", null,
                React.createElement("tr", { style: { background: C.sa, position: "sticky", top: 0, zIndex: 1 } },
                  ["Codigo", "Documento", "ISO", "Area", "PDCA", "Version", "Responsable", "Tipo", ""].map(function(h) {
                    return React.createElement("th", { key: h, style: { padding: "8px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", borderBottom: "1px solid " + C.bd } }, h);
                  })
                )
              ),
              React.createElement("tbody", null,
                docUpParsed.map(function(d, idx) {
                  return React.createElement("tr", { key: idx, style: { borderBottom: "1px solid " + C.bd + "40" } },
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("input", { value: d.id, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 6px", color: C.pr, fontWeight: 700, fontSize: 10, width: 70, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { id: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("input", { value: d.name, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 6px", color: C.tx, fontSize: 10, width: "100%", minWidth: 160, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { name: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("select", { value: d.iso, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 4px", color: C.tx, fontSize: 9, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { iso: v }); return n; }); } },
                      React.createElement("option", { value: "9001" }, "9001"),
                      React.createElement("option", { value: "14001" }, "14001"),
                      React.createElement("option", { value: "45001" }, "45001"),
                      React.createElement("option", { value: "37001" }, "37001"),
                      React.createElement("option", { value: "multi" }, "Multi")
                    )),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("input", { value: d.area, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 6px", color: C.tx, fontSize: 10, width: 80, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { area: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("select", { value: d.pdca, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 4px", color: C.tx, fontSize: 9, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { pdca: v }); return n; }); } },
                      React.createElement("option", { value: "P" }, "P"),
                      React.createElement("option", { value: "D" }, "D"),
                      React.createElement("option", { value: "C" }, "C"),
                      React.createElement("option", { value: "A" }, "A")
                    )),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("input", { value: d.version, style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 6px", color: C.tx, fontSize: 10, width: 40, fontFamily: "inherit" }, onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { version: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("input", { value: d.responsable || "", style: { background: C.sa, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px 6px", color: C.tx, fontSize: 10, width: 90, fontFamily: "inherit" }, placeholder: "Coord. SIG", onChange: function(e) { var v=e.target.value; setDocUpParsed(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { responsable: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px 6px", fontSize: 8, color: C.td } }, d._fileType || ""),
                    React.createElement("td", { style: { padding: "4px 6px" } }, React.createElement("button", { onClick: function() { setDocUpParsed(function(p) { return p.filter(function(_, j) { return j !== idx; }); }); }, style: { background: "none", border: "none", color: C.dn, cursor: "pointer", fontSize: 10 } }, "\u2715"))
                  );
                })
              )
            )
          )
        ) : null,
        // Status message
        docUpMsg && !docUpAnalyzing && docUpParsed.length === 0 ? React.createElement("div", { style: { fontSize: 9, color: C.tm, padding: "8px 0" } }, docUpMsg) : null,
        // Text import fallback (collapsible)
        !docUpAnalyzing && docUpParsed.length === 0 ? React.createElement("details", { style: { marginTop: 10 } },
          React.createElement("summary", { style: { fontSize: 9, color: C.td, cursor: "pointer" } }, "\u2328\uFE0F Importacion manual por texto (alternativa)"),
          React.createElement("div", { style: { marginTop: 8 } },
            React.createElement("div", { style: { padding: 8, background: C.sa, borderRadius: 6, marginBottom: 6, fontSize: 8, color: C.tm } },
              "Formato: CODIGO | NOMBRE | ISO | AREA | PDCA | VERSION"
            ),
            React.createElement("textarea", {
              value: docImportText, onChange: function(e) { var v=e.target.value; setDocImportText(v); },
              placeholder: "DOC-030 | Plan de Contingencias | 45001 | SSOMA | P | 2.0",
              rows: 3,
              style: { width: "100%", padding: 8, borderRadius: 6, border: "1px solid " + C.bd, background: C.card, color: C.tx, fontSize: 9, fontFamily: "monospace", resize: "vertical", boxSizing: "border-box" }
            }),
            React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 6 } },
              React.createElement(Btn, { sm: true, accent: true, onClick: function() {
                var lines = docImportText.trim().split("\n"); var added = [];
                lines.forEach(function(line) { var parts = line.split("|").map(function(p){return p.trim();}); if(parts.length>=2){ added.push({ id: parts[0]||"DOC-"+String(docsDB.length+added.length+1).padStart(3,"0"), name:parts[1], iso:parts[2]||"multi", area:parts[3]||"General", pdca:parts[4]||"P", version:parts[5]||"1.0", date:new Date().toISOString().slice(0,10), pages:1, status:"vigente", mlId:docsDB.length+added.length+1, origen:"Importacion Texto", responsable:"Coord. SIG", ubicacion:"Servidor SIG", retencion:"3 anios" }); } });
                if(added.length>0){ setDocsDB(docsDB.concat(added)); setDocImportText(""); setShowDocImport(false); }
              } }, React.createElement(Icons.Zap), " Importar Texto")
            )
          )
        ) : null
      ) : null,
      // Stats
      React.createElement("div", {
        style: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }
      },
        React.createElement(Badge, { color: "blue" }, "Total: " + filteredDocs.length),
        React.createElement(Badge, { color: "green" }, "Vigentes: " + filteredDocs.filter(function(d) { return d.status === "vigente"; }).length),
        React.createElement(Badge, { color: "yellow" }, "Revision: " + filteredDocs.filter(function(d) { return d.status === "revision"; }).length),
        React.createElement(Badge, { color: "red" }, "Abiertos: " + filteredDocs.filter(function(d) { return d.status === "abierto"; }).length)
      ),
      // Table
      React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", {
            style: { width: "100%", borderCollapse: "collapse", fontSize: 11 }
          },
            React.createElement("thead", null,
              React.createElement("tr", {
                style: { borderBottom: "1px solid " + C.bd }
              },
                ["Codigo", "Documento", "ISO", "Area", "PDCA", "Version", "Estado", "Origen", "Acciones"].map(function(h) {
                  return React.createElement("th", {
                    key: h,
                    style: {
                      padding: "10px 12px", textAlign: "left", fontSize: 9, fontWeight: 700,
                      color: C.td, textTransform: "uppercase", letterSpacing: 0.5,
                    }
                  }, h);
                })
              )
            ),
            React.createElement("tbody", null,
              filteredDocs.map(function(doc) {
                return React.createElement("tr", {
                  key: doc.id,
                  style: {
                    borderBottom: "1px solid " + C.bd + "50",
                    transition: "background 0.15s",
                  },
                  onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; },
                  onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; },
                },
                  React.createElement("td", { style: { padding: "10px 12px", fontWeight: 600, color: C.pr } }, doc.id),
                  React.createElement("td", { style: { padding: "10px 12px", color: C.tx, fontWeight: 500 } }, doc.name),
                  React.createElement("td", { style: { padding: "10px 12px" } },
                    React.createElement(Badge, { color: isoColor[doc.iso] || "blue" }, "ISO " + doc.iso)
                  ),
                  React.createElement("td", { style: { padding: "10px 12px", color: C.tm } }, doc.area),
                  React.createElement("td", { style: { padding: "10px 12px" } },
                    React.createElement(Badge, { color: doc.pdca === "P" ? "blue" : doc.pdca === "D" ? "green" : doc.pdca === "C" ? "yellow" : "purple" }, pdcaLabels[doc.pdca])
                  ),
                  React.createElement("td", { style: { padding: "10px 12px", color: C.tm } }, "v" + doc.version),
                  React.createElement("td", { style: { padding: "10px 12px" } },
                    React.createElement(Badge, { color: statusColor[doc.status] }, doc.status)
                  ),
                  React.createElement("td", { style: { padding: "10px 12px" } },
                    doc._hasFile ? React.createElement(Badge, { color: "green" }, "\uD83D\uDCC2 Archivo") : React.createElement("span", { style: { fontSize: 8, color: C.td } }, "Plantilla")
                  ),
                  React.createElement("td", { style: { padding: "10px 12px" } },
                    React.createElement("div", { style: { display: "flex", gap: 4 } },
                      React.createElement(Btn, {
                        sm: true,
                        onClick: function() { setPreviewDoc(doc); },
                        style: { padding: "4px 8px" },
                        title: "Vista previa"
                      }, React.createElement(Icons.Eye)),
                      React.createElement(Btn, {
                        sm: true, primary: doc._hasFile,
                        onClick: function() { downloadDoc(doc); },
                        style: { padding: "4px 8px" },
                        title: doc._hasFile ? "Descargar " + (doc._fileType || "archivo") + " original" : "Descargar Word"
                      }, React.createElement(Icons.Download))
                    )
                  )
                );
              })
            )
          )
        )
      ),
      // Preview Modal
      React.createElement(Modal, {
        open: !!previewDoc, onClose: function() { setPreviewDoc(null); },
        title: previewDoc ? previewDoc.name : "", wide: true
      },
        previewDoc ? React.createElement("div", null,
          // Metadata bar
          React.createElement("div", {
            style: {
              display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap",
              padding: 10, background: C.sa, borderRadius: 10, alignItems: "center"
            }
          },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.pr } }, previewDoc.id),
            React.createElement(Badge, { color: isoColor[previewDoc.iso] || "blue" }, "ISO " + previewDoc.iso),
            React.createElement("div", { style: { fontSize: 10, color: C.tx } }, "v" + previewDoc.version + " | " + previewDoc.date),
            previewDoc._hasFile ? React.createElement(Badge, { color: "green" }, "\uD83D\uDCC2 " + (previewDoc._fileName || "Archivo")) : React.createElement(Badge, { color: "yellow" }, "Plantilla"),
            previewDoc._fileSize ? React.createElement("div", { style: { fontSize: 8, color: C.td } }, (previewDoc._fileSize / 1024).toFixed(0) + " KB") : null
          ),
          // Vista previa: mostrar el MISMO archivo original subido
          previewDoc._dataUrl ?
            React.createElement("iframe", {
              src: previewDoc._dataUrl,
              style: { width: "100%", height: "65vh", border: "1px solid " + C.bd, borderRadius: 8, background: "#fff" }
            })
          :
            React.createElement("iframe", {
              srcDoc: generateDocHTML(previewDoc),
              style: { width: "100%", height: "55vh", border: "1px solid " + C.bd, borderRadius: 8, background: "#fff" }
            }),
          // Botones de accion
          React.createElement("div", {
            style: { display: "flex", gap: 8, justifyContent: "space-between", marginTop: 12, alignItems: "center" }
          },
            React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
              React.createElement(Btn, {
                primary: true,
                onClick: function() { downloadDoc(previewDoc); }
              }, React.createElement(Icons.Download), previewDoc._hasFile ? " Descargar " + (previewDoc._fileType || "Archivo") + " Original" : " Descargar Word"),
              previewDoc._hasFile ? React.createElement("span", { style: { fontSize: 8, color: C.td } }, previewDoc._fileName + " (" + (previewDoc._fileSize / 1024).toFixed(0) + " KB)") : null
            ),
            React.createElement(Btn, { onClick: function() { setPreviewDoc(null); } }, "Cerrar")
          )
        ) : null
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // AUDITOR INTELIGENTE IA (v17)
  // ═══════════════════════════════════════════════════════════════════════

  function handleFileUpload(files) {
    var newFiles = Array.from(files);
    setAiFiles(function(prev) { return prev.concat(newFiles); });
    newFiles.forEach(function(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var content = e.target.result;
        setAiFileContents(function(prev) {
          var n = Object.assign({}, prev);
          n[file.name] = typeof content === "string" ? content : "[Archivo binario: " + file.name + "]";
          return n;
        });
      };
      reader.readAsText(file);
    });
  }

  var runAIAudit = useCallback(async function() {
    setAiAnalyzing(true);
    setAiProgress(5);
    setAiMessages(function(p) { return p.concat([{ role: "system", text: "Iniciando proceso de auditor\u00eda inteligente..." }]); });

    var sistemasText = aiConfig.sistemas.map(function(s) { return "ISO " + s; }).join(", ");
    var tipoObj = AUDIT_TYPES.find(function(t) { return t.id === aiConfig.tipo; });
    var tipoLabel = tipoObj ? tipoObj.label : aiConfig.tipo;

    var docsSummary = "";
    Object.keys(aiFileContents).forEach(function(name) {
      docsSummary += "\n\n=== DOCUMENTO: " + name + " ===\n" + aiFileContents[name].substring(0, 3000);
    });
    if (aiFiles.length > 0 && !docsSummary) {
      docsSummary = "\nDocumentos: " + aiFiles.map(function(f) { return f.name; }).join(", ");
    }

    var checklistText = "";
    var systems = aiConfig.sistemas.indexOf("integrado") >= 0 ? ["9001", "14001", "45001", "37001"] : aiConfig.sistemas;
    systems.forEach(function(sys) {
      var items = AUDIT_CHECKLISTS[sys] || [];
      checklistText += "\n\n=== REQUISITOS ISO " + sys + " ===\n";
      items.forEach(function(it) {
        checklistText += "Cl\u00e1usula " + it.clausula + ": " + it.req + "\n  Docs: " + it.docs.join(", ") + "\n";
      });
    });

    setAiProgress(15);
    setAiMessages(function(p) { return p.concat([{ role: "system", text: "Analizando documentos contra requisitos normativos..." }]); });

    var systemPrompt = "Eres un AUDITOR LIDER SENIOR con mas de 25 anios de experiencia en auditorias de sistemas de gestion. Experiencia: Auditor Lider ISO 9001, 14001, 45001, 37001. Auditorias internas, MINTRA/SUNAFIL, homologacion, certificacion (SGS, Bureau Veritas, TUV). Oficial de Cumplimiento experto ISO 37001. Sector CONSTRUCCION Peru. Dominio ISO 19011:2018.\n\nGenera un INFORME DE AUDITORIA COMPLETO en JSON valido sin markdown ni backticks. Estructura:\n{\"informe\":{\"titulo\":\"...\",\"numero\":\"INF-AUD-2026-001\",\"fecha\":\"" + aiConfig.fecha + "\",\"tipo_auditoria\":\"" + tipoLabel + "\",\"normas_referencia\":\"" + sistemasText + "\",\"objetivo\":\"" + (aiConfig.objetivo || "") + "\",\"alcance\":\"" + (aiConfig.alcance || "") + "\",\"criterios_auditoria\":\"...\",\"area_auditada\":\"" + (aiConfig.area || "") + "\",\"auditor_lider\":\"" + (aiConfig.auditor_lider || "Auditor IA") + "\",\"equipo_auditor\":\"" + (aiConfig.equipo || "Sistema IA") + "\",\"metodo\":\"Revision documental con IA\",\"resumen_ejecutivo\":\"...\",\"hallazgos\":[{\"numero\":\"H-001\",\"tipo\":\"nc_mayor|nc_menor|observacion|oportunidad_mejora|fortaleza\",\"clausula\":\"X.X\",\"norma\":\"ISO XXXXX\",\"descripcion\":\"...\",\"evidencia\":\"...\",\"requisito_incumplido\":\"...\",\"riesgo\":\"alto|medio|bajo\",\"recomendacion\":\"...\"}],\"resumen_hallazgos\":{\"nc_mayores\":0,\"nc_menores\":0,\"observaciones\":0,\"oportunidades_mejora\":0,\"fortalezas\":0,\"total\":0},\"conclusion\":\"...\",\"recomendaciones_generales\":[\"...\"],\"plan_accion_sugerido\":[{\"hallazgo\":\"H-001\",\"accion\":\"...\",\"responsable\":\"...\",\"plazo\":\"30 dias\"}],\"proxima_auditoria\":\"...\",\"declaracion_confidencialidad\":\"Documento confidencial.\"}}\n\nGenera 8-12 hallazgos variados, especificos al sector CONSTRUCCION. Cita clausulas exactas.";

    var userMessage = "AUDITORIA:\nTipo: " + tipoLabel + "\nSistemas: " + sistemasText + "\nAlcance: " + (aiConfig.alcance || "") + "\nArea: " + (aiConfig.area || "") + "\nObjetivo: " + (aiConfig.objetivo || "") + "\n\nCHECKLIST:" + checklistText + "\n\nDOCUMENTOS:" + (docsSummary || "\nSin documentos. Usar checklist estandar construccion.");

    try {
      setAiProgress(30);
      setAiMessages(function(p) { return p.concat([{ role: "system", text: "Ejecutando an\u00e1lisis con IA especializada..." }]); });

      var response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }]
        })
      });

      setAiProgress(70);
      setAiMessages(function(p) { return p.concat([{ role: "system", text: "Procesando resultados..." }]); });

      var data = await response.json();
      var text = (data.content || []).map(function(i) { return i.text || ""; }).join("\n");

      var report;
      try {
        var clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
        report = JSON.parse(clean);
      } catch (e2) {
        var jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          report = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No se pudo parsear la respuesta");
        }
      }

      setAiProgress(90);
      var finalReport = report.informe || report;
      setAiReport(finalReport);
      setAuditReports(function(prev) { return prev.concat([Object.assign({ id: _aUid(), fecha_generacion: new Date().toISOString(), generado_por: "IA" }, finalReport)]); });
      setAiProgress(100);
      setAiMessages(function(p) { return p.concat([{ role: "success", text: "\u2705 Auditor\u00eda completada. Informe ISO 19011 generado." }]); });
      setAiStep(4);
    } catch (err) {
      setAiMessages(function(p) { return p.concat([{ role: "error", text: "Error: " + err.message + ". Generando informe con checklist..." }]); });

      var fallbackH = [];
      var hNum = 1;
      systems.forEach(function(sys) {
        var items = AUDIT_CHECKLISTS[sys] || [];
        items.slice(0, 3).forEach(function(item) {
          var tipos = ["nc_menor", "observacion", "oportunidad_mejora", "fortaleza"];
          var tipo = tipos[Math.floor(Math.random() * tipos.length)];
          fallbackH.push({
            numero: "H-" + String(hNum++).padStart(3, "0"), tipo: tipo, clausula: item.clausula,
            norma: "ISO " + sys, descripcion: "Verificaci\u00f3n de " + item.req,
            evidencia: "Revisi\u00f3n de: " + item.docs.join(", "), requisito_incumplido: item.req,
            riesgo: tipo === "nc_mayor" ? "alto" : tipo === "nc_menor" ? "medio" : "bajo",
            recomendacion: "Verificar y actualizar " + item.docs[0]
          });
        });
      });

      var fb = {
        titulo: "Informe de Auditor\u00eda " + tipoLabel, numero: "INF-AUD-2026-" + String(auditReports.length + 1).padStart(3, "0"),
        fecha: aiConfig.fecha, tipo_auditoria: tipoLabel, normas_referencia: sistemasText,
        objetivo: aiConfig.objetivo, alcance: aiConfig.alcance,
        criterios_auditoria: "Requisitos " + sistemasText, area_auditada: aiConfig.area,
        auditor_lider: aiConfig.auditor_lider || "Auditor IA", equipo_auditor: aiConfig.equipo || "Sistema IA",
        metodo: "Revisi\u00f3n documental + checklist normativo", resumen_ejecutivo: "Auditor\u00eda basada en checklist normativo.",
        hallazgos: fallbackH,
        resumen_hallazgos: {
          nc_mayores: fallbackH.filter(function(hx) { return hx.tipo === "nc_mayor"; }).length,
          nc_menores: fallbackH.filter(function(hx) { return hx.tipo === "nc_menor"; }).length,
          observaciones: fallbackH.filter(function(hx) { return hx.tipo === "observacion"; }).length,
          oportunidades_mejora: fallbackH.filter(function(hx) { return hx.tipo === "oportunidad_mejora"; }).length,
          fortalezas: fallbackH.filter(function(hx) { return hx.tipo === "fortaleza"; }).length,
          total: fallbackH.length
        },
        conclusion: "Auditor\u00eda completada con checklist normativo.", recomendaciones_generales: ["Completar documentaci\u00f3n faltante", "Programar auditor\u00eda de seguimiento"],
        plan_accion_sugerido: fallbackH.filter(function(hx) { return hx.tipo.indexOf("nc") >= 0; }).map(function(hx) { return { hallazgo: hx.numero, accion: hx.recomendacion, responsable: aiConfig.area, plazo: "30 d\u00edas" }; }),
        proxima_auditoria: "Seguimiento en 90 d\u00edas", declaracion_confidencialidad: "Documento confidencial."
      };

      setAiReport(fb);
      setAuditReports(function(prev) { return prev.concat([Object.assign({ id: _aUid(), fecha_generacion: new Date().toISOString(), generado_por: "Checklist" }, fb)]); });
      setAiProgress(100);
      setAiStep(4);
    }
    setAiAnalyzing(false);
  }, [aiConfig, aiFiles, aiFileContents, auditReports.length]);

  function AIAuditorView() {
    function _ABadge(props) {
      var st = { display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: 20, fontSize: 9, fontWeight: 700, letterSpacing: 0.3, background: (props.color || C.tm) + "18", color: props.color || C.tm, textTransform: "uppercase", whiteSpace: "nowrap" };
      return <span style={st}>{props.text}</span>;
    }
    function _ANormBadge(props) {
      var cc = { "9001": C.i9, "14001": C.i14, "45001": C.i45, "37001": C.i37 };
      return <_ABadge text={"ISO " + props.norm} color={cc[props.norm] || C.pr} />;
    }

    var stepNames = ["Tipo de Auditor\u00eda", "Sistema y Alcance", "Documentos", "An\u00e1lisis IA", "Informe ISO 19011"];

    var reqChecklist = (function() {
      if (!aiConfig.sistemas.length) return [];
      var sysList = aiConfig.sistemas.indexOf("integrado") >= 0 ? ["9001", "14001", "45001", "37001"] : aiConfig.sistemas;
      var all = [];
      sysList.forEach(function(s) { (AUDIT_CHECKLISTS[s] || []).forEach(function(item) { all.push(Object.assign({}, item, { norma: s })); }); });
      return all;
    })();

    function StepBar() {
      return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20, gap: 4 }}>
          {stepNames.map(function(s, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flex: i < stepNames.length - 1 ? 1 : "none" }}>
                <div onClick={function() { if (i < aiStep) setAiStep(i); }} style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, cursor: i < aiStep ? "pointer" : "default", background: i < aiStep ? C.ac : i === aiStep ? "linear-gradient(135deg,#8c6bfa,#d946ef)" : C.sa, color: i <= aiStep ? "#fff" : C.td, border: "2px solid " + (i <= aiStep ? i === aiStep ? "#ff6b9d" : C.ac : C.bd) }}>{i < aiStep ? "\u2713" : i + 1}</div>
                <span style={{ fontSize: 9, fontWeight: i === aiStep ? 700 : 400, color: i === aiStep ? "#ff6b9d" : i < aiStep ? C.ac : C.td, whiteSpace: "nowrap" }}>{s}</span>
                {i < stepNames.length - 1 && <div style={{ flex: 1, height: 2, background: i < aiStep ? C.ac : C.bd, minWidth: 20 }} />}
              </div>
            );
          })}
        </div>
      );
    }

    // Step 0
    function Step0() {
      return (
        <div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>{"\uD83E\uDD16"}</div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: C.tx, margin: 0 }}>Auditor Inteligente IA</h2>
            <p style={{ fontSize: 11, color: C.tm, marginTop: 4 }}>Auditor L\u00edder Senior {"\u00b7"} +25 a\u00f1os de experiencia {"\u00b7"} ISO 19011:2018</p>
            <p style={{ fontSize: 9, color: C.td, marginTop: 2 }}>Experto en auditor\u00edas internas, MINTRA/SUNAFIL, homologaci\u00f3n y certificaci\u00f3n</p>
          </div>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }}>{"\u00bfQu\u00e9 tipo de auditor\u00eda desea realizar?"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 10 }}>
            {AUDIT_TYPES.map(function(type) {
              return (
                <div key={type.id} onClick={function() { setAiConfig(function(p) { return Object.assign({}, p, { tipo: type.id }); }); setAiStep(1); }} style={{ background: C.card, borderRadius: 10, padding: 16, border: "2px solid " + (aiConfig.tipo === type.id ? type.color : C.bd), cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{type.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: type.color }}>{type.label}</div>
                  <div style={{ fontSize: 9, color: C.tm, marginTop: 4, lineHeight: 1.4 }}>{type.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Step 1
    function Step1() {
      return (
        <div>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }}>Seleccione sistema(s) a auditar</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10, marginBottom: 16 }}>
            {AUDIT_SYSTEMS.map(function(sys) {
              var sel = aiConfig.sistemas.indexOf(sys.id) >= 0;
              return (
                <div key={sys.id} onClick={function() {
                  if (sys.id === "integrado") { setAiConfig(function(p) { return Object.assign({}, p, { sistemas: sel ? [] : ["integrado"] }); }); }
                  else { setAiConfig(function(p) { return Object.assign({}, p, { sistemas: sel ? p.sistemas.filter(function(x) { return x !== sys.id && x !== "integrado"; }) : p.sistemas.filter(function(x) { return x !== "integrado"; }).concat([sys.id]) }); }); }
                }} style={{ background: sel ? sys.color + "12" : C.card, borderRadius: 10, padding: 14, border: "2px solid " + (sel ? sys.color : C.bd), cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 22 }}>{sys.icon}</div>
                  <div style={{ flex: 1, fontSize: 11, fontWeight: 700, color: sel ? sys.color : C.tx }}>{sys.label}</div>
                  <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid " + (sel ? sys.color : C.bd), background: sel ? sys.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{sel && <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>{"\u2713"}</span>}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <div><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>\u00c1REA A AUDITAR *</label><select value={aiConfig.area} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { area: v }); }); }} style={_aSelectS}><option value="">Seleccione...</option>{["Toda la organizaci\u00f3n", "Operaciones", "SST", "Medio Ambiente", "Calidad", "Cumplimiento", "RRHH", "Log\u00edstica"].map(function(a) { return <option key={a}>{a}</option>; })}</select></div>
            <div><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>FECHA</label><input type="date" value={aiConfig.fecha} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { fecha: v }); }); }} style={_aInputS} /></div>
          </div>
          <div style={{ marginBottom: 10 }}><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>ALCANCE *</label><textarea value={aiConfig.alcance} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { alcance: v }); }); }} style={Object.assign({}, _aInputS, { minHeight: 60 })} placeholder="Ej: Verificaci\u00f3n del cumplimiento de requisitos ISO en procesos operativos..." /></div>
          <div style={{ marginBottom: 10 }}><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>OBJETIVO *</label><textarea value={aiConfig.objetivo} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { objetivo: v }); }); }} style={Object.assign({}, _aInputS, { minHeight: 50 })} placeholder="Ej: Evaluar la eficacia del sistema de gesti\u00f3n..." /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>AUDITOR L\u00cdDER</label><input value={aiConfig.auditor_lider} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { auditor_lider: v }); }); }} style={_aInputS} /></div>
            <div><label style={{ fontSize: 9, color: C.td, fontWeight: 700, display: "block", marginBottom: 3 }}>EQUIPO AUDITOR</label><input value={aiConfig.equipo} onChange={function(e) { var v=e.target.value; setAiConfig(function(p) { return Object.assign({}, p, { equipo: v }); }); }} style={_aInputS} /></div>
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "space-between" }}>
            <button onClick={function() { setAiStep(0); }} style={_aBtnS(C.sa, C.tm)}>{"\u2190"} Anterior</button>
            <button onClick={function() { setAiStep(2); }} disabled={!aiConfig.sistemas.length || !aiConfig.alcance || !aiConfig.area} style={Object.assign({}, _aBtnS(aiConfig.sistemas.length && aiConfig.alcance && aiConfig.area ? "#ff6b9d" : C.bd), { opacity: aiConfig.sistemas.length && aiConfig.alcance && aiConfig.area ? 1 : 0.5 })}>Siguiente {"\u2192"}</button>
          </div>
        </div>
      );
    }

    // Step 2
    function Step2() {
      var dragOver = dragOverUp, setDragOver = setDragOverUp;
      return (
        <div>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 }}>Documentos para Auditor\u00eda</h3>
          <div style={{ background: C.card, borderRadius: 10, border: "1px solid " + C.bd, marginBottom: 14, maxHeight: 250, overflow: "auto" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid " + C.bd, position: "sticky", top: 0, background: C.card, zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#ff6b9d" }}>{"\uD83D\uDCCB"} Check List de Verificaci\u00f3n</div>
              <div style={{ fontSize: 8, color: C.td }}>Seg\u00fan {aiConfig.sistemas.map(function(s) { return "ISO " + s; }).join(", ")}</div>
            </div>
            <div style={{ padding: 10 }}>
              {reqChecklist.map(function(item, i) {
                return (
                  <div key={i} style={{ padding: "5px 0", borderBottom: "1px dashed " + C.bd + "20", display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <_ANormBadge norm={item.norma} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: C.tx }}>Cl. {item.clausula}: {item.req}</div>
                      <div style={{ fontSize: 8, color: C.td, marginTop: 2 }}>{"\uD83D\uDCCE"} {item.docs.join(" \u00b7 ")}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div onDrop={function(e) { e.preventDefault(); setDragOver(false); handleFileUpload(e.dataTransfer.files); }} onDragOver={function(e) { e.preventDefault(); setDragOver(true); }} onDragLeave={function() { setDragOver(false); }} onClick={function() { if (fileInputRef.current) fileInputRef.current.click(); }} style={{ border: "2px dashed " + (dragOver ? "#ff6b9d" : C.bd), borderRadius: 12, background: dragOver ? "#ff6b9d08" : C.sa, padding: 24, textAlign: "center", cursor: "pointer", marginBottom: 14 }}>
            <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={function(e) { handleFileUpload(e.target.files); }} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.html,.csv,.json,.xml" />
            <div style={{ fontSize: 28, marginBottom: 6 }}>{"\uD83D\uDCE5"}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.tx }}>Arrastra documentos o haz clic para seleccionar</div>
            <div style={{ fontSize: 9, color: C.td, marginTop: 4 }}>PDF, Word, Excel, TXT, HTML, CSV, JSON, XML</div>
          </div>
          {aiFiles.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ac, marginBottom: 6 }}>{aiFiles.length} documento(s) cargado(s)</div>
              {aiFiles.map(function(f, i) {
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", background: C.card, borderRadius: 6, marginBottom: 4, border: "1px solid " + C.bd }}>
                    <span style={{ fontSize: 12 }}>{"\uD83D\uDCC4"}</span>
                    <span style={{ fontSize: 10, color: C.tx, flex: 1 }}>{f.name}</span>
                    <span style={{ fontSize: 8, color: C.td }}>{(f.size / 1024).toFixed(1)} KB</span>
                    <span style={{ fontSize: 8, color: aiFileContents[f.name] ? C.ac : C.wn }}>{aiFileContents[f.name] ? "\u2705" : "\u23F3"}</span>
                    <button onClick={function() { setAiFiles(function(p) { return p.filter(function(_, j) { return j !== i; }); }); }} style={{ background: "none", border: "none", color: C.dn, cursor: "pointer", padding: 2 }}><Icons.X /></button>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ background: C.wn + "10", borderRadius: 8, padding: 10, border: "1px solid " + C.wn + "30", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.wn }}>{"\uD83D\uDCA1"} Nota importante</div>
            <div style={{ fontSize: 9, color: C.tm, marginTop: 2 }}>Puede continuar sin documentos. El Auditor IA generar\u00e1 hallazgos basados en el checklist normativo. Con documentos, el an\u00e1lisis ser\u00e1 m\u00e1s preciso.</div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
            <button onClick={function() { setAiStep(1); }} style={_aBtnS(C.sa, C.tm)}>{"\u2190"} Anterior</button>
            <button onClick={function() { setAiStep(3); setTimeout(runAIAudit, 500); }} style={_aBtnS("#ff6b9d")}>{"\uD83E\uDD16"} Iniciar Auditor\u00eda {"\u2192"}</button>
          </div>
        </div>
      );
    }

    // Step 3
    function Step3() {
      return (
        <div style={{ textAlign: "center", padding: "30px 20px" }}>
          <style>{["@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}", "@keyframes spin{to{transform:rotate(360deg)}}"].join("")}</style>
          <div style={{ fontSize: 50, marginBottom: 12, animation: "pulse 2s infinite" }}>{"\uD83E\uDD16"}</div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "#ff6b9d", margin: "0 0 8px" }}>Auditor Inteligente en Proceso</h2>
          <p style={{ fontSize: 11, color: C.tm, marginBottom: 16 }}>Analizando documentaci\u00f3n contra requisitos normativos...</p>
          <div style={{ width: "100%", maxWidth: 400, margin: "0 auto 20px", background: C.sa, borderRadius: 10, height: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#ff6b9d,#8c6bfa)", borderRadius: 10, width: aiProgress + "%", transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff6b9d", marginBottom: 16 }}>{aiProgress}%</div>
          <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "left", background: C.card, borderRadius: 10, padding: 14, border: "1px solid " + C.bd, maxHeight: 200, overflow: "auto" }}>
            {aiMessages.map(function(msg, i) {
              var icon = msg.role === "error" ? "\u274C" : msg.role === "success" ? "\u2705" : "\u26A1";
              var color = msg.role === "error" ? C.dn : msg.role === "success" ? C.ac : C.tm;
              return <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "4px 0", borderBottom: "1px dashed " + C.bd + "20" }}><span style={{ fontSize: 10 }}>{icon}</span><span style={{ fontSize: 9, color: color }}>{msg.text}</span></div>;
            })}
            {aiAnalyzing && <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0" }}><div style={{ width: 10, height: 10, border: "2px solid #ff6b9d", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} /><span style={{ fontSize: 9, color: "#ff6b9d" }}>Procesando...</span></div>}
          </div>
        </div>
      );
    }

    // Step 4
    function Step4() {
      if (!aiReport) return <div style={{ textAlign: "center", padding: 40, color: C.td }}>No hay informe</div>;
      var r = aiReport;
      var h = r.hallazgos || [];
      var rs = r.resumen_hallazgos || {};
      var hcMap = {
        nc_mayor: { bg: C.dn + "15", color: C.dn, label: "NC MAYOR" },
        nc_menor: { bg: C.wn + "15", color: C.wn, label: "NC MENOR" },
        observacion: { bg: C.pr + "15", color: C.pr, label: "OBSERVACI\u00d3N" },
        oportunidad_mejora: { bg: C.pp + "15", color: C.pp, label: "OPORT. MEJORA" },
        fortaleza: { bg: C.ac + "15", color: C.ac, label: "FORTALEZA" }
      };
      var summaryItems = [["NC Mayores", rs.nc_mayores || 0, C.dn], ["NC Menores", rs.nc_menores || 0, C.wn], ["Observaciones", rs.observaciones || 0, C.pr], ["Oport. Mejora", rs.oportunidades_mejora || 0, C.pp], ["Fortalezas", rs.fortalezas || 0, C.ac]];
      var metaItems = [["Tipo", r.tipo_auditoria, C.pr], ["\u00c1rea", r.area_auditada, C.ac], ["Auditor", r.auditor_lider, C.pp], ["M\u00e9todo", r.metodo, C.cy]];

      return (
        <div>
          <div style={{ background: "linear-gradient(135deg,#1a0a2e,#0c1220)", borderRadius: 12, padding: 20, border: "1px solid " + C.bd, marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#ff6b9d", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>ISO 19011:2018</div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: C.tx, margin: "8px 0 4px" }}>{r.titulo}</h2>
            <div style={{ fontSize: 11, color: C.tm }}>{r.normas_referencia} {"\u00b7"} {_aFmtDate(r.fecha)}</div>
            <div style={{ fontSize: 10, color: C.pp, marginTop: 4 }}>N\u00b0 {r.numero}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, marginBottom: 16 }}>
            {metaItems.map(function(m) { return <div key={m[0]} style={{ background: C.card, borderRadius: 8, padding: 10, border: "1px solid " + C.bd }}><div style={{ fontSize: 8, color: C.td, fontWeight: 700, textTransform: "uppercase" }}>{m[0]}</div><div style={{ fontSize: 10, color: m[2], fontWeight: 600, marginTop: 2 }}>{m[1]}</div></div>; })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 16 }}>
            {summaryItems.map(function(s) { return <div key={s[0]} style={{ background: s[2] + "10", borderRadius: 8, padding: 10, border: "1px solid " + s[2] + "30", textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800, color: s[2] }}>{s[1]}</div><div style={{ fontSize: 8, color: C.tm, fontWeight: 600 }}>{s[0]}</div></div>; })}
          </div>
          <div style={{ background: C.card, borderRadius: 10, padding: 14, border: "1px solid " + C.bd, marginBottom: 14 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: C.pl }}>{"\uD83D\uDCCA"} Resumen Ejecutivo</h4>
            <p style={{ fontSize: 10, color: C.tm, lineHeight: 1.6, margin: 0 }}>{r.resumen_ejecutivo}</p>
          </div>
          <div style={{ background: C.card, borderRadius: 10, border: "1px solid " + C.bd, marginBottom: 14, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid " + C.bd, background: C.pp + "08" }}>
              <h4 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.pp }}>{"\uD83D\uDD0E"} Hallazgos ({h.length})</h4>
            </div>
            <div style={{ maxHeight: 400, overflow: "auto" }}>
              {h.map(function(hx, i) {
                var hc = hcMap[hx.tipo] || hcMap.observacion;
                return (
                  <div key={i} style={{ padding: 12, borderBottom: "1px solid " + C.bd + "20", background: i % 2 === 0 ? "transparent" : C.sa + "50" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: C.tx }}>{hx.numero}</span>
                      <_ABadge text={hc.label} color={hc.color} />
                      <_ABadge text={"Cl. " + hx.clausula} color={C.cy} />
                      <_ABadge text={hx.norma} color={C.pl} />
                      {hx.riesgo && <_ABadge text={"Riesgo: " + hx.riesgo} color={hx.riesgo === "alto" ? C.dn : hx.riesgo === "medio" ? C.wn : C.ac} />}
                    </div>
                    <div style={{ fontSize: 10, color: C.tx, fontWeight: 600, marginBottom: 4 }}>{hx.descripcion}</div>
                    {hx.evidencia && <div style={{ fontSize: 9, color: C.tm, marginBottom: 3 }}>{"\uD83D\uDCCE"} <strong>Evidencia:</strong> {hx.evidencia}</div>}
                    {hx.requisito_incumplido && <div style={{ fontSize: 9, color: C.wn, marginBottom: 3 }}>{"\u26A0\uFE0F"} <strong>Requisito:</strong> {hx.requisito_incumplido}</div>}
                    {hx.recomendacion && <div style={{ fontSize: 9, color: C.ac }}>{"\uD83D\uDCA1"} <strong>Recomendaci\u00f3n:</strong> {hx.recomendacion}</div>}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 10, padding: 14, border: "1px solid " + C.bd, marginBottom: 14 }}>
            <h4 style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#ff6b9d" }}>{"\uD83D\uDCDD"} Conclusiones</h4>
            <p style={{ fontSize: 10, color: C.tm, lineHeight: 1.6, margin: 0 }}>{r.conclusion}</p>
          </div>
          {(r.recomendaciones_generales || []).length > 0 && (
            <div style={{ background: C.card, borderRadius: 10, padding: 14, border: "1px solid " + C.bd, marginBottom: 14 }}>
              <h4 style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, color: C.pr }}>{"\uD83D\uDCCC"} Recomendaciones</h4>
              {r.recomendaciones_generales.map(function(rec, i) { return <div key={i} style={{ display: "flex", gap: 6, padding: "3px 0" }}><span style={{ color: C.pr, fontSize: 10, fontWeight: 700 }}>{i + 1}.</span><span style={{ fontSize: 10, color: C.tm }}>{rec}</span></div>; })}
            </div>
          )}
          {(r.plan_accion_sugerido || []).length > 0 && (
            <div style={{ background: C.card, borderRadius: 10, border: "1px solid " + C.bd, marginBottom: 14, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid " + C.bd, background: C.wn + "08" }}>
                <h4 style={{ margin: 0, fontSize: 11, fontWeight: 700, color: C.wn }}>{"\uD83D\uDCCB"} Plan de Acci\u00f3n</h4>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
                <thead><tr style={{ background: C.sa }}>
                  {["Hallazgo", "Acci\u00f3n", "Responsable", "Plazo"].map(function(hh) { return <th key={hh} style={{ padding: "6px 10px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, borderBottom: "1px solid " + C.bd }}>{hh}</th>; })}
                </tr></thead>
                <tbody>
                  {r.plan_accion_sugerido.map(function(pa, i) { return <tr key={i} style={{ borderBottom: "1px solid " + C.bd + "15" }}><td style={{ padding: "5px 10px", fontWeight: 700, color: C.wn }}>{pa.hallazgo}</td><td style={{ padding: "5px 10px", color: C.tx }}>{pa.accion}</td><td style={{ padding: "5px 10px", color: C.tm }}>{pa.responsable}</td><td style={{ padding: "5px 10px", color: C.ac, fontWeight: 600 }}>{pa.plazo}</td></tr>; })}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between", flexWrap: "wrap" }}>
            <button onClick={function() { setAiStep(0); setAiReport(null); setAiFiles([]); setAiFileContents({}); setAiMessages([]); setAiConfig({ tipo: "", sistemas: [], alcance: "", area: "", objetivo: "", auditor_lider: "", equipo: "", fecha: _aToday() }); }} style={_aBtnS(C.sa, C.tm)}>{"\uD83D\uDD04"} Nueva Auditor\u00eda</button>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={function() { downloadHTML((r.numero || "Informe") + ".html", buildReportHTML(r)); }} style={_aBtnS(C.ac, "#000")}><Icons.Download /> Descargar HTML</button>
              <button onClick={function() { if (navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(r, null, 2)); }} style={_aBtnS(C.pp)}><Icons.Doc /> Copiar JSON</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {StepBar()}
        {aiStep === 0 && Step0()}
        {aiStep === 1 && Step1()}
        {aiStep === 2 && Step2()}
        {aiStep === 3 && Step3()}
        {aiStep === 4 && Step4()}
      </div>
    );
  }


  // ═══════════════════════════════════════════════════════════════════════
  // LEGAL COMPLIANCE VIEW
  // ═══════════════════════════════════════════════════════════════════════
  function LegalView() {
    var filteredLegal = legalDB.filter(function(l) {
      if (legalStep < 2) return false;
      var sectorMatch = l.aplica.indexOf("Todas") >= 0 || l.aplica.indexOf(legalProfile.sector) >= 0;
      return sectorMatch;
    });

    // AI-powered Legal Matrix Update
    async function runLegalUpdate() {
      setLegalUpdating(true);
      setLegalUpdateMsg("Consultando normativa legal vigente...");

      var sectorText = legalProfile.sector || "Construccion";
      var currentNorms = legalDB.map(function(l) { return l.norma + " - " + l.titulo; }).join("; ");

      var systemPrompt = "Eres un ABOGADO ESPECIALISTA en derecho regulatorio peruano con 20+ anios de experiencia en cumplimiento normativo para el sector " + sectorText + ". Experto en legislacion laboral (MTPE/SUNAFIL), ambiental (MINAM/OEFA), seguridad en construccion (MVCS), mineria (MINEM/OSINERGMIN), anticorrupcion/compliance (MINJUS) y normativa ISO 9001/14001/45001/37001.\n\nGenera un analisis EXHAUSTIVO de la normativa legal vigente aplicable. Responde UNICAMENTE en JSON valido sin markdown ni backticks.\nEstructura exacta:\n{\"normas\":[{\"id\":\"LEG-XXX\",\"norma\":\"Ley/DS/RM numero\",\"titulo\":\"Titulo completo\",\"tipo\":\"Ley|Decreto Supremo|Resolucion Ministerial|Norma Tecnica\",\"entidad\":\"Entidad emisora\",\"aplica\":[\"Sector1\",\"Sector2\"],\"iso\":\"9001|14001|45001|37001\",\"estado\":\"vigente\",\"ultima\":\"Ultima modificacion conocida\",\"riesgo\":\"critico|alto|medio|bajo\",\"cumplimiento\":85}]}\n\nINCLUYE AL MENOS 25-30 normas cubriendo: SST (Ley 29783, DS 005-2012-TR, G.050, normas sectoriales), Ambiental (Ley 28611, SEIA, residuos, emisiones), Calidad (normas tecnicas, metrologia), Antisoborno (Ley 30424, compliance), Laboral (contratacion, beneficios), Transporte, ITSE, Defensa Civil. Prioriza normas criticas. Incluye modificatorias 2024-2025.";

      var userMessage = "Sector: " + sectorText + "\nTamano empresa: " + (legalProfile.workers || "100-500") + " trabajadores\nRazon social: " + (legalProfile.alcance || "Empresa constructora") + "\nNormas actuales en base de datos: " + currentNorms + "\n\nPor favor genera la matriz legal COMPLETA y ACTUALIZADA con toda la normativa vigente aplicable al sector " + sectorText + " en Peru. Incluye legislacion reciente 2024-2025, modificatorias, y cualquier norma adicional relevante que no este en la base actual. Evalua el riesgo real de cada norma.";

      try {
        setLegalUpdateMsg("Ejecutando analisis con IA especializada...");
        var response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            system: systemPrompt,
            messages: [{ role: "user", content: userMessage }]
          })
        });

        setLegalUpdateMsg("Procesando resultados...");
        var data = await response.json();
        var text = (data.content || []).map(function(i) { return i.text || ""; }).join("\n");

        var parsed;
        try {
          var clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
          parsed = JSON.parse(clean);
        } catch (e2) {
          var jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) { parsed = JSON.parse(jsonMatch[0]); }
          else { throw new Error("No se pudo parsear la respuesta"); }
        }

        var newNorms = (parsed.normas || []).map(function(n, i) {
          return {
            id: n.id || "LEG-" + String(i + 1).padStart(3, "0"),
            norma: n.norma || "",
            titulo: n.titulo || "",
            tipo: n.tipo || "Norma",
            entidad: n.entidad || "",
            aplica: Array.isArray(n.aplica) ? n.aplica : [sectorText],
            iso: n.iso || "multi",
            estado: n.estado || "vigente",
            ultima: n.ultima || "Actualizado " + new Date().toISOString().slice(0,7),
            riesgo: n.riesgo || "medio",
            cumplimiento: typeof n.cumplimiento === "number" ? n.cumplimiento : 75,
          };
        });

        if (newNorms.length > 0) {
          setLegalDB(newNorms);
          setLegalUpdateMsg("Matriz actualizada: " + newNorms.length + " normas identificadas (" + new Date().toLocaleTimeString() + ")");
        } else {
          setLegalUpdateMsg("No se obtuvieron resultados. Intente nuevamente.");
        }
      } catch (err) {
        setLegalUpdateMsg("Error: " + err.message + ". Base de datos no modificada.");
      }
      setLegalUpdating(false);
    }

    // Step 0: Profile Wizard
    function WizardStep() {
      var steps = [
        { num: 0, label: "Perfil Empresa" },
        { num: 1, label: "Configuracion" },
        { num: 2, label: "Matriz Legal" },
      ];

      return React.createElement("div", null,
        // Progress
        React.createElement("div", {
          style: { display: "flex", alignItems: "center", gap: 0, marginBottom: 24, padding: "0 20px" }
        },
          steps.map(function(st, i) {
            var done = legalStep > st.num;
            var active = legalStep === st.num;
            return React.createElement(React.Fragment, { key: st.num },
              React.createElement("div", {
                style: { display: "flex", alignItems: "center", gap: 8 }
              },
                React.createElement("div", {
                  style: {
                    width: 28, height: 28, borderRadius: "50%",
                    background: done ? C.ac : active ? C.pr : C.sa,
                    color: done || active ? "#fff" : C.td,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                  }
                }, done ? React.createElement(Icons.Check) : st.num + 1),
                React.createElement("span", {
                  style: { fontSize: 11, fontWeight: active ? 700 : 500, color: active ? C.tx : C.tm }
                }, st.label)
              ),
              i < steps.length - 1 ? React.createElement("div", {
                style: {
                  flex: 1, height: 2, background: done ? C.ac : C.bd, margin: "0 12px",
                }
              }) : null
            );
          })
        ),

        // Step Content
        legalStep === 0 ? React.createElement(Card, { style: { padding: 24, maxWidth: 600, margin: "0 auto" } },
          React.createElement("div", {
            style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }
          },
            React.createElement("div", {
              style: { width: 40, height: 40, borderRadius: 12, background: C.g4, display: "flex", alignItems: "center", justifyContent: "center" }
            }, React.createElement(Icons.Building)),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx } }, "Perfil de la Organizacion"),
              React.createElement("div", { style: { fontSize: 10, color: C.td } }, "Defina los datos basicos para generar la matriz legal")
            )
          ),
          React.createElement(InputField, {
            label: "Razon Social / Nombre de la Empresa",
            value: legalProfile.alcance,
            onChange: function(v) { setLegalProfile(Object.assign({}, legalProfile, { alcance: v })); },
            placeholder: "Ej: Constructora ABC S.A.C."
          }),
          React.createElement(SelectField, {
            label: "Sector / Rubro Principal",
            value: legalProfile.sector,
            onChange: function(v) { setLegalProfile(Object.assign({}, legalProfile, { sector: v })); },
            options: SECTORS, placeholder: "Seleccionar sector..."
          }),
          React.createElement(SelectField, {
            label: "Numero de Trabajadores",
            value: legalProfile.workers,
            onChange: function(v) { setLegalProfile(Object.assign({}, legalProfile, { workers: v })); },
            options: [
              { value: "1-20", label: "Micro (1-20 trabajadores)" },
              { value: "21-100", label: "Pequena (21-100 trabajadores)" },
              { value: "100-500", label: "Mediana (100-500 trabajadores)" },
              { value: "500+", label: "Grande (500+ trabajadores)" },
            ]
          }),
          React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 16 } },
            React.createElement(Btn, { primary: true, onClick: function() { setLegalStep(1); } }, "Siguiente ", React.createElement(Icons.ChevRight))
          )
        ) : null,

        legalStep === 1 ? React.createElement(Card, { style: { padding: 24, maxWidth: 600, margin: "0 auto" } },
          React.createElement("div", {
            style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }
          },
            React.createElement("div", {
              style: { width: 40, height: 40, borderRadius: 12, background: C.g1, display: "flex", alignItems: "center", justifyContent: "center" }
            }, React.createElement(Icons.Settings)),
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx } }, "Configuracion del Alcance"),
              React.createElement("div", { style: { fontSize: 10, color: C.td } }, "Defina las normas ISO que aplican a su organizacion")
            )
          ),
          React.createElement("div", { style: { marginBottom: 16 } },
            React.createElement("label", { style: { fontSize: 10, fontWeight: 600, color: C.tm, display: "block", marginBottom: 8 } }, "Sistemas de Gestion Implementados"),
            [
              { code: "ISO 9001:2015", label: "Sistema de Gestion de Calidad", color: C.i9 },
              { code: "ISO 14001:2015", label: "Sistema de Gestion Ambiental", color: C.i14 },
              { code: "ISO 45001:2018", label: "Sistema de Gestion SST", color: C.i45 },
              { code: "ISO 37001:2016", label: "Sistema de Gestion Antisoborno", color: C.i37 },
            ].map(function(iso) {
              return React.createElement("div", {
                key: iso.code,
                style: {
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  background: C.sa, borderRadius: 8, marginBottom: 6,
                  border: "1px solid " + iso.color + "30",
                }
              },
                React.createElement("div", {
                  style: { width: 18, height: 18, borderRadius: 4, background: iso.color, display: "flex", alignItems: "center", justifyContent: "center" }
                }, React.createElement(Icons.Check)),
                React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.tx } }, iso.code),
                  React.createElement("div", { style: { fontSize: 9, color: C.td } }, iso.label)
                )
              );
            })
          ),
          React.createElement("div", {
            style: { padding: 12, background: C.pr + "10", borderRadius: 8, marginBottom: 16 }
          },
            React.createElement("div", { style: { fontSize: 10, color: C.pl, fontWeight: 600 } },
              "Sector: " + legalProfile.sector + " | Trabajadores: " + legalProfile.workers
            ),
            React.createElement("div", { style: { fontSize: 9, color: C.tm, marginTop: 4 } },
              "Se generara una matriz con las normas legales aplicables a su perfil."
            )
          ),
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 16 } },
            React.createElement(Btn, { onClick: function() { setLegalStep(0); } }, "Anterior"),
            React.createElement(Btn, { primary: true, onClick: function() { setLegalStep(2); } }, "Generar Matriz ", React.createElement(Icons.ChevRight))
          )
        ) : null,

        legalStep === 2 ? React.createElement("div", null,
          // Profile summary bar
          React.createElement("div", {
            style: {
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "10px 16px", background: C.sa, borderRadius: 10, marginBottom: 16,
            }
          },
            React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" } },
              React.createElement(Badge, { color: "blue" }, legalProfile.sector),
              React.createElement(Badge, { color: "cyan" }, legalProfile.workers + " trabajadores"),
              React.createElement(Badge, { color: "green" }, filteredLegal.length + " normas aplicables")
            ),
            React.createElement(Btn, { sm: true, onClick: function() { setLegalStep(0); } }, React.createElement(Icons.Settings), " Editar Perfil")
          ),
          // KPIs
          React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
            React.createElement(KPICard, {
              icon: React.createElement(Icons.Scale), label: "Normas Rastreadas",
              value: String(filteredLegal.length), glow: C.pp
            }),
            React.createElement(KPICard, {
              icon: React.createElement(Icons.Check), label: "Cumplimiento Promedio",
              value: Math.round(filteredLegal.reduce(function(a, b) { return a + b.cumplimiento; }, 0) / (filteredLegal.length || 1)) + "%",
              glow: C.ac,
              sub: filteredLegal.filter(function(l) { return l.cumplimiento >= 85; }).length + " normas al dia"
            }),
            React.createElement(KPICard, {
              icon: React.createElement(Icons.Alert), label: "Riesgo Critico",
              value: String(filteredLegal.filter(function(l) { return l.riesgo === "critico"; }).length),
              glow: C.dn, sub: "Requieren atencion inmediata", subColor: C.dn
            }),
            React.createElement(KPICard, {
              icon: React.createElement(Icons.Clock), label: "Actualizaciones Recientes",
              value: String(filteredLegal.filter(function(l) { return l.ultima.indexOf("2025") >= 0 || l.ultima.indexOf("2024") >= 0; }).length),
              glow: C.wn, sub: "Normas modificadas 2024-2025"
            })
          ),
          // Matrix Table
          React.createElement(Card, { p: 0 },
            React.createElement("div", {
              style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }
            },
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Matriz de Seguimiento por Norma"),
                legalUpdateMsg ? React.createElement("div", { style: { fontSize: 9, color: legalUpdating ? C.cy : C.ac, marginTop: 2 } }, legalUpdateMsg) : null
              ),
              React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" } },
                React.createElement(Badge, { color: "red" }, "Critico: " + filteredLegal.filter(function(l) { return l.riesgo === "critico"; }).length),
                React.createElement(Badge, { color: "yellow" }, "Alto: " + filteredLegal.filter(function(l) { return l.riesgo === "alto"; }).length),
                React.createElement(Badge, { color: "blue" }, "Medio: " + filteredLegal.filter(function(l) { return l.riesgo === "medio"; }).length),
                React.createElement(Btn, {
                  sm: true, primary: true, disabled: legalUpdating,
                  onClick: function() { runLegalUpdate(); }
                }, legalUpdating ? React.createElement("span", { style: { animation: "spin 1s infinite linear", display: "inline-block" } }, "\u23F3") : React.createElement(Icons.Zap), legalUpdating ? " Actualizando..." : " Actualizar Normativa IA"),
                rImpBtn("legal", "Analiza este documento de normativa legal y extrae datos en JSON array. Cada registro: norma (codigo), titulo, tipo (Ley/DS/RM/NTP/Reglamento), iso (9001/14001/45001/37001), riesgo (critico/alto/medio/bajo), cumplimiento (numero 0-100), ultima (fecha ultima actualizacion), descripcion. Solo JSON.", "Importar"),
                React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Norma","Titulo","Tipo","ISO","Riesgo","Cumplimiento %","Ultima Actualizacion"], filteredLegal.map(function(l) { return [l.norma, l.titulo, l.tipo, l.iso, l.riesgo, l.cumplimiento, l.ultima]; }), "Normativa_Legal", "Normativa Legal Aplicable"); } })
              )
            ),
            rImpLoading("legal", "Analizando normativa legal con IA..."),
            (function() { var _ls = gImpState("legal"); if (_ls.show && _ls.data.length > 0) { return rImpPreview("legal", ["Norma","Titulo","Tipo","ISO","Riesgo","Cumplimiento"], ["norma","titulo","tipo","iso","riesgo","cumplimiento"], ["text","text","select","select","select","number"], { tipo: ["Ley","DS","RM","NTP","Reglamento","Norma"], iso: ["9001","14001","45001","37001","General"], riesgo: ["critico","alto","medio","bajo"], _confirm: function() { gConfirmImp("legal", setLegalDB, function(i) { return "LEG-" + (legalDB.length+i+1); }, {cumplimiento:50,ultima:"2025-12-01",descripcion:""}); } }, C.pp); } return null; })(),
            React.createElement("div", { style: { overflowX: "auto" } },
              React.createElement("table", {
                style: { width: "100%", borderCollapse: "collapse", fontSize: 10 }
              },
                React.createElement("thead", null,
                  React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
                    ["Norma", "Titulo", "Tipo", "ISO", "Riesgo", "Cumpl.", "Ultima Actualizacion"].map(function(h) {
                      return React.createElement("th", {
                        key: h,
                        style: {
                          padding: "10px 10px", textAlign: "left", fontSize: 8, fontWeight: 700,
                          color: C.td, textTransform: "uppercase", letterSpacing: 0.5,
                          whiteSpace: "nowrap",
                        }
                      }, h);
                    })
                  )
                ),
                React.createElement("tbody", null,
                  filteredLegal.map(function(l) {
                    var riskColor = l.riesgo === "critico" ? "red" : l.riesgo === "alto" ? "yellow" : "blue";
                    return React.createElement("tr", {
                      key: l.id,
                      style: { borderBottom: "1px solid " + C.bd + "50" },
                      onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; },
                      onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; },
                    },
                      React.createElement("td", { style: { padding: "10px", fontWeight: 700, color: C.pr, whiteSpace: "nowrap" } }, l.norma),
                      React.createElement("td", { style: { padding: "10px", color: C.tx, fontWeight: 500, maxWidth: 220 } }, l.titulo),
                      React.createElement("td", { style: { padding: "10px", color: C.tm, whiteSpace: "nowrap" } }, l.tipo),
                      React.createElement("td", { style: { padding: "10px" } },
                        React.createElement(Badge, { color: l.iso === "45001" ? "yellow" : l.iso === "14001" ? "green" : l.iso === "37001" ? "purple" : "blue" }, l.iso)
                      ),
                      React.createElement("td", { style: { padding: "10px" } },
                        React.createElement(Badge, { color: riskColor }, l.riesgo)
                      ),
                      React.createElement("td", { style: { padding: "10px" } },
                        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, minWidth: 80 } },
                          React.createElement("div", {
                            style: { width: 50, height: 5, borderRadius: 3, background: C.sa, overflow: "hidden" }
                          },
                            React.createElement("div", {
                              style: {
                                height: "100%", borderRadius: 3,
                                width: l.cumplimiento + "%",
                                background: l.cumplimiento >= 85 ? C.ac : l.cumplimiento >= 70 ? C.wn : C.dn,
                              }
                            })
                          ),
                          React.createElement("span", {
                            style: { fontSize: 10, fontWeight: 700, color: l.cumplimiento >= 85 ? C.ac : l.cumplimiento >= 70 ? C.wn : C.dn }
                          }, l.cumplimiento + "%")
                        )
                      ),
                      React.createElement("td", { style: { padding: "10px" } },
                        React.createElement("div", {
                          style: {
                            fontSize: 9, color: C.wn, background: C.wn + "10",
                            padding: "4px 8px", borderRadius: 6, maxWidth: 220,
                          }
                        }, l.ultima)
                      )
                    );
                  })
                )
              )
            )
          )
        ) : null
      );
    }

    return React.createElement("div", null,
      WizardStep()
    );
  }


  // ═══════════════════════════════════════════════════════════════════════
  // ISO 9001:2015 v02 — SISTEMA DE GESTION DE CALIDAD (Dashboard Propio)
  // ═══════════════════════════════════════════════════════════════════════
  function ISO9001V2View() {
    var tabs = [
      { key: "dashboard-q", label: "Dashboard Calidad", icon: Icons.Dash },
      { key: "procesos", label: "Mapa de Procesos", icon: Icons.Bar },
      { key: "nc-ac", label: "NC / Acciones", icon: Icons.Alert },
      { key: "satisfaccion", label: "Satisfaccion Cliente", icon: Icons.Users },
      { key: "indicadores-q", label: "Indicadores", icon: Icons.Trend },
      { key: "revision-dir", label: "Revision Direccion", icon: Icons.Clipboard },
      { key: "db-q", label: "Base de Datos", icon: Icons.Database },
    ];

    var satisfTrend = [
      { mes:"Ene",enc:4.0,rec:12,nps:62},{mes:"Feb",enc:4.1,rec:10,nps:65},{mes:"Mar",enc:4.2,rec:8,nps:68},
      {mes:"Abr",enc:4.3,rec:7,nps:70},{mes:"May",enc:4.1,rec:9,nps:67},{mes:"Jun",enc:4.4,rec:6,nps:72},
      {mes:"Jul",enc:4.3,rec:5,nps:74},{mes:"Ago",enc:4.5,rec:4,nps:76},{mes:"Sep",enc:4.4,rec:6,nps:73},
      {mes:"Oct",enc:4.6,rec:3,nps:78},{mes:"Nov",enc:4.5,rec:4,nps:77},{mes:"Dic",enc:4.7,rec:2,nps:80},
    ];
    var procesoData = procDB;
    var ncTrend = [
      {mes:"Jul",abiertas:8,cerradas:5,vencidas:2},{mes:"Ago",abiertas:7,cerradas:6,vencidas:1},
      {mes:"Sep",abiertas:6,cerradas:7,vencidas:1},{mes:"Oct",abiertas:5,cerradas:5,vencidas:0},
      {mes:"Nov",abiertas:4,cerradas:6,vencidas:0},{mes:"Dic",abiertas:3,cerradas:4,vencidas:0},
    ];
    var ncDB = nc9DB;
    var costoCalidad = [{cat:"Prevencion",valor:45000},{cat:"Evaluacion",valor:32000},{cat:"Falla Interna",valor:28000},{cat:"Falla Externa",valor:23000}];
    var ccColors = [C.ac, C.pr, C.wn, C.dn];
    var productConf = [
      {mes:"Jul",conforme:96.2,reproceso:2.8,rechazo:1.0},{mes:"Ago",conforme:96.8,reproceso:2.4,rechazo:0.8},
      {mes:"Sep",conforme:97.0,reproceso:2.2,rechazo:0.8},{mes:"Oct",conforme:97.3,reproceso:2.0,rechazo:0.7},
      {mes:"Nov",conforme:97.5,reproceso:1.8,rechazo:0.7},{mes:"Dic",conforme:97.8,reproceso:1.6,rechazo:0.6},
    ];
    var radarCap = [
      {cap:"Contexto(4)",val:85},{cap:"Liderazgo(5)",val:90},{cap:"Planific.(6)",val:82},
      {cap:"Apoyo(7)",val:78},{cap:"Operacion(8)",val:92},{cap:"Evaluac.(9)",val:80},{cap:"Mejora(10)",val:85},
    ];
    var revDirItems = [
      {tema:"Estado de acciones previas",estado:"cumplido",detalle:"8 de 10 acciones cerradas"},
      {tema:"Cambios cuestiones externas e internas",estado:"actualizado",detalle:"Analisis FODA revisado Nov 2025"},
      {tema:"Desempeno de procesos y conformidad",estado:"cumplido",detalle:"Eficacia promedio 88.4%"},
      {tema:"No conformidades y acciones correctivas",estado:"en proceso",detalle:"3 NC abiertas"},
      {tema:"Resultados de seguimiento y medicion",estado:"cumplido",detalle:"KPIs al dia en 9 de 10 procesos"},
      {tema:"Resultados de auditorias",estado:"cumplido",detalle:"Auditoria interna ciclo II completada"},
      {tema:"Desempeno de proveedores externos",estado:"en proceso",detalle:"Reevaluacion Q4 pendiente 3 proveedores"},
      {tema:"Adecuacion de recursos",estado:"cumplido",detalle:"Presupuesto SIG aprobado 2026"},
      {tema:"Eficacia acciones para riesgos",estado:"cumplido",detalle:"Matriz de riesgos actualizada"},
      {tema:"Oportunidades de mejora",estado:"pendiente",detalle:"5 propuestas de mejora en evaluacion"},
    ];

    function QualityDashboard() {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Star), label: "Satisfaccion Cliente", value: "4.7/5.0", sub: "\u2191 0.5 pts en 12 meses", glow: C.i9 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Check), label: "Producto Conforme", value: "97.8%", sub: "Meta: 95% \u2713", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "NC Abiertas", value: "3", sub: "0 vencidas", subColor: C.ac, glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Trend), label: "Eficacia Procesos", value: "88.4%", sub: "\u2191 2.1% vs sem. anterior", glow: C.pr }),
          React.createElement(KPICard, { icon: React.createElement(Icons.RefreshCw), label: "Cierre AC/AP", value: "92%", sub: "Efectividad acciones", glow: C.pp })
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "3fr 2fr", gap: 12, marginBottom: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 4 } }, "Conformidad del Producto (6M)"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 10 } }, "Cl. 8.6 Liberacion de productos"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 200 },
              React.createElement(AreaChart, { data: productConf },
                React.createElement("defs", null,
                  React.createElement("linearGradient", { id: "gconf", x1: 0, y1: 0, x2: 0, y2: 1 },
                    React.createElement("stop", { offset: "5%", stopColor: C.ac, stopOpacity: 0.4 }),
                    React.createElement("stop", { offset: "95%", stopColor: C.ac, stopOpacity: 0 })
                  )
                ),
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 10, domain: [94, 100] }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Area, { type: "monotone", dataKey: "conforme", stroke: C.ac, fill: "url(#gconf)", strokeWidth: 2.5, name: "% Conforme" }),
                React.createElement(Line, { type: "monotone", dataKey: "reproceso", stroke: C.wn, strokeWidth: 2, dot: { fill: C.wn, r: 3 }, name: "% Reproceso" }),
                React.createElement(Line, { type: "monotone", dataKey: "rechazo", stroke: C.dn, strokeWidth: 2, dot: { fill: C.dn, r: 3 }, name: "% Rechazo" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 4 } }, "Costo de Calidad"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 10 } }, "Distribucion PEN"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 140 },
              React.createElement(PieChart, null,
                React.createElement(Pie, { data: costoCalidad, dataKey: "valor", nameKey: "cat", cx: "50%", cy: "50%", innerRadius: 30, outerRadius: 55, paddingAngle: 3, strokeWidth: 0 },
                  costoCalidad.map(function(e, i) { return React.createElement(Cell, { key: i, fill: ccColors[i] }); })
                ),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 }, formatter: function(v) { return "S/ " + v.toLocaleString(); } }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            ),
            React.createElement("div", { style: { textAlign: "center", fontSize: 10, color: C.tm, marginTop: 4 } }, "Total: S/ 128,000")
          )
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Satisfaccion Cliente (12M)"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(ComposedChart, { data: satisfTrend },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 9 }),
                React.createElement(YAxis, { yAxisId: "left", stroke: C.td, fontSize: 9, domain: [3.5, 5] }),
                React.createElement(YAxis, { yAxisId: "right", orientation: "right", stroke: C.td, fontSize: 9 }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Area, { yAxisId: "right", type: "monotone", dataKey: "nps", stroke: C.pp, fill: C.pp + "15", strokeWidth: 1.5, name: "NPS" }),
                React.createElement(Line, { yAxisId: "left", type: "monotone", dataKey: "enc", stroke: C.i9, strokeWidth: 2.5, dot: { fill: C.i9, r: 3 }, name: "Encuesta" }),
                React.createElement(Bar, { yAxisId: "right", dataKey: "rec", fill: C.dn + "60", radius: [3, 3, 0, 0], name: "Reclamos" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Madurez por Capitulo ISO 9001"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(RadarChart, { data: radarCap, outerRadius: 60 },
                React.createElement(PolarGrid, { stroke: C.bd }),
                React.createElement(PolarAngleAxis, { dataKey: "cap", fontSize: 8, stroke: C.tm }),
                React.createElement(PolarRadiusAxis, { fontSize: 8, stroke: C.td, domain: [0, 100] }),
                React.createElement(Radar, { dataKey: "val", stroke: C.i9, fill: C.i9, fillOpacity: 0.2, strokeWidth: 2 })
              )
            )
          )
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Tendencia NC / AC (6M)"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(BarChart, { data: ncTrend },
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 10 }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Bar, { dataKey: "abiertas", fill: C.dn, radius: [3, 3, 0, 0], name: "Abiertas" }),
                React.createElement(Bar, { dataKey: "cerradas", fill: C.ac, radius: [3, 3, 0, 0], name: "Cerradas" }),
                React.createElement(Bar, { dataKey: "vencidas", fill: C.wn, radius: [3, 3, 0, 0], name: "Vencidas" }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Eficacia por Proceso"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
              procesoData.slice(0, 6).map(function(p) {
                var met = p.eficacia >= p.meta;
                return React.createElement("div", { key: p.name },
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 2 } },
                    React.createElement("span", null, p.name),
                    React.createElement("span", { style: { fontWeight: 700, color: met ? C.ac : C.dn } }, p.eficacia + "% ", met ? "\u2713" : "\u2717")
                  ),
                  React.createElement(ProgressBar, { value: p.eficacia, color: C.i9 })
                );
              })
            )
          )
        )
      );
    }

    function ProcesosView() {
      var tipoColor = { Core: "blue", Soporte: "cyan", Estrategico: "purple" };
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" } },
          React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
            React.createElement(Badge, { color: "blue" }, "Core: " + procesoData.filter(function(p) { return p.tipo === "Core"; }).length),
            React.createElement(Badge, { color: "cyan" }, "Soporte: " + procesoData.filter(function(p) { return p.tipo === "Soporte"; }).length),
            React.createElement(Badge, { color: "purple" }, "Estrategico: " + procesoData.filter(function(p) { return p.tipo === "Estrategico"; }).length)
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn("proc", "Analiza este documento de procesos del SGC y extrae datos en JSON array. Cada registro: name (nombre proceso), tipo (Core/Soporte/Estrategico), dueno (responsable), eficacia (numero 0-100), meta (numero 0-100), docs (cantidad documentos), nc (cantidad NC). Solo JSON.", "Importar"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Proceso","Tipo","Dueno","Eficacia %","Meta %","Documentos","NC","Estado"], procesoData.map(function(p) { return [p.name, p.tipo, p.dueno, p.eficacia, p.meta, p.docs, p.nc, p.eficacia >= p.meta ? "Conforme" : "No Conforme"]; }), "Procesos_ISO9001", "Mapa de Procesos SGC"); } })
          )
        ),
        rImpLoading("proc", "Analizando documento de procesos con IA..."),
        (function() { var _ps = gImpState("proc"); if (_ps.show && _ps.data.length > 0) { return rImpPreview("proc", ["Proceso","Tipo","Dueno","Eficacia","Meta","Docs","NC"], ["name","tipo","dueno","eficacia","meta","docs","nc"], ["text","select","text","number","number","number","number"], { tipo: ["Core","Soporte","Estrategico"], _confirm: function() { gConfirmImp("proc", setProcDB, function(i) { return "PROC-" + (procesoData.length+i+1); }, {eficacia:80,meta:80,docs:0,nc:0}); } }, C.i9); } return null; })(),
        React.createElement(Card, { p: 0 },
          React.createElement("div", { style: { overflowX: "auto" } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 11 } },
              React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
                ["Proceso","Tipo","Dueno","Eficacia","Meta","Docs","NC","Estado",""].map(function(h) {
                  return React.createElement("th", { key: h, style: { padding: "10px", textAlign: "left", fontSize: 9, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h);
                })
              )),
              React.createElement("tbody", null, procesoData.map(function(p, pi) {
                var met = p.eficacia >= p.meta; var isE = gIsEdit("proc", pi);
                function _ps(f,v) { setProcDB(function(pp) { var nn = pp.slice(); nn[pi] = Object.assign({}, nn[pi]); nn[pi][f] = typeof v === "number" ? v : v; return nn; }); }
                return React.createElement("tr", { key: pi, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i9 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.name,"text",function(v){_ps("name",v);},null,120)) : React.createElement("td", { style: { padding: "10px", fontWeight: 600, color: C.tx } }, p.name),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.tipo,"select",function(v){_ps("tipo",v);},["Core","Soporte","Estrategico"],90)) : React.createElement("td", { style: { padding: "10px" } }, React.createElement(Badge, { color: tipoColor[p.tipo] }, p.tipo)),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.dueno,"text",function(v){_ps("dueno",v);},null,100)) : React.createElement("td", { style: { padding: "10px", color: C.tm, fontSize: 10 } }, p.dueno),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.eficacia,"number",function(v){_ps("eficacia",parseInt(v)||0);},null,50)) : React.createElement("td", { style: { padding: "10px" } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, React.createElement(ProgressBar, { value: p.eficacia, color: C.i9 }), React.createElement("span", { style: { fontSize: 10, fontWeight: 700, color: met ? C.ac : C.dn, minWidth: 35 } }, p.eficacia + "%"))),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.meta,"number",function(v){_ps("meta",parseInt(v)||0);},null,50)) : React.createElement("td", { style: { padding: "10px", color: C.tm } }, p.meta + "%"),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.docs,"number",function(v){_ps("docs",parseInt(v)||0);},null,40)) : React.createElement("td", { style: { padding: "10px", color: C.pr, fontWeight: 600 } }, p.docs),
                  isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,p.nc,"number",function(v){_ps("nc",parseInt(v)||0);},null,40)) : React.createElement("td", { style: { padding: "10px" } }, p.nc > 0 ? React.createElement(Badge, { color: "red" }, p.nc) : React.createElement(Badge, { color: "green" }, "0")),
                  React.createElement("td", { style: { padding: "10px" } }, React.createElement(Badge, { color: met ? "green" : "red" }, met ? "Conforme" : "No Conforme")),
                  React.createElement("td",{style:{padding:"6px"}}, React.createElement("button",{onClick:function(){gSetEdit("proc",pi);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
                );
              }))
            )
          )
        )
      );
    }

    function NCACView() {
      var estadoColor = { abierta: "red", "en proceso": "yellow", cerrada: "green" };
      var tipoC = { Mayor: "red", Menor: "yellow", Observacion: "blue" };
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 } },
          React.createElement("div", { style: { display: "flex", gap: 8 } },
            React.createElement(Badge, { color: "red" }, "Abiertas: " + ncDB.filter(function(n) { return n.estado === "abierta"; }).length),
            React.createElement(Badge, { color: "yellow" }, "En Proceso: " + ncDB.filter(function(n) { return n.estado === "en proceso"; }).length),
            React.createElement(Badge, { color: "green" }, "Cerradas: " + ncDB.filter(function(n) { return n.estado === "cerrada"; }).length)
          ),
          React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
            rImpBtn("nc9", "Analiza este documento de no conformidades ISO 9001 y extrae datos en JSON array. Cada registro: nc (codigo), tipo (Mayor/Menor/Observacion), proceso, desc (hallazgo), estado (abierta/en proceso/cerrada), fecha (YYYY-MM-DD), responsable, plazo (YYYY-MM-DD), avance (0-100). Solo JSON.", "Importar NC"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["NC","Proceso","Hallazgo","Tipo","Estado","Fecha","Responsable"], ncDB.map(function(r) { return [r.nc || r.id, r.proceso, r.hallazgo || r.desc, r.tipo, r.estado, r.fecha, r.resp || r.responsable]; }), "NC_AC_ISO9001", "NC y Acciones Correctivas ISO 9001"); } }),
            React.createElement(Btn, { primary: true, onClick: function() { setShowNcForm(!showNcForm); } }, React.createElement(Icons.Plus), " Registrar NC")
          ),
          rImpLoading("nc9", "Analizando documento NC con IA..."),
          (function() { var _ns = gImpState("nc9"); if (_ns.show && _ns.data.length > 0) { return rImpPreview("nc9", ["Tipo","Proceso","Hallazgo","Estado","Fecha","Responsable"], ["tipo","proceso","desc","estado","fecha","responsable"], ["select","text","text","select","date","text"], { tipo: ["Mayor","Menor","Observacion"], estado: ["abierta","en proceso","cerrada"], _confirm: function() { gConfirmImp("nc9", setNc9DB, function(i) { return "NC-" + new Date().getFullYear() + "-" + String(ncDB.length+i+1).padStart(3,"0"); }, {tipo:"Menor",estado:"abierta",avance:0}); } }, C.i9); } return null; })()
        ),
        showNcForm ? React.createElement(Card, { style: { padding: 16, marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Nuevo Registro NC"),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
            React.createElement(SelectField, { label: "Tipo", value: ncForm.tipo, onChange: function(v) { setNcForm(function(p){ return Object.assign({}, p, { tipo: v }); }); }, options: ["Mayor","Menor","Observacion"] }),
            React.createElement(SelectField, { label: "Proceso", value: ncForm.proceso, onChange: function(v) { setNcForm(function(p){ return Object.assign({}, p, { proceso: v }); }); }, options: procesoData.map(function(p) { return p.name; }) }),
            React.createElement(InputField, { label: "Responsable", value: ncForm.responsable, onChange: function(v) { setNcForm(function(p){ return Object.assign({}, p, { responsable: v }); }); }, placeholder: "Nombre" }),
            React.createElement(InputField, { label: "Plazo", value: ncForm.plazo, onChange: function(v) { setNcForm(function(p){ return Object.assign({}, p, { plazo: v }); }); }, type: "date" })
          ),
          React.createElement(InputField, { label: "Descripcion", value: ncForm.desc, onChange: function(v) { setNcForm(function(p){ return Object.assign({}, p, { desc: v }); }); }, placeholder: "Describir hallazgo..." }),
          React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 } },
            React.createElement(Btn, { onClick: function() { setShowNcForm(false); } }, "Cancelar"),
            React.createElement(Btn, { accent: true, onClick: function() { setShowNcForm(false); } }, React.createElement(Icons.Check), " Guardar")
          )
        ) : null,
        React.createElement(Card, { p: 0 }, React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
              ["Codigo","Tipo","Proceso","Descripcion","Estado","Responsable","Plazo","Avance"].map(function(h) {
                return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", whiteSpace: "nowrap" } }, h);
              })
            )),
            React.createElement("tbody", null, ncDB.map(function(nc) {
              return React.createElement("tr", { key: nc.id, style: { borderBottom: "1px solid " + C.bd + "50" }, onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; } },
                React.createElement("td", { style: { padding: "8px", fontWeight: 700, color: C.pr, whiteSpace: "nowrap" } }, nc.id),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: tipoC[nc.tipo] }, nc.tipo)),
                React.createElement("td", { style: { padding: "8px", color: C.tm } }, nc.proceso),
                React.createElement("td", { style: { padding: "8px", color: C.tx, maxWidth: 200 } }, nc.desc),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: estadoColor[nc.estado] }, nc.estado)),
                React.createElement("td", { style: { padding: "8px", color: C.tm, whiteSpace: "nowrap" } }, nc.responsable),
                React.createElement("td", { style: { padding: "8px", color: C.tm, whiteSpace: "nowrap" } }, nc.plazo),
                React.createElement("td", { style: { padding: "8px", minWidth: 80 } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(ProgressBar, { value: nc.avance }), React.createElement("span", { style: { fontSize: 9, fontWeight: 600, color: nc.avance === 100 ? C.ac : C.tm } }, nc.avance + "%")))
              );
            }))
          )
        ))
      );
    }

    function SatisfaccionView() {
      var dims = satDB;
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } },
            React.createElement(KPICard, { icon: React.createElement(Icons.Star), label: "Score General", value: "4.7/5.0", glow: C.i9 }),
            React.createElement(KPICard, { icon: React.createElement(Icons.Trend), label: "NPS", value: "+80", sub: "Promotores: 85%", glow: C.ac }),
            React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Reclamos Mes", value: "2", sub: "\u2193 83% vs Ene", subColor: C.ac, glow: C.wn }),
            React.createElement(KPICard, { icon: React.createElement(Icons.Users), label: "Encuestados", value: "48", sub: "Tasa: 78%", glow: C.pr })
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn("sat", "Analiza este documento de satisfaccion del cliente y extrae datos en JSON array. Cada registro: dim (dimension evaluada), score (puntaje 0-5). Solo JSON.", "Importar"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Dimension","Score","Sobre 5"], dims.map(function(d) { return [d.dim, d.score, "5.0"]; }), "Satisfaccion_Cliente", "Satisfaccion del Cliente"); } })
          ),
          rImpLoading("sat", "Analizando encuestas con IA..."),
          (function() { var _ss = gImpState("sat"); if (_ss.show && _ss.data.length > 0) { return rImpPreview("sat", ["Dimension","Score"], ["dim","score"], ["text","number"], { _confirm: function() { gConfirmImp("sat", setSatDB, function(i) { return "SAT-" + (dims.length+i+1); }, {score:3.0}); } }, C.i9); } return null; })()
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Por Dimension"),
            dims.map(function(e) {
              return React.createElement("div", { key: e.dim, style: { marginBottom: 8 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 3 } }, React.createElement("span", null, e.dim), React.createElement("span", { style: { fontWeight: 700, color: e.score >= 4.5 ? C.ac : C.wn } }, e.score + "/5")),
                React.createElement(ProgressBar, { value: e.score * 20, color: C.i9 })
              );
            })
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Evolucion Anual"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 220 },
              React.createElement(AreaChart, { data: satisfTrend },
                React.createElement("defs", null, React.createElement("linearGradient", { id: "gsat", x1: 0, y1: 0, x2: 0, y2: 1 }, React.createElement("stop", { offset: "5%", stopColor: C.i9, stopOpacity: 0.3 }), React.createElement("stop", { offset: "95%", stopColor: C.i9, stopOpacity: 0 }))),
                React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
                React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 9 }),
                React.createElement(YAxis, { stroke: C.td, fontSize: 9, domain: [3.5, 5] }),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
                React.createElement(Area, { type: "monotone", dataKey: "enc", stroke: C.i9, fill: "url(#gsat)", strokeWidth: 2.5, name: "Score" })
              )
            )
          )
        )
      );
    }

    function IndicadoresView() {
      var rows = indDB;
      return React.createElement(Card, { style: { padding: 16 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Tablero de Indicadores ISO 9001 | \u270F\uFE0F Editar en linea"),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn("ind", "Analiza este documento de indicadores ISO 9001 y extrae datos en JSON array. Cada registro: ind (indicador), cl (clausula), form (formula), meta, actual (resultado), tend (tendencia), ok (true/false). Solo JSON.", "Importar"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Indicador","Clausula","Formula","Meta","Actual","Tendencia","Cumple"], rows.map(function(r) { return [r.ind, r.cl, r.form, r.meta, r.actual, r.tend, r.ok ? "Si" : "No"]; }), "Indicadores_ISO9001", "Indicadores de Gestion Calidad"); } })
          )
        ),
        rImpLoading("ind", "Analizando indicadores con IA..."),
        (function() { var _is = gImpState("ind"); if (_is.show && _is.data.length > 0) { return rImpPreview("ind", ["Indicador","Clausula","Formula","Meta","Actual"], ["ind","cl","form","meta","actual"], ["text","text","text","text","text"], { _confirm: function() { gConfirmImp("ind", setIndDB, function(i) { return "IND-" + (rows.length+i+1); }, {tend:"\u2192",ok:true}); } }, C.i9); } return null; })(),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
              ["Indicador","Cl.","Formula","Meta","Actual","T","Estado",""].map(function(h) {
                return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h);
              })
            )),
            React.createElement("tbody", null, rows.map(function(r, i) {
              var isE = gIsEdit("ind", i);
              function _is(f,v) { setIndDB(function(pp) { var nn = pp.slice(); nn[i] = Object.assign({}, nn[i]); nn[i][f] = v; return nn; }); }
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i9 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.ind,"text",function(v){_is("ind",v);},null,120)) : React.createElement("td", { style: { padding: "8px", fontWeight: 600, color: C.tx } }, r.ind),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.cl,"text",function(v){_is("cl",v);},null,50)) : React.createElement("td", { style: { padding: "8px", color: C.pr } }, r.cl),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.form,"text",function(v){_is("form",v);},null,100)) : React.createElement("td", { style: { padding: "8px", color: C.tm, fontSize: 9 } }, r.form),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.meta,"text",function(v){_is("meta",v);},null,60)) : React.createElement("td", { style: { padding: "8px", color: C.cy, fontWeight: 600 } }, r.meta),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.actual,"text",function(v){_is("actual",v);},null,60)) : React.createElement("td", { style: { padding: "8px", fontWeight: 700, color: r.ok ? C.ac : C.dn } }, r.actual),
                React.createElement("td", { style: { padding: "8px", fontSize: 14, color: r.tend === "\u2191" ? C.ac : r.tend === "\u2193" ? C.ac : C.wn } }, r.tend),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: r.ok ? "green" : "red" }, r.ok ? "En Meta" : "Bajo Meta")),
                React.createElement("td",{style:{padding:"6px"}}, React.createElement("button",{onClick:function(){gSetEdit("ind",i);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    function RevisionDirView() {
      var ec = { cumplido: "green", actualizado: "green", "en proceso": "yellow", pendiente: "red" };
      var cc = { cumplido: C.ac, actualizado: C.ac, "en proceso": C.wn, pendiente: C.dn };
      return React.createElement(Card, { style: { padding: 16 } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } },
          React.createElement("div", { style: { width: 36, height: 36, borderRadius: 10, background: C.g1, display: "flex", alignItems: "center", justifyContent: "center" } }, React.createElement(Icons.Clipboard)),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx } }, "Revision por la Direccion"),
            React.createElement("div", { style: { fontSize: 10, color: C.td } }, "Cl. 9.3 | Dic 2025")
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 16 } },
          React.createElement(Badge, { color: "green" }, "Cumplidos: " + revDirItems.filter(function(r) { return r.estado === "cumplido" || r.estado === "actualizado"; }).length),
          React.createElement(Badge, { color: "yellow" }, "En Proceso: " + revDirItems.filter(function(r) { return r.estado === "en proceso"; }).length),
          React.createElement(Badge, { color: "red" }, "Pendientes: " + revDirItems.filter(function(r) { return r.estado === "pendiente"; }).length)
        ),
        revDirItems.map(function(item, i) {
          return React.createElement("div", { key: i, style: { padding: "10px 14px", background: C.sa, borderRadius: 10, marginBottom: 6, borderLeft: "3px solid " + cc[item.estado] } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } },
              React.createElement("span", { style: { fontSize: 11, fontWeight: 600, color: C.tx } }, item.tema),
              React.createElement(Badge, { color: ec[item.estado] }, item.estado)
            ),
            React.createElement("div", { style: { fontSize: 10, color: C.tm } }, item.detalle)
          );
        })
      );
    }

    return React.createElement("div", null,
      React.createElement(TabBar, { tabs: tabs, active: qTab, onChange: setQTab }),
      qTab === "dashboard-q" ? React.createElement(QualityDashboard) : null,
      qTab === "procesos" ? ProcesosView() : null,
      qTab === "nc-ac" ? NCACView() : null,
      qTab === "satisfaccion" ? SatisfaccionView() : null,
      qTab === "indicadores-q" ? IndicadoresView() : null,
      qTab === "revision-dir" ? RevisionDirView() : null,
      qTab === "db-q" ? React.createElement(EditableDBView, {
        title: "Base de Datos ISO 9001 — Calidad",
        color: C.i9,
        columns: ["Indicador","Clausula","Meta","Actual","Tendencia"],
        rows: [
          {id:1,vals:["Satisfaccion del cliente","9.1.2",">=4.5","4.7","\u2191"]},
          {id:2,vals:["Conformidad del producto","8.6",">=95%","97.8%","\u2191"]},
          {id:3,vals:["Eficacia de procesos","4.4",">=85%","88.4%","\u2191"]},
          {id:4,vals:["Cierre de NC","10.2",">=90%","92%","\u2191"]},
          {id:5,vals:["Reclamos clientes","9.1.2","<=5","2","\u2193"]},
          {id:6,vals:["Desempeno proveedores","8.4",">=75%","81%","\u2192"]},
          {id:7,vals:["Cumplimiento capacitacion","7.2",">=90%","94%","\u2191"]},
          {id:8,vals:["Costo no calidad","10.1","<=S/60K","S/51K","\u2193"]},
          {id:9,vals:["Auditorias completadas","9.2","100%","83%","\u2192"]},
          {id:10,vals:["Acciones de mejora","10.3",">=80%","72%","\u2191"]},
        ]
      }) : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ISO 14001:2015 v02 — SISTEMA DE GESTION AMBIENTAL
  // ═══════════════════════════════════════════════════════════════════════
  function ISO14001V2View() {
    var tabs = [
      { key: "dashboard-a", label: "Dashboard Ambiental", icon: Icons.Dash },
      { key: "aspectos", label: "Aspectos e Impactos", icon: Icons.Leaf },
      { key: "residuos", label: "Gestion Residuos", icon: Icons.RefreshCw },
      { key: "monitoreo", label: "Monitoreo", icon: Icons.Bar },
      { key: "db-a", label: "Base de Datos", icon: Icons.Database },
    ];
    var emTrend = [{mes:"Jul",co2:48,agua:340,energia:1200,residuos:14},{mes:"Ago",co2:45,agua:325,energia:1150,residuos:13},{mes:"Sep",co2:42,agua:310,energia:1100,residuos:12},{mes:"Oct",co2:40,agua:295,energia:1060,residuos:11},{mes:"Nov",co2:37,agua:280,energia:1020,residuos:10},{mes:"Dic",co2:34,agua:265,energia:980,residuos:9}];
    var aspectos = aspDB;
    var residuosData = resDB;
    var resColors = [C.tm, C.i9, C.wn, C.cy, C.pp, C.dn, C.td];

    function AmbDash() {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Leaf), label: "Huella Carbono", value: "34 tCO2e", sub: "\u2193 29%", subColor: C.ac, glow: C.i14 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Incidentes Amb.", value: "0", sub: "365 dias sin incidentes", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.RefreshCw), label: "Tasa Reciclaje", value: "72%", sub: "Meta: 70% \u2713", glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Bar), label: "Ahorro Energia", value: "18%", sub: "\u2193 220 kWh/mes", subColor: C.ac, glow: C.cy })
        ),
        React.createElement(Card, { style: { padding: 16, marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Indicadores Ambientales (Semestre)"),
          React.createElement(ResponsiveContainer, { width: "100%", height: 220 },
            React.createElement(ComposedChart, { data: emTrend },
              React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
              React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "l", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "r", orientation: "right", stroke: C.td, fontSize: 10 }),
              React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
              React.createElement(Bar, { yAxisId: "l", dataKey: "co2", fill: C.i14, radius: [3, 3, 0, 0], name: "CO2 (ton)" }),
              React.createElement(Bar, { yAxisId: "l", dataKey: "residuos", fill: C.wn, radius: [3, 3, 0, 0], name: "Residuos (ton)" }),
              React.createElement(Line, { yAxisId: "r", type: "monotone", dataKey: "agua", stroke: C.cy, strokeWidth: 2, dot: { fill: C.cy }, name: "Agua (m3)" }),
              React.createElement(Line, { yAxisId: "r", type: "monotone", dataKey: "energia", stroke: C.pp, strokeWidth: 2, dot: { fill: C.pp }, name: "Energia (kWh)" }),
              React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
            )
          )
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Composicion Residuos"),
            React.createElement(ResponsiveContainer, { width: "100%", height: 180 },
              React.createElement(PieChart, null,
                React.createElement(Pie, { data: residuosData, dataKey: "vol", nameKey: "tipo", cx: "50%", cy: "50%", innerRadius: 30, outerRadius: 60, paddingAngle: 2, strokeWidth: 0 }, residuosData.map(function(e, i) { return React.createElement(Cell, { key: i, fill: resColors[i] }); })),
                React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 }, formatter: function(v) { return v + " ton"; } }),
                React.createElement(Legend, { wrapperStyle: { fontSize: 8 } })
              )
            )
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Cumplimiento Ambiental"),
            [{l:"Monitoreo aire",v:95},{l:"Monitoreo agua",v:88},{l:"Monitoreo ruido",v:92},{l:"Gestion residuos",v:85},{l:"EIA actualizado",v:100},{l:"Permisos vigentes",v:90}].map(function(m) {
              return React.createElement("div", { key: m.l, style: { marginBottom: 6 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 2 } }, React.createElement("span", null, m.l), React.createElement("span", { style: { fontWeight: 700, color: m.v >= 90 ? C.ac : C.wn } }, m.v + "%")),
                React.createElement(ProgressBar, { value: m.v, color: C.i14 })
              );
            })
          )
        )
      );
    }

    function AspView() {
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } }, React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Matriz de Aspectos e Impactos"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Cl. 6.1.2 | \u270F\uFE0F Editar en linea")), React.createElement("div", { style: { display: "flex", gap: 6 } }, rImpBtn("asp", "Analiza este documento de aspectos ambientales y extrae datos en JSON array. Cada registro: asp (aspecto), imp (impacto), sig (significancia numero), tipo (Negativo/Positivo), ctrl (control), est (controlado/en mejora/en ejecucion). Solo JSON.", "Importar"), React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Aspecto","Impacto","Significancia","Tipo","Control","Estado"], aspectos.map(function(a) { return [a.asp, a.imp, a.sig, a.tipo, a.ctrl, a.est]; }), "Aspectos_Ambientales", "Aspectos e Impactos Ambientales"); } }))),
        rImpLoading("asp", "Analizando documento ambiental con IA..."),
        (function() { var _as = gImpState("asp"); if (_as.show && _as.data.length > 0) { return rImpPreview("asp", ["Aspecto","Impacto","Significancia","Tipo","Control","Estado"], ["asp","imp","sig","tipo","ctrl","est"], ["text","text","number","select","text","select"], { tipo: ["Negativo","Positivo"], est: ["controlado","en mejora","en ejecucion"], _confirm: function() { gConfirmImp("asp", setAspDB, function(i) { return "ASP-" + (aspectos.length+i+1); }, {sig:10,tipo:"Negativo",est:"en mejora"}); } }, C.i14); } return null; })(),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } }, ["Aspecto","Impacto","Sig.","Tipo","Control","Estado",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); }))),
            React.createElement("tbody", null, aspectos.map(function(a, i) {
              var isE = gIsEdit("asp", i);
              function _as(f,v) { setAspDB(function(pp) { var nn = pp.slice(); nn[i] = Object.assign({}, nn[i]); nn[i][f] = f === "sig" ? (parseInt(v)||0) : v; return nn; }); }
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i14 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.asp,"text",function(v){_as("asp",v);},null,120)) : React.createElement("td", { style: { padding: "8px", fontWeight: 600, color: C.tx } }, a.asp),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.imp,"text",function(v){_as("imp",v);},null,100)) : React.createElement("td", { style: { padding: "8px", color: C.tm } }, a.imp),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.sig,"number",function(v){_as("sig",v);},null,40)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: a.sig >= 18 ? "red" : a.sig >= 14 ? "yellow" : "green" }, a.sig)),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.tipo,"select",function(v){_as("tipo",v);},["Negativo","Positivo"],80)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: a.tipo === "Positivo" ? "green" : "yellow" }, a.tipo)),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.ctrl,"text",function(v){_as("ctrl",v);},null,140)) : React.createElement("td", { style: { padding: "8px", color: C.tm, fontSize: 9 } }, a.ctrl),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,a.est,"select",function(v){_as("est",v);},["controlado","en mejora","en ejecucion"],80)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: a.est === "controlado" ? "green" : "yellow" }, a.est)),
                React.createElement("td",{style:{padding:"6px"}}, React.createElement("button",{onClick:function(){gSetEdit("asp",i);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    function ResView() {
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } }, React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Gestion de Residuos de Construccion"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "DS 003-2013-VIVIENDA | \u270F\uFE0F Editar en linea")), React.createElement("div", { style: { display: "flex", gap: 6 } }, rImpBtn("res", "Analiza este documento de gestion de residuos y extrae datos en JSON array. Cada registro: tipo, vol (volumen en toneladas, numero), pct (porcentaje, numero), disp (disposicion final). Solo JSON.", "Importar"), React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Tipo","Volumen (ton)","%","Disposicion"], residuosData.map(function(r) { return [r.tipo, r.vol, r.pct, r.disp]; }), "Residuos_Construccion", "Gestion de Residuos"); } }))),
        rImpLoading("res", "Analizando documento de residuos con IA..."),
        (function() { var _rs = gImpState("res"); if (_rs.show && _rs.data.length > 0) { return rImpPreview("res", ["Tipo","Volumen","Porcentaje","Disposicion"], ["tipo","vol","pct","disp"], ["text","number","number","text"], { _confirm: function() { gConfirmImp("res", setResDB, function(i) { return "RES-" + (residuosData.length+i+1); }, {vol:0,pct:0}); } }, C.i14); } return null; })(),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } }, ["Tipo","Vol.(ton)","%","Disposicion","Estado",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); }))),
            React.createElement("tbody", null, residuosData.map(function(r, i) {
              var isE = gIsEdit("res", i);
              function _rs(f,v) { setResDB(function(pp) { var nn = pp.slice(); nn[i] = Object.assign({}, nn[i]); nn[i][f] = (f==="vol"||f==="pct") ? (parseFloat(v)||0) : v; return nn; }); }
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i14 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.tipo,"text",function(v){_rs("tipo",v);},null,90)) : React.createElement("td", { style: { padding: "10px", fontWeight: 600, color: C.tx } }, r.tipo),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.vol,"number",function(v){_rs("vol",v);},null,60)) : React.createElement("td", { style: { padding: "10px", color: C.pr, fontWeight: 700 } }, r.vol),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.pct,"number",function(v){_rs("pct",v);},null,50)) : React.createElement("td", { style: { padding: "10px" } }, React.createElement(ProgressBar, { value: r.pct, color: resColors[i] || C.tm })),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,r.disp,"text",function(v){_rs("disp",v);},null,120)) : React.createElement("td", { style: { padding: "10px", color: C.tm } }, r.disp),
                React.createElement("td", { style: { padding: "10px" } }, React.createElement(Badge, { color: r.tipo === "Peligrosos" ? "red" : "green" }, r.tipo === "Peligrosos" ? "Especial" : "Regular")),
                React.createElement("td",{style:{padding:"6px"}}, React.createElement("button",{onClick:function(){gSetEdit("res",i);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    function MonView() {
      var params = monDB;
      var mk = "mon";
      var monPrompt = "Analiza este documento de monitoreo ambiental y extrae datos en JSON array. Cada registro: p (parametro), lmp (limite maximo permisible), r (resultado), ok (true/false cumple), f (frecuencia). Solo JSON.";
      function confirmMon() { gConfirmImp(mk, setMonDB, function(i) { return "MON-" + (params.length+i+1); }, {ok:true,f:"Mensual"}); }
      var impSt = gImpState(mk);
      if (impSt.show && impSt.data.length > 0) {
        return rImpPreview(mk, ["Parametro","LMP","Resultado","Frecuencia"], ["p","lmp","r","f"], ["text","text","text","select"], { f: ["Mensual","Quincenal","Trimestral","Semestral","Anual"], _confirm: confirmMon }, C.i14);
      }
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } },
          React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Programa de Monitoreo Ambiental"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "\u270F\uFE0F Editar en linea")),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn(mk, monPrompt, "Importar"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Parametro","LMP","Resultado","Cumple","Frecuencia"], params.map(function(m) { return [m.p, m.lmp, m.r, m.ok ? "Si" : "No", m.f]; }), "Monitoreo_Ambiental", "Monitoreo Ambiental"); } })
          )
        ),
        rImpLoading(mk, "Analizando documento de monitoreo con IA..."),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } }, ["Parametro","LMP","Resultado","Cumple","Frecuencia",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); }))),
            React.createElement("tbody", null, params.map(function(m, i) {
              var isE = gIsEdit(mk, i);
              function _ms(f,v) { setMonDB(function(pp) { var nn = pp.slice(); nn[i] = Object.assign({}, nn[i]); nn[i][f] = v; return nn; }); }
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i14 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,m.p,"text",function(v){_ms("p",v);},null,100)) : React.createElement("td", { style: { padding: "8px", color: C.tx, fontWeight: 500 } }, m.p),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,m.lmp,"text",function(v){_ms("lmp",v);},null,80)) : React.createElement("td", { style: { padding: "8px", color: C.cy } }, m.lmp),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,m.r,"text",function(v){_ms("r",v);},null,80)) : React.createElement("td", { style: { padding: "8px", color: m.ok ? C.ac : C.dn, fontWeight: 700 } }, m.r),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: m.ok ? "green" : "red" }, m.ok ? "Cumple" : "Excede")),
                isE ? React.createElement("td",{style:{padding:"4px"}},rEC(true,m.f,"select",function(v){_ms("f",v);},["Mensual","Quincenal","Trimestral","Semestral","Anual"],90)) : React.createElement("td", { style: { padding: "8px", color: C.tm } }, m.f),
                React.createElement("td",{style:{padding:"6px"}}, React.createElement("button",{onClick:function(){gSetEdit(mk,i);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    return React.createElement("div", null,
      React.createElement(TabBar, { tabs: tabs, active: aTab, onChange: setATab }),
      aTab === "dashboard-a" ? AmbDash() : null,
      aTab === "aspectos" ? AspView() : null,
      aTab === "residuos" ? ResView() : null,
      aTab === "monitoreo" ? MonView() : null,
      aTab === "db-a" ? React.createElement(EditableDBView, {
        title: "Base de Datos ISO 14001 — Ambiental",
        color: C.i14,
        columns: ["Parametro","LMP","Resultado","Frecuencia","Cumple"],
        rows: [
          {id:1,vals:["PM10","150 ug/m3","85 ug/m3","Mensual","Si"]},
          {id:2,vals:["PM2.5","50 ug/m3","28 ug/m3","Mensual","Si"]},
          {id:3,vals:["Ruido Diurno","80 dB","72 dB","Quincenal","Si"]},
          {id:4,vals:["Ruido Nocturno","70 dB","58 dB","Quincenal","Si"]},
          {id:5,vals:["DBO5 efluentes","100 mg/L","45 mg/L","Trimestral","Si"]},
          {id:6,vals:["pH efluentes","6.5-8.5","7.2","Trimestral","Si"]},
          {id:7,vals:["CO2 mensual","50 ton","34 ton","Mensual","Si"]},
          {id:8,vals:["Tasa reciclaje","70%","72%","Mensual","Si"]},
          {id:9,vals:["Consumo agua","350 m3","265 m3","Mensual","Si"]},
          {id:10,vals:["Consumo energia","1300 kWh","980 kWh","Mensual","Si"]},
        ]
      }) : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ISO 45001:2018 v02 — SISTEMA DE GESTION SST
  // ═══════════════════════════════════════════════════════════════════════
  function ISO45001V2View() {
    var tabs = [
      { key: "dashboard-s", label: "Dashboard SST", icon: Icons.Dash },
      { key: "iperc", label: "IPERC", icon: Icons.Alert },
      { key: "nc-sst", label: "NC / Acciones", icon: Icons.Clipboard },
      { key: "incidentes", label: "Incidentes / Accidentes", icon: Icons.Zap },
      { key: "inspecciones", label: "Inspecciones", icon: Icons.Clipboard },
      { key: "capacitaciones", label: "Capacitaciones", icon: Icons.Users },
      { key: "db-s", label: "Base de Datos", icon: Icons.Database },
    ];
    var sstTrend = [{mes:"Jul",IF:2.1,IS:48,IA:0.05},{mes:"Ago",IF:1.8,IS:40,IA:0.04},{mes:"Sep",IF:1.5,IS:32,IA:0.03},{mes:"Oct",IF:1.2,IS:25,IA:0.02},{mes:"Nov",IF:0.9,IS:18,IA:0.01},{mes:"Dic",IF:0.7,IS:12,IA:0.00}];
    var ipercData = ipercDB;
    var caps = capsDB;
    var inspDB = inspDBSt;

    function SSTDash() {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Shield), label: "Ind. Frecuencia", value: "0.70", sub: "Meta <1.0 \u2713", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Accid. Incapac.", value: "0", sub: "127 dias sin accidentes", glow: C.i45 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Users), label: "Personal Capac.", value: "98%", sub: "412/420", glow: C.pr }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Clipboard), label: "Inspecciones", value: "45", sub: "12 hallazgos abiertos", subColor: C.wn, glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Eye), label: "PETAR Emitidos", value: "189", sub: "Dic 2025", glow: C.cy })
        ),
        React.createElement(Card, { style: { padding: 16, marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Indices de Siniestralidad"),
          React.createElement(ResponsiveContainer, { width: "100%", height: 200 },
            React.createElement(ComposedChart, { data: sstTrend },
              React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
              React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "l", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { yAxisId: "r", orientation: "right", stroke: C.td, fontSize: 10 }),
              React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
              React.createElement(Line, { yAxisId: "l", type: "monotone", dataKey: "IF", stroke: C.i45, strokeWidth: 2.5, dot: { fill: C.i45, r: 4 }, name: "Ind. Frecuencia" }),
              React.createElement(Line, { yAxisId: "r", type: "monotone", dataKey: "IS", stroke: C.dn, strokeWidth: 2, dot: { fill: C.dn, r: 3 }, name: "Ind. Severidad" }),
              React.createElement(Bar, { yAxisId: "l", dataKey: "IA", fill: C.wn, radius: [3, 3, 0, 0], name: "Ind. Accidentab." }),
              React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
            )
          )
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } },
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Piramide de Accidentabilidad"),
            [{l:"Fatalidad",v:0,c:C.dn,w:"20%"},{l:"Accid. Incapacitante",v:0,c:C.dn+"cc",w:"35%"},{l:"Accidente Leve",v:2,c:C.wn,w:"50%"},{l:"Incidentes Peligrosos",v:5,c:C.wn+"88",w:"65%"},{l:"Cuasi Accidentes",v:18,c:C.i45,w:"80%"},{l:"Actos/Cond. Subestandar",v:45,c:C.pr,w:"100%"}].map(function(p, i) {
              return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 6 } },
                React.createElement("div", { style: { width: p.w, height: 22, background: p.c, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 } }, React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#fff" } }, p.v)),
                React.createElement("span", { style: { fontSize: 9, color: C.tm, whiteSpace: "nowrap" } }, p.l)
              );
            })
          ),
          React.createElement(Card, { style: { padding: 16 } },
            React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Cumplimiento SST por Area"),
            [{a:"Obras civiles",v:92},{a:"Estructuras metalicas",v:88},{a:"Inst. electricas",v:90},{a:"Acabados",v:85},{a:"Almacen",v:87},{a:"Equipos pesados",v:94}].map(function(x) {
              return React.createElement("div", { key: x.a, style: { marginBottom: 6 } },
                React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 10, color: C.tm, marginBottom: 2 } }, React.createElement("span", null, x.a), React.createElement("span", { style: { fontWeight: 700, color: x.v >= 90 ? C.ac : C.wn } }, x.v + "%")),
                React.createElement(ProgressBar, { value: x.v, color: C.i45 })
              );
            })
          )
        )
      );
    }

    function IPERCView() {
      var areas45=["Obras civiles","Estructura","Inst. electricas","Acabados","Almacen","Equipos pesados","General"];
      var niveles=["Intolerable","Importante","Moderado","Tolerable"];
      var impK = "iperc";
      var impPrompt = "Analiza este documento IPERC y extrae los datos en JSON array. Cada registro: act (actividad), pel (peligro), prob (probabilidad 1-5), sev (severidad 1-5), nrp (prob*sev), niv (Intolerable/Importante/Moderado/Tolerable), ctrl (medida de control). Solo JSON.";
      function confirmIperc() { gConfirmImp(impK, setIpercDB, function(i) { return "IPERC-" + String(ipercData.length + i + 1).padStart(3, "0"); }, {prob:1,sev:1,nrp:1,niv:"Moderado"}); }
      // Import preview
      var impSt = gImpState(impK);
      if (impSt.show && impSt.data.length > 0) {
        var _cp = { _confirm: confirmIperc };
        return rImpPreview(impK, ["Actividad","Peligro","Prob","Sev","NRP","Nivel","Control"], ["act","pel","prob","sev","nrp","niv","ctrl"], ["text","text","number","number","number","select","text"], Object.assign({ niv: niveles }, _cp), C.i45);
      }
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } },
          React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Matriz IPERC"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Ley 29783 | G.050 | NRP = P x S | \u270F\uFE0F Editar en linea")),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn(impK, impPrompt, "Importar IPERC"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Actividad","Peligro","Probabilidad","Severidad","NRP","Nivel","Control"], ipercData.map(function(r) { return [r.act, r.pel, r.prob, r.sev, r.nrp, r.niv, r.ctrl]; }), "IPERC_SIG360", "Matriz IPERC"); } })
          )
        ),
        rImpLoading(impK, "Analizando documento IPERC con IA..."),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
              ["Actividad","Peligro","P","S","NRP","Nivel","Control",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
            )),
            React.createElement("tbody", null, ipercData.map(function(a, i) {
              var isE = gIsEdit(impK, i);
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i45 + "08" : "transparent" }, onMouseEnter: function(e) { if (!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if (!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.act, "text", function(v) { gSaveRow(setIpercDB, i, "act", v, []); }, null, 120)) : React.createElement("td", { style: { padding: "8px", fontWeight: 600, color: C.tx } }, a.act),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.pel, "text", function(v) { gSaveRow(setIpercDB, i, "pel", v, []); }, null, 120)) : React.createElement("td", { style: { padding: "8px", color: C.tm } }, a.pel),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.prob, "number", function(v) { setIpercDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { prob: parseInt(v)||1, nrp: (parseInt(v)||1) * n[i].sev }); return n; }); }, null, 40)) : React.createElement("td", { style: { padding: "8px", color: C.pr, fontWeight: 700 } }, a.prob),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.sev, "number", function(v) { setIpercDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { sev: parseInt(v)||1, nrp: n[i].prob * (parseInt(v)||1) }); return n; }); }, null, 40)) : React.createElement("td", { style: { padding: "8px", color: C.pr, fontWeight: 700 } }, a.sev),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: a.nrp >= 12 ? "red" : a.nrp >= 8 ? "yellow" : "green" }, a.nrp)),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.niv, "select", function(v) { gSaveRow(setIpercDB, i, "niv", v, []); }, niveles, 90)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: a.niv === "Intolerable" ? "red" : a.niv === "Importante" ? "yellow" : "green" }, a.niv)),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, a.ctrl, "text", function(v) { gSaveRow(setIpercDB, i, "ctrl", v, []); }, null, 150)) : React.createElement("td", { style: { padding: "8px", color: C.tm, fontSize: 9 } }, a.ctrl),
                React.createElement("td", { style: { padding: "6px" } }, React.createElement("button", { onClick: function() { gSetEdit(impK, i); }, title: isE ? "Guardar" : "Editar", style: { background: isE ? C.ac + "20" : C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: isE ? C.ac : C.pr, fontSize: 11 } }, isE ? "\u2713" : "\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    function InspView() {
      var areas=["Obras civiles","Estructura","Inst. electricas","Acabados","Almacen","Equipos pesados","Fachada","Perimetro","General"];
      var tiposInsp=["EPP","Orden/Limpieza","Herramientas","Protecciones","Senalizacion","Andamios","Excavaciones","Electrica","General"];

      function inspImportFile(files) {
        if (!files || !files.length) return;
        setInspImporting(true);
        var pending = files.length; var results = [];
        Array.from(files).forEach(function(file) {
          var reader = new FileReader();
          reader.onload = function(ev) {
            var text = ev.target.result.substring(0, 8000);
            fetch("https://api.anthropic.com/v1/messages", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{
                role: "user", content: "Analiza este documento de inspecciones SST y extrae los datos en JSON array. Cada inspeccion debe tener: tipo (EPP/Orden-Limpieza/Herramientas/Protecciones/Senalizacion/Andamios/Excavaciones/Electrica/General), area, fecha (YYYY-MM-DD), hall (numero de hallazgos), crit (numero de hallazgos criticos), insp (nombre del inspector), est (abierta/cerrada), obs (observaciones). Responde SOLO el JSON array.\n\nDocumento:\n" + text
              }] })
            }).then(function(r) { return r.json(); }).then(function(data) {
              try { var t = data.content[0].text.replace(/```json|```/g, "").trim(); var parsed = JSON.parse(t); results = results.concat(Array.isArray(parsed) ? parsed : [parsed]); } catch(e) {}
              pending--; if (pending === 0) { setInspImportData(results); setInspImporting(false); setShowInspImport(true); }
            }).catch(function() { pending--; if (pending === 0) { setInspImportData(results); setInspImporting(false); setShowInspImport(true); } });
          };
          reader.readAsText(file);
        });
      }

      function inspConfirmImport() {
        var items = inspImportData.map(function(d, i) {
          return { id: "INS-" + String(inspDB.length + 100 + i + 1), tipo: d.tipo || "General", area: d.area || "General", fecha: d.fecha || new Date().toISOString().slice(0,10), hall: d.hall || 0, crit: d.crit || 0, insp: d.insp || "Por asignar", est: d.est || "abierta", obs: d.obs || "" };
        });
        setInspDBSt(function(p) { return p.concat(items); });
        setInspImportData([]); setShowInspImport(false);
      }

      function inspSave() {
        if (!inspForm.tipo) return;
        var ni = { id: "INS-" + String(inspDB.length + 100 + 1), tipo: inspForm.tipo, area: inspForm.area || "General", fecha: inspForm.fecha || new Date().toISOString().slice(0,10), hall: parseInt(inspForm.hall) || 0, crit: parseInt(inspForm.crit) || 0, insp: inspForm.insp || "Por asignar", est: "abierta", obs: inspForm.obs || "" };
        setInspDBSt(function(p) { return p.concat([ni]); });
        setInspForm({tipo:"EPP",area:"",fecha:"",insp:"",hall:0,crit:0,obs:""});
        setShowInspForm(false);
      }

      function inspSaveEdit(id, field, value) {
        setInspDBSt(function(p) { return p.map(function(r) {
          if (r.id === id) { var u = Object.assign({}, r); u[field] = (field === "hall" || field === "crit") ? (parseInt(value) || 0) : value; return u; }
          return r;
        }); });
      }

      // ── Import preview ──
      if (showInspImport && inspImportData.length > 0) {
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setShowInspImport(false); setInspImportData([]); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + C.i45 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Importacion IA — " + inspImportData.length + " Inspecciones detectadas"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "Revisa y edita los campos antes de confirmar."),
            React.createElement("div", { style: { overflowX: "auto" } },
              React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
                React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "2px solid " + C.bd } },
                  ["Tipo","Area","Fecha","Hallazgos","Criticos","Inspector","Observaciones",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "8px 4px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
                )),
                React.createElement("tbody", null, inspImportData.map(function(d, i) {
                  return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50" } },
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("select", { value: d.tipo || "General", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 90 }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { tipo: v }); return n; }); } }, tiposInsp.map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.area || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { area: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "date", value: d.fecha || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 110 }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { fecha: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "number", min: 0, value: d.hall || 0, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 40, textAlign: "center" }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { hall: parseInt(v) || 0 }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "number", min: 0, value: d.crit || 0, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 40, textAlign: "center" }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { crit: parseInt(v) || 0 }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.insp || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { insp: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.obs || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: "100%" }, onChange: function(e) { var v = e.target.value; var idx = i; setInspImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { obs: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("button", { onClick: function() { var idx = i; setInspImportData(function(p) { return p.filter(function(_, j) { return j !== idx; }); }); }, style: { background: C.dn + "20", border: "none", borderRadius: 4, padding: "4px 6px", cursor: "pointer", color: C.dn, fontSize: 10 } }, "\u2716"))
                  );
                }))
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
              React.createElement(Btn, { onClick: function() { setShowInspImport(false); setInspImportData([]); } }, "Cancelar"),
              React.createElement(Btn, { accent: true, onClick: inspConfirmImport }, React.createElement(Icons.Check), " Confirmar " + inspImportData.length + " Inspecciones")
            )
          )
        );
      }

      // ── Registration form ──
      if (showInspForm) {
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setShowInspForm(false); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + C.i45 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Nueva Inspeccion SST"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "G.050 | DS 011-2019-TR"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
              React.createElement(SelectField, { label: "Tipo de Inspeccion", value: inspForm.tipo, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { tipo: v }); }); }, options: tiposInsp.map(function(t) { return {value:t,label:t}; }) }),
              React.createElement(SelectField, { label: "Area", value: inspForm.area, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { area: v }); }); }, options: areas.map(function(a) { return {value:a,label:a}; }) }),
              React.createElement(InputField, { label: "Fecha", value: inspForm.fecha, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { fecha: v }); }); }, type: "date" }),
              React.createElement(InputField, { label: "Inspector", value: inspForm.insp, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { insp: v }); }); }, placeholder: "Nombre del inspector" }),
              React.createElement(InputField, { label: "Hallazgos", value: inspForm.hall, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { hall: v }); }); }, type: "number" }),
              React.createElement(InputField, { label: "Criticos", value: inspForm.crit, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { crit: v }); }); }, type: "number" })
            ),
            React.createElement(InputField, { label: "Observaciones", value: inspForm.obs, onChange: function(v) { setInspForm(function(p) { return Object.assign({}, p, { obs: v }); }); }, placeholder: "Describir hallazgos principales..." }),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 } },
              React.createElement(Btn, { onClick: function() { setShowInspForm(false); } }, "Cancelar"),
              React.createElement(Btn, { accent: true, onClick: inspSave }, React.createElement(Icons.Check), " Registrar Inspeccion")
            )
          )
        );
      }

      // ── Main table ──
      var abiertas = inspDB.filter(function(i){return i.est==="abierta";}).length;
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } },
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement(Badge, { color: "yellow" }, "Abiertas: " + abiertas),
            React.createElement(Badge, { color: "green" }, "Cerradas: " + (inspDB.length - abiertas))
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement("label", { style: { cursor: "pointer", display: "inline-flex" } },
              React.createElement("input", { type: "file", accept: ".pdf,.doc,.docx,.txt,.csv", multiple: true, style: { display: "none" }, onChange: function(e) { inspImportFile(e.target.files); e.target.value = ""; } }),
              React.createElement("span", { style: { padding: "8px 16px", borderRadius: 8, border: "1px solid " + C.bd, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, background: C.sa, color: C.tm, cursor: "pointer" } }, React.createElement(Icons.Upload), " Importar")
            ),
            React.createElement(Btn, { primary: true, onClick: function() { setShowInspForm(true); } }, React.createElement(Icons.Plus), " Nueva Inspeccion"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Codigo","Tipo","Area","Fecha","Hallazgos","Criticos","Inspector","Estado","Observaciones"], inspDB.map(function(r) { return [r.id, r.tipo, r.area, r.fecha, r.hall, r.crit, r.insp, r.est, r.obs || ""]; }), "Inspecciones_SST", "Inspecciones SST"); } })
          )
        ),
        inspImporting ? React.createElement(Card, { style: { padding: 16, marginBottom: 12, textAlign: "center" } },
          React.createElement("div", { className: "typing" }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)),
          React.createElement("div", { style: { fontSize: 10, color: C.tm, marginTop: 8 } }, "Analizando documento con IA para extraer inspecciones...")
        ) : null,
        React.createElement(Card, { p: 0 },
          React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Inspecciones SST"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "G.050 | DS 011-2019-TR | \u270F\uFE0F Editar en linea")
          ),
          React.createElement("div", { style: { overflowX: "auto" } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
              React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
                ["Codigo","Tipo","Area","Fecha","Hall.","Crit.","Inspector","Estado","Obs.",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", whiteSpace: "nowrap" } }, h); })
              )),
              React.createElement("tbody", null, inspDB.map(function(ins) {
                var isE = inspEditId === ins.id;
                return React.createElement("tr", { key: ins.id, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i45 + "08" : "transparent" },
                  onMouseEnter: function(e) { if (!isE) e.currentTarget.style.background = C.cardH; },
                  onMouseLeave: function(e) { if (!isE) e.currentTarget.style.background = "transparent"; }
                },
                  React.createElement("td", { style: { padding: "6px", fontWeight: 700, color: C.pr, whiteSpace: "nowrap", fontSize: 9 } }, ins.id),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("select", { value: ins.tipo, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 90 }, onChange: function(e) { inspSaveEdit(ins.id, "tipo", e.target.value); } }, tiposInsp.map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))) : React.createElement("td", { style: { padding: "6px", color: C.tx } }, ins.tipo),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("select", { value: ins.area, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 90 }, onChange: function(e) { inspSaveEdit(ins.id, "area", e.target.value); } }, areas.map(function(a) { return React.createElement("option", { key: a, value: a }, a); }))) : React.createElement("td", { style: { padding: "6px", color: C.tm } }, ins.area),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "date", value: ins.fecha, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 110 }, onChange: function(e) { inspSaveEdit(ins.id, "fecha", e.target.value); } })) : React.createElement("td", { style: { padding: "6px", color: C.tm } }, ins.fecha),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "number", min: 0, value: ins.hall, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 40, textAlign: "center" }, onChange: function(e) { inspSaveEdit(ins.id, "hall", e.target.value); } })) : React.createElement("td", { style: { padding: "6px", fontWeight: 700, color: C.wn } }, ins.hall),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "number", min: 0, value: ins.crit, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 40, textAlign: "center" }, onChange: function(e) { inspSaveEdit(ins.id, "crit", e.target.value); } })) : React.createElement("td", { style: { padding: "6px" } }, ins.crit > 0 ? React.createElement(Badge, { color: "red" }, ins.crit) : React.createElement(Badge, { color: "green" }, "0")),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: ins.insp, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 80 }, onChange: function(e) { inspSaveEdit(ins.id, "insp", e.target.value); } })) : React.createElement("td", { style: { padding: "6px", color: C.tm } }, ins.insp),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("select", { value: ins.est, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 70 }, onChange: function(e) { inspSaveEdit(ins.id, "est", e.target.value); } }, ["abierta","cerrada"].map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))) : React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: ins.est === "cerrada" ? "green" : "yellow" }, ins.est)),
                  isE ? React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: ins.obs || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: "100%", minWidth: 120 }, onChange: function(e) { inspSaveEdit(ins.id, "obs", e.target.value); } })) : React.createElement("td", { style: { padding: "6px", color: C.tm, fontSize: 9, maxWidth: 150 } }, ins.obs || ""),
                  React.createElement("td", { style: { padding: "6px" } }, React.createElement("button", { onClick: function() { setInspEditId(isE ? null : ins.id); }, title: isE ? "Guardar" : "Editar", style: { background: isE ? C.ac + "20" : C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: isE ? C.ac : C.pr, fontSize: 11 } }, isE ? "\u2713" : "\u270F\uFE0F"))
                );
              }))
            )
          )
        ),
        React.createElement("div", { style: { padding: "10px 0", fontSize: 9, color: C.td } }, "G.050 | DS 011-2019-TR | Inspecciones planeadas y no planeadas de SST")
      );
    }

    function CapView() {
      var tiposCap = ["Obligatoria","Especifica","Complementaria"];
      var freqs = ["Al ingreso","Mensual","Trimestral","Semestral","Anual"];
      var ck = "caps";
      var capPrompt = "Analiza este documento de capacitaciones SST y extrae los datos en JSON array. Cada registro: tema, tipo (Obligatoria/Especifica/Complementaria), h (horas, numero), a (asistencia %, numero), f (frecuencia). Solo JSON.";
      function confirmCaps() { gConfirmImp(ck, setCapsDB, function(i) { return "CAP-" + String(caps.length + i + 1).padStart(3,"0"); }, {tipo:"Especifica",h:2,a:0,f:"Trimestral"}); }
      var impSt = gImpState(ck);
      if (impSt.show && impSt.data.length > 0) {
        return rImpPreview(ck, ["Tema","Tipo","Horas","Asistencia %","Frecuencia"], ["tema","tipo","h","a","f"], ["text","select","number","number","select"], { tipo: tiposCap, f: freqs, _confirm: confirmCaps }, C.i45);
      }
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 } },
          React.createElement("div", null, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Plan Capacitacion SST"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Ley 29783 Art.35 | \u270F\uFE0F Editar en linea")),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            rImpBtn(ck, capPrompt, "Importar"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Tema","Tipo","Horas","Asistencia %","Frecuencia"], caps.map(function(c) { return [c.tema, c.tipo, c.h, c.a, c.f]; }), "Capacitaciones_SST", "Plan Capacitacion SST"); } })
          )
        ),
        rImpLoading(ck, "Analizando documento de capacitaciones con IA..."),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } }, ["Tema","Tipo","Horas","Asistencia","Frecuencia",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); }))),
            React.createElement("tbody", null, caps.map(function(c, i) {
              var isE = gIsEdit(ck, i);
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50", background: isE ? C.i45 + "08" : "transparent" }, onMouseEnter: function(e) { if(!isE) e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { if(!isE) e.currentTarget.style.background = "transparent"; } },
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, c.tema, "text", function(v) { setCapsDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { tema: v }); return n; }); }, null, 160)) : React.createElement("td", { style: { padding: "8px", fontWeight: 600, color: C.tx } }, c.tema),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, c.tipo, "select", function(v) { setCapsDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { tipo: v }); return n; }); }, tiposCap, 90)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: c.tipo === "Obligatoria" ? "yellow" : "cyan" }, c.tipo)),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, c.h, "number", function(v) { setCapsDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { h: parseInt(v)||0 }); return n; }); }, null, 40)) : React.createElement("td", { style: { padding: "8px", color: C.pr, fontWeight: 700 } }, c.h + "h"),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, c.a, "number", function(v) { setCapsDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { a: parseInt(v)||0 }); return n; }); }, null, 50)) : React.createElement("td", { style: { padding: "8px" } }, React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } }, React.createElement(ProgressBar, { value: c.a, color: C.i45 }), React.createElement("span", { style: { fontSize: 9, fontWeight: 600, color: c.a >= 95 ? C.ac : C.wn } }, c.a + "%"))),
                isE ? React.createElement("td", { style: { padding: "4px" } }, rEC(true, c.f, "select", function(v) { setCapsDB(function(p) { var n = p.slice(); n[i] = Object.assign({}, n[i], { f: v }); return n; }); }, freqs, 90)) : React.createElement("td", { style: { padding: "8px", color: C.tm } }, c.f),
                React.createElement("td", { style: { padding: "6px" } }, React.createElement("button", { onClick: function() { gSetEdit(ck, i); }, title: isE ? "Guardar" : "Editar", style: { background: isE ? C.ac + "20" : C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: isE ? C.ac : C.pr, fontSize: 11 } }, isE ? "\u2713" : "\u270F\uFE0F"))
              );
            }))
          )
        )
      );
    }

    function NCSSTView() {
      var estC={abierta:"red","en proceso":"yellow",cerrada:"green"};
      var tipC={Mayor:"red",Menor:"yellow",Observacion:"blue"};
      var areas=["Obras civiles","Estructura","Inst. electricas","Acabados","Almacen","Equipos pesados","Administracion","General"];

      // ── AI import from file ──
      function ncSSTImportFile(files) {
        if (!files || !files.length) return;
        setNcSSTImporting(true);
        var pending = files.length; var results = [];
        Array.from(files).forEach(function(file) {
          var reader = new FileReader();
          reader.onload = function(ev) {
            var text = ev.target.result.substring(0, 8000);
            fetch("https://api.anthropic.com/v1/messages", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{
                role: "user", content: "Analiza este documento de No Conformidad SST y extrae los datos en JSON array. Cada NC debe tener: tipo (Mayor/Menor/Observacion), area, desc (descripcion completa del hallazgo), resp (responsable), plazo (YYYY-MM-DD), acc (accion correctiva propuesta), norma (clausula ISO 45001 o norma peruana aplicable), avance (0-100 estimado). Si el documento tiene multiples hallazgos, genera un registro por cada uno. Responde SOLO el JSON array, sin markdown.\n\nDocumento:\n" + text
              }] })
            }).then(function(r) { return r.json(); }).then(function(data) {
              try {
                var t = data.content[0].text.replace(/```json|```/g, "").trim();
                var parsed = JSON.parse(t);
                if (Array.isArray(parsed)) results = results.concat(parsed);
                else results.push(parsed);
              } catch(e) { console.log("Parse error", e); }
              pending--;
              if (pending === 0) { setNcSSTImportData(results); setNcSSTImporting(false); setShowNcSSTImport(true); }
            }).catch(function() { pending--; if (pending === 0) { setNcSSTImportData(results); setNcSSTImporting(false); setShowNcSSTImport(true); } });
          };
          reader.readAsText(file);
        });
      }

      function ncSSTConfirmImport() {
        var newItems = ncSSTImportData.map(function(d, i) {
          return {
            id: "NC-SST-" + String(ncSSTDB.length + i + 1).padStart(3, "0"),
            tipo: d.tipo || "Menor", area: d.area || "General",
            desc: d.desc || "", resp: d.resp || "Por asignar",
            plazo: d.plazo || "", acc: d.acc || "",
            norma: d.norma || "", avance: d.avance || 0,
            estado: "abierta", fecha: new Date().toISOString().slice(0, 10)
          };
        });
        setNcSSTDB(function(p) { return p.concat(newItems); });
        setNcSSTImportData([]); setShowNcSSTImport(false);
      }

      // ── Manual registration save ──
      function ncSSTSave() {
        if (!ncSSTForm.desc) return;
        var newNC = {
          id: (ncSSTForm.tipo === "Observacion" ? "OBS" : "NC") + "-SST-" + String(ncSSTDB.length + 1).padStart(3, "0"),
          tipo: ncSSTForm.tipo, area: ncSSTForm.area || "General",
          desc: ncSSTForm.desc, resp: ncSSTForm.resp || "Por asignar",
          plazo: ncSSTForm.plazo, acc: ncSSTForm.acc,
          norma: ncSSTForm.norma, avance: 0,
          estado: "abierta", fecha: new Date().toISOString().slice(0, 10)
        };
        setNcSSTDB(function(p) { return p.concat([newNC]); });
        setNcSSTForm({tipo:"Mayor",area:"",desc:"",resp:"",plazo:"",acc:"",norma:"",avance:0});
        setShowNcSSTForm(false);
      }

      // ── Inline edit save ──
      function ncSSTSaveEdit(id, field, value) {
        setNcSSTDB(function(p) { return p.map(function(nc) {
          if (nc.id === id) { var u = Object.assign({}, nc); u[field] = field === "avance" ? parseInt(value) || 0 : value; if (field === "avance" && parseInt(value) >= 100) u.estado = "cerrada"; return u; }
          return nc;
        }); });
      }

      // ── Import preview ──
      if (showNcSSTImport && ncSSTImportData.length > 0) {
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setShowNcSSTImport(false); setNcSSTImportData([]); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + C.i45 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Importacion IA — " + ncSSTImportData.length + " NC detectadas"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "Revisa y edita los campos antes de confirmar. Todos los campos son editables."),
            React.createElement("div", { style: { overflowX: "auto" } },
              React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
                React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "2px solid " + C.bd } },
                  ["Tipo","Area","Descripcion","Responsable","Plazo","Accion Correctiva","Norma",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "8px 4px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
                )),
                React.createElement("tbody", null, ncSSTImportData.map(function(d, i) {
                  return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50" } },
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("select", { value: d.tipo || "Menor", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 70 },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { tipo: v }); return n; }); }
                      }, ["Mayor","Menor","Observacion"].map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { value: d.area || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { area: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { value: d.desc || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: "100%" },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { desc: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { value: d.resp || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { resp: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { type: "date", value: d.plazo || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 110 },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { plazo: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { value: d.acc || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: "100%" },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { acc: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("input", { value: d.norma || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 65 },
                        onChange: function(e) { var v = e.target.value; var idx = i; setNcSSTImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { norma: v }); return n; }); }
                      })
                    ),
                    React.createElement("td", { style: { padding: "4px" } },
                      React.createElement("button", { onClick: function() { var idx = i; setNcSSTImportData(function(p) { return p.filter(function(_, j) { return j !== idx; }); }); },
                        style: { background: C.dn + "20", border: "none", borderRadius: 4, padding: "4px 6px", cursor: "pointer", color: C.dn, fontSize: 10 } }, "\u2716")
                    )
                  );
                }))
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
              React.createElement(Btn, { onClick: function() { setShowNcSSTImport(false); setNcSSTImportData([]); } }, "Cancelar"),
              React.createElement(Btn, { accent: true, onClick: ncSSTConfirmImport }, React.createElement(Icons.Check), " Confirmar " + ncSSTImportData.length + " NC")
            )
          )
        );
      }

      // ── Registration form ──
      if (showNcSSTForm) {
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setShowNcSSTForm(false); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + C.i45 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Registrar No Conformidad SST"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "ISO 45001 Cl.10.2 | Ley 29783 | DS 005-2012-TR"),
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
              React.createElement(SelectField, { label: "Tipo", value: ncSSTForm.tipo, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { tipo: v }); }); }, options: [{value:"Mayor",label:"Mayor"},{value:"Menor",label:"Menor"},{value:"Observacion",label:"Observacion"}] }),
              React.createElement(SelectField, { label: "Area", value: ncSSTForm.area, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { area: v }); }); }, options: areas.map(function(a) { return {value:a,label:a}; }) }),
              React.createElement(InputField, { label: "Responsable", value: ncSSTForm.resp, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { resp: v }); }); }, placeholder: "Nombre del responsable" }),
              React.createElement(InputField, { label: "Plazo", value: ncSSTForm.plazo, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { plazo: v }); }); }, type: "date" }),
              React.createElement(InputField, { label: "Norma / Clausula", value: ncSSTForm.norma, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { norma: v }); }); }, placeholder: "Cl.8.1 / Ley 29783 Art.X" })
            ),
            React.createElement(InputField, { label: "Descripcion del Hallazgo", value: ncSSTForm.desc, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { desc: v }); }); }, placeholder: "Describir detalladamente la no conformidad encontrada..." }),
            React.createElement(InputField, { label: "Accion Correctiva Propuesta", value: ncSSTForm.acc, onChange: function(v) { setNcSSTForm(function(p) { return Object.assign({}, p, { acc: v }); }); }, placeholder: "Describir la accion correctiva o preventiva a implementar..." }),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 } },
              React.createElement(Btn, { onClick: function() { setShowNcSSTForm(false); } }, "Cancelar"),
              React.createElement(Btn, { accent: true, onClick: ncSSTSave }, React.createElement(Icons.Check), " Registrar NC SST")
            )
          )
        );
      }

      // ── Main table view ──
      var abiertas = ncSSTDB.filter(function(n){return n.estado==="abierta";}).length;
      var enProceso = ncSSTDB.filter(function(n){return n.estado==="en proceso";}).length;
      var cerradas = ncSSTDB.filter(function(n){return n.estado==="cerrada";}).length;

      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } },
          React.createElement("div", { style: { display: "flex", gap: 8 } },
            React.createElement(Badge, { color: "red" }, "Abiertas: " + abiertas),
            React.createElement(Badge, { color: "yellow" }, "En Proceso: " + enProceso),
            React.createElement(Badge, { color: "green" }, "Cerradas: " + cerradas)
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement("label", { style: { cursor: "pointer", display: "inline-flex" } },
              React.createElement("input", { type: "file", accept: ".pdf,.doc,.docx,.txt,.csv", multiple: true, style: { display: "none" },
                onChange: function(e) { ncSSTImportFile(e.target.files); e.target.value = ""; }
              }),
              React.createElement("span", { style: { padding: "8px 16px", borderRadius: 8, border: "1px solid " + C.bd, fontSize: 11, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, background: C.sa, color: C.tm, cursor: "pointer" } }, React.createElement(Icons.Upload), " Importar NC")
            ),
            React.createElement(Btn, { primary: true, onClick: function() { setShowNcSSTForm(true); } }, React.createElement(Icons.Plus), " Registrar NC SST"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Codigo","Tipo","Area","Descripcion","Estado","Responsable","Plazo","Avance %","Accion Correctiva","Norma","Fecha"], ncSSTDB.map(function(n) { return [n.id, n.tipo, n.area, n.desc, n.estado, n.resp, n.plazo, n.avance, n.acc, n.norma, n.fecha]; }), "NC_SST_SIG360", "No Conformidades SST"); } })
          )
        ),
        ncSSTImporting ? React.createElement(Card, { style: { padding: 16, marginBottom: 12, textAlign: "center" } },
          React.createElement("div", { className: "typing" }, React.createElement("span", null), React.createElement("span", null), React.createElement("span", null)),
          React.createElement("div", { style: { fontSize: 10, color: C.tm, marginTop: 8 } }, "Analizando documento con IA para extraer No Conformidades...")
        ) : null,
        React.createElement(Card, { p: 0 },
          React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center" } },
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Registro de No Conformidades SST"),
              React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "ISO 45001 Cl.10.2 | Ley 29783 | Haz clic en \u270F\uFE0F para editar en linea")
            )
          ),
          React.createElement("div", { style: { overflowX: "auto" } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
              React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
                ["Codigo","Tipo","Area","Descripcion","Estado","Responsable","Plazo","Avance","Acciones"].map(function(h) {
                  return React.createElement("th", { key: h, style: { padding: "10px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", whiteSpace: "nowrap" } }, h);
                })
              )),
              React.createElement("tbody", null, ncSSTDB.map(function(nc) {
                var isEditing = ncSSTEditId === nc.id;
                return React.createElement("tr", { key: nc.id, style: { borderBottom: "1px solid " + C.bd + "50", background: isEditing ? C.i45 + "08" : "transparent" },
                  onMouseEnter: function(e) { if (!isEditing) e.currentTarget.style.background = C.cardH; },
                  onMouseLeave: function(e) { if (!isEditing) e.currentTarget.style.background = "transparent"; }
                },
                  React.createElement("td", { style: { padding: "6px", fontWeight: 700, color: C.i45, whiteSpace: "nowrap", fontSize: 9 } }, nc.id),
                  // Tipo
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("select", { value: nc.tipo, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 70 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "tipo", e.target.value); }
                    }, ["Mayor","Menor","Observacion"].map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))
                  ) : React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: tipC[nc.tipo] }, nc.tipo)),
                  // Area
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("select", { value: nc.area, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 90 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "area", e.target.value); }
                    }, areas.map(function(a) { return React.createElement("option", { key: a, value: a }, a); }))
                  ) : React.createElement("td", { style: { padding: "6px", color: C.tm } }, nc.area),
                  // Desc
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("input", { value: nc.desc, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: "100%", minWidth: 180 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "desc", e.target.value); }
                    })
                  ) : React.createElement("td", { style: { padding: "6px", color: C.tx, maxWidth: 200 } }, nc.desc),
                  // Estado
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("select", { value: nc.estado, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 80 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "estado", e.target.value); }
                    }, ["abierta","en proceso","cerrada"].map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))
                  ) : React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: estC[nc.estado] }, nc.estado)),
                  // Resp
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("input", { value: nc.resp, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 80 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "resp", e.target.value); }
                    })
                  ) : React.createElement("td", { style: { padding: "6px", color: C.tm, whiteSpace: "nowrap" } }, nc.resp),
                  // Plazo
                  isEditing ? React.createElement("td", { style: { padding: "4px" } },
                    React.createElement("input", { type: "date", value: nc.plazo, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 110 },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "plazo", e.target.value); }
                    })
                  ) : React.createElement("td", { style: { padding: "6px", color: C.tm, whiteSpace: "nowrap" } }, nc.plazo),
                  // Avance
                  isEditing ? React.createElement("td", { style: { padding: "4px", minWidth: 70 } },
                    React.createElement("input", { type: "number", min: 0, max: 100, value: nc.avance, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "3px", fontSize: 9, width: 50, textAlign: "center" },
                      onChange: function(e) { ncSSTSaveEdit(nc.id, "avance", e.target.value); }
                    })
                  ) : React.createElement("td", { style: { padding: "6px", minWidth: 80 } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } },
                      React.createElement(ProgressBar, { value: nc.avance, color: nc.avance >= 100 ? C.ac : nc.avance >= 50 ? C.wn : C.i45 }),
                      React.createElement("span", { style: { fontSize: 9, fontWeight: 600, color: nc.avance >= 100 ? C.ac : C.tm } }, nc.avance + "%")
                    )
                  ),
                  // Acciones
                  React.createElement("td", { style: { padding: "6px" } },
                    React.createElement("div", { style: { display: "flex", gap: 3 } },
                      React.createElement("button", { onClick: function() { setNcSSTEditId(isEditing ? null : nc.id); }, title: isEditing ? "Guardar" : "Editar",
                        style: { background: isEditing ? C.ac + "20" : C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: isEditing ? C.ac : C.pr, fontSize: 11 } }, isEditing ? "\u2713" : "\u270F\uFE0F")
                    )
                  )
                );
              }))
            )
          )
        ),
        React.createElement("div", { style: { padding: "10px 0", fontSize: 9, color: C.td } }, "ISO 45001:2018 Cl.10.2 | Ley 29783 Art.39 | DS 005-2012-TR | G.050 | Registro obligatorio de no conformidades y acciones correctivas")
      );
    }

    function IncidentesView() {
      var tipC2={"Incidente Peligroso":"red","Cuasi Accidente":"yellow","Accidente Leve":"blue","Accidente Incapacitante":"red","Fatalidad":"red"};
      var estC2={abierto:"yellow",cerrado:"green"};
      var areas=["Obras civiles","Estructura","Inst. electricas","Acabados","Almacen","Equipos pesados","Administracion","General"];
      var tiposInc=["Cuasi Accidente","Incidente Peligroso","Accidente Leve","Accidente Incapacitante","Fatalidad"];

      // ── AI Import ──
      function incImportFile(files) {
        if (!files || !files.length) return;
        setIncImporting(true);
        var pending = files.length; var results = [];
        Array.from(files).forEach(function(file) {
          var reader = new FileReader();
          reader.onload = function(ev) {
            var text = ev.target.result.substring(0, 8000);
            fetch("https://api.anthropic.com/v1/messages", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{
                role: "user", content: "Analiza este documento de incidentes/accidentes SST y extrae los datos en JSON array. Cada registro debe tener: tipo (Cuasi Accidente/Incidente Peligroso/Accidente Leve/Accidente Incapacitante/Fatalidad), fecha (YYYY-MM-DD), area, desc (descripcion completa del evento), lesion (Ninguna o descripcion), diasP (dias perdidos, numero), invest (Pendiente/En curso/Completa), accion (accion correctiva). Responde SOLO el JSON array.\n\nDocumento:\n" + text
              }] })
            }).then(function(r) { return r.json(); }).then(function(data) {
              try { var t = data.content[0].text.replace(/```json|```/g, "").trim(); var parsed = JSON.parse(t); results = results.concat(Array.isArray(parsed) ? parsed : [parsed]); } catch(e) {}
              pending--; if (pending === 0) { setIncImportData(results); setIncImporting(false); setShowIncImport(true); }
            }).catch(function() { pending--; if (pending === 0) { setIncImportData(results); setIncImporting(false); setShowIncImport(true); } });
          };
          reader.readAsText(file);
        });
      }

      function incConfirmImport() {
        var items = incImportData.map(function(d, i) {
          return { id: "INC-" + String(incidentsDB.length + i + 1).padStart(3, "0"), tipo: d.tipo || "Cuasi Accidente", fecha: d.fecha || new Date().toISOString().slice(0,10), area: d.area || "General", desc: d.desc || "", lesion: d.lesion || "Ninguna", diasP: d.diasP || 0, invest: d.invest || "Pendiente", accion: d.accion || "Por definir", est: "abierto" };
        });
        setIncidentsDB(function(p) { return p.concat(items); });
        setIncImportData([]); setShowIncImport(false);
      }

      function incSaveEdit(id, field, value) {
        setIncidentsDB(function(p) { return p.map(function(r) {
          if (r.id === id) { var u = Object.assign({}, r); u[field] = (field === "diasP" || field === "hall" || field === "crit") ? (parseInt(value) || 0) : value; return u; }
          return r;
        }); });
      }

      // ── Import preview ──
      if (showIncImport && incImportData.length > 0) {
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setShowIncImport(false); setIncImportData([]); }, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 16, borderLeft: "4px solid " + C.i45 } },
            React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Importacion IA — " + incImportData.length + " Incidentes detectados"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 14 } }, "Revisa y edita los campos antes de confirmar."),
            React.createElement("div", { style: { overflowX: "auto" } },
              React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
                React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "2px solid " + C.bd } },
                  ["Tipo","Fecha","Area","Descripcion","Lesion","Dias P.","Accion Correctiva",""].map(function(h) { return React.createElement("th", { key: h, style: { padding: "8px 4px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
                )),
                React.createElement("tbody", null, incImportData.map(function(d, i) {
                  return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50" } },
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("select", { value: d.tipo || "Cuasi Accidente", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 100 }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { tipo: v }); return n; }); } }, tiposInc.map(function(o) { return React.createElement("option", { key: o, value: o }, o); }))),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "date", value: d.fecha || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 110 }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { fecha: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.area || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { area: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.desc || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: "100%" }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { desc: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.lesion || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 80 }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { lesion: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { type: "number", min: 0, value: d.diasP || 0, style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: 40, textAlign: "center" }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { diasP: parseInt(v) || 0 }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("input", { value: d.accion || "", style: { background: C.sa, color: C.tx, border: "1px solid " + C.bd, borderRadius: 4, padding: "4px", fontSize: 9, width: "100%" }, onChange: function(e) { var v = e.target.value; var idx = i; setIncImportData(function(p) { var n = p.slice(); n[idx] = Object.assign({}, n[idx], { accion: v }); return n; }); } })),
                    React.createElement("td", { style: { padding: "4px" } }, React.createElement("button", { onClick: function() { var idx = i; setIncImportData(function(p) { return p.filter(function(_, j) { return j !== idx; }); }); }, style: { background: C.dn + "20", border: "none", borderRadius: 4, padding: "4px 6px", cursor: "pointer", color: C.dn, fontSize: 10 } }, "\u2716"))
                  );
                }))
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 14 } },
              React.createElement(Btn, { onClick: function() { setShowIncImport(false); setIncImportData([]); } }, "Cancelar"),
              React.createElement(Btn, { accent: true, onClick: incConfirmImport }, React.createElement(Icons.Check), " Confirmar " + incImportData.length + " Incidentes")
            )
          )
        );
      }

      // ── Main view ──
      return React.createElement("div",null,
        React.createElement("div",{style:{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}},
          React.createElement(KPICard,{icon:React.createElement(Icons.Zap),label:"Total Eventos",value:String(incidentsDB.length),sub:"Registrados",glow:C.i45}),
          React.createElement(KPICard,{icon:React.createElement(Icons.Alert),label:"Inc. Peligrosos",value:String(incidentsDB.filter(function(i){return i.tipo==="Incidente Peligroso";}).length),glow:C.dn}),
          React.createElement(KPICard,{icon:React.createElement(Icons.Shield),label:"Cuasi Accidentes",value:String(incidentsDB.filter(function(i){return i.tipo==="Cuasi Accidente";}).length),glow:C.wn}),
          React.createElement(KPICard,{icon:React.createElement(Icons.Check),label:"Investigados",value:String(incidentsDB.filter(function(i){return i.invest==="Completa";}).length)+"/"+incidentsDB.length,glow:C.ac})
        ),
        React.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}},
          React.createElement("div",{style:{display:"flex",gap:6}},
            React.createElement(Badge,{color:"yellow"},"Abiertos: "+incidentsDB.filter(function(i){return i.est==="abierto";}).length),
            React.createElement(Badge,{color:"green"},"Cerrados: "+incidentsDB.filter(function(i){return i.est==="cerrado";}).length)
          ),
          React.createElement("div",{style:{display:"flex",gap:6}},
            React.createElement("label",{style:{cursor:"pointer",display:"inline-flex"}},
              React.createElement("input",{type:"file",accept:".pdf,.doc,.docx,.txt,.csv",multiple:true,style:{display:"none"},onChange:function(e){incImportFile(e.target.files);e.target.value="";}}),
              React.createElement("span",{style:{padding:"8px 16px",borderRadius:8,border:"1px solid "+C.bd,fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center",gap:6,background:C.sa,color:C.tm,cursor:"pointer"}},React.createElement(Icons.Upload)," Importar")
            ),
            React.createElement(Btn,{primary:true,onClick:function(){setShowIncForm(!showIncForm);}},React.createElement(Icons.Plus)," Registrar Incidente"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["Codigo","Tipo","Fecha","Area","Descripcion","Lesion","Dias Perdidos","Investigacion","Accion Correctiva","Estado"], incidentsDB.map(function(r) { return [r.id, r.tipo, r.fecha, r.area, r.desc, r.lesion, r.diasP, r.invest, r.accion, r.est]; }), "Incidentes_SST", "Incidentes y Accidentes SST"); } })
          )
        ),
        incImporting?React.createElement(Card,{style:{padding:16,marginBottom:12,textAlign:"center"}},
          React.createElement("div",{className:"typing"},React.createElement("span",null),React.createElement("span",null),React.createElement("span",null)),
          React.createElement("div",{style:{fontSize:10,color:C.tm,marginTop:8}},"Analizando documento con IA para extraer incidentes...")
        ):null,
        showIncForm?React.createElement(Card,{style:{padding:16,marginBottom:12}},
          React.createElement("div",{style:{fontSize:12,fontWeight:700,color:C.tx,marginBottom:12}},"Nuevo Registro de Incidente/Accidente"),
          React.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}},
            React.createElement(SelectField,{label:"Tipo de Evento",value:incForm.tipo,onChange:function(v){setIncForm(function(p){return Object.assign({},p,{tipo:v});});},options:tiposInc.map(function(t){return {value:t,label:t};})}),
            React.createElement(InputField,{label:"Fecha",value:incForm.fecha,onChange:function(v){setIncForm(function(p){return Object.assign({},p,{fecha:v});});},type:"date"}),
            React.createElement(SelectField,{label:"Area",value:incForm.area,onChange:function(v){setIncForm(function(p){return Object.assign({},p,{area:v});});},options:areas.map(function(a){return {value:a,label:a};})}),
            React.createElement(InputField,{label:"Lesion",value:incForm.lesion,onChange:function(v){setIncForm(function(p){return Object.assign({},p,{lesion:v});});},placeholder:"Ninguna / Descripcion"})
          ),
          React.createElement(InputField,{label:"Descripcion del Evento",value:incForm.desc,onChange:function(v){setIncForm(function(p){return Object.assign({},p,{desc:v});});},placeholder:"Describir detalladamente el evento..."}),
          React.createElement("div",{style:{display:"flex",gap:8,justifyContent:"flex-end",marginTop:8}},
            React.createElement(Btn,{onClick:function(){setShowIncForm(false);}},"Cancelar"),
            React.createElement(Btn,{accent:true,onClick:function(){
              if(incForm.tipo&&incForm.fecha&&incForm.desc){
                var ni={id:"INC-"+String(incidentsDB.length+1).padStart(3,"0"),tipo:incForm.tipo,fecha:incForm.fecha,area:incForm.area||"General",desc:incForm.desc,lesion:incForm.lesion||"Ninguna",diasP:0,invest:"Pendiente",accion:"Por definir",est:"abierto"};
                setIncidentsDB(function(p){return p.concat([ni]);});
                setIncForm({tipo:"",fecha:"",area:"",desc:"",lesion:"Ninguna",diasP:0});
                setShowIncForm(false);
              }
            }},React.createElement(Icons.Check)," Registrar")
          )
        ):null,
        React.createElement(Card,{p:0},
          React.createElement("div",{style:{padding:"12px 16px",borderBottom:"1px solid "+C.bd}},
            React.createElement("div",{style:{fontSize:13,fontWeight:700,color:C.tx}},"Registro de Incidentes / Accidentes"),
            React.createElement("div",{style:{fontSize:9,color:C.td,marginTop:2}},"Ley 29783 Art.82 | DS 005-2012-TR Art.110 | \u270F\uFE0F Editar en linea")
          ),
          React.createElement("div",{style:{overflowX:"auto"}},
          React.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:10}},
            React.createElement("thead",null,React.createElement("tr",{style:{borderBottom:"1px solid "+C.bd}},
              ["Codigo","Tipo","Fecha","Area","Descripcion","Lesion","Invest.","Accion Correctiva","Estado",""].map(function(h){
                return React.createElement("th",{key:h,style:{padding:"10px 6px",textAlign:"left",fontSize:8,fontWeight:700,color:C.td,textTransform:"uppercase",whiteSpace:"nowrap"}},h);
              })
            )),
            React.createElement("tbody",null,incidentsDB.map(function(inc){
              var isE = incEditId === inc.id;
              return React.createElement("tr",{key:inc.id,style:{borderBottom:"1px solid "+C.bd+"50",background:isE?C.i45+"08":"transparent"},
                onMouseEnter:function(e){if(!isE)e.currentTarget.style.background=C.cardH;},onMouseLeave:function(e){if(!isE)e.currentTarget.style.background="transparent";}},
                React.createElement("td",{style:{padding:"6px",fontWeight:700,color:C.i45,whiteSpace:"nowrap",fontSize:9}},inc.id),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("select",{value:inc.tipo,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:100},onChange:function(e){incSaveEdit(inc.id,"tipo",e.target.value);}},tiposInc.map(function(o){return React.createElement("option",{key:o,value:o},o);}))):React.createElement("td",{style:{padding:"6px"}},React.createElement(Badge,{color:tipC2[inc.tipo]||"yellow"},inc.tipo)),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("input",{type:"date",value:inc.fecha,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:110},onChange:function(e){incSaveEdit(inc.id,"fecha",e.target.value);}})):React.createElement("td",{style:{padding:"6px",color:C.tm,whiteSpace:"nowrap"}},inc.fecha),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("select",{value:inc.area,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:90},onChange:function(e){incSaveEdit(inc.id,"area",e.target.value);}},areas.map(function(a){return React.createElement("option",{key:a,value:a},a);}))):React.createElement("td",{style:{padding:"6px",color:C.tm}},inc.area),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("input",{value:inc.desc,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:"100%",minWidth:150},onChange:function(e){incSaveEdit(inc.id,"desc",e.target.value);}})):React.createElement("td",{style:{padding:"6px",color:C.tx,maxWidth:180,fontSize:9}},inc.desc),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("input",{value:inc.lesion,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:70},onChange:function(e){incSaveEdit(inc.id,"lesion",e.target.value);}})):React.createElement("td",{style:{padding:"6px",color:inc.lesion==="Ninguna"?C.ac:C.wn,fontSize:9}},inc.lesion),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("select",{value:inc.invest,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:75},onChange:function(e){incSaveEdit(inc.id,"invest",e.target.value);}},["Pendiente","En curso","Completa"].map(function(o){return React.createElement("option",{key:o,value:o},o);}))):React.createElement("td",{style:{padding:"6px"}},React.createElement(Badge,{color:inc.invest==="Completa"?"green":inc.invest==="En curso"?"yellow":"red"},inc.invest)),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("input",{value:inc.accion,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:"100%",minWidth:120},onChange:function(e){incSaveEdit(inc.id,"accion",e.target.value);}})):React.createElement("td",{style:{padding:"6px",color:C.tm,fontSize:9,maxWidth:160}},inc.accion),
                isE?React.createElement("td",{style:{padding:"4px"}},React.createElement("select",{value:inc.est,style:{background:C.sa,color:C.tx,border:"1px solid "+C.bd,borderRadius:4,padding:"3px",fontSize:9,width:70},onChange:function(e){incSaveEdit(inc.id,"est",e.target.value);}},["abierto","cerrado"].map(function(o){return React.createElement("option",{key:o,value:o},o);}))):React.createElement("td",{style:{padding:"6px"}},React.createElement(Badge,{color:estC2[inc.est]||"yellow"},inc.est)),
                React.createElement("td",{style:{padding:"6px"}},React.createElement("button",{onClick:function(){setIncEditId(isE?null:inc.id);},title:isE?"Guardar":"Editar",style:{background:isE?C.ac+"20":C.pr+"18",border:"none",borderRadius:4,padding:"4px 7px",cursor:"pointer",color:isE?C.ac:C.pr,fontSize:11}},isE?"\u2713":"\u270F\uFE0F"))
              );
            }))
          ))
        ),
        React.createElement("div",{style:{padding:"12px 0",fontSize:9,color:C.td}},"Ley 29783 Art.82 | DS 005-2012-TR Art.110 | Registro obligatorio de incidentes, accidentes y enfermedades ocupacionales")
      );
    }

    return React.createElement("div", null,
      React.createElement(TabBar, { tabs: tabs, active: sTab, onChange: setSTab }),
      sTab === "dashboard-s" ? SSTDash() : null,
      sTab === "iperc" ? IPERCView() : null,
      sTab === "nc-sst" ? NCSSTView() : null,
      sTab === "incidentes" ? IncidentesView() : null,
      sTab === "inspecciones" ? InspView() : null,
      sTab === "capacitaciones" ? CapView() : null,
      sTab === "db-s" ? React.createElement(EditableDBView, {
        title: "Base de Datos ISO 45001 — SST",
        color: C.i45,
        columns: ["Indicador","Formula","Meta","Resultado","Periodo"],
        rows: [
          {id:1,vals:["Indice Frecuencia","(Accidentes/HHT)x200000","<1.0","0.70","Mensual"]},
          {id:2,vals:["Indice Severidad","(Dias perdidos/HHT)x200000","<50","12","Mensual"]},
          {id:3,vals:["Indice Accidentabilidad","IFxIS/1000","<0.05","0.00","Mensual"]},
          {id:4,vals:["Capacitacion SST","(Ejecutado/Programado)x100",">=95%","98%","Mensual"]},
          {id:5,vals:["Inspecciones planeadas","Ejecutadas/Programadas","100%","93%","Semanal"]},
          {id:6,vals:["PETAR emitidos","Total del mes",">=150","189","Mensual"]},
          {id:7,vals:["Cuasi accidentes reportados","Total reportados",">=10","18","Mensual"]},
          {id:8,vals:["Observaciones SST levantadas","(Levantadas/Total)x100",">=90%","87%","Mensual"]},
        ]
      }) : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // ISO 37001:2016 v02 — SISTEMA DE GESTION ANTISOBORNO
  // ═══════════════════════════════════════════════════════════════════════
  function ISO37001V2View() {
    var tabs = [
      { key: "dashboard-ab", label: "Dashboard", icon: Icons.Dash },
      { key: "due-diligence", label: "Due Diligence", icon: Icons.Search },
      { key: "canal-etico", label: "Canal Etico", icon: Icons.Shield },
      { key: "riesgos-ab", label: "Mapa Riesgos", icon: Icons.Alert },
      { key: "db-ab", label: "Base de Datos", icon: Icons.Database },
    ];
    var ddTrend = [{mes:"Jul",alto:2,medio:3,bajo:3},{mes:"Ago",alto:3,medio:4,bajo:5},{mes:"Sep",alto:1,medio:4,bajo:5},{mes:"Oct",alto:2,medio:5,bajo:8},{mes:"Nov",alto:1,medio:3,bajo:7},{mes:"Dic",alto:0,medio:4,bajo:10}];
    var denuncias = [
      {id:"DEN-007",tipo:"Conflicto de interes",est:"Resuelto",fecha:"2025-12-01",canal:"Web",riesgo:"Medio",dias:15},
      {id:"DEN-006",tipo:"Pago irregular a funcionario",est:"En investigacion",fecha:"2025-11-20",canal:"Telefono",riesgo:"Alto",dias:null},
      {id:"DEN-005",tipo:"Regalos no declarados",est:"Resuelto",fecha:"2025-10-15",canal:"Email",riesgo:"Bajo",dias:12},
    ];
    var riesgos = [
      {r:"Soborno a funcionarios para permisos",prob:3,imp:4,nrp:12,ctrl:"Due diligence + prohibicion regalos",res:"Medio"},
      {r:"Pagos facilitacion en tramites",prob:3,imp:3,nrp:9,ctrl:"Politica cero tolerancia",res:"Bajo"},
      {r:"Conflicto interes en adquisiciones",prob:2,imp:3,nrp:6,ctrl:"Declaracion jurada + rotacion",res:"Bajo"},
      {r:"Regalos/hospitalidad excesivos",prob:2,imp:2,nrp:4,ctrl:"Registro + aprobacion gerencial",res:"Bajo"},
      {r:"Lavado activos subcontratistas",prob:1,imp:4,nrp:4,ctrl:"KYC + monitoreo transaccional",res:"Bajo"},
    ];

    // ══ Metodologia ISO 37001 — Factores de Riesgo Antisoborno ══
    var FACTORES_DD = {
      pais: { label: "Riesgo Pais / Jurisdiccion", ref: "Cl.4.5(a)", peso: 20, desc: "Indice de Percepcion de Corrupcion (CPI), estabilidad institucional, marco legal antisoborno del pais",
        niveles: ["CPI > 65, marco legal robusto","CPI 50-65, marco legal aceptable","CPI 35-50, deficiencias regulatorias","CPI 20-35, corrupcion sistemica","CPI < 20, estado fallido o conflicto"] },
      sector: { label: "Riesgo del Sector", ref: "Cl.4.5(b)", peso: 25, desc: "Sector economico de la contraparte, exposicion historica a corrupcion en dicho sector",
        niveles: ["Bajo riesgo (tecnologia, retail)","Moderado-bajo (manufactura, servicios)","Moderado (transporte, salud)","Alto (construccion, mineria, defensa)","Muy alto (gobierno, extractivas, armamento)"] },
      transaccion: { label: "Riesgo de Transaccion", ref: "Cl.4.5(c)", peso: 25, desc: "Naturaleza, valor, frecuencia de la transaccion; existencia de intermediarios o subcontratistas",
        niveles: ["< S/100K, directa, recurrente","S/100K-500K, directa, establecida","S/500K-2M, con intermediarios","S/2M-10M, compleja, subcontratistas","> S/10M, megaproyecto, multiples partes"] },
      oportunidad: { label: "Riesgo de Oportunidad de Soborno", ref: "Cl.4.5(d)", peso: 20, desc: "Interaccion con funcionarios publicos, licencias/permisos, procesos de licitacion",
        niveles: ["Sin contacto publico","Contacto minimo, tramites estandar","Permisos/licencias regulares","Licitaciones publicas, contacto frecuente","Megaproyectos publicos, aprobaciones multiples"] },
      historial: { label: "Historial / Reputacion", ref: "Cl.8.2", peso: 10, desc: "Antecedentes de la contraparte: sanciones, investigaciones, PEPs, listas restrictivas",
        niveles: ["Sin antecedentes, reputacion excelente","Sin antecedentes, reputacion buena","Antecedentes menores resueltos","Investigaciones previas o PEPs vinculados","Sanciones activas o lista negra"] },
    };

    function calcDDScore(factores) {
      var totalPeso = 0; var totalPonderado = 0;
      Object.keys(FACTORES_DD).forEach(function(k) {
        var f = FACTORES_DD[k]; var v = factores[k] || 1;
        totalPeso += f.peso;
        totalPonderado += ((5 - v) / 4) * f.peso; // invertir: 1=mejor → 100%, 5=peor → 0%
      });
      return Math.round((totalPonderado / totalPeso) * 100);
    }
    function calcNivel(score) { return score >= 70 ? "Bajo" : score >= 45 ? "Medio" : "Alto"; }
    function calcMedidas(nivel) {
      if (nivel === "Alto") return "DD reforzada + compliance officer dedicado + monitoreo trimestral + clausula antisoborno reforzada + auditorias";
      if (nivel === "Medio") return "Clausula antisoborno + revision anual + declaracion de conflictos de interes";
      return "Clausula estandar + revision bienal";
    }
    function calcEstado(nivel) { return nivel === "Alto" ? "En revision" : nivel === "Medio" ? "Aprobado condic." : "Aprobado"; }

    // ══ Nueva Evaluación — Formulario wizard ══
    function ddResetForm() {
      setDDData({ent:"",tipo:"Proveedor",sector:"",pais:"Peru",contacto:"",ruc:"",transVal:"",obs:""});
      setDDFactores({pais:1,sector:1,transaccion:1,oportunidad:1,historial:1});
      setDDStep(0); setShowDDForm(false);
    }
    function ddSave() {
      var sc = calcDDScore(ddFactores); var nv = calcNivel(sc);
      var newDD = {
        id: "DD-" + String(ddReg.length + 1).padStart(3,"0"),
        ent: ddData.ent, tipo: ddData.tipo, sector: ddData.sector, pais: ddData.pais,
        contacto: ddData.contacto, ruc: ddData.ruc, transVal: ddData.transVal,
        factores: Object.assign({}, ddFactores), score: sc, nivel: nv,
        est: calcEstado(nv), fecha: new Date().toISOString().slice(0,10),
        obs: ddData.obs, medidas: calcMedidas(nv)
      };
      setDDReg(function(p) { return p.concat([newDD]); });
      ddResetForm();
    }

    var rc = {Alto:"red",Medio:"yellow",Bajo:"green"};
    var ec = {Aprobado:"green","Aprobado condic.":"yellow","En revision":"red"};

    function ABDash() {
      var altos = ddReg.filter(function(d){return d.nivel==="Alto";}).length;
      var medios = ddReg.filter(function(d){return d.nivel==="Medio";}).length;
      var bajos = ddReg.filter(function(d){return d.nivel==="Bajo";}).length;
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Gavel), label: "Due Diligence", value: String(ddReg.length), sub: "Evaluaciones totales", glow: C.i37 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Alert), label: "Riesgo Alto", value: String(altos), sub: altos > 0 ? "Requieren DD reforzada" : "Ninguno", subColor: C.dn, glow: C.dn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Shield), label: "Denuncias Activas", value: "1", sub: "2 resueltas", subColor: C.ac, glow: C.wn }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Users), label: "Capacitacion", value: "94%", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Check), label: "Cumpl. Ley 30424", value: "78%", glow: C.pp })
        ),
        React.createElement(Card, { style: { padding: 16 } },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: C.tx, marginBottom: 12 } }, "Due Diligence por Nivel de Riesgo"),
          React.createElement(ResponsiveContainer, { width: "100%", height: 200 },
            React.createElement(BarChart, { data: ddTrend },
              React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: C.bd }),
              React.createElement(XAxis, { dataKey: "mes", stroke: C.td, fontSize: 10 }),
              React.createElement(YAxis, { stroke: C.td, fontSize: 10 }),
              React.createElement(Tooltip, { contentStyle: { background: C.card, border: "1px solid " + C.bd, borderRadius: 8, fontSize: 11 } }),
              React.createElement(Bar, { dataKey: "alto", stackId: "a", fill: C.dn, name: "Alto" }),
              React.createElement(Bar, { dataKey: "medio", stackId: "a", fill: C.wn, name: "Medio" }),
              React.createElement(Bar, { dataKey: "bajo", stackId: "a", fill: C.ac, radius: [3, 3, 0, 0], name: "Bajo" }),
              React.createElement(Legend, { wrapperStyle: { fontSize: 9 } })
            )
          )
        )
      );
    }

    // ══ VISTA PRINCIPAL DUE DILIGENCE ══
    function DDView() {
      // ── Detalle de evaluación ──
      if (ddDetail) {
        var d = ddDetail; var sc = d.score; var nv = d.nivel;
        return React.createElement("div", null,
          React.createElement(Btn, { onClick: function() { setDDDetail(null); }, style: { marginBottom: 12 } }, "\u2190 Volver al Registro"),
          React.createElement(Card, { style: { padding: 20, borderLeft: "4px solid " + (nv === "Alto" ? C.dn : nv === "Medio" ? C.wn : C.ac) } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 } },
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: C.tx } }, d.ent),
                React.createElement("div", { style: { fontSize: 10, color: C.tm, marginTop: 2 } }, d.tipo + " | " + d.sector + " | RUC: " + d.ruc),
                React.createElement("div", { style: { fontSize: 10, color: C.tm } }, "Contacto: " + d.contacto + " | Valor: " + d.transVal)
              ),
              React.createElement("div", { style: { textAlign: "right" } },
                React.createElement("div", { style: { fontSize: 9, color: C.td } }, d.id + " | " + d.fecha),
                React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 4 } },
                  React.createElement(Badge, { color: rc[nv] }, "Riesgo " + nv),
                  React.createElement(Badge, { color: ec[d.est] }, d.est)
                )
              )
            ),
            // Score gauge
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, padding: 16, background: C.sa, borderRadius: 12, marginBottom: 16 } },
              React.createElement("div", { style: { width: 80, height: 80, borderRadius: "50%", border: "6px solid " + (sc >= 70 ? C.ac : sc >= 45 ? C.wn : C.dn), display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } },
                React.createElement("div", { style: { fontSize: 22, fontWeight: 900, color: sc >= 70 ? C.ac : sc >= 45 ? C.wn : C.dn } }, sc + "%"),
                React.createElement("div", { style: { fontSize: 7, color: C.td, marginTop: -2 } }, "SCORE DD")
              ),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.tx, marginBottom: 6 } }, "Valoracion de Riesgo Antisoborno — ISO 37001:2016"),
                React.createElement("div", { style: { fontSize: 9, color: C.tm, marginBottom: 4 } }, "Metodologia: Ponderacion de 5 factores de riesgo segun clausulas 4.5 y 8.2"),
                React.createElement("div", { style: { height: 8, background: C.bd, borderRadius: 4, overflow: "hidden" } },
                  React.createElement("div", { style: { width: sc + "%", height: "100%", borderRadius: 4, background: sc >= 70 ? C.ac : sc >= 45 ? "linear-gradient(90deg," + C.wn + "," + C.wn + ")" : "linear-gradient(90deg," + C.dn + "," + C.dn + ")" } })
                )
              )
            ),
            // Factores desglose
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.tx, marginBottom: 10 } }, "Desglose de Factores de Riesgo"),
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10, marginBottom: 16 } },
              React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "2px solid " + C.bd } },
                ["Factor de Riesgo", "Ref. ISO", "Peso", "Nivel (1-5)", "Descripcion"].map(function(h) { return React.createElement("th", { key: h, style: { padding: "8px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); })
              )),
              React.createElement("tbody", null, Object.keys(FACTORES_DD).map(function(k) {
                var f = FACTORES_DD[k]; var v = d.factores[k] || 1;
                var barColor = v <= 2 ? C.ac : v <= 3 ? C.wn : C.dn;
                return React.createElement("tr", { key: k, style: { borderBottom: "1px solid " + C.bd + "50" } },
                  React.createElement("td", { style: { padding: "8px 6px", fontWeight: 600, color: C.tx } }, f.label),
                  React.createElement("td", { style: { padding: "8px 6px", color: C.pr, fontSize: 9 } }, f.ref),
                  React.createElement("td", { style: { padding: "8px 6px", color: C.tm, fontWeight: 600 } }, f.peso + "%"),
                  React.createElement("td", { style: { padding: "8px 6px" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                      React.createElement("div", { style: { width: 60, height: 6, background: C.bd, borderRadius: 3, overflow: "hidden" } },
                        React.createElement("div", { style: { width: (v * 20) + "%", height: "100%", borderRadius: 3, background: barColor } })
                      ),
                      React.createElement("span", { style: { fontWeight: 800, color: barColor, fontSize: 12 } }, v)
                    )
                  ),
                  React.createElement("td", { style: { padding: "8px 6px", fontSize: 8, color: C.tm, maxWidth: 250 } }, f.niveles[v - 1])
                );
              }))
            ),
            // Observaciones y medidas
            React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 } },
              React.createElement("div", { style: { padding: 12, background: C.sa, borderRadius: 8 } },
                React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: C.td, textTransform: "uppercase", marginBottom: 4 } }, "Observaciones"),
                React.createElement("div", { style: { fontSize: 10, color: C.tx, lineHeight: 1.5 } }, d.obs || "Sin observaciones")
              ),
              React.createElement("div", { style: { padding: 12, background: nv === "Alto" ? C.dn + "15" : nv === "Medio" ? C.wn + "15" : C.ac + "15", borderRadius: 8, border: "1px solid " + (nv === "Alto" ? C.dn : nv === "Medio" ? C.wn : C.ac) + "30" } },
                React.createElement("div", { style: { fontSize: 9, fontWeight: 700, color: nv === "Alto" ? C.dn : nv === "Medio" ? C.wn : C.ac, textTransform: "uppercase", marginBottom: 4 } }, "Medidas de Mitigacion Requeridas"),
                React.createElement("div", { style: { fontSize: 10, color: C.tx, lineHeight: 1.5 } }, d.medidas || "Medidas estandar")
              )
            ),
            React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" } },
              React.createElement(Btn, { onClick: function() { setDDDetail(null); } }, "Cerrar"),
              React.createElement(Btn, { primary: true, onClick: function() { downloadDDReport(d); } }, React.createElement(Icons.Download), " Descargar Informe DD")
            )
          )
        );
      }

      // ── Formulario nueva evaluación ──
      if (showDDForm) {
        var currentScore = calcDDScore(ddFactores);
        var currentNivel = calcNivel(currentScore);

        return React.createElement("div", null,
          React.createElement(Btn, { onClick: ddResetForm, style: { marginBottom: 12 } }, "\u2190 Cancelar"),
          React.createElement(Card, { style: { padding: 20, borderLeft: "4px solid " + C.i37 } },
            React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx, marginBottom: 4 } }, "Nueva Evaluacion de Debida Diligencia"),
            React.createElement("div", { style: { fontSize: 9, color: C.td, marginBottom: 16 } }, "ISO 37001:2016 — Clausula 8.2 | Debida diligencia sobre transacciones, proyectos, socios, personal y terceros"),
            // Step bar
            React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 20 } },
              ["Datos de la Contraparte", "Valoracion de Riesgo", "Resultado y Medidas"].map(function(s, i) {
                return React.createElement("div", { key: i, style: { flex: 1, display: "flex", alignItems: "center", gap: 6 } },
                  React.createElement("div", { style: { width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, background: i < ddStep ? C.ac : i === ddStep ? C.i37 : C.sa, color: i <= ddStep ? "#fff" : C.td, border: "2px solid " + (i <= ddStep ? i === ddStep ? C.i37 : C.ac : C.bd) } }, i < ddStep ? "\u2713" : i + 1),
                  React.createElement("span", { style: { fontSize: 9, fontWeight: i === ddStep ? 700 : 400, color: i === ddStep ? C.i37 : C.td } }, s),
                  i < 2 ? React.createElement("div", { style: { flex: 1, height: 2, background: i < ddStep ? C.ac : C.bd, borderRadius: 1 } }) : null
                );
              })
            ),
            // Step 0: Datos
            ddStep === 0 ? React.createElement("div", null,
              React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } },
                React.createElement(InputField, { label: "Razon Social / Entidad", value: ddData.ent, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { ent: v }); }); }, placeholder: "Nombre completo de la entidad" }),
                React.createElement(InputField, { label: "RUC / ID Fiscal", value: ddData.ruc, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { ruc: v }); }); }, placeholder: "20XXXXXXXXX" }),
                React.createElement(SelectField, { label: "Tipo de Relacion", value: ddData.tipo, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { tipo: v }); }); }, options: [{value:"Proveedor",label:"Proveedor"},{value:"Cliente",label:"Cliente"},{value:"Cliente Publico",label:"Cliente Publico / Gobierno"},{value:"Socio",label:"Socio de Negocio / JV"},{value:"Subcontratista",label:"Subcontratista"},{value:"Consultor",label:"Consultor / Intermediario"},{value:"Agente",label:"Agente Comercial"}] }),
                React.createElement(SelectField, { label: "Sector Economico", value: ddData.sector, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { sector: v }); }); }, options: [{value:"Construccion",label:"Construccion"},{value:"Mineria",label:"Mineria"},{value:"Gobierno",label:"Gobierno / Sector Publico"},{value:"Transporte",label:"Transporte y Logistica"},{value:"Energia",label:"Energia"},{value:"Manufactura",label:"Manufactura"},{value:"Salud",label:"Salud"},{value:"Tecnologia",label:"Tecnologia"},{value:"Comercio",label:"Comercio"},{value:"Servicios",label:"Servicios Profesionales"},{value:"Otro",label:"Otro"}] }),
                React.createElement(InputField, { label: "Pais / Jurisdiccion", value: ddData.pais, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { pais: v }); }); } }),
                React.createElement(InputField, { label: "Contacto Principal", value: ddData.contacto, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { contacto: v }); }); }, placeholder: "Nombre del contacto" }),
                React.createElement(InputField, { label: "Valor de Transaccion", value: ddData.transVal, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { transVal: v }); }); }, placeholder: "S/ 0.00" })
              ),
              React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginTop: 14 } },
                React.createElement(Btn, { primary: true, onClick: function() { if (ddData.ent && ddData.sector) setDDStep(1); } }, "Siguiente: Valoracion de Riesgo \u2192")
              )
            ) : null,
            // Step 1: Factores de riesgo
            ddStep === 1 ? React.createElement("div", null,
              React.createElement("div", { style: { padding: 10, background: C.sa, borderRadius: 8, marginBottom: 14, fontSize: 9, color: C.tm, lineHeight: 1.6 } },
                React.createElement("strong", { style: { color: C.i37 } }, "Metodologia ISO 37001:2016 Cl.4.5:"), " Evaluar cada factor de riesgo de soborno en escala 1-5 segun criterios establecidos. ",
                "El score final se calcula ponderando los factores: Sector (25%), Transaccion (25%), Pais (20%), Oportunidad (20%), Historial (10%)."
              ),
              // Score en vivo
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: 12, background: currentNivel === "Alto" ? C.dn + "15" : currentNivel === "Medio" ? C.wn + "15" : C.ac + "15", borderRadius: 10, marginBottom: 14, border: "1px solid " + (currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac) + "40" } },
                React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", border: "4px solid " + (currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac), display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" } },
                  React.createElement("div", { style: { fontSize: 18, fontWeight: 900, color: currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac } }, currentScore + "%")
                ),
                React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.tx } }, "Score: " + currentScore + "% — Riesgo " + currentNivel),
                  React.createElement("div", { style: { fontSize: 8, color: C.td } }, "Alto: < 45% | Medio: 45-69% | Bajo: >= 70%")
                ),
                React.createElement(Badge, { color: rc[currentNivel] }, currentNivel)
              ),
              // Factor sliders
              Object.keys(FACTORES_DD).map(function(k) {
                var f = FACTORES_DD[k]; var v = ddFactores[k];
                var barColor = v <= 2 ? C.ac : v <= 3 ? C.wn : C.dn;
                return React.createElement("div", { key: k, style: { marginBottom: 14, padding: 12, background: C.card, borderRadius: 8, border: "1px solid " + C.bd } },
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } },
                    React.createElement("div", null,
                      React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.tx } }, f.label),
                      React.createElement("div", { style: { fontSize: 8, color: C.td } }, f.ref + " | Peso: " + f.peso + "%")
                    ),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                      React.createElement("span", { style: { fontSize: 18, fontWeight: 900, color: barColor } }, v),
                      React.createElement("span", { style: { fontSize: 8, color: C.td } }, "/ 5")
                    )
                  ),
                  React.createElement("div", { style: { fontSize: 8, color: C.tm, marginBottom: 8 } }, f.desc),
                  React.createElement("input", { type: "range", min: 1, max: 5, step: 1, value: v,
                    onChange: function(e) { var val = parseInt(e.target.value); var key = k; setDDFactores(function(p) { var n = Object.assign({}, p); n[key] = val; return n; }); },
                    style: { width: "100%", accentColor: barColor, cursor: "pointer" }
                  }),
                  React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 4 } },
                    f.niveles.map(function(n, i) {
                      return React.createElement("span", { key: i, style: { fontSize: 7, color: i + 1 === v ? barColor : C.td, fontWeight: i + 1 === v ? 700 : 400, maxWidth: "18%", textAlign: "center", lineHeight: 1.2 } }, (i + 1) + ". " + n);
                    })
                  )
                );
              }),
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 14 } },
                React.createElement(Btn, { onClick: function() { setDDStep(0); } }, "\u2190 Anterior"),
                React.createElement(Btn, { primary: true, onClick: function() { setDDStep(2); } }, "Siguiente: Resultado \u2192")
              )
            ) : null,
            // Step 2: Resultado y medidas
            ddStep === 2 ? React.createElement("div", null,
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, padding: 16, background: C.sa, borderRadius: 12, marginBottom: 16 } },
                React.createElement("div", { style: { width: 70, height: 70, borderRadius: "50%", border: "5px solid " + (currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac), display: "flex", alignItems: "center", justifyContent: "center" } },
                  React.createElement("div", { style: { fontSize: 20, fontWeight: 900, color: currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac } }, currentScore + "%")
                ),
                React.createElement("div", { style: { flex: 1 } },
                  React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx } }, ddData.ent),
                  React.createElement("div", { style: { fontSize: 10, color: C.tm } }, ddData.tipo + " | " + ddData.sector + " | " + ddData.pais),
                  React.createElement("div", { style: { display: "flex", gap: 6, marginTop: 6 } },
                    React.createElement(Badge, { color: rc[currentNivel] }, "Riesgo " + currentNivel),
                    React.createElement(Badge, { color: ec[calcEstado(currentNivel)] }, calcEstado(currentNivel))
                  )
                )
              ),
              React.createElement("div", { style: { padding: 12, background: currentNivel === "Alto" ? C.dn + "12" : currentNivel === "Medio" ? C.wn + "12" : C.ac + "12", borderRadius: 8, marginBottom: 12, border: "1px solid " + (currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac) + "30" } },
                React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: currentNivel === "Alto" ? C.dn : currentNivel === "Medio" ? C.wn : C.ac, marginBottom: 4 } }, "Medidas de Mitigacion Requeridas"),
                React.createElement("div", { style: { fontSize: 10, color: C.tx, lineHeight: 1.5 } }, calcMedidas(currentNivel))
              ),
              React.createElement(InputField, { label: "Observaciones / Hallazgos", value: ddData.obs, onChange: function(v) { setDDData(function(p) { return Object.assign({}, p, { obs: v }); }); }, placeholder: "Documentar hallazgos relevantes de la evaluacion: PEPs, antecedentes, señales de alerta..." }),
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 14 } },
                React.createElement(Btn, { onClick: function() { setDDStep(1); } }, "\u2190 Anterior"),
                React.createElement(Btn, { primary: true, onClick: function() { if (ddData.ent) ddSave(); } }, React.createElement(Icons.Check), " Registrar Evaluacion DD")
              )
            ) : null
          )
        );
      }

      // ── Tabla registro principal ──
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 } },
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement(Badge, { color: "red" }, "Alto: " + ddReg.filter(function(d){return d.nivel==="Alto";}).length),
            React.createElement(Badge, { color: "yellow" }, "Medio: " + ddReg.filter(function(d){return d.nivel==="Medio";}).length),
            React.createElement(Badge, { color: "green" }, "Bajo: " + ddReg.filter(function(d){return d.nivel==="Bajo";}).length)
          ),
          React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
            rImpBtn("dd", "Analiza este documento de Due Diligence antisoborno y extrae datos en JSON array. Cada registro: ent (entidad), tipo (Proveedor/Cliente/Cliente Publico/Socio), sector, pais, ruc, transVal (valor transaccion), obs (observaciones). Solo JSON.", "Importar DD"),
            React.createElement(ExportXLSBtn, { onClick: function() { exportToXLS(["ID","Entidad","Tipo","Sector","Pais","RUC","Valor Trans.","Score %","Nivel Riesgo","Estado","Fecha","Observaciones","Medidas"], ddReg.map(function(r) { return [r.id, r.ent, r.tipo, r.sector, r.pais, r.ruc, r.transVal, r.score, r.nivel, r.est, r.fecha, r.obs, r.medidas]; }), "DueDiligence_ISO37001", "Due Diligence Antisoborno"); } }),
            React.createElement(Btn, { primary: true, onClick: function() { setShowDDForm(true); setDDStep(0); } }, React.createElement(Icons.Plus), " Nueva Evaluacion DD")
          ),
          rImpLoading("dd", "Analizando documento DD con IA..."),
          (function() { var _ds = gImpState("dd"); if (_ds.show && _ds.data.length > 0) { return rImpPreview("dd", ["Entidad","Tipo","Sector","Pais","RUC","Valor Trans.","Obs."], ["ent","tipo","sector","pais","ruc","transVal","obs"], ["text","select","text","text","text","text","text"], { tipo: ["Proveedor","Cliente","Cliente Publico","Socio"], _confirm: function() { gConfirmImp("dd", setDDReg, function(i) { return "DD-" + String(ddReg.length+i+1).padStart(3,"0"); }, {score:50,nivel:"Medio",est:"En revision",fecha:new Date().toISOString().slice(0,10),medidas:"Por definir",factores:{pais:3,sector:3,transaccion:3,oportunidad:3,historial:3}}); } }, C.pp); } return null; })()
        ),
        React.createElement(Card, { p: 0 },
          React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center" } },
            React.createElement("div", null,
              React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Registro Due Diligence Antisoborno"),
              React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "ISO 37001:2016 Cl. 8.2 | Debida diligencia proporcional al riesgo")
            )
          ),
          React.createElement("div", { style: { overflowX: "auto" } },
            React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
              React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
                ["ID","Entidad","Tipo","Sector","Riesgo","Score","Estado","Fecha","Acciones"].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", whiteSpace: "nowrap" } }, h); })
              )),
              React.createElement("tbody", null, ddReg.map(function(dd, i) {
                return React.createElement("tr", { key: dd.id, style: { borderBottom: "1px solid " + C.bd + "50" }, onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; } },
                  React.createElement("td", { style: { padding: "8px 6px", fontWeight: 700, color: C.i37, fontSize: 9 } }, dd.id),
                  React.createElement("td", { style: { padding: "8px 6px", fontWeight: 600, color: C.tx } }, dd.ent),
                  React.createElement("td", { style: { padding: "8px 6px", color: C.tm, fontSize: 9 } }, dd.tipo),
                  React.createElement("td", { style: { padding: "8px 6px", color: C.tm, fontSize: 9 } }, dd.sector),
                  React.createElement("td", { style: { padding: "8px 6px" } }, React.createElement(Badge, { color: rc[dd.nivel] }, dd.nivel)),
                  React.createElement("td", { style: { padding: "8px 6px" } },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4 } },
                      React.createElement(ProgressBar, { value: dd.score, color: dd.score >= 70 ? C.ac : dd.score >= 50 ? C.wn : C.dn }),
                      React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: dd.score >= 70 ? C.ac : dd.score >= 50 ? C.wn : C.dn } }, dd.score + "%")
                    )
                  ),
                  React.createElement("td", { style: { padding: "8px 6px" } }, React.createElement(Badge, { color: ec[dd.est] }, dd.est)),
                  React.createElement("td", { style: { padding: "8px 6px", color: C.tm, fontSize: 9, whiteSpace: "nowrap" } }, dd.fecha),
                  React.createElement("td", { style: { padding: "8px 6px" } },
                    React.createElement("div", { style: { display: "flex", gap: 3 } },
                      React.createElement("button", { onClick: function() { setDDDetail(dd); }, title: "Ver detalle completo",
                        style: { background: C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: C.pr, fontSize: 11 } }, React.createElement(Icons.Eye)),
                      React.createElement("button", { onClick: function() { downloadDDReport(dd); }, title: "Descargar informe",
                        style: { background: C.ac + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: C.ac, fontSize: 11 } }, React.createElement(Icons.Download))
                    )
                  )
                );
              }))
            )
          )
        )
      );
    }

    // ── Download DD Report ──
    function downloadDDReport(dd) {
      var nv = dd.nivel; var sc = dd.score;
      var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Informe DD - " + dd.ent + "</title><style>";
      html += "body{font-family:Calibri,Arial,sans-serif;margin:40px;color:#222;line-height:1.6;font-size:12px}";
      html += ".hdr{width:100%;border-collapse:collapse;border:2px solid #5b2c6f;margin-bottom:20px} .hdr td{border:1px solid #5b2c6f;padding:8px;vertical-align:middle}";
      html += "h1{color:#5b2c6f;border-bottom:2px solid #8e44ad;padding-bottom:6px;font-size:14px;margin-top:20px}";
      html += "h2{color:#8e44ad;font-size:12px;margin-top:14px}";
      html += "table{width:100%;border-collapse:collapse;margin:10px 0} th,td{border:1px solid #ddd;padding:6px 8px;text-align:left;font-size:11px} th{background:#5b2c6f;color:white;font-size:10px}";
      html += ".badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;color:white}";
      html += ".alto{background:#e74c3c} .medio{background:#f39c12} .bajo{background:#27ae60}";
      html += ".score{text-align:center;font-size:28px;font-weight:900;padding:12px;border-radius:50%;width:60px;height:60px;display:flex;align-items:center;justify-content:center;margin:10px auto}";
      html += "</style></head><body>";
      html += "<table class='hdr'><tr><td style='width:100px;text-align:center'><div style='font-size:20px;font-weight:900;color:#5b2c6f'>SIG 360</div><div style='font-size:7px;color:#666'>Sistema Integrado</div></td>";
      html += "<td style='text-align:center;font-size:14px;font-weight:700;color:#5b2c6f'>INFORME DE DEBIDA DILIGENCIA ANTISOBORNO<br><span style='font-size:10px;color:#666'>ISO 37001:2016 — Clausula 8.2</span></td>";
      html += "<td style='width:140px;font-size:10px;line-height:1.8'>Codigo: " + dd.id + "<br>Fecha: " + dd.fecha + "<br>Riesgo: <span class='badge " + nv.toLowerCase() + "'>" + nv + "</span><br>Score: " + sc + "%</td></tr></table>";
      html += "<h1>1. Datos de la Contraparte</h1>";
      html += "<table><tr><th>Campo</th><th>Valor</th></tr>";
      html += "<tr><td>Razon Social</td><td><strong>" + dd.ent + "</strong></td></tr>";
      html += "<tr><td>RUC / ID Fiscal</td><td>" + dd.ruc + "</td></tr>";
      html += "<tr><td>Tipo de Relacion</td><td>" + dd.tipo + "</td></tr>";
      html += "<tr><td>Sector Economico</td><td>" + dd.sector + "</td></tr>";
      html += "<tr><td>Pais / Jurisdiccion</td><td>" + dd.pais + "</td></tr>";
      html += "<tr><td>Contacto Principal</td><td>" + dd.contacto + "</td></tr>";
      html += "<tr><td>Valor de Transaccion</td><td>" + dd.transVal + "</td></tr></table>";
      html += "<h1>2. Valoracion de Riesgo de Soborno (ISO 37001 Cl. 4.5)</h1>";
      html += "<p>Metodologia: Ponderacion de 5 factores de riesgo antisoborno segun ISO 37001:2016. Cada factor se evalua en escala 1-5 (1=riesgo minimo, 5=riesgo maximo) y se pondera segun su peso relativo.</p>";
      html += "<table><tr><th>Factor de Riesgo</th><th>Ref. ISO</th><th>Peso</th><th>Nivel (1-5)</th><th>Descripcion</th></tr>";
      Object.keys(FACTORES_DD).forEach(function(k) {
        var f = FACTORES_DD[k]; var v = dd.factores[k] || 1;
        html += "<tr><td><strong>" + f.label + "</strong></td><td>" + f.ref + "</td><td>" + f.peso + "%</td><td style='text-align:center;font-weight:700;color:" + (v <= 2 ? "#27ae60" : v <= 3 ? "#f39c12" : "#e74c3c") + "'>" + v + "</td><td style='font-size:9px'>" + f.niveles[v - 1] + "</td></tr>";
      });
      html += "</table>";
      html += "<h1>3. Resultado de la Evaluacion</h1>";
      html += "<div style='display:flex;align-items:center;gap:20px;padding:16px;background:#f8f9fa;border-radius:8px;border-left:4px solid " + (nv === "Alto" ? "#e74c3c" : nv === "Medio" ? "#f39c12" : "#27ae60") + "'>";
      html += "<div class='score' style='border:4px solid " + (nv === "Alto" ? "#e74c3c" : nv === "Medio" ? "#f39c12" : "#27ae60") + ";color:" + (nv === "Alto" ? "#e74c3c" : nv === "Medio" ? "#f39c12" : "#27ae60") + "'>" + sc + "%</div>";
      html += "<div><div style='font-size:14px;font-weight:700'>Nivel de Riesgo: <span class='badge " + nv.toLowerCase() + "'>" + nv + "</span></div>";
      html += "<div style='font-size:10px;color:#666;margin-top:4px'>Estado: " + dd.est + "</div></div></div>";
      html += "<h2>Escala de Valoracion</h2>";
      html += "<table><tr><th>Rango Score</th><th>Nivel</th><th>Tipo de DD</th><th>Frecuencia Revision</th></tr>";
      html += "<tr><td>70-100%</td><td><span class='badge bajo'>Bajo</span></td><td>DD estandar</td><td>Bienal</td></tr>";
      html += "<tr><td>45-69%</td><td><span class='badge medio'>Medio</span></td><td>DD mejorada</td><td>Anual</td></tr>";
      html += "<tr><td>0-44%</td><td><span class='badge alto'>Alto</span></td><td>DD reforzada</td><td>Trimestral</td></tr></table>";
      html += "<h1>4. Medidas de Mitigacion</h1><p>" + (dd.medidas || "Medidas estandar segun nivel de riesgo.") + "</p>";
      html += "<h1>5. Observaciones y Hallazgos</h1><p>" + (dd.obs || "Sin observaciones relevantes.") + "</p>";
      html += "<h1>6. Firmas</h1>";
      html += "<table><tr><th style='width:33%'>Evaluador</th><th style='width:33%'>Compliance Officer</th><th style='width:33%'>Alta Direccion</th></tr>";
      html += "<tr style='height:60px'><td></td><td></td><td></td></tr>";
      html += "<tr><td style='font-size:9px'>Nombre / Firma / Fecha</td><td style='font-size:9px'>Nombre / Firma / Fecha</td><td style='font-size:9px'>Nombre / Firma / Fecha</td></tr></table>";
      html += "<div style='margin-top:30px;padding-top:10px;border-top:1px solid #ddd;font-size:8px;color:#888;text-align:center'>Informe generado por SIG Construccion 360 v7.0 Enterprise | ISO 37001:2016 | " + dd.id + " | " + new Date().toISOString().slice(0,10) + "</div>";
      html += "</body></html>";
      var wordHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->" + html.substring(html.indexOf("<style"), html.indexOf("</head>")) + "</head>" + html.substring(html.indexOf("<body"));
      var blob = new Blob(["\ufeff" + wordHtml], { type: "application/msword" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a"); a.href = url; a.download = dd.id + "_DD_" + dd.ent.replace(/\s+/g, "_") + ".doc";
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    }

    function CEView() {
      return React.createElement("div", null,
        React.createElement("div", { style: { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" } },
          React.createElement(KPICard, { icon: React.createElement(Icons.Shield), label: "Total 2025", value: "7", glow: C.i37 }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Check), label: "Resueltas", value: "6", sub: "85.7%", glow: C.ac }),
          React.createElement(KPICard, { icon: React.createElement(Icons.Clock), label: "Tiempo Prom.", value: "13d", glow: C.pr })
        ),
        React.createElement(Card, { p: 0 },
          React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd } }, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Canal Etico — Denuncias"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Cl. 8.9 | Ley 30424")),
          denuncias.map(function(d, i) {
            var rc2 = {Alto:C.dn,Medio:C.wn,Bajo:C.ac};
            return React.createElement("div", { key: i, style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd + "50", borderLeft: "3px solid " + rc2[d.riesgo] } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } },
                React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
                  React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: C.pr } }, d.id),
                  React.createElement(Badge, { color: d.est === "Resuelto" ? "green" : "yellow" }, d.est),
                  React.createElement(Badge, { color: d.riesgo === "Alto" ? "red" : d.riesgo === "Medio" ? "yellow" : "green" }, d.riesgo)
                ),
                React.createElement("span", { style: { fontSize: 9, color: C.td } }, d.fecha)
              ),
              React.createElement("div", { style: { fontSize: 11, color: C.tx } }, d.tipo),
              React.createElement("div", { style: { fontSize: 9, color: C.tm, marginTop: 2 } }, "Canal: " + d.canal + (d.dias ? " | " + d.dias + " dias" : " | En curso"))
            );
          })
        )
      );
    }

    function RiesView() {
      return React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd } }, React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Mapa de Riesgos de Soborno"), React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Cl. 4.5 | NRP = P x I")),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } }, ["Riesgo","P","I","NRP","Control","Residual"].map(function(h) { return React.createElement("th", { key: h, style: { padding: "10px 8px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase" } }, h); }))),
            React.createElement("tbody", null, riesgos.map(function(r, i) {
              return React.createElement("tr", { key: i, style: { borderBottom: "1px solid " + C.bd + "50" }, onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; } },
                React.createElement("td", { style: { padding: "8px", fontWeight: 500, color: C.tx, maxWidth: 220 } }, r.r),
                React.createElement("td", { style: { padding: "8px", color: C.wn, fontWeight: 700, textAlign: "center" } }, r.prob),
                React.createElement("td", { style: { padding: "8px", color: C.dn, fontWeight: 700, textAlign: "center" } }, r.imp),
                React.createElement("td", { style: { padding: "8px", fontWeight: 800, color: r.nrp >= 12 ? C.dn : r.nrp >= 6 ? C.wn : C.ac, textAlign: "center" } }, r.nrp),
                React.createElement("td", { style: { padding: "8px", color: C.tm, fontSize: 9 } }, r.ctrl),
                React.createElement("td", { style: { padding: "8px" } }, React.createElement(Badge, { color: r.res === "Medio" ? "yellow" : "green" }, r.res))
              );
            }))
          )
        )
      );
    }

    return React.createElement("div", null,
      React.createElement(TabBar, { tabs: tabs, active: abTab, onChange: setAbTab }),
      abTab === "dashboard-ab" ? ABDash() : null,
      abTab === "due-diligence" ? DDView() : null,
      abTab === "canal-etico" ? CEView() : null,
      abTab === "riesgos-ab" ? RiesView() : null,
      abTab === "db-ab" ? React.createElement(EditableDBView, {
        title: "Base de Datos ISO 37001 — Antisoborno",
        color: C.i37,
        columns: ["Indicador","Clausula","Meta","Resultado","Estado"],
        rows: [
          {id:1,vals:["Due Diligence completadas","8.2",">=60/anio",String(ddReg.length),"Cumple"]},
          {id:2,vals:["Denuncias canal etico","8.9","Seguimiento 100%","7 (86% resueltas)","En proceso"]},
          {id:3,vals:["Capacitacion antisoborno","7.3",">=90%","94%","Cumple"]},
          {id:4,vals:["Riesgo residual promedio","4.5","Bajo","Bajo","Cumple"]},
          {id:5,vals:["Cumplimiento Ley 30424","All",">=75%","78%","En proceso"]},
          {id:6,vals:["Declaraciones juradas","7.5","100% personal clave","92%","En proceso"]},
          {id:7,vals:["Proveedores evaluados","8.2",">=80% criticos","85%","Cumple"]},
          {id:8,vals:["Tiempo resolucion denuncias","8.9","<=20 dias","13 dias","Cumple"]},
        ]
      }) : null
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // LISTA MAESTRA DE DOCUMENTOS
  // ═══════════════════════════════════════════════════════════════════════
  function ListaMaestraView() {
    // Lista Maestra usa la MISMA base de datos que Control Documental
    var filtered = docsDB.filter(function(d) {
      var matchSearch = !mlSearch || d.name.toLowerCase().indexOf(mlSearch.toLowerCase()) >= 0 || d.id.toLowerCase().indexOf(mlSearch.toLowerCase()) >= 0;
      var matchFilter = mlFilter === "all" || d.iso === mlFilter || d.status === mlFilter;
      return matchSearch && matchFilter;
    });

    var isoColor = { "9001": "blue", "14001": "green", "45001": "yellow", "37001": "purple", multi: "cyan" };
    var statusColor = { vigente: "green", revision: "yellow", abierto: "red" };
    var pdcaColor = { P: "blue", D: "green", C: "yellow", A: "purple" };
    var vigentes = filtered.filter(function(d) { return d.status === "vigente"; }).length;
    var revision = filtered.filter(function(d) { return d.status === "revision"; }).length;
    var conArchivo = filtered.filter(function(d) { return d._hasFile; }).length;

    return React.createElement("div", null,
      // Search + Filter bar
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 } },
        React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
          React.createElement("div", { style: { position: "relative" } },
            React.createElement("input", { placeholder: "Buscar documento...", value: mlSearch,
              onChange: function(e) { var v=e.target.value; setMlSearch(v); },
              style: { padding: "8px 12px 8px 32px", borderRadius: 8, border: "1px solid " + C.bd, background: C.sa, color: C.tx, fontSize: 11, fontFamily: "inherit", width: 220 }
            }),
            React.createElement("div", { style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.td } }, React.createElement(Icons.Search))
          ),
          React.createElement("select", {
            value: mlFilter, onChange: function(e) { var v=e.target.value; setMlFilter(v); },
            style: { padding: "8px 12px", borderRadius: 8, border: "1px solid " + C.bd, background: C.sa, color: C.tx, fontSize: 11, fontFamily: "inherit" }
          },
            React.createElement("option", { value: "all" }, "Todos"),
            React.createElement("option", { value: "9001" }, "ISO 9001"),
            React.createElement("option", { value: "14001" }, "ISO 14001"),
            React.createElement("option", { value: "45001" }, "ISO 45001"),
            React.createElement("option", { value: "37001" }, "ISO 37001"),
            React.createElement("option", { value: "vigente" }, "Vigentes"),
            React.createElement("option", { value: "revision" }, "En Revision")
          )
        ),
        React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
          React.createElement(Badge, { color: "cyan" }, "Total: " + filtered.length),
          React.createElement(Badge, { color: "green" }, "Vigentes: " + vigentes),
          conArchivo > 0 ? React.createElement(Badge, { color: "blue" }, "\uD83D\uDCC2 Con archivo: " + conArchivo) : null
        )
      ),
      // Info banner — integration
      React.createElement("div", { style: { padding: "8px 14px", background: C.pr + "10", borderRadius: 8, marginBottom: 12, display: "flex", alignItems: "center", gap: 8, border: "1px solid " + C.pr + "30" } },
        React.createElement("span", { style: { fontSize: 14 } }, "\uD83D\uDD17"),
        React.createElement("span", { style: { fontSize: 9, color: C.tx } }, "Integrado con Control Documental — Los documentos importados aparecen automaticamente aqui con todos sus campos y archivos adjuntos.")
      ),
      // Table
      React.createElement(Card, { p: 0 },
        React.createElement("div", { style: { padding: "12px 16px", borderBottom: "1px solid " + C.bd, display: "flex", justifyContent: "space-between", alignItems: "center" } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, "Lista Maestra de Documentos del SIG"),
            React.createElement("div", { style: { fontSize: 9, color: C.td } }, "ISO 9001 Cl.7.5 | Control de informacion documentada | Fuente unica integrada")
          ),
          React.createElement("div", { style: { display: "flex", gap: 6 } },
            React.createElement(Badge, { color: "green" }, "Vigentes: " + vigentes),
            React.createElement(Badge, { color: "yellow" }, "Revision: " + revision)
          )
        ),
        React.createElement("div", { style: { overflowX: "auto" } },
          React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 10 } },
            React.createElement("thead", null, React.createElement("tr", { style: { borderBottom: "1px solid " + C.bd } },
              ["#", "Codigo", "Documento", "ISO", "Area", "PDCA", "Version", "Fecha", "Estado", "Origen", "Responsable", "Acciones"].map(function(h) {
                return React.createElement("th", { key: h, style: { padding: "10px 6px", textAlign: "left", fontSize: 8, fontWeight: 700, color: C.td, textTransform: "uppercase", whiteSpace: "nowrap" } }, h);
              })
            )),
            React.createElement("tbody", null, filtered.map(function(d, idx) {
              return React.createElement("tr", { key: d.id + "-" + idx, style: { borderBottom: "1px solid " + C.bd + "50" },
                onMouseEnter: function(e) { e.currentTarget.style.background = C.cardH; }, onMouseLeave: function(e) { e.currentTarget.style.background = "transparent"; } },
                React.createElement("td", { style: { padding: "6px", color: C.td, fontSize: 9 } }, d.mlId || idx + 1),
                React.createElement("td", { style: { padding: "6px", fontWeight: 700, color: C.pr, whiteSpace: "nowrap" } }, d.id),
                React.createElement("td", { style: { padding: "6px", fontWeight: 600, color: C.tx, maxWidth: 200 } }, d.name),
                React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: isoColor[d.iso] || "cyan" }, d.iso === "multi" ? "Multi" : d.iso)),
                React.createElement("td", { style: { padding: "6px", color: C.tm, fontSize: 9 } }, d.area),
                React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: pdcaColor[d.pdca] || "blue" }, d.pdca)),
                React.createElement("td", { style: { padding: "6px", color: C.cy, fontWeight: 600 } }, "v" + d.version),
                React.createElement("td", { style: { padding: "6px", color: C.tm, whiteSpace: "nowrap", fontSize: 9 } }, d.date),
                React.createElement("td", { style: { padding: "6px" } }, React.createElement(Badge, { color: statusColor[d.status] || "blue" }, d.status)),
                React.createElement("td", { style: { padding: "6px", fontSize: 8 } },
                  d._hasFile ? React.createElement(Badge, { color: "green" }, "\uD83D\uDCC2 " + (d._fileType || "Archivo"))
                  : React.createElement("span", { style: { color: C.tm } }, d.origen || "Sistema")
                ),
                React.createElement("td", { style: { padding: "6px", color: C.tm, fontSize: 9 } }, d.responsable || "Coord. SIG"),
                React.createElement("td", { style: { padding: "6px" } },
                  React.createElement("div", { style: { display: "flex", gap: 3 } },
                    React.createElement("button", { onClick: function() { setPreviewDoc(d); }, title: "Vista previa",
                      style: { background: C.pr + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: C.pr, fontSize: 11 } }, React.createElement(Icons.Eye)),
                    React.createElement("button", { onClick: function() { downloadDoc(d); }, title: d._hasFile ? "Descargar " + (d._fileType || "archivo") + " original" : "Descargar Word",
                      style: { background: C.ac + "18", border: "none", borderRadius: 4, padding: "4px 7px", cursor: "pointer", color: C.ac, fontSize: 11 } }, React.createElement(Icons.Download))
                  )
                )
              );
            }))
          )
        )
      ),
      // Preview Modal (reuses the same previewDoc state and logic as DocumentsView)
      React.createElement(Modal, {
        open: !!previewDoc, onClose: function() { setPreviewDoc(null); },
        title: previewDoc ? previewDoc.name : "", wide: true
      },
        previewDoc ? React.createElement("div", null,
          React.createElement("div", {
            style: { display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", padding: 10, background: C.sa, borderRadius: 10, alignItems: "center" }
          },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: C.pr } }, previewDoc.id),
            React.createElement(Badge, { color: isoColor[previewDoc.iso] || "blue" }, "ISO " + previewDoc.iso),
            React.createElement("div", { style: { fontSize: 10, color: C.tx } }, "v" + previewDoc.version + " | " + previewDoc.date),
            previewDoc._hasFile ? React.createElement(Badge, { color: "green" }, "\uD83D\uDCC2 " + (previewDoc._fileName || "Archivo")) : React.createElement(Badge, { color: "yellow" }, "Plantilla"),
            previewDoc._fileSize ? React.createElement("div", { style: { fontSize: 8, color: C.td } }, (previewDoc._fileSize / 1024).toFixed(0) + " KB") : null
          ),
          previewDoc._dataUrl ?
            React.createElement("iframe", { src: previewDoc._dataUrl, style: { width: "100%", height: "65vh", border: "1px solid " + C.bd, borderRadius: 8, background: "#fff" } })
          :
            React.createElement("iframe", { srcDoc: generateDocHTML(previewDoc), style: { width: "100%", height: "55vh", border: "1px solid " + C.bd, borderRadius: 8, background: "#fff" } }),
          React.createElement("div", { style: { display: "flex", gap: 8, justifyContent: "space-between", marginTop: 12, alignItems: "center" } },
            React.createElement(Btn, { primary: true, onClick: function() { downloadDoc(previewDoc); } }, React.createElement(Icons.Download), previewDoc._hasFile ? " Descargar " + (previewDoc._fileType || "Archivo") + " Original" : " Descargar Word"),
            React.createElement(Btn, { onClick: function() { setPreviewDoc(null); } }, "Cerrar")
          )
        ) : null
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RECURSOS PDCA — DOCUMENTOS DESCARGABLES
  // ═══════════════════════════════════════════════════════════════════════
  function RecursosView() {
    var pdcaDocs = {
      P: [
        { id: "REC-P01", name: "Politica Integrada SIG", desc: "Politica de calidad, medio ambiente, SST y antisoborno", iso: "multi" },
        { id: "REC-P02", name: "Manual del SIG", desc: "Manual del sistema integrado de gestion", iso: "9001" },
        { id: "REC-P03", name: "Mapa de Procesos", desc: "Interaccion de procesos Core/Soporte/Estrategicos", iso: "9001" },
        { id: "REC-P04", name: "Matriz IPERC Linea Base", desc: "Identificacion de peligros y evaluacion de riesgos", iso: "45001" },
        { id: "REC-P05", name: "Matriz de Aspectos Ambientales", desc: "Identificacion y evaluacion de aspectos ambientales", iso: "14001" },
        { id: "REC-P06", name: "Matriz de Riesgos de Soborno", desc: "Evaluacion de riesgos de soborno por area", iso: "37001" },
        { id: "REC-P07", name: "Objetivos SIG y Programas", desc: "Objetivos medibles por norma y programa de gestion", iso: "multi" },
        { id: "REC-P08", name: "Plan Anual de SST", desc: "Programa anual de seguridad y salud en el trabajo", iso: "45001" },
      ],
      D: [
        { id: "REC-D01", name: "Procedimiento Control Documentos", desc: "Creacion, revision, aprobacion y distribucion de documentos", iso: "9001" },
        { id: "REC-D02", name: "Procedimiento PETAR", desc: "Permiso escrito para trabajos de alto riesgo", iso: "45001" },
        { id: "REC-D03", name: "Procedimiento Gestion Residuos", desc: "Segregacion, almacenamiento y disposicion de residuos", iso: "14001" },
        { id: "REC-D04", name: "Procedimiento Due Diligence", desc: "Evaluacion de contrapartes para prevencion de soborno", iso: "37001" },
        { id: "REC-D05", name: "Procedimiento Compras", desc: "Evaluacion y seleccion de proveedores", iso: "9001" },
        { id: "REC-D06", name: "Procedimiento LOTO", desc: "Bloqueo y etiquetado de energias peligrosas", iso: "45001" },
        { id: "REC-D07", name: "Instructivo ATS", desc: "Analisis de trabajo seguro antes de actividades criticas", iso: "45001" },
        { id: "REC-D08", name: "Procedimiento Canal de Denuncias", desc: "Recepcion e investigacion de denuncias eticas", iso: "37001" },
      ],
      C: [
        { id: "REC-C01", name: "Informe Auditoria Interna", desc: "Modelo de informe de auditoria del SIG", iso: "multi" },
        { id: "REC-C02", name: "Registro Monitoreo Ambiental", desc: "Formato para registro de mediciones ambientales", iso: "14001" },
        { id: "REC-C03", name: "Formato Inspeccion SST", desc: "Checklist de inspecciones de seguridad", iso: "45001" },
        { id: "REC-C04", name: "Registro Satisfaccion Cliente", desc: "Encuesta y tabulacion de satisfaccion", iso: "9001" },
        { id: "REC-C05", name: "Informe Revision por la Direccion", desc: "Acta y seguimiento de revision gerencial", iso: "multi" },
        { id: "REC-C06", name: "Registro Investigacion Incidentes", desc: "Formato de investigacion de accidentes/incidentes", iso: "45001" },
      ],
      A: [
        { id: "REC-A01", name: "Solicitud de Accion Correctiva", desc: "Formato SAC con analisis de causa raiz", iso: "9001" },
        { id: "REC-A02", name: "Plan de Mejora Continua", desc: "Propuestas y seguimiento de mejoras", iso: "multi" },
        { id: "REC-A03", name: "Informe Accion Preventiva", desc: "Analisis y prevencion de potenciales no conformidades", iso: "9001" },
        { id: "REC-A04", name: "Registro Leccion Aprendida", desc: "Documentacion de lecciones aprendidas del proyecto", iso: "multi" },
      ],
    };

    var pdcaInfo = {
      P: { label: "PLANIFICAR (Plan)", color: C.pr, desc: "Documentos de planificacion estrategica y operativa" },
      D: { label: "HACER (Do)", color: C.ac, desc: "Procedimientos, instructivos y documentos operativos" },
      C: { label: "VERIFICAR (Check)", color: C.wn, desc: "Registros de monitoreo, inspeccion y auditoria" },
      A: { label: "ACTUAR (Act)", color: C.pp, desc: "Acciones correctivas, preventivas y mejora continua" },
    };

    var pdcaTab = pdcaTabR, setPdcaTab = setPdcaTabR;

    function generatePDCADoc(doc) {
      var phase = doc.id.charAt(4);
      var isoLabel = doc.iso === "multi" ? "ISO 9001, ISO 14001, ISO 45001, ISO 37001" : "ISO " + doc.iso;
      var phaseLabel = { P: "PLANIFICAR (Plan)", D: "HACER (Do)", C: "VERIFICAR (Check)", A: "ACTUAR (Act)" }[phase] || "PDCA";
      var fecha = new Date().toISOString().slice(0,10);

      // Contenido específico según tipo de documento y norma
      var contenido = getDocContent(doc, phase);

      var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>" + doc.name + "</title>";
      html += "<style>";
      html += "@page { size: A4; margin: 2cm; }";
      html += "body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; margin: 40px; color: #222; line-height: 1.6; font-size: 12px; }";
      html += ".header-table { width: 100%; border-collapse: collapse; border: 2px solid #1a5276; margin-bottom: 20px; }";
      html += ".header-table td { border: 1px solid #1a5276; padding: 8px; vertical-align: middle; }";
      html += ".logo-cell { width: 120px; text-align: center; }";
      html += ".title-cell { text-align: center; font-size: 14px; font-weight: bold; color: #1a5276; }";
      html += ".info-cell { width: 160px; font-size: 10px; line-height: 1.8; }";
      html += "h1 { color: #1a5276; border-bottom: 2px solid #2d7ff9; padding-bottom: 8px; font-size: 14px; margin-top: 24px; page-break-after: avoid; }";
      html += "h2 { color: #2d7ff9; font-size: 13px; margin-top: 18px; page-break-after: avoid; }";
      html += "h3 { color: #444; font-size: 12px; margin-top: 14px; }";
      html += "table { width: 100%; border-collapse: collapse; margin: 12px 0; page-break-inside: auto; }";
      html += "th, td { border: 1px solid #bbb; padding: 6px 8px; text-align: left; font-size: 11px; }";
      html += "th { background: #2d7ff9; color: white; font-weight: bold; font-size: 10px; }";
      html += ".section { margin: 14px 0; padding: 12px 16px; background: #f0f4f8; border-radius: 6px; border-left: 4px solid #2d7ff9; }";
      html += ".note { background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px 14px; margin: 12px 0; border-radius: 4px; font-size: 11px; }";
      html += ".pdca-badge { display: inline-block; padding: 3px 12px; border-radius: 4px; font-weight: bold; font-size: 11px; color: white; }";
      html += ".footer { margin-top: 40px; border-top: 2px solid #1a5276; padding-top: 12px; font-size: 9px; color: #666; }";
      html += ".signatures { display: flex; justify-content: space-between; margin-top: 50px; }";
      html += ".sig-block { text-align: center; width: 28%; border-top: 1px solid #333; padding-top: 8px; font-size: 10px; }";
      html += "ul, ol { margin: 8px 0; padding-left: 24px; }";
      html += "li { margin-bottom: 4px; }";
      html += ".watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-45deg); font-size: 80px; color: rgba(0,0,0,0.03); font-weight: bold; z-index: -1; }";
      html += "</style></head><body>";
      html += "<div class='watermark'>SIG 360</div>";

      // Encabezado tipo ISO
      html += "<table class='header-table'><tr>";
      html += "<td class='logo-cell' rowspan='3'><div style='width:100px;height:50px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;color:#999;font-size:10px'>[LOGO EMPRESA]</div></td>";
      html += "<td class='title-cell' rowspan='3'>" + doc.name.toUpperCase() + "<br><span style='font-size:10px;color:#555'>Sistema Integrado de Gestion</span></td>";
      html += "<td class='info-cell'>Codigo: <b>" + doc.id + "</b></td></tr>";
      html += "<tr><td class='info-cell'>Version: <b>01</b> | Fecha: <b>" + fecha + "</b></td></tr>";
      html += "<tr><td class='info-cell'>Paginas: 1 de 8 | <span class='pdca-badge' style='background:" + ({ P: "#2d7ff9", D: "#00d68f", C: "#ffb020", A: "#8c6bfa" }[phase] || "#2d7ff9") + "'>" + phase + " - " + phaseLabel.split(" ")[0] + "</span></td></tr></table>";

      // Cuerpo del documento
      html += "<h1>1. OBJETIVO</h1>";
      html += contenido.objetivo;

      html += "<h1>2. ALCANCE</h1>";
      html += contenido.alcance;

      html += "<h1>3. REFERENCIAS NORMATIVAS</h1>";
      html += "<table><tr><th>Norma / Documento</th><th>Titulo / Descripcion</th></tr>";
      contenido.referencias.forEach(function(r) { html += "<tr><td><b>" + r[0] + "</b></td><td>" + r[1] + "</td></tr>"; });
      html += "</table>";

      html += "<h1>4. DEFINICIONES Y ABREVIATURAS</h1>";
      html += contenido.definiciones;

      html += "<h1>5. RESPONSABILIDADES</h1>";
      html += "<table><tr><th>Cargo / Funcion</th><th>Responsabilidad</th></tr>";
      contenido.responsabilidades.forEach(function(r) { html += "<tr><td><b>" + r[0] + "</b></td><td>" + r[1] + "</td></tr>"; });
      html += "</table>";

      html += "<h1>6. DESARROLLO / CONTENIDO</h1>";
      html += contenido.desarrollo;

      html += "<h1>7. REGISTROS ASOCIADOS</h1>";
      html += "<table><tr><th>Codigo</th><th>Nombre del Registro</th><th>Responsable</th><th>Retencion</th><th>Medio</th></tr>";
      contenido.registros.forEach(function(r) { html += "<tr><td><b>" + r[0] + "</b></td><td>" + r[1] + "</td><td>" + r[2] + "</td><td>" + r[3] + "</td><td>" + r[4] + "</td></tr>"; });
      html += "</table>";

      html += "<h1>8. ANEXOS</h1>";
      html += contenido.anexos;

      html += "<h1>9. CONTROL DE CAMBIOS</h1>";
      html += "<table><tr><th>Version</th><th>Fecha</th><th>Descripcion del Cambio</th><th>Elaborado</th><th>Aprobado</th></tr>";
      html += "<tr><td>01</td><td>" + fecha + "</td><td>Emision inicial del documento</td><td>Coord. SIG</td><td>Gerencia General</td></tr></table>";

      // Firmas
      html += "<div class='signatures'>";
      html += "<div class='sig-block'><br><br><br>_________________<br><b>Elaborado por</b><br>Coordinador SIG</div>";
      html += "<div class='sig-block'><br><br><br>_________________<br><b>Revisado por</b><br>Jefe de Area</div>";
      html += "<div class='sig-block'><br><br><br>_________________<br><b>Aprobado por</b><br>Gerente General</div>";
      html += "</div>";

      html += "<div class='footer'>DOCUMENTO CONFIDENCIAL — SIG Construccion 360 v7.0 Enterprise<br>";
      html += "Norma(s): " + isoLabel + " | Ciclo PDCA: " + phaseLabel + " | Codigo: " + doc.id + "<br>";
      html += "Prohibida la reproduccion total o parcial sin autorizacion. Copia no controlada si se imprime.</div>";
      html += "</body></html>";
      return html;
    }

    function getDocContent(doc, phase) {
      var isoLabel = doc.iso === "multi" ? "ISO 9001, ISO 14001, ISO 45001, ISO 37001" : "ISO " + doc.iso;
      var isoReqs = {
        "9001": [["ISO 9001:2015", "Sistemas de gestion de la calidad — Requisitos"], ["ISO 9000:2015", "Fundamentos y vocabulario"], ["ISO 19011:2018", "Directrices para la auditoria de sistemas de gestion"]],
        "14001": [["ISO 14001:2015", "Sistemas de gestion ambiental — Requisitos"], ["ISO 14004:2016", "Directrices generales sobre la implementacion"], ["Ley 28611", "Ley General del Ambiente (Peru)"], ["D.S. 017-2015-PRODUCE", "Reglamento de Gestion Ambiental"]],
        "45001": [["ISO 45001:2018", "Sistemas de gestion SST — Requisitos"], ["Ley 29783", "Ley de Seguridad y Salud en el Trabajo (Peru)"], ["D.S. 005-2012-TR", "Reglamento de la Ley 29783"], ["R.M. 050-2013-TR", "Formatos referenciales SGSST"]],
        "37001": [["ISO 37001:2016", "Sistemas de gestion antisoborno — Requisitos"], ["Ley 30424", "Responsabilidad administrativa de personas juridicas (Peru)"], ["D.L. 1352", "Ampliacion de responsabilidad administrativa"], ["Ley 27693", "Sistema de prevencion del lavado de activos"]],
        "multi": [["ISO 9001:2015", "Calidad"], ["ISO 14001:2015", "Medio Ambiente"], ["ISO 45001:2018", "SST"], ["ISO 37001:2016", "Antisoborno"], ["Ley 29783 / Ley 28611", "Legislacion peruana aplicable"]]
      };

      var base = {
        objetivo: "<p>Establecer los lineamientos, metodologia y criterios para " + doc.desc.toLowerCase() + " dentro del marco del Sistema Integrado de Gestion (SIG), asegurando el cumplimiento de los requisitos de " + isoLabel + " y la legislacion peruana aplicable al sector construccion.</p>",
        alcance: "<p>Este documento aplica a todas las actividades, procesos y personal involucrado en " + doc.desc.toLowerCase() + " en todas las sedes, proyectos y obras de la organizacion. Incluye personal propio, contratistas y subcontratistas bajo el control operacional de la empresa.</p>",
        referencias: (isoReqs[doc.iso] || isoReqs["multi"]).concat([["Politica Integrada SIG", "Politica de calidad, ambiente, SST y antisoborno"], ["Manual del SIG", "Manual del sistema integrado de gestion"]]),
        definiciones: "<table><tr><th>Termino</th><th>Definicion</th></tr>" +
          "<tr><td><b>SIG</b></td><td>Sistema Integrado de Gestion (Calidad + Ambiente + SST + Antisoborno)</td></tr>" +
          "<tr><td><b>No Conformidad</b></td><td>Incumplimiento de un requisito normativo o legal</td></tr>" +
          "<tr><td><b>Accion Correctiva</b></td><td>Accion para eliminar la causa de una no conformidad detectada</td></tr>" +
          "<tr><td><b>Riesgo</b></td><td>Efecto de la incertidumbre (ISO 31000)</td></tr>" +
          "<tr><td><b>Parte Interesada</b></td><td>Persona u organizacion que puede afectar o verse afectada por las actividades</td></tr>" +
          "<tr><td><b>PDCA</b></td><td>Ciclo Planificar-Hacer-Verificar-Actuar (mejora continua)</td></tr></table>",
        responsabilidades: [
          ["Alta Direccion", "Aprobar el documento, asignar recursos y demostrar liderazgo y compromiso con el SIG"],
          ["Representante de la Direccion", "Supervisar la implementacion y reportar el desempeno del SIG"],
          ["Coordinador SIG", "Elaborar, revisar, actualizar y difundir el documento; asegurar su control"],
          ["Jefes de Area / Supervisores", "Implementar los lineamientos en sus areas; verificar el cumplimiento en campo"],
          ["Trabajadores y Contratistas", "Cumplir los lineamientos establecidos; reportar desviaciones e incidentes"]
        ],
        desarrollo: "<div class='section'><h2>6.1 Generalidades</h2><p>" + doc.desc + ". Este documento establece los controles operacionales necesarios para asegurar la conformidad con los requisitos normativos y legales aplicables.</p></div>" +
          "<div class='section'><h2>6.2 Procedimiento / Metodologia</h2><p>[Desarrollar el contenido especifico del documento segun su naturaleza: pasos, diagramas de flujo, criterios de evaluacion, formulas, matrices, etc.]</p>" +
          "<div class='note'>NOTA: Completar esta seccion con el contenido tecnico especifico del documento. Puede incluir diagramas de flujo, matrices de evaluacion, formatos, instrucciones paso a paso, criterios de aceptacion, entre otros.</div></div>" +
          "<div class='section'><h2>6.3 Controles Operacionales</h2>" +
          "<table><tr><th>Control</th><th>Frecuencia</th><th>Responsable</th><th>Registro</th></tr>" +
          "<tr><td>Verificacion de cumplimiento</td><td>Mensual</td><td>Coordinador SIG</td><td>" + doc.id + "-R01</td></tr>" +
          "<tr><td>Inspeccion en campo</td><td>Semanal</td><td>Supervisor</td><td>" + doc.id + "-R02</td></tr>" +
          "<tr><td>Revision por la direccion</td><td>Semestral</td><td>Alta Direccion</td><td>RXD-001</td></tr></table></div>" +
          "<div class='section'><h2>6.4 Comunicacion y Difusion</h2><p>Este documento sera difundido a todo el personal involucrado mediante capacitaciones, charlas de induccion y publicacion en el servidor documental del SIG. Se mantendra registro de la difusion.</p></div>",
        registros: [
          [doc.id + "-R01", "Registro de verificacion / cumplimiento", "Coord. SIG", "3 anios", "Digital / Fisico"],
          [doc.id + "-R02", "Registro de inspeccion en campo", "Supervisor", "3 anios", "Digital / Fisico"],
          [doc.id + "-R03", "Registro de capacitacion / difusion", "RRHH / SIG", "5 anios", "Digital"],
          [doc.id + "-R04", "Lista de asistencia", "Coord. SIG", "3 anios", "Fisico"]
        ],
        anexos: "<p>Se adjuntan los siguientes anexos como referencia:</p><ul><li>Anexo 1: Formato de registro principal (" + doc.id + "-R01)</li><li>Anexo 2: Diagrama de flujo del proceso</li><li>Anexo 3: Lista de verificacion aplicable</li></ul>"
      };
      return base;
    }

    var pdcaPreviewDoc = pdcaPreviewDocR, setPdcaPreviewDoc = setPdcaPreviewDocR;
    var pdcaPreviewHTML = pdcaPreviewHTMLR, setPdcaPreviewHTML = setPdcaPreviewHTMLR;

    function downloadPDCA(doc, format) {
      var html = generatePDCADoc(doc);
      if (format === "word") {
        var wordHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='UTF-8'><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->" + html.substring(html.indexOf("<style"), html.indexOf("</head>")) + "</head>" + html.substring(html.indexOf("<body"));
        var blob = new Blob(["\ufeff" + wordHtml], { type: "application/msword" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a"); a.href = url;
        a.download = doc.id + "_" + doc.name.replace(/\s+/g, "_") + ".doc";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        var blob = new Blob([html], { type: "text/html" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a"); a.href = url;
        a.download = doc.id + "_" + doc.name.replace(/\s+/g, "_") + ".html";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }

    function previewPDCADoc(doc) {
      var html = generatePDCADoc(doc);
      setPdcaPreviewDoc(doc);
      setPdcaPreviewHTML(html);
    }

    var isoC = { "9001":"blue", "14001":"green", "45001":"yellow", "37001":"purple", multi:"cyan" };
    var currentDocs = pdcaDocs[pdcaTab] || [];

    return React.createElement("div", null,
      React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 16 } },
        ["P","D","C","A"].map(function(phase) {
          var info = pdcaInfo[phase];
          var active = pdcaTab === phase;
          return React.createElement("button", { key: phase,
            onClick: function() { setPdcaTab(phase); },
            style: {
              flex: 1, padding: "12px 8px", borderRadius: 10, border: "none", cursor: "pointer",
              background: active ? info.color + "20" : C.sa,
              borderBottom: active ? "3px solid " + info.color : "3px solid transparent",
              color: active ? info.color : C.tm, fontWeight: 700, fontSize: 11, fontFamily: "inherit",
              transition: "all 0.2s",
            }
          }, phase + " - " + info.label.split(" ")[0]);
        })
      ),
      React.createElement(Card, { style: { padding: 16, marginBottom: 12, borderLeft: "3px solid " + pdcaInfo[pdcaTab].color } },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("div", { style: { width: 36, height: 36, borderRadius: 10, background: pdcaInfo[pdcaTab].color + "20", display: "flex", alignItems: "center", justifyContent: "center", color: pdcaInfo[pdcaTab].color, fontWeight: 800, fontSize: 16 } }, pdcaTab),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: C.tx } }, pdcaInfo[pdcaTab].label),
            React.createElement("div", { style: { fontSize: 10, color: C.td } }, pdcaInfo[pdcaTab].desc + " | " + currentDocs.length + " documentos")
          )
        )
      ),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 } },
        currentDocs.map(function(doc) {
          return React.createElement(Card, { key: doc.id, style: { padding: 14 } },
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 } },
              React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center" } },
                React.createElement("div", { style: { width: 30, height: 30, borderRadius: 8, background: pdcaInfo[pdcaTab].color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: pdcaInfo[pdcaTab].color } }, React.createElement(Icons.FileText)),
                React.createElement("div", null,
                  React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: C.tx, lineHeight: 1.2 } }, doc.name),
                  React.createElement("div", { style: { fontSize: 8, color: C.td } }, doc.id)
                )
              ),
              React.createElement(Badge, { color: isoC[doc.iso] || "cyan" }, doc.iso === "multi" ? "Multi" : doc.iso)
            ),
            React.createElement("div", { style: { fontSize: 9, color: C.tm, marginBottom: 10, lineHeight: 1.4 } }, doc.desc),
            React.createElement("div", { style: { display: "flex", gap: 6 } },
              React.createElement(Btn, { sm: true, primary: true, onClick: function() { downloadPDCA(doc, "word"); } }, React.createElement(Icons.Download), " Word"),
              React.createElement(Btn, { sm: true, onClick: function() { downloadPDCA(doc, "html"); } }, React.createElement(Icons.Download), " HTML"),
              React.createElement(Btn, { sm: true, onClick: function() { previewPDCADoc(doc); } }, React.createElement(Icons.Eye), " Preview")
            )
          );
        })
      ),
      pdcaPreviewDoc ? React.createElement(Modal, {
        open: true, onClose: function() { setPdcaPreviewDoc(null); },
        title: pdcaPreviewDoc.name + " — Vista Previa", wide: true
      },
        React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } },
          React.createElement(Btn, { primary: true, sm: true, onClick: function() { downloadPDCA(pdcaPreviewDoc, "word"); } }, React.createElement(Icons.Download), " Descargar Word"),
          React.createElement(Btn, { sm: true, onClick: function() { downloadPDCA(pdcaPreviewDoc, "html"); } }, React.createElement(Icons.Download), " Descargar HTML")
        ),
        React.createElement("iframe", {
          srcDoc: pdcaPreviewHTML,
          style: { width: "100%", height: "70vh", border: "1px solid " + C.bd, borderRadius: 8, background: "#fff" }
        })
      ) : null,
      React.createElement("div", { style: { padding: "14px 0", fontSize: 9, color: C.td } },
        "Documentos descargables en Word (.doc) y HTML. Abrir HTML con navegador para imprimir como PDF."
      )
    );
  }

  // ═══ SETTINGS VIEW ═══
  function SettingsView() {
    return React.createElement(Card, { style: { padding: 24, maxWidth: 500 } },
      React.createElement("div", {
        style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }
      },
        React.createElement("div", {
          style: { width: 40, height: 40, borderRadius: 12, background: C.g1, display: "flex", alignItems: "center", justifyContent: "center" }
        }, React.createElement(Icons.Settings)),
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: C.tx } }, "Configuracion General"),
          React.createElement("div", { style: { fontSize: 10, color: C.td } }, "Parametros del sistema")
        )
      ),
      React.createElement(InputField, {
        label: "Nombre de la Empresa",
        value: empresa, onChange: setEmpresa,
        placeholder: "Ingrese razon social..."
      }),
      React.createElement(SelectField, {
        label: "Sector Principal",
        value: legalProfile.sector,
        onChange: function(v) { setLegalProfile(Object.assign({}, legalProfile, { sector: v })); },
        options: SECTORS
      }),
      React.createElement(SelectField, {
        label: "Idioma",
        value: "es",
        onChange: function() {},
        options: [{ value: "es", label: "Espanol" }, { value: "en", label: "English" }]
      }),
      React.createElement("div", {
        style: { padding: 12, background: C.ac + "10", borderRadius: 8, marginTop: 16 }
      },
        React.createElement("div", { style: { fontSize: 10, color: C.ac, fontWeight: 600 } }, "SIG Construccion 360 v7.0"),
        React.createElement("div", { style: { fontSize: 9, color: C.tm, marginTop: 4 } }, "ISO 9001:2015 | ISO 14001:2015 | ISO 45001:2018 | ISO 37001:2016"),
        React.createElement("div", { style: { fontSize: 9, color: C.td, marginTop: 2 } }, "Enterprise Edition - Docs + BI + Legal Tech + Lista Maestra + Recursos PDCA + ISO Editables + Incidentes")
      )
    );
  }

  // ═══ RENDER VIEW ROUTER ═══
  function renderView() {
    switch (view) {
      case "dashboard": return DashboardView();
      case "documents": return DocumentsView();
      case "ai-audit": return AIAuditorView();
      case "legal": return LegalView();
      case "lista-maestra": return ListaMaestraView();
      case "recursos": return RecursosView();
      case "iso9001-v2": return ISO9001V2View();
      case "iso14001-v2": return ISO14001V2View();
      case "iso45001-v2": return ISO45001V2View();
      case "iso37001-v2": return ISO37001V2View();
      case "settings": return SettingsView();
      default: return React.createElement("div", {
        style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", gap: 12 }
      },
        React.createElement("div", { style: { fontSize: 40 } }, "\uD83C\uDFD7\uFE0F"),
        React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: C.tx } }, titles[view] || view),
        React.createElement("div", { style: { fontSize: 10, color: C.td } }, "Modulo en desarrollo")
      );
    }
  }

  var dateStr = new Date().toLocaleDateString("es-PE", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  // ═══ MAIN LAYOUT ═══
  return React.createElement("div", {
    style: {
      display: "flex", height: "100vh", width: "100vw",
      background: C.bg,
      fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      color: C.tx, overflow: "hidden"
    }
  },
    React.createElement("link", {
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap",
      rel: "stylesheet"
    }),
    Sidebar(),
    mobMenu ? React.createElement(React.Fragment, null,
      React.createElement("div", {
        style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999 },
        onClick: function() { setMobMenu(false); }
      }),
      Sidebar({ mobile: true })
    ) : null,
    React.createElement("div", {
      style: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }
    },
      // Header
      React.createElement("div", {
        style: {
          padding: "0 20px", height: 50, borderBottom: "1px solid " + C.bd,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: C.sf, flexShrink: 0,
        }
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("button", {
            onClick: function() {
              if (window.innerWidth < 768) { setMobMenu(true); }
              else { setSbOpen(!sbOpen); }
            },
            style: { background: "none", border: "none", color: C.tm, cursor: "pointer", padding: 4 }
          }, React.createElement(Icons.Menu)),
          React.createElement("div", null,
            React.createElement("h1", {
              style: { fontSize: 14, fontWeight: 700, color: C.tx, margin: 0 }
            }, titles[view] || "SIG Construccion"),
            React.createElement("p", {
              style: { fontSize: 8, color: C.td, margin: 0 }
            }, (empresa || "[Empresa]") + " \u2014 " + dateStr)
          )
        ),
        React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
          React.createElement("button", {
            style: {
              background: C.sa, border: "1px solid " + C.bd, borderRadius: 8,
              padding: 6, cursor: "pointer", color: C.tm, position: "relative"
            }
          },
            React.createElement(Icons.Bell),
            React.createElement("div", {
              style: {
                position: "absolute", top: 2, right: 2, width: 6, height: 6,
                borderRadius: "50%", background: C.dn
              }
            })
          )
        )
      ),
      // Content
      React.createElement("div", {
        style: { flex: 1, overflow: "auto", padding: "14px 18px" }
      }, renderView())
    )
  );
}

// Mount
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(SIGConstruccion360));
