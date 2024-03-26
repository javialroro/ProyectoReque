function registrarUsuario(){
    var nombre=document.getElementById('campoNombre').value;
    var cedula=document.getElementById('campoCedula').value;
    var email=document.getElementById('campoEmail').value;
    var departamento=document.getElementById('campoDepartamento').value;
    var telefono=document.getElementById('campoTelefono').value;
    var password=document.getElementById('campoPassword').value;

    var datos={
        nombre:nombre,
        cedula:cedula,
        correoElectronico:email,
        departamento:departamento,
        numeroTelefono:telefono,
        contrasena:password
    }

    console.log(JSON.stringify(datos));
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
        window.location.href='MenuPrincipal.html'
    })
    .catch(error => {
        console.error('Error:', error);
    });

}