const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const streetDal = require('../dal/streetDal');
const { InsertChanceReq } = require('../models/chance');

const streetFound = (waMessage, streetNames) => {
    let result = false;
    
    streetNames.map(streetName => {
        if(waMessage.indexOf(streetName) > -1) {
            result = true;
        }
    })

    return result;
}

const getStreetLocalName = (waMessage, streetsList) => {
    let streetLocalName;

    streetsList.map(street => {
        const streets = street.OtherNames ? `${street.LocalName},${street.OtherNames}`.split(',') : [street.LocalName];
        if(streetFound(waMessage, streets)) {
            streetLocalName = street.LocalName;
        }
    })

    return streetLocalName;
}

const chanceInsert = async (req, res) => {
    
    // get driver
    let driver = await driverDal.driverGet(req.body.Driver) || {};
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(req.body.Driver);
    }

    // check whenever the street is exists in the City:
    //      if "yes" replace with it the req.body.Address.StreetName
    //      if "no" log the message and response http status 400
    const waMessage = req.body.Address.StreetName;
    const cityStreets = await streetDal.streetGetAll(req.body.Address);
    const streetLocalName = getStreetLocalName(waMessage, cityStreets)
    if(streetLocalName) {
        req.body.Address.StreetName = streetLocalName;
    } else {
        // todo: log waMessage
        console.log(`Error: The street name isn't found in the message "${waMessage}".`);
        res.statusCode = 400;
        return {};
    }
    
    // get address
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        req.body.Address.CreatedBy = driver.DriverId;
        address = await addressDal.addressInsert(req.body.Address);
    }
    
    // insert chance
    const chanceReq = new InsertChanceReq (address.AddressId, driver.DriverId, req.body.Chance.DateStart, null, driver.DriverId);
    const chanceRes = await chanceDal.chanceInsert(chanceReq);

    // increment driver reports reputation
    driverDal.updateReports(driver);

    res.statusCode = 200;
    return chanceRes;
}

module.exports = { chanceInsert }