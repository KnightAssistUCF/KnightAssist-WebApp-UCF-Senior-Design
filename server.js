require('dotenv').config();

const port = process.env.PORT || 5000;
const dbURL = process.env.atlasDB_LINK || process.env.atlasDB_LINK_BackUP;


const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.set('port', port);
app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');

// connect to MongoDB database
const mongoose = require('mongoose');
const { error } = require('console');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(dbURL);
client.connect();

// attempt the connection to the database
mongoose.connect(dbURL).then(() => {
    console.log('Connected to MongoDB database');
}).catch((err) => {
    console.log('Unable to connect to MongoDB');
    console.log(err);
});

const database = mongoose.connection;
database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Opening the DB -> successful connection to DB'));

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// importing routes here soon (Endpoints)
// [TODO] - will add documentation here soon
const user_signup = require('./backend/routes/volunteers/userStudentSignUp');
app.use('/api/userSignUp', user_signup);

const organization_signup = require('./backend/routes/organizations/organizationSignUp');
app.use('/api/organizationSignUp', organization_signup);

// login supports both organization and user lookup
const login = require('./backend/routes/volunteers/Login'); 
app.use('/api/Login', login);

const userStudentsDelete = require('./backend/routes/volunteers/userStudentsDelete');
app.use('/api/userDelete', userStudentsDelete);

const organizationDelete = require('./backend/routes/organizations/organizationDelete');
app.use('/api/organizationDelete', organizationDelete);

const searchUser = require('./backend/routes/volunteers/searchUser');
app.use('/api/userSearch', searchUser);

const searchOrganization = require('./backend/routes/organizations/searchOrganization');
app.use('/api/organizationSearch', searchOrganization);

const editUserProfile = require('./backend/routes/volunteers/editUserProfile');
app.use('/api/editUserProfile', editUserProfile);

const loadAllOrganizations = require('./backend/routes/organizations/loadAllOrganizations');
app.use('/api/loadAllOrganizations', loadAllOrganizations);

const addEvent = require('./backend/routes/events/addEvent');
app.use('/api/addEvent', addEvent);

const searchAllEventsOfAnOrg = require('./backend/routes/events/searchEventsForOrg');
app.use('/api/searchEvent', searchAllEventsOfAnOrg);

const deleteAllEvents = require('./backend/routes/events/deleteAllEvents');
app.use('/api/deleteAllEvents', deleteAllEvents);

const deleteSingleEvent = require('./backend/routes/events/deleteSingleEvent');
app.use('/api/deleteSingleEvent', deleteSingleEvent);

const editEvent = require('./backend/routes/events/editEvent');
app.use('/api/editEvent', editEvent);

const editOrganizationProfile = require('./backend/routes/organizations/editOrganizationProfile');
app.use('/api/editOrganizationProfile', editOrganizationProfile);

const loadAllStudentsInOrganization = require('./backend/routes/organizations/allStudentsInOrganization');
app.use('/api/loadAllStudentsInORG', loadAllStudentsInOrganization);

const searchOneEvent = require('./backend/routes/events/searchOneEvent');
app.use('/api/searchOneEvent', searchOneEvent);

const deleteSingleOrganizationAnnouncement = require('./backend/routes/announcements/deleteSingleOrgAnnouncement');
app.use('/api/deleteSingleOrgAnnouncement', deleteSingleOrganizationAnnouncement);

const searchForAnnouncement = require('./backend/routes/announcements/searchForAnnouncement');
app.use('/api/searchForAnnouncement', searchForAnnouncement);

const deleteAllOrganizationAnnouncements = require('./backend/routes/announcements/deleteAllOrganizationAnnouncements');
app.use('/api/deleteAllOrgAnnouncements', deleteAllOrganizationAnnouncements);

const editOrganizationAnnouncement = require('./backend/routes/announcements/editAnAnnouncement');
app.use('/api/editOrgAnnouncement', editOrganizationAnnouncement);

const createOrganizationAnnouncement = require('./backend/routes/announcements/createAnnouncement');
app.use('/api/createOrgAnnouncement', createOrganizationAnnouncement);

const loadAllOrganizationAnnouncements = require('./backend/routes/announcements/loadAllOrgAnnouncements');
app.use('/api/loadAllOrgAnnouncements', loadAllOrganizationAnnouncements);

const loadAllEventsAcrossOrgs = require('./backend/routes/events/loadAllEventsAcrossOrgs');
app.use('/api/loadAllEventsAcrossOrgs', loadAllEventsAcrossOrgs);

const RSVPForEvent = require('./backend/routes/events/RSVPForEvent');
app.use('/api/RSVPForEvent', RSVPForEvent);

