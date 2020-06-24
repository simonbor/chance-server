const connection = require('../../connection');
const Address = require('../models/address');

const addressGet = async function addressGet (req, res) {
    const connect = await connection.connectDb();

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;

    var request = new Request("main.sp_GetAddress", function(err) {
    });
    
    Object.keys(req.body).forEach(function(p) {
        request.addParameter(p, TYPES.VarChar, req.body[p]);
    });

    request.on('row', function (columns) {
    });

    request.on('doneInProc', function (rowCount, more, rows) {
    });

    connection.callProcedure(request);
}

const addressUpdate = async function addressUpdate (req, res) {  
    const connect = await connection.connectDb();

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;

    var request = new Request("main.sp_InsertAddress", function(err) {
        if(err){
            console.log(err);
        }
    });

    Object.keys(req.body).forEach(function(p) {
        request.addParameter(p, TYPES.VarChar, req.body[p]);
    });

    connect.callProcedure(request);
}

module.exports = {addressGet, addressUpdate}