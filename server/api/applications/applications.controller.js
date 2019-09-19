const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const config = require("../../config");

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

module.exports = { getRecent, getStatsForDash };
