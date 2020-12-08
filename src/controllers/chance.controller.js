'use strict';
const driverDal = require('../dal/driverDal');
const addressDal = require('../dal/addressDal');
const chanceDal = require('../dal/chanceDal');
const ChanceResponse = require('../models/response');
const { HttpStatusCode } = require('../enums');
const streetsService = require('../services/streets.service');
const leavingService = require('../services/leaving.service');
const locationService = require('../services/location.service');

const getDriver = async function(req) {
    let driver = await driverDal.driverGet(req.body.Driver);
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(req.body.Driver);
    }
    return driver;
}

const getAddress = async function(req) {
    let address = await addressDal.addressGet(req.body.Address);
    if(!address.AddressId){
        req.body.Address.CreatedBy = req.body.Driver.DriverId;
        address = await addressDal.addressInsert(req.body.Address);
    }
    return address;
}

const chanceInsert = async (req, res) => {
    // get/insert new driver
    const driver = await getDriver(req);
    let operStatusCode, operStatusText;

    // get/insert the street
    const street = await streetsService.getStreet(req);       // check whenever the street is exists in the City:
    if (!street.StreetId) {
        // todo: log req.body.Address.Text
        process.env.NODE_ENV && process.env.NODE_ENV != 'test' &&
        console.error(`Error: The street not found in the message "${req.body.Address.Text}".`);
        operStatusText = `Error: The street not found in the message "${req.body.Address.Text}".`;
        operStatusCode = HttpStatusCode.BAD_REQUEST;
        res.statusCode = HttpStatusCode.SUCCESS;
        return new ChanceResponse(operStatusCode, operStatusText, []);
    }
    
    // get/insert the address
    req.body.Address.StreetId = street.StreetId;
    // todo: firstly try get a number that follows the street name
    req.body.Address.Building = parseInt(req.body.Address.Text.match(/\d+/)[0]);
    req.body.Driver.DriverId = driver.DriverId;
    const address = await getAddress(req);

    // get/insert the location
    req.body.Address.AddressId = address.AddressId;
    req.body.Street = {"LocalName": street.LocalName};
    req.body.Location = await locationService.getLocation(req);

    // calculate the DateStart based on the text message
    req.body.Chance.DateStart = leavingService.calculateDateStart(req);

    // insert chance
    let chance;
    try {
        chance = await chanceDal.chanceInsert(req);
        driverDal.updateReports(driver);    // increment driver reports reputation
        operStatusText = `Info: New chance #${chance.ChanceId} at street ${street.LocalName} posted by ${req.body.Driver.MobileNum}`;
        process.env.NODE_ENV && process.env.NODE_ENV != 'test' &&
        console.info(operStatusText);
        operStatusCode = HttpStatusCode.SUCCESS;
    } catch(e) {
        console.error(e.description);
        operStatusText = e.description;
        operStatusCode = HttpStatusCode.BAD_REQUEST;
    }

    res.statusCode = HttpStatusCode.SUCCESS;
    return new ChanceResponse(operStatusCode, operStatusText, chance);
}

const chanceGet = async function(req, res) {
    const chanceList = await chanceDal.chanceGet(req);

    res.statusCode = HttpStatusCode.SUCCESS;
    return new ChanceResponse(HttpStatusCode.SUCCESS, 'Success', chanceList);
}

const chancesNowCountGet = async function(req, res) {
    req.body.Chance.DateStart = (new Date()).toLocaleString("en-US");
    const chanceList = await chanceDal.chanceGet(req);

    res.statusCode = HttpStatusCode.SUCCESS;
    return new ChanceResponse(HttpStatusCode.SUCCESS, 'Success', [{count: chanceList.length}]);
}

const chancesTodayCountGet = async function(req, res) {
    const today = new Date(new Date().setHours(0,0,0,0)); // set time from today 00:00
    req.body.Chance.DateStart = today.toLocaleString("en-US");    
    const chanceList = await chanceDal.chanceGet(req);

    res.statusCode = HttpStatusCode.SUCCESS;
    return new ChanceResponse(HttpStatusCode.SUCCESS, 'Success', [{count: chanceList.length}]);
}

module.exports = { chanceInsert, chanceGet, chancesNowCountGet, chancesTodayCountGet }