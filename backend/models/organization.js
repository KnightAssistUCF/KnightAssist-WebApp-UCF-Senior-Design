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
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'userStudent'
    }]
}, {collection: 'event'}, {timestamps: true});

const organizationSchema = new Schema({
    name: {
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
    events: [eventSchema],
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
    }
}, {collection: 'organization'}, {timestamps: true});

module.exports = mongoose.model('organization', organizationSchema);