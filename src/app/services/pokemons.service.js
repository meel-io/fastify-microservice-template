const { deepParseJson } = require("deep-parse-json");
const { search } = require("../../../config");
const { objectToDotNotation } = require("../../helpers");
const {
  EntityNotFoundError,
  EntityExistsUnprocessableEntityError
} = require("../errors");

module.exports = class PokemonsService {
  constructor(deps) {
    this.Model = deps.PokemonsModel;
  }
  async get(id) {
    const modelObject = await this.Model;
    const obtained = await modelObject.findOne({ _id: id });
    if (!obtained) {
      throw new EntityNotFoundError(id);
    }
    return obtained;
  }

  async search({
    select,
    populate,
    page,
    limit,
    sortField,
    sortDirection,
    querySearch,
    queryParams
  }) {
    const modelObject = await this.Model;
    const options = {
      select: select || "",
      populate: populate || [],
      page: page || search.pageOptions.page,
      limit: limit || search.pageOptions.limit,
      sort: sortField
        ? { [sortField]: sortDirection || search.pageOptions.sort.key }
        : search.pageOptions.sort
    };
    const queryObject = querySearch
      ? deepParseJson(querySearch)
      : deepParseJson(queryParams);
    return modelObject.paginate({ ...queryObject }, options);
  }

  async create(nodeData) {
    let nodeCreated = null;
    try {
      const modelObject = await this.Model;
      const data = {
        ...nodeData
      };
      nodeCreated = await modelObject.create(data);
    } catch (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        // ID already exists
        throw new EntityExistsUnprocessableEntityError(nodeData);
      }
      throw error;
    }

    return nodeCreated;
  }

  async delete(id) {
    const modelObject = await this.Model;

    let deleted = false;

    const result = await modelObject.deleteOne({ _id: id }).lean();
    deleted = { id, deleted: result.n > 0 };

    return deleted;
  }

  async update(id, nodeData) {
    const modelObject = await this.Model;

    const updated = await modelObject
      .findOneAndUpdate(
        { _id: id },
        { $set: objectToDotNotation(nodeData) },
        { new: true }
      )
      .catch(e => {
        throw e;
      });

    if (!updated) {
      throw new EntityNotFoundError(id);
    }

    return updated;
  }
};
