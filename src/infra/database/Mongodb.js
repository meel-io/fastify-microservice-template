const mongoose = require("mongoose");
const { db } = require("../../../config");

mongoose.set("bufferCommands", false);
mongoose.Promise = global.Promise;

module.exports = {
  async start() {
    try {
      await mongoose.connect(db.url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.info("Database connected succesfully");
    } catch (error) {
      console.log(error);
      throw new Error("Database failed to connect");
    }
  },

  stop() {
    mongoose.connection.close();
  }
};
