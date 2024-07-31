import mongoose from 'mongoose';
import { SCHEMA } from '../../constants.mjs';

const { Schema, model } = mongoose;
const boardSchema = new Schema(
  {
    name: { type: String, required: true },
    boardId: { type: String, required: true },
    userId: { type: String, required: true },
    columns: {
      type: [
        {
          name: { type: String, required: true },
          columnId: { type: String, required: true },
          color: { type: String, required: false },
          tasks: {
            type: [
              {
                type: Schema.Types.ObjectId,
                ref: SCHEMA.TASK,
                required: true,
              },
            ],
            required: false,
          },
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

boardSchema.index({ userId: 1, boardId: 1 }, { unique: true });

const Board = model(SCHEMA.BOARD, boardSchema);

export default Board;
