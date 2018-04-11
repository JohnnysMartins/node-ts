import * as express from 'express';
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
                    res.send({ mensagem: "Erro ou buscar usuarios" });
                    return;
                }
                res.send({ usuarios: resultado });
            });
        });
        return this;
    }

    private getUsersById(): this {
        this.router.get('/:id', (req, res) => {
            const id = req.params.id;
            this.usuarioDao.getUsuarioById(id, (err, resultado) => {
                if (err || !resultado.length) {
                    res.send({ mensagem: 'Usuario nao encontrado' });
                    return;
                }
                res.send({ usuario: resultado });
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
                    res.send({ erro: 'Erro ou remover usuario !' });
                    return;
                }
                res.send({ mensagem: 'Usuario removido com sucesso !' });
            });
        });
        return this;
    }

    private createUser(): this {
        this.router.post('/', (req, res) => {
            const { nome, email, senha } = req.body;
            const usuario = new Usuario(nome, email, senha);
            this.usuarioDao.createUsuario(usuario, (err, resultado) => {
                if (err) {
                    console.error(err);
                    res.send({ erro: `Erro ao cadastrar o cliente ${nome}` });
                    return;
                }
                res.send({ mensagem: `Usuario ${nome} cadastrado com sucesso !` });
            });
        });
        return this;
    }

    private updateUser(): this {
        this.router.put('/', (req, res) => {
            const { nome, email, senha, id } = req.body;
            const usuario = new Usuario(nome, email, senha, id);
            this.usuarioDao.updateUsuario(usuario, (err, resultado) => {
                if (err) {
                    console.error(err);
                    res.send({ erro: `Erro ao atualizar o cliente ${nome}` });
                    return;
                }
                res.send({ mensagem: `Usuario Atualizado com sucesso !` });
            });
        });
        return this;
    }
}

export default new UsuarioRouter().router