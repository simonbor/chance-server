'use strict';

const http = require('http');
const DbContext = require('./dal/dal-context/dbContext');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    const router = require('./router');
    router.route(req, res);
});


// init database (mssql, postgres)
DbContext.initContext();

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
