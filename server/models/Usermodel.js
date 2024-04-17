const mongoose = require("mongoose");


let UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phonenumber: {
        type: String,
        required: true,
    },
    DateofBirth: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);