const chanceController = require('../src/controllers/locationController');

describe.skip('location controller tests', () => {
  const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  }; 
  const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.statusCode = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res;
  };

  beforeAll( async () => {
    // recreate db
    await require('./db-init/schema').createSchema();
    await require('./db-init/tables').createTables();
    await require('./db-init/procedures').createProcedures();
    await require('./db-init/data').defaultData();
  });

  test('test location insert use case', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      "Address": {
          "StreetLocalName": "Bograshov",
          "CityId": 1,
          "CountryId": 367,
          "Building": 1
        },
      "Location": {
        "Latitude": "1",
        "Longitude": "1",
        "Default": "true",
        "Desc": ""
      }
    }
    const chance = await chanceController.insertLocation(req, res);

    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });
});