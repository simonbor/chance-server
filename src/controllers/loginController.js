const jwt = require('jsonwebtoken');
const driverDal = require('../dal/driverDal');

const driverGet = async (req, res) => {
    const secret = process.env.CRYPTO_KEY || 'secretPassword';
    const driver = await driverDal.driverGet(req.body.Driver);
    const token = jwt.sign({ id: driver.DriverId }, secret, { expiresIn: 600 }); // expires in 10 mins
    
    res.statusCode = 200;
    return { auth: true, user: driver, token: token };
}

module.exports = { driverGet }