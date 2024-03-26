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

app.post('/api/register', async (req, res) => {
    const user = await appService.registerUser(req.body);
    res.json(user);
});

app.get('/api/usersNotAsigned', async (req, res) => {
    const users = await appService.usersNotAsigned();
    res.json(users);
});


app.put('/api/asignProject', async (req, res) => {
    const user = await appService.asignProject(req.body);
    res.json(user);
});


app.put('/api/updateUser/:id', async (req, res) => {
    const user = await appService.updateUser(req.body, req.params.id);
    res.json(user);
});

app.post('/api/createProject', async (req, res) => {
    const project = await appService.createProject(req.body);
    res.json(project);
});

app.post('/api/createTask', async (req, res) => {
    const task = await appService.createTask(req.body);
    res.json(task);
});

app.post('/api/login', async (req, res) => {
    const user = await appService.login(req.body);
    res.json(user);
});

app.get('/api/projectTasks/:id', async (req, res) => {
    const tasks = await appService.projectTasks(req.params.id);
    res.json(tasks);
});

app.get('/api/getProjectTasks/:id', async (req, res) => {
    const tasks = await appService.getProjectTasks(req.params.id);
    res.json(tasks);
});

//
app.put('/api/updateTask/:id', async (req, res) => {
    const task = await appService.updateTask(req.body, req.params.id);
    res.json(task);
});

app.delete('/api/deleteTask/:id', async (req, res) => {
    const task = await appService.deleteTask(req.params.id);
    res.json(task);
});

app.get('/api/forumComments/:id', async (req, res) => {
    const tasks = await appService.getForumComments(req.params.id);
    res.json(tasks);
});

app.get('/api/forumComments/user/:id', async (req, res) => {
    const tasks = await appService.getUserForums(req.params.id);
    res.json(tasks);
});

app.get('/api/projectWorkers/:id', async (req, res) => {
    const users = await appService.projectWorkers(req.params.id);
    res.json(users);
});

app.post('/api/createForum', async (req, res) => {
    const forum = await appService.createForum(req.body);
    res.json(forum);
});

app.post('/api/createComment', async (req, res) => {
    const comment = await appService.createComment(req.body);
    res.json(comment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;