
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: '34.173.7.67',
        user: 'root',
        password: '1234',
        database: 'snupie_bd'
    });

    // Establecer la conexión
    connection.connect((error) => {
        if (error) {
            console.error('Error al conectar a la base de datos:', error);
            return;
        }
        console.log('Conexión exitosa a la base de datos MySQL');

        // Realizar la consulta
        connection.query('SELECT * FROM usuario', (error, results, fields) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                return;
            }

            // Mostrar el resultado en el elemento <p>
            console.log('Resultado de la consulta:', results);
        });

        // Cerrar la conexión
        connection.end();
    });
