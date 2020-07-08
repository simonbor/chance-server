const config = require('../config');
const mssql = require('mssql');

const locationGet = async function(location) {
    const pool = await mssql.connect(config.config);
    const request = await pool.request();   

    request.input('AddressId', mssql.Int, location.AddressId);

    let locationData = await request.execute('main.sp_GetLocationByAddress');
    return locationData.recordset[0];
}

const locationInsert = async function(location) {  
    const pool = await mssql.connect(config.config);
    const request = await pool.request();   

    request.input('Latitude', mssql.Float, location.Latitude);
    request.input('Longitude', mssql.Float, location.Longitude);
    request.input('Altitude', mssql.Float, location.Altitude);
    request.input('AddressId', mssql.Int, location.AddressId);
    request.input('Default', mssql.Bit, location.Default);
    request.input('Desc', mssql.NVarChar(1000), location.Desc);
    request.input('CreatedBy', mssql.Int, location.CreatedBy);

    const locationData = await request.execute('main.sp_InsertLocation');
    return locationData.recordset[0];
}

module.exports = {locationGet, locationInsert}