// ============================================================
// MEDCONGRESS PRO - ENGINE PRINCIPAL v1.0
// Ecosistema de Congresos Médicos Internacionales
// INNOVAQ Solutions - Punta Cana, República Dominicana
// ============================================================

const APP_STATE = {
  supabase: null,
  connected: false,
  currentSection: 'dashboard',
  config: JSON.parse(localStorage.getItem('medcongress_config') || '{}'),
  demoMode: true
};

const DEMO_DATA = {
  eventos: [
    {id:'e1',codigo_evento:'MC-2026-W08',nombre:'XVI Congreso Internacional de Cardiología',especialidad:'Cardiología',fecha_inicio:'2026-03-15',fecha_fin:'2026-03-19',sede_hotel:'Hard Rock Hotel Punta Cana',ciudad:'Punta Cana',pais:'República Dominicana',capacidad_max:1000,precio_base_usd:2000,estado:'abierto',margen_objetivo:40,presupuesto_usd:2000000},
    {id:'e2',codigo_evento:'MC-2026-W12',nombre:'IX Simposio de Oncología Tropical',especialidad:'Oncología',fecha_inicio:'2026-04-20',fecha_fin:'2026-04-24',sede_hotel:'Barceló Bávaro Palace',ciudad:'Punta Cana',pais:'República Dominicana',capacidad_max:800,precio_base_usd:2500,estado:'planificacion',margen_objetivo:40,presupuesto_usd:1800000},
    {id:'e3',codigo_evento:'MC-2026-W16',nombre:'V Cumbre Latinoamericana de Neurología',especialidad:'Neurología',fecha_inicio:'2026-05-10',fecha_fin:'2026-05-14',sede_hotel:'Secrets Royal Beach',ciudad:'Punta Cana',pais:'República Dominicana',capacidad_max:600,precio_base_usd:1800,estado:'planificacion',margen_objetivo:42,presupuesto_usd:1200000}
  ],
  participantes: [
    {id:'p1',nombre:'Dr. Carlos Mendoza',email:'cmendoza@cardio.mx',telefono:'+52 55 1234 5678',pais_origen:'México',especialidad:'Cardiología',institucion:'Instituto Nacional de Cardiología',licencia_medica:'MED-MX-45678',tipo:'ponente',estado:'confirmado',evento_id:'e1',qr_code:'QR-MC2026W08-P001'},
    {id:'p2',nombre:'Dra. María Fernández',email:'mfernandez@onco.ar',telefono:'+54 11 9876 5432',pais_origen:'Argentina',especialidad:'Oncología',institucion:'Hospital Italiano de Buenos Aires',licencia_medica:'MED-AR-12345',tipo:'asistente',estado:'inscrito',evento_id:'e1',qr_code:'QR-MC2026W08-P002'},
    {id:'p3',nombre:'Dr. James Wilson',email:'jwilson@mayo.edu',telefono:'+1 507 284 2511',pais_origen:'Estados Unidos',especialidad:'Cardiología',institucion:'Mayo Clinic',licencia_medica:'MED-US-99887',tipo:'ponente',estado:'checked_in',evento_id:'e1',qr_code:'QR-MC2026W08-P003'},
    {id:'p4',nombre:'Dra. Ana Beatriz Santos',email:'absantos@usp.br',telefono:'+55 11 3091 3116',pais_origen:'Brasil',especialidad:'Neurología',institucion:'Universidade de São Paulo',licencia_medica:'CRM-SP-78901',tipo:'asistente',estado:'confirmado',evento_id:'e1',qr_code:'QR-MC2026W08-P004'},
    {id:'p5',nombre:'Dr. Roberto Herrera',email:'rherrera@hcg.com.co',telefono:'+57 1 742 1900',pais_origen:'Colombia',especialidad:'Cardiología',institucion:'Fundación Cardioinfantil',licencia_medica:'MED-CO-34567',tipo:'sponsor',estado:'confirmado',evento_id:'e1',qr_code:'QR-MC2026W08-P005'},
    {id:'p6',nombre:'Dra. Lisa Chen',email:'lchen@hopkins.edu',telefono:'+1 410 955 5000',pais_origen:'Estados Unidos',especialidad:'Oncología',institucion:'Johns Hopkins',licencia_medica:'MED-US-55443',tipo:'ponente',estado:'inscrito',evento_id:'e2',qr_code:'QR-MC2026W12-P001'}
  ],
  pagos: [
    {id:'pay1',participante_id:'p1',evento_id:'e1',monto_usd:2000,metodo_pago:'tarjeta_credito',estado:'completado',fecha_pago:'2026-02-15T10:30:00',stripe_payment_id:'pi_3OxHabc'},
    {id:'pay2',participante_id:'p2',evento_id:'e1',monto_usd:2000,metodo_pago:'transferencia',estado:'pendiente',fecha_pago:null,stripe_payment_id:null},
    {id:'pay3',participante_id:'p3',evento_id:'e1',monto_usd:2000,metodo_pago:'tarjeta_credito',estado:'completado',fecha_pago:'2026-02-10T14:20:00',stripe_payment_id:'pi_3OxGdef'},
    {id:'pay4',participante_id:'p4',evento_id:'e1',monto_usd:2000,metodo_pago:'paypal',estado:'completado',fecha_pago:'2026-02-18T09:15:00',stripe_payment_id:'pi_3OxIghi'},
    {id:'pay5',participante_id:'p5',evento_id:'e1',monto_usd:0,metodo_pago:'cortesia',estado:'completado',fecha_pago:'2026-02-01T08:00:00',stripe_payment_id:null},
    {id:'pay6',participante_id:'p6',evento_id:'e2',monto_usd:2500,metodo_pago:'tarjeta_credito',estado:'procesando',fecha_pago:null,stripe_payment_id:'pi_3OxJjkl'}
  ],
  habitaciones: [
    {id:'h1',evento_id:'e1',participante_id:'p1',hotel_nombre:'Hard Rock Hotel',tipo_habitacion:'suite',numero_habitacion:'A-501',piso:5,fecha_checkin:'2026-03-14',fecha_checkout:'2026-03-20',precio_noche:350,estado:'confirmada'},
    {id:'h2',evento_id:'e1',participante_id:'p3',hotel_nombre:'Hard Rock Hotel',tipo_habitacion:'deluxe',numero_habitacion:'B-302',piso:3,fecha_checkin:'2026-03-14',fecha_checkout:'2026-03-20',precio_noche:280,estado:'checked_in'},
    {id:'h3',evento_id:'e1',participante_id:'p4',hotel_nombre:'Hard Rock Hotel',tipo_habitacion:'superior',numero_habitacion:'C-215',piso:2,fecha_checkin:'2026-03-15',fecha_checkout:'2026-03-19',precio_noche:220,estado:'bloqueada'},
    {id:'h4',evento_id:'e1',participante_id:'p5',hotel_nombre:'Hard Rock Hotel',tipo_habitacion:'suite_presidencial',numero_habitacion:'P-801',piso:8,fecha_checkin:'2026-03-14',fecha_checkout:'2026-03-20',precio_noche:600,estado:'confirmada'}
  ],
  vuelos: [
    {id:'v1',participante_id:'p1',tipo:'vuelo_llegada',aerolinea:'Aeroméxico',numero_vuelo:'AM 456',origen:'MEX',destino:'PUJ',fecha_salida:'2026-03-14T06:00',fecha_llegada:'2026-03-14T11:30',estado:'confirmado'},
    {id:'v2',participante_id:'p3',tipo:'vuelo_llegada',aerolinea:'JetBlue',numero_vuelo:'B6 1832',origen:'JFK',destino:'PUJ',fecha_salida:'2026-03-14T08:00',fecha_llegada:'2026-03-14T12:15',estado:'confirmado'},
    {id:'v3',participante_id:'p4',tipo:'vuelo_llegada',aerolinea:'LATAM',numero_vuelo:'LA 8045',origen:'GRU',destino:'PUJ',fecha_salida:'2026-03-14T22:00',fecha_llegada:'2026-03-15T04:30',estado:'pendiente'},
    {id:'v4',participante_id:'p1',tipo:'traslado_aeropuerto_hotel',aerolinea:'-',numero_vuelo:'-',origen:'PUJ Airport',destino:'Hard Rock Hotel',fecha_salida:'2026-03-14T12:00',fecha_llegada:'2026-03-14T12:45',estado:'confirmado'}
  ],
  incidentes: [
    {id:'i1',tipo:'error_bloqueo_hotel',severidad:'alta',descripcion:'API del hotel retornó timeout al intentar bloquear hab.',asignado_a:'María Ops',sla_deadline:'2026-02-25T18:00',estado:'abierto'},
    {id:'i2',tipo:'error_pago',severidad:'media',descripcion:'Pago rechazado por banco emisor - tarjeta vencida',asignado_a:'Carlos Finance',sla_deadline:'2026-02-26T12:00',estado:'en_progreso'},
    {id:'i3',tipo:'queja_participante',severidad:'baja',descripcion:'Solicitud de cambio de habitación de standard a suite',asignado_a:'Ana Soporte',sla_deadline:'2026-02-27T10:00',estado:'abierto'},
    {id:'i4',tipo:'documento_faltante',severidad:'media',descripcion:'Póliza de seguro del evento no cargada en el sistema',asignado_a:'Luis Legal',sla_deadline:'2026-02-26T16:00',estado:'abierto'},
    {id:'i5',tipo:'error_vuelo',severidad:'critica',descripcion:'Cancelación de vuelo AM 789 - 15 participantes afectados',asignado_a:'Roberto Logística',sla_deadline:'2026-02-25T14:00',estado:'en_progreso'}
  ],
  auditoria: [
    {timestamp:'2026-02-25T23:45:12',tabla:'participantes',accion:'INSERT',usuario:'admin@innovaq.com',registro_id:'p6',cambios:'Nuevo registro: Dra. Lisa Chen'},
    {timestamp:'2026-02-25T23:30:05',tabla:'pagos',accion:'UPDATE',usuario:'system@n8n',registro_id:'pay4',cambios:'estado: procesando a completado'},
    {timestamp:'2026-02-25T22:15:33',tabla:'habitaciones_hotel',accion:'UPDATE',usuario:'operador@innovaq.com',registro_id:'h2',cambios:'estado: bloqueada a checked_in'},
    {timestamp:'2026-02-25T21:00:00',tabla:'incidentes',accion:'INSERT',usuario:'n8n_error_trigger',registro_id:'i5',cambios:'Nuevo incidente crítico: vuelo cancelado'},
    {timestamp:'2026-02-25T20:45:18',tabla:'eventos',accion:'UPDATE',usuario:'admin@innovaq.com',registro_id:'e1',cambios:'estado: planificacion a abierto'}
  ]
};

