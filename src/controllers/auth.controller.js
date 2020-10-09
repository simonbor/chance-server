'use strict';
const userDal = require('../dal/user.dal');
const cipher = require('../cipher');
const { HttpStatusCode } = require('../enums');

const authenticate = async function(req, res) {
    const user = await userDal.getByMobile(req.body.User);

    if(user.Password && (req.body.User.Password === cipher.decrypt(user.Password))) {
        const {Password, ...userWithoutPassword} = user;

        res.statusCode = HttpStatusCode.SUCCESS;
        return userWithoutPassword;
    }

    res.statusCode = HttpStatusCode.BAD_REQUEST;
    return;
}

module.exports = { authenticate };