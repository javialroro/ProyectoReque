
var botonClickeado;

function TransformarFecha(fechaString){
    var fecha = new Date(fechaString);

    var dia = fecha.getUTCDate();
    var mes = fecha.getUTCMonth() + 1; // Se agrega 1 porque los meses en JavaScript comienzan desde 0
    var año = fecha.getUTCFullYear();
    var horas = fecha.getUTCHours() - 6;
    var minutos = fecha.getUTCMinutes();

    if (horas < 0) {
    horas = 24 + horas; // Si es negativo, agregamos 24 horas para obtener la hora correcta
    }   

    // Formatear la fecha y hora según tu requisito
    var fechaFormateada = dia.toString().padStart(2, '0') + '/' +
                        mes.toString().padStart(2, '0') + '/' +
                        año + ' ' +
                        horas.toString().padStart(2, '0') + ':' +
                        minutos.toString().padStart(2, '0');
    return fechaFormateada;
}

function CargarComentarios(datosComentario){
    var divComentarios = document.getElementById('comentarios');
    console.log(datosComentario);

    divComentarios.innerHTML = '';

    datosComentario.forEach(function(comentario,_){
        var divComentario = document.createElement('div');
        divComentario.classList.add('divComentario');
        var fecha = TransformarFecha(comentario.fecha);
        var h1Comentario = document.createElement('h1');
        h1Comentario.textContent = comentario.nombre + ' - ' + fecha;
        var pMensaje = document.createElement('p');
        pMensaje.textContent = comentario.mensaje;

        divComentarios.appendChild(divComentario);
        divComentario.appendChild(h1Comentario);
        divComentario.appendChild(pMensaje);
    })
}

function CargarDatosForo(foro){
    console.log(foro);
    var datosForo = foro.split(',');
    var divEncabezado = document.getElementById('temaForo');
    divEncabezado.innerHTML = '';

    //Crear Encabezado del Foro
    var h1TituloForo = document.createElement('h1');
    h1TituloForo.textContent= datosForo[1];
    var h2Publicado = document.createElement('h2');
    h2Publicado.textContent= 'Publicado por '+datosForo[2]; 
    var pDescripcion = document.createElement('p');
    pDescripcion.textContent= datosForo[3];


    divEncabezado.appendChild(h1TituloForo);
    divEncabezado.appendChild(h2Publicado);
    divEncabezado.appendChild(pDescripcion);

    fetch('http://localhost:3000/api/forumComments/'+datosForo[0])
        .then(response => response.json())
        .then (data => {
            CargarComentarios(data[0]);
        })


}

function EnviarCrearForo(){
    window.location.href="./crearForo.html";
}

function CrearComentario(){

    var Mensaje=document.getElementById('inputComentario').value;

    var datos = {
        idForo: parseInt(botonClickeado),
        idUsuario: 1,
        mensaje: Mensaje
    }

    fetch('http://localhost:3000/api/createComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/api/forumComments/user/1') //Cambiar para el usuario que esta usando el sistema
        .then(response => response.json())
        .then (data => {
            var listaForos= data[0];
            console.log(listaForos);

            function cambiarColor(boton) {
                listaForos.forEach(function(_, index) {
                    var botonActual = document.getElementById('boton-' + index);
                    botonActual.style.backgroundColor = '';
                });

                boton.style.backgroundColor = '#7B9692';

                botonResaltado = boton;
            }

            listaForos.forEach(function(foro,index){
                var boton = document.createElement('button');
                boton.textContent = foro.tema;
                boton.classList.add('foro-button');
                boton.id = 'boton-' + index;
                boton.value = [foro.idForo,foro.tema,foro.nombre,foro.descripcion];

                var contenedor = document.getElementById('btnForosPrivados');

                if (foro.idProyecto === null) {
                    contenedor = document.getElementById('btnForosPublicos');
                }
                contenedor.appendChild(boton);

                boton.addEventListener('click', function() {
                    cambiarColor(this);
                    CargarDatosForo(boton.value);
                    botonClickeado = boton.value;
                });
            })
        })
})
