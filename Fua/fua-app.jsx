const { useState, useRef, useCallback, useEffect } = React;

const MAX_MB = 25;
const CB = 45;
const F = "'DM Sans',sans-serif";

/* ══ XLSX Engine (zero deps) ══ */
function xe(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function cr(c){let s="",n=c;while(n>=0){s=String.fromCharCode(65+(n%26))+s;n=Math.floor(n/26)-1;}return s;}
function sx(rows){let x='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>';rows.forEach((r,ri)=>{x+='<row r="'+(ri+1)+'">';r.forEach((c,ci)=>{const ref=cr(ci)+(ri+1);x+=typeof c==="number"?'<c r="'+ref+'"><v>'+c+'</v></c>':'<c r="'+ref+'" t="inlineStr"><is><t>'+xe(c)+'</t></is></c>';});x+='</row>';});x+='</sheetData></worksheet>';return x;}
function c32(d){const t=new Uint32Array(256);for(let i=0;i<256;i++){let c=i;for(let j=0;j<8;j++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);t[i]=c;}let r=0xFFFFFFFF;for(let i=0;i<d.length;i++)r=t[(r^d[i])&0xFF]^(r>>>8);return(r^0xFFFFFFFF)>>>0;}
function mz(files){const enc=new TextEncoder();const E=files.map(f=>({n:enc.encode(f.p),d:enc.encode(f.c)}));const P=[],C=[];let o=0;E.forEach(e=>{const h=new Uint8Array(30+e.n.length),v=new DataView(h.buffer);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);const cc=c32(e.d);v.setUint32(14,cc,true);v.setUint32(18,e.d.length,true);v.setUint32(22,e.d.length,true);v.setUint16(26,e.n.length,true);h.set(e.n,30);P.push(h,e.d);const d=new Uint8Array(46+e.n.length),w=new DataView(d.buffer);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint32(16,cc,true);w.setUint32(20,e.d.length,true);w.setUint32(24,e.d.length,true);w.setUint16(28,e.n.length,true);w.setUint32(42,o,true);d.set(e.n,46);C.push(d);o+=h.length+e.d.length;});let cs=0;C.forEach(c=>cs+=c.length);const eo=new Uint8Array(22),ev=new DataView(eo.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,E.length,true);ev.setUint16(10,E.length,true);ev.setUint32(12,cs,true);ev.setUint32(16,o,true);return new Blob([...P,...C,eo],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});}
function bx(sheets){const ct=[],sr=[],se=[];sheets.forEach((s,i)=>{const id=i+1;ct.push('<Override PartName="/xl/worksheets/sheet'+id+'.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>');sr.push('<Relationship Id="rId'+id+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet'+id+'.xml"/>');se.push({p:'xl/worksheets/sheet'+id+'.xml',c:sx(s.rows)});});let wb="";sheets.forEach((s,i)=>wb+='<sheet name="'+xe(s.name)+'" sheetId="'+(i+1)+'" r:id="rId'+(i+1)+'"/>');return mz([{p:"[Content_Types].xml",c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'+ct.join("")+'</Types>'},{p:"_rels/.rels",c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'},{p:"xl/workbook.xml",c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'+wb+'</sheets></workbook>'},{p:"xl/_rels/workbook.xml.rels",c:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+sr.join("")+'</Relationships>'},...se]);}
function dlBlob(blob,name){const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(u);}

/* ══ Mock data ══ */
const NAMES=["María Quispe Huamán","José Mendoza Ríos","Ana Torres Vega","Rosa Chávez Díaz","Carlos Vargas Peña","Luz Flores Castillo","Pedro Ruiz Soto","Carmen López García","Miguel Sánchez Torres","Lucía Fernández"];
const SERVS=["Consulta Externa","Laboratorio","Emergencia","Ginecología","Pediatría","Odontología","Medicina Interna","Cirugía"];
const ESTABS=["C.S. El Porvenir","C.S. La Esperanza","Hospital Belén","C.S. Laredo","Hospital Regional"];
const DXS=[{c:"J06.9",d:"IRAS no especificada"},{c:"E11.9",d:"Diabetes mellitus tipo 2"},{c:"I10",d:"Hipertensión esencial"},{c:"Z34.0",d:"Embarazo normal"},{c:"K02.1",d:"Caries dentina"},{c:"J20.9",d:"Bronquitis aguda"},{c:"M54.5",d:"Lumbago"},{c:"N39.0",d:"Infección urinaria"}];
const PROCS=[{c:"85101",d:"Hemograma",co:35},{c:"86301",d:"Perfil lipídico",co:65},{c:"86001",d:"Glucosa",co:25},{c:"76801",d:"Ecografía",co:95},{c:"81001",d:"Examen orina",co:15},{c:"86501",d:"HbA1c",co:85},{c:"93000",d:"Electrocardiograma",co:40},{c:"86701",d:"Test VIH",co:25},{c:"85018",d:"Hemoglobina",co:20}];
const DOCS=["Dr. Rivera Méndez","Dra. Fernández Castillo","Dr. Sánchez Torres","Dra. Paredes Ríos","Dr. Gutiérrez López"];
let counter=1000;
function genFUA(){
  counter++;const n="FUA-2026-"+String(counter).padStart(5,"0");
  const hasNoDx=Math.random()<0.2;const hasNoFirma=Math.random()<0.15;
  const estado=hasNoFirma&&Math.random()<0.5?"CERRADO":["VALIDADO","EN_REVISION","BORRADOR"][Math.floor(Math.random()*3)];
  const docIdx=Math.floor(Math.random()*DOCS.length);
  const dxCount=hasNoDx?0:Math.floor(Math.random()*3)+1;
  const diagnosticos=[];for(let i=0;i<dxCount;i++){const dx=DXS[Math.floor(Math.random()*DXS.length)];if(!diagnosticos.find(d=>d.cie10===dx.c))diagnosticos.push({cie10:dx.c,descripcion:dx.d,tipo:i===0?"DEFINITIVO":"PRESUNTIVO",orden:i+1});}
  const pCount=Math.floor(Math.random()*4)+1;const procedimientos=[];const used=new Set();
  for(let i=0;i<pCount;i++){let p=PROCS[Math.floor(Math.random()*PROCS.length)];if(used.has(p.c))continue;used.add(p.c);const ej=Math.random()<0.75?1:0;const hasRes=ej>0?Math.random()>0.3:false;procedimientos.push({codigo:p.c,descripcion:p.d,ejecutado:ej,resultado:hasRes?["Normal","12.5 g/dL","89 mg/dL","No reactivo","Completado"][Math.floor(Math.random()*5)]:null,costo:p.co});}
  return{numero_fua:n,paciente:NAMES[Math.floor(Math.random()*NAMES.length)],dni:String(Math.floor(Math.random()*90000000+10000000)),fecha_atencion:["2026-02-20","2026-02-21","2026-02-22"][Math.floor(Math.random()*3)],hora_atencion:String(8+Math.floor(Math.random()*10)).padStart(2,"0")+":"+String(Math.floor(Math.random()*60)).padStart(2,"0"),servicio:SERVS[Math.floor(Math.random()*SERVS.length)],establecimiento:ESTABS[Math.floor(Math.random()*ESTABS.length)],codigo_renaes:String(10000+Math.floor(Math.random()*5000)),personal_salud_id:hasNoFirma?null:"CMP-"+String(Math.floor(Math.random()*90000+10000)),personal_nombre:hasNoFirma?null:DOCS[docIdx],estado,tipo_condicion:["NUEVO","CONTINUADOR","REINGRESO"][Math.floor(Math.random()*3)],diagnosticos,procedimientos};
}

/* ══ Validation ══ */
function valFUA(d){
  const fugas=[];
  if(!d.diagnosticos||d.diagnosticos.length===0)fugas.push({regla:"R1",severidad:"CRÍTICA",campo:"Diagnósticos",mensaje:"Sin diagnóstico CIE-10",norma:"Directiva 001-2021-SIS/GNF",costo:CB,rec:"Registrar diagnóstico CIE-10."});
  (d.procedimientos||[]).forEach(p=>{if(p.ejecutado>0&&(!p.resultado||!String(p.resultado).trim()))fugas.push({regla:"R2",severidad:"CRÍTICA",campo:p.codigo+"-"+p.descripcion,mensaje:"Ejecutado sin resultado",norma:"R.J.160-2021-SIS Art.12.4",costo:p.costo*p.ejecutado,rec:"Solicitar resultado."});});
  if(d.estado==="CERRADO"&&!d.personal_salud_id)fugas.push({regla:"R3",severidad:"BLOQUEANTE",campo:"Firma",mensaje:"Cerrado sin firma",norma:"D.S.030-2020-SA Art.8",costo:CB,rec:"Asociar CMP."});
  return{fugas,costoTotal:fugas.reduce((s,f)=>s+f.costo,0),status:fugas.length===0?"CONFORME":fugas.some(f=>f.severidad==="BLOQUEANTE")?"BLOQUEANTE":"OBSERVADO"};
}

/* ══ Export ══ */
function exportDB(db){
  const hdr=["N° FUA","Paciente","DNI","Fecha","Hora","Servicio","Establecimiento","RENAES","Condición","Estado Original","Personal","CMP","Dx1 CIE-10","Dx1 Descripción","Dx2 CIE-10","Dx2 Descripción","Proc1 Código","Proc1 Descripción","Proc1 Ejecutado","Proc1 Resultado","Proc1 Costo","Proc2 Código","Proc2 Descripción","Proc2 Ejecutado","Proc2 Resultado","Proc2 Costo","Estado Auditoría","Total Fugas","Costo No Calidad S/","Reglas Violadas","Anverso","Reverso"];
  const rows=[hdr,...db.map(r=>{const d=r.data,v=r.val;return[d.numero_fua,d.paciente,d.dni,d.fecha_atencion,d.hora_atencion,d.servicio,d.establecimiento,d.codigo_renaes,d.tipo_condicion,d.estado,d.personal_nombre||"",d.personal_salud_id||"",d.diagnosticos[0]?.cie10||"",d.diagnosticos[0]?.descripcion||"",d.diagnosticos[1]?.cie10||"",d.diagnosticos[1]?.descripcion||"",d.procedimientos[0]?.codigo||"",d.procedimientos[0]?.descripcion||"",d.procedimientos[0]?.ejecutado??0,d.procedimientos[0]?.resultado||"",d.procedimientos[0]?.costo??0,d.procedimientos[1]?.codigo||"",d.procedimientos[1]?.descripcion||"",d.procedimientos[1]?.ejecutado??0,d.procedimientos[1]?.resultado||"",d.procedimientos[1]?.costo??0,v.status,v.fugas.length,v.costoTotal,v.fugas.map(f=>f.regla).join(", ")||"Ninguna",r.files.front?"Sí":"No",r.files.back?"Sí":"No"];})];
  const fRows=[["FUGAS DE CALIDAD - DETALLE"],[],["N° FUA","Regla","Severidad","Campo","Descripción","Norma","Costo S/","Recomendación"]];
  db.forEach(r=>{r.val.fugas.forEach(f=>{fRows.push([r.data.numero_fua,f.regla,f.severidad,f.campo,f.mensaje,f.norma,f.costo,f.rec||""]);});});
  if(fRows.length===3)fRows.push(["","","","","SIN FUGAS","",0,""]);
  const sumRows=[["RESUMEN DE AUDITORÍA"],[],["Métrica","Valor"],["Total FUAs",db.length],["Conformes",db.filter(r=>r.val.status==="CONFORME").length],["Observados",db.filter(r=>r.val.status==="OBSERVADO").length],["Bloqueantes",db.filter(r=>r.val.status==="BLOQUEANTE").length],["Costo NC S/",db.reduce((s,r)=>s+r.val.costoTotal,0)],["Con ambos lados",db.filter(r=>r.files.front&&r.files.back).length],["Fecha",new Date().toLocaleString("es-PE")]];
  const blob=bx([{name:"Base de Datos FUA",rows},{name:"Fugas Detalle",rows:fRows},{name:"Resumen",rows:sumRows}]);
  dlBlob(blob,"BD_FUA_Auditoria_"+new Date().toISOString().slice(0,10)+".xlsx");
}

/* ══ Icons ══ */
const I={
  Cam:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  Folder:()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  Dl:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Flip:()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  Trash:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Eye:()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  X:()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

/* ══ Unique IDs for label-input pairing ══ */
let uid = 0;
function nextId(){ return "fua-inp-" + (++uid); }

/* ══ ScanCapture ══ */
function ScanCapture({ onComplete }) {
  const [side, setSide] = useState("front");
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [frontPrev, setFrontPrev] = useState(null);
  const [backPrev, setBackPrev] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [pct, setPct] = useState(0);
  const [error, setError] = useState(null);

  // Unique IDs for each input so labels work correctly
  const [camId] = useState(() => nextId());
  const [fileId] = useState(() => nextId());

  const readPreview = (file, cb) => {
    if (!file) { cb(null); return; }
    if (file.type && file.type.startsWith("image/")) {
      const r = new FileReader();
      r.onload = e => cb(e.target.result);
      r.onerror = () => cb(null);
      r.readAsDataURL(file);
    } else {
      cb(null);
    }
  };

  const handleFile = useCallback((file) => {
    if (!file) return;
    setError(null);
    if (file.size / 1048576 > MAX_MB) {
      setError("Máximo " + MAX_MB + "MB");
      return;
    }
    if (side === "front") {
      setFront(file);
      readPreview(file, setFrontPrev);
    } else {
      setBack(file);
      readPreview(file, setBackPrev);
    }
  }, [side]);

  const onInputChange = useCallback((e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFile(file);
    // Reset so same file can be re-selected
    e.target.value = "";
  }, [handleFile]);

  const clearSide = useCallback((s) => {
    if (s === "front") { setFront(null); setFrontPrev(null); }
    else { setBack(null); setBackPrev(null); }
  }, []);

  const startScan = useCallback(() => {
    if (!front) { setError("Captura el anverso primero"); return; }
    setScanning(true); setPct(0); setError(null);
    let c = 0;
    const iv = setInterval(() => {
      c += Math.random() * 4 + 1.5;
      if (c >= 100) {
        c = 100; clearInterval(iv);
        setTimeout(() => {
          const d = genFUA(); const v = valFUA(d);
          onComplete({ data: d, val: v, files: { front: front?.name || "anverso", back: back?.name || null }, frontPrev, backPrev, ts: new Date().toISOString() });
          setScanning(false); setFront(null); setBack(null); setFrontPrev(null); setBackPrev(null); setSide("front"); setPct(0);
        }, 300);
      }
      setPct(Math.min(c, 100));
    }, 80);
  }, [front, back, frontPrev, backPrev, onComplete]);

  /* Scanning animation */
  if (scanning) return (
    <div style={{ padding: "24px 20px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#f1f5f9", border: "1px solid #e2e8f0", height: 160 }}>
        {frontPrev ? <img src={frontPrev} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", opacity: 0.4 }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}><I.Cam /></div>}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}><div style={{ position: "absolute", left: 0, right: 0, height: 3, background: "linear-gradient(90deg,transparent,#0284c7 30%,#06b6d4 50%,#0284c7 70%,transparent)", boxShadow: "0 0 15px 3px rgba(2,132,199,0.35)", animation: "scanY 1.8s ease-in-out infinite" }} /></div>
      </div>
      <style>{`@keyframes scanY{0%{top:0}50%{top:95%}100%{top:0}}`}</style>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#0c4a6e" }}>Procesando FUA...</span><span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#0284c7" }}>{Math.round(pct)}%</span></div>
        <div style={{ width: "100%", height: 8, borderRadius: 8, background: "#e2e8f0", marginTop: 6 }}><div style={{ height: "100%", borderRadius: 8, background: "linear-gradient(90deg,#0284c7,#06b6d4)", width: pct + "%", transition: "width 0.15s" }} /></div>
      </div>
    </div>
  );

  const currentPrev = side === "front" ? frontPrev : backPrev;
  const currentFile = side === "front" ? front : back;

  return (
    <div style={{ padding: "24px 20px", maxWidth: 480, margin: "0 auto" }}>

      {/* ── Hidden inputs rendered directly in JSX ── */}
      {/* Camera input: accept image, capture environment */}
      <input
        id={camId}
        key={camId + "-" + side}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onInputChange}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", zIndex: -1, pointerEvents: "none" }}
      />
      {/* File/gallery input: accept images + pdf, no capture */}
      <input
        id={fileId}
        key={fileId + "-" + side}
        type="file"
        accept="image/*,.pdf,.jpg,.jpeg,.png,.gif,.bmp,.webp,.heic,.heif"
        onChange={onInputChange}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", zIndex: -1, pointerEvents: "none" }}
      />

      {/* Side toggle */}
      <div style={{ display: "flex", borderRadius: 12, padding: 4, background: "#f1f5f9", marginBottom: 16 }}>
        {[{ k: "front", l: "① Anverso" }, { k: "back", l: "② Reverso" }].map(s => (
          <button key={s.k} onClick={() => { setSide(s.k); setError(null); }}
            style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 8, padding: "10px 0", border: "none", cursor: "pointer", fontFamily: F, fontSize: 13, fontWeight: side === s.k ? 700 : 500, background: side === s.k ? "white" : "transparent", color: side === s.k ? "#0c4a6e" : "#64748b", boxShadow: side === s.k ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.2s" }}>
            {s.l}
            {((s.k === "front" && front) || (s.k === "back" && back)) && <span style={{ color: "#16a34a" }}>✓</span>}
          </button>
        ))}
      </div>

      {/* Preview zone */}
      <div style={{ borderRadius: 16, overflow: "hidden", border: "2px dashed " + (currentFile ? "#0284c7" : "#cbd5e1"), background: "#f8fafc", minHeight: 130, marginBottom: 16 }}>
        {currentPrev ? (
          <div style={{ position: "relative" }}>
            <img src={currentPrev} alt="" style={{ width: "100%", maxHeight: 190, objectFit: "contain", display: "block" }} />
            <button onClick={() => clearSide(side)} style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 14, background: "rgba(0,0,0,0.55)", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><I.X /></button>
          </div>
        ) : currentFile ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 16px", gap: 6 }}>
            <I.Folder />
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#166534" }}>{currentFile.name}</span>
            <span style={{ fontFamily: F, fontSize: 11, color: "#64748b" }}>Archivo cargado</span>
            <button onClick={() => clearSide(side)} style={{ fontFamily: F, fontSize: 12, color: "#dc2626", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginTop: 4 }}>Eliminar</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 16px", gap: 8, color: "#94a3b8" }}>
            {side === "front" ? <I.Cam /> : <I.Flip />}
            <span style={{ fontFamily: F, fontSize: 13, textAlign: "center" }}>
              {side === "front" ? "Captura el lado ANVERSO" : "Captura el lado REVERSO (opcional)"}
            </span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && <div style={{ borderRadius: 12, padding: "10px 16px", background: "#fef2f2", border: "1px solid #fecaca", marginBottom: 12 }}><span style={{ fontFamily: F, fontSize: 13, color: "#dc2626", fontWeight: 600 }}>{error}</span></div>}

      {/* ── Buttons using <label> to trigger inputs ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <label htmlFor={camId}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 14, padding: "14px 0", cursor: "pointer", background: "linear-gradient(135deg,#0284c7,#0369a1)", color: "white", boxShadow: "0 3px 12px rgba(3,105,161,0.2)", userSelect: "none", WebkitTapHighlightColor: "transparent", transition: "transform 0.1s" }}>
          <I.Cam />
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13 }}>📷 Cámara</span>
        </label>

        <label htmlFor={fileId}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, borderRadius: 14, padding: "14px 0", cursor: "pointer", background: "white", border: "2px solid #e2e8f0", color: "#334155", userSelect: "none", WebkitTapHighlightColor: "transparent", transition: "transform 0.1s" }}>
          <I.Folder />
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13 }}>📁 Archivo / Galería</span>
        </label>
      </div>

      {/* Status */}
      <div style={{ borderRadius: 12, padding: 12, background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: front ? "#16a34a" : "#cbd5e1", display: "inline-block" }} />
          <span style={{ fontFamily: F, fontSize: 12, color: front ? "#166534" : "#94a3b8", fontWeight: 600 }}>Anverso {front ? "✓ " + (front.name.length > 28 ? front.name.slice(0, 25) + "..." : front.name) : "pendiente"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: back ? "#16a34a" : "#cbd5e1", display: "inline-block" }} />
          <span style={{ fontFamily: F, fontSize: 12, color: back ? "#166534" : "#94a3b8", fontWeight: 600 }}>Reverso {back ? "✓ " + (back.name.length > 28 ? back.name.slice(0, 25) + "..." : back.name) : "(opcional)"}</span>
        </div>
      </div>

      {/* Scan button */}
      <button onClick={startScan} disabled={!front}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 14, padding: "14px 0", border: "none", cursor: front ? "pointer" : "not-allowed", fontFamily: F, fontWeight: 700, fontSize: 15, background: front ? "linear-gradient(135deg,#0284c7,#0369a1)" : "#e2e8f0", color: front ? "white" : "#94a3b8", boxShadow: front ? "0 4px 15px rgba(3,105,161,0.3)" : "none", transition: "transform 0.1s" }}>
        {front ? "▶ Escanear y Auditar FUA" : "Captura el anverso para continuar"}
      </button>
      <p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", textAlign: "center", marginTop: 8 }}>Compatible con cámara, galería y archivos · Cualquier dispositivo</p>
    </div>
  );
}

/* ══ DB View ══ */
function DBView({ db, onDelete, onSelect, selected }) {
  const [search, setSearch] = useState("");
  const [filterSt, setFilterSt] = useState("TODOS");
  const filtered = db.filter(r => {
    const d = r.data;
    const ms = search === "" || d.numero_fua.toLowerCase().includes(search.toLowerCase()) || d.paciente.toLowerCase().includes(search.toLowerCase()) || d.dni.includes(search);
    const mf = filterSt === "TODOS" || r.val.status === filterSt;
    return ms && mf;
  });
  const stats = { total: db.length, ok: db.filter(r => r.val.status === "CONFORME").length, obs: db.filter(r => r.val.status === "OBSERVADO").length, blk: db.filter(r => r.val.status === "BLOQUEANTE").length, cost: db.reduce((s, r) => s + r.val.costoTotal, 0) };

  return (
    <div style={{ padding: "16px", maxWidth: 900, margin: "0 auto" }}>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 8, marginBottom: 16 }}>
        {[{ l: "Total", v: stats.total, c: "#0284c7" }, { l: "Conformes", v: stats.ok, c: "#16a34a" }, { l: "Observados", v: stats.obs, c: "#d97706" }, { l: "Bloqueantes", v: stats.blk, c: "#dc2626" }, { l: "Costo NC", v: "S/" + stats.cost.toFixed(0), c: "#dc2626" }].map((k, i) =>
          <div key={i} style={{ borderRadius: 12, padding: 12, textAlign: "center", background: "white", border: "1px solid #e2e8f0" }}>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: "#64748b", margin: 0 }}>{k.l}</p>
            <p style={{ fontFamily: F, fontSize: 18, fontWeight: 800, color: k.c, margin: "4px 0 0" }}>{k.v}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar FUA, paciente, DNI..." style={{ flex: 1, minWidth: 180, borderRadius: 12, padding: "10px 16px", border: "1px solid #e2e8f0", fontFamily: F, fontSize: 13, outline: "none" }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["TODOS", "CONFORME", "OBSERVADO", "BLOQUEANTE"].map(s =>
            <button key={s} onClick={() => setFilterSt(s)} style={{ borderRadius: 8, padding: "8px 12px", fontFamily: F, fontSize: 11, fontWeight: filterSt === s ? 700 : 500, background: filterSt === s ? "#0284c7" : "white", color: filterSt === s ? "white" : "#64748b", border: "1px solid " + (filterSt === s ? "#0284c7" : "#e2e8f0"), cursor: "pointer" }}>{s}</button>
          )}
        </div>
        <button onClick={() => exportDB(db)} style={{ display: "flex", alignItems: "center", gap: 6, borderRadius: 12, padding: "10px 16px", background: "linear-gradient(135deg,#059669,#047857)", color: "white", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
          <I.Dl /><span style={{ fontFamily: F, fontWeight: 700, fontSize: 12 }}>Descargar .xlsx</span>
        </button>
      </div>

      {/* Table */}
      {filtered.length === 0 ?
        <div style={{ borderRadius: 12, padding: 32, textAlign: "center", background: "#f8fafc", border: "1px solid #e2e8f0" }}><p style={{ fontFamily: F, fontSize: 14, color: "#94a3b8" }}>No hay registros</p></div> :
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontFamily: F, fontSize: 12, borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#f8fafc" }}>{["FUA", "Paciente", "DNI", "Servicio", "Estado", "Fugas", "Costo", "Lados", ""].map((h, i) => <th key={i} style={{ padding: "10px 12px", textAlign: "left", whiteSpace: "nowrap", fontWeight: 700, color: "#475569", borderBottom: "1px solid #e2e8f0", fontSize: 11 }}>{h}</th>)}</tr></thead>
              <tbody>{filtered.map((r, i) => {
                const sc = { CONFORME: { bg: "#dcfce7", c: "#166534" }, OBSERVADO: { bg: "#fef3c7", c: "#92400e" }, BLOQUEANTE: { bg: "#fee2e2", c: "#991b1b" } }[r.val.status];
                return (
                  <tr key={i} onClick={() => onSelect(i === selected ? null : i)} style={{ background: selected === i ? "rgba(2,132,199,0.04)" : "white", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0c4a6e", whiteSpace: "nowrap" }}>{r.data.numero_fua}</td>
                    <td style={{ padding: "10px 12px", color: "#334155", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.data.paciente}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>{r.data.dni}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>{r.data.servicio}</td>
                    <td style={{ padding: "10px 12px" }}><span style={{ borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, background: sc.bg, color: sc.c }}>{r.val.status}</span></td>
                    <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, color: r.val.fugas.length > 0 ? "#dc2626" : "#16a34a" }}>{r.val.fugas.length}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 700, color: r.val.costoTotal > 0 ? "#dc2626" : "#64748b" }}>S/{r.val.costoTotal.toFixed(0)}</td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 10 }}>{r.files.front ? "A" : ""}{r.files.back ? "+R" : ""}</span></td>
                    <td style={{ padding: "10px 12px" }}><div style={{ display: "flex", gap: 6 }}><button onClick={e => { e.stopPropagation(); onSelect(i); }} style={{ color: "#0284c7", background: "none", border: "none", cursor: "pointer" }}><I.Eye /></button><button onClick={e => { e.stopPropagation(); onDelete(i); }} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer" }}><I.Trash /></button></div></td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
}

/* ══ Detail ══ */
function Detail({ record, onClose }) {
  const { data: d, val: v } = record;
  const sc = { CONFORME: { bg: "#dcfce7", bdr: "#86efac", c: "#166534" }, OBSERVADO: { bg: "#fef3c7", bdr: "#fcd34d", c: "#92400e" }, BLOQUEANTE: { bg: "#fee2e2", bdr: "#fca5a5", c: "#991b1b" } }[v.status];
  const Sec = ({ title, color, children }) => <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: 12 }}><div style={{ padding: "8px 12px", background: color || "#f8fafc", borderBottom: "1px solid #e2e8f0" }}><span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: "#475569" }}>{title}</span></div><div style={{ background: "white" }}>{children}</div></div>;
  const Row = ({ l, v: val }) => <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 12px", borderBottom: "1px solid #f8fafc" }}><span style={{ fontFamily: F, fontSize: 12, color: "#94a3b8" }}>{l}</span><span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: String(val).includes("NO REG") ? "#dc2626" : "#1e293b" }}>{val}</span></div>;

  return (
    <div style={{ padding: "16px 20px", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: "#0c4a6e" }}>{d.numero_fua}</span>
        <button onClick={onClose} style={{ borderRadius: 8, padding: "4px 12px", fontFamily: F, fontSize: 12, fontWeight: 600, background: "#f1f5f9", color: "#64748b", border: "none", cursor: "pointer" }}>← Volver</button>
      </div>
      <div style={{ borderRadius: 12, padding: 12, textAlign: "center", background: sc.bg, border: "1px solid " + sc.bdr, marginBottom: 12 }}>
        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 15, color: sc.c }}>{v.status}</span>
        {v.costoTotal > 0 && <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: "#dc2626", marginLeft: 8 }}>S/ {v.costoTotal.toFixed(2)}</span>}
      </div>
      <Sec title="DATOS">
        {[["Paciente", d.paciente], ["DNI", d.dni], ["Fecha", d.fecha_atencion + " " + d.hora_atencion], ["Servicio", d.servicio], ["Establecimiento", d.establecimiento], ["Personal", d.personal_nombre || "NO REGISTRADO"], ["Lados", `Anverso: ${record.files.front ? "✓" : "✕"} | Reverso: ${record.files.back ? "✓" : "✕"}`]].map(([l, v], i) => <Row key={i} l={l} v={v} />)}
      </Sec>
      <Sec title={"DIAGNÓSTICOS (" + d.diagnosticos.length + ")"} color={d.diagnosticos.length === 0 ? "#fef2f2" : "#f0fdf4"}>
        {d.diagnosticos.length > 0 ? d.diagnosticos.map((dx, i) => <div key={i} style={{ display: "flex", gap: 8, padding: "8px 12px", borderBottom: "1px solid #f8fafc" }}><span style={{ borderRadius: 4, padding: "1px 6px", fontFamily: F, fontSize: 10, fontWeight: 700, background: "#dbeafe", color: "#1d4ed8" }}>{dx.cie10}</span><span style={{ fontFamily: F, fontSize: 12 }}>{dx.descripcion}</span></div>) : <div style={{ padding: "8px 12px", textAlign: "center" }}><span style={{ fontFamily: F, fontSize: 12, color: "#dc2626", fontWeight: 600 }}>Sin diagnósticos — R1</span></div>}
      </Sec>
      <Sec title="PROCEDIMIENTOS">
        {d.procedimientos.map((p, i) => { const lk = p.ejecutado > 0 && (!p.resultado || !p.resultado.trim()); return <div key={i} style={{ padding: "8px 12px", borderBottom: "1px solid #f8fafc", background: lk ? "#fffbeb" : "transparent" }}><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontFamily: F, fontSize: 12 }}><b>{p.codigo}</b> {p.descripcion}</span><span style={{ fontFamily: F, fontSize: 11, color: "#64748b" }}>S/{p.costo}</span></div><div style={{ display: "flex", gap: 8, marginTop: 2 }}><span style={{ fontFamily: F, fontSize: 10, color: p.ejecutado ? "#0284c7" : "#94a3b8" }}>Ej:{p.ejecutado}</span>{p.ejecutado > 0 && (lk ? <span style={{ fontFamily: F, fontSize: 10, color: "#dc2626", fontWeight: 700 }}>⚠ SIN RESULTADO</span> : <span style={{ fontFamily: F, fontSize: 10, color: "#16a34a" }}>✓ {p.resultado}</span>)}</div></div>; })}
      </Sec>
      {v.fugas.length > 0 && <Sec title={"FUGAS (" + v.fugas.length + ")"} color="#fef2f2">
        {v.fugas.map((f, i) => <div key={i} style={{ padding: "8px 12px", borderBottom: "1px solid #fef2f2" }}><div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ borderRadius: 4, padding: "1px 6px", fontFamily: F, fontSize: 10, fontWeight: 800, background: f.severidad === "BLOQUEANTE" ? "#fecaca" : "#fed7aa", color: f.severidad === "BLOQUEANTE" ? "#991b1b" : "#9a3412", whiteSpace: "nowrap" }}>{f.regla}</span><div><p style={{ fontFamily: F, fontSize: 12, margin: 0 }}>{f.campo}</p><p style={{ fontFamily: F, fontSize: 11, color: "#64748b", margin: "2px 0" }}>{f.mensaje} · {f.norma}</p><p style={{ fontFamily: F, fontSize: 11, color: "#dc2626", fontWeight: 700, margin: 0 }}>S/ {f.costo.toFixed(2)}</p></div></div></div>)}
      </Sec>}
    </div>
  );
}

