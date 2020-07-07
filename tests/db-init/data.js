const config = require('../../src/config');
const mssql = require('mssql');
const fs = require('fs');

const readFile = async (filePath) => {
  const data = await fs.promises.readFile(filePath, 'utf8')
  return data
}

const getScriptsArr = async (script) => {
  const sql = await readFile(`./sql/${script}.sql`);

    // split the file to small sql script parts
    return sql.split('go')
    .map(item => {
      return item.trim('\n');
    })
    .filter(item => !item.toLowerCase().startsWith('use'));
}

const runSql = async (sql) => {
  let pool = await mssql.connect(config.config);
  const result = await pool.request().query(sql);
}

const defaultData = async () => {
  const dataSqlArr = await getScriptsArr('data');

  // recreate schema
  return await Promise.all(dataSqlArr.map(async (sql) => {
    await runSql(sql);
  }));
}

module.exports = {defaultData}