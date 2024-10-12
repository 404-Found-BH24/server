const express = require('express');
const { Position } = require('../models/position');
const positionsRouter = express.Router();

positionsRouter.get('/', async (req, res) => {
    const position = await Position.find({});
    res.json(position);
});

positionsRouter.get('/:name', async (req, res) => {
    const { name } = req.params;
    const position = await Position.findOne({ name });

    res.json(position)
});

positionsRouter.post('/', async (req, res) => {
    const { name, results } = req.body;

    const position = await Position.create({
        name, results
    });

    res.json(position)
});

module.exports = { positionsRouter };
