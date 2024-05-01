const express = require('express');
const morgan = require('morgan');

const api = require('./api');
// const sequelize = require('./lib/sequelizePool');
const { dropTablesAndCreate, populateDatabase } = require('./lib/sequelizeFns');
const { sequelize } = require('./lib/sequelizePool');

const app = express();
const port = process.env.PORT || 8000;

// DEV_MODE = true means tables are dropped, recreated, and filled with sample
// data on server restart
const DEV_MODE = true;

// populate database with fake data when in dev mode
const FAKE_DATA = true;

/*
 * Morgan is a popular logger.
 */
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('public'));

/*
 * All routes for the API are written in modules in the api/ directory.  The
 * top-level router lives in api/index.js.  That's what we include here, and
 * it provides all of the routes.
 */
app.use('/', api);

app.use('*', function (req, res, next) {
  res.status(404).json({
    error: "Requested resource " + req.originalUrl + " does not exist"
  });
});

/*
 * This route will catch any errors thrown from our API endpoints and return
 * a response with a 500 status to the client.
 */
app.use('*', function (err, req, res, next) {
  console.error("== Error:", err)
  res.status(500).send({
      err: "Server error.  Please try again later."
  })
})

app.listen(port, async function() {
  console.log("== Server is running on port", port);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    if (DEV_MODE) {
      await dropTablesAndCreate();
      console.log("Tables dropped and recreated.")
      if (FAKE_DATA) {
        await populateDatabase();
        console.log("Database populated");
      }
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

module.exports = app;