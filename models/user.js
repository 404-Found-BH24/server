const mongoose = require('mongoose');
const User = mongoose.model('User', {
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lookingForJob: { type: Boolean, required: true },
    cv: {
        file: { type: Buffer, required: false },
        filename: { type: String, required: false },
    }
});

module.exports = { User };