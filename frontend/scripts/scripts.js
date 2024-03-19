//--------------Pantalla Log In---------------------------

function mostrarAlerta() { //Cambiar nombre
    var email = document.getElementById('campoEmail').value;
    var password = document.getElementById('campoPassword').value;
    alert('Datos ingresados:\nCorreo:' + email + '\nPassword:' + password)
}

function enviarSignUp() {
    window.location.href= 'Sign Up.html'
}