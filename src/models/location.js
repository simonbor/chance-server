const create = function ({Latitude, Longitude, Altitude, AddressId, Default, Desc, CreatedBy}) {
    return {
        "Latitude": Latitude,
        "Longitude": Longitude,
        "Altitude": Altitude,
        "AddressId": AddressId,
        "Default": Default,
        "Desc": Desc,
        "CreatedBy": CreatedBy
    }
}

module.exports = { create }