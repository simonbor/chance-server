const locationController = require('../src/controllers/locationController');
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

  test('test location insert use case', async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      "Address": {
          "StreetName": "Bograshov",
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
    const location = await locationController.insertLocation(req, res);

    expect(location.LocationId > 0).toBeTruthy()
    expect(res.statusCode).toEqual(200);
    expect(typeof location).toBe('object');
  });
});