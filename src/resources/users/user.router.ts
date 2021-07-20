// const router = require('express').Router();
// const User = require('./user.model');
// const usersService = require('./user.service');
import * as express from 'express';
import {User, IUser} from './user.model.js'
import * as usersService from './user.service.js'

export const router = express.Router()

router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    if (users)
        res.json(users.map(user =>User.toResponse(user)));
    else
        res.sendStatus(404);
});

router.route('/:id').get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (user)
        res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
    const user = await usersService.create(
        new User({
            name: req.body.name,
            login: req.body.login,
            password: req.body.password
        })
    );
    if (user instanceof User)
        res.status(201).json(User.toResponse(user));
    else
        res.sendStatus(404);
});

router.route('/:id').put(async (req, res) => {
    const user = await usersService.update(
        new User({
            _id: req.params.id,
            name: req.body.name,
            login: req.body.login,
            password: req.body.password
        })
    );
    if (user instanceof User)
        res.json(User.toResponse(user));
    else
        res.sendStatus(404);
});

router.route('/:id').delete(async (req, res) => {
    await usersService.deleteById(req.params.id);
    res.sendStatus(204);
});

