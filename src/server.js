const {build} = require('./app')

const app = build({ logger: true }, {exposeRoute: true, routePrefix: '/docs', swagger: {info: 
    {title: "Fastfify Swagger API", version: '1.0.1'}}})


app.listen(3000, function(err, address) {
    if (err) 
    {
        app.log.error(err)
        process.exit(1)
    }
})