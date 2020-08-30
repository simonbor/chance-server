'use strict';
const DbContext = require('./dal-context/dbContext');
const { InsertChanceReq } = require('../models/chance');

const chanceInsert = async function(req) {
    const dbContext = new DbContext();

    const chanceReq = new InsertChanceReq (
        req.body.Address.AddressId, 
        req.body.Driver.DriverId, 
        req.body.Chance.DateStart, 
        req.body.Location.LocationId, 
        req.body.Driver.DriverId);
    let chanceData = await dbContext.execute('main."sp_InsertChance"', chanceReq);

    return chanceData;
}

module.exports = {chanceInsert}