// === CORE FUNCTIONS ===
function showSection(section) {
  document.querySelectorAll('[id^="section-"]').forEach(function(s){s.style.display='none'});
  document.getElementById('section-'+section).style.display='block';
  document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active')});
  if(event && event.target) event.target.closest('.nav-item').classList.add('active');
  APP_STATE.currentSection=section;
  if(section==='dashboard')initDashboard();
  if(section==='eventos')renderEventos();
  if(section==='participantes')renderParticipantes();
  if(section==='pagos')renderPagos();
  if(section==='hotel')renderHotel();
  if(section==='vuelos')renderVuelos();
  if(section==='incidentes')renderIncidentes();
  if(section==='reportes')initReportes();
  if(section==='auditoria')renderAuditoria();
  if(section==='config')loadConfig();
}
function openModal(id){document.getElementById(id).classList.add('active')}
function closeModal(id){document.getElementById(id).classList.remove('active')}
function notify(msg,type){
  type=type||'success';
  var n=document.createElement('div');
  n.className='notification '+type;
  n.innerHTML='<i class="fas fa-'+(type==='success'?'check-circle':'exclamation-circle')+'"></i> '+msg;
  document.body.appendChild(n);
  setTimeout(function(){n.remove()},4000);
}
function getData(table){return DEMO_DATA[table]||[]}
function getParticipanteName(id){var p=getData('participantes').find(function(x){return x.id===id});return p?p.nombre:'N/A'}
function getEventoNombre(id){var e=getData('eventos').find(function(x){return x.id===id});return e?e.codigo_evento:'N/A'}
function statusBadge(estado){
  var map={'abierto':'success','planificacion':'info','cerrado':'warning','en_curso':'purple','finalizado':'success','cancelado':'danger','inscrito':'info','confirmado':'success','checked_in':'purple','no_show':'danger','pendiente':'warning','procesando':'info','completado':'success','fallido':'danger','reembolsado':'warning','disputado':'danger','disponible':'success','bloqueada':'info','confirmada':'success','checked_out':'warning','en_progreso':'warning','resuelto':'success','critica':'danger','alta':'danger','media':'warning','baja':'info','ponente':'purple','asistente':'info','sponsor':'success','organizador':'warning','acompanante':'info','standard':'info','superior':'warning','deluxe':'success','suite':'purple','suite_presidencial':'danger','vuelo llegada':'info','vuelo salida':'warning','traslado aeropuerto hotel':'success','traslado hotel aeropuerto':'warning','traslado interno':'info','insert':'success','update':'warning','delete':'danger'};
  var cls=map[estado]||'info';
  return '<span class="badge badge-'+cls+'">'+estado+'</span>';
}

