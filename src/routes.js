import { Router } from 'express';

import StudentController from './app/controllers/StudentController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/students', StudentController.store);
routes.post('/users', UserController.store);

routes.get('/students', StudentController.index);
routes.get('/users', UserController.index);

export default routes;
