function modificarInfo(){
    var usuarioID = document.getElementById('selectColab').value
    var email = document.getElementById('campoEmail').value;
    var departamento = document.getElementById('campoDepartamento').value;
    var numeroTelefono = document.getElementById('campoTelefono').value;
    var selectEstado = document.getElementById('selectEstado').value;

    var datos = {
        "correoElectronico": email,
        "departamento" : departamento,
        "numeroTelefono": numeroTelefono,
        "estado": parseInt(selectEstado)
    }

    console.log(JSON.stringify(datos));

    fetch('http://localhost:3000/api/updateUser/' + usuarioID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        //location.reload();
        console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function cargarUsuarios(ArrayUsuarios) {
    var select = document.getElementById('selectColab')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = usuario[0]; 
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            var jsonData=data;
            console.log(jsonData);

            var ListaUsuarios = jsonData.map(item => [item.idUsuario, item.nombre])
            cargarUsuarios(ListaUsuarios)
        })
})