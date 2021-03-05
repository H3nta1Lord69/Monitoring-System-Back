// Calling the file with the information of the database
const dbConfig = require("../config/db.config.js");
// Sequelize to made the connection to the DB
const Sequelize = require("sequelize");
// Object to get the MYSQL connection
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Invoke the models for the database
db.monitor = require("./monitor.model.js")(sequelize, Sequelize);
db.monitoring = require("./monitoring.model.js")(sequelize, Sequelize);

module.exports = db;