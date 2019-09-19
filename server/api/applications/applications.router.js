const express = require("express");
const router = express.Router();

const { getRecent, getStatsForDash } = require(`./applications.controller`);

router.get("/recent", getRecent);
router.get("/stats", getStatsForDash);

module.exports = router;
