'use strict';
const DbContext = require('./dal-context/dbContext');
const { Location, InsertLocationReq } = require('../models/location');

const locationGet = async function(locationReq) {
    const dbContext = new DbContext();

    let location = await dbContext.execute('main."sp_GetLocationByAddress"', locationReq);
    return location;
}

const locationInsert = async function(locationReq) {  
    const dbContext = new DbContext();    

    const insertLocationReq = new InsertLocationReq(locationReq)
    const locationData = await dbContext.execute('main."sp_InsertLocation"', insertLocationReq);
    const location = new Location((locationData[0])[0]);

    return location;
}

module.exports = { locationInsert }