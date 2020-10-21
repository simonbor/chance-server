'use strict'
const authController = require('../src/controllers/auth.controller');
const authToken = require('./auth-token');
const { Http401Error } = require('./errors');
const { HttpStatusCode } = require('./enums');
const ChanceResponse = require('../src/models/response');

const authenticate = async function(req, res) {
    try{
        // check for auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            throw new Http401Error('Error: missing authorization header');
        }

        // verify and get auth credentials
        const token =  req.headers.authorization.split(' ')[1];
        req.body.User = authToken.verify(token);

        //  authenticate the user
        const result = await authController.authenticate(req, res);

        if (!result) {
            throw new Http401Error('Error: invalid authentication credentials');
        }
    } catch(err) {
        return new ChanceResponse(HttpStatusCode.UNAUTHORIZED, err.description, [])
    }

    return new ChanceResponse(HttpStatusCode.SUCCESS, '', [])
}

module.exports = { authenticate }