const { build } = require("./app");
const env = require("./config/env");

const app = build(
  { logger: true },
  {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: { info: { title: "Fastfify Swagger API", version: "1.0.1" } },
  },
  {
    connectionString: env.POSTGRES_DB_CONNECTION_STRING,
  }
);

app.get("/time", function (request, reply) {
  app.pg.connect(onConnect);

  function onConnect(error, client, release) {
    if (error) return reply.send(error);

    client.query("SELECT now()", function onResult(error, result) {
      release();
      reply.send(error || result.rows[0]);
    });
  }
});

app.listen(env.WEB_APP_HOST, "0.0.0.0", function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
