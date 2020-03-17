import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

// User
routes.get('/users', UserController.index);
routes.post('/users', /* validateUserStore, */ UserController.store);
routes.put('/users/:id', /* validateUserStore, */ UserController.update);
// ===

export default routes;
