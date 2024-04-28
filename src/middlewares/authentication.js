const jwt = require('jsonwebtoken');
require('dotenv').config();

/* ================== Middleware ================== */

/**
 * Middleware: verify the identity of the user and add user_id to `req` parameter if the user is valid.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.authentication = (req, res, next) => {
    let token;
    try {
        token = req.headers['authorization'].split(' ')[1];
    } catch (error) {
        console.error("error getting token from headers", error);
        token = '';
    }

    jwt.verify(token, env['JWT_SECRET'], (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'authorization fail' });
        } else {
            req.user_id = decoded.id;
            next();
        }
    });
};

exports.authorizeCreator = (req, res, next) => {
    try {
        const user_id = req.user_id;
        const activity_id = req.params.activity_id;

    } catch (error) {
    }
};