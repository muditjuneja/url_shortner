const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = async function (req, res, next) {
    let token;
    if (req.headers && req.headers.authorization) {
        let parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            let scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return res.json(401, {
                message: 'Invalid token'
            });
        }
    } else if (req.param('token')) {
        token = req.param('token');
    } else {
        return res.json(401, {
            message: 'No Authorization header was found'
        });
    }

    try {

        let data = jwt.verify(token, req.app.get('jwt_key'));
        req.permissions = data.permissions;

        let alliances = [];
        data.alliances = alliances;

        req.payload = data;
        next();

    } catch (error) {
        return res.json(401, {
            message: 'Invalid token'
        });
    }
};