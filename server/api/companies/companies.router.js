const { Router } = require("express");
const { getAllCompanies } = require("./companies.controller");

const router = Router();

// applications
router
  .route("/")
  // GET
  .get(getAllCompanies);
// POST
//   .post(addCompany)
// PUT
//   .put(updateCompany);

// router.route("/:id").get(getCompanyById);

module.exports = router;
