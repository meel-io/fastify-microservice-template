const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { camelCase } = require("change-case");
const { pipe, toPairs, map, fromPairs } = require("ramda");

const config = require("../config");
const { Application, services, models } = require("./app/");

const { Server, router } = require("./interfaces/http/");
const { scopePerRequestMiddleware } = require("./interfaces/http/middleware");

const db = require("./infra/database/Mongodb");

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container.register({
  containerMiddleware: asValue(scopePerRequestMiddleware(container))
});

// Database
container.register({
  database: asValue(db)
});

// Services
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [camelCase(key), asClass(value).scoped()]),
    fromPairs
  )(services)
);

// Models
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [key, asValue(value)]),
    fromPairs
  )(models)
);

module.exports = container;
