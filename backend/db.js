const mysql = require('mysql2');

class Database {
    constructor(database, user, password, instanceConnectionName) {
        this.database = database;
        this.user = user;
        this.password = password;
        this.instanceConnection = instanceConnectionName;
        this.connection = mysql.createPool({
            user: this.user,
            password: this.password,
            database: this.database,
            socketPath: `/cloudsql/${this.instanceConnection}`,
        });
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
