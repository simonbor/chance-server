class Location {
    constructor({LocationId, Latitude, Longitude, Altitude, AddressId, Default, Desc, CreatedBy}) {
        this.LocationId =             LocationId,
        this.Latitude =               Latitude,
        this.Longitude =              Longitude,
        this.Altitude =               Altitude,
        this.AddressId =              AddressId,
        this.Default =                Default,
        this.Desc =                   Desc,
        this.CreatedBy =              CreatedBy
    }
}

class InsertLocationReq {
    constructor({Latitude, Longitude, Altitude, AddressId, Default, Desc, CreatedBy}) {
        this.Latitude = { 'typeName': 'Float', 'value': Latitude },
        this.Longitude = { 'typeName': 'Float', 'value': Longitude },
        this.Altitude = { 'typeName': 'Float', 'value': Altitude },
        this.AddressId = { 'typeName': 'Int', 'value': AddressId },
        this.Default = { 'typeName': 'Bit', 'value': Default },
        this.Desc = { 'typeName': 'NVarChar', 'typeLength': 500, 'value': Desc },
        this.CreatedBy = { 'typeName': 'Int', 'value': CreatedBy }
    }
}

module.exports = { Location, InsertLocationReq }