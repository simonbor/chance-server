'use strict';
const DbContext = require('../contexts/data/db-context');
const { Chance, InsertChanceReq, GetChanceByCityReq } = require('../models/chance');

const chanceInsert = async function(req) {
    const dbContext = new DbContext();

    const chanceReq = new InsertChanceReq (
        req.body.Driver.DriverId,
        req.body.Chance.WaGroupId,
        req.body.Location.Latitude,
        req.body.Location.Longitude,
        req.body.Location.LocationId,
        req.body.Chance.DateStart,
        req.body.Address.AddressId,
        req.body.Chance.Size,
        req.body.Driver.DriverId);
    let chanceData = await dbContext.execute('main."sp_InsertChance"', chanceReq);
    const chance = new Chance((chanceData[0])[0] || chanceData[0]);

    return chance;
}

const chanceGet = async function(req) {
    const dbContext = new DbContext();
    const dateStart = req.body.Chance ? req.body.Chance.DateStart : {};

    const chanceReq = new GetChanceByCityReq (req.body.Address.CityId, dateStart);
    let chanceData = await dbContext.execute('main."sp_GetChanceByCity"', chanceReq);

    return chanceData[0];
}

module.exports = { chanceInsert, chanceGet }