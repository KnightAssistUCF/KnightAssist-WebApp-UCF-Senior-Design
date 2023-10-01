require('dotenv').config();

const port = process.env.PORT || 5000;
const dbURL = process.env.atlasDB_LINK;


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
const signup = require('./routes/userStudentSignUp');
app.use('/api/userStudentSignUp', signup);

const login = require('./routes/userStudentLogin');
app.use('/api/userStudentLogin', login);

const userStudentsDelete = require('./routes/userStudentsDelete');
app.use('/api/userStudentDelete', userStudentsDelete);


/*
  @yohan: if we plan to have specific settings for the configuration in production, we will need to add that here.
          can be omitted for now
*/
if (process.env.STATUS === 'production') {
    // Serve any static files
    // app.use(express.static(path.join(__dirname, '../frontend/build')));
    // Handle React routing, return all requests to React app
    // app.get('*', function(req, res) {
    //     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    // });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
