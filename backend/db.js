const mysql = require('mysql2');

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
        try {
            this.connection.connect();
        } catch (error) {
            console.error('Failed to connect to database:', error);
        }
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

    async query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

}

module.exports.Database = Database;
