'use strict';

class Chance {
	constructor(addressId, driverOut, dateStart, createdBy) {
        this.AddressId = addressId;
        this.DriverOut = driverOut;
        this.DateStart = dateStart;
        this.CreatedBy = createdBy;
    }
}

class InsertChanceReq {
	constructor(addressId, driverOut, dateStart, locationId, createdBy) {
        this.DriverOut = { 'type': 'Int', 'value': driverOut };
        this.DateStart = { 'type': 'DateTime', 'value': dateStart };
        this.AddressId = { 'type': 'Int', 'value': addressId };
        this.LocationId = { 'type': 'Int', 'value': locationId };
        this.CreatedBy = { 'type': 'Int', 'value': createdBy };
    }
}

module.exports = { Chance, InsertChanceReq }