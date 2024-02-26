// Variables globales
const $cantidad = document.getElementById("cantidad");
const $precioApagar = document.getElementById("precio");
const $totalPaquetes = document.getElementById("totalPaquetes");
const $pagoTotal = document.getElementById("pagoTotal");
const $tbody = document.querySelector("tbody");
const $btnAgregar = document.getElementById("agregar");
const $btnLimpiar = document.getElementById("limpiar");
let registros = []; // Array para almacenar los registros de la tabla

// Función para agregar un registro
function agregarRegistro() {
  if (!$cantidad.value || !$precioApagar.value) {
    alert("Por favor asegúrese de completar los campos");
    return false;
  }
  
  // Crear objeto para el registro
  const nuevoRegistro = {
    cantidad: $cantidad.value,
    fecha: formatearFecha(new Date()),
    precio: `$${$precioApagar.value}`
  };

  // Agregar el registro al array de registros
  registros.push(nuevoRegistro);

  // Actualizar la tabla
  renderizarTabla();

  // Actualizar el total del pago y cantidad de paquetes en total
  actualizarTotales();

  // Limpiar campos
  $cantidad.value = '';
  $precioApagar.value = '';

  // Guardar los datos en el almacenamiento local
  guardarDatos();
}

function formatearFecha(fecha) {
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return fecha.toLocaleDateString('es-ES', opciones);
}

// Función para limpiar los registros y el almacenamiento local
function limpiarRegistro() {
  // Limpiar registros en la tabla
  $tbody.innerHTML = '';

  // Limpiar array de registros
  registros = [];

  // Actualizar totales en la página
  actualizarTotales();

  // Borrar datos del almacenamiento local
  localStorage.removeItem('datosRegistro');
}

// Función para renderizar la tabla
function renderizarTabla() {
  $tbody.innerHTML = ''; // Limpiar contenido existente
  registros.forEach(registro => {
    const $tr = document.createElement("tr");
    Object.values(registro).forEach(valor => {
      const $td = document.createElement("td");
      $td.textContent = valor;
      $tr.appendChild($td);
    });
    $tbody.appendChild($tr);
  });
}

// Función para actualizar totales
function actualizarTotales() {
  let totalPago = 0;
  let paquetesEnTotal = 0;
  registros.forEach(registro => {
    totalPago += parseInt(registro.precio.replace('$', '')) * parseInt(registro.cantidad);
    paquetesEnTotal += parseInt(registro.cantidad);
  });
  $pagoTotal.textContent = `$${totalPago}`;
  $totalPaquetes.textContent = paquetesEnTotal;
}

// Función para guardar los datos en el almacenamiento local
function guardarDatos() {
  localStorage.setItem('datosRegistro', JSON.stringify(registros));
}

// Event Listeners
$btnAgregar.addEventListener("click", agregarRegistro);
$btnLimpiar.addEventListener("click", limpiarRegistro);

// Verificar si hay datos almacenados en el almacenamiento local y restaurarlos si es necesario
window.addEventListener('load', function () {
  const datosGuardados = localStorage.getItem('datosRegistro');
  if (datosGuardados) {
    registros = JSON.parse(datosGuardados);
    renderizarTabla();
    actualizarTotales();
  }
});
