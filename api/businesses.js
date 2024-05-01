const router = require("express").Router();
const {
  validateAgainstSchema,
  extractValidFields,
} = require("../lib/validation");

const businesses = require("../data/businesses");
const { Business, Review, Photo } = require("../lib/sequelizePool");

exports.router = router;
exports.businesses = businesses;

/*
 * Schema describing required/optional fields of a business object.
 */
const businessSchema = {
  ownerid: { required: true },
  name: { required: true },
  address: { required: true },
  city: { required: true },
  state: { required: true },
  zip: { required: true },
  phone: { required: true },
  category: { required: true },
  subcategory: { required: true },
  website: { required: false },
  email: { required: false },
};

/*
 * Route to return a list of businesses.
 */
router.get("/", async function (req, res) {
  /*
   * Compute page number based on optional query string parameter `page`.
   * Make sure page is within allowed bounds.
   */
  let page = parseInt(req.query.page) || 1;
  const numPerPage = 10;
  const { count, rows } = await Business.findAndCountAll({
    limit: numPerPage,
    offset: page,
    include: [
      { model: Review, required: false },
      { model: Photo, required: false },
    ],
  });
  const lastPage = Math.ceil(count / numPerPage);
  page = page > lastPage ? lastPage : page;
  page = page < 1 ? 1 : page;

  /*
   * Generate HATEOAS links for surrounding pages.
   */
  const links = {};
  if (page < lastPage) {
    links.nextPage = `/businesses?page=${page + 1}`;
    links.lastPage = `/businesses?page=${lastPage}`;
  }
  if (page > 1) {
    links.prevPage = `/businesses?page=${page - 1}`;
    links.firstPage = "/businesses?page=1";
  }

  /*
   * Construct and send response.
   */
  res.status(200).json({
    businesses: rows,
    pageNumber: page,
    totalPages: lastPage,
    pageSize: numPerPage,
    totalCount: businesses.length,
    links: links,
  });
});

/*
 * Route to create a new business.
 */
router.post("/", async function (req, res) {
  if (validateAgainstSchema(req.body, businessSchema)) {
    const business = extractValidFields(req.body, businessSchema);
    const newBusiness = await Business.create(business);
    res.status(201).json({
      id: newBusiness.id,
      links: {
        business: `/businesses/${newBusiness.id}`,
      },
    });
  } else {
    res.status(400).json({
      error: "Request body is not a valid business object",
    });
  }
});

/*
 * Route to fetch info about a specific business.
 */
router.get("/:businessid", async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  const business = await Business.findByPk(businessid, {
    include: [
      { model: Review, required: false },
      { model: Photo, required: false },
    ],
  });
  if (business !== null) {
    res.status(200).json(business);
  } else {
    next();
  }
});

/*
 * Route to replace data for a business.
 */
router.put("/:businessid", async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  let affectedCount;
  if (validateAgainstSchema(req.body, businessSchema)) {
    [affectedCount] = await Business.update(req.body, {
      where: {
        id: businessid,
      },
    });
  } else {
    res.status(400).json({
      error: "Request body is not a valid business object",
    });
  }
  if (affectedCount > 0) {
    res.status(200).json({
      links: {
        business: `/businesses/${businessid}`,
      },
    });
  } else {
    next();
  }
});

/*
 * Route to delete a business.
 */
router.delete("/:businessid", async function (req, res, next) {
  const businessid = parseInt(req.params.businessid);
  const affectedCount = await Business.destroy({
    where: {
      id: businessid,
    },
  });
  if (affectedCount > 0) {
    res.status(204).end();
  } else {
    next();
  }
});
