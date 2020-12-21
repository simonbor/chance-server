'use strict'

const leavingService = require('../src/services/leaving.service')

describe('leaving service tests', () => {
    const mockRequest = () => {
      const req = {};
      req.body = jest.fn().mockReturnValue(req);
      req.params = jest.fn().mockReturnValue(req);
      return req;
    }; 
    const req = mockRequest();
  
    beforeAll(async () => {
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

    // ===================================================
    // Today's leaving tests
    // ===================================================
    test('test for schedule leaving today at a quarter to nine in the evening', () => {
        req.body.Address.Text = `בוגרשוב 5 היום ברבע לתשע בערב`;
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate());
        expectedDateStart.setHours(20, 45, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
      });    
      
    // ===================================================
    // In a... leaving tests
    // ===================================================
    test('test for schedule leaving in a five minutes', () => {
        req.body.Address.Text = `מפנה בבוגרשוב 5 בעוד חמש דקות`;
        const calculatedDateStart = leavingService.calculateDateStart(req);
        const expectedDateStart = (Date.parse(req.body.Chance.DateStart) + (1000 * 60 * 5));

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });    
    
    test('test for schedule leaving in a five min', () => {
        req.body.Address.Text = `מפנה בבוגרשוב 5 בעוד חמש דק`;
        const calculatedDateStart = leavingService.calculateDateStart(req);
        const expectedDateStart = (Date.parse(req.body.Chance.DateStart) + (1000 * 60 * 5));

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });
    
    test('test for schedule leaving in a 20 minutes', () => {
      req.body.Address.Text = `פינסקר 20 בעוד עשרים דקות`;
      const calculatedDateStart = leavingService.calculateDateStart(req);
      const expectedDateStart = (Date.parse(req.body.Chance.DateStart) + (1000 * 60 * 20));

      expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });    
    
    test('test for schedule incorrect time leaving', () => {
      req.body.Address.Text = `מפנה בעוד 10 ד בהירשנברג פינת גורדון`;
      const calculatedDateStart = leavingService.calculateDateStart(req);
      const expectedDateStart = req.body.Chance.DateStart;

      expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });

    test('test for schedule leaving in a quarter hour', () => {
      req.body.Address.Text = `מפנה בבוגרשוב 5 בעוד רבע שעה`;
      const calculatedDateStart = leavingService.calculateDateStart(req);
      const expectedDateStart = (Date.parse(req.body.Chance.DateStart) + (1000 * 60 * 15));

      expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
  });
    
  // ===================================================
    // Tomorrow's leaving tests
    // ===================================================
    test('test for schedule leaving tomorrow at twelve and ten', () => {
        req.body.Address.Text = 'מפנה ברחוב גורדון 5 מחר בשתיים עשרה ועשרה';
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate() + 1);
        expectedDateStart.setHours(12, 10, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });
    
    test('test for schedule leaving tomorrow at seven in the morning', () => {
        req.body.Address.Text = 'מפנה ברחוב גורדון 5 מחר בשבע בבוקר';
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate() + 1);
        expectedDateStart.setHours(7, 0, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });
    
    test('test for schedule leaving tomorrow at seven in the morning when the sentence is structured otherwise', () => {
        req.body.Address.Text = 'מפנה ברחוב גורדון 5 בשבע בבוקר מחר';
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate() + 1);
        expectedDateStart.setHours(7, 0, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });

    test('test for schedule leaving tomorrow at seven thirty pm', () => {
        req.body.Address.Text = 'גורדון 5 מחר שבע וחצי בערב';
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate() + 1);
        expectedDateStart.setHours(19, 30, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });

    test('test for schedule leaving tomorrow at two fifteen pm', () => {
        req.body.Address.Text = 'גורדון 5 מחר שתיים ורבע אחרי הצהרים';
        const calculatedDateStart = leavingService.calculateDateStart(req);

        const expectedDateStart = new Date();
        expectedDateStart.setDate(expectedDateStart.getDate() + 1);
        expectedDateStart.setHours(14, 15, 0, 0);

        expect(new Date(calculatedDateStart).setSeconds(0) === new Date(expectedDateStart).setSeconds(0)).toBeTruthy();
    });

});