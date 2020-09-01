'use strict';

class Chance {
    constructor({ChanceId, LocationId, AddressId, DriverOut, DriversIn, Latitude, Longitude, DateStart, Size, Created, CreatedBy}) {
        this.ChanceId =     ChanceId;
        this.LocationId =   LocationId;
        this.AddressId =    AddressId;
        this.Latitude =     Latitude,
        this.Longitude =    Longitude,
        this.DriverOut =    DriverOut;
        this.DriversIn =    DriversIn;
        this.DateStart =    DateStart;
        this.Size =         Size;
        this.CreatedBy =    CreatedBy;
        this.Created =      Created;
    }
}

class InsertChanceReq {
	constructor(addressId, DriverOut, dateStart, locationId, createdBy) {
        this.DriverOut =    { 'typeName': 'Int', 'value': DriverOut };
        this.DateStart =    { 'typeName': 'DateTime', 'value': dateStart };
        this.AddressId =    { 'typeName': 'Int', 'value': addressId };
        this.LocationId =   { 'typeName': 'Int', 'value': locationId };
        this.CreatedBy =    { 'typeName': 'Int', 'value': createdBy };
    }
}

class GetChanceByCityReq {
    constructor(CityId, DateStart) {
        this.CityId =       { 'typeName': 'Int', 'value': CityId };
        this.DateStart =    { 'typeName': 'DateTime', 'value': DateStart };
    }
}

module.exports = { Chance, InsertChanceReq }