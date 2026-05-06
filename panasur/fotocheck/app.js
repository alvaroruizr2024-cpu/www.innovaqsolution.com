// ============================================================================
// PANASUR Fotocheck PWA — app.js
// ============================================================================

// Estado global
const state = {
  user: null,
  trabajadores: [],
  filtro: 'todos',
  busqueda: '',
  trabajadorActivo: null,
  fotoCapturada: null,
  cameraStream: null,
  cameraFacing: 'user',
  firmaPad: null
};

// ============================================================================
// INICIALIZACIÓN
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Login
  document.getElementById('btn-login').addEventListener('click', tryLogin);
  document.getElementById('login-pin').addEventListener('keydown', e => {
    if (e.key === 'Enter') tryLogin();
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Búsqueda y filtros
  document.getElementById('search-input').addEventListener('input', e => {
    state.busqueda = e.target.value.toLowerCase().trim();
    renderListaTrabajadores();
  });

  document.querySelectorAll('.filter-pills .pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pills .pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.filtro = pill.dataset.filter;
      renderListaTrabajadores();
    });
  });

  // Refresh dashboard
  document.getElementById('btn-refresh').addEventListener('click', () => {
    cargarTrabajadores();
    renderDashboard();
  });

  // Online/offline
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // Auto-login si hay sesión guardada
  const saved = localStorage.getItem('panasur_user');
  if (saved) {
    try {
      const u = JSON.parse(saved);
      state.user = u;
      mostrarApp();
    } catch (_) {
      localStorage.removeItem('panasur_user');
    }
  }
});

// ============================================================================
// LOGIN
// ============================================================================
function tryLogin() {
  const user = document.getElementById('login-user').value.trim().toLowerCase();
  const pin = document.getElementById('login-pin').value.trim();
  const errEl = document.getElementById('login-error');
  errEl.textContent = '';

  const u = CONFIG.USUARIOS.find(x => x.user === user && x.pin === pin);
  if (!u) {
    errEl.textContent = 'Usuario o PIN incorrecto';
    return;
  }

  state.user = u;
  localStorage.setItem('panasur_user', JSON.stringify(u));
  mostrarApp();
}

function logout() {
  localStorage.removeItem('panasur_user');
  state.user = null;
  document.getElementById('app-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');
}

function mostrarApp() {
  document.getElementById('login-screen').classList.remove('active');
  document.getElementById('app-screen').classList.add('active');
  document.getElementById('header-user').textContent = state.user.nombre;
  cargarTrabajadores();
}

document.getElementById('btn-menu').addEventListener('click', () => {
  if (confirm('¿Cerrar sesión?')) logout();
});

