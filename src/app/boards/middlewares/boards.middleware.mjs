import buildResponse from '../../../lib/buildResponse.mjs';
import * as Yup from 'yup';

const createBoardSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Invalid column name.')
    .required(),
  userId: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Invalid user name.')
    .required(),
});

const boardColumnSchema = Yup.object({
  column: Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Invalid column name.')
      .required(),
    color: Yup.string().matches(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'Invalid hex color code.',
    ),
  }),
  userId: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, 'Invalid user name.')
    .required(),
});

export const verifyBoardName = async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (await createBoardSchema.validate({ name, userId })) {
    next();
  } else {
    res.status(400).send(buildResponse({ message: 'Invalid request.' }));
  }
};

export const verifyBoardColumn = async (req, res, next) => {
  const { column } = req.body;
  const { userId } = req.params;

  if (await boardColumnSchema.validate({ column, userId })) {
    next();
  } else {
    res.status(400).send(buildResponse({ message: 'Invalid request.' }));
  }
};
