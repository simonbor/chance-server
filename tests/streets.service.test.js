'use strict'

const streetsService = require('../src/services/streets.service')
const DbContext = require('../src/contexts/data/db-context');

describe('streets service tests', () => {
  const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  }; 
  const req = mockRequest();

  beforeAll(async (done) => {
    DbContext.initContext();  // init test database (mssql, postgres)

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

  test('test for the Gordon street (was coming to the system as Vered street)', async () => {
    // רחוב גורדון" היה נכנס למערכת כרחוב "ורד"
    req.body.Address.Text = 'מפנה ברחוב גורדון 5 בעוד עשרים דקות';
    const street = await streetsService.getStreet(req);

    expect(typeof street.LocalName).toBe('string');
    expect(street.LocalName.indexOf('גורדון') > -1).toBeTruthy();
  });

  test('test for the Hapardes street', async () => {
    req.body.Address.Text = '4 חניות צמודות בפרדס';
    
    const street = await streetsService.getStreet(req);

    expect(typeof street.LocalName).toBe('string');
    expect(street.LocalName.indexOf('הפרדס') > -1).toBeTruthy();
  });
});