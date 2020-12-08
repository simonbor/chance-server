const url = require('url');
const addressController = require('./controllers/addressController');
const chanceController = require('./controllers/chance.controller');
const loginController = require('./controllers/loginController');
const { authenticate } = require('./auth');
const { HttpStatusCode } = require('./enums');

const route = async function(req, res) {
    const reqUrl = url.parse(req.url, true);

    // authenticate request
    if (reqUrl.pathname == '/chance-list') {
        const chanceRes = await authenticate(req, res)
        if(chanceRes.statusCode !== HttpStatusCode.SUCCESS) {
            res.statusCode = chanceRes.statusCode;
            return chanceRes;
        }
    }

    if (reqUrl.pathname == '/address-get' && req.method === 'POST') {
        return await addressController.addressGet(req, res);

    } else if (reqUrl.pathname == '/address' && req.method === 'POST') {
        return await addressController.addressInsert(req, res);

    } else if (reqUrl.pathname == '/chance' && req.method === 'POST') {
        return await chanceController.chanceInsert(req, res);

    } else if (reqUrl.pathname == '/chance-list' && req.method === 'POST') {
        return await chanceController.chancesListGet(req, res);

    } else if (reqUrl.pathname == '/chance-now-count' && req.method === 'POST') {
        return await chanceController.chancesNowCountGet(req, res);

    } else if (reqUrl.pathname == '/chance-today-count' && req.method === 'POST') {
        return await chanceController.chancesTodayCountGet(req, res);

    } else if (reqUrl.pathname == '/login' && req.method === 'POST') {
        return await loginController.driverGet(req, res);

    } else {
        res.statusCode = HttpStatusCode.NOT_FOUND;
        return '{}';
    }
}

module.exports = { route }