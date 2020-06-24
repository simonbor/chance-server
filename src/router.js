const url = require('url');
const {parse} = require('querystring');
const addressController = require('./controllers/addressController')

function collectRequestDataAsync(request) {
    return new Promise(resolve => {
        const FORM_URLENCODED = 'application/x-www-form-urlencoded';
        if(request.headers['content-type'] === FORM_URLENCODED) {
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                resolve(parse(body));
            });
        }
        else {
            resolve(null);
        }
    });
}

const route = async function(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST') {
        req.body = await collectRequestDataAsync(req);
    }

    if (reqUrl.pathname == '/address' && req.method === 'GET') {
        res.end(JSON.stringify(await addressController.addressGet(req, res)));

    } else if (reqUrl.pathname == '/address' && req.method === 'POST') {
        const address = await addressController.addressUpdate(req, res);
        res.end(JSON.stringify(address));

    } else {
        res.statusCode = 404;
        res.end('NotFound');
    }
}

module.exports = {route}