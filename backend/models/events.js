const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
        required: true
    },
    timeFeedbackSubmitted: {
        type: Date,
        required: true,
        default: Date.now
    },
    studentName: String, 
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum value
        max: 5  // Maximum value
    },
    feedbackText: String,
    wasReadByUser: {
        type: Boolean,
        required: true,
        default: false
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
}, {timestamps: true});

const eventSchema = new Schema({
    /* remove this for now we will be relying on the native mongoDB provided ids */
    // eventID: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    date: Date,
    sponsoringOrganization: {
        type: String,
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    registeredVolunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
    }],
    profilePicPath: {
        type: String,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    startTime: Date,
    endTime: Date,
    eventLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        website: String
    },
    checkedInStudents: [{
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'userStudent',
        },
        checkInTime: Date,
        checkOutTime: Date
    }],
    feedback: [feedbackSchema],
    eventTags: [String],
    semester: String,
    maxAttendees: {
        type: Number,
        required: true
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
}, {collection: 'event', timestamps: true});

module.exports = mongoose.model('event', eventSchema);