

//--------------Pantalla Log In---------------------------
function mostrarAlerta() { //Cambiar nombre
    var email = document.getElementById('campoEmail').value;
    var password = document.getElementById('campoPassword').value;
    alert('Datos ingresados:\nCorreo:' + email + '\nPassword:' + password)
}

function iniciarLogIn() {
    var email = document.getElementById('campoEmail').value;
    var password = document.getElementById('campoPassword').value;

    var datos = {
        correoElectronico:email,
        contrasena:password
    };

    console.log(JSON.stringify(datos));
    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data === 1) {
            console.log("Autenticado");
            window.location.href= './MenuPrincipal.html'
            alert("Inicio de sesión válido")
        } else {
            alert("Su Email o Password son incorrectos")
        }        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function enviarSignUp() {
    window.location.href= './SignUp.html'
}