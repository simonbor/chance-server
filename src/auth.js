'use strict'
const authController = require('../src/controllers/auth.controller');
const authToken = require('./auth-token');
const { Http401Error } = require('./errors');
const { HttpStatusCode } = require('./enums');
const ChanceResponse = require('../src/models/response');

// https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router#step-2-%E2%80%94-set-up-nodejs-server
// https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api#running-vue
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