// const User = require('./user.model');
import {IUser, User} from './user.model.js';

/**
 * Module for all User Mongo DB related functions
 * @module User_Mongo_Repository
 */

/**
 * Returns all users
 * @async
 * @returns {Array<IUser>} - An Array of all existing users
 */
const getAll = async ():Promise<IUser[]|null> => User.find();

/**
 * Returns user by id
 * @async
 * @param {string} id - An id of user
 * @returns {IUser} - User with given id
 */
const get = async (id:string):Promise<IUser|null> => {
    const user = User.findById(id).exec();

    if (!user) {
        throw new Error(`The user with id: ${id} was not found`);
    }

    return user;
};

/**
 * Returns users by given properties
 * @async
 * @param {object} prop - properties to search users - tbd!!!!!
 * @returns {Array.<IUser>} An array of users matches to given properties
 */
const getByProp = async (prop:object):Promise<IUser[]|null> => {
    const users = await User.find(prop).limit(1);
    if (!users) {
        throw new Error('There are missing user with such props');
    }

    return users;
};

/**
 * Creates new user
 * @async
 * @param {IUser} user - user to create
 * @returns {IUser} Created user with id
 */
// eslint-disable-next-line no-return-await
const create = async (user:IUser):Promise<IUser|null> => await User.create(user);

/**
 * Updates user
 * @async
 * @param {IUser} user - updated user
 * @returns {IUser} - updated user
 */
const update = async (user:IUser):Promise<IUser|null> =>{
     User.updateOne({ _id: user._id }, user).exec();
     return User.findById(user._id);
}

/**
 * Deletes user by id, unassign tasks of deleted user
 * @async
 * @param {string} id - id of user to delete
 * @returns {number} - deleted users count
 */
const deleteById = async (id:string):Promise<number|undefined> => (await User.deleteOne({ _id: id })).deletedCount;

export { getAll, get, create, update, deleteById, getByProp };
