'use strict'

const leavingService = require('../src/services/leaving.service')

describe('leaving service tests', () => {
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

    test('test for schedule leaving tomorrow at seven in the morning', async () => {
        req.body.Address.Text = 'מפנה ברחוב גורדון 5 מחר בשבע בבוקר';
        const calculatedDateStart = await leavingService.calculateDateStart(req);
    
        const rightDateStart = new Date(Date.now() + 1);
        rightDateStart.setHours(7, 0, 0);
    
        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(rightDateStart).setSeconds(0)).toBeTruthy();
    });
});