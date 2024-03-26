


function cargarTareas(idProyecto){
    fetch('http://localhost:3000/api/getProjectTasks/'+idProyecto)
        .then(response => response.json())
        .then (data => {
            var datosTareas = data[0];
            console.log(datosTareas);
            var divTareas = document.getElementById('tareas');

            divTareas.innerHTML = '';

            datosTareas.forEach(function(tarea,index) {
                var divTarea = document.createElement('div');
                divTarea.classList.add('tarea');
                var h1NombreTarea = document.createElement('h1');
                h1NombreTarea.textContent = 'Nombre'//tarea.nombre
                var h2Asignado = document.createElement('h2');
                h2Asignado.textContent = 'Asignado a:'//
                var h2StoryP = document.createElement('h2');
                h2StoryP.textContent = 'Story Points:'//
                var pDescripcion = document.createElement('p');
                pDescripcion.textContent = 'a';

                divTareas.appendChild(divTarea);
                divTarea.appendChild(h1NombreTarea);
                divTarea.appendChild(h2Asignado);
                divTarea.appendChild(h2StoryP);
                divTarea.appendChild(pDescripcion);

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