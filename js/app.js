const $cantidad = document.getElementById("cantidad");
const $btnAgregar = document.getElementById("agregar");
const $totalPaquetes = document.getElementById("totalPaquetes");
const $pagoTotal = document.getElementById("pagoTotal");
const $tbody = document.querySelector("tbody");
let $totalPago = 0; // Variable para almacenar el total del pago
let $paquetesEnTotal = 0; // Variable para almacenar el total de los paquetes

function agregarRegistro() {
  // Crear un fragmento
  let $fragment = document.createDocumentFragment();
  let $precioDePaquetes = 25;

  let $tr = document.createElement("tr");

  let $tdPaquetes = document.createElement("td");
  let $tdDate = document.createElement("td");
  let $tdPrecio = document.createElement("td");

  // Asignar los valores a las celdas
  $tdPaquetes.textContent = $cantidad.value;

  const fechaActual = new Date();
  $tdDate.textContent = formatearFecha(fechaActual);

  $tdPrecio.textContent = `$${$precioDePaquetes}`

  // Añadir las celdas a la fila
  $tr.appendChild($tdPaquetes);
  $tr.appendChild($tdDate);
  $tr.appendChild($tdPrecio);

  $fragment.appendChild($tr);

  $tbody.appendChild($fragment);

  // Actualizar el total del pago
  $totalPago += parseInt($precioDePaquetes) * parseInt($cantidad.value);
  $pagoTotal.textContent = `$${$totalPago}`;

  // Actualizar cantidad de paquetes en total
  $paquetesEnTotal += Number( $cantidad.value);
  $totalPaquetes.textContent = `$${$paquetesEnTotal}`;

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

$btnAgregar.addEventListener("click", agregarRegistro);
