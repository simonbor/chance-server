const connect = require('../../src/connect');
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
  const pool = await connect.getPool();
  const result = await pool.request().query(sql);
}

const createSchema = async () => {
  const schemaSqlArr = await getScriptsArr('schema');
  const tablesSqlArr = await getScriptsArr('tables');
  const proceduresSqlArr = await getScriptsArr('procedures');

  // drop all tables
  await runSql(tablesSqlArr[0]);

  // drop all procedures
  await runSql(proceduresSqlArr[0]);

  // recreate schema
  return await Promise.all(schemaSqlArr.map(async (sql) => {
    await runSql(sql);
  }));
  // for(let i = 0; i < schemaSqlArr.length; i++) {
  //   await runSql(schemaSqlArr[i]);
  //   await wait(0); // define delay gap for let creation to finish
  // }
}

async function wait(ms) {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
}

module.exports = {createSchema}