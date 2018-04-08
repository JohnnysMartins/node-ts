import * as express from 'express';
import UsuarioRouter from "./routes/usuario-router";
import { json, urlencoded } from 'body-parser';

class App {
  public express
  private router;
  private endPoint: string;

  constructor() {
    this.endPoint = '/api/v1'
    this.express = express();
    this.configMiddlewares()
      .mountRoutes()
      .initRoutes();
  }

  private configMiddlewares(): this {
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    return this;
  }
  private mountRoutes(): this {
    this.router = express.Router()
    this.router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })
    return this;
  }

  private initRoutes(): this {
    this.express.use(`${this.endPoint}/`, this.router);
    this.express.use(`${this.endPoint}/usuario`, UsuarioRouter);
    return this;
  }
}

export default new App().express
