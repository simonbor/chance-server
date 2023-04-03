'use strict'
const locationDal = require('../dal/locationDal');
const cityDal = require('../dal/cityDal');
const HmContext = require('../contexts/maps/hmContext');

const getLocation = async function(req) {
    let location = await locationDal.locationGet(req.body.Address);
    if (!location.LocationId) {
        // retrieve city
        const city = await cityDal.cityGet(req.body.Address);
        req.body.Address.CityName = city.LocalName;

        const hmContext = new HmContext();
        const position = await hmContext.getLocation(`${req.body.Street.LocalName} ${req.body.Address.Building} ${req.body.Address.CityName}`);

        // insert location
        req.body.Location = {
            "Longitude": position.lng,
            "Latitude": position.lat,
            "DefLocation": true,
            "AddressId": req.body.Address.AddressId,
            "CreatedBy": req.body.Driver.DriverId,
        }
        location = await locationDal.locationInsert(req.body.Location);
    }
    return location;
}

module.exports = { getLocation };