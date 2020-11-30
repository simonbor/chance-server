'use strict';
const streetDal = require('../dal/streetDal');

const streetFound = (waMessage, streetNames) => {
    let result = false;
    streetNames.map(streetName => {
        // prevent situations when one street name is a part of another street name -
        // רחוב "גורדון" נכנס כרחוב "ורד"
        let streetNameSpaceTailed = streetName + ' ';
        let waMessageSpaceTailed = waMessage + ' ';

        if(waMessageSpaceTailed.indexOf(streetNameSpaceTailed) > -1) {
            result = true;
        }
    });
    return result;
}

const getStreet = async function(req) {
    const addressText = req.body.Address.Text;
    const cityStreets = await streetDal.streetGetAll(req.body.Address);
    let street = {};

    cityStreets.map(cityStreet => {
        const streets = cityStreet.OtherNames ? `${cityStreet.LocalName},${cityStreet.OtherNames}`.split(',') : [cityStreet.LocalName];
        streetFound(addressText, streets) && (street = cityStreet);
    });
    return street;
}

module.exports = { getStreet }