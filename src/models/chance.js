'use strict';

module.exports = class Chance{
	constructor(addressId, driverOut, dateStart, createdBy) {
        this.addressId = { 'type': 'Int', 'value': addressId };
        this.driverOut = { 'type': 'Int', 'value': driverOut };
        this.dateStart = { 'type': 'DateTime', 'value': dateStart };
        this.createdBy = { 'type': 'Int', 'value': createdBy };
    }
}
