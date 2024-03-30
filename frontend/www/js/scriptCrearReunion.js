var ColabsAReunion = [];

function agregarColab() {
    var selectColab = document.getElementById('colaborador').value.split(",");
    var listaColabs = document.getElementById('colabsEnProy');
    console.log(selectColab[1])
    var nuevoColaborador = document.createElement('li');
    nuevoColaborador.textContent = selectColab[1];
    listaColabs.appendChild(nuevoColaborador);
    ColabsAReunion.push(selectColab[0]);
    console.log(ColabsAReunion);

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
    
}

document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:3000/api/projects')
        .then(response => response.json())
        .then (data => {
            var jsonData= data[0];

            var ListaProyectos = jsonData.map(item => [item.idProyecto, item.Nombre])
            cargarProyectos(ListaProyectos)

        })

    fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        .then(data => {
            var jsonData=data;
            console.log(jsonData)

            var ListaUsuarios = jsonData.map(item => [item.idUsuario, item.nombre])
            cargarColaborador(ListaUsuarios)
        })

})