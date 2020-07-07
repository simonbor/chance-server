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
    res.status = jest.fn().mockReturnValue(res)
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

  test('test insert chance use case', async () => {
    const req = mockRequest();
    const res = mockResponse();
    // ---
    req.params.Address = {
      "Street": {"LocalName": "Bograshov"},
      "City": {"CityId": 1},
      "Country": {"CountryId": 367},
      "Building": 1
    }
    // ---
    req.params.Driver = {"MobileNum": '0544123123'};
    // ---
    // https://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.params.Chance = {"DateStart": (new Date()).toLocaleString("en-US")};

    await chanceController.insertChance(req, res);

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});