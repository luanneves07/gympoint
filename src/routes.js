import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/users', UserController.index);

export default routes;
