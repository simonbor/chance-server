const config = require('../config');
const mssql = require('mssql');

const insertChance = async function (req, res) {  
    const pool = await mssql.connect(config.config);
    let request = await pool.request();
   
    // get driver
    request.input('MobileNum', mssql.VarChar(20), req.body.Driver.MobileNum);
    let driverData = await request.execute('main.sp_GetDriver');
    
    if(driverData.recordset.length < 1) {
        request.input('Name', mssql.NVarChar(100), req.body.Driver.Name);
        driverData = await request.execute('main.sp_InsertDriver');
    }
    const driver = driverData.recordset[0];
    
    // get address
    request = await pool.request();   
    request.input('StreetName', mssql.VarChar(50), req.body.Address.Street.LocalName);
    request.input('CityId', mssql.Int, req.body.Address.City.CityId);
    request.input('CountryId', mssql.Int, req.body.Address.Country.CountryId);
    request.input('Building', mssql.Int, req.body.Address.Building);
    let addressData = await request.execute('main.sp_GetAddress');

    if(addressData.recordsets.length < 1) {
        request.input('CreatedBy', mssql.Int, driver.DriverId);
        addressData = await request.execute('main.sp_InsertAddress');
    }    
    const address = addressData.recordset[0];

    // insert chance
    request = await pool.request();   
    request.input('AddressId', mssql.Int, address.AddressId);
    request.input('DateStart', mssql.DateTime, req.body.Chance.DateStart);
    request.input('DriverOut', mssql.Int, driver.DriverId);
    request.input('CreatedBy', mssql.Int, driver.DriverId);
    let chanceData = await request.execute('main.sp_InsertChance');
    
    console.log(`${req.body.Chance.DateStart}`);
    console.log(`${JSON.stringify(addressData.recordset)}`);
    console.log(`${JSON.stringify(driverData.recordset)}`);
    console.log(`${JSON.stringify(chanceData.recordset)}`);
    
    res.statusCode = (200);
    return chanceData.recordset;
}

module.exports = {insertChance}