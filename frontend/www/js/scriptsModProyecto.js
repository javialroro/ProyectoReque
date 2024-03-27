function cargarUsuariosDelProyecto(idProyecto) {
    fetch('http://localhost:3000/api/projectWorkers/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var jsonData = data[0];

            var usuarios = jsonData.map(item => [item.idUsuario, item.nombre])
            console.log(usuarios);
            
            var select = document.getElementById('selectColab')
            select.innerHTML = '';
            usuarios.forEach(function(usuario,index){
                var option = document.createElement('option');
                option.textContent = usuario[1];
                option.value = usuario[0];
                select.appendChild(option);
    });
        })
}


function cargarTareas(idProyecto){
    fetch('http://localhost:3000/api/getProjectTasks/'+idProyecto)
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
                h2Asignado.textContent = 'Asignado a:' + tarea.UsuarioACargo;
                var h2StoryP = document.createElement('h2');
                h2StoryP.textContent = 'Story Points:' + tarea.storyPoints;
                var pDescripcion = document.createElement('p');
                pDescripcion.textContent = tarea.descripcion;
                var btnModificar = document.createElement('button');
                btnModificar.textContent = 'Modificar';
                btnModificar.value = tarea.idTarea;
                var btnEliminar = document.createElement('button');
                btnEliminar.textContent = 'Eliminar';
                btnEliminar.value = tarea.idTarea;

                divTareas.appendChild(divTarea);
                divTarea.appendChild(h1NombreTarea);
                divTarea.appendChild(h2Asignado);
                divTarea.appendChild(h2StoryP);
                divTarea.appendChild(pDescripcion);
                divTarea.appendChild(btnModificar);
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

    cargarTareas(idProyecto);
    cargarUsuariosDelProyecto(idProyecto);
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)
            cambiarDatos()


        })
});