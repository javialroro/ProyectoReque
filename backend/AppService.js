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
}

module.exports.AppService = AppService;