// === RENDER FUNCTIONS ===
function renderEventos(){
  var data=getData('eventos');
  document.getElementById('tablaEventos').innerHTML=data.map(function(e){return '<tr><td><strong>'+e.codigo_evento+'</strong></td><td>'+e.nombre+'</td><td>'+e.especialidad+'</td><td>'+e.fecha_inicio+' / '+e.fecha_fin+'</td><td>'+e.sede_hotel+'</td><td>'+e.capacidad_max+'</td><td>'+statusBadge(e.estado)+'</td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem" onclick="editEvento(\''+e.id+'\')"><i class="fas fa-edit"></i></button></td></tr>'}).join('');
}
function renderParticipantes(){
  var data=getData('participantes');
  var colors=['#0f766e','#1e40af','#9333ea','#c2410c','#15803d'];
  document.getElementById('tablaParticipantes').innerHTML=data.map(function(p){
    var ci=p.nombre.charCodeAt(4)%colors.length;
    var initials=p.nombre.split(' ').map(function(n){return n[0]}).join('').substring(0,2);
    return '<tr><td style="display:flex;align-items:center;gap:.5rem"><div class="avatar" style="background:'+colors[ci]+'">'+initials+'</div>'+p.nombre+'</td><td>'+p.email+'</td><td>'+p.especialidad+'</td><td>'+getEventoNombre(p.evento_id)+'</td><td>'+statusBadge(p.tipo)+'</td><td>'+statusBadge(p.estado)+'</td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem" onclick="showQR(\''+p.id+'\')"><i class="fas fa-qrcode"></i></button></td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem"><i class="fas fa-edit"></i></button></td></tr>';
  }).join('');
}
function renderPagos(){
  var data=getData('pagos');
  document.getElementById('tablaPagos').innerHTML=data.map(function(p){return '<tr><td style="font-family:monospace;font-size:.8rem">'+p.id+'</td><td>'+getParticipanteName(p.participante_id)+'</td><td>'+getEventoNombre(p.evento_id)+'</td><td><strong>$'+p.monto_usd.toLocaleString()+'</strong></td><td>'+p.metodo_pago.replace(/_/g,' ')+'</td><td>'+statusBadge(p.estado)+'</td><td>'+(p.fecha_pago?new Date(p.fecha_pago).toLocaleDateString():'-')+'</td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem"><i class="fas fa-eye"></i></button></td></tr>'}).join('');
}
function renderHotel(){
  var data=getData('habitaciones');
  document.getElementById('tablaHotel').innerHTML=data.map(function(h){
    var nights=Math.ceil((new Date(h.fecha_checkout)-new Date(h.fecha_checkin))/86400000);
    var cost=nights*h.precio_noche;
    return '<tr><td><strong>'+h.numero_habitacion+'</strong> (Piso '+h.piso+')</td><td>'+statusBadge(h.tipo_habitacion)+'</td><td>'+h.hotel_nombre+'</td><td>'+getParticipanteName(h.participante_id)+'</td><td>'+h.fecha_checkin+'</td><td>'+h.fecha_checkout+'</td><td>'+nights+'</td><td><strong>$'+cost.toLocaleString()+'</strong></td><td>'+statusBadge(h.estado)+'</td></tr>';
  }).join('');
}
function renderVuelos(){
  var data=getData('vuelos');
  document.getElementById('tablaVuelos').innerHTML=data.map(function(v){return '<tr><td>'+getParticipanteName(v.participante_id)+'</td><td>'+statusBadge(v.tipo.replace(/_/g,' '))+'</td><td>'+v.aerolinea+'</td><td><strong>'+v.numero_vuelo+'</strong></td><td>'+v.origen+'</td><td>'+v.destino+'</td><td>'+new Date(v.fecha_salida).toLocaleString()+'</td><td>'+statusBadge(v.estado)+'</td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem"><i class="fas fa-edit"></i></button></td></tr>'}).join('');
}
function renderIncidentes(){
  var data=getData('incidentes');
  document.getElementById('tablaIncidentes').innerHTML=data.map(function(i){return '<tr><td style="font-family:monospace;font-size:.8rem">'+i.id+'</td><td>'+i.tipo.replace(/_/g,' ')+'</td><td>'+statusBadge(i.severidad)+'</td><td style="max-width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+i.descripcion+'</td><td>'+i.asignado_a+'</td><td>'+new Date(i.sla_deadline).toLocaleString()+'</td><td>'+statusBadge(i.estado)+'</td><td><button class="btn btn-ghost" style="padding:.25rem .5rem;font-size:.75rem"><i class="fas fa-edit"></i></button></td></tr>'}).join('');
}
function renderAuditoria(){
  var data=getData('auditoria');
  document.getElementById('tablaAuditoria').innerHTML=data.map(function(a){return '<tr><td style="font-size:.8rem">'+new Date(a.timestamp).toLocaleString()+'</td><td><span class="badge badge-info">'+a.tabla+'</span></td><td>'+statusBadge(a.accion.toLowerCase())+'</td><td>'+a.usuario+'</td><td style="font-family:monospace;font-size:.8rem">'+a.registro_id+'</td><td style="font-size:.8rem;max-width:200px;overflow:hidden;text-overflow:ellipsis">'+a.cambios+'</td></tr>'}).join('');
    }

// === SAVE FUNCTIONS ===
function saveEvento(){
  var evt={id:'e'+(getData('eventos').length+1),codigo_evento:document.getElementById('evtCodigo').value,nombre:document.getElementById('evtNombre').value,especialidad:document.getElementById('evtEspecialidad').value,fecha_inicio:document.getElementById('evtFechaInicio').value,fecha_fin:document.getElementById('evtFechaFin').value,sede_hotel:document.getElementById('evtSede').value,ciudad:document.getElementById('evtCiudad').value,pais:document.getElementById('evtPais').value,capacidad_max:parseInt(document.getElementById('evtCapacidad').value),precio_base_usd:parseFloat(document.getElementById('evtPrecio').value),estado:'planificacion',margen_objetivo:40,presupuesto_usd:parseFloat(document.getElementById('evtPresupuesto').value)};
  if(!evt.codigo_evento||!evt.nombre){notify('Complete los campos requeridos','error');return}
  DEMO_DATA.eventos.push(evt);closeModal('modalEvento');renderEventos();notify('Evento creado: '+evt.codigo_evento);
}
function saveParticipante(){
  var p={id:'p'+(getData('participantes').length+1),nombre:document.getElementById('partNombre').value,email:document.getElementById('partEmail').value,telefono:document.getElementById('partTelefono').value,pais_origen:document.getElementById('partPais').value,especialidad:document.getElementById('partEspecialidad').value,institucion:document.getElementById('partInstitucion').value,licencia_medica:document.getElementById('partLicencia').value,tipo:document.getElementById('partTipo').value,estado:'inscrito',evento_id:document.getElementById('partEvento').value,qr_code:'QR-'+Date.now()};
  if(!p.nombre||!p.email){notify('Complete nombre y email','error');return}
  DEMO_DATA.participantes.push(p);closeModal('modalParticipante');renderParticipantes();notify('Participante registrado: '+p.nombre);
}
function savePago(){
  var p={id:'pay'+(getData('pagos').length+1),participante_id:document.getElementById('pagoParticipante').value,evento_id:document.getElementById('pagoEvento').value,monto_usd:parseFloat(document.getElementById('pagoMonto').value),metodo_pago:document.getElementById('pagoMetodo').value,estado:'procesando',fecha_pago:new Date().toISOString(),stripe_payment_id:'pi_demo_'+Date.now()};
  DEMO_DATA.pagos.push(p);closeModal('modalPago');renderPagos();notify('Pago registrado: $'+p.monto_usd);
}
function saveHabitacion(){
  var h={id:'h'+(getData('habitaciones').length+1),evento_id:'e1',participante_id:document.getElementById('habParticipante').value,hotel_nombre:document.getElementById('habHotel').value,tipo_habitacion:document.getElementById('habTipo').value,numero_habitacion:document.getElementById('habNumero').value,piso:1,fecha_checkin:document.getElementById('habCheckin').value,fecha_checkout:document.getElementById('habCheckout').value,precio_noche:parseFloat(document.getElementById('habPrecio').value),estado:'bloqueada'};
  DEMO_DATA.habitaciones.push(h);closeModal('modalHabitacion');renderHotel();notify('Habitación asignada: '+h.numero_habitacion);
}
function saveVuelo(){
  var v={id:'v'+(getData('vuelos').length+1),participante_id:document.getElementById('vueloParticipante').value,tipo:document.getElementById('vueloTipo').value,aerolinea:document.getElementById('vueloAerolinea').value,numero_vuelo:document.getElementById('vueloNumero').value,origen:document.getElementById('vueloOrigen').value,destino:document.getElementById('vueloDestino').value,fecha_salida:document.getElementById('vueloSalida').value,fecha_llegada:document.getElementById('vueloLlegada').value,estado:'pendiente'};
  DEMO_DATA.vuelos.push(v);closeModal('modalVuelo');renderVuelos();notify('Vuelo registrado: '+v.numero_vuelo);
}
function saveIncidente(){
  var i={id:'i'+(getData('incidentes').length+1),tipo:document.getElementById('incTipo').value,severidad:document.getElementById('incSeveridad').value,descripcion:document.getElementById('incDescripcion').value,asignado_a:document.getElementById('incAsignado').value,sla_deadline:document.getElementById('incSLA').value,estado:'abierto'};
  DEMO_DATA.incidentes.push(i);closeModal('modalIncidente');renderIncidentes();notify('Incidente creado: '+i.tipo,'error');
}

// === QR CODE ===
function showQR(pid){
  var p=getData('participantes').find(function(x){return x.id===pid});
  if(!p)return;
  openModal('modalQR');
  document.getElementById('qrName').textContent=p.nombre;
  document.getElementById('qrEvent').textContent=getEventoNombre(p.evento_id)+' | '+p.especialidad;
  document.getElementById('qrType').textContent=p.tipo;
  QRCode.toCanvas(document.getElementById('qrCanvas'),JSON.stringify({id:p.id,event:p.evento_id,type:p.tipo,qr:p.qr_code}),{width:200,color:{dark:'#0f766e',light:'#1e293b'}});
}

// === UTILITIES ===
function exportCSV(table){
  var data=getData(table);if(!data.length)return;
  var headers=Object.keys(data[0]).join(',');
  var rows=data.map(function(r){return Object.values(r).join(',')});
  var csv=[headers].concat(rows).join('\n');
  var blob=new Blob([csv],{type:'text/csv'});
  var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=table+'_export.csv';a.click();
  notify('CSV exportado: '+table);
}
function filterTable(t){notify('Filtro aplicado')}
function editEvento(id){notify('Editor de evento: '+id);openModal('modalEvento')}
function refreshDashboard(){notify('Dashboard actualizado');initDashboard()}
function filterDashboard(){notify('Filtro aplicado')}

// === DASHBOARD ===
function initDashboard(){
  renderProximosEventos();renderIncidentesWidget();renderActividadReciente();initCharts();
}
function renderProximosEventos(){
  var eventos=getData('eventos').slice(0,3);
  document.getElementById('proximosEventos').innerHTML=eventos.map(function(e){return '<div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid rgba(71,85,105,.2)"><div><p style="font-weight:600;font-size:.85rem">'+e.nombre+'</p><p style="font-size:.75rem;color:var(--text-secondary)">'+e.fecha_inicio+' | '+e.sede_hotel+'</p></div>'+statusBadge(e.estado)+'</div>'}).join('');
}
function renderIncidentesWidget(){
  var inc=getData('incidentes').filter(function(i){return i.estado!=='resuelto'&&i.estado!=='cerrado'}).slice(0,4);
  document.getElementById('incidentesAbiertos').innerHTML=inc.map(function(i){return '<div style="display:flex;justify-content:space-between;align-items:center;padding:.6rem 0;border-bottom:1px solid rgba(71,85,105,.2)"><div><p style="font-weight:600;font-size:.85rem">'+i.tipo.replace(/_/g,' ')+'</p><p style="font-size:.75rem;color:var(--text-secondary)">'+i.asignado_a+'</p></div>'+statusBadge(i.severidad)+'</div>'}).join('');
  document.getElementById('incidentCount').textContent=inc.length;
}
function renderActividadReciente(){
  var acts=getData('auditoria').slice(0,5);
  document.getElementById('actividadReciente').innerHTML=acts.map(function(a){return '<div style="padding:.5rem 0;border-bottom:1px solid rgba(71,85,105,.2);font-size:.8rem"><div style="display:flex;justify-content:space-between"><span style="color:var(--primary-light)">'+a.accion+'</span><span style="color:var(--text-secondary)">'+new Date(a.timestamp).toLocaleTimeString()+'</span></div><p style="color:var(--text-secondary);font-size:.75rem;margin-top:.15rem">'+a.cambios+'</p></div>'}).join('');
}

// === CHARTS ===
function initCharts(){
  var defs={responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#94a3b8',font:{size:11}}}}};
  var ctx1=document.getElementById('chartIngresos');
  if(ctx1&&!ctx1._ci){new Chart(ctx1,{type:'bar',data:{labels:['MC-W08','MC-W12','MC-W16'],datasets:[{label:'Ingresos',data:[1690000,320000,0],backgroundColor:'rgba(20,184,166,.7)',borderRadius:6},{label:'Presupuesto',data:[2000000,1800000,1200000],backgroundColor:'rgba(59,130,246,.3)',borderRadius:6}]},options:Object.assign({},defs,{scales:{x:{ticks:{color:'#94a3b8'},grid:{display:false}},y:{ticks:{color:'#94a3b8',callback:function(v){return '$'+v/1000+'K'}},grid:{color:'rgba(71,85,105,.2)'}}}})});ctx1._ci=true}
  var ctx2=document.getElementById('chartParticipantes');
  if(ctx2&&!ctx2._ci){new Chart(ctx2,{type:'doughnut',data:{labels:['Confirmados','Inscritos','Checked-in','No Show'],datasets:[{data:[3,2,1,0],backgroundColor:['#22c55e','#3b82f6','#8b5cf6','#ef4444'],borderWidth:0}]},options:Object.assign({},defs,{cutout:'65%'})});ctx2._ci=true}
}
function initReportes(){
  var defs={responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#94a3b8',font:{size:11}}}}};
  var ctx3=document.getElementById('chartRentabilidad');
  if(ctx3&&!ctx3._ci){new Chart(ctx3,{type:'bar',data:{labels:['MC-W08','MC-W12','MC-W16'],datasets:[{label:'Margen Real %',data:[42.3,0,0],backgroundColor:'rgba(34,197,94,.7)',borderRadius:6},{label:'Meta %',data:[40,40,42],backgroundColor:'rgba(245,158,11,.3)',borderRadius:6}]},options:Object.assign({},defs,{scales:{x:{ticks:{color:'#94a3b8'},grid:{display:false}},y:{ticks:{color:'#94a3b8',callback:function(v){return v+'%'}},grid:{color:'rgba(71,85,105,.2)'}}}})});ctx3._ci=true}
  var ctx4=document.getElementById('chartPagos');
  if(ctx4&&!ctx4._ci){new Chart(ctx4,{type:'pie',data:{labels:['Tarjeta Crédito','Transferencia','PayPal','Cortesía'],datasets:[{data:[65,20,10,5],backgroundColor:['#3b82f6','#22c55e','#f59e0b','#8b5cf6'],borderWidth:0}]},options:defs});ctx4._ci=true}
  var ctx5=document.getElementById('chartIncidentes');
  if(ctx5&&!ctx5._ci){new Chart(ctx5,{type:'bar',data:{labels:['Error Hotel','Error Pago','Error Vuelo','Doc Faltante','Queja','Otro'],datasets:[{label:'Cantidad',data:[12,8,5,3,7,2],backgroundColor:['#ef4444','#f59e0b','#3b82f6','#8b5cf6','#22c55e','#94a3b8'],borderRadius:6}]},options:Object.assign({},defs,{indexAxis:'y',scales:{x:{ticks:{color:'#94a3b8'},grid:{color:'rgba(71,85,105,.2)'}},y:{ticks:{color:'#94a3b8'},grid:{display:false}}}})});ctx5._ci=true}
  var ctx6=document.getElementById('chartOcupacion');
  if(ctx6&&!ctx6._ci){new Chart(ctx6,{type:'line',data:{labels:['Ene','Feb','Mar','Abr','May','Jun'],datasets:[{label:'Ocupación %',data:[75,82,91,0,0,0],borderColor:'#14b8a6',backgroundColor:'rgba(20,184,166,.1)',fill:true,tension:.4}]},options:Object.assign({},defs,{scales:{x:{ticks:{color:'#94a3b8'},grid:{display:false}},y:{ticks:{color:'#94a3b8',callback:function(v){return v+'%'}},grid:{color:'rgba(71,85,105,.2)'},min:0,max:100}}})});ctx6._ci=true}
}

// === CONFIG ===
function loadConfig(){
  var cfg=APP_STATE.config;
  if(cfg.supabaseUrl)document.getElementById('cfgSupabaseUrl').value=cfg.supabaseUrl;
}
function saveConfig(service){
  if(service==='supabase'){APP_STATE.config.supabaseUrl=document.getElementById('cfgSupabaseUrl').value;APP_STATE.config.supabaseAnon=document.getElementById('cfgSupabaseAnon').value;APP_STATE.config.supabaseService=document.getElementById('cfgSupabaseService').value}
  if(service==='stripe'){APP_STATE.config.stripePk=document.getElementById('cfgStripePk').value;APP_STATE.config.stripeSk=document.getElementById('cfgStripeSk').value}
  if(service==='mailer'){APP_STATE.config.mailerKey=document.getElementById('cfgMailerKey').value;APP_STATE.config.mailerDomain=document.getElementById('cfgMailerDomain').value}
  if(service==='n8n'){APP_STATE.config.n8nUrl=document.getElementById('cfgN8nUrl').value;APP_STATE.config.n8nKey=document.getElementById('cfgN8nKey').value}
  localStorage.setItem('medcongress_config',JSON.stringify(APP_STATE.config));
  notify('Configuración de '+service+' guardada');
}
function testSupabaseConnection(){
  var url=document.getElementById('cfgSupabaseUrl').value;
  var key=document.getElementById('cfgSupabaseAnon').value;
  if(!url||!key){notify('Ingrese URL y Anon Key','error');return}
  fetch(url+'/rest/v1/',{headers:{'apikey':key,'Authorization':'Bearer '+key}}).then(function(r){
    if(r.ok){document.getElementById('supabaseStatus').className='badge badge-success';document.getElementById('supabaseStatus').textContent='Conectado';document.getElementById('configBanner').style.display='none';notify('Conexión exitosa')}
    else{throw new Error('HTTP '+r.status)}
  }).catch(function(e){document.getElementById('supabaseStatus').className='badge badge-danger';document.getElementById('supabaseStatus').textContent='Error';notify('Error: '+e.message,'error')});
}

// === POPULATE SELECTS ===
function populateSelects(){
  var eventos=getData('eventos');var participantes=getData('participantes');
  var eo=eventos.map(function(e){return '<option value="'+e.id+'">'+e.codigo_evento+' - '+e.nombre+'</option>'}).join('');
  var po=participantes.map(function(p){return '<option value="'+p.id+'">'+p.nombre+'</option>'}).join('');
  ['partEvento','pagoEvento'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML=eo});
  ['pagoParticipante','habParticipante','vueloParticipante'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML=po});
  var df=document.getElementById('dashEventFilter');if(df)df.innerHTML='<option value="all">Todos los Eventos</option>'+eo;
}

// === INIT ===
document.addEventListener('DOMContentLoaded',function(){
  populateSelects();initDashboard();
  if(window.innerWidth<=768)document.getElementById('menuToggle').style.display='block';
  window.addEventListener('resize',function(){document.getElementById('menuToggle').style.display=window.innerWidth<=768?'block':'none'});
});
