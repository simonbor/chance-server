'use strict';
const DbContext = require('./dal-context/dbContext');
const {Driver} = require('./../models/driver');
const { GetDriverReq, InsertDriverReq } = require('../models/driver');

const driverGet = async function(driver) {
    const dbContext = new DbContext();

    const driverReq = new GetDriverReq(driver);
    let driverData = await dbContext.execute('main.sp_GetDriver', driverReq);
    // driverData = driverData[0]['row_to_json'];
    const res = new Driver(driverData);

    return res;
}

const driverInsert = async function(driver) {
    const dbContext = new DbContext();

    const driverReq = new InsertDriverReq(driver);
    let driverData = await dbContext.execute('main.sp_InsertDriver', driverReq);
    // driverData = driverData[0]['row_to_json'];
    const res = new Driver(driverData);

    return res;
}

module.exports = {driverGet, driverInsert}