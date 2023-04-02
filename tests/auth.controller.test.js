'use strict'
const authController = require('../src/controllers/auth.controller');
const DbContext = require('../src/contexts/data/db-context');
const userDal = require('../src/dal/user.dal');
const { Roles } = require('../src/enums');

describe('auth controller tests', () => {
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

  beforeAll((done) => {
    // init database (mssql, postgres)
    DbContext.initContext();

    // wait for db recreation
    setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });
  beforeEach(async () => {});

  test('test auth controller - user authentication test', async () => {
    const res = mockResponse();

    // create user
    req.body.User = {}
    req.body.User.FirstName = 'TestFirst';
    req.body.User.MobileNum = Array.from({length: 10}, () => Math.floor(Math.random() * 9)).join('');
    req.body.User.Password = '1234qwer';

    // insert the user to db
    const userDb = await userDal.insert(req.body.User, Roles.User);

    // authenticate
    const authUser = await authController.authenticate(req, res);

    expect(res.statusCode).toEqual(200);
    expect(authUser.MobileNum).toEqual(req.body.User.MobileNum);
  });
});