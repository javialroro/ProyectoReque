var ColabsAReunion = [];
var correos=[];

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value.split(",");
    var listaColabs = document.getElementById('colabsEnProy');
    console.log(selectColab[1])
    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab[1];
    listaColabs.appendChild(nuevoColaborador);
    ColabsAReunion.push(selectColab[0]);
    correos.push(selectColab[2]);
    console.log(ColabsAReunion);

}

function cargarColaborador(ArrayUsuarios) {
    var select = document.getElementById('colaborador')

    ArrayUsuarios.forEach(function(usuario,index){
        var option = document.createElement('option');
        option.textContent = usuario[1];
        option.value = [usuario[0],usuario[1],usuario[2]]; 
        select.appendChild(option);
    });
}

function cargarProyectos(ArrayProyectos) {
    var select = document.getElementById('campoProyecto')

    ArrayProyectos.forEach(function(proyecto,index){
        var option = document.createElement('option');
        option.textContent = proyecto[1];
        option.value = proyecto[0] 
        select.appendChild(option);
    });
}

function crearReunion() {
    var proyecto=document.getElementById("campoProyecto").value;
    var tema=document.getElementById("campoTema").value;
    var fecha=document.getElementById("campoFecha").value;
    var medio=document.getElementById("campoMedio").value;

    var datos = {
        idProyecto: proyecto,
        tema: tema,
        fecha: fecha,
        medio: medio
    }
    
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/createMeeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        var idMeeting = data['@respuesta'];

        ColabsAReunion.forEach(function(idColab, index) {
            var datos = {
                idReunion:parseInt(idMeeting),
                idUsuario:parseInt(idColab)
            }

            console.log(JSON.stringify(datos));
            fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/inviteMeeting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                ColabsAReunion = [];
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });

    var datosCorreo={
            "correos":correos,
            "asunto": "Usted ha sido invitado a una reunion",
            "mensaje": "La reunion es sobre "+ tema +" el dia "+fecha+ " por el medio " + medio
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
}

document.addEventListener('DOMContentLoaded',function(){
    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)

        })

    fetch('https://api-snupie-2a6ax3i7sq-uc.a.run.app/api/users')
        .then(response => response.json())
        .then(data => {
            var jsonData=data;
            console.log(jsonData)

            var ListaUsuarios = jsonData.map(item => [item.idUsuario, item.nombre, item.correoElectronico])
            cargarColaborador(ListaUsuarios)
        })

})