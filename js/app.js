const $cantidad = document.getElementById("cantidad");
const $btnAgregar = document.getElementById("agregar");
const $totalPaquetes = document.getElementById("totalPaquetes");
const $pagoTotal = document.getElementById("pagoTotal");
const $tbody = document.querySelector("tbody");

function agregarRegistro() {
  // Crear un fragmento
  let $fragment = document.createDocumentFragment();
  let $precioDePaquetes = 25;

  // Crear una nueva fila
  let $tr = document.createElement("tr");

  // Crear tres celdas
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

  // Añadir la fila al fragmento
  $fragment.appendChild($tr);

  // Añadir el fragmento al tbody
  $tbody.appendChild($fragment);
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