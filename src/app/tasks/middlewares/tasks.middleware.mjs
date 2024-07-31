import buildResponse from '../../../lib/buildResponse.mjs';
import * as Yup from 'yup';

const taskBodySchema = Yup.object({
  userId: Yup.string().required(),
  boardId: Yup.string().required(),
  columnId: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string(),
  subtasks: Yup.array().of(
    Yup.object({
      name: Yup.string(),
      subtaskId: Yup.string(),
      isCompleted: Yup.boolean(),
    }),
  ),
  assignee: Yup.string(),
});

export const verifyTask = async (req, res, next) => {
  const { columnId, title, description, subtasks, assignee } = req.body;
  const { userId, boardId } = req.params;

  if (
    await taskBodySchema.validate({
      columnId,
      title,
      description,
      subtasks,
      assignee,
      userId,
      boardId,
    })
  ) {
    next();
  } else {
    res.status(400).send(buildResponse({ message: 'Invalid request.' }));
  }
};
