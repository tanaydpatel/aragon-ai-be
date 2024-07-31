import { v4 as uuid } from 'uuid';

import Task from '../models/tasks.model.mjs';
import BoardService from '../../boards/services/boards.service.mjs';
import logger from '../../../lib/logger.mjs';

/**
 * Represents a service for managing taskss.
 */
class TaskService {
  /**
   * Constructs a new instance of the BoardService class.
   */
  constructor({ userId, boardId }) {
    this.userId = userId;
    this.boardId = boardId;
    this.logger = logger;
    this.model = Task;
  }

  /**
   * Creates a new task.
   *
   * @param {Object} params - The parameters for creating the task.
   * @param {string} params.name - The name of the task.
   * @param {string} params.userId - The ID of the user creating the task.
   * @param {string} params.columnId - The ID of the column where the task belongs.
   * @param {string} params.boardId - The ID of the board where the task belongs.
   * @param {string} params.title - The title of the task.
   * @param {string} params.description - The description of the task.
   * @param {Array} params.subtasks - The subtasks of the task.
   * @param {string} params.assignee - The assignee of the task.
   * @returns {Object} The created task.
   */
  async createTask({ columnId, title, description, subtasks, assignee }) {
    const task = new this.model({
      taskId: uuid(),
      userId: this.userId,
      boardId: this.boardId,
      columnId,
      title,
      description,
      subtasks,
      assignee,
    });
    await task.save();

    const boardInstance = new BoardService({ userId: this.userId });
    await boardInstance.getBoard({ boardId: this.boardId, columnId, task });

    return task.toObject();
  }

  /**
   * Retrieves a list of tasks.
   *
   * @returns {Array} The list of tasks.
   */
  async listTasks() {
    const tasks = await this.model.find({
      boardId: this.boardId,
      userId: this.userId,
    });
    if (tasks.length !== 0) {
      return tasks;
    }
    return null;
  }

  /**
   * Updates a task in the specified column.
   *
   * @param {Object} params - The parameters for updating the task.
   * @param {string} params.columnId - The ID of the column containing the task.
   * @param {string} params.taskId - The ID of the task to update.
   * @param {Object} params.task - The new task data.
   * @returns {Object} The updated task.
   */
  async updateTask({
    taskId,
    columnId,
    title,
    description,
    subtasks,
    assignee,
  }) {
    const oldTask = await this.model.findOne({
      taskId,
    });

    const newTask = await this.model.findOneAndUpdate(
      {
        taskId,
      },
      {
        title,
        description,
        subtasks,
        assignee,
        columnId,
      },
      {
        new: true,
      },
    );

    if (oldTask.toObject().columnId !== columnId) {
      // update task mapping in board
      const boardInstance = new BoardService({ userId: this.userId });
      await boardInstance.updateTaskInColumn({
        boardId: this.boardId,
        columnId,
        taskId,
        task: newTask,
      });
    }
    return newTask;
  }

  /**
   * Deletes a task by its ID.
   *
   * @param {Object} params - The parameters for deleting the task.
   * @param {string} params.taskId - The ID of the task to delete.
   * @returns {Object} The deleted task.
   */
  async deleteTask({ taskId }) {
    const task = await this.model.findOneAndDelete({
      taskId,
    });

    // update task mapping in board
    const boardInstance = new BoardService({ userId: this.userId });
    await boardInstance.deleteTaskInColumn({
      boardId: this.boardId,
      columnId: task.columnId,
      taskId,
    });

    return task;
  }
}

export default TaskService;
