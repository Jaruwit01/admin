const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    }, { timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;