'use strict'
const crypto = require('crypto');

const algorithm = 'aes-128-cbc';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
const cryptoKey = process.env.CRYPTO_KEY || 'b2df428b9929d3ace7c598bbf4e496b2';
const key = Buffer.from(cryptoKey, outputEncoding);
const iv = Buffer.from(crypto.randomBytes(16));

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding);
    return encrypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);
    return decrypted;
}

module.exports = {encrypt, decrypt};