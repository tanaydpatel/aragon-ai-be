import express from 'express';
import boardsRouter from './app/boards/routes/boards.router.mjs';
import tasksRouter from './app/tasks/routes/tasks.router.mjs';

/**
 *
 * @returns {express.Router} An instance of an Express router configured with the application's routes.
 */
export default function createRouter() {
  const router = express.Router();

  // public routes
  router.get('/', (req, res) => {
    res.send('Hello world');
  });

  router.use('/:userId/boards', boardsRouter);
  router.use('/:userId/tasks', tasksRouter);

  return router;
}
