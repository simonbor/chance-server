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
	constructor(DriverOut, Latitude, Longitude, DateStart, LocationId, AddressId, CreatedBy) {
        this.DriverOut =    { 'typeName': 'Int', 'value': DriverOut };
        this.Latitude =     { 'typeName': 'Float', 'value': Latitude },
        this.Longitude =    { 'typeName': 'Float', 'value': Longitude },
        this.DateStart =    { 'typeName': 'DateTime', 'value': DateStart };
        this.AddressId =    { 'typeName': 'Int', 'value': AddressId };
        this.LocationId =   { 'typeName': 'Int', 'value': LocationId };
        this.CreatedBy =    { 'typeName': 'Int', 'value': CreatedBy };
    }
}

class GetChanceByCityReq {
    constructor(CityId, DateStart) {
        this.CityId =       { 'typeName': 'Int', 'value': CityId };
        this.DateStart =    { 'typeName': 'DateTime', 'value': DateStart };
    }
}

module.exports = { Chance, InsertChanceReq, GetChanceByCityReq }