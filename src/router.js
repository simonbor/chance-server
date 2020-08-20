const url = require('url');
const {parse} = require('querystring');
const addressController = require('./controllers/addressController');
const chanceController = require('./controllers/chanceController');
const loginController = require('./controllers/loginController');

function collectRequestDataAsync(request) {    
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    let body = '';

    return new Promise(resolve => {
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            if(request.headers['content-type'].toLowerCase() === FORM_URLENCODED) {
                resolve(parse(body));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

const route = async function(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST') {
        req.body = await collectRequestDataAsync(req);
    }

    if (reqUrl.pathname == '/address-get' && req.method === 'POST') {
        res.end(JSON.stringify(await addressController.addressGet(req, res)));

    } else if (reqUrl.pathname == '/address' && req.method === 'POST') {
        const address = await addressController.addressInsert(req, res);
        res.end(JSON.stringify(address));

    } else if (reqUrl.pathname == '/chance' && req.method === 'POST') {
        const chance = await chanceController.chanceInsert(req, res);
        res.end(JSON.stringify(chance));

    } else if (reqUrl.pathname == '/login' && req.method === 'POST') {
        const driver = await loginController.driverGet(req, res);
        res.end(JSON.stringify(driver));

    } else {
        res.statusCode = 404;
        res.end('NotFound');
    }
}

module.exports = {route}