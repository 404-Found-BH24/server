const express = require('express');
const { Position } = require('../models/position');
const rankingsRouter = express.Router();

rankingsRouter.get('/:name', async (req, res) => {
    const { name } = req.params;
    const position = await Position.findOne({ name });

    //const sortedResults = position.results.sort((a, b) => b.score - a.score);

    //res.json(sortedResults);
});

module.exports = { rankingsRouter };
