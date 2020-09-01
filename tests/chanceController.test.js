const chanceController = require('../src/controllers/chanceController');
const DbContext = require('../src/dal/dal-context/dbContext')

// https://scotch.io/tutorials/nodejs-tests-mocking-http-requests
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

  test('Test insert chance - incorrect street use case', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה ברחוב שלא קיים 5 בעוד עשרים דקות';

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(400);
    expect(typeof chance).toBe('object');
  });

  test('test insert chance - correct street use case', async () => {
    const res = mockResponse();

    req.body.Address.Text = `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)} בעוד עשרים דקות`;

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });

  test('test insert chance - check insertion by street OtherName', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה בשיר ' + Math.floor((Math.random()*300) + 1); // שיר == שי"ר

    const chance = await chanceController.chanceInsert(req, res);
    expect(res.statusCode).toEqual(200);
    expect(typeof chance).toBe('object');
  });

  test('test get chances - chance list should be bigger then 0', async () => {
    const res = mockResponse();

    // insert chance
    req.body.Address.Text = `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)}`;
    await chanceController.chanceInsert(req, res);

    const date = new Date();
    date.setDate(date.getDate() - 1);
    req.body.Chance.DateStart = (date).toLocaleString("en-US");
    const chanceList = await chanceController.chanceGet(req, res);
    
    expect(chanceList.length > 0).toBeTruthy();
    expect(res.statusCode).toEqual(200);
  });



});