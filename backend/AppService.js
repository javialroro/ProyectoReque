class AppService {
    constructor(database) {
        this.database = database;
    }

    async getUsers() {
        try {
            const query = 'SELECT * FROM Usuario';
            const users = await this.database.query(query);
            return users;
        } catch (error) {
            console.error('Failed to get users:', error);
        }
    }

    async getProjects() {
        try {
            const query = 'CALL obtenerProyectos()';
            const projects = await this.database.query(query);
            return projects;
        } catch (error) {
            console.error('Failed to get projects:', error);
        }
    }

    async getTaskState() {
        try {
            const query = 'CALL tareasPorEstado()';
            const taskState = await this.database.query(query);
            return taskState;
        } catch (error) {
            console.error('Failed to get task state:', error);
        }
    }

    async registerUser(user) {
        try {
            const query = 'CALL registrarUsuario(?, ?, ?, ?, ?, ?)';
            const values = [user.nombre,user.cedula,user.correoElectronico,user.departamento,
            user.numeroTelefono,user.contrasena]
            const newUser = await this.database.query(query, values);
            return newUser;
        } catch (error) {
            console.error('Failed to register user:', error);
        }
    }

    async usersNotAsigned() {
        try {
            const query = 'CALL obtenerUsuariosSinProyecto()';
            const users = await this.database.query(query);
            return users;
        } catch (error) {
            console.error('Failed to get users:', error);
        }
    }

    async asignProject(user) {
        try {
            const query = 'CALL asignarProyectoAColaborador(?, ?)';
            const values = [user.idProyecto,user.idUsuario ];
            const newUser = await this.database.query(query, values);
            return newUser;
        } catch (error) {
            console.error('Failed to asign user:', error);
        }
    }

    async updateUser(user,idUsuario) {
        try {
            const query = 'CALL modificarColaborador(?, ?, ?, ?, ?)';
            const values = [idUsuario,user.correoElectronico,user.departamento,
            user.numeroTelefono,user.estado]
            const newUser = await this.database.query(query, values);
            return newUser;
        } catch (error) {
            console.error('Failed to modify user:', error);
        }
    }

    async createProject(project) {
        try {
            const query = 'CALL crearProyecto(?, ?, ?, ?, ?, ?)';
            const values = [project.nombre,project.recursosNecesarios,project.presupuesto,
            project.responsable,project.description,project.fechaInicio]
            const newProject = await this.database.query(query, values);
            return newProject;
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    }

    async createTask(task) {
        try {
            const query = 'CALL crearTarea(?,?,?,?)';
            const values = [task.idProyecto,task.nombre,task.descripcion,task.usuario]
            const newTask = await this.database.query(query, values);
            return newTask;

        } catch (error) {
            console.error('Failed to create task:', error);
        }
    }

    async login(user) {
        try {
            const query = 'CALL login(?,?,@respuesta)';
            const values = [user.correoElectronico, user.contrasena];
            // Llamar al procedimiento almacenado y esperar la respuesta
            await this.database.query(query, values);
    
            // Después de llamar al procedimiento, obtener el valor de la variable de sesión @respuesta
            const result = await this.database.query('SELECT @respuesta AS respuesta');
    
            // El resultado de la autenticación está en el campo "respuesta"
            const { respuesta } = result[0];
    
            // Devolver el resultado de la autenticación
            return respuesta;
        } catch (error) {
            console.error('Failed to login:', error);
            throw error; // Re-lanza el error para que pueda ser manejado en el nivel superior
        }
    }
    

    async projectTasks(id) {
        try {
            const query = 'CALL infoTareasDeProyecto(?)';
            const values = [id]
            const tasks = await this.database.query(query, values);
            return tasks;
        } catch (error) {
            console.error('Failed to get tasks:', error);
        }
    }

    async updateTask(task, idTarea) {
        try {
            const query = 'CALL actualizarTarea(?,?,?,?,?)';
            const values = [idTarea,task.newNombre,task.newDescripcion,task.newEstado, task.newUser]
            const response = await this.database.query(query, values);
            return response;
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    }

    async deleteTask(idTarea) {
        try {
            const query = 'CALL eliminarTarea(?)';
            const values = [idTarea]
            const response = await this.database.query(query, values);
            return response;
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    }

    async getForumComments(idForo) {
        try {
            const query = 'CALL ObtenerComentariosDeForo(?)';
            const values = [idForo]
            const comments = await this.database.query(query, values);
            return comments;
        } catch (error) {
            console.error('Failed to get comments:', error);
        }
    }

    async getUserForums (idUsuario) {
        try {
            const query = 'CALL MostrarForosSegunUsuario(?)';
            const values = [idUsuario]
            const forums = await this.database.query(query, values);
            return forums;
        } catch (error) {
            console.error('Failed to get forums:', error);
        }
    }


}

module.exports.AppService = AppService;