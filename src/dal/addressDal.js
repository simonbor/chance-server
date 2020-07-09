const config = require('../config');
const mssql = require('mssql');

const addressGet = async function(address) {
    const pool = await mssql.connect(config.config);
    const request = await pool.request();   

    request.input('StreetName', mssql.VarChar(50), address.StreetLocalName);
    request.input('CityId', mssql.Int, address.CityId);
    request.input('CountryId', mssql.Int, address.CountryId);
    request.input('Building', mssql.Int, address.Building);
    let addressData = await request.execute('main.sp_GetAddress');

    return (addressData.recordset && addressData.recordset[0]) || address;
}

const addressInsert = async function(address) {  
    const pool = await mssql.connect(config.config);
    const request = await pool.request();

    request.input('StreetName', mssql.VarChar(50), address.StreetLocalName);
    request.input('CityId', mssql.Int, address.CityId);
    request.input('CountryId', mssql.Int, address.CountryId);
    request.input('Building', mssql.Int, address.Building);
    request.input('CreatedBy', mssql.Int, address.CreatedBy);
    addressData = await request.execute('main.sp_InsertAddress');
    
    return addressData.recordsets[0];
}

module.exports = {addressGet, addressInsert}