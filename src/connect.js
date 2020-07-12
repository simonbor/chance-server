const mssql = require('mssql');
const cipher = require('./cipher');
const config = require('./config');

const getPool = async function () {
    if(process.env.NODE_ENV === 'production') {
        config.config.password = cipher.decrypt(config.config.password);
    }
    const pool = await mssql.connect(config.config);

    return pool;
}

module.exports = {getPool}