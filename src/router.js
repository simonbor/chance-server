const url = require('url');
const {parse} = require('querystring');
const addressController = require('./controllers/addressController');
const chanceController = require('./controllers/chanceController');

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

    console.log([reqUrl.pathname, req.method]);

    if (req.method === 'POST') {
        req.body = await collectRequestDataAsync(req);
    }

    if (reqUrl.pathname == '/address' && req.method === 'GET') {
        res.end(JSON.stringify(await addressController.addressGet(req, res)));

    } else if (reqUrl.pathname == '/address' && req.method === 'POST') {
        const address = await addressController.addressInsert(req, res);
        res.end(JSON.stringify(address));

    } else if (reqUrl.pathname == '/chance' && req.method === 'POST') {
        const chance = await chanceController.chanceInsert(req, res);
        res.end(JSON.stringify(chance));

    } else {
        res.statusCode = 404;
        res.end('NotFound');
    }
}

module.exports = {route}