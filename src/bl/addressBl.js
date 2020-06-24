const addressDal = require('../dal/addressDal');

const addressGet = async (req, res) => {
    return await addressDal.addressGet(req, res);
};

const addressUpdate = async (req, res) => {
    return await addressDal.addressUpdate(req, res);
};

module.exports = {addressGet, addressUpdate}