const {
  sequelize,
  Business,
  Photo,
  Review,
  User,
} = require("../lib/sequelizePool");

const businesses = require("../data/businesses");
const reviews = require("../data/reviews");
const photos = require("../data/photos");

async function dropTablesAndCreate() {
  return sequelize.sync({ force: true });
}

async function populateDatabase() {
  // Create a bunch of users
  for (let i = 0; i < 50; i++) {
    await User.create({});
  }

  // Add all businesses
  for (let business of businesses) {
    await Business.create(business);
  }

  // Add reviews
  for (let review of reviews) {
    await Review.create(review);
  }

  // Add photos
  for (let photo of photos) {
    await Photo.create(photo);
  }
}

module.exports = { dropTablesAndCreate, populateDatabase };
