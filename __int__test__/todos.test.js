const setupTestEnv = require("./setupTestEnv");

const app = setupTestEnv();

describe("Integreted tests for crud operations connected to test postgres Db", () => {
  test("Should create an item via POST route", async () => {
    const item = {
      name: "Test item 2",
      descirption: "This is a test item",
      gross_amount: 20,
    };

    const reposnse = await app.inject({
      method: "POST",
      url: "/v2/",
      payload: item,
    });

    expect(reposnse.statusCode).toBe(201);
    expect(response.json()).toMatchObject(item);
  });
});
