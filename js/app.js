"use strict";//Para ES6 módulos (<script type="module">), el modo estricto por activado por defecto.


/* ***************************************+++ Funciionalidades con javaScript */



/* ------------------------------------------ sección HERO formulario inscripción ---------------------------------------- */

/* modal de inscripción. lo hago directamente con html.*/

/* modal de clasificaciones. lo hago directamente con html.*/

/* ******************+ modal de resultados. lo abro desde app.js *******************+*/

// inicializo el modal de resultados
const modalResultados = new bootstrap.Modal(document.getElementById('modalResultadis'));
// asigno el evento click al botón de ver resultados
document.getElementById('enlaceResultados').addEventListener('click', function (e) {
  e.preventDefault(); // evito que recargue la página al usar href="#"
  modalResultados.show(); // si pongo hide lo cierra
});







/* control del Modal del fomrulario 

- consideraciones:
  shown.bs.modal: se dispara cuando el modal ya se ha mostrado al usuario (después de la animación de apertura).
  show.bs.modal: se dispara justo antes de que el modal se muestre al usuario.
  hide.bs.modal: se dispara justo antes de que el modal se oculte.
  hidden.bs.modal: se dispara cuando el modal ya se ha ocultado al usuario (después de la animación de cierre).
  
  
  según requisitos:

Modal de reserva/inscripción:
  o Al abrir el modal (shown.bs.modal), enfocar el primer campo del formulario.
  o Al cerrarlo (hidden.bs.modal), resetear el formulario.


*/
const modalInscripcion = document.getElementById('modalInscripcion');
const formulario = document.getElementById('formularioInscripcion');
const nombreEquipo = document.getElementById('nombreEquipo');

// ponemos foco en el primer campo al abrir el modal con evento shown.bs.modal 
modalInscripcion.addEventListener('shown.bs.modal', () => {
  nombreEquipo.focus();
});

// Reseteamos el formulario al cerrar el modal. Capturamos el evento hidden.bs.modal
modalInscripcion.addEventListener('hidden.bs.modal', () => {
  formulario.reset();
  formulario.classList.remove('was-validated'); // limpia validación visual
});


/*toast del fomrulario de incripción.Control  */

document.getElementById('formularioInscripcion').addEventListener('submit', function (e) {
  e.preventDefault(); // para detener el evento y que no lo envie

  // Validar el formulario por defecto
  if (this.checkValidity()) {
    // cierro modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalInscripcion'));
    modal.hide();

    // muestro toast de confirmación
    const toast = new bootstrap.Toast(document.getElementById('toastConfirmacionFormulario'), { delay: 10000 });
    toast.show();
  } else {
    this.classList.add('was-validated'); // activa estilos de validación Bootstrap
  }
});



/* ------------------------------------------ sección carrusel de notincias ---------------------------------------- */


/* contador para el carrusel de noticias */
document.addEventListener('DOMContentLoaded', function () {
  // obtengo elementos del DOM
  const carousel = document.getElementById('carouselExampleDark');
  const contador = document.getElementById('contadorDiapositivas');
  const totalDiapositivas = carousel.querySelectorAll('.carousel-item').length;

  // Inicializar contador en la primera diapositiva
  contador.textContent = `Noticia 1 de ${totalDiapositivas}`;

  // Escuchar el evento de Bootstrap
  carousel.addEventListener('slid.bs.carousel', function (event) {
    // event.to devuelve el índice de la diapositiva activa (0,1,2,...)
    const indiceDiapositiva = event.to + 1; // sumamos 1 para que empiece en 1
    contador.textContent = `Noticia ${indiceDiapositiva} de ${totalDiapositivas}`;
  });
});

/* modales de noticias */





/* ******************** modificación de ESTILO  en modal de jugadores ***********************+
*********************************************************************************************/

// obtengo el modal de jugadores
const modalJugadores = document.getElementById('modalFiltrarJugadores');

//obtengo contenido del modal
const contenidoModalJugadores = modalJugadores.querySelector('.modal-content');

