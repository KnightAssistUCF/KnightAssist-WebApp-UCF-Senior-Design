const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const UserStudent = require('./userStudent.js').schema;
// const Organization = require('./organization.js').schema;
// const Event = require('./events.js').schema;

const studentSemesterSchema = new mongoose.Schema({
    semester: {
        type: String
        // required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userStudent',
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
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

}, {collection: 'studentSemester', timestamps: true});

module.exports = mongoose.model('studentSemester', studentSemesterSchema);