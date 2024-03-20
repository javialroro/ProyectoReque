const express = require('express');
const {Database} = require('./db.js');
const {AppService} = require('./AppService.js');

const app = express();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const db = new Database(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);

const appService = new AppService(db);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/users', async (req, res) => {
    const tasks = await appService.getUsers();
    res.send(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;