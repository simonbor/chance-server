const mssql = require('mssql');
const cipher = require('./cipher');
const config = require('./config');

// todo: after complete postgres integration don't forget to remove default db value
const getPool = async function(db = 'mssql') {

    const dbConfig = JSON.parse(JSON.stringify(config[`${db}-config`]));

    // decrypt config password and connect
    dbConfig.password = cipher.decrypt(dbConfig.password);
    const pool = await mssql.connect(dbConfig);

    return pool;
}

module.exports = {getPool}