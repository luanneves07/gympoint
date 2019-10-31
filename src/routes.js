import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/students', StudentController.store);
routes.post('/users', UserController.store);

routes.get('/students', StudentController.index);
routes.get('/users', UserController.index);

export default routes;
