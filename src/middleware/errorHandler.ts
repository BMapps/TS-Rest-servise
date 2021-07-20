import { NextFunction, Request, Response } from "express";

export const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction|undefined):void => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    if (next)
        next();
};
