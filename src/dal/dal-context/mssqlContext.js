'use strict';
const connect = require('../../connect');
const mssql = require('mssql');

module.exports = class MssqlContext {
    async execute(procedureName, reqParams) {
        const pool = await connect.getPool('mssql');
        let request = await pool.request();

        for (const param in reqParams) {
            request.input(param, mssql[reqParams[param]['type']], reqParams[param]['value']);
        }

        let chanceData = await request.execute(procedureName);
        return chanceData.recordset[0];
    }
}