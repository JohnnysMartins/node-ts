import * as express from 'express';
import * as sha1 from "node-sha1";
import { Usuario } from "../model/usuario";
import { UsuarioDao } from '../services/usuario-dao';

class UsuarioRouter {

    private usuarioDao: UsuarioDao;
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.usuarioDao = new UsuarioDao();
        this.init();
    }

    private init(): this {

        this.getAllUsers()
            .getUsersById()
            .removeUser()
            .createUser()
            .updateUser();

        return this;
    }

    private getAllUsers(): this {
        this.router.get('/', (req, res) => {
            this.usuarioDao.getUsuarios((err, resultado) => {
                if (err || !resultado.length) {
                    console.error(err);
                    res.status(404);
                    res.json({ mensagem: "Erro ou buscar usuarios" });
                    return;
                }
                res.json({ usuarios: resultado });
            });
        });
        return this;
    }

    private getUsersById(): this {
        this.router.get('/:id', (req, res) => {
            const id = req.params.id;
            this.usuarioDao.getUsuarioById(id, (err, resultado) => {
                if (err || !resultado.length) {
                    res.status(404);
                    res.json({ mensagem: 'Usuario nao encontrado' });
                    return;
                }
                res.json({ usuario: resultado });
            });
        });
        return this;
    }

    private removeUser(): this {
        this.router.delete('/', (req, res) => {
            const { id } = req.body;
            this.usuarioDao.removeUsuario(id, (err, result) => {
                if (err || !result.affectedRows) {
                    console.log(err);
                    res.json({ erro: 'Erro ou remover usuario !' });
                    return;
                }
                res.json({ mensagem: 'Usuario removido com sucesso !' });
            });
        });
        return this;
    }

    private createUser(): this {
        this.router.post('/', (req, res) => {
            const { nome, email, senha } = req.body;
            const senhaSha1 = sha1(senha);
            const usuario = new Usuario(nome, email, senhaSha1);
            this.usuarioDao.createUsuario(usuario, (err, resultado) => {
                if (err) {
                    console.error(err);
                    res.json({ erro: `Erro ao cadastrar o cliente ${nome}` });
                    return;
                }
                res.json({ mensagem: `Usuario ${nome} cadastrado com sucesso !` });
            });
        });
        return this;
    }

    private updateUser(): this {
        this.router.put('/', (req, res) => {
            const { nome, email, senha, id } = req.body;
            const senhaSha1 = sha1(senha);
            const usuario = new Usuario(nome, email, senhaSha1, id);
            this.usuarioDao.updateUsuario(usuario, (err, resultado) => {
                if (err) {
                    console.error(err);
                    res.json({ erro: `Erro ao atualizar o cliente ${nome}` });
                    return;
                }
                res.json({ mensagem: `Usuario Atualizado com sucesso !` });
            });
        });
        return this;
    }
}

export default new UsuarioRouter().router