'use strict';

const http = require('http');

const host = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    const router = require('./router');
    router.route(req, res);
});

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});