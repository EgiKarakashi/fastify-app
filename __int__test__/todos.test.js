const setupTestEnv = require('./setupTestEnv');

const app = setupTestEnv();

describe('Integrated tests for crud operations connected to test postgres Db', () => {
  test('Should get all todos', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/v2',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject([
      {
        description: 'This is a test todo',
        name: 'Test todo',
      },
    ]);
  });

  test('Should get a single todo', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/v2/2',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject([
      {
        description: 'This is a test todo',
        name: 'Test todo',
      },
    ]);
  });

  test('Should create a todo via POST route', async () => {
    const todo = {
      name: 'Test todo 2',
      description: 'This is a test todo',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/v2',
      payload: todo,
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toMatchObject(todo);
  });

  test('Should update a todo', async () => {
    const todo = {
      name: 'Updated todo',
      description: 'Updated todo',
    };

    const response = await app.inject({
      method: 'PUT',
      url: '/v2/2',
      payload: todo,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(objectContaining(todo));
  });

  test('Should delete a todo', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/v2/2',
    });

    expect(response.statusCode).toBe(200);
    expect(response).toMatchObject({
      body: 'Item with id: 2 has been deleted',
    });
  });
});
