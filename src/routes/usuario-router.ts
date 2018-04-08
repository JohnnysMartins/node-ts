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
        let usuario = this.usuarioMock();
        this.router.get('/', (req, res) => {
            res.json({ usuario: usuario });
        });

        this.router.get('/all', (req, res) => {
            this.usuarioDao.getUsuarios((err, result) => {
                if (err || !result.length) {
                    res.send({ mensagem: err })
                    return;
                }
                res.send({ usuarios: result });
            });
        });

        this.router.post('/', (req, res) => {
            const { nome, email, senha } = req.body;
            const usuario = new Usuario(nome, email, senha);
            this.usuarioDao.createUsuario(usuario, (err, result) => {
                if (err) {
                    res.send({erro: err});
                    return;
                }
                res.send({mensagem: `Usuario ${nome} cadastrado com sucesso !`});
            });
        });
        return this;
    }
}

export default new UsuarioRouter().router