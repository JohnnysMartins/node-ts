import { ConnectionFactory } from "./connection-factory";
import * as mysql from 'mysql';
import { Usuario } from "../model/usuario";
export class UsuarioDao {

    private connection: mysql.Connection;

    constructor() {
        this.connection = new ConnectionFactory().getConnection();
    }

    public getUsuarios(callback): void{
        this.connection.query('select * from usuarios;', callback);
    }

    public getUsuarioById(id: string, callback): void {
        this.connection.query(`select * from usuarios where id = ?;`, id, callback);
    }

    public createUsuario(usuario: Usuario, callback){
        this.connection.query('insert into usuarios set ?;', usuario, callback);
    }

    public removeUsuario(id: string, callback): any {
        this.connection.query('delete from usuarios where id = ?;', id, callback);
    }
}