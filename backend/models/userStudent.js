const mongoose = require('mongoose');

const userStudentSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        // I wonder, can we enforce that it is a knights email? maybe we can do that on front end
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        // this is a default profile picture from gravatar
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    __v: {
        type: Number,
        required: true,
        default: 0,
        select: false
    }
    
}, {collection: 'userStudent'}, {timestamps: true});

module.exports = mongoose.model('userStudent', userStudentSchema);