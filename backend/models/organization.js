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

const organizationSemesterSchema = new Schema({
    semester: {
        type: String
        // required: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }],
    startDate: Date,
    endDate: Date,
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }

}, {collection: 'organizationSemester', timestamps: true});

const organizationSchema = new Schema({
    organizationID: {
        type: String, // keeping it as a string for now for ease of use
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        unique: true // can be removed later if needed
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    logoUrl: String,
    category: [String], // what type of organization is this? (e.g. academic, social, etc.)
    followers: [{
        type: Schema.Types.ObjectId, // people that follow this organization
        ref: 'userStudent'
    }],
    favorites: [{
        type: Schema.Types.ObjectId, // people that liked and favorited this organization
        ref: 'userStudent'
    }],
    updates: [{
        title: String,
        content: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    calendarLink: String, // Could be a Google Calendar link or other platform
    contact: {
        email: String,
        phone: String,
        website: String,
        socialMedia: {
            facebook: String,
            twitter: String,
            instagram: String,
            // we can add more social media platforms here as needed
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    eventHappeningNow: {
        type: Boolean,
        default: false
    },
    backgroundURL: String,
    eventsArray: [{
        type: Schema.Types.ObjectId,
        ref: 'event'
    }],
    // added a component for the organization's location which can be either a string address, or  google maps link
    location: String,
    organizationSemesters: [{
        type: Schema.Types.ObjectId,
        ref: 'organizationSemester'
    }],
    // create a somponent to store the working hours of the organization per day per week
    workingHoursPerWeek: {
        sunday: {
            start: String,
            end: String
        },
        monday: {
            start: String,
            end: String
        },
        tuesday: {
            start: String,
            end: String
        },
        wednesday: {
            start: String,
            end: String
        },
        thursday: {
            start: String,
            end: String
        },
        friday: {
            start: String,
            end: String
        },
        saturday: {
            start: String,
            end: String
        }
    },
    __v: {
        type: String,
        required: true,
        default: 0,
        select: false
    }
}, {collection: 'organization', timestamps: true});

module.exports = mongoose.model('organization', organizationSchema);
module.exports = mongoose.model('event', eventSchema);
module.exports = mongoose.model('organizationSemester', organizationSemesterSchema);