import buildResponse from '../../../lib/buildResponse.mjs';
import BoardService from '../services/boards.service.mjs';

export const createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.params;

    const boardInstance = new BoardService({ userId });
    const board = await boardInstance.createBoard({ name });

    res.status(200).send(buildResponse.success(board));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const getBoards = async (req, res) => {
  try {
    const { userId } = req.params;
    const boardInstance = new BoardService({ userId });
    const boards = await boardInstance.listBoards();
    res.status(200).send(buildResponse.success(boards));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const updateBoardName = async (req, res) => {
  try {
    const { name } = req.body;
    const { boardId, userId } = req.params;

    const boardInstance = new BoardService({ userId });
    const board = await boardInstance.updateBoardName({ boardId, name });
    res.status(200).send(buildResponse.success(board));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const addBoardColumn = async (req, res) => {
  try {
    const { column } = req.body;
    const { boardId, userId } = req.params;

    const boardInstance = new BoardService({ userId });
    const board = await boardInstance.addColumn({ boardId, column });
    res.status(200).send(buildResponse.success(board));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const deleteBoardColumn = async (req, res) => {
  try {
    const { columnId } = req.body;
    const { boardId, userId } = req.params;
    const boardInstance = new BoardService({ userId });
    const board = await boardInstance.deleteColumn({ boardId, columnId });
    res.status(200).send(buildResponse.success(board));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const deleteBoard = async (req, res) => {
  try {
    const { boardId, userId } = req.params;
    const boardInstance = new BoardService({ userId });
    const deleteStatus = await boardInstance.deleteBoard({ boardId });
    res.status(200).send(buildResponse.success(deleteStatus));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};
