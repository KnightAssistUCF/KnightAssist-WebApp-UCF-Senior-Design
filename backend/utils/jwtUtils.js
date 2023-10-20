const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET_KEY;
const tokenHeaderKey = process.env.TOKEN_HEADER_KEY || 'Authorization'; // yohan: added the authorization string as default for now

const generateToken = (payload, jwtSecret) => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1800s' }); // yohan: I increased the time out
};

const authenticateToken = (req, res, next) => { // yohan: added next, to be used to move to the next route in the middleware 
    const token = req.headers.authorization; // [Melanie] if this doesn't work use: req.headers.authorization;
    console.log(req.headers.authorization)

    if (!token) {
        return res.status(401).send("Access Denied (1st stage) - No token provided");
    }
    
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).send("Access Denied (2nd stage) - Invalid token"); // stop moving on, so I addded a return 
        }
        req.user = user; // store the current user
        next(); // move to the next middleware route
    });
};

module.exports = { generateToken, authenticateToken };
