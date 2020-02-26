const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a username'],

    },
    password: {
        type: String,
        required: [true, 'Please add a password'],


    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', UserSchema);