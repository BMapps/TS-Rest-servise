import {v1 as uuid} from 'uuid';
import mongoose from 'mongoose';

export interface ITask {
    _id: string;
    title: string;
    order: Number;
    description: string;
    userId: String|null;
    boardId: String;
    columnId: String;
}

interface ITaskStatic extends mongoose.Model<ITask> {
    toResponse(task:ITask):object;
}

const TaskSchema = new mongoose.Schema<ITask, ITaskStatic>({
    _id: {
        type: String,
        default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    },
    {versionKey: false}
    );
TaskSchema.static('toResponse', function toResponse (task:ITask) {
    const { _id:id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
});

export const Task = mongoose.model<ITask, ITaskStatic>('Task', TaskSchema);
