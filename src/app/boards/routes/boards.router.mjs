import express from 'express';
import {
  verifyBoardName,
  verifyBoardColumn,
} from '../middlewares/boards.middleware.mjs';
import {
  addBoardColumn,
  createBoard,
  deleteBoard,
  getBoards,
  updateBoardName,
} from '../controllers/boards.controller.mjs';

const router = express.Router();

router.get('/', getBoards);
router.post('/', verifyBoardName, createBoard);
router.post('/:boardId/name', verifyBoardName, updateBoardName);
router.post('/:boardId/column', verifyBoardColumn, addBoardColumn);
router.delete('/:boardId/column/:columnId', deleteBoard);
router.delete('/:boardId', deleteBoard);

export default router;
