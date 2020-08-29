class Location {
    constructor({LocationId, Latitude, Longitude, Altitude, AddressId, DefLocation, Desc, CreatedBy}) {
        this.LocationId =             LocationId,
        this.Latitude =               Latitude,
        this.Longitude =              Longitude,
        this.Altitude =               Altitude,
        this.AddressId =              AddressId,
        this.DefLocation =            DefLocation,
        this.Desc =                   Desc,
        this.CreatedBy =              CreatedBy
    }
}

class GetLocationByAddressReq {
    constructor({AddressId}) {
        this.AddressId = { 'typeName': 'Int', 'value': AddressId }
    }
}

class InsertLocationReq {
    constructor({Latitude, Longitude, Altitude, AddressId, DefLocation, Desc, CreatedBy}) {
        this.Latitude = { 'typeName': 'Float', 'value': Latitude },
        this.Longitude = { 'typeName': 'Float', 'value': Longitude },
        this.Altitude = { 'typeName': 'Float', 'value': Altitude },
        this.AddressId = { 'typeName': 'Int', 'value': AddressId },
        this.DefLocation = { 'typeName': 'Bit', 'value': DefLocation },
        this.Desc = { 'typeName': 'NVarChar', 'typeLength': 500, 'value': Desc },
        this.CreatedBy = { 'typeName': 'Int', 'value': CreatedBy }
    }
}

module.exports = { Location, GetLocationByAddressReq, InsertLocationReq }