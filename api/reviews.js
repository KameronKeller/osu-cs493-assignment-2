const router = require("express").Router();
const {
  validateAgainstSchema,
  extractValidFields,
} = require("../lib/validation");

const { Review } = require("../lib/sequelizePool");

exports.router = router;

/*
 * Schema describing required/optional fields of a review object.
 */
const reviewSchema = {
  userid: { required: true },
  businessid: { required: true },
  dollars: { required: true },
  stars: { required: true },
  review: { required: false },
};

/*
 * Route to create a new review.
 */
router.post("/", async function (req, res) {
  if (validateAgainstSchema(req.body, reviewSchema)) {
    const review = extractValidFields(req.body, reviewSchema);

    /*
     * Make sure the user is not trying to review the same business twice.
     */
    const existingReview = await Review.findOne({
      where: { userid: review.userid, businessid: review.businessid },
    });

    if (existingReview !== null) {
      res.status(403).json({
        error: "User has already posted a review of this business",
      });
    } else {
      const newReview = await Review.create(review);
      res.status(201).json({
        id: newReview.id,
        links: {
          review: `/reviews/${newReview.id}`,
          business: `/businesses/${newReview.businessid}`,
        },
      });
    }
  } else {
    res.status(400).json({
      error: "Request body is not a valid review object",
    });
  }
});

/*
 * Route to fetch info about a specific review.
 */
router.get("/:reviewID", async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  const review = await Review.findByPk(reviewID);
  if (review !== null) {
    res.status(200).json(review);
  } else {
    next();
  }
});

/*
 * Route to update a review.
 */
router.put("/:reviewID", async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);

  const review = await Review.findByPk(reviewID);
  if (review !== null) {
    if (validateAgainstSchema(req.body, reviewSchema)) {
      /*
       * Make sure the updated review has the same businessid and userid as
       * the existing review.
       */
      let updatedReview = extractValidFields(req.body, reviewSchema);
      let existingReview = review;
      if (
        updatedReview.businessid === existingReview.businessid &&
        updatedReview.userid === existingReview.userid
      ) {
        // reviews[reviewID] = updatedReview;
        // reviews[reviewID].id = reviewID;
        await review.update(updatedReview);
        res.status(200).json({
          links: {
            review: `/reviews/${review.id}`,
            business: `/businesses/${review.businessid}`,
          },
        });
      } else {
        res.status(403).json({
          error: "Updated review cannot modify businessid or userid",
        });
      }
    } else {
      res.status(400).json({
        error: "Request body is not a valid review object",
      });
    }
  } else {
    next();
  }
});

/*
 * Route to delete a review.
 */
router.delete("/:reviewID", async function (req, res, next) {
  const reviewID = parseInt(req.params.reviewID);
  const affectedCount = await Review.destroy({
    where: {
      id: reviewID,
    },
  });
  if (affectedCount > 0) {
    res.status(204).end();
  } else {
    next();
  }
});
