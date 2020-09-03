'use strict';

const http = require('http');
const DbContext = require('./dal/dal-context/dbContext');
const HmContext = require('./contexts/hmContext/hmContext');

const host = '0.0.0.0';
const port = process.env.PORT || 8080;

const router = require('./router');
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
    
    const jsonString = await router.route(req, res);
    res.end(JSON.stringify(jsonString));
});

DbContext.initContext();    // init database (mssql, postgres)
HmContext.initContext();    // init Here Map context

server.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}/`);
});
