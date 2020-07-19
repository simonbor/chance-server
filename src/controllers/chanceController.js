const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');

const chanceInsert = async (req, res) => {

    // get driver
    const driver = await driverDal.driverGet(req.body.Driver) || {};
    if(!driver.DriverId) {
        const {DriverId} = await driverDal.driverInsert(req.body.Driver);
        driver.DriverId = DriverId;
    }

    // get address
    const address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        const {addressId} = await addressDal.addressInsert(req.body.Address);
        address.AddressId = addressId;
    }
    
    // insert chance
    req.body.Chance.DriverOut = driver.DriverId;
    req.body.Chance.AddressId = address.AddressId;
    const chance = await chanceDal.chanceInsert(req.body.Chance);

    res.statusCode = (200);
    return chance;
}

module.exports = {chanceInsert}