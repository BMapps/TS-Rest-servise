import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from  '../common/config.js';
import * as hash from '../common/hash.js';
import * as userService from '../resources/users/user.service.js';

export const router = express.Router()

router.route('/').post(async (req:Request, res:Response):Promise<void> => {
    const user = await userService.getByProp({ login: req.body.login });

    if (user){
        if ( !user[0] || !hash.compare(req.body.password, user[0].password)) {
            res.status(401).send('incorrect combination of login and password');
        } else {
            const token = await jwt.sign(
                { _id: user[0]._id, login: user[0].login },
                JWT_SECRET_KEY
            );
            console.log(token);
            res.json({ token });
        }
    }else
        res.sendStatus(404);
});
