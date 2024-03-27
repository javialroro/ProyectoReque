var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("usuario");

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

function cargarColaboradoresProyecto(idProyecto) {
    fetch('http://localhost:3000/api/projectWorkers/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var jsonData = data[0];
            console.log(jsonData)

            var usuarios = jsonData.map(item => [item.idUsuario, item.nombre])
            console.log(usuarios);
            
            var select = document.getElementById('selectEliminar')
            select.innerHTML = '';
            usuarios.forEach(function(usuario,index){
                var option = document.createElement('option');
                option.textContent = usuario[1];
                option.value = usuario[0];
                select.appendChild(option);
            });
        })
}

function cambiarDatos(){
    var selectProy = document.getElementById('selectProyectos');
    var idProyecto = selectProy.value + '';

    cargarColaboradoresProyecto(idProyecto)

}

function eliminarColaborador(){
    var Proyecto = document.getElementById('selectProyectos').value;
    var Usuario = document.getElementById('selectEliminar').value

    var datos = {
        idUsuario: Usuario,
        idProyecto: Proyecto
    }

    fetch('http://localhost:3000/api/deleteUserProject/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
        
    })
    .then(response => {
        if (response.ok) {
            // La solicitud de eliminación fue exitosa
            location.reload();
            alert('El colaborador fue eliminado correctamente.');
        } else {
            // La solicitud de eliminación falló
            console.error('Error al intentar eliminar al colaborador.');
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Hubo un error en la solicitud de eliminación:', error);
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
            cambiarDatos()
        })

    
})

