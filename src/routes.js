import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// User - Usuários
routes.get('/users', UserController.index);
routes.post('/users', /* validateUserStore, */ UserController.store);
routes.put('/users/:id', /* validateUserStore, */ UserController.update);
// ===

// Sessions - Login
routes.post(
  '/sessions',
  /* bruteForce.prevent, validateSessionStore, */ SessionController.store
);
// ===

export default routes;
