'use strict'

const waService = require('../src/services/whatsapp.service')
const DbContext = require('../src/contexts/data/db-context');

// remove the SKIP after changing the DB WaGroup.Name length to 80 in all environments
// ALTER TABLE main."WaGroup" 
// ALTER COLUMN "Name" TYPE varchar(80)
describe.skip('whatsapp service tests', () => {
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
        "WhatsApp": {
          "GroupName": ""
        },
        "Driver": {
          "DriverId": 1
        }
      }
    });

    test('test for (insert/get) new whatsapp group long name', async () => {
      req.body.WhatsApp.GroupName = "🅿️ Pumba - בוגרשוב והסביבה"; // the length is 27
      req.body.Driver.DriverId = 1;

      var waGroupId = await waService.getWaGroup(req);

      expect(typeof waGroupId).toBe('number');
      expect(waGroupId > 0).toBeTruthy();
    });

    test('test for (insert/get) new whatsapp group long name', async () => {
      req.body.WhatsApp.GroupName = "🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️🅿️"; // 25 complex symbols is equal to 75 chars
      req.body.Driver.DriverId = 1;

      var waGroupId = await waService.getWaGroup(req);

      expect(typeof waGroupId).toBe('number');
      expect(waGroupId > 0).toBeTruthy();
    });
});