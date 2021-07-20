import {v1 as uuid} from 'uuid';
import mongoose from 'mongoose';
import { Column } from 'resources/columns/column.model';


export interface IBoard {
    _id: string;
    title: string,
    columns: Array<Column>
}

interface IBoardStatic extends mongoose.Model<IBoard>{
    toResponse(board:IBoard):object;
}
const BoardSchema = new mongoose.Schema<IBoard, IBoardStatic>({
    _id: {
        type: String,
        default: uuid
    },
    title: String,
    columns: Array
},
{versionKey: false});

BoardSchema.static('toResponse', function toResponse (board:IBoard){
    const { _id:id, title, columns } = board;
    return { id, title, columns };
})

export const Board = mongoose.model<IBoard, IBoardStatic>('Board', BoardSchema);
