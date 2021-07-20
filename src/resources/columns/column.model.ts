import {v1 as uuid} from 'uuid';

interface IColumn{
    _id: string;
    title: string;
    order: number;
}
export class Column implements IColumn {
    constructor({ _id = uuid(), title = 'COLUMN', order = 0 } = {}) {
        this._id = _id;
        this.title = title;
        this.order = order;
    }
    _id: string;
    title: string;
    order: number;
}
