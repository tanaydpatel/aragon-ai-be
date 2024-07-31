import buildResponse from '../../../lib/buildResponse.mjs';
import TaskService from '../services/tasks.service.mjs';

export const getTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { userId } = req.query;
    const taskInstance = new TaskService({ userId, boardId });
    const tasks = await taskInstance.listTasks();
    res.status(200).send(buildResponse.success(tasks));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const createTask = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { userId } = req.query;
    const { columnId, title, description, subtasks, assignee } = req.body;

    const taskInstance = new TaskService({ userId, boardId });
    const task = await taskInstance.createTask({
      columnId,
      title,
      description,
      subtasks,
      assignee,
    });
    res.status(200).send(buildResponse.success(task));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const updateTask = async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const { userId } = req.query;
    const { columnId, title, description, subtasks, assignee } = req.body;

    const taskInstance = new TaskService({ userId, boardId });
    const task = await taskInstance.updateTask({
      taskId,
      columnId,
      title,
      description,
      subtasks,
      assignee,
    });
    res.status(200).send(buildResponse.success(task));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { boardId, taskId } = req.params;
    const { userId } = req.query;
    const taskInstance = new TaskService({ userId, boardId });
    const task = await taskInstance.deleteTask({ taskId });
    res.status(200).send(buildResponse.success(task));
  } catch (error) {
    res.status(500).send(buildResponse.failure(error));
  }
};
