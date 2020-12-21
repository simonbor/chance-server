'use strict';
const DbContext = require('../contexts/data/db-context');
const { WaGroup, GetWaGroupReq, InsertWaGroupReq } = require('./../models/wa-group');

const waGroupGet = async function(whatsApp) {
    const dbContext = new DbContext();

    const waGroupReq = new GetWaGroupReq(whatsApp);
    let waGroupData = await dbContext.execute('main."sp_GetWaGroup"', waGroupReq);
    const res = new WaGroup((waGroupData[0])[0] || {});

    return res;
}

const waGroupInsert = async function(req) {
    const dbContext = new DbContext();

    const waGroupReq = new InsertWaGroupReq(req.body.WhatsApp.GroupName, req.body.Driver.DriverId);
    let waGroupData = await dbContext.execute('main."sp_InsertWaGroup"', waGroupReq);
    const res = new WaGroup((waGroupData[0])[0]);

    return res;
}

module.exports = {waGroupGet, waGroupInsert}