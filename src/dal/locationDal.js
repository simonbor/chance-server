'use strict';
const DbContext = require('./dal-context/dbContext');
const { Location, InsertLocationReq } = require('../models/location');

const locationGet = async function(location) {
    const pool = await connect.getPool();
    const request = await pool.request();   

    request.input('AddressId', mssql.Int, location.AddressId);

    let locationData = await request.execute('main.sp_GetLocationByAddress');
    return locationData.recordset[0];
}

const locationInsert = async function(locationReq) {  
    const dbContext = new DbContext();    

    const insertLocationReq = new InsertLocationReq(locationReq)
    const locationData = await dbContext.execute('main.sp_InsertLocation', insertLocationReq);
    const location = new Location(locationData);

    return location;
}

module.exports = {locationGet, locationInsert}