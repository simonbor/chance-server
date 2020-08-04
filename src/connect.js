const mssql = require('mssql');
const cipher = require('./cipher');
const config = require('./config');

const getPool = async function () {
    
    const dbConfig = JSON.parse(JSON.stringify(config['mssql-config']));

    // decrypt config password and connect
    dbConfig.password = cipher.decrypt(dbConfig.password);
    const pool = await mssql.connect(dbConfig);

    return pool;
}

module.exports = {getPool}