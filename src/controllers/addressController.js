const addressBl = require('../bl/addressBl');

const addressGet = async (req, res) => {
    return await addressBl.addressGet(req, res);
}

const addressUpdate = async (req, res) => {
    return await addressBl.addressUpdate(req, res);
}

module.exports = {addressGet, addressUpdate}