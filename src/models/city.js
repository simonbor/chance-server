'use strict';

class City {
	constructor({CityId, LocalName, Name, Desc}) {
        this.CityId = CityId;
        this.LocalName = LocalName;
        this.Name = Name
        this.Desc = Desc;
    }
}

class GetCityReq {
	constructor({CityId}) {
        this.CityId = { 'typeName': 'Int', 'value': CityId };
    }
}

module.exports = { City, GetCityReq }