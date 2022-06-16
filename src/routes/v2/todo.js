let todos = require("../../Todo");

const Todo = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
};

const getTodosOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        todos: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const getTodoOpts = {
  schema: {
    response: {
      200: {
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
      },
    },
  },
};

const postTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "description"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
      },
    },
    response: {
      201: Todo,
    },
  },
};

const updateTodoOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "description"],
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
      },
    },
    response: {
      200: Todo,
    },
  },
};

const deleteTodoOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

const todoRoute_v2 = async (fastify, options, done) => {
  fastify.get("/", getTodosOpts, async (request, reply) => {
    try {
      const { rows } = await fastify.pg.query("SELECT * FROM todos");
      reply.send(rows);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/:id", getTodoOpts, async (request, reply) => {
    try {
      const { id } = request.params;
      const { rows } = await fastify.pg.query(
        "SELECT * FROM todos WHERE id=$1",
        [id]
      );
      reply.send(rows[0]);
    } catch (error) {
      reply.send(error);
    } finally {
      client.release();
    }
  });

  fastify.post("/", postTodoOpts, async (request, reply) => {
    try {
      const client = await fastify.pg.connect();
      const { name, description } = request.body;
      const { rows } = await fastify.pg.query(
        "INSERT INTO todos (name, description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );

      reply.code(201).send(rows[0]);
    } catch (error) {
      reply.send(error);
    } finally {
      client.release();
    }
  });

  fastify.put("/:id", updateTodoOpts, async (request, reply) => {
    try {
      const { id } = request.params;
      const { name, description } = request.body;
      const { rows } = await fastify.pg.query(
        "UPDATE todos SET name=$1, description=$2 WHERE id=$3 RETURNING *",
        [name, description, id]
      );

      reply.send(rows[0]);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.delete("/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      await fastify.pg.query("DELETE FROM todos WHERE id=$1", [id]);
      reply.send(`Item with id: ${id} has been deleted`);
    } catch (error) {
      reply.send(error);
    }
  });

  done();
};

module.exports = { todoRoute_v2 };