// ============================================================================
// TABS
// ============================================================================
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${tab}`));
  if (tab === 'dashboard') renderDashboard();
  if (tab === 'capturar' && !state.trabajadorActivo) renderCapturarVacio();
}

// ============================================================================
// CARGA DE TRABAJADORES
// ============================================================================
async function cargarTrabajadores() {
  const container = document.getElementById('lista-trabajadores');
  container.innerHTML = '<div class="loading">Cargando trabajadores...</div>';

  try {
    const { data, error } = await sb
      .from('panasur_fotochecks')
      .select('*')
      .order('numero_credencial', { ascending: true });

    if (error) throw error;
    state.trabajadores = data || [];
    renderListaTrabajadores();
  } catch (err) {
    container.innerHTML = `<div class="loading" style="color:var(--red)">Error: ${err.message}</div>`;
    console.error(err);
  }
}

function renderListaTrabajadores() {
  const container = document.getElementById('lista-trabajadores');
  const counter = document.getElementById('lista-counter');

  let lista = state.trabajadores;

  // Filtros
  if (state.filtro === 'sin-foto') {
    lista = lista.filter(t => !t.foto_url);
  } else if (state.filtro !== 'todos') {
    lista = lista.filter(t => t.estado === state.filtro);
  }

  // Búsqueda
  if (state.busqueda) {
    const q = state.busqueda;
    lista = lista.filter(t =>
      (t.dni && t.dni.toLowerCase().includes(q)) ||
      (t.apellidos && t.apellidos.toLowerCase().includes(q)) ||
      (t.nombres && t.nombres.toLowerCase().includes(q)) ||
      (t.numero_credencial && t.numero_credencial.toLowerCase().includes(q))
    );
  }

  counter.textContent = `${lista.length} trabajador${lista.length !== 1 ? 'es' : ''}`;

  if (lista.length === 0) {
    container.innerHTML = '<div class="loading">No se encontraron trabajadores</div>';
    return;
  }

  container.innerHTML = lista.map(t => renderTrabCard(t)).join('');
  container.querySelectorAll('.trab-card').forEach(card => {
    card.addEventListener('click', () => abrirCaptura(card.dataset.id));
  });
}

function renderTrabCard(t) {
  const colorClass = t.color_credencial ? `color-${t.color_credencial}` : '';
  const fotoHtml = t.foto_url
    ? `<img src="${t.foto_url}" alt="">`
    : '👤';
  const estadoClass = t.estado === 'PENDIENTE EMISIÓN' ? 'PENDIENTE' : t.estado;
  const estadoTxt = t.estado === 'PENDIENTE EMISIÓN' ? 'Pendiente' : (t.estado || '—');
  return `
    <div class="trab-card ${colorClass}" data-id="${t.id}">
      <div class="trab-foto">${fotoHtml}</div>
      <div class="trab-info">
        <div class="trab-nombre">${t.apellidos || ''}, ${t.nombres || ''}</div>
        <div class="trab-cargo">${t.cargo || '— Sin cargo asignado —'}</div>
        <div class="trab-meta">
          <span>${t.numero_credencial}</span>
          <span>·</span>
          <span>DNI ${t.dni}</span>
          <span class="estado-badge ${estadoClass}">${estadoTxt}</span>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// CAPTURA / EDICIÓN
// ============================================================================
function abrirCaptura(id) {
  state.trabajadorActivo = state.trabajadores.find(t => t.id === id);
  state.fotoCapturada = state.trabajadorActivo?.foto_url || null;
  switchTab('capturar');
  renderCapturarForm();
}

function renderCapturarVacio() {
  document.getElementById('capturar-content').innerHTML = `
    <div class="captura-empty">
      <div class="icon">📷</div>
      <h3>Selecciona un trabajador</h3>
      <p>Ve a la pestaña <b>Lista</b> y elige una persona para capturar o actualizar su fotocheck.</p>
    </div>
  `;
}

