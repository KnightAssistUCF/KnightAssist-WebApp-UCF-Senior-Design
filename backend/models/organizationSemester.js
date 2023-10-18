const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Organization = require('./organization.js').schema;
// const Event = require('./events.js').schema;

const organizationSemesterSchema = new Schema({
    semester: {
        type: String
        // required: true
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization',
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'event',
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

module.exports = mongoose.model('organizationSemester', organizationSemesterSchema);