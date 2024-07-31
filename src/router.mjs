import express from 'express';



/**
 * Creates and configures an Express router with predefined routes for user authentication and registration.
 * It includes both public routes (e.g., home, register, login, token refresh) and secured routes (e.g., user-specific operations).
 * The secured routes require a valid authentication token, verified by the `authUser` middleware.
 *
 * @returns {express.Router} An instance of an Express router configured with the application's routes.
 */
export default function createRouter() {
  const router = express.Router();

  // public routes
  router.get('/', (req, res) => {
    res.send('Hello world');
  });



  return router;
}
