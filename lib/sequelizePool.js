const { Sequelize } = require('sequelize');

const mysqlHost = process.env.MYSQL_HOST || 'localhost';
const mysqlPort = process.env.MYSQL_PORT || '3306';
const mysqlDB = process.env.MYSQL_DB;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const maxMySQLConnections = 10;

const sequelize = new Sequelize(mysqlDB, mysqlUser, mysqlPassword, {
    host: mysqlHost,
    port: mysqlPort,
    dialect: 'mysql',
    pool: {
        max: maxMySQLConnections
    }
});

module.exports = sequelize;