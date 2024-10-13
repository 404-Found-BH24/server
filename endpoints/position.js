const express = require('express');
const { Position } = require('../models/position');
const {User} = require("../models/user");
const positionsRouter = express.Router();

positionsRouter.get('/', async (req, res) => {
    const position = await Position.find({});
    res.json(position);
});

positionsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const position = await Position.findOne({ _id: id });

    res.json(position)
});

const mongoose = require('mongoose');

positionsRouter.get('/user/:_id', async (req, res) => {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findOne({ _id: _id });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.rankings);
});



positionsRouter.post('/', async (req, res) => {
    const { name, companyName, companyDescription } = req.body;

    const position = await Position.create({
        name, companyName, companyDescription
    });

    res.json(position)
});

module.exports = { positionsRouter };
