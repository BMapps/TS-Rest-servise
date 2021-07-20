// const mongoose = require('mongoose');
// const { MONGO_CONNECTION_STRING } = require('../common/config');
import mongoose from 'mongoose';
//import {env} from '../common/config.js'
import {MONGO_CONNECTION_STRING} from '../common/config.js';



export const connectToDB = async (cb:Function):Promise<void> => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', ():void => {
        console.log('MongoDB connected');
        cb();
    });
    try {
        await mongoose.connect(MONGO_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log( error);
    }

};
