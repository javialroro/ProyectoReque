function crearForo() {
    var proyecto = document.getElementById('campoProyecto').value;
    var tema = document.getElementById('campoTema').value;
    var descripcion = document.getElementById('campoDescripcion').value;

    var datos = {
        idProyecto:proyecto,
        tema:tema,
        idUsuario:1, //Crear Foro por el momento solo el 1
        descripcion:descripcion
    }

    fetch('http://localhost:3000/api/createForum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        window.location.href="./foro.html";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function cargarProyectos(ArrayProyectos) {
    var select = document.getElementById('campoProyecto')

    ArrayProyectos.forEach(function(proyecto,index){
        var option = document.createElement('option');
        option.textContent = proyecto[1];
        option.value = proyecto[0];
        select.appendChild(option);
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
    })