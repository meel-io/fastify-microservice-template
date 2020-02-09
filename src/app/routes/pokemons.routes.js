const ctrl = require("../controllers/pokemons.controller");
const schema = require("../schemas/pokemons.schema");

module.exports = async function(fastify) {
  fastify.post("/", { schema: schema.add }, ctrl("create"));
  fastify.get("/", { schema: schema.search }, ctrl("search"));
  fastify.put("/:id", { schema: schema.update }, ctrl("update"));
  fastify.get("/:id", { schema: schema.get }, ctrl("get"));
  fastify.delete("/:id", { schema: schema.remove }, ctrl("delete"));
};