function renderCapturarForm() {
  const t = state.trabajadorActivo;
  if (!t) return renderCapturarVacio();

  const colorBg = CONFIG.COLOR_BG[t.color_credencial] || '#808080';

  document.getElementById('capturar-content').innerHTML = `
    <div class="captura-form">
      <h3>📷 Foto del trabajador</h3>
      <div class="foto-section">
        <div class="foto-preview" id="foto-preview">
          ${state.fotoCapturada
            ? `<img src="${state.fotoCapturada}" alt="">`
            : '<div class="icon">👤</div><div>Sin foto</div>'}
        </div>
        <div class="foto-actions">
          <button class="btn-foto btn-camera" onclick="abrirCamara()">📷 Tomar foto</button>
          <button class="btn-foto btn-secondary" onclick="seleccionarArchivo()">🖼️ Galería</button>
          <input type="file" id="file-input" accept="image/*" style="display:none" onchange="archivoSeleccionado(event)">
        </div>
      </div>
    </div>

    <div class="captura-form">
      <h3>📋 Datos personales</h3>
      <div class="form-group">
        <label>N° Credencial</label>
        <input type="text" id="f-numero" value="${t.numero_credencial || ''}" readonly style="background:var(--gray-100); color:var(--gray-700);">
      </div>
      <div class="row">
        <div class="form-group">
          <label>DNI *</label>
          <input type="text" id="f-dni" value="${t.dni || ''}" inputmode="numeric" maxlength="8">
        </div>
        <div class="form-group">
          <label>Sexo</label>
          <select id="f-sexo">
            <option value="">—</option>
            <option value="M" ${t.sexo === 'M' ? 'selected' : ''}>Masculino</option>
            <option value="F" ${t.sexo === 'F' ? 'selected' : ''}>Femenino</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Apellidos *</label>
        <input type="text" id="f-apellidos" value="${t.apellidos || ''}" style="text-transform:uppercase">
      </div>
      <div class="form-group">
        <label>Nombres *</label>
        <input type="text" id="f-nombres" value="${t.nombres || ''}" style="text-transform:uppercase">
      </div>
      <div class="row">
        <div class="form-group">
          <label>Fecha nacimiento</label>
          <input type="date" id="f-fnac" value="${t.fecha_nacimiento || ''}">
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" id="f-tel" value="${t.telefono || ''}" inputmode="numeric" maxlength="9">
        </div>
      </div>
    </div>

    <div class="captura-form">
      <h3>🏢 Datos laborales</h3>
      <div class="form-group">
        <label>Cargo *</label>
        <input type="text" id="f-cargo" value="${t.cargo || ''}" style="text-transform:uppercase">
      </div>
      <div class="row">
        <div class="form-group">
          <label>Tipo personal *</label>
          <select id="f-tipo" onchange="autoColor()">
            <option value="">—</option>
            <option value="STAFF/GERENCIA" ${t.tipo_personal === 'STAFF/GERENCIA' ? 'selected' : ''}>Staff/Gerencia</option>
            <option value="STAFF TÉCNICO" ${t.tipo_personal === 'STAFF TÉCNICO' ? 'selected' : ''}>Staff Técnico</option>
            <option value="OBRERO/OPERATIVO" ${t.tipo_personal === 'OBRERO/OPERATIVO' ? 'selected' : ''}>Obrero/Operativo</option>
            <option value="SUBCONTRATISTA" ${t.tipo_personal === 'SUBCONTRATISTA' ? 'selected' : ''}>Subcontratista</option>
            <option value="VISITA" ${t.tipo_personal === 'VISITA' ? 'selected' : ''}>Visita</option>
            <option value="MÉDICO/SALUD" ${t.tipo_personal === 'MÉDICO/SALUD' ? 'selected' : ''}>Médico/Salud</option>
          </select>
        </div>
        <div class="form-group">
          <label>Color credencial</label>
          <select id="f-color">
            <option value="">—</option>
            <option value="AZUL NAVY" ${t.color_credencial === 'AZUL NAVY' ? 'selected' : ''}>Azul Navy</option>
            <option value="AZUL CLARO" ${t.color_credencial === 'AZUL CLARO' ? 'selected' : ''}>Azul Claro</option>
            <option value="VERDE" ${t.color_credencial === 'VERDE' ? 'selected' : ''}>Verde</option>
            <option value="DORADO" ${t.color_credencial === 'DORADO' ? 'selected' : ''}>Dorado</option>
            <option value="ROJO" ${t.color_credencial === 'ROJO' ? 'selected' : ''}>Rojo</option>
            <option value="MORADO" ${t.color_credencial === 'MORADO' ? 'selected' : ''}>Morado</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Empresa</label>
        <input type="text" id="f-empresa" value="${t.empresa || CONFIG.EMPRESA}">
      </div>
    </div>

    <div class="captura-form">
      <h3>🩺 Salud</h3>
      <div class="row">
        <div class="form-group">
          <label>Grupo sanguíneo</label>
          <select id="f-gs">
            ${['', 'O+','O-','A+','A-','B+','B-','AB+','AB-','S/D'].map(g =>
              `<option value="${g}" ${t.grupo_sanguineo === g ? 'selected' : ''}>${g || '—'}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Talla EPP</label>
          <select id="f-talla">
            ${['', 'XS','S','M','L','XL','XXL'].map(s =>
              `<option value="${s}" ${t.talla_epp === s ? 'selected' : ''}>${s || '—'}</option>`
            ).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Alergias</label>
        <textarea id="f-alergias">${t.alergias || 'Niega'}</textarea>
      </div>
    </div>

    <div class="captura-form">
      <h3>🚨 Contacto de emergencia</h3>
      <div class="form-group">
        <label>Nombre del contacto</label>
        <input type="text" id="f-cont-nom" value="${t.contacto_emergencia || ''}" style="text-transform:uppercase">
      </div>
      <div class="row">
        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" id="f-cont-tel" value="${t.telefono_emergencia || ''}" inputmode="numeric" maxlength="9">
        </div>
        <div class="form-group">
          <label>Parentesco</label>
          <select id="f-parentesco">
            ${['', 'PADRE','MADRE','ESPOSO(A)','HIJO(A)','HERMANO(A)','OTRO'].map(p =>
              `<option value="${p}" ${t.parentesco === p ? 'selected' : ''}>${p || '—'}</option>`
            ).join('')}
          </select>
        </div>
      </div>
      <div class="form-group">
        <label>Domicilio</label>
        <input type="text" id="f-domicilio" value="${t.domicilio || ''}">
      </div>
    </div>

    <div class="captura-form">
      <h3>🛡️ Seguros</h3>
      <div class="form-group">
        <label>SCTR Salud</label>
        <input type="text" id="f-sctr-salud" value="${t.sctr_salud || ''}">
      </div>
      <div class="form-group">
        <label>SCTR Pensión</label>
        <input type="text" id="f-sctr-pension" value="${t.sctr_pension || ''}">
      </div>
      <div class="form-group">
        <label>EsSalud / EPS</label>
        <input type="text" id="f-essalud" value="${t.essalud_eps || ''}">
      </div>
    </div>

    <div class="captura-form">
      <h3>✍️ Firma del trabajador</h3>
      <p style="font-size:12px; color:var(--gray-700); margin-bottom:8px;">
        El trabajador declara conocer las obligaciones del fotocheck (PANASUR-SSOMA-FOR-FCH-001).
      </p>
      <canvas id="firma-canvas" class="firma-canvas"></canvas>
      <div class="firma-actions">
        <button class="btn-foto btn-secondary" onclick="limpiarFirma()">🗑️ Limpiar</button>
      </div>
    </div>

    <div class="captura-form">
      <h3>📝 Estado</h3>
      <div class="form-group">
        <label>Estado de la credencial</label>
        <select id="f-estado">
          ${['VIGENTE','PENDIENTE EMISIÓN','EN IMPRESIÓN','SUSPENDIDO','DEVUELTO','PERDIDO','VENCIDO'].map(e =>
            `<option value="${e}" ${t.estado === e ? 'selected' : ''}>${e}</option>`
          ).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Observaciones</label>
        <textarea id="f-obs">${t.observaciones || ''}</textarea>
      </div>
    </div>

    <div style="display:flex; gap:8px; margin-top:16px;">
      <button class="btn-secondary" onclick="verFotocheck()">👁 Vista previa</button>
      <button class="btn-primary" onclick="guardar()">💾 Guardar</button>
    </div>
    <div style="height:32px"></div>
  `;

  // Inicializar firma
  setTimeout(initFirma, 100);
}

// Auto color por tipo
function autoColor() {
  const tipo = document.getElementById('f-tipo').value;
  const colorEl = document.getElementById('f-color');
  const map = {
    'STAFF/GERENCIA': 'AZUL NAVY',
    'STAFF TÉCNICO': 'AZUL CLARO',
    'OBRERO/OPERATIVO': 'VERDE',
    'SUBCONTRATISTA': 'DORADO',
    'VISITA': 'ROJO',
    'MÉDICO/SALUD': 'MORADO'
  };
  if (map[tipo]) colorEl.value = map[tipo];
}

// ============================================================================
// CÁMARA
// ============================================================================
async function abrirCamara() {
  const modal = document.getElementById('modal-camara');
  modal.classList.remove('hidden');
  await iniciarCamara('user');
}

async function iniciarCamara(facing) {
  const video = document.getElementById('camara-video');
  try {
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(t => t.stop());
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    state.cameraStream = stream;
    state.cameraFacing = facing;
    video.srcObject = stream;
  } catch (err) {
    showToast('No se pudo acceder a la cámara: ' + err.message, 'error');
    cerrarCamara();
  }
}

function flipCamera() {
  iniciarCamara(state.cameraFacing === 'user' ? 'environment' : 'user');
}

function cerrarCamara() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(t => t.stop());
    state.cameraStream = null;
  }
  document.getElementById('modal-camara').classList.add('hidden');
}

function capturarFoto() {
  const video = document.getElementById('camara-video');
  const canvas = document.getElementById('camara-canvas');

  // Recortar al aspect ratio 3:4 desde el centro
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  const targetRatio = 3 / 4;
  const videoRatio = vw / vh;

  let sx, sy, sw, sh;
  if (videoRatio > targetRatio) {
    // Video más ancho: recortar lados
    sh = vh;
    sw = vh * targetRatio;
    sx = (vw - sw) / 2;
    sy = 0;
  } else {
    // Video más alto: recortar arriba/abajo
    sw = vw;
    sh = vw / targetRatio;
    sx = 0;
    sy = (vh - sh) / 2;
  }

  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Espejar si es cámara frontal
  if (state.cameraFacing === 'user') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

  state.fotoCapturada = canvas.toDataURL('image/jpeg', 0.85);
  cerrarCamara();
  document.getElementById('foto-preview').innerHTML = `<img src="${state.fotoCapturada}" alt="">`;
  showToast('Foto capturada ✓', 'success');
}

function seleccionarArchivo() {
  document.getElementById('file-input').click();
}

function archivoSeleccionado(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = ev => {
    // Recortar al canvas
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');

      const targetRatio = 3 / 4;
      const imgRatio = img.width / img.height;
      let sx, sy, sw, sh;
      if (imgRatio > targetRatio) {
        sh = img.height; sw = img.height * targetRatio;
        sx = (img.width - sw) / 2; sy = 0;
      } else {
        sw = img.width; sh = img.width / targetRatio;
        sx = 0; sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 600, 800);
      state.fotoCapturada = canvas.toDataURL('image/jpeg', 0.85);
      document.getElementById('foto-preview').innerHTML = `<img src="${state.fotoCapturada}" alt="">`;
      showToast('Foto cargada ✓', 'success');
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

// ============================================================================
// FIRMA
// ============================================================================
function initFirma() {
  const canvas = document.getElementById('firma-canvas');
  if (!canvas) return;

  // Resize canvas
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#1F3864';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  let drawing = false;
  let lastX = 0, lastY = 0;

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  };

  const start = (e) => {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    lastX = pos.x; lastY = pos.y;
  };

  const draw = (e) => {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x; lastY = pos.y;
  };

  const end = () => { drawing = false; };

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', end);
  canvas.addEventListener('mouseleave', end);
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', end);

  state.firmaPad = canvas;
}

function limpiarFirma() {
  const canvas = document.getElementById('firma-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function obtenerFirmaDataURL() {
  const canvas = document.getElementById('firma-canvas');
  if (!canvas) return null;
  // Verificar si tiene contenido
  const ctx = canvas.getContext('2d');
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hasContent = false;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] !== 0) { hasContent = true; break; }
  }
  return hasContent ? canvas.toDataURL('image/png') : null;
}

// ============================================================================
// GUARDAR
// ============================================================================
async function guardar() {
  const t = state.trabajadorActivo;
  if (!t) return;

  const dni = document.getElementById('f-dni').value.trim();
  const apellidos = document.getElementById('f-apellidos').value.trim().toUpperCase();
  const nombres = document.getElementById('f-nombres').value.trim().toUpperCase();

  if (!dni || !apellidos || !nombres) {
    showToast('DNI, apellidos y nombres son obligatorios', 'error');
    return;
  }

  showToast('Guardando...', 'success');

  try {
    let fotoUrl = t.foto_url;
    let firmaUrl = t.firma_url;

    // Subir foto si hay nueva
    if (state.fotoCapturada && state.fotoCapturada !== t.foto_url) {
      fotoUrl = await subirImagen(state.fotoCapturada, `fotos/${dni}_${Date.now()}.jpg`);
    }

    // Subir firma si hay
    const firma = obtenerFirmaDataURL();
    if (firma) {
      firmaUrl = await subirImagen(firma, `firmas/${dni}_${Date.now()}.png`);
    }

    // GPS
    let lat = null, lng = null;
    try {
      const pos = await new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000, enableHighAccuracy: false });
      });
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (_) { /* no GPS */ }

    const upd = {
      dni,
      apellidos,
      nombres,
      fecha_nacimiento: document.getElementById('f-fnac').value || null,
      sexo: document.getElementById('f-sexo').value || null,
      cargo: document.getElementById('f-cargo').value.trim().toUpperCase() || null,
      tipo_personal: document.getElementById('f-tipo').value || null,
      color_credencial: document.getElementById('f-color').value || null,
      empresa: document.getElementById('f-empresa').value.trim() || CONFIG.EMPRESA,
      grupo_sanguineo: document.getElementById('f-gs').value || null,
      talla_epp: document.getElementById('f-talla').value || null,
      alergias: document.getElementById('f-alergias').value.trim() || 'Niega',
      telefono: document.getElementById('f-tel').value.trim() || null,
      contacto_emergencia: document.getElementById('f-cont-nom').value.trim().toUpperCase() || null,
      telefono_emergencia: document.getElementById('f-cont-tel').value.trim() || null,
      parentesco: document.getElementById('f-parentesco').value || null,
      domicilio: document.getElementById('f-domicilio').value.trim() || null,
      sctr_salud: document.getElementById('f-sctr-salud').value.trim() || null,
      sctr_pension: document.getElementById('f-sctr-pension').value.trim() || null,
      essalud_eps: document.getElementById('f-essalud').value.trim() || null,
      estado: document.getElementById('f-estado').value || 'PENDIENTE EMISIÓN',
      observaciones: document.getElementById('f-obs').value.trim() || null,
      foto_url: fotoUrl,
      firma_url: firmaUrl,
      capturado_por: state.user.user,
      capturado_lat: lat,
      capturado_lng: lng,
      capturado_at: new Date().toISOString()
    };

    const { error } = await sb
      .from('panasur_fotochecks')
      .update(upd)
      .eq('id', t.id);

    if (error) throw error;

    // Auditoría
    await sb.from('panasur_fotocheck_audit').insert({
      fotocheck_id: t.id,
      accion: 'ACTUALIZACIÓN',
      usuario: state.user.user,
      lat, lng,
      detalles: { numero_credencial: t.numero_credencial, dni }
    });

    showToast('✓ Guardado correctamente', 'success');
    await cargarTrabajadores();
    state.trabajadorActivo = state.trabajadores.find(x => x.id === t.id);
    renderCapturarForm();
  } catch (err) {
    console.error(err);
    showToast('Error al guardar: ' + err.message, 'error');
  }
}

// Subir imagen base64 al storage
async function subirImagen(dataUrl, path) {
  const blob = await (await fetch(dataUrl)).blob();
  const { error } = await sb.storage.from(CONFIG.BUCKET).upload(path, blob, {
    contentType: blob.type,
    upsert: true
  });
  if (error) throw error;
  const { data } = sb.storage.from(CONFIG.BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ============================================================================
// VER FOTOCHECK
// ============================================================================
function verFotocheck() {
  const t = state.trabajadorActivo;
  if (!t) return;

  // Construir datos en vivo desde el formulario
  const datos = {
    numero_credencial: t.numero_credencial,
    dni: document.getElementById('f-dni').value || t.dni,
    apellidos: document.getElementById('f-apellidos').value || t.apellidos,
    nombres: document.getElementById('f-nombres').value || t.nombres,
    cargo: document.getElementById('f-cargo').value || t.cargo,
    tipo_personal: document.getElementById('f-tipo').value || t.tipo_personal,
    color_credencial: document.getElementById('f-color').value || t.color_credencial,
    grupo_sanguineo: document.getElementById('f-gs').value || t.grupo_sanguineo,
    foto_url: state.fotoCapturada || t.foto_url
  };

  const colorBg = CONFIG.COLOR_BG[datos.color_credencial] || '#808080';
  const fotoHtml = datos.foto_url
    ? `<img src="${datos.foto_url}" alt="">`
    : '<span>FOTO</span>';

  const container = document.getElementById('fc-preview-container');
  container.innerHTML = `
    <div class="fc-cara-label">ANVERSO</div>
    <div class="fc-card" id="fc-card-render">
      <div class="fc-banner">
        <div class="empresa">${CONFIG.EMPRESA}</div>
        <div class="ruc">RUC ${CONFIG.RUC}</div>
      </div>
      <div class="fc-proyecto">
        <div class="label">PROYECTO</div>
        <div class="nombre">ACCESO PRINCIPAL CSF HANAQPAMPA</div>
        <div class="cliente">Cliente: ${CONFIG.CLIENTE}</div>
      </div>
      <div class="fc-body">
        <div class="fc-foto">${fotoHtml}</div>
        <div class="fc-datos">
          <div class="label">APELLIDOS</div>
          <div class="valor">${datos.apellidos || '—'}</div>
          <div class="label">NOMBRES</div>
          <div class="valor">${datos.nombres || '—'}</div>
          <div class="label">DNI</div>
          <div class="valor">${datos.dni || '—'}</div>
          <div class="label">CARGO</div>
          <div class="valor" style="font-size:9px">${datos.cargo || '—'}</div>
        </div>
      </div>
      <div class="fc-tipo-banda" style="background:${colorBg}">
        ${datos.tipo_personal || 'TIPO NO ASIGNADO'}
      </div>
      <div class="fc-emergencia">
        <div class="fc-gs">
          <div class="label">GRUPO</div>
          <div class="valor">${datos.grupo_sanguineo || '?'}</div>
        </div>
        <div class="fc-emerg-info">
          <div class="label">EMERGENCIA SSOMA</div>
          <div class="ambulancia">Ambulancia EUH-394</div>
          <div class="tel">${CONFIG.TEL_EMERGENCIA}</div>
        </div>
      </div>
      <div class="fc-bottom">
        <div>
          <div class="label">N° CREDENCIAL</div>
          <div class="valor">${datos.numero_credencial}</div>
        </div>
        <div>
          <div class="label">VIGENCIA</div>
          <div class="valor">30/06/2026</div>
        </div>
      </div>
      <div class="fc-qr-corner" id="fc-qr-corner"></div>
    </div>
  `;

  // Generar QR
  const qrEl = document.getElementById('fc-qr-corner');
  if (qrEl) {
    QRCode.toCanvas(datos.numero_credencial + '|' + datos.dni, { width: 80, margin: 1 }, (err, canvas) => {
      if (!err) qrEl.appendChild(canvas);
    });
  }

  document.getElementById('modal-fotocheck').classList.remove('hidden');
}

function cerrarModalFotocheck() {
  document.getElementById('modal-fotocheck').classList.add('hidden');
}

async function descargarFotocheck() {
  showToast('Generando imagen...', 'success');
  const card = document.getElementById('fc-card-render');
  if (!card) return;

  // Usar html2canvas alternativo: render manual a canvas
  // Aquí usamos una versión simple - en producción usar html2canvas
  try {
    // Cargar html2canvas si no está cargado
    if (!window.html2canvas) {
      await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    }
    const canvas = await html2canvas(card, { scale: 3, backgroundColor: null, useCORS: true });
    const link = document.createElement('a');
    link.download = `${state.trabajadorActivo.numero_credencial}_fotocheck.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('✓ Descargado', 'success');
  } catch (err) {
    showToast('Error al descargar: ' + err.message, 'error');
  }
}

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

// ============================================================================
// DASHBOARD
// ============================================================================
function renderDashboard() {
  const t = state.trabajadores;
  const total = t.length;
  const vigentes = t.filter(x => x.estado === 'VIGENTE').length;
  const pendientes = t.filter(x => x.estado === 'PENDIENTE EMISIÓN').length;
  const sinFoto = t.filter(x => !x.foto_url).length;

  document.getElementById('kpi-total').textContent = total;
  document.getElementById('kpi-vigentes').textContent = vigentes;
  document.getElementById('kpi-pendientes').textContent = pendientes;
  document.getElementById('kpi-sin-foto').textContent = sinFoto;

  // Distribución por tipo
  const tipos = ['STAFF/GERENCIA','STAFF TÉCNICO','OBRERO/OPERATIVO','SUBCONTRATISTA','VISITA','MÉDICO/SALUD'];
  const colores = ['#1F3864','#2E75B6','#548235','#FFC000','#C00000','#7030A0'];
  const dist = document.getElementById('dist-tipo');
  dist.innerHTML = tipos.map((tp, i) => {
    const count = t.filter(x => x.tipo_personal === tp).length;
    return `
      <div class="dist-row">
        <span class="dist-color" style="background:${colores[i]}"></span>
        <span class="dist-label">${tp}</span>
        <span class="dist-count">${count}</span>
      </div>
    `;
  }).join('');

  // Sin tipo
  const sinTipo = t.filter(x => !x.tipo_personal).length;
  if (sinTipo > 0) {
    dist.innerHTML += `
      <div class="dist-row">
        <span class="dist-color" style="background:#BFBFBF"></span>
        <span class="dist-label">Sin tipo asignado</span>
        <span class="dist-count">${sinTipo}</span>
      </div>
    `;
  }

  // EMO próximos a vencer
  const hoy = new Date();
  const en30 = new Date(); en30.setDate(en30.getDate() + 30);
  const porVencer = t.filter(x => {
    if (!x.vigencia_emo) return false;
    const v = new Date(x.vigencia_emo);
    return v >= hoy && v <= en30;
  });
  const vencer = document.getElementById('emo-vencer');
  if (porVencer.length === 0) {
    vencer.innerHTML = '<div class="loading" style="padding:20px">No hay EMO próximos a vencer 👍</div>';
  } else {
    vencer.innerHTML = porVencer.map(x => renderTrabCard(x)).join('');
  }
}

// ============================================================================
// UTILS
// ============================================================================
function updateOnlineStatus() {
  const el = document.getElementById('online-status');
  if (navigator.onLine) {
    el.classList.remove('offline');
    el.classList.add('online');
    el.textContent = '● En línea';
  } else {
    el.classList.remove('online');
    el.classList.add('offline');
    el.textContent = '● Offline';
  }
}

function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.classList.remove('show'), 2500);
}

// PWA: registrar service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
