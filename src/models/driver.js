'use strict';

class Driver {
	constructor({driverid, mobilenum, name, carname, carcolor}) {
        this.DriverId = driverid;
        this.MobileNum = mobilenum;
        this.Name = name;
        this.CarName = carname;
        this.CarColor = carcolor;
    }
}

class GetDriverReq {
	constructor({DriverId, MobileNum, Name, CarName, CarColor}) {
        this.MobileNum = { 'type': 'VarChar(20)', 'value': MobileNum };
    }
}

class InsertDriverReq {
	constructor({DriverId, MobileNum, Name, CarName, CarColor}) {
        this.MobileNum = { 'type': 'VarChar(20)', 'value': MobileNum };
        this.Name = { 'type': 'NVarChar(100)', 'value': Name };
        this.CarName = { 'type': 'NVarChar(50)', 'value': CarName };
        this.CarColor = { 'type': 'NVarChar(50)', 'value': CarColor };
    }
}

module.exports = { Driver, GetDriverReq, InsertDriverReq }