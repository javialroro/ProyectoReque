var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("usuario");
var rolUsuario;

function cargarUsuarios(ArrayUsuarios) {

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = usuario[0]; 
        select.appendChild(option);
    });
}

function deshabilitarBotones(){
    var btn1 = document.getElementById('btnAsignar');
    var btn2 = document.getElementById('btnModColab');
    var btn3 = document.getElementById('btnCrearProyecto');
    var btn4 = document.getElementById('btnModProyecto');
    var btn5 = document.getElementById('btnCrearReunion');
    var btn6 = document.getElementById('btnInformeGeneral');


    if (rolUsuario === 2) {
        btn1.disabled = true
        btn1.style.backgroundColor = "#424343"
        btn2.disabled = true
        btn2.style.backgroundColor = "#424343"
        btn3.disabled = true
        btn3.style.backgroundColor = "#424343"
        btn4.disabled = true
        btn4.style.backgroundColor = "#424343"
        btn5.disabled = true
        btn5.style.backgroundColor = "#424343"
        btn6.disabled = true
        btn6.style.backgroundColor = "#424343"
    }     
}

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

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(data => {
                var jsonData=data;
                console.log(jsonData);

                var ListaUsuarios = jsonData.map(item => [item.idUsuario, item.idRol])
                for (var usuario of ListaUsuarios) {
                    if (usuario[0] === parseInt(usuarioIDEnElSistema)) {
                        rolUsuario = usuario[1]
                    }
                }
                deshabilitarBotones()
            }); 
})

