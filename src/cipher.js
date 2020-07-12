'use strict'
const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
const cryptoKey = process.env.CRYPTO_KEY || 'secretPassword';

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, cryptoKey);
    let encrypted = cipher.update(text, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding);
    return encrypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, cryptoKey);
    let decrypted = decipher.update(text, outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);
    return decrypted;
}

module.exports = {encrypt, decrypt};