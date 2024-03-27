const { response } = require("./appLocal");

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
            const query = 'CALL registrarUsuario(?, ?, ?, ?, ?, ?, @respuesta)';
            const values = [user.nombre,user.cedula,user.correoElectronico,user.departamento,
            user.numeroTelefono,user.contrasena]
            await this.database.query(query, values);
            const result = await this.database.query('SELECT @respuesta');
            return result[0];
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
            const query = 'CALL crearProyecto(?, ?, ?, ?, ?, ?, @respuesta)';
            const values = [project.nombre,project.recursosNecesarios,project.presupuesto,
            project.responsable,project.description,project.fechaInicio]
            await this.database.query(query, values);
            const response = await this.database.query('SELECT @respuesta');
            return response[0];
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    }

    async createTask(task) {
        try {
            const query = 'CALL crearTarea(?,?,?,?,?)';
            const values = [task.idProyecto,task.nombre,task.descripcion,task.usuario,task.storyPoints]
            const newTask = await this.database.query(query, values);
            return newTask;

        } catch (error) {
            console.error('Failed to create task:', error);
        }
    }

    async login(user) {
        try {
            const query = 'CALL login(?,?,@idUsuarioR,@respuesta)';
            const values = [user.correoElectronico, user.contrasena];
            // Llamar al procedimiento almacenado y esperar la respuesta
            await this.database.query(query, values);
    
            // Después de llamar al procedimiento, obtener el valor de la variable de sesión @respuesta
            const result = await this.database.query('SELECT @idUsuarioR, @respuesta');
    
            // El resultado de la autenticación está en el campo "respuesta"
            return result[0]; // Cambiado de respuesta a idUsuario y respuesta
        
            // Devolver el resultado de la autenticación y el ID del usuario si está autenticado correctamente
        } catch (error) {
            console.error('Failed to login:', error);
            throw error; // Re-lanza el error para que pueda ser manejado en el nivel superior
        }
    }
    
//Consultar
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
//Modificar
    async getProjectTasks(id) {
        try {
            const query = 'CALL tareasDeProyecto(?)';
            const values = [id]
            const tasks = await this.database.query(query, values);
            return tasks;
        } catch (error) {
            console.error('Failed to get tasks:', error);
        }
    }

    async updateTask(task, idTarea) {
        try {
            const query = 'CALL actualizarTarea(?,?,?,?,?,?)';
            const values = [idTarea,task.newNombre,task.newDescripcion,task.newEstado, task.newUser, task.newStoryPoint]
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

    async projectWorkers(idProyecto) {
        try {
            const query = 'CALL mostrarColaboradoresPorProyecto(?)';
            const values = [idProyecto]
            const users = await this.database.query(query, values);
            return users;
        } catch (error) {
            console.error('Failed to get workers:', error);
        }
    }

    async createForum(forum) {
        try{
            const query = 'CALL crearForo(?,?,?,?)';
            const values = [forum.idProyecto,forum.tema,forum.idUsuario,forum.descripcion]
            const newForum = await this.database.query(query, values);
            return newForum;
        }
        catch (error) {
            console.error('Failed to create forum:', error);
        }
    }

    async createComment(comment) {
        try{
            const query = 'CALL crearComentarioForo(?,?,?)';
            const values = [comment.idForo,comment.idUsuario,comment.mensaje]
            const newComment = await this.database.query(query, values);
            return newComment;
        }
        catch (error) {
            console.error('Failed to create comment:', error);
        }
    }

    async deleteUserProject(user) {
        try{
            const query = 'CALL eliminarColaboradorProyecto(?,?)';
            const values = [user.idUsuario,user.idProyecto]
            const response = await this.database.query(query, values);
            return response;
        }
        catch (error) {
            console.error('Failed to delete user:', error);
        }
    }

    async endTask(idTarea) {
        try{
            const query = 'CALL finalizarTarea(?)';
            const values = [idTarea]
            const response = await this.database.query(query, values);
            return response;
        }
        catch (error) {
            console.error('Failed to end task:', error);
        }
    }


}

module.exports.AppService = AppService;