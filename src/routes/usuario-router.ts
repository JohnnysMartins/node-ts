import * as express from 'express';
import { Usuario } from "../model/usuario";
import { UsuarioDao } from '../services/usuario-dao';

class UsuarioRouter {

    private usuarioDao: UsuarioDao;
    private usuarioMock(): Usuario {
        return new Usuario('johnnys Martins', 'johnnys.martins@me.com', '123654');
    }
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.usuarioDao = new UsuarioDao();
        this.init();
    }

    private init(): this {

        this.router.get('/', (req, res) => {
            this.usuarioDao.getUsuarios((err, resultado) => {
                if (err || !resultado.length) {
                    res.send({ mensagem: "Erro ou buscar usuarios" });
                    return;
                }
                res.send({ usuarios: resultado });
            });
        });

        this.router.get('/byId/:id', (req, res) => {
            const id = req.params.id;
            this.usuarioDao.getUsuarioById(id, (err, resultado) => {
                if (err || !resultado.length) {
                    res.send({ mensagem: 'Usuario nao encontrado' });
                    return;
                }
                res.send({ usuarios: resultado });
            });
        });

        this.router.delete('/', (req, res) => {
            const { id } = req.body;
            this.usuarioDao.removeUsuario(id, (err, result)=>{
                if (err || !result.affectedRows) {
                    console.log(err);
                    res.send({erro: 'Erro ou remover usuario !'});
                    return;
                }
                res.send({mensagem: 'Usuario removido com sucesso !'});
            });
        });

        this.router.post('/', (req, res) => {
            const { nome, email, senha } = req.body;
            const usuario = new Usuario(nome, email, senha);
            this.usuarioDao.createUsuario(usuario, (err, resultado) => {
                if (err) {
                    res.send({ erro: err });
                    return;
                }
                res.send({ mensagem: `Usuario ${nome} cadastrado com sucesso !` });
            });
        });
        return this;
    }
}

export default new UsuarioRouter().router