class Location {
    constructor({locationid, latitude, longitude, altitude, addressid, _default, desc, createdby}) {
        this.LocationId =             locationid,
        this.Latitude =             latitude,
        this.Longitude =            longitude,
        this.Altitude =             altitude,
        this.AddressId =            addressid,
        this.Default =              _default,
        this.Desc =                 desc,
        this.CreatedBy =            createdby
    }
}

class InsertLocationReq {
    constructor({Latitude, Longitude, Altitude, AddressId, Default, Desc, CreatedBy}) {
        this.Latitude = { 'type': 'Float', 'value': Latitude },
        this.Longitude = { 'type': 'Float', 'value': Longitude },
        this.Altitude = { 'type': 'Float', 'value': Altitude },
        this.AddressId = { 'type': 'Int', 'value': AddressId },
        this.Default = { 'type': 'Bit', 'value': Default },
        this.Desc = { 'type': 'NVarChar', 'value': Desc },
        this.CreatedBy = { 'type': 'Int', 'value': CreatedBy }
    }
}

module.exports = { Location, InsertLocationReq }