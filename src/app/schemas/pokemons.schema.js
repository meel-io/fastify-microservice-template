const add = {
  body: {
    type: "object",
    required: ["name", "number", "types"],
    properties: {
      name: { type: "string" },
      number: { type: "integer" },
      types: {
        type: "array",
        maxItems: 5,
        items: { type: "string" }
      }
    }
  },
  headers: {
    type: "object",
    properties: {
      "x-accountid": { type: "string" }
    },
    required: ["x-accountid"]
  }
};

const search = {
  querystring: {
    type: "object",
    properties: {
      select: { type: "string" },
      populate: { type: "array", items: { type: "string" } },
      page: { type: "number" },
      limit: { type: "number" },
      sortField: { type: "string" },
      sortDirection: { type: "number" },
      queryParams: { type: "object" }
    }
  },
  headers: {
    type: "object",
    properties: {
      "x-accountid": { type: "string" }
    },
    required: ["x-accountid"]
  }
};

const update = {
  body: {
    type: "object",
    required: ["name", "number", "types"],
    properties: {
      name: { type: "string" },
      number: { type: "integer" },
      types: {
        type: "array",
        maxItems: 5,
        items: { type: "string" }
      }
    }
  },
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  },
  headers: {
    type: "object",
    properties: {
      "x-accountid": { type: "string" }
    },
    required: ["x-accountid"]
  }
};

const get = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  },
  headers: {
    type: "object",
    properties: {
      "x-accountid": { type: "string" }
    },
    required: ["x-accountid"]
  }
};

const remove = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" }
    }
  },
  headers: {
    type: "object",
    properties: {
      "x-accountid": { type: "string" }
    },
    required: ["x-accountid"]
  }
};

module.exports = {
  add,
  update,
  get,
  search,
  remove
};
