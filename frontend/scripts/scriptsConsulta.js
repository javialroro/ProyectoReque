var ListaProyectos = [];
var Proyecto = {
    nombre: "",
    tareas: [],

    agregarTarea: function(nombreTarea, estado, colaborador) {
        this.tareas.push({ nombre: nombreTarea, estado: estado, colaborador: colaborador})
    },

    obtenerTareas: function(estado) {
        return this.tareas.filter(function(tarea){
            return tarea.estado === estado;
        })
    }
};
var Proyecto2 = {
    nombre: "",
    tareas: [],

    agregarTarea: function(nombreTarea, estado, colaborador) {
        this.tareas.push({ nombre: nombreTarea, estado: estado, colaborador: colaborador})
    },

    obtenerTareas: function(estado) {
        return this.tareas.filter(function(tarea){
            return tarea.estado === estado;
        })
    }
};

var miProyecto1 = Object.create(Proyecto2);
miProyecto1.nombre = "Proyecto de Arboles";

// Agregar tareas al primer proyecto
miProyecto1.agregarTarea("Hacer la documentación", "Por Hacer", "Carlos");
miProyecto1.agregarTarea("Desarrollar la funcionalidad X", "En Progreso",  "Carlos");
miProyecto1.agregarTarea("Realizar pruebas de calidad", "Finalizada",  "Carlos");
miProyecto1.agregarTarea("Enviar Correos", "Por Hacer",  "Carlos");


// Creación del segundo proyecto
var miProyecto2 = Object.create(Proyecto);
miProyecto2.nombre = "Proyecto de Cajas";

// Agregar tareas al segundo proyecto
miProyecto2.agregarTarea("Ver Star Wars", "Por Hacer", "Javi");
miProyecto2.agregarTarea("Ir a la soda por gomitas", "En Progreso",  "Javi");
miProyecto2.agregarTarea("A", "Finalizada",  "Javi");

// Agregar los proyectos a la lista de proyectos
ListaProyectos.push(miProyecto1);
ListaProyectos.push(miProyecto2);


document.addEventListener('DOMContentLoaded', function () {
    cargarProyectos(ListaProyectos);
});


function cargarProyectos(ArrayProyectos) {
    var divIzquierdo = document.getElementById('divBotones'); // Cambiado de querySelector a getElementById

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
        boton.textContent = proyecto.nombre; //Asigna el texto del boton
        boton.classList.add('proyecto-button');
        boton.id = 'boton-' + index; // Asigna un id único a cada botón
        boton.value = proyecto.nombre; //Asigna como valor al objeto

        divIzquierdo.appendChild(boton);

        boton.addEventListener('click', function() {
            cambiarColor(this);
            cargarTareas(boton.value)
        });
    });
}

function cargarTareas(nombreProyecto) {
    var proyecto = ListaProyectos.find(function(proyecto) {
        return proyecto.nombre === nombreProyecto;
    });

    var divPorHacer = document.getElementById('tareasPorHacer');
    var divEnProgreso = document.getElementById('tareasEnProgreso');
    var divFinalizadas = document.getElementById('tareasFinalizadas');

    divPorHacer.innerHTML = '';
    divEnProgreso.innerHTML = '';
    divFinalizadas.innerHTML = '';

    var h1 = document.getElementById('nombreProyecto');
    h1.textContent = proyecto.nombre;

    ['Por Hacer', 'En Progreso', 'Finalizada'].forEach(function(estado) {
        var listaTareas = proyecto.obtenerTareas(estado);
        var contenedor;

        if(estado === 'Por Hacer') {
            contenedor = divPorHacer;
        } else if (estado === 'En Progreso') {
            contenedor = divEnProgreso;
        } else if (estado === 'Finalizada') {
            contenedor = divFinalizadas;
        }

        listaTareas.forEach(function(tarea,index){
        var div = document.createElement('div');
        div.classList.add('tarea');
        var h1 = document.createElement('h1');
        h1.textContent = tarea.nombre;
        var h2 = document.createElement('h2');
        h2.textContent = 'Asignada a: ' + tarea.colaborador
        contenedor.appendChild(div);
        div.appendChild(h1);
        div.appendChild(h2);
        })
    })
}