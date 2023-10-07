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
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
    
}, {collection: 'userStudent', timestamps: true});

module.exports = mongoose.model('userStudent', userStudentSchema);