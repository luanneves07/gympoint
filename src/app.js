import express from 'express';
import routes from './routes';

/**
 * This import statement just load the database config making it read all models
 * of the application. Since we will not use its exported default object in this file
 * we don't need to declare a field for it.
 */
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
