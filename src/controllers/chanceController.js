const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const streetDal = require('../dal/streetDal');
const locationDal = require('../dal/locationDal');
const cityDal = require('../dal/cityDal');
const HmContext = require('../contexts/hmContext/hmContext');

const getDriver = async function(req) {
    let driver = await driverDal.driverGet(req.body.Driver);
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(req.body.Driver);
    }
    return driver;
}

const streetFound = (waMessage, streetNames) => {
    let result = false;    
    streetNames.map(streetName => {
        if(waMessage.indexOf(streetName) > -1) {
            result = true;
        }
    });
    return result;
}

const getStreet = async function(req) {
    const addressText = req.body.Address.Text;
    const cityStreets = await streetDal.streetGetAll(req.body.Address);
    let street = {};

    cityStreets.map(cityStreet => {
        const streets = cityStreet.OtherNames ? `${cityStreet.LocalName},${cityStreet.OtherNames}`.split(',') : [cityStreet.LocalName];
        streetFound(addressText, streets) && (street = cityStreet);
    });
    return street;
}

const getAddress = async function(req) {
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        req.body.Address.CreatedBy = req.body.Driver.DriverId;
        address = await addressDal.addressInsert(req.body.Address);
    }
    return address;
}

// https://scotch.io/tutorials/nodejs-tests-mocking-http-requests
const getLocation = async function(req) {
    let location = await locationDal.locationGet(req.body.Address);
    if (!location.LocationId) {
        // retrieve city
        const city = await cityDal.cityGet(req.body.Address);
        req.body.Address.CityName = city.LocalName;

        const hmContext = new HmContext();
        const displayPosition = await hmContext.getLocation(`${req.body.Street.LocalName} ${req.body.Street.Building} ${req.body.Street.CityName}`);

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
    const street = await getStreet(req);       // check whenever the street is exists in the City:
    if (!street.StreetId) {
        // todo: log req.body.Address.Text
        console.error(`Error: The street not found in the message "${req.body.Address.Text}".`);
        res.statusCode = 400;
        return {};
    }
    
    // get/insert the address
    req.body.Address.StreetId = street.StreetId;
    req.body.Address.Building = parseInt(req.body.Address.Text.match(/\d+/)[0]);
    req.body.Driver.DriverId = driver.DriverId;
    const address = await getAddress(req);

    // get/insert the location
    // https://scotch.io/tutorials/nodejs-tests-mocking-http-requests
    req.body.Address.AddressId = address.AddressId;
    req.body.Street = {"LocalName": street.LocalName};
    req.body.Location = await getLocation(req);
    
    // insert chance
    const chance = await chanceDal.chanceInsert(req);
    if(chance.ChanceId) {
        driverDal.updateReports(driver);    // increment driver reports reputation
        console.info(`Info: New chance #${chance.ChanceId} at street ${street.LocalName} posted by ${req.body.Driver.MobileNum}`);
        res.statusCode = 200;
    } else {
        console.error(`Error: There was an error recording chance`);
        res.statusCode = 400;
    }
    return chance;
}

const chanceGet = async function(req, res) {
    const chanceList = await chanceDal.chanceGet(req);

    res.statusCode = 200;
    return chanceList;
}

module.exports = { chanceInsert, chanceGet }