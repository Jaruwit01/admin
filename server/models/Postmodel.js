const mongoose = require("mongoose");


let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    type : {
        type: String,
        required: true,
    },
    urlpic : {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);