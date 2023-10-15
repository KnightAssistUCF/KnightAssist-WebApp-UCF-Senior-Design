const jwt = require('jsonwebtoken'); 

let jwtSecret = process.env.JWT_SECRET_KEY;
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

const generateToken = (payload, jwtSecret) => {
    jwt.sign(payload, jwtSecret, { expiresIn: '1200s' }); 
}

const validateToken = (req, res, tokenHeaderKey) => {

    try {

        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecret); 

        if (!verified){ 
            return res.status(401).send(error); 

        }
    }

    catch (error) {
        
        return res.status(401).send(error); 
    }
} 

module.exports = { generateToken, validateToken };