//obtengo cabecera del modal
const cabeceraModalJugadores = modalJugadores.querySelector('.modal-header');

// obtengo h4 del modal
const h4ModalJugadores = cabeceraModalJugadores.querySelector('h4');


// capturo evento shown.bs.modal que se dispara al mostrarse el modal
modalJugadores.addEventListener('shown.bs.modal', () => {

  // estilo contenido
  contenidoModalJugadores.style.backgroundColor = '#b1d4f9ff';
  // estilo cabecera
  cabeceraModalJugadores.style.backgroundColor = '#f8d0d0ff';
  // estilo h4
  h4ModalJugadores.style.color = '#5f6a7aff';
  h4ModalJugadores.style.fontWeight = 'bold';

});


/* *************************** filtrados equipos, resultados y clasificaciones ****************
**********************************************************************************************-*/



/*-----------------filtro de EQUIPOS

  - implemento directamente en navBar para que sea diferente al de resultado y clasificaiones
*/

/*---------------filtro de RESULTADOS 

  - por competición seleccionada en el select
  - por defecto muestra los resultados de fútbol-sala porque en el html
      no tiene definida la clase d-none <div id="futbolSala" class="competicion">
  - se captura el evento change del select 
*/
document.addEventListener("DOMContentLoaded", function () {

  // recojo elementos del modal
  const modal = document.getElementById("modalResultadis");
  const select = modal.querySelector("#selectCompeticionResultados");
  const competiciones = modal.querySelectorAll(".competicion");

  // función para mostrar los resultados según la competición seleccionada
  function mostrarResultados() {
    // Ocultar todas las competiciones dentro del modal
    competiciones.forEach(div => div.classList.add("d-none"));
    // Mostrar la seleccionada
    const seleccion = select.value;
    // busco el div correspondiente a la selección
    const divSeleccionado = modal.querySelector("#" + seleccion)
    // muestro el div seleccionado
    if (divSeleccionado) {
      divSeleccionado.classList.remove("d-none");
    }
  }

  // Evento al cambiar el select
  select.addEventListener("change", mostrarResultados);
  // Mostrar la primera opción por defecto al abrir el modal
  mostrarResultados();
});



/*-----------------------filtro de las CLASIFICACIONES 

  - por competición seleccionada en el select
  - por defecto muestra los resultados de fútbol-sala porque en el html su display es block y para los demas es none
  <div id="futbolSala" class="competicion" style="display:block;">

*/

document.addEventListener("DOMContentLoaded", () => {

  const bloques = document.getElementById("modalClasificaciones"); // contenedor de los bloques de competiciones del modal clasificaciones
  const select = bloques.querySelector("#selectCompeticionClasificacion");
  const bloquesResultados = bloques.querySelectorAll(".competicion");
  // función para mostrar los resultados según la competición seleccionada
  function mostrarClasificacion() {

    // Ocultar todas las competiciones dentro del modal
    bloquesResultados.forEach(divCompeticion => {
      divCompeticion.style.display = "none";
    });

    // Recorro todos los bloques 
    bloquesResultados.forEach(divCompeticion => {
      // registro en consola 
      console.log("divCompeticion:", divCompeticion.id);
      // Mostrar la seleccionada
      const seleccion = select.value;
      // busco el div correspondiente a la selección
      const divSeleccionado = bloques.querySelector("#" + seleccion);

      // muestro el div seleccionado
      if (divSeleccionado) {
        divSeleccionado.style.display = "block";
      }

    });

  }
  // Evento al cambiar el select
  select.addEventListener("change", mostrarClasificacion);
  // Mostrar la primera opción por defecto al abrir el modal
  mostrarClasificacion();

});


