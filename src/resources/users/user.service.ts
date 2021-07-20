// const tasksRepo = require('../tasks/task.MongoRepository');
// const usersRepo = require('./user.MongoRepository');
// const hash = require('../../common/hash');
import * as tasksRepo from '../tasks/task.MongoRepository.js'
import * as usersRepo from './user.MongoRepository.js'
import * as hash from '../../common/hash.js'
import { IUser} from './user.model'
import { ITask } from 'resources/tasks/task.model.js';
/**
 * Module for all Users related functions
 * @module User_Service
 */

/**
 * Calls getAll function from repo
 * @returns {Array.<User>} An array of all existing users
 */
const getAll = () => usersRepo.getAll();

/**
 * Calls get function from repo and passes id
 * @param {string} id - An id of user
 * @returns {User} - User with given id
 */
const get = (id:string) => usersRepo.get(id);

/**
 * Calls getByProp function from Repo and passes prop
 * @param {object} prop - properties to search users - tbd!!!!!
 * @returns {Array.<User>} An array of users matches to given properties
 */
const getByProp = (prop:Object) => usersRepo.getByProp(prop);

/**
 * Calls hashFunc for password, calls create function from Repo and passes user
 * @param {User} user - user to create
 * @returns {User} Created user with id
 */
const create = async (user:IUser) => {
    const password:string|Error = await hash.hashFunc(user.password);
    if (typeof(password) === 'string'){
        user.password = password;
        return await usersRepo.create(user);
    }
    else return password;
};
/**
 * Calls update function from Repo and passes user
 * @param {User} user - updated user
 * @returns {User} - updated user
 */
const update = async (user:IUser) => {
    const password:string|Error = await hash.hashFunc(user.password);
    if (typeof(password) === 'string'){
        user.password = password
        return await usersRepo.update(user);
    }
    else return password;
};

/**
 * Calls delete function from Repo and passes id
 * @param {string} id - id of user to delete
 * @returns {number} - deleted users count
 */
const deleteById = async (id:string) => {
    const tasks = await tasksRepo.getByProp({ userId: id });
    if (tasks && tasks.length > 0) {
        // eslint-disable-next-line array-callback-return
        await tasks.map((el:ITask) => {
            // eslint-disable-next-line no-param-reassign
            el.userId = null;
            tasksRepo.update(el);
        });
    }
    return await usersRepo.deleteById(id);

};


export  { getAll, get, create, update, deleteById, getByProp };
