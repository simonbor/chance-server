const url = require('url');
const addressController = require('./controllers/addressController');
const chanceController = require('./controllers/chanceController');
const loginController = require('./controllers/loginController');

const route = async function(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/address-get' && req.method === 'POST') {
        return await addressController.addressGet(req, res);

    } else if (reqUrl.pathname == '/address' && req.method === 'POST') {
        return await addressController.addressInsert(req, res);

    } else if (reqUrl.pathname == '/chance' && req.method === 'POST') {
        return await chanceController.chanceInsert(req, res);

    } else if (reqUrl.pathname == '/chance-list' && req.method === 'POST') {
        return await chanceController.chanceGet(req, res);

    } else if (reqUrl.pathname == '/login' && req.method === 'POST') {
        return await loginController.driverGet(req, res);

    } else {
        res.statusCode = 404;
        return '{}';
    }
}

module.exports = { route }