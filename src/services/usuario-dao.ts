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

    public createUsuario(usuario: Usuario, callback){
        this.connection.query('insert into usuarios set ?', usuario, callback);
    }
}