'use strict'
const https = require('https');

function get(url) {
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

module.exports = { get }