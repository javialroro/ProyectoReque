class AppService {
    constructor(database) {
        this.database = database;
    }

    async getUsers() {
        const users = await this.database.query('SELECT * FROM usuario');
        return users;
    }
}

module.exports.AppService = AppService;