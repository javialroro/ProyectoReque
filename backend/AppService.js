class AppService {
    constructor(database) {
        this.database = database;
    }

    async getUsers() {
        try {
            const query = 'SELECT * FROM usuario';
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
}

module.exports.AppService = AppService;