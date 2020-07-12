const mssql = require('mssql');
const connect = require('../connect');

const driverGet = async function(driver) {
    const pool = await connect.getPool();
    const request = await pool.request();   

    request.input('MobileNum', mssql.VarChar(20), driver.MobileNum);
    let driverData = await request.execute('main.sp_GetDriver');
    
    return driverData.recordset[0];
}

const driverInsert = async function(driver) {
    const pool = await connect.getPool();
    const request = await pool.request();   
    
    request.input('MobileNum', mssql.VarChar(20), driver.MobileNum);
    request.input('Name', mssql.NVarChar(100), driver.Name);
    request.input('CarName', mssql.NVarChar(50), driver.CarName);
    request.input('CarColor', mssql.NVarChar(50), driver.CarColor);
    driverData = await request.execute('main.sp_InsertDriver');

    return driverData.recordset[0];
}

module.exports = {driverGet, driverInsert}