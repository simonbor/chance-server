const chanceDal = require('../dal/chanceDal');

const insertChance = async (req, res) => {
    return await chanceDal.insertChance(req, res);
}

module.exports = {insertChance}