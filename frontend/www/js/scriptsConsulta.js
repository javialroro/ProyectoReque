function cargarProyectos(ArrayProyectos) {
    var divIzquierdo = document.getElementById('divBotones'); // Cambiado de querySelector a getElementById

    console.log(ArrayProyectos);

    function cambiarColor(boton) {
        ArrayProyectos.forEach(function(_, index) {
            var botonActual = document.getElementById('boton-' + index);
            botonActual.style.backgroundColor = '';
        });

        boton.style.backgroundColor = '#3E9994';

        botonResaltado = boton;
    }

    ArrayProyectos.forEach(function(proyecto, index) {
        var boton = document.createElement('button');
        boton.textContent = proyecto[1]; //Asigna el texto del boton
        boton.classList.add('proyecto-button');
        boton.id = 'boton-' + index; // Asigna un id único a cada botón
        boton.value = [proyecto[0],proyecto[1]]; //Asigna como valor al objeto

        divIzquierdo.appendChild(boton);

        boton.addEventListener('click', function() {
            cambiarColor(this);
            cargarTareas(boton.value)
        });
    });
}

function cargarTareas(proyecto) {
    proyecto = proyecto.split(",");

    fetch('http://localhost:3000/api/projectTasks/'+proyecto[0])
        .then(response => response.json())
        .then (data => {
            var tareasJSON = data[0]
            console.log(tareasJSON);

            //var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre]);

            var divPorHacer = document.getElementById('tareasPorHacer');
            var divEnProgreso = document.getElementById('tareasEnProgreso');
            var divFinalizadas = document.getElementById('tareasFinalizadas');

            divPorHacer.innerHTML = '';
            divEnProgreso.innerHTML = '';
            divFinalizadas.innerHTML = '';

            var h1 = document.getElementById('nombreProyecto');
            h1.textContent = proyecto[1];

            tareasJSON.forEach(function(tarea) {
                var contenedor;
                console.log(tarea.estado);

                if(tarea.estado === 'Pendiente') {
                    contenedor = divPorHacer;
                } else if (tarea.estado === 'En proceso') {
                    contenedor = divEnProgreso;
                } else if (tarea.estado === 'Completada') {
                    contenedor = divFinalizadas;
                }

                var div = document.createElement('div');
                div.classList.add('tarea');
                var h1 = document.createElement('h1');
                h1.textContent = tarea.nombre;
                var h2 = document.createElement('h2');
                h2.textContent = 'Asignada a: ' + tarea.responsable
                contenedor.appendChild(div);
                div.appendChild(h1);
                div.appendChild(h2);

                })
    })
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)

        })
});


