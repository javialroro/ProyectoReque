const express = require('express');
const cors = require('cors');
const {Database} = require('./dbLocal.js');
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
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/users', async (req, res) => {
    const tasks = await appService.getUsers();
    res.send(tasks);
});


app.get('/api/projects', async (req, res) => {
    const projects = await appService.getProjects();
    res.json(projects);
});

app.get('/api/getTaskState', async (req, res) => {
    const taskState = await appService.getTaskState();
    res.json(taskState);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;