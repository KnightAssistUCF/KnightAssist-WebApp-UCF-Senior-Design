const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const userStudentSchema = new mongoose.Schema({
    /* To be added maybe: graduation date, major, etc. */
    studentID: {
        type: String, // keeping it as string for now, maybe it makes things easier (alternative Int32)
        required: true,
        unique: true
    },
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
    favoritedOrganizations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization',
    }],
    eventsRSVP: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
    }],
    eventsHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
    }],
    totalVolunteerHours: {
        type: Number,
        required: true,
        default: 0
    },
    semesterVolunteerHourGoal: {
        type: Number,
        // required: true,
        default: 0
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
    
}, {collection: 'userStudent', timestamps: true});

module.exports = mongoose.model('userStudent', userStudentSchema);