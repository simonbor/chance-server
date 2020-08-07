'use strict';
const connect = require('../../connect');

module.exports = class MssqlContext {
    async execute(procedureName, request) {
        const pool = await connect.getPool('psql');

        let csPayload = '';
        const arrParams = Object.values(request).map(item => {return item.value || null});

        arrParams.map((item, index) => {
            csPayload += `$${index + 1}, `;
        })
        const csDollars = csPayload.trim().slice(0, -1)

        // console.log(arrParams);
        // console.log(procedureName);

        const res = await pool.query(`select row_to_json(${procedureName}(${csDollars}))`, arrParams);
        const data = res.rows[0] && res.rows[0]['row_to_json'] || res.rows;

        return data;
    }
}