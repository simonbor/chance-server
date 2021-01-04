'use strict';
const http = require('http');
const DbContext = require('./contexts/data/db-context');
const HmContext = require('./contexts/maps/hmContext');
const { route } = require('./router');
const utils = require('./utils');
const errorHandler = require('./error-handler');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const server = http.createServer();
server.on('request', async (req, res) => {
    // cors block
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Content-Type', 'application/json;charset=UTF-8');
    // cors trick
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // prepare request json
    if (req.method === 'POST') {
        req.body = await utils.getRequestData(req);
    }

    // process request
    const jsonString = await route(req, res);
    res.end(JSON.stringify(jsonString));
});

// dependency injection
DbContext.initContext();    // init database (mssql, postgres)
HmContext.initContext();    // init Here Map context

// errors handling
process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
process.on('uncaughtException', (error, origin) => {
    // log the error
    errorHandler.handleError(error);

    // restart the process if the error isn't trusted
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
});

// start listening
server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
