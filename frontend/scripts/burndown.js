


document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para el burndown chart
    var data = {
        labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
        datasets: [{
            label: 'Trabajo Restante',
            backgroundColor: 'blue', // Color de las barras
            data: [8, 6, 4, 2, 0] // Trabajo restante en cada día
        }]
    };

    // Opciones del gráfico
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Burndown Chart'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Días'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Trabajo Restante'
                },
                ticks: {
                    beginAtZero: true // Empezar desde cero en el eje Y
                }
            }]
        }
    };

    // Obtener el contexto del canvas
    var ctx = document.getElementById('graficoBurndownChart').getContext('2d');

    // Crear el gráfico de barras
    var burndownChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
});