const mongoose = require('mongoose');
const User = mongoose.model('User', {
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lookingForJob: { type: Boolean, required: true },
    cvUrl: String,
    rankings: {
        summary: Number,
        frontend: Number,
        backend: Number,
        fullstack: Number,
        Java: Number,
        UI: Number,
        pm: Number,
        devops: Number
    },
    experience: {
        summary: String,
        frontend: String,
        backend: String,
        fullstack: String,
        Java: String,
        UI: String,
        pm: String,
        devops: String
    }
});

module.exports = { User };