const config = require('../config');
const mssql = require('mssql');

const chanceInsert = async function (chance) {
    const pool = await mssql.connect(config.config);
    let request = await pool.request();

    // insert chance
    request = await pool.request();   
    request.input('AddressId', mssql.Int, chance.AddressId);
    request.input('DateStart', mssql.DateTime, chance.DateStart);
    request.input('DriverOut', mssql.Int, chance.DriverOut);
    request.input('CreatedBy', mssql.Int, chance.DriverOut);
    let chanceData = await request.execute('main.sp_InsertChance');

    return chanceData.recordset[0];
}

module.exports = {chanceInsert}