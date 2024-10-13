require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { authRouter } = require('./endpoints/auth');
const { positionsRouter } = require('./endpoints/position');
const { rankingsRouter } = require('./endpoints/rankings');
const { gradingRouter } = require('./ai/grade_cv');
const { interviewRouter } = require('./ai/interview');

const app = express();

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Method', 'GET,POST,PUT');
    next();
});

app.use('/auth', authRouter);
app.use('/positions', positionsRouter);
app.use('/rankings', rankingsRouter);
app.use('/grade-cv', gradingRouter);
app.use('/interview', interviewRouter);

const start = async () => {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database!');

    app.listen(process.env.PORT, () => {
        console.log(`App listening on port ${process.env.PORT}.`);
    });
};

start().catch((e) => console.error('Error while starting application.', e));