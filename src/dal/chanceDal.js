'use strict';
const DbContext = require('./dal-context/dbContext');

const chanceInsert = async function(chance) {
    const dbContext = new DbContext();
    let chanceData = await dbContext.execute('main."sp_InsertChance"', chance);

    return chanceData;
}

module.exports = {chanceInsert}