const DbContext = require('../src/contexts/data/db-context');
const driverDal = require('../src/dal/driverDal');

describe('driver dal tests', () => {
  beforeAll(async (done) => {
    // init database (mssql, postgres)
    DbContext.initContext();

    // wait for db recreation
    setTimeout(function() {done()}, DB_RECREATE_DELAY);
  });

  beforeEach(async () => {
  });

  test('test insert chance - check Driver.Reports is bigger then 0 and updated time later then created time', async () => {
    const driverReq = {
      "MobileNum": "0544123123"
    }

    // insert new driver and check Reports is equal or bigger then 0
    let driver = await driverDal.driverGet(driverReq);
    if(!driver.DriverId) {
        driver = await driverDal.driverInsert(driverReq);
    }
    
    const driverBeforeUpdate = await driverDal.driverGet(driver);
    expect(driverBeforeUpdate.Reports >= 0).toBeTruthy();
    
    const driverAfterUpdate = await driverDal.updateReports(driverBeforeUpdate);

    expect(driverAfterUpdate.Updated > driverAfterUpdate.Created).toBeTruthy();
    expect(driverAfterUpdate.Reports > driverBeforeUpdate.Reports).toBeTruthy();
  });
});