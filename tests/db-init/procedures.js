const config = require('../../src/config');
const mssql = require('mssql');
const fs = require('fs');

const readFile = async (filePath) => {
    const data = await fs.promises.readFile(filePath, 'utf8')
    return data
}

const getScriptsArr = async() => {
    const sql = await readFile('./sql/procedures.sql');

    // split the file to small sql script parts
    return sql.split('go')
        .map(item => {
            return item.trim('\n');
        })
        .filter(item => !item.toLowerCase().startsWith('use'));
}

const createProcedures = async () => {
    const sqlArr = await getScriptsArr();
    const pool = await mssql.connect(config.config);
    const request = await pool.request();

    for(let i = 0; i < sqlArr.length; i++) {
        await request.batch(sqlArr[i]);
        await wait(0); // define delay gap for let creation to finish
    }
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

module.exports = {createProcedures}