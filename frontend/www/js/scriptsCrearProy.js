var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("usuario");
var ColabsAProyecto = [];

//==============Pantalla Crear Proyecto-----------------------------

function crearProyecto() {
    var nombreProyecto = document.getElementById('nombreProyecto').value;
    var recursos = document.getElementById('recursos').value;
    var presupuesto = document.getElementById('presupuesto').value;
    var responsable = document.getElementById('responsable').value;
    var descripcion = document.getElementById('descripcion').value;
    var fechaDeInicio = document.getElementById('fechaInicio').value;
    var historial = document.getElementById('historial').value;


    var datos = {
        nombre: nombreProyecto,
        recursosNecesarios: recursos,
        presupuesto: presupuesto,
        responsable: responsable,
        descripcion: descripcion,
        fechaDeInicio: fechaDeInicio
    }


    fetch('http://localhost:3000/api/createProject', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        var idProyecto = data['@respuesta'];

        ColabsAProyecto.forEach(function(idColab, index) {
            var datos = {
                idProyecto:parseInt(idProyecto),
                idUsuario:parseInt(idColab)
            }

            console.log(JSON.stringify(datos));
            fetch('http://localhost:3000/api/asignProject', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            .then(response => response.json())
            .then(data => {
                location.reload();
                console.log(data);// Aquí puedes hacer algo con la respuesta del servidor si es necesario
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })

    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value.split(",");
    var listaColabs = document.getElementById('colabsEnProy');

    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab[1];
    listaColabs.appendChild(nuevoColaborador);
    ColabsAProyecto.push(selectColab[0]);
    console.log(ColabsAProyecto);

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
            cargarResponsable(ListaUsuariosSinProyecto)
        })
})

