describe('first test for create the database', () => {

    beforeAll(async () => {

        // [!] remember to restart tests after change the DB_RECREATE
        if(DB_RECREATE) {
            await require('./db-init/schema').createSchema();
            await require('./db-init/tables').createTables();
            await require('./db-init/procedures').createProcedures();
            await require('./db-init/data').defaultData();
        }
    });

    test('', async () => {});
});