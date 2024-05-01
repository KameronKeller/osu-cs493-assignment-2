const router = require("express").Router();
const {
  validateAgainstSchema,
  extractValidFields,
} = require("../lib/validation");

const photos = require("../data/photos");
const { Photo } = require("../lib/sequelizePool");

exports.router = router;
exports.photos = photos;

/*
 * Schema describing required/optional fields of a photo object.
 */
const photoSchema = {
  userid: { required: true },
  businessid: { required: true },
  caption: { required: false },
};

/*
 * Route to create a new photo.
 */
router.post("/", async function (req, res) {
  if (validateAgainstSchema(req.body, photoSchema)) {
    const photo = extractValidFields(req.body, photoSchema);
    const newPhoto = await Photo.create(photo);
    res.status(201).json({
      id: newPhoto.id,
      links: {
        photo: `/photos/${newPhoto.id}`,
        business: `/businesses/${newPhoto.businessid}`,
      },
    });
  } else {
    res.status(400).json({
      error: "Request body is not a valid photo object",
    });
  }
});

/*
 * Route to fetch info about a specific photo.
 */
router.get("/:photoID", async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  const photo = await Photo.findByPk(photoID);
  if (photo !== null) {
    res.status(200).json(photo);
  } else {
    next();
  }
});

/*
 * Route to update a photo.
 */
router.put("/:photoID", async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);

  const photo = await Photo.findByPk(photoID);
  if (photo !== null) {
    if (validateAgainstSchema(req.body, photoSchema)) {
      /*
       * Make sure the updated photo has the same businessid and userid as
       * the existing photo.
       */
      const updatedPhoto = extractValidFields(req.body, photoSchema);
      const existingPhoto = photo;
      if (
        existingPhoto &&
        updatedPhoto.businessid === existingPhoto.businessid &&
        updatedPhoto.userid === existingPhoto.userid
      ) {
        await photo.update(updatedPhoto);
        res.status(200).json({
          links: {
            photo: `/photos/${photo.id}`,
            business: `/businesses/${photo.businessid}`,
          },
        });
      } else {
        res.status(403).json({
          error: "Updated photo cannot modify businessid or userid",
        });
      }
    } else {
      res.status(400).json({
        error: "Request body is not a valid photo object",
      });
    }
  } else {
    next();
  }
});

/*
 * Route to delete a photo.
 */
router.delete("/:photoID", async function (req, res, next) {
  const photoID = parseInt(req.params.photoID);
  const affectedCount = await Photo.destroy({
    where: {
      id: photoID,
    },
  });
  if (affectedCount > 0) {
    res.status(204).end();
  } else {
    next();
  }
});
