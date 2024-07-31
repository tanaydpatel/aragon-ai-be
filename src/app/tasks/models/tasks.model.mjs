import mongoose from 'mongoose';
import { SCHEMA } from '../../constants.mjs';

const { Schema, model } = mongoose;
const taskSchema = new Schema(
  {
    boardId: { type: String, required: true },
    userId: { type: String, required: true },

    taskId: { type: String, required: true, unique: true },
    columnId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    substasks: {
      type: [
        {
          name: { type: String, required: true },
          subtaskId: { type: String, required: true },
          isCompleted: { type: Boolean, required: true },
        },
      ],
      required: false,
    },
    assignee: { type: String },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ boardId: 1, userId: 1 }, { unique: true });

const Task = model(SCHEMA.TASK, taskSchema);

export default Task;
