const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'userStudent',
        required: true
    },
	eventId: {
		type: Schema.Types.ObjectId,
        ref: 'event',
        required: true,
	},
    timeFeedbackSubmitted: {
        type: Date,
        required: true,
        default: Date.now
    },
    studentName: String, 
	eventName: String,
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
}, {timestamps: true}, {collection: 'feedback'});

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
        default: 'backend/images/orgdefaultbackground.png'
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
        checkOutTime: Date,
        // this will store if the hours were adjusted for this student for a specific event 
        // and if it is false that means it was determined based on the automatic default calculation only
        wereHoursAdjusted_ForSudent_ForThisEvent: {
            type: Boolean,
            // store the adjuster that can be either an admin or an organization
            adjuster: {
                type: Schema.Types.ObjectId,
                ref: 'userAdmin' || 'organization',
                default: null
            },
            howMuchAdjusted: Number, // manula input edited version - autmated checkin and out to see by how much this was adjusted
            default: false
        }
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