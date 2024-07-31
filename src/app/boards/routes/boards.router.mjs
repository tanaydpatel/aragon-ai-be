import express from 'express';
import {
  verifyCreateBoard,
  verifyUpdateBoard,
} from '../middlewares/boards.middleware.mjs';
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
} from '../controllers/boards.controller.mjs';

const router = express.Router();

router.get('/boards', getBoards);
router.post('/board', verifyCreateBoard, createBoard);
router.put('/board/:boardId', verifyUpdateBoard, updateBoard);
router.delete('/board/:boardId', deleteBoard);

export default router;
