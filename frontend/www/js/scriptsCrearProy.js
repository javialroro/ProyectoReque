//==============Pantalla Crear Proyecto-----------------------------

function crearProyecto() {
    var nombreProyecto = document.getElementById('nombreProyecto').value;
    var recursos = document.getElementById('recursos').value;
    var presupuesto = document.getElementById('presupuesto').value;
    var responsable = document.getElementById('responsable').value;
    var descripcion = document.getElementById('descripcion').value;
    var fechaDeInicio = document.getElementById('fechaInicio').value;
    var historial = document.getElementById('historial').value;

    alert(nombreProyecto + "\n" +
            recursos + "\n" +
            presupuesto + "\n" +
            responsable + "\n" +
            descripcion + "\n" +
            fechaDeInicio + "\n" +
            historial);

//Sin terminar

    // fetch('http://localhost:3000/api/createProject', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(datos)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     location.reload();
    //     console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value.split(",")[1];
    var listaColabs = document.getElementById('colabsEnProy');

    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab;
    listaColabs.appendChild(nuevoColaborador)

    var selectColab = document.getElementById('tarea').value = '';
}

function cargarResponsable(ArrayUsuarios) {
    var select = document.getElementById('responsable')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = usuario[0]; 
        select.appendChild(option);
    });
}

function cargarColaborador(ArrayUsuarios) {
    var select = document.getElementById('colaborador')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = [usuario[0],usuario[1]]; 
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', function(){

    fetch('http://localhost:3000/api/usersNotAsigned')
        .then(response => response.json())
        .then(data => {
            var jsonData=data[0];

            var ListaUsuariosSinProyecto = jsonData.map(item => [item.idUsuario, item.nombre])
            cargarColaborador(ListaUsuariosSinProyecto)
        })
})