const cancelRSVPForEvent = require('./backend/routes/events/cancelRSVPForEvent');
app.use('/api/cancelRSVP', cancelRSVPForEvent);

const addFavoriteOrgForUser = require('./backend/routes/volunteers/addFavoriteOrg');
app.use('/api/addFavoriteOrg', addFavoriteOrgForUser);

const removeFavoriteOrgForUser = require('./backend/routes/volunteers/removeFavoriteOrg');
app.use('/api/removeFavoriteOrg', removeFavoriteOrgForUser);

const searchForOrgInUserFavorites = require('./backend/routes/volunteers/searchForOrgInUserFavorites');
app.use('/api/searchForOrgInUserFavorites', searchForOrgInUserFavorites);

const loadFavOrgEventsForUser = require('./backend/routes/volunteers/loadFavoritedOrgsEvents');
app.use('/api/loadFavoritedOrgsEvents', loadFavOrgEventsForUser);

const editVolunteerHourGoal = require('./backend/routes/volunteers/editUserVolunteerHourGoal');
app.use('/api/editUserVolunteerHourGoal', editVolunteerHourGoal);

const editStudentMemberTotalHours = require('./backend/routes/organizations/editStudentMemberTotalHours');
app.use('/api/editMemberTotalHours', editStudentMemberTotalHours);

const loadAllEventAttendees = require('./backend/routes/events/loadAllAttendeesOfAnEvent');
app.use('/api/loadAllEventAttendees', loadAllEventAttendees);

// call this api to return all the interest/categorization tags
const getAllAvailableTags = require('./backend/routes/tags_&_recommendations/getAllAvailableTags');
app.use('/api/getAllAvailableTags', getAllAvailableTags);

const returnSingleOrgTags = require('./backend/routes/tags_&_recommendations/returnAnOrgTags');
app.use('/api/returnSingleOrgTags', returnSingleOrgTags);

const getSingleUserInterestTags = require('./backend/routes/tags_&_recommendations/getSingleUserInterestTags');
app.use('/api/getSingleUserInterestTags', getSingleUserInterestTags);

const getSuggestedEvents = require('./backend/routes/tags_&_recommendations/getSuggestedEvents');
app.use('/api/getSuggestedEvents_ForUser', getSuggestedEvents);

const getSuggestedOrganizations = require('./backend/routes/tags_&_recommendations/getSuggestedOrganizations');
app.use('/api/getSuggestedOrganizations_ForUser', getSuggestedOrganizations);

// return all the events that the user has RSVPed for
const searchEventsRSVPedFor_ByUser = require('./backend/routes/events/searchEventsRSVPedFor_ByUser');
app.use('/api/searchUserRSVPedEvents', searchEventsRSVPedFor_ByUser);

// email Communications Endpoints
/* Check if the user student has verified their email or not {returns either true or false} */
const checkIfEmailWasVerified_Volunteer = require('./backend/routes/emailCommunications/checkIfEmailWasVerified_Volunteer');
app.use('/api/checkIfEmailWasVerified_Volunteer', checkIfEmailWasVerified_Volunteer);
/*Check if the user organization verified their email or not {returns either true or false} */
const checkIfEmailWasVerified_Organization = require('./backend/routes/emailCommunications/checkIfEmailWasVerified_Organization');
app.use('/api/checkIfEmailWasVerified_Organization', checkIfEmailWasVerified_Organization);
/* Check the entered token by the user if it matches the one we generated and sent to them through email {returns either true or false} */
const validateEmailTokenInput_student = require('./backend/routes/emailCommunications/validateEmailTokenInput_student');
app.use('/api/validateEmailTokenInput_student', validateEmailTokenInput_student);
/* Check if the organization has verified their email or not {returns either true or false} */
const validateEmailTokenInput_organization= require('./backend/routes/emailCommunications/validateEmailTokenInput_org');
app.use('/api/validateEmailTokenInput_organization', validateEmailTokenInput_organization);


// QR CODE endpoints
const generateQRCode_checkIn = require('./backend/routes/QRCode/createCheckIn_QRCode');
app.use('/api/generateQRCode_checkIn', generateQRCode_checkIn);

const checkIn_Afterscan = require('./backend/routes/QRCode/checkIn_Afterscan');
app.use('/api/checkIn_Afterscan', checkIn_Afterscan);

/*
  if we plan to have specific settings for the configuration in production, we will need to add that here.
  can be omitted for now
*/
if (process.env.NODE_ENV === 'production') {
    // [NOTE]: Please change this as is needed later
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});