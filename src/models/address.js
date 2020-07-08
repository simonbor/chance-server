module.exports = class Address{
	constructor({AddressId, StreetLocalName, Building, StreetId, CityId, CountryId, CreatedBy}) {
		this.AddressId = AddressId
		this.CountryId = CountryId;
		this.CityId = CityId;
		this.StreetLocalName = StreetLocalName;
		this.Building = Building;
		this.StreetId = StreetId;
		this.CreatedBy = CreatedBy;
	}
}
