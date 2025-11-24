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