/* *************************** filtrado JUGADORES*******************************************+
**********************************************************************************************


  filtrado de JUGADORES por NOMBRE y APELLIDO y COMPETICIONES

  - includes() devuelve true si el texto buscado está en la cadena, y false si no lo está.
  - forEach() ejecuta la función indicada una vez por cada elemento del array.
  - toLowerCase() convierte una cadena de texto a minúsculas.
  - querySelectorAll() devuelve todos los elementos del documento que coinciden con un selector CSS.

  - IMPORTANTE: Tuve problema porque getElementById solo está disponible en document y lo estaba usando para
  buscar dentro de un div específico. Para ello debo usar querySelector o querySelectorAll.

  const inputNombre = divJugadoresInscritos.getElementById("buscadorNombre"); // incorrecto
  const inputNombre = divJugadoresInscritos.querySelector("#buscadorNombre");


*/


document.addEventListener("DOMContentLoaded", () => {


  //div que contiene la tabla de jugadores y el select de competiciones
  const divJugadoresInscritos = document.getElementById('modalFiltrarJugadores');

  //recojo entradas a buscar
  const inputNombre = divJugadoresInscritos.querySelector("#buscadorNombre");
  const inputApellido = divJugadoresInscritos.querySelector("#buscadorApellido");
  const selectCompeticion = divJugadoresInscritos.querySelector('#buscadorCompeticion');

  //seleccion todas las filas de la tabla de los jugadores
  const filas = divJugadoresInscritos.querySelectorAll("tbody tr");

  // función de filtrado
  function filtrarJugadores() {
    // paso todo a minusculas de esta forma es indiferente escribir Mayúsculas o minúsculas
    const nombreFiltro = inputNombre.value.toLowerCase();
    const apellidoFiltro = inputApellido.value.toLowerCase();
    const competicionFiltro = selectCompeticion.value.toLowerCase();

    console.log("----************** Dentro de la función filtrarJugadores **********-------");
    console.log("------ valores en input --------------------");
    console.log("nombreFiltro:", nombreFiltro);
    console.log("apellidoFiltro:", apellidoFiltro);
    console.log("competicionFiltro:", competicionFiltro);
    // recorremos todas las filas
    filas.forEach(fila => {
      console.log("---- Dentro del forEach ----------------");

      console.log("######## fila ########");
      console.log("contenido fila:", fila);
      //de cada una de las filas recojo los 3 campos a comparar
      const nombre = fila.cells[0].textContent.toLowerCase();
      console.log("nombre:", nombre);
      const apellido = fila.cells[1].textContent.toLowerCase();
      console.log("apellido:", apellido);
      const competicion = fila.cells[2].textContent.toLowerCase();
      console.log("competicion:", competicion);

      console.log("################");

      // compruebo si coinciden los filtros guardando true o false
      const boolExisteNombre = nombre.startsWith(nombreFiltro);// Si uso includes busqua en cualquier parte del nombre la letra que metamos. No me interesa porque si escribo "m" me saldría "Marta" y "Jose Manuel". Con startsWith solo me saldría "Marta"
      const boolExisteApellido = apellido.startsWith(apellidoFiltro);
      const boolExisteCompeticion = competicionFiltro === "" || competicion.includes(competicionFiltro);

      console.log("######## Resultado coincidencia ########");
      console.log("boolExisteNombre:", boolExisteNombre);
      console.log("boolExisteApellido:", boolExisteApellido);
      console.log("boolExisteCompeticion:", boolExisteCompeticion);
      console.log("################");

      // si coinciden los tres valores mostraré la fila
      if (boolExisteNombre && boolExisteApellido && boolExisteCompeticion) {
        fila.style.display = "table-row";// muestro
      } else {
        fila.style.display = "none";
      }
    });

    console.log("----************** FIN función filtrarJugadores FIN**********-------");
  }

  // Escuchar cambios en los tres campos. En vez de keyup como hice en busqueda de arbitros en este caso uso input.Es mas completo.
  inputNombre.addEventListener("input", filtrarJugadores);// keyup nos permite realizar filtrado mientras escribimos
  inputApellido.addEventListener("input", filtrarJugadores);
  selectCompeticion.addEventListener("change", filtrarJugadores);// change nos permite detectar cambio en el select
});


/*  *************************** filtrado ÁRBITROS*******************************************+
**********************************************************************************************


filtrado de ÁRBITROS por NOMBRE y APELLIDO y COMPETICIONES

  - Uso startsWith() en vez de includes para que devuelve true si la cadena comienza con los caracteres de la cadena especificada, de lo contrario devuelve false. De esta forma según voy añadiendo letras va descartando arbitros
  - forEach() ejecuta la función indicada una vez por cada elemento del array.
  - toLowerCase() convierte una cadena de texto a minúsculas.
  - querySelectorAll() devuelve todos los elementos del documento que coinciden con un selector CSS.

*/


document.addEventListener("DOMContentLoaded", () => {

  //recojo entradas a buscar
  const inputNombre = document.getElementById("buscadorNombreArbitro");
  const inputApellido = document.getElementById("buscadorApellidoArbitro");
  const selectCompeticion = document.getElementById("buscadorCompeticionArbitro");


  //seleccion todas las filas de la tabla de los jugadores
  const filas = document.querySelectorAll("tbody tr");

  function filtrarArbitros() {
    // paso todo a minusculas de esta forma es indiferente escribir Mayúsculas o minúsculas
    const nombreFiltro = inputNombre.value.toLowerCase();
    const apellidoFiltro = inputApellido.value.toLowerCase();
    const competicionFiltro = selectCompeticion.value.toLowerCase();

    filas.forEach(fila => {
      //de cada una de las filas recojo los 3 campos a comparar
      const nombre = fila.cells[0].textContent.toLowerCase();
      const apellido = fila.cells[1].textContent.toLowerCase();
      const competicion = fila.cells[2].textContent.toLowerCase();

      // compruebo si coinciden los filtros guardando true o false
      const boolExisteNombre = nombre.startsWith(nombreFiltro);//
      const boolExisteApellido = apellido.startsWith(apellidoFiltro);
      // si el filtro de competición está vacío o coincide
      const boolExisteCompeticion = competicionFiltro === "" || competicion.includes(competicionFiltro);

      // si coinciden los tres valores mostraré la fila
      if (boolExisteNombre && boolExisteApellido && boolExisteCompeticion) {
        fila.style.display = "table-row";// muestro
      } else {
        fila.style.display = "none";
      }
    });
  }

  // Escuchar cambios en los tres campos
  inputNombre.addEventListener("keyup", filtrarArbitros);// keyup nos permite realizar filtrado mientras escribimos
  inputApellido.addEventListener("keyup", filtrarArbitros);
  selectCompeticion.addEventListener("change", filtrarArbitros);// change nos permite detectar cambio en el select
});



/* ---------------------------Registro en consola de los eventos COLLAPSE de las Cards-------------
 ----------------------------------------------------------------------------------------------------------
 
 - me he ayudado de la IA para hacerlo
 - eventos:
   • show.bs.collapse: se dispara justo antes de que el contenido colapsable se muestre.
   • shown.bs.collapse: se dispara justo después de que el contenido colapsable se haya mostrado.
   • hide.bs.collapse: se dispara justo antes de que el contenido colapsable se oculte.
   • hidden.bs.collapse: se dispara justo después de que el contenido colapsable se haya ocultado.

  - en la consola del navegador se verá el id del collapse que se abre o cierra
 
 */
// Selecciona todos los elementos con la clase collapse
document.querySelectorAll('.collapse').forEach(collapseEl => {

  collapseEl.addEventListener('show.bs.collapse', () => {
    console.log(`Se va a abrir: ${collapseEl.id}`);
  });

  collapseEl.addEventListener('shown.bs.collapse', () => {
    console.log(`Ya se abrió: ${collapseEl.id}`);
  });

  collapseEl.addEventListener('hide.bs.collapse', () => {
    console.log(`Se va a cerrar: ${collapseEl.id}`);
  });

  collapseEl.addEventListener('hidden.bs.collapse', () => {
    console.log(`Ya se cerró: ${collapseEl.id}`);
  });
});












