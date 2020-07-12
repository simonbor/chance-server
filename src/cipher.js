'use strict'
const crypto = require('crypto');

const algorithm = 'aes-128-cbc';
const cryptoKey = process.env.CRYPTO_KEY || 'b2df428b9929d3ace7c598bbf4e496b2';
const key = Buffer.from(cryptoKey, 'hex');
const iv = Buffer.from(crypto.randomBytes(16));

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = {encrypt, decrypt};