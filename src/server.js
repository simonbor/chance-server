'use strict';

const http = require('http');
const DbContext = require('./dal/dal-context/dbContext');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json;charset=UTF-8'
    };
    res.writeHead(res.statusCode, headers);

    const router = require('./router');
    router.route(req, res);
});


// init database (mssql, postgres)
DbContext.initContext();

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
