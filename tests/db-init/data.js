const connect = require('../../src/connect');
const fs = require('fs');

const readFile = async (filePath) => {
  const data = await fs.promises.readFile(filePath, 'utf8')
  return data
}

const getScriptsArr = async (script) => {
  const sql = await readFile(`./sql/mssql/${script}.sql`);

    // split the file to small sql script parts
    return sql.split('go')
    .map(item => {
      return item.trim('\n');
    })
    .filter(item => !item.toLowerCase().startsWith('use'));
}

const runSql = async (sql) => {
  const pool = await connect.getPool('mssql');
  await pool.request().query(sql);
}

const defaultData = async () => {
  const dataSqlArr = await getScriptsArr('data');

  // recreate schema
  return await Promise.all(dataSqlArr.map(async (sql) => {
    await runSql(sql);
  }));
}

module.exports = {defaultData}