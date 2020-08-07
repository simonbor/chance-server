class Address {
	constructor({addressid, streetlocalname, building, streetid, cityid, countryid, createdby}) {
		this.AddressId = 	addressid
		this.CountryId = 	countryid;
		this.CityId = 		cityid;
		this.StreetLocalName = 	streetlocalname;
		this.Building = 		building;
		this.StreetId = 		streetid;
		this.CreatedBy = 		createdby;
	}
}

class GetAddressReq{
	constructor({StreetLocalName, Building,CityId, CountryId}) {
		this.StreetLocalName = { 'type': 'VarChar(50)', 'value': StreetLocalName };
		this.CityId = { 'type': 'Int', 'value': CityId };
		this.CountryId = { 'type': 'Int', 'value': CountryId };
		this.Building = { 'type': 'Int', 'value': Building };
	}
}

class InsertAddressReq {
	constructor({StreetLocalName, Building,CityId, CountryId, CreatedBy}) {
		this.StreetLocalName = { 'type': 'VarChar(50)', 'value': StreetLocalName };
		this.CityId = { 'type': 'Int', 'value': CityId };
		this.CountryId = { 'type': 'Int', 'value': CountryId };
		this.Building = { 'type': 'Int', 'value': Building };
		this.CreatedBy = { 'type': 'Int', 'value': CreatedBy };
	}
}

module.exports = { Address, GetAddressReq, InsertAddressReq }