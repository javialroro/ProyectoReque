//==============Pantalla Crear Proyecto-----------------------------

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value;
    var listaColabs = document.getElementById('colabsEnProy');

    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab;
    listaColabs.appendChild(nuevoColaborador)

    var selectColab = document.getElementById('tarea').value = '';
}

function cargarUsuarios(ArrayUsuarios) {
    var select = document.getElementById('colaborador')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = usuario[0]; 
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/api/usersNotAsigned')
        .then(response => response.json())
        .then(data => {
            var jsonData=data[0];

            var ListaUsuariosSinProyecto = jsonData.map(item => [item.idUsuario, item.nombre])
            cargarUsuarios(ListaUsuariosSinProyecto)
        })
})

