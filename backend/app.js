const express = require('express');
const {Database} = require('./db.js');
const {AppService} = require('./AppService.js');

const app = express();

const DB_HOST = "34.173.7.67";
const DB_PORT = 3306;
const DB_NAME = "snupie_bd";
const DB_USER = "root";
const DB_PASSWORD = "1234";

const db = new Database(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);

const appService = new AppService(db);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/users', async (req, res) => {
    const users = await appService.getUsers();
    res.json(users);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;