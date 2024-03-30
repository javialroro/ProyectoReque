var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("usuario");

//==================Pantalla Menu Principal==========================
function enviarAAsignarColab() {
    window.location.href= './Asignar.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarAModColab() {
    window.location.href= './ModificarColab.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarACrearProyecto() {
    window.location.href= './crearProyecto.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarAConsultarProyecto() {
    window.location.href= './consultaProy.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarAModProyecto() {
    window.location.href= './modificarProy.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarACrearReunion() {
    window.location.href= './crearReunion.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

function enviarAInformeGeneral() {
    window.location.href= './InformeGeneral.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema); //Hacer la pantalla de informe general
}

function enviarAForos() {
    window.location.href= './foro.html?usuario='+ encodeURIComponent(usuarioIDEnElSistema);
}

