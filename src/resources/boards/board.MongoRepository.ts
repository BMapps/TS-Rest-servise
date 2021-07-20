import {Board, IBoard} from './board.model.js';

const getAll = async ():Promise<IBoard[]> => Board.find({}).exec();

const get = async (id:string):Promise<IBoard|null> => Board.findById(id).exec();

const create = async (board:IBoard):Promise<IBoard> => Board.create(board);

const update = async (board:IBoard):Promise<IBoard|null> => {
    Board.updateOne({ _id: board._id }, board).exec();
    return get(board._id);
}

const deleteById = async (id:string):Promise<number|undefined> => (await Board.deleteOne({ _id: id }).exec()).deletedCount;

export { getAll, get, create, update, deleteById };
