document.addEventListener('DOMContentLoaded', function() {
    // Obtener el contexto del canvas
    var ctx = document.getElementById('graficoBarrasIG').getContext('2d');

    // Opciones del gráfico
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Informe General'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Estados'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Tareas'
                },
                ticks: {
                    beginAtZero: true // Empezar desde cero en el eje Y
                }
            }]
        }
    };

    // Cargar el JSON utilizando fetch
    fetch('http://localhost:3000/api/getTaskState')
        .then(response => response.json())
        .then(data => {
            // Filtrar solo los elementos del JSON que tienen nombre y cantidad
            var jsonData = data[0].filter(item => item.nombre && item.Cantidad); //Data[0] es la informacion que interesa
            console.log(jsonData);
            // Obtener las etiquetas y los valores del JSON filtrado
            var labels = jsonData.map(item => item.nombre);
            var values = jsonData.map(item => item.Cantidad);
            // Construir el objeto data para el gráfico
            var data = {
                labels: labels,
                datasets: [{
                    label: 'Numero de Tareas',
                    backgroundColor: ['red', 'yellow', 'green'], // Color de las barras
                    data: values
                }]
            };

            // Crear el gráfico de barras
            var burndownChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: options
            });
        })
        .catch(error => {
            alert('Error al cargar el archivo JSON:', error);
        });
});
