const { makeInvoker } = require("../../helpers");

const PokemonsController = ({ pokemonsService }) => {
  return {
    get: async (req, res) => {
      const result = await pokemonsService.get(req.params.id);
      res.json(result);
    },
    search: async (req, res) => {
      const {
        query: {
          select,
          populate,
          page,
          limit,
          sortField,
          sortDirection,
          ...queryParams
        }
      } = req;

      const result = await pokemonsService.search({
        select,
        populate,
        page,
        limit,
        sortField,
        sortDirection,
        queryParams
      });
      res.json(result);
    },
    create: async (req, res) => {
      const entity = req.body;
      const asset = await pokemonsService.create(entity);
      res.json(asset);
    },
    delete: async (req, res) => {
      const asset = await pokemonsService.delete(req.params.id);
      res.json(asset);
    },
    update: async (req, res) => {
      const assets = await pokemonsService.update(req.params.id, req.body);
      res.json(assets);
    }
  };
};

module.exports = makeInvoker(PokemonsController);
