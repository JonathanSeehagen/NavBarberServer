import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

// User - Usuários
routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users/:id', validateUserUpdate, UserController.update);
// ===

// Sessions - Login
routes.post(
  '/sessions',
  /* bruteForce.prevent, */
  validateSessionStore,
  SessionController.store
);
// ===

export default routes;
