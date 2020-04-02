import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateAppointmentStore from './app/validators/AppointmentStore';

import authMiddleware from './app/middlewares/auth';

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

routes.use(authMiddleware);
// ===

// Appointments
routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);
// ===

export default routes;
