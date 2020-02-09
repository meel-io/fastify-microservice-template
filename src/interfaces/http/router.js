const { PokemonsRouter } = require("../../app/routes");
const swaggerDocument = require("./middleware/swagger/swagger.json");

module.exports = () =>
  async function(fastify) {
    fastify
      .register(require("fastify-swagger"), swaggerDocument)
      // APIs modules
      .register(PokemonsRouter, { prefix: "/api/pokemons" });
  };
