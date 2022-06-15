const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");

const { todoRoute } = require("./routes/todo");

const build = (opts = {}, optSwagger = {}) => {
  const app = fastify(opts);
  app.register(fastifySwagger, optSwagger);
  app.register(todoRoute);
  return app;
};

module.exports = { build };