/* ══ MAIN ══ */
function App() {
  const [view, setView] = useState("scan");
  const [db, setDb] = useState([]);
  const [selected, setSelected] = useState(null);
  const addRec = useCallback(rec => { setDb(prev => [rec, ...prev]); }, []);
  const delRec = useCallback(i => { setDb(prev => prev.filter((_, j) => j !== i)); if (selected === i) setSelected(null); }, [selected]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#f0f9ff 0%,#f8fafc 50%,#f0f9ff 100%)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}} *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;} label{-webkit-touch-callout:none;}`}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0284c7,#0369a1)", color: "white" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div>
            <div><h1 style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: "#0c4a6e", margin: 0 }}>Auditoría FUA</h1><p style={{ fontFamily: F, fontSize: 10, color: "#64748b", margin: 0 }}>MINSA · Escaneo Dual</p></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {db.length > 0 && <span style={{ borderRadius: 99, padding: "2px 8px", fontFamily: F, fontSize: 11, fontWeight: 700, background: "#dbeafe", color: "#1d4ed8" }}>{db.length}</span>}
            <div style={{ display: "flex", borderRadius: 8, padding: 2, background: "#f1f5f9" }}>
              <button onClick={() => { setView("scan"); setSelected(null); }} style={{ borderRadius: 6, padding: "6px 12px", fontFamily: F, fontSize: 12, fontWeight: view === "scan" ? 700 : 500, background: view === "scan" ? "white" : "transparent", color: view === "scan" ? "#0c4a6e" : "#64748b", border: "none", cursor: "pointer" }}>Escanear</button>
              <button onClick={() => { setView("db"); setSelected(null); }} style={{ borderRadius: 6, padding: "6px 12px", fontFamily: F, fontSize: 12, fontWeight: view === "db" ? 700 : 500, background: view === "db" ? "white" : "transparent", color: view === "db" ? "#0c4a6e" : "#64748b", border: "none", cursor: "pointer" }}>Base de Datos</button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {view === "scan" && <ScanCapture onComplete={addRec} />}
        {view === "db" && selected != null && db[selected] ? <Detail record={db[selected]} onClose={() => setSelected(null)} /> : view === "db" && <DBView db={db} onDelete={delRec} onSelect={setSelected} selected={selected} />}
      </main>

      {view === "scan" && db.length > 0 && (
        <div style={{ position: "fixed", bottom: 16, left: 16, right: 16, maxWidth: 480, margin: "0 auto" }}>
          <button onClick={() => setView("db")} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 12, padding: "12px 16px", background: "white", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 4, background: "#16a34a", animation: "pulse 2s infinite", display: "inline-block" }} /><span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#0c4a6e" }}>{db.length} FUA{db.length > 1 ? "s" : ""}</span></div>
            <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: "#0284c7" }}>Ver BD →</span>
          </button>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: 16 }}><p style={{ fontFamily: F, fontSize: 10, color: "#94a3b8", margin: 0 }}>Auditoría FUA v2.2 · INNOVAQ SOLUTIONS SAC</p></footer>
    </div>
  );
}
