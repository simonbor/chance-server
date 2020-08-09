'use strict';

class Driver {
	constructor({DriverId, MobileNum, Name, CarName, CarColor}) {
        this.DriverId = DriverId;
        this.MobileNum = MobileNum;
        this.Name = Name;
        this.CarName = CarName;
        this.CarColor = CarColor;
    }
}

class GetDriverReq {
	constructor({MobileNum}) {
        this.MobileNum = { 'typeName': 'VarChar', 'typeLength': 20, 'value': MobileNum };
    }
}

class InsertDriverReq {
	constructor({MobileNum, Name, CarName, CarColor}) {
        this.MobileNum = { 'typeName': 'VarChar', 'typeLength': 20, 'value': MobileNum };
        this.Name = { 'typeName': 'NVarChar', 'typeLength': 100, 'value': Name };
        this.CarName = { 'typeName': 'NVarChar', 'typeLength': 50, 'value': CarName };
        this.CarColor = { 'typeName': 'NVarChar', 'typeLength': 50, 'value': CarColor };
    }
}

module.exports = { Driver, GetDriverReq, InsertDriverReq }