var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("usuario");
var correos = [];

function cargarUsuariosDelProyecto(idProyecto) {
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/projectWorkers/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var jsonData = data[0];

            var usuarios = jsonData.map(item => [item.idUsuario, item.nombre, item.correoElectronico])
            console.log(usuarios);
            
            var select = document.getElementById('selectColab')
            select.innerHTML = '';
            usuarios.forEach(function(usuario,index){
                var option = document.createElement('option');
                option.textContent = usuario[1];
                option.value = usuario[0];
                correos.push(usuario[2]);
                select.appendChild(option);
            });
        })
}

function cargarTareas(idProyecto){
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/getProjectTasks/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var datosTareas = data[0];
            var divTareas = document.getElementById('tareas');

            divTareas.innerHTML = '';

            datosTareas.forEach(function(tarea,index) {
                var divTarea = document.createElement('div');
                divTarea.classList.add('tarea');
                var h1NombreTarea = document.createElement('h1');
                h1NombreTarea.textContent = tarea.nombre;
                var h2Asignado = document.createElement('h2');
                h2Asignado.textContent = 'Asignado a: ' + tarea.UsuarioACargo;
                var h2StoryP = document.createElement('h2');
                h2StoryP.textContent = 'Story Points: ' + tarea.storyPoints;
                var pDescripcion = document.createElement('p');
                pDescripcion.textContent = tarea.descripcion;
                var btnModificar = document.createElement('button');
                btnModificar.textContent = 'Modificar';
                btnModificar.value = tarea.idTarea;
                btnModificar.addEventListener('click', function() {
                    var tareaAModificar = btnModificar.value;
                    alert(idProyecto);
                    window.location.href="./modificarTarea.html?variable=" + encodeURIComponent(tareaAModificar) + "&variable2=" + encodeURIComponent(idProyecto);
                })
                var btnFinalizar = document.createElement('button');
                btnFinalizar.textContent = 'Finalizar';
                if (tarea.idEstado === 3) {
                    btnFinalizar.textContent = 'Finalizada';
                    btnFinalizar.disabled = true;
                    btnFinalizar.style.backgroundColor = "#0D2701"
                }
                btnFinalizar.value = [tarea.idTarea,tarea.nombre];
                btnFinalizar.addEventListener('click', function() {
                    finalizarTarea(idProyecto,btnFinalizar.value);
                })
                var btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.style.backgroundColor = "#CA1010";
                btnEliminar.value = tarea.idTarea;
                btnEliminar.addEventListener('click', function() {
                    eliminarTarea(idProyecto,btnEliminar.value);
                })
                divTareas.appendChild(divTarea);
                divTarea.appendChild(h1NombreTarea);
                divTarea.appendChild(h2Asignado);
                divTarea.appendChild(h2StoryP);
                divTarea.appendChild(pDescripcion);
                divTarea.appendChild(btnModificar);
                divTarea.appendChild(btnFinalizar);
                divTarea.appendChild(btnEliminar);

            })
        })
}

function cargarProyectos(ArrayProyectos) {
    var select = document.getElementById('selectProy')

    ArrayProyectos.forEach(function(proyecto,index){
        var option = document.createElement('option');
        option.textContent = proyecto[1];
        option.value = proyecto[0];
        select.appendChild(option);
    });
}

function cambiarDatos(){
    var selectProy = document.getElementById('selectProy');
    var idProyecto = selectProy.value + '';
    correos = [];

    cargarTareas(idProyecto);
    cargarUsuariosDelProyecto(idProyecto);
}

function AgregarTarea(){
    var proyecto = document.getElementById('selectProy').value;
    var nombreTarea = document.getElementById('nombreTarea').value;
    var descripcion = document.getElementById('descripcion').value;
    var asignado = document.getElementById('selectColab').value;
    var storyPoint = document.getElementById('storyPoints').value;

    var datos = {
        idProyecto:proyecto,
        nombre:nombreTarea,
        descripcion:descripcion,
        usuario:asignado,
        storyPoints:storyPoint
    }

    console.log(JSON.stringify(datos));
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/createTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        cargarTareas(proyecto);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    var datosCorreo={
            "correos":correos,
            "asunto": "Se ha agregado una tarea nueva",
            "mensaje": "Se ha agregado una tarea a un proyecto:\n" 
            + nombreTarea +
            "\nDescripcion:" + descripcion
        }
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCorreo)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function finalizarTarea(idProyecto,idTarea){
    idTarea = idTarea.split(',')
    fetch(`https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/endTask/${idTarea[0]}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // La solicitud de eliminación fue exitosa
            alert('La tarea fue finalizada correctamente.');
            var datosCorreo={
            "correos":correos,
            "asunto": "Se ha finalizado una tarea",
            "mensaje": "Se ha finalizado la tarea:\n" 
            + idTarea[1]
            }
            fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/sendEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCorreo)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                correos = [];
            })
            .catch(error => {
                console.error('Error:', error);
            });
            cargarTareas(idProyecto)
        } else {
            // La solicitud de eliminación falló
            console.error('Error al intentar finalizar la tarea.');
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Hubo un error en la solicitud de finalizacion:', error);
    });
}

function eliminarTarea(idProyecto,idTarea){
    fetch(`https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/deleteTask/${idTarea}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // La solicitud de eliminación fue exitosa
            alert('La tarea fue eliminada correctamente.');
            cargarTareas(idProyecto)
        } else {
            // La solicitud de eliminación falló
            console.error('Error al intentar eliminar la tarea.');
        }
    })
    .catch(error => {
        // Manejar errores de red u otros errores
        console.error('Hubo un error en la solicitud de eliminación:', error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)
            cambiarDatos()
        })
});