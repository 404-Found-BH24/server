const express = require('express');
const { Position } = require('../models/position');
const positionsRouter = express.Router();

positionsRouter.get('/', async (req, res) => {
    const position = await Position.find({});
    res.json(position);
});

positionsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const position = await Position.findOne({ id });

    res.json(position)
});

positionsRouter.post('/', async (req, res) => {
    const { name, companyName, companyDescription } = req.body;

    const position = await Position.create({
        name, companyName, companyDescription
    });

    res.json(position)
});

module.exports = { positionsRouter };
