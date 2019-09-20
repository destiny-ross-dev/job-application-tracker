const express = require("express");
const router = express.Router();

const {
  getRecent,
  getStatsForDash,
  getApplicationsForTable
} = require(`./applications.controller`);

router.get("/recent", getRecent);
router.get("/stats", getStatsForDash);
router.get("/table", getApplicationsForTable);

module.exports = router;
