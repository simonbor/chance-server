const locationDal = require('../dal/locationDal');
const addressDal = require('../dal/addressDal');
const Location = require('../models/location');
const Address = require('../models/address');

const insertLocation = async function(req, res) {
    let location = Location.create(req.body.Location);
    let address = new Address(req.body.Address)

    // get AddressId
    address = await addressDal.addressGet(address);
    if(!address.AddressId){
        const addressDb = await addressDal.addressInsert(address);
        address.AddressId = addressDb.AddressId;
    }

    location.AddressId = address.AddressId;
    location = await locationDal.locationInsert(location);

    res.statusCode = 200;
    return location;
}

module.exports = {insertLocation}
