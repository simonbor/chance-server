'use strict';
const DbContext = require('./dal-context/dbContext');
const { Address, GetAddressReq, InsertAddressReq } = require('../models/address');

const addressGet = async function(addressPayload) {
    const dbContext = new DbContext();

    const addressReq = new GetAddressReq(addressPayload)
    const addressRes = await dbContext.execute('main."sp_GetAddress"', addressReq);
    const address = new Address((addressRes[0])[0] || {});

    return address;
}

const addressInsert = async function(addressPayload) {  
    const dbContext = new DbContext();

    const addressReq = new InsertAddressReq(addressPayload);
    const addressRes = await dbContext.execute('main."sp_InsertAddress"', addressReq);
    const address = new Address((addressRes[0])[0]);

    return address;
}

module.exports = { addressGet, addressInsert }