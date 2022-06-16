const { build } = require("./app");

const app = build(
  { logger: true },
  {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: { info: { title: "Fastfify Swagger API", version: "1.0.1" } },
  },
  {
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
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

app.listen(3000, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
