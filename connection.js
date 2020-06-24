var Connection = require('tedious').Connection;

// todo: take out the config from here
var config = {  
    server: 'localhost',
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', 
            password: '1234Qwer'
        }
    },
    options: {
        database: 'Parking'
    }
};  

function connectDb() {
    return new Promise(resolve => {
        var connection = new Connection(config);

        connection.on('connect', function(err) {
            err && console.log("$Error: {err}");  
            !err && console.log("Connected");  

            resolve(connection);
        });
    });
}

module.exports = {connectDb};