/* eslint-disable no-return-await */
import {Task, ITask} from './task.model.js';

const getAll = async (boardId:string):Promise<ITask[]|null> => await Task.find({ boardId });

const get = async (id:string):Promise<ITask|null> => await Task.findById(id).exec();

const create = async (task:ITask):Promise<ITask> => await Task.create(task);

const update = async (task:ITask):Promise<ITask|null> => {
    Task.updateOne({ _id: task._id }, task).exec();
    return get(task._id);
}

const deleteById = async (id:string):Promise<number|undefined> => (await Task.deleteOne({ _id: id })).deletedCount;

const getByProp = async (prop:object):Promise<ITask[]|null> => Task.find(prop).exec();

export { getAll, get, create, update, deleteById, getByProp };
