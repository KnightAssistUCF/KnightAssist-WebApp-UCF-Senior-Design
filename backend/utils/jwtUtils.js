const jwt = require('jsonwebtoken');
const UserStudent = require('../models/userStudent');
const Organization = require('../models/organization');

const jwtSecret = process.env.JWT_SECRET_KEY;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || 'Authorization'; // yohan: added the authorization string as default for now

// generate the token for both users and organizations
const generateToken = (payload, jwtSecret) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '10d' });  // expires in 10 days
};

// authenticate the user token
const authenticateToken_User = async (req, res, next) => { 
    let token
    try{if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]; 
        
        const decoded = jwt.verify(token, jwtSecret);

        req.user = await UserStudent.findOne({ email: decoded.email });// since we are technically using JWT for now with email I am using it here, can change later
        console.log("user authenticated -> " + req.user);
        next();
    }}catch(err){
        res.status(401).send("Unauthorized: " + err);
        console.log(err);
    }

    if (!token) {
        res.status(401).send("Unauthorized: No token provided");
    }
};

// authenticate the organization token
const authenticateToken_Organization = async (req, res, next) => { 
    let token
    try{if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1]; 
        
        const decoded = jwt.verify(token, jwtSecret);

        req.organization = await Organization.findOne({ email: decoded.email });// since we are technically using JWT for now with email I am using it here, can change later
        console.log("organization authenticated -> " + req.organization);
        next();
    }}catch(err){
        res.status(401).send("Unauthorized: " + err);
        console.log(err);
    }

    if (!token) {
        res.status(401).send("Unauthorized: No token provided");
    }
};

module.exports = { generateToken, authenticateToken_User, authenticateToken_Organization };
