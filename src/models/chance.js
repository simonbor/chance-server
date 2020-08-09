'use strict';

class Chance {
	constructor(AddressId, DriverOut, DateStart, CreatedBy) {
        this.AddressId = AddressId;
        this.DriverOut = DriverOut;
        this.DateStart = DateStart;
        this.CreatedBy = CreatedBy;
    }
}

class InsertChanceReq {
	constructor(addressId, DriverOut, dateStart, locationId, createdBy) {
        this.DriverOut = { 'typeName': 'Int', 'value': DriverOut };
        this.DateStart = { 'typeName': 'DateTime', 'value': dateStart };
        this.AddressId = { 'typeName': 'Int', 'value': addressId };
        this.LocationId = { 'typeName': 'Int', 'value': locationId };
        this.CreatedBy = { 'typeName': 'Int', 'value': createdBy };
    }
}

module.exports = { Chance, InsertChanceReq }