const { build } = require("../src/app");

const createTableSQL =
  "CREATE TABLE IF NOT EXITS Items (id SERIAL,name VARCHAR(200),description VARCHAR(500))";

const clearDatabaseSQL = "DELETE FROM test_todo";

const insertFakeItemSQL =
  "INSERT INTO test_todo (name, description) VALUES ($1,$2)";

module.exports = function setupTestEnv() {
  const app = build(
    {
      logger: true,
    },
    {},
    {
      connectionString:
        "postgres://postgres:postgres@localhost:5432/postgres_test",
    }
  );
  beforeAll(async () => {
    await app.ready();
    await app.pg.query(createTableSQL);
    await app.pg.query(clearDatabaseSQL);
  });

  beforeEach(async () => {
    await app.pg.query(insertFakeItemSQl, [
      "Test item",
      "This is a test item",
      "New Todo from test",
      "New todo description",
    ]);
  });

  afterEach(async () => {
    await app.pg.query(clearTableSQl);
  });

  afterAll(async () => {
    app.close();
  });

  return app;
};
