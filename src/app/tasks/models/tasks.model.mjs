import mongoose from 'mongoose';
import { SCHEMA } from '../../constants.mjs';

const { Schema, model } = mongoose;
const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    taskId: { type: String, required: true },
    columnId: { type: String, required: true },
    boardId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({ taskId: 1, boardId: 1 }, { unique: true });

const Task = model(SCHEMA.TASK, taskSchema);

export default Task;
