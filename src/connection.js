const Connection = require('tedious').Connection;
const config = require('./config');

const createConnection = () => {
    return new Promise(resolve => {

        // set db connection credentials
        process.env.SV_MSSQL_USERNAME && (config.connection.authentication.options.userName = process.env.SV_MSSQL_USERNAME);
        process.env.SV_MSSQL_PASSWORD && (config.connection.authentication.options.userName = process.env.SV_MSSQL_PASSWORD);
        process.env.SV_MSSQL_DATABASE && (config.connection.options.database = process.env.SV_MSSQL_DATABASE);

        const connection = new Connection(config.connection);

        connection.on('connect', function(err) {
            err && console.log(`Error: ${err}`);  
            !err && console.log("Connected");  

            resolve(connection);
        });
    });
}

module.exports = {createConnection};