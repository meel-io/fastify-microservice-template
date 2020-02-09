exports.EntityNotFoundError = class EntityNotFoundError extends Error {
  constructor(data) {
    this.name = "EntityNotFoundError";
    this.message = `Entity ${JSON.stringify(data)} not found`;
    this.stack = data;
    this.statusCode = 404;
  }
};

exports.EntityExistsUnprocessableEntityError = class EntityExistsUnprocessableEntityError extends Error {
  constructor(data) {
    this.name = "EntityExistsUnprocessableEntityError";
    this.message = `Entity ${JSON.stringify(data)} not found`;
    this.stack = data;
    this.statusCode = 422;
  }
};
