const mongoose = require("mongoose");


let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    detial: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);