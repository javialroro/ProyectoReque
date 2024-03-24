const express = require('express');
const {Database} = require('./db.js');
const {AppService} = require('./AppService.js');

const app = express();


const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_INSTANCE_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;

const db = new Database(DB_NAME, DB_USER, DB_PASSWORD, DB_INSTANCE_CONNECTION_NAME);

const appService = new AppService(db);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/users', async (req, res) => {
    const users = await appService.getUsers();
    res.json(users);
});

app.get('/api/projects', async (req, res) => {
    const projects = await appService.getProjects();
    res.json(projects);
});

app.get('/api/getTaskState', async (req, res) => {
    const taskState = await appService.getTaskState();
    res.json(taskState);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;