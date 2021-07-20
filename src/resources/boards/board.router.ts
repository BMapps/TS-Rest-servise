
import express from 'express'
import {Board, IBoard} from './board.model.js'
import * as boardsService from './board.service.js'

export const router = express.Router()

router.route('/').get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map((el:IBoard)=> Board.toResponse(el)));
});

router.route('/:id').get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    if (board === undefined || board === null) {
        res.sendStatus(404);
    } else {
        res.json(Board.toResponse(board));
    }
});

router.route('/').post(async (req, res) => {
    const board = await boardsService.create(
        new Board({ title: req.body.title, columns: req.body.columns })
    );
    res.status(201).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
    const board = await boardsService.update(
        new Board({
            _id: req.params.id,
            title: req.body.title,
            columns: req.body.columns
        })
    );
    if (board)
        res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
    await boardsService.deleteById(req.params.id);
    res.sendStatus(204);
});
