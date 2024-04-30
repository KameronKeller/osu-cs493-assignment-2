const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');

const businesses = require('../data/businesses');
const { reviews } = require('./reviews');
const { photos } = require('./photos');
const mysqlPool = require('../lib/mysqlPool');

exports.router = router;
exports.businesses = businesses;


/*
 * A test function
 */
router.get('/test', async function (req, res) {
  const [ results ] = await mysqlPool.query(
    "SELECT COUNT(*) AS count FROM lodgings"
  );
  console.log("== results", results);

});