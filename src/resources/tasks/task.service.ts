/* eslint-disable no-return-await */
import { ITask } from './task.model.js';
import * as tasksRepo from './task.MongoRepository.js';

const getAll = async (boardId:string):Promise<ITask[]|null> => await tasksRepo.getAll(boardId);

const get = async (id:string):Promise<ITask|null> => await tasksRepo.get(id);

const create = async (task:ITask):Promise<ITask> =>
    // let column;
    // if (task.columnId !== null) {
    //     try {
    //         column = await boardsRepo
    //             .get(task.boardId)
    //             .columns.filter(el => el.id === task.columnId);
    //     } catch (error) {
    //         if (!column) {
    //             throw new Error(
    //                 'column with submitted id is missing in this board'
    //             );
    //         }
    //     }
    // }
     await tasksRepo.create(task)
;

const update = async (task:ITask):Promise<ITask|null> => await tasksRepo.update(task);

const deleteById = async (id:string):Promise<number|undefined> => await tasksRepo.deleteById(id);

export { getAll, get, update, create, deleteById };
