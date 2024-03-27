var parametros = new URLSearchParams(window.location.search);
var idTarea = parametros.get("variable");
var idProyecto = parametros.get("variable2");


function modificarTarea(){
    var nombre = document.getElementById('campoNuevoNombre').value;
    
    var descripcion = document.getElementById('campoNuevaDescripcion').value;
    var estado = document.getElementById('campoNuevoEstado').value;
    var usuario = document.getElementById('campoNuevoUsuario').value;
    var storyPoint = document.getElementById('storyPoints').value;

    datos = {
        newNombre: nombre,
        newDescripcion: descripcion,
        newEstado: estado,
        newUser: usuario,
        newStoryPoint: storyPoint
    }

    console.log(JSON.stringify(datos));
     fetch('http://localhost:3000/api/updateTask/'+idTarea, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(datos)
     })
     .then(response => {
        if (response.ok) {
            // La solicitud de eliminación fue exitosa
            alert('La tarea fue actualizada correctamente.');
            window.location.href="./modificarProy.html"
        } else {
            // La solicitud de eliminación falló
            console.error('Error al intentar actualizar la tarea.');
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Hubo un error en la solicitud de actualizacion:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/projectWorkers/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var jsonData = data[0];

            var usuarios = jsonData.map(item => [item.idUsuario, item.nombre])
            console.log(usuarios);
            
            var select = document.getElementById('campoNuevoUsuario')
            select.innerHTML = '';
            usuarios.forEach(function(usuario,index){
                var option = document.createElement('option');
                option.textContent = usuario[1];
                option.value = usuario[0];
                select.appendChild(option);
            });
        })
});