import jwt from 'jsonwebtoken';
import * as userService from '../resources/users/user.service.js'
import {JWT_SECRET_KEY} from '../common/config.js'
import { NextFunction, Request, Response } from 'express';

export const authentication = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    if (req.originalUrl === '/login' || req.originalUrl === '/login/') {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        try {
            const decoded = (jwt.verify(
                req.headers.authorization.split(' ')[1],
                JWT_SECRET_KEY
            )as {_id:string, login:string});
            const user = await userService.get(decoded._id);
            if (user && user.login === decoded.login) {
                next();
            } else {
                res.sendStatus(401);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
};
