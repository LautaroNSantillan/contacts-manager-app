const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decoded);
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Unauthorized");
        }
    }else if(!token) {
        res.status(401);
            throw new Error("User is not authorized or token is missing");
    }
});


module.exports = validateToken;