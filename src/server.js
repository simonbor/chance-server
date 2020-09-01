'use strict';

const http = require('http');
const DbContext = require('./dal/dal-context/dbContext');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json;charset=UTF-8'
};

const router = require('./router');
const server = http.createServer();
server.on('request', async (req, res) => {
    res.writeHead(res.statusCode, headers);
    const jsonString = await router.route(req, res);

    res.end(JSON.stringify(jsonString));
});

// init database (mssql, postgres)
DbContext.initContext();

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
