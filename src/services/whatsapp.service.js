'use strict'
const waGroupDal = require('../dal/wa-group.dal');

const getWaGroup = async function(req) {
    // protection of the chance insertion flow
    // todo: delete the block after the client is ready for send the WhatsApp Group Name
    if(!req.body.WhatsApp){
        return null;
    }

    let waGroup = await waGroupDal.waGroupGet(req.body.WhatsApp);
    if(!waGroup.WaGroupId) {
        waGroup = await waGroupDal.waGroupInsert(req);
    }
    return waGroup.WaGroupId;
}

module.exports = { getWaGroup };