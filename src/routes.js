import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/students', StudentController.index);
routes.get('/users', UserController.index);

export default routes;
