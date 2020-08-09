'use strict'
const addressController = require('../src/controllers/addressController');
const DbContext = require('../src/dal/dal-context/dbContext')

describe('location controller tests', () => {
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

  beforeAll(async (done) => {
    // init database (mssql, postgres)
    DbContext.initContext();

    // wait for db recreation
    setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });

  test('test address read empty address use case', async () => {
    const req = mockRequest(), res = mockResponse();

    req.body = {
      "Address": {
          "StreetName": "Bograshov",
          "CityId": 1,
          "CountryId": 367,
          "Building": 9999
        }
    }
    const address = await addressController.addressGet(req, res);

    // console.log(address);

    expect(address.AddressId === undefined).toBeTruthy()
    expect(res.statusCode).toEqual(200);
    expect(typeof address).toBe('object');
  });
});