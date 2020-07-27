const mssql = require('mssql');
const cipher = require('./cipher');
const config = require('./config');

const getPool = async function () {
    
    const tmpConfig =JSON.parse(JSON.stringify(config));

    // decrypt config password and connect
    tmpConfig.config.password = cipher.decrypt(tmpConfig.config.password);
    const pool = await mssql.connect(tmpConfig.config);

    return pool;
}

module.exports = {getPool}