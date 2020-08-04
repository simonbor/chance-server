const chanceController = require('../src/controllers/chanceController');

describe('chance controller tests', () => {
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
    // wait for db recreation
    setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });

  test('test insert chance use case', async () => {
    const req = mockRequest();
    const res = mockResponse();

    // https://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    // req.body.Chance = {"DateStart": (new Date()).toLocaleString("en-US")};
    req.body = {
      "Address": {
        "StreetLocalName": "Bograshov",
        "CityId": 1,
        "CountryId": 367,
        "Building": 1
      },
      "Driver": {
        "MobileNum": "0544123123"
      },
      "Chance": {
        "DateStart": (new Date()).toLocaleString("en-US")
      }
    }

    const chance = await chanceController.chanceInsert(req, res);

    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });
});