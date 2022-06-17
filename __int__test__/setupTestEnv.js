const { build } = require('../src/app');
const env = require('../src/config/env');

const createTableSQL = 'CREATE TABLE IF NOT EXISTS todos (id SERIAL,name VARCHAR(200),description VARCHAR(500))';

const clearDatabaseSQL = 'DELETE FROM todos';

const insertFakeItemSQL = 'INSERT INTO todos (name, description) VALUES ($1,$2)';

module.exports = function setupTestEnv() {
  const app = build(
    {
      logger: true,
    },
    {},
    {
      connectionString: env.POSTGRES_TEST_DB_CONNECTION_STRING,
    },
  );
  beforeAll(async () => {
    await app.ready();
    await app.pg.query(createTableSQL);
    await app.pg.query(clearDatabaseSQL);
  });

  beforeEach(async () => {
    await app.pg.query(insertFakeItemSQL, ['Test todo', 'This is a test todo']);
  });

  afterEach(async () => {
    await app.pg.query(clearDatabaseSQL);
  });

  afterAll(async () => {
    app.close();
  });

  return app;
};
