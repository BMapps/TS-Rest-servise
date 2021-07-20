
import * as tasksRepo from '../tasks/task.MongoRepository.js'
import { IBoard } from './board.model.js';
import * as boardsRepo from './board.MongoRepository.js'

const getAll = ():Promise<IBoard[]> => boardsRepo.getAll();

const get = (id:string):Promise<IBoard|null> => boardsRepo.get(id);

const create = (board:IBoard):Promise<IBoard> => boardsRepo.create(board);

const update = (board:IBoard):Promise<IBoard|null> => boardsRepo.update(board);

const deleteById = async (id:string):Promise<number|undefined> => {
    const tasks = await tasksRepo.getAll(id);
    if (tasks) {
        await tasks.map(el => tasksRepo.deleteById(el._id));
    }
    // eslint-disable-next-line no-return-await
    return await boardsRepo.deleteById(id);
};

export  { getAll, get, create, update, deleteById };

// dep inj

// export default class BoardService {
//     constructor (bardsRepo){
//         this.boardsRepo = bardsRepo;
//     }

//     getAll = () => boardsRepo.getAll();

//     get = id => boardsRepo.get(id);

//     create = board => boardsRepo.create(board);

//     update = board => boardsRepo.update(board);

//     deleteById = id => boardsRepo.deleteById(id);

// }
