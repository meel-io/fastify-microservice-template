const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PokemonsDefinition = {
  name: {
    type: String,
    require: true
  },
  types: {
    type: [String],
    require: true
  },
  number: {
    type: Number,
    require: true
  }
};

const PokemonsSchema = new mongoose.Schema(PokemonsDefinition, {
  versionKey: false,
  minimize: false,
  strict: true
});

PokemonsSchema.index({ name: 1 });

PokemonsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Pokemons", PokemonsSchema);
