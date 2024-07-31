import { v4 as uuid } from 'uuid';

import Board from '../models/board.model.mjs';
import { BOARD_COLUMN_COLORS } from '../../constants.mjs';
import logger from '../../../lib/logger.mjs';

/**
 * Represents a service for managing boards.
 */
class BoardService {
  /**
   * Constructs a new instance of the BoardService class.
   */
  constructor({ userId }) {
    this.userId = userId;
    this.logger = logger;
    this.model = Board;
  }

  /**
   * Create a new board.
   * @param {Object} options - The options for creating the board.
   * @param {string} options.name - The name of the board.
   * @returns {Object} The created board.
   */
  async createBoard({ name }) {
    const board = new this.model({
      name,
      userId: this.userId,
      boardId: uuid(),
      columns: [
        {
          name: 'Todo',
          columnId: 'todo',
          color: BOARD_COLUMN_COLORS[0],
          tasks: [],
        },
        {
          name: 'Doing',
          columnId: 'doing',
          color: BOARD_COLUMN_COLORS[1],
          tasks: [],
        },
        {
          name: 'Done',
          columnId: 'done',
          color: BOARD_COLUMN_COLORS[2],
          tasks: [],
        },
      ],
    });
    await board.save();
    return board.toObject();
  }

  /**
   * List all boards for a given user.
   * @param {Object} options - The options for listing the boards.
   * @param {string} options.userId - The ID of the user.
   * @returns {Array} The list of boards.
   */
  async listBoards() {
    const boards = await this.model.find({ userId: this.userId });
    if (boards.length !== 0) {
      return boards;
    }
    return null;
  }

  /**
   * Add a task to a column.
   * @param {Object} options - The options for adding the task.
   * @param {string} options.boardId - The ID of the board.
   * @param {string} options.columnId - The ID of the column.
   * @param {Object} options.task - The task to be added.
   * @returns {Object} The updated board.
   */
  async addTaskToColumn({ boardId, columnId, task }) {
    const board = await this.model.findOneAndUpdate(
      { boardId, userId: this.userId, 'columns.columnId': columnId },
      {
        $push: {
          'columns.$.tasks': task,
        },
      },
      { new: true },
    );
    return board;
  }

  /**
   * Update a task in a column.
   * @param {Object} options - The options for updating the task.
   * @param {string} options.boardId - The ID of the board.
   * @param {string} options.columnId - The ID of the column.
   * @param {string} options.taskId - The ID of the task.
   * @param {Object} options.task - The updated task.
   * @returns {Object} The updated board.
   */
  async updateTaskInColumn({ boardId, columnId, taskId, task }) {
    const board = await this.model.findOneAndUpdate(
      {
        boardId,
        userId: this.userId,
        'columns.columnId': columnId,
        'columns.tasks.taskId': taskId,
      },
      {
        $set: {
          'columns.$[column].tasks.$[task]': task,
        },
      },
      {
        new: true,
        arrayFilters: [
          { 'column.columnId': columnId },
          { 'task.taskId': taskId },
        ],
      },
    );
    return board;
  }

  /**
   * Delete a task in a column.
   * @param {Object} options - The options for deleting the task.
   * @param {string} options.boardId - The ID of the board.
   * @param {string} options.columnId - The ID of the column.
   * @param {string} options.taskId - The ID of the task.
   * @returns {Object} The updated board.
   */
  async deleteTaskInColumn({ boardId, columnId, taskId }) {
    const board = await this.model.findOneAndUpdate(
      {
        boardId,
        userId: this.userId,
        'columns.columnId': columnId,
      },
      {
        $pull: {
          'columns.$.tasks': { taskId },
        },
      },
      { new: true },
    );
    return board;
  }

  /**
   * Delete a board.
   * @param {Object} options - The options for deleting the board.
   * @param {string} options.boardId - The ID of the board.
   * @returns {Object} The delete status.
   */
  async deleteBoard({ boardId }) {
    const deleteStatus = await this.model.deleteOne({
      boardId,
      userId: this.userId,
    });
    logger.info(deleteStatus);
    return deleteStatus;
  }

  /**
   * Update the name of a board.
   * @param {Object} options - The options for updating the board name.
   * @param {string} options.boardId - The ID of the board.
   * @param {string} options.name - The new name of the board.
   * @returns {Object} The updated board.
   */
  async updateBoardName({ boardId, name }) {
    const board = await this.model.findOneAndUpdate(
      { boardId, userId: this.userId },
      { name },
      { new: true },
    );
    return board;
  }

  /**
   * Add a column to a board.
   * @param {Object} options - The options for adding the column.
   * @param {string} options.boardId - The ID of the board.
   * @param {Object} options.column - The column to be added.
   * @returns {Object} The updated board.
   */
  async addColumn({ boardId, column }) {
    const { name, color } = column;
    const board = await this.model.findOneAndUpdate(
      { boardId, userId: this.userId },
      {
        $push: {
          columns: { name, columnId: uuid(), color, tasks: [] },
        },
      },
      { new: true },
    );

    return board;
  }

  /**
   * Delete a column from a board.
   * @param {Object} options - The options for deleting the column.
   * @param {string} options.boardId - The ID of the board.
   * @param {string} options.columnId - The ID of the column.
   * @returns {Object} The updated board.
   */
  async deleteColumn({ boardId, columnId }) {
    const board = await this.model.findOneAndUpdate(
      { boardId, userId: this.userId },
      {
        $pull: {
          columns: { columnId },
        },
      },
      { new: true },
    );

    return board;
  }
}

export default BoardService;
