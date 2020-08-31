'use strict';
const DbContext = require('./dal-context/dbContext');
const { Chance, InsertChanceReq } = require('../models/chance');

const chanceInsert = async function(req) {
    const dbContext = new DbContext();

    const chanceReq = new InsertChanceReq (
        req.body.Address.AddressId, 
        req.body.Driver.DriverId, 
        req.body.Chance.DateStart, 
        req.body.Location.LocationId, 
        req.body.Driver.DriverId);
    let chanceData = await dbContext.execute('main."sp_InsertChance"', chanceReq);
    const chance = new Chance((chanceData[0])[0] || chanceData[0]);

    return chance;
}

const chanceGet = async function(req) {
    const dbContext = new DbContext();

    const chanceReq = new GetChanceByCityReq (req.body.Address.CityId, req.body.Chance.DateStart);
    let chanceData = await dbContext.execute('main."sp_GetChanceByCity"', chanceReq);
    const chance = new Chance((chanceData[0])[0] || chanceData[0]);

    return chance;
}

module.exports = { chanceInsert, chanceGet }