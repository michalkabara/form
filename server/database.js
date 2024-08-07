const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  dialect: "sqlite",
  host: "./dev.sqlite",
});

module.exports = sequelize;
