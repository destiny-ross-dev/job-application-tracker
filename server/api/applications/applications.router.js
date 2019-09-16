const express = require("express");
const router = express.Router();

const { getRecent } = require(`./applications.controller`);

router.get("/recent", getRecent);

module.exports = router;
