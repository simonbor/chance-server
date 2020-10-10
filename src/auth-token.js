const cipher = require('./cipher');
const { Http401Error } = require('./errors');

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
        throw new Http401Error('Token Expired')
    }

    delete payload.ExpiresIn;
    return payload;
}

module.exports = { sign, verify }