'use strict'
const https = require('https');
const config = require('../../config');
const cipher = require('../../cipher');

module.exports = class HmClient {
    getLocation(searchText) {
        let url;

        const parsePosition = function(resolve, body) {
            try {
                const data = JSON.parse(body);
                resolve(data.items[0].position);
            }
            catch(err) {
                console.error(err);
            }
        };

        try {
            url = `${config.here_map.geo_url}?apiKey=${cipher.decrypt(config.here_map.api_key)}&q=${searchText}`;
        }
        catch(err) {
            console.error(err);
        }

        return new Promise(resolve => {
            https.get(url, res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                    body += data;
                });
                res.on("end", _ => {
                    parsePosition(resolve, body)
                });
                res.on("error", (err) => {
                    console.error(err);
                });
            });
        });
    }
}
