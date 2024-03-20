const mysql = require('mysql');

class Database {
    constructor(database, user, password, host, port) {
        this.database = database;
        this.user = user;
        this.password = password;
        this.host = host;
        this.port = port;
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        });
        this.connect();
    }

    connect() {
        this.connection.connect((err) => {
            if (err) {
                console.error('Failed to connect to database:', err);
                return;
            }
            console.log('Connected to MySQL database');
        });
    }

    disconnect() {
        this.connection.end((err) => {
            if (err) {
                console.error('Failed to disconnect from database:', err);
                return;
            }
            console.log('Disconnected from MySQL database');
        });
    }

}

module.exports.Database = Database;
