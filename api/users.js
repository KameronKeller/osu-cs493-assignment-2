const router = require("express").Router();

exports.router = router;

const { Business, Review, Photo } = require("../lib/sequelizePool");

/*
 * Route to list all of a user's businesses.
 */
router.get("/:userid/businesses", async function (req, res) {
  const userid = parseInt(req.params.userid);
  const userBusinesses = await Business.findAll({
    where: {
      ownerid: userid,
    },
  });
  res.status(200).json({
    businesses: userBusinesses,
  });
});

/*
 * Route to list all of a user's reviews.
 */
router.get("/:userid/reviews", async function (req, res) {
  const userid = parseInt(req.params.userid);
  const userReviews = await Review.findAll({
    where: {
      userid: userid,
    },
  });
  res.status(200).json({
    reviews: userReviews,
  });
});

/*
 * Route to list all of a user's photos.
 */
router.get("/:userid/photos", async function (req, res) {
  const userid = parseInt(req.params.userid);
  const userPhotos = await Photo.findAll({
    where: {
      userid: userid,
    },
  });
  res.status(200).json({
    photos: userPhotos,
  });
});
