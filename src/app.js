const fastify = require("fastify");
const fastifySwagger = require("@fastify/swagger");
const fastifyPostgres = require("@fastify/postgres");

const { todoRoute } = require("./routes/todo");
const { todoRoute_v2 } = require("./routes/v2/todo");

const build = (opts = {}, optSwagger = {}, optPostgres = {}) => {
  const app = fastify(opts);
  app.register(fastifyPostgres, optPostgres);
  app.register(fastifySwagger, optSwagger);
  app.register(todoRoute, { prefix: "/v1" });
  app.register(todoRoute_v2, { prefix: "/v2" });
  return app;
};

module.exports = { build };
