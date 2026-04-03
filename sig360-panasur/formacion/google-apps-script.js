// ============================================================================
//  GOOGLE APPS SCRIPT — Backend para Evaluación de Inducción SST
//  Tours Panasur E.I.R.L. | SIG360
// ============================================================================
//
//  INSTRUCCIONES DE INSTALACION:
//
//  1. Abre Google Sheets y crea una hoja de calculo nueva (o usa una existente).
//
//  2. Ve a Extensiones > Apps Script.
//
//  3. Borra todo el contenido del editor y pega este archivo completo.
//
//  4. Guarda el proyecto (Ctrl+S) con el nombre que desees,
//     por ejemplo: "Backend Evaluaciones Induccion".
//
//  5. Despliega como Web App:
//     a. Haz clic en "Implementar" > "Nueva implementacion".
//     b. En "Tipo", selecciona "Aplicacion web".
//     c. En "Descripcion", escribe algo como "Evaluaciones Induccion v1".
//     d. En "Ejecutar como", selecciona "Yo" (tu cuenta).
//     e. En "Quien tiene acceso", selecciona "Cualquier persona".
//     f. Haz clic en "Implementar".
//     g. Autoriza los permisos cuando se te solicite.
//     h. Copia la URL generada (termina en /exec).
//
//  6. Pega esa URL en el archivo evaluacion.html, en la variable SHEET_URL:
//     const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
//
//  NOTA: Cada vez que modifiques este codigo, debes crear una NUEVA
//  implementacion para que los cambios surtan efecto.
//
// ============================================================================

var SHEET_NAME = 'Evaluaciones_Induccion';

var HEADERS = [
  'Timestamp',
  'Nombre',
  'DNI',
  'Cargo',
  'Nota',
  'Resultado',
  'Correctas',
  'Incorrectas',
  'Tiempo',
  'Código Certificado',
  'Detalle'
];

// ----------------------------------------------------------------------------
//  getOrCreateSheet — Obtiene la hoja o la crea con encabezados
// ----------------------------------------------------------------------------
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);

    // Escribir encabezados en la primera fila
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    // Formato de encabezados
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1e3a6e');
    headerRange.setFontColor('#ffffff');
    headerRange.setHorizontalAlignment('center');

    // Congelar la fila de encabezados
    sheet.setFrozenRows(1);

    // Ajustar ancho de columnas
    sheet.setColumnWidth(1, 180);  // Timestamp
    sheet.setColumnWidth(2, 200);  // Nombre
    sheet.setColumnWidth(3, 120);  // DNI
    sheet.setColumnWidth(4, 180);  // Cargo
    sheet.setColumnWidth(5, 80);   // Nota
    sheet.setColumnWidth(6, 120);  // Resultado
    sheet.setColumnWidth(7, 100);  // Correctas
    sheet.setColumnWidth(8, 100);  // Incorrectas
    sheet.setColumnWidth(9, 100);  // Tiempo
    sheet.setColumnWidth(10, 200); // Codigo Certificado
    sheet.setColumnWidth(11, 300); // Detalle
  }

  return sheet;
}

// ----------------------------------------------------------------------------
//  doPost — Recibe los datos de la evaluacion via POST
// ----------------------------------------------------------------------------
function doPost(e) {
  try {
    var data;

    // Intentar parsear el JSON del body
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      return buildResponse({ status: 'error', message: 'No se recibieron datos.' });
    }

    var sheet = getOrCreateSheet();

    // Generar timestamp en zona horaria de Peru
    var timestamp = Utilities.formatDate(
      new Date(),
      'America/Lima',
      'dd/MM/yyyy HH:mm:ss'
    );

    // Preparar la fila de datos
    var row = [
      timestamp,
      data.nombre    || '',
      data.dni       || '',
      data.cargo     || '',
      data.nota      || 0,
      data.resultado || '',
      data.correctas   || 0,
      data.incorrectas || 0,
      data.tiempo    || '',
      data.codigo    || '',
      data.detalle   || ''
    ];

    // Agregar la fila al final de la hoja
    sheet.appendRow(row);

    // Aplicar formato condicional a la celda de resultado
    var lastRow = sheet.getLastRow();
    var resultCell = sheet.getRange(lastRow, 6); // Columna Resultado
    if (data.resultado === 'APROBADO') {
      resultCell.setBackground('#d4edda');
      resultCell.setFontColor('#155724');
    } else if (data.resultado === 'DESAPROBADO') {
      resultCell.setBackground('#f8d7da');
      resultCell.setFontColor('#721c24');
    }

    return buildResponse({ status: 'ok', message: 'Datos registrados correctamente.' });

  } catch (error) {
    return buildResponse({ status: 'error', message: error.toString() });
  }
}

// ----------------------------------------------------------------------------
//  doGet — Responde a solicitudes GET (verificacion de que el script funciona)
// ----------------------------------------------------------------------------
function doGet(e) {
  // Si se pasa el parametro action=count, devolver cantidad de registros
  if (e && e.parameter && e.parameter.action === 'count') {
    var sheet = getOrCreateSheet();
    var count = Math.max(0, sheet.getLastRow() - 1); // Restar fila de encabezados
    return buildResponse({
      status: 'ok',
      registros: count
    });
  }

  // Respuesta por defecto
  return buildResponse({
    status: 'ok',
    message: 'Backend de Evaluaciones de Induccion SST — Tours Panasur activo.',
    version: '1.0',
    hoja: SHEET_NAME
  });
}

// ----------------------------------------------------------------------------
//  buildResponse — Construye la respuesta JSON con headers CORS
// ----------------------------------------------------------------------------
function buildResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ----------------------------------------------------------------------------
//  onOpen — Menu personalizado en Google Sheets (opcional)
// ----------------------------------------------------------------------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Evaluaciones SST')
    .addItem('Ver resumen', 'showSummary')
    .addItem('Crear/verificar hoja', 'getOrCreateSheet')
    .addToUi();
}

// ----------------------------------------------------------------------------
//  showSummary — Muestra un resumen rapido de las evaluaciones
// ----------------------------------------------------------------------------
function showSummary() {
  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert('No hay evaluaciones registradas aun.');
    return;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  var total = data.length;
  var aprobados = 0;
  var desaprobados = 0;
  var sumaNotas = 0;

  for (var i = 0; i < data.length; i++) {
    var nota = parseFloat(data[i][4]) || 0;
    sumaNotas += nota;
    if (data[i][5] === 'APROBADO') {
      aprobados++;
    } else {
      desaprobados++;
    }
  }

  var promedio = (sumaNotas / total).toFixed(1);
  var porcentaje = ((aprobados / total) * 100).toFixed(1);

  var msg = 'RESUMEN DE EVALUACIONES\n'
    + '========================\n'
    + 'Total evaluaciones: ' + total + '\n'
    + 'Aprobados: ' + aprobados + '\n'
    + 'Desaprobados: ' + desaprobados + '\n'
    + 'Nota promedio: ' + promedio + '\n'
    + 'Tasa de aprobacion: ' + porcentaje + '%';

  SpreadsheetApp.getUi().alert(msg);
}
