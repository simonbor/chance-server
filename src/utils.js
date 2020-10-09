'use strict'
const https = require('https');

const getRequestData = function (request) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    let body = '';

    return new Promise(resolve => {
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            if(request.headers['content-type'].toLowerCase() === FORM_URLENCODED) {
                resolve(parse(body));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

function _get(url) {
    return new Promise(resolve => {
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                resolve(JSON.parse(body));
            });
            res.on("error", (err) => {
                console.error(err);
            });
        });
    });
}

module.exports = { getRequestData }