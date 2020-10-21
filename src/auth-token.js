'use strict'
const cipher = require('./cipher');
const { Http401Error } = require('./errors');

// https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router#step-2-%E2%80%94-set-up-nodejs-server
// https://jasonwatmore.com/post/2018/09/24/nodejs-basic-authentication-tutorial-with-example-api#running-vue
const sign = function(payload, expiresIn) { // expiresIn - in seconds 
    const pl = JSON.parse(JSON.stringify(payload));
    pl.ExpiresIn = Math.floor((Date.now() / 1000) + expiresIn);
    const token = cipher.encrypt(JSON.stringify(pl));

    return token;
}

const verify = function(token) {
    const payload = JSON.parse(cipher.decrypt(token));
    const now = Math.floor(Date.now() / 1000);

    if(payload.ExpiresIn && now > payload.ExpiresIn) {
        process.env.NODE_ENV && process.env.NODE_ENV != 'test' &&
        console.error('Error: token expired');
        throw new Http401Error('Error: token expired');
    }

    delete payload.ExpiresIn;
    return payload;
}

module.exports = { sign, verify }