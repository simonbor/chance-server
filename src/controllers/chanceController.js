const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const { InsertChanceReq } = require('../models/chance');

const chanceInsert = async (req, res) => {
    
    // get driver
    let driver = await driverDal.driverGet(req.body.Driver) || {};
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(req.body.Driver);
    }
    
    // get address
    req.body.Address.CreatedBy = driver.DriverId;
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        address = await addressDal.addressInsert(req.body.Address);
    }
    
    // insert chance
    const chanceReq = new InsertChanceReq (address.AddressId, driver.DriverId, req.body.Chance.DateStart, null, driver.DriverId);
    const chanceRes = await chanceDal.chanceInsert(chanceReq);

    res.statusCode = (200);
    return chanceRes;
}

module.exports = {chanceInsert}