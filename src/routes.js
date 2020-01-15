import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

const routes = new Router();

/**
 * To access these routes, user do not have to specifically has a session created
 */
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/**
 * From now on, all requests needs a validation token generated by SessionController.
 */
routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

routes.get('/plans', PlanController.index);

routes.get('/registrations', RegistrationController.index);

export default routes;
