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
	constructor(DriverOut, Latitude, Longitude, LocationId, DateStart, AddressId, Size, CreatedBy) {
        // prepare a boolean type for PostgreSQL
        const size = typeof Size !== 'undefined' ? Size.toString().toUpperCase() : Size;

        this.DriverOut =    { 'typeName': 'Int', 'value': DriverOut };
        this.Latitude =     { 'typeName': 'Float', 'value': Latitude },
        this.Longitude =    { 'typeName': 'Float', 'value': Longitude },
        this.LocationId =   { 'typeName': 'Int', 'value': LocationId };
        this.DateStart =    { 'typeName': 'DateTime', 'value': DateStart };
        this.AddressId =    { 'typeName': 'Int', 'value': AddressId };
        this.Size =         { 'typeName': 'Bit', 'value': size };
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