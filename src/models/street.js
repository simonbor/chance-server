'use strict';

class Street {
	constructor({StreetId, LocalName, OtherNames, CityId, Desc, Name}) {
        this.StreetId = StreetId;
        this.LocalName = LocalName;
        this.OtherNames = OtherNames;
        this.CityId = CityId;
        this.Desc = Desc;
        this.Name = Name
    }
}

class GetAllStreetsReq {
	constructor({CityId}) {
        this.CityId = { 'typeName': 'Int', 'value': CityId };
    }
}

module.exports = { Street, GetAllStreetsReq }