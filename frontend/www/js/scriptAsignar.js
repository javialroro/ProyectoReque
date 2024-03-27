function cargarProyectos(ArrayProyectos) {
    var select = document.getElementById('selectProyectos')

    ArrayProyectos.forEach(function(proyecto,index){
        var option = document.createElement('option');
        option.textContent = proyecto[1];
        option.value = proyecto[0] 
        select.appendChild(option);
    });
}

function cargarUsuarios(ArrayUsuarios) {
    var select = document.getElementById('selectColaborador')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = usuario[0]; 
        select.appendChild(option);
    });
}

function asignarColaborador() {
    var selectProyecto = document.getElementById('selectProyectos');
    var selectColaborador = document.getElementById('selectColaborador');

    var ProyectoSeleccionado = selectProyecto.value;
    var ColaboradorSeleccionado = selectColaborador.value;

    var datos = {
        idProyecto:parseInt(ProyectoSeleccionado),
        idUsuario:parseInt(ColaboradorSeleccionado)
    };

    console.log(JSON.stringify(datos));
    fetch('http://localhost:3000/api/asignProject', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
        console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)

        })
    
    fetch('http://localhost:3000/api/usersNotAsigned')
        .then(response => response.json())
        .then(data => {
            var jsonData=data[0];

            var ListaUsuariosSinProyecto = jsonData.map(item => [item.idUsuario, item.nombre])
            cargarUsuarios(ListaUsuariosSinProyecto)
        })
})

