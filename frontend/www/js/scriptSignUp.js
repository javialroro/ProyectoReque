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

    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
        var idUsuarioSistema = data['@respuesta'];
        window.location.href='MenuPrincipal.html?usuario='+ encodeURIComponent(idUsuarioSistema);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}