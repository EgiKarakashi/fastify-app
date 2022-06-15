const {
  getTodo,
  getTodos,
  postTodo,
  updatedTodo,
  deleteTodo,
} = require("../controllers/todos");

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
        todos: Todo,
      },
    },
  },
  handler: getTodos,
};

const getTodoOpts = {
  schema: {
    response: {
      200: Todo,
    },
  },
  handler: getTodo,
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
  handler: postTodo,
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
  handler: updatedTodo,
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
  handler: deleteTodo,
};

const todoRoute = (fastify, options, done) => {
  fastify.get("/", getTodosOpts);

  fastify.get("/:id", getTodoOpts);

  fastify.post("/", postTodoOpts);

  fastify.put("/:id", updateTodoOpts);

  fastify.delete("/:id", deleteTodoOpts);

  done();
};

module.exports = { todoRoute };
