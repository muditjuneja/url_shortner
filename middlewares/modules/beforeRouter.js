const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
module.exports = function (app) {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    // Adding custom response handlers.
    app.use(function (req, res, next) {
        console.log(req.sessionID);
        let responses = ['ok', 'badRequest', 'created', 'forbidden', 'notFound', 'serverError', 'negotiate', 'invalidRequest'];
        for (let response of responses) {
            res[response] = require('./responses/' + response);
        }
        next();
    });
}