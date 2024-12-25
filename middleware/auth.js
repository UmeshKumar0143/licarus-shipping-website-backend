const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.secretOrKey);
        req.user = decoded;
        next(); 
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = auth;