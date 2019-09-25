const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/" + req.session.userid);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).array("files");

const getRecent = async (req, res) => {
  const db = req.app.get("db");
  const userid = await jwt.verify(
    req.cookies.user.token,
    config.secrets.jwt,
    function(err, decoded) {
      if (err) console.log(err);
      return decoded.user_id;
    }
  );
  try {
    const response = await db.applications.get_most_recent(userid);
    console.log(response);
    res.status(200).json({ mostRecent: response });
  } catch (e) {
    console.log(e);
  }
};

const getStatsForDash = async (req, res) => {
  const db = req.app.get("db");
  const userid = await jwt.verify(
    req.cookies.user.token,
    config.secrets.jwt,
    function(err, decoded) {
      if (err) console.log(err);
      return decoded.user_id;
    }
  );

  try {
    const stats = await db.applications.get_dashboard_stats(userid);
    console.log(stats);
    res.status(200).json(stats[0]);
  } catch (e) {
    console.log(e);
  }
};
const getApplicationsForTable = async (req, res) => {
  const db = req.app.get("db");
  let { limit, offset } = req.query;
  console.log("before null checks", limit, offset);

  !limit ? (limit = 10) : null;
  !offset ? (offset = 0) : null;
  try {
    const response = await db.applications.get_applications_for_table(
      limit,
      offset
    );
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
  }
};

const createApplication = async (req, res) => {
  const db = req.app.get("db");

  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    // No Upload err
    const { applicationData } = req.body;
    // const { files } = req.files;
    console.log(applicationData);

    const bd = JSON.parse(applicationData);
    try {
      let response = await db.applications.add_application(
        bd.company,
        bd.city,
        bd.state,
        bd.position,
        bd.linkToPosting,
        bd.datePosted,
        bd.dateApplied,
        bd.contactName,
        bd.contactPosition,
        bd.contactEmail,
        bd.contactPhone,
        req.files[0].originalname,
        req.files[1].originalname
      );

      res.status(200).send(response);
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = {
  getRecent,
  getStatsForDash,
  getApplicationsForTable,
  createApplication
};
