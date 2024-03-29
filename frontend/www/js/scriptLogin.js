

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

    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data['@respuesta'] === 1) {
            console.log("Autenticado");
            var idUsuarioSistema = data['@idUsuarioR'];
            window.location.href= './MenuPrincipal.html?usuario='+ encodeURIComponent(idUsuarioSistema);
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