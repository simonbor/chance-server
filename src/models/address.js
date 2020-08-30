class Address {
	constructor({AddressId, StreetLocalName, Building, StreetId, CityId, CountryId, CreatedBy}) {
		this.AddressId = 		AddressId;
		this.CountryId = 		CountryId;
		this.CityId = 			CityId;
		this.StreetLocalName =	StreetLocalName;
		this.Building = 		Building;
		this.StreetId = 		StreetId;
		this.CreatedBy = 		CreatedBy;
	}
}

class GetAddressReq{
	constructor({StreetId, Building,CityId, CountryId}) {
		this.StreetId = 	{ 'typeName': 'Int', 'value': StreetId };
		this.CityId = 		{ 'typeName': 'Int', 'value': CityId };
		this.CountryId = 	{ 'typeName': 'Int', 'value': CountryId };
		this.Building = 	{ 'typeName': 'Int', 'value': Building };
	}
}

class InsertAddressReq {
	constructor({StreetId, Building, CityId, CountryId, CreatedBy}) {
		this.StreetId = 	{ 'typeName': 'Int', 'value': StreetId };
		this.CityId = 		{ 'typeName': 'Int', 'value': CityId };
		this.CountryId = 	{ 'typeName': 'Int', 'value': CountryId };
		this.Building = 	{ 'typeName': 'Int', 'value': Building };
		this.CreatedBy = 	{ 'typeName': 'Int', 'value': CreatedBy };
	}
}

module.exports = { Address, GetAddressReq, InsertAddressReq }