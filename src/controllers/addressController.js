const addressDal = require('../dal/addressDal');

const addressGet = async (req, res) => {
    const address = await addressDal.addressGet(req.body.Address);

    res.statusCode = 200;
    return address;
}

const addressInsert = async (req, res) => {
    const address = await addressDal.addressInsert(req.body.Address);

    res.statusCode = 200;
    return address;
}

module.exports = {addressGet, addressInsert}