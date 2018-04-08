import * as mysql from 'mysql';

export class ConnectionFactory {
    constructor() {}

    public getConnection(): mysql.Connection {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'toor',
            database: 'node-ts'
        });
    }
}