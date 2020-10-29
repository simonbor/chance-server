'use strict'
const DbContext = require('../src/contexts/data/db-context');
const { authenticate } = require('../src/auth');
const userDal = require('../src/dal/user.dal');
const { Roles } = require('../src/enums');
const cipher = require('../src/cipher');

describe('auth tests', () => {
  const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    req.headers = jest.fn().mockReturnValue(req);
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
  beforeEach(async () => {});

  test('test authentication - Normal authentication flow', async () => {
    const res = mockResponse();
    const expiresIn = 60 * 5;

    // create user
    req.body.User = {}
    req.body.User.FirstName = 'TestFirst';
    req.body.User.MobileNum = Array.from({length: 10}, () => Math.floor(Math.random() * 9)).join('');
    req.body.User.Password = '1234qwer';
    
    // insert the user to db
    const userDb = await userDal.insert(req.body.User, Roles.User);
    
    const pl = JSON.parse(JSON.stringify(req.body.User));
    pl.expiresIn = Math.floor((Date.now() / 1000) + expiresIn);
    // create authorization header
    req.headers.authorization = `Bearer ${cipher.encrypt(JSON.stringify(pl))}`;

    await authenticate(req, res);

    expect(res.statusCode).toEqual(200);
  });

  test('test authentication - Missing Authorization Header', async () => {
    const res = mockResponse();

    req.headers.authorization && delete req.headers.authorization;
    const chanceRes = await authenticate(req, res);
    
    expect(chanceRes.statusCode).toEqual(401);
  });
});