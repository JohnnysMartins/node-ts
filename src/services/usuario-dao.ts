import { ConnectionFactory } from "./connection-factory";
import * as mysql from 'mysql';
import { Usuario } from "../model/usuario";

export class UsuarioDao {

    private connection: mysql.Connection;

    constructor() {
        this.connection = new ConnectionFactory().getConnection();
    }

    public getUsuarios(callback: (err, result) => void): void{
        this.connection.query('select id, nome, email from usuarios;', callback);
    }

    public getUsuarioById(id: string, callback: (err, result) => void): void {
        this.connection.query(`select id, nome, email from usuarios where id = ?;`, id, callback);
    }

    public createUsuario(usuario: Usuario, callback: (err, result) => void): void{
        this.connection.query('insert into usuarios set ?;', usuario, callback);
    }

    public updateUsuario(usuario: Usuario, callback: (err, result) => void): void{
        this.connection.query('update usuarios set ? where id = ?;', [usuario, usuario.getId()], callback);
    }

    public removeUsuario(id: string, callback: (err, result) => void): any {
        this.connection.query('delete from usuarios where id = ?;', id, callback);
    }
}