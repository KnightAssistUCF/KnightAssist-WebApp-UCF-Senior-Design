const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserStudent = require('./userStudent.js').schema;
// const Event = require('./events.js').schema;
// const OrganizationSemester = require('./organizationSemester.js').schema;

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
        ref: 'userStudent',
    }],
    favorites: [{
        type: Schema.Types.ObjectId, // people that liked and favorited this organization
        ref: 'userStudent',
    }],
    updates: [{ // this work as announcements for the organization
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
        type: String
    }],
    // added a component for the organization's location which can be either a string address, or  google maps link
    location: String,
    organizationSemesters: [{
        type: Schema.Types.ObjectId,
        ref: 'organizationSemester',
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
    recoveryTokenForORG: {
        type: String,
        default: null
    },
    confirmTokenForORG: { // where the generated JWT token will be stored
        type: String,
        // required: true,
        default: ''
    },
    EmailTokenForORG: { // store the email token
        type: String,
        // required: true,
        default: ''
    },
    EmailValidated: { // if the organization validated their email
        type: Boolean,
        // required: true,
        default: false
    }, 
    __v: {
        type: String,
        required: true,
        default: 0,
        select: true
    }
}, {collection: 'organization', timestamps: true, select: true});

module.exports = mongoose.model('organization', organizationSchema);