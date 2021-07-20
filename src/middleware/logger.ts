import { NextFunction, Request, Response } from 'express';
import {v1 as uuid} from 'uuid';

const log = (item:Array<any>):void => {
    if (Array.isArray(item[1])) {
        console.log(item[0]);
        for (let i = 0; i < item[1].length; i+=1) {
            console.log(item[1][i]);
        }
    } else {
        console.log(item[0].concat(': ', item[1]));
    }
};

export const logger = (req:Request, res:Response, next:NextFunction|undefined):void => {
    const id = uuid();
    const start = Date.now();
    console.log(`\nReq: ${id}`);
    console.log(`URL: ${req.url}`);
    console.log(`Parameters: ${Object.values(req.params)}`);
    console.log(req.method);
    console.log(req.headers);
    if (req.body){
        console.log('Body:');
        Object.entries(req.body).map(el => log(el));
    }

    const [oldWrite, oldEnd] = [res.write, res.end];

    let chunks:Buffer[]= [];

    (res.write as unknown)= function(chunk:Uint8Array):void {
        chunks.push(Buffer.from(chunk));

        (oldWrite as Function).apply(res, arguments);
      };

    (res.end as unknown) = function (chunk:Uint8Array):void {
        if (chunk)
            chunks.push(Buffer.from(chunk));

        let body = Buffer.concat(chunks).toString('utf8');
        console.log(`\nRes: ${id}`);
        console.log(`time: ${Date.now() - start}`);
        console.log(`status: ${res.statusCode}`);
        if (body) {
            console.log("Body");
            try {
                body = JSON.parse(body);
                if (body.length)
                    for (let i=0; i<body.length;i+=1)  console.log(body[i]);
                else   console.log(body);

            } catch(err) {
                console.log(body);
            }
        }
        (oldEnd as Function).apply(res, arguments);
    };
    if (next)
        next();
};

