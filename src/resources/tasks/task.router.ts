import express, { NextFunction, Request, Response } from 'express'
import {Task} from './task.model.js'
import * as tasksService from './task.service.js'

export const router = express.Router({ mergeParams: true });

router.route('/').get(async (req:Request, res:Response, next:NextFunction) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    if (tasks)
        res.json(tasks.map(task =>Task.toResponse(task)));
    else
        res.sendStatus(404);
});

router.route('/:id').get(async (req:Request, res:Response) => {
    const task = await tasksService.get(req.params.id);
    if (task)
        res.json(Task.toResponse(task));
    else
        res.sendStatus(404);
});

router.route('/').post(async (req:Request, res:Response) => {
    if (req.body.boardId === null || req.params.boardId === req.body.boardId) {
        try {
            const task = await tasksService.create(
                new Task({
                    title: req.body.title,
                    order: req.body.order,
                    description: req.body.description,
                    userId: req.body.userId,
                    boardId: req.params.boardId,
                    columnId: req.body.columnId
                })
            );
            res.status(201).json(Task.toResponse(task));
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(422).send("boardId in URL doesn't equal boardId in body");
    }
});

router.route('/:id').put(async (req:Request, res:Response) => {
    const task = await tasksService.update(
        new Task({
            _id: req.params.id,
            title: req.body.title,
            order: req.body.order,
            description: req.body.description,
            userId: req.body.userId,
            boardId: req.body.boardId,
            columnId: req.body.columnId
        })
    );
    if (task)
        res.json(Task.toResponse(task));
    else
        res.sendStatus(501);
});

router.route('/:id').delete(async (req:Request, res:Response) => {
    await tasksService.deleteById(req.params.id);
    res.sendStatus(204);
});
