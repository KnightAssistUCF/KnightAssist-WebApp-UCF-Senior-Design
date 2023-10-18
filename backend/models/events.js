const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    date: Date,
    sponsoringOrganization: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent'
    }],
    registeredVolunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent'
    }],
    startTime: Date,
    endTime: Date,
    eventLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        website: String
    },
    eventTags: [String],
    semester: String,
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
}, {collection: 'event', timestamps: true});

module.exports = mongoose.model('event', eventSchema);