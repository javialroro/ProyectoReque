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
    fetch('../public/a.json')
        .then(response => response.json())
        .then(jsonData => {
            // Aquí jsonData es el objeto JSON cargado
            // Construir los datos para el gráfico

            var labels = Object.keys(jsonData);
            var values = Object.values(jsonData);

            // Construir el objeto data para el gráfico
            var data = {
                labels: labels,
                datasets: [{
                    label: 'Numero de Tareas',
                    backgroundColor: ['red','yellow','green'], // Color de las barras
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
            console.error('Error al cargar el archivo JSON:', error);
        });
});
