const fastify = require("fastify");
const cors = require("fastify-cors");
const compress = require("fastify-compress");

class Server {
  constructor({ config, router }) {
    this.config = config;
    this.fastify = fastify({
      logger: true
    });

    this.fastify.register(cors);
    this.fastify.register(compress);

    this.fastify.register(router);
  }

  start() {
    return new Promise((resolve, reject) => {
      this.fastify.listen(this.config.web.port, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Server;
