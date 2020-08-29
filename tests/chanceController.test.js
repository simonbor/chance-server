const chanceController = require('../src/controllers/chanceController');
const DbContext = require('../src/dal/dal-context/dbContext')

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
  const req = mockRequest();

  beforeAll(async (done) => {
    // init database (mssql, postgres)
    DbContext.initContext();

    // wait for db recreation
    setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });

  beforeEach(async () => {
    // https://stackoverflow.com/questions/20083807/javascript-date-to-sql-date-object
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    // req.body.Chance = {"DateStart": (new Date()).toLocaleString("en-US")};

    req.body = {
      "Address": {
        "CityId": 1,
        "CountryId": 367
      },
      "Driver": {
        "MobileNum": "0544123123"
      },
      "Chance": {
        "DateStart": (new Date()).toLocaleString("en-US")
      }
    }
  });

  test('Test insert chance - incorrect street use case. Should obtain status 403', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה ברחוב שלא קיים 5 בעוד עשרים דקות';

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(400);
    expect(typeof chance).toBe('object');
  });

  test('test insert chance - correct street use case. Should obtain status 200', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה בבוגרשוב 5 בעוד עשרים דקות';

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });

  test('test insert chance - check insertion by street OtherName. Should obtain status 200', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה בשיר 5'; // שיר == שי"ר

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });
});