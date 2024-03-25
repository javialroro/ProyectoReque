//--------------Pantalla Log In---------------------------

function mostrarAlerta() { //Cambiar nombre
    var email = document.getElementById('campoEmail').value;
    var password = document.getElementById('campoPassword').value;
    alert('Datos ingresados:\nCorreo:' + email + '\nPassword:' + password)
}

function enviarSignUp() {
    window.location.href= 'Sign Up.html'
}

//==============Pantalla Crear Proyecto-----------------------------

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value;
    var listaColabs = document.getElementById('colabsEnProy');

    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab;
    listaColabs.appendChild(nuevoColaborador)

    var selectColab = document.getElementById('tarea').value = '';
}

function agregarTarea() {
    var inputTarea = document.getElementById('tarea').value;
    var inputStoryPoints = document.getElementById('storyPointTarea').value;
    var listaTareas = document.getElementById('tareasDeProy');

    if (inputStoryPoints === '') {
        inputStoryPoints = '0'
    }

    var nuevaTarea = document.createElement('li');
    nuevaTarea.textContent = inputTarea + " Story Point: " + inputStoryPoints;
    listaTareas.appendChild(nuevaTarea)

    var inputTarea = document.getElementById('tarea').value = '';
    var inputStoryPoints = document.getElementById('storyPointTarea').value = '';
}

//==================Pantalla Menu Principal==========================
function enviarAAsignarColab() {
    window.location.href= 'Asignar.html'
}

function enviarAModColab() {
    window.location.href= 'ModificarColab.html'
}

function enviarACrearProyecto() {
    window.location.href= 'crearProyecto.html'
}

function enviarAConsultarProyecto() {
    window.location.href= 'consultaProy.html'
}

function enviarAModProyecto() {
    window.location.href= 'modificarProy.html'
}

function enviarAInformeGeneral() {
    window.location.href= 'InformeGeneral.html' //Hacer la pantalla de informe general
}

function enviarAForos() {
    window.location.href= 'foro.html'
}

