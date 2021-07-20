import {v1 as uuid} from 'uuid';
import mongoose from 'mongoose';

/**
 * Module for User DataBase Model
 * @module User_Model
 */

export interface IUser {
    _id: string;
    name: string;
    login: string;
    password: string;
}

interface IUserStatic extends mongoose.Model<IUser> {
    toResponse(user:IUser):object
}

const UserSchema = new mongoose.Schema<IUser, IUserStatic>({
    _id: {
        type: String,
        default: uuid
    },
    name: String,
    login: String,
    password: String
},
{versionKey: false});
UserSchema.static('toResponse', function toResponse (user:IUser){
    const { _id:id, name, login } = user;
    return { id, name, login };
})

export const User = mongoose.model<IUser, IUserStatic>('User', UserSchema);

