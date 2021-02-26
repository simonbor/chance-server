'use strict'

const chanceController = require('../src/controllers/chance.controller');
const DbContext = require('../src/contexts/data/db-context');
const HmContext = require('../src/contexts/maps/hmContext');
const chanceDal = require('../src/dal/chance.dal');

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
    DbContext.initContext();  // init test database (mssql, postgres)
    HmContext.initContext(); // init Here Map mock api 

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
      "WhatsApp": {
        "GroupName": "Group Name 1"
      },
      "Chance": {
        "DateStart": (new Date()).toLocaleString("en-US")
      }
    }
  });

  test('Test insert chance - nested wrong street name in long right street name', async () => {
    // רחוב "גורדון" נכנס כרחוב "ורד"
    const res = mockResponse();

    req.body.Address.Text = 'מפנה ברחוב גורדון 5 בעוד עשרים דקות';
    const chanceRes = await chanceController.chanceInsert(req, res);

    expect(res.statusCode).toEqual(200);
    expect(chanceRes.statusCode).toEqual(200);
    expect(chanceRes.statusText.indexOf('גורדון') > 0).toBeTruthy();

    expect(typeof chanceRes.data).toBe('object');
  });

  test('Test insert chance - incorrect street use case', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה ברחוב שלא קיים 5 בעוד עשרים דקות';
    const chanceRes = await chanceController.chanceInsert(req, res);

    expect(res.statusCode).toEqual(200);
    expect(chanceRes.statusCode).toEqual(400);
    expect(typeof chanceRes.data).toBe('object');
  });

  test('test insert chance - correct street use case', async () => {
    const res = mockResponse();

    req.body.Address.Text = `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)} בעוד עשרים דקות`;
    const chanceRes = await chanceController.chanceInsert(req, res);

    expect(res.statusCode).toEqual(200);
    expect(chanceRes.statusCode).toEqual(200);
    expect(typeof chanceRes.data).toBe('object');
  });

  test('test insert chance - check insertion by street OtherName', async () => {
    const res = mockResponse();

    req.body.Address.Text = 'מפנה בשיר ' + Math.floor((Math.random()*300) + 1); // שיר == שי"ר
    const chanceRes = await chanceController.chanceInsert(req, res);

    expect(res.statusCode).toEqual(200);
    expect(chanceRes.statusCode).toEqual(200);
    expect(typeof chanceRes.data).toBe('object');
  });

  test('test get chances - chance list should be bigger then 0', async () => {
    const res = mockResponse();

    // insert chance
    req.body.Address.Text = `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)}`;
    await chanceController.chanceInsert(req, res);

    const date = new Date();
    date.setDate(date.getDate() - 1);
    req.body.Chance.DateStart = (date).toLocaleString("en-US");
    const chanceRes = await chanceController.chancesListGet(req, res);
    
    expect(chanceRes.data.length > 0).toBeTruthy();
    expect(chanceRes.statusCode).toEqual(200);
    expect(res.statusCode).toEqual(200);
  });
  
  test('test insert chance with size - big small park sizes insertion', async () => {
    const res = mockResponse();
    req.body.Address.Text = `מפנה בבוגרשוב ${Math.floor((Math.random()*300) + 1)} בעוד חמש דקות`;
    
    let dateFewSecsAgo = new Date((Date.now() - 1000));
    req.body.Chance.DateStart = (dateFewSecsAgo).toLocaleString("en-US");
    const chanceNormSpot = await chanceController.chanceInsert(req, res);

    req.body.Chance.Size = false;
    dateFewSecsAgo = new Date((Date.now() - 3000));
    req.body.Chance.DateStart = (dateFewSecsAgo).toLocaleString("en-US");
    const chanceSmallSpot = await chanceController.chanceInsert(req, res);

    req.body.Chance.Size = true;
    dateFewSecsAgo = new Date((Date.now() - 5000));
    req.body.Chance.DateStart = (dateFewSecsAgo).toLocaleString("en-US");
    const chanceBigSpot = await chanceController.chanceInsert(req, res);

    delete req.body.Chance.DateStart;
    const chanceList = await chanceController.chancesListGet(req, res);

    const markerNormSpot = chanceList.data.find((ch) => ch.ChanceId === chanceNormSpot.data[0].ChanceId);
    const markerSmallSpot = chanceList.data.find((ch) => ch.ChanceId === chanceSmallSpot.data[0].ChanceId);
    const markerBigSpot = chanceList.data.find((ch) => ch.ChanceId === chanceBigSpot.data[0].ChanceId);
    
    expect(markerNormSpot.Size).toEqual(null);
    expect(markerSmallSpot.Size).toEqual(false);
    expect(markerBigSpot.Size).toEqual(true);
    expect(res.statusCode).toEqual(200);
  });

  test('test chancesNowCountGet - test for get chances only from right time scope', async () => {
    const res = mockResponse();

    const dbGapTime = new Date(), backTenMin = new Date(), backOneHour = new Date();
    dbGapTime.setMinutes((new Date()).getMinutes() - 30);
    backTenMin.setMinutes((new Date()).getMinutes() - 10);
    backOneHour.setMinutes((new Date()).getMinutes() - 60);

    // create req "outside" the 30 min time scope
    const outScopeReq = JSON.parse(JSON.stringify(req));
    outScopeReq.DateStart = dbGapTime.toLocaleString("en-US");
    outScopeReq.body.Address.Text = `בוגרשוב ${Math.floor((Math.random()*300) + 1)}`;
    
    // create req "inside" the 30 min time scope 
    const inScopeReq = JSON.parse(JSON.stringify(req));
    inScopeReq.DateStart = backTenMin.toLocaleString("en-US");
    inScopeReq.body.Address.Text = `בוגרשוב ${Math.floor((Math.random()*300) + 1)}`;

    // insert one in and one out the scope
    const outScopeRes = await chanceController.chanceInsert(outScopeReq, res);
    const inScopeRes = await chanceController.chanceInsert(inScopeReq, res);

    const mockReq = mockRequest();
    mockReq.body = {
      "Address": { "CityId": 1 },
      "Chance": { "DateStart": backOneHour.toLocaleString('en-US') }
    };

    // get chances one hour back and filter them half hour back
    const chancesBackOneHour = await chanceDal.chanceGet(mockReq);
    const chancesBackHalfHour = chancesBackOneHour.filter(chance => {
      return new Date(chance.DateStart) > dbGapTime;
    });

    // get chances half hour back - system flow
    delete mockReq.body.Chance.DateStart;
    const chancesNowCount = await chanceController.chancesNowCountGet(mockReq, res);

    expect(outScopeRes.data[0].ChanceId > 0).toBeTruthy();
    expect(inScopeRes.data[0].ChanceId > 0).toBeTruthy();
    expect(chancesBackHalfHour.length > 0 && chancesBackOneHour.length > 0).toBeTruthy();
    expect(chancesBackHalfHour.length === chancesNowCount.data[0].count).toBeTruthy();
  });
});