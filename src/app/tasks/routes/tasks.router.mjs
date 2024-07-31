import express from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/tasks.controller.mjs';
import { verifyTask } from '../middlewares/tasks.middleware.mjs';

const router = express.Router();

router.get('/', getTasks);
router.post('/:boardId/add', verifyTask, createTask);
router.post('/:boardId/:taskId', verifyTask, updateTask);
router.delete('/:boardId/:taskId', deleteTask);

export default router;
