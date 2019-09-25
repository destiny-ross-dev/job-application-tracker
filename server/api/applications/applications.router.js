const express = require("express");
const router = express.Router();

const {
  getRecent,
  getStatsForDash,
  getApplicationsForTable,
  createApplication
} = require(`./applications.controller`);

router.get("/recent", getRecent);
router.get("/stats", getStatsForDash);
router.get("/table", getApplicationsForTable);
router.post("/new", createApplication);

module.exports = router;
