const config = require('../config');
const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const streetDal = require('../dal/streetDal');
const locationDal = require('../dal/locationDal');
const cityDal = require('../dal/cityDal');
const { InsertChanceReq } = require('../models/chance');
const cipher = require('../cipher');
const utils = require('../utils');

const streetFound = (waMessage, streetNames) => {
    let result = false;    
    streetNames.map(streetName => {
        if(waMessage.indexOf(streetName) > -1) {
            result = true;
        }
    });
    return result;
}

const getDriver = async function(req) {
    let driver = await driverDal.driverGet(req.body.Driver) || {};
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(req.body.Driver);
    }
    return driver;
}

const getStreetName = async function(req) {
    const waMessage = req.body.Address.Text;
    const cityStreets = await streetDal.streetGetAll(req.body.Address);
    let streetLocalName;

    cityStreets.map(street => {
        const streets = street.OtherNames ? `${street.LocalName},${street.OtherNames}`.split(',') : [street.LocalName];
        if(streetFound(waMessage, streets)) {
            streetLocalName = street.LocalName;
        }
    });
    return streetLocalName;
}

const getAddress = async function(req) {
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        req.body.Address.CreatedBy = req.body.Driver.DriverId;
        address = await addressDal.addressInsert(req.body.Address);
    }
    return address;
}

const getLocation = async function(req) {
    let location = await locationDal.locationGet(req.body.Address);
    if (!location.LocationId) {
        // retrieve city
        const city = await cityDal.cityGet(req.body.Address);
        req.body.Address.CityName = city.LocalName;

        // retrieve location from here map service
        const url = config.here_map.geo_url
            + '?apiKey=' + cipher.decrypt(config.here_map.api_key)
            + '&searchtext=' + req.body.Address.StreetName
            + ' ' + req.body.Address.Building
            + ' ' + req.body.Address.CityName;
        const geoData = await utils.get(url);
        const displayPosition = geoData.Response.View[0].Result[0].Location.DisplayPosition;

        // insert location
        req.body.Location = {
            "Longitude": displayPosition.Longitude,
            "Latitude": displayPosition.Latitude,
            "DefLocation": true,
            "AddressId": req.body.Address.AddressId,
            "CreatedBy": req.body.Driver.DriverId,
        }
        location = await locationDal.locationInsert(req.body.Location);
    }
    return location;
}

const chanceInsert = async (req, res) => {
    // get/insert new driver
    const driver = await getDriver(req);

    // get/insert the street
    const streetLocalName = await getStreetName(req);       // check whenever the street is exists in the City:
    if (streetLocalName) {
        req.body.Address.StreetName = streetLocalName;
    } else {
        // todo: log req.body.Address.Text
        console.log(`Error: The street name isn't found in the message "${req.body.Address.Text}".`);
        res.statusCode = 400;
        return {};
    }
    
    // get/insert the address
    req.body.Address.Building = req.body.Address.Text.match(/\d+/)[0];
    req.body.Driver.DriverId = driver.DriverId;
    const address = await getAddress(req);

    // get/insert the location
    req.body.Address.AddressId = address.AddressId;
    const location = await getLocation(req);
    
    // insert chance
    const chanceReq = new InsertChanceReq (address.AddressId, driver.DriverId, req.body.Chance.DateStart, 
        location.LocationId, driver.DriverId);
    const chanceRes = await chanceDal.chanceInsert(chanceReq);

    // increment driver reports reputation
    driverDal.updateReports(driver);

    res.statusCode = 200;
    return chanceRes;
}

module.exports = { chanceInsert }