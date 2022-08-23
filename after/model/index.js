const Sequelize = require("sequelize");
const config = require("../config/cofig");
const User = require("./users");

const sequelize = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

const db = {};
db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;
