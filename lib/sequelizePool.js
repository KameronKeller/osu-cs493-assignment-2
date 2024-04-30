const { Sequelize } = require('sequelize');
const businessModel = require('./sequelizeModels.js/business');
const photoModel = require('./sequelizeModels.js/photo');
const reviewModel = require('./sequelizeModels.js/review');
const userModel = require('./sequelizeModels.js/user');

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
    },
    logging: true
});

/*
DEFINE MODELS
*/
const User = sequelize.define("User", userModel);
const Business = sequelize.define("Business", businessModel);
const Photo = sequelize.define("Photo", photoModel);
const Review = sequelize.define("Review", reviewModel);

/*
DEFINE ASSOCIATIONS
*/

// a user has many reviews
User.hasMany(Review, { foreignKey: 'userid' })
// a review belongs to a single user
Review.belongsTo(User, { foreignKey: 'userid' })

// a user has many photos
User.hasMany(Photo, { foreignKey: 'userid' })
// a photo belongs to a single user
Photo.belongsTo(User, { foreignKey: 'userid' })

// a user has many businesses
User.hasMany(Business, {
    foreignKey: 'ownerid'
})
// a business belongs to a single owner
Business.belongsTo(User, { foreignKey: 'ownerid' })

// a business has many photos
Business.hasMany(Photo, { foreignKey: 'businessid' })
// a photo belongs to a single business
Photo.belongsTo(Business, { foreignKey: 'businessid' })

// a business has many reviews
Business.hasMany(Review, { foreignKey: 'businessid' })
// a review belongs to a single business
Review.belongsTo(Business, { foreignKey: 'businessid' });

module.exports = {
    sequelize,
    Business,
    Photo,
    Review,
    User
};