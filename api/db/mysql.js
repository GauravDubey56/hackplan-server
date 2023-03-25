const knexConfig = require("./knexfile").development;

var dbContext = {
  knex: null,
  getContext: function () {
    knex = require("knex")(knexConfig);
    return knex;
  },
  destroyContext: function () {
    // knex.destroy();
    console.log("Distroy end.");
  },
};

module.exports = dbContext;
