const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const Chance = require('../models/chance');

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
    const reqChance = new Chance(address.AddressId, driver.DriverId, req.body.Chance.DateStart, driver.DriverId);
    const resChance = await chanceDal.chanceInsert(reqChance);

    res.statusCode = (200);
    return resChance;
}

module.exports = {chanceInsert}