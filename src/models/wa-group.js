'use strict';

class WaGroup {
	constructor({ WaGroupId, Name, Desc, Updated, UpdatedBy, Created, CreatedBy }) {
        this.WaGroupId =    WaGroupId;
        this.Name =         Name;
        this.Desc =         Desc;
        this.Updated =      Updated;
        this.UpdatedBy =    UpdatedBy;
        this.Created =      Created;
        this.CreatedBy =    CreatedBy;
    }
}

class GetWaGroupReq {
	constructor({ GroupName }) {
        this.Name = { 'typeName': 'VarChar', 'typeLength': 25, 'value': GroupName };
    }
}

class InsertWaGroupReq {
    constructor( groupName, createdBy, desc ) {
        this.Name =         { 'typeName': 'NVarChar', 'typeLength': 25, 'value': groupName };
        this.CreatedBy =    { 'typeName': 'Int', 'value': createdBy };
        this.Desc =         { 'typeName': 'NVarChar', 'typeLength': 500, 'value': desc };
    }
}

module.exports = { WaGroup, GetWaGroupReq, InsertWaGroupReq }