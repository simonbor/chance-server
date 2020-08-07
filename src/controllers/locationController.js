const locationDal = require('../dal/locationDal');
const addressDal = require('../dal/addressDal');

const insertLocation = async function(req, res) {

    // get AddressId
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        address = await addressDal.addressInsert(req.body.Address);
    }

    req.body.Location.AddressId = address.AddressId;
    const location = await locationDal.locationInsert(req.body.Location);

    res.statusCode = 200;
    return location;
}

module.exports = {insertLocation}
