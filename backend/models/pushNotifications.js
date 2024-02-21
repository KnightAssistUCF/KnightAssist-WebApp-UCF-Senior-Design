const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
    contentType: {
        type: String,
        enum: ['Event', 'OrganizationUpdate'],
        required: true
    },
    contentId_Event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'events'
    },
    contentId_OrganizationUpdate: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'organization'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userStudent'
    }]
}, {
    timestamps: true, versionKey: false
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
