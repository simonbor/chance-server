'use strict';
const http = require('http');
const DbContext = require('./contexts/data/db-context');
const HmContext = require('./contexts/maps/hmContext');
const { authenticate } = require('./auth');
const { route } = require('./router');
const utils = require('./utils');
const errorHandler = require('./error-handler');
const { Http401Error } = require('./errors');
const { ChanceResponse } = require('../src/models/response');
const{ HttpStatusCode } = require('./enums');

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
    req.body = await utils.getRequestData(req);
/*
    try {
        await authenticate(req, res)
    } catch (err) {
        let chanceResponse = new ChanceResponse();
        if(err instanceof Http401Error) {
            chanceResponse.statusCode = HttpStatusCode.UNAUTHORIZED;
            chanceResponse.statusText = err.name;
        }
    }
*/
    const jsonString = await route(req, res);
    res.end(JSON.stringify(jsonString));
});

// dependency injection
DbContext.initContext();    // init database (mssql, postgres)
HmContext.initContext();    // init Here Map context

/*
// error handling
process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
process.on('uncaughtException', (error, origin) => {

    console.log('...error');

    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
      process.exit(1);
    }
});
*/

// start listening
server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
