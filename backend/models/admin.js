const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const userStudentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'admin'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }

}, { collection: 'admin', timestamps: true, versionKey: false });



module.exports = mongoose.model('admin', userStudentSchema);
