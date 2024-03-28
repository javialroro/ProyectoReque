var parametros = new URLSearchParams(window.location.search);
var usuarioIDEnElSistema = parametros.get("idProyecto").split(',');


document.addEventListener('DOMContentLoaded', function() {
    var titulo = document.getElementById('Titulo');
    titulo.textContent='Snupie - Burndown Chart - '+usuarioIDEnElSistema[1];
    fetch('http://localhost:3000/api/burndown/'+usuarioIDEnElSistema[0]) //Cambiar el id 
        .then(response => response.json())
        .then (data => {
            const labels = Object.keys(data[0][0]);
            console.log(labels)
            const valores = Object.values(data[0][0]);
            console.log(valores)

            var data = {
                labels: labels.reverse(),
                datasets: [{
                    label: 'Trabajo Restante',
                    backgroundColor: 'blue', // Color de las barras
                    data: valores.reverse() // Trabajo restante en cada día
                }]
            };

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

        })
    
    // Datos de ejemplo para el burndown chart
    

    // Opciones del gráfico
    
});