/* ***************************************+++ Funciionalidades con javaScript */



/* ------------------------------------------ sección HERO formulario inscripción ---------------------------------------- */

/* modal de inscripción. lo hago directamente con html.*/

/* modal de clasificaciones. lo hago directamente con html.*/

/* modal de resultados. lo abro desde app.js */

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




/* cambiar componentes modificando estilo

  - color del modal en función de si es voleybol, baloncesto o fútbol-sala








*/

/* modales y filtrar


  Hola Manuel. El proyecto puede parecer algo denso a priori, pero hay varias secciones que se hacen con componentes de Bootstrap similares. Por ejemplo, tanto los jugadores como los arbitros pueden hacerse con cards. Los equipos... pues casi que también...
Además, no hace falta que hagas 200 jugadores... Con tener 3-4 equipos de futbol formados por 5-6 jugadores puede ser suficiente... Se evalúa el uso de los componentes y, lógicamente, si veo que entiendes cómo hacer un "card" , imagino que los 100 siguientes se harán de la misma forma.

Hay algunas elementos como los modales o los filtros que pueden pareces complejos y requerir de JavaScript, pero no hay mucho código detrás.
Te doy una pista: el truco está en jugar con el display-flex/display-block y el display-none
Es decir, el HTML del modal no es más que un div (con contenido dentro) cuyo css originalmente tiene un display-none para ocultarlo y no hacerlo visible. Sin embargo, tenemos un botón cuya accion (eventListener) puede desencadenar modificaciones sobre el estilo del modal. Esto es que, la funcion que ejecuta el botón, ponga el modal en display-flex.

A lo largo del tema se irán viendo componentes que requieren de código JavaScript, pero no es un código muy muy complejo, ya que solo son llamadas a funciones a través de escuchadores de eventos (eventListener).
De todas formas, podéis hacer uso del foro para compartir cualquier duda sobre JavaScript que tengáis.



*/

/* modificación de estilo en modal de jugadores */
const modalJugadores = document.getElementById('modalJugadores');

//obtengo contenido del modal
const  contenidoModalJugadores = modalJugadores.querySelector('.modal-content');

//obtengo cabecera del modal
const cabeceraModalJugadores = modalJugadores.querySelector('.modal-header');

// obtengo h4 del modal
const h4ModalJugadores = cabeceraModalJugadores.querySelector('h4');


// capturo evento
modalJugadores.addEventListener('shown.bs.modal', () => {

// estilo contenido
contenidoModalJugadores.style.backgroundColor='#b1d4f9ff';

// estilo cabecera
cabeceraModalJugadores.style.backgroundColor='#f8d0d0ff';

// estilo h4
h4ModalJugadores.style.color='#5f6a7aff';
h4ModalJugadores.style.fontWeight='bold';

});


// color azul claro para jugadores
