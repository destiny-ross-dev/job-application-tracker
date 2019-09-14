const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
const fs = require("fs");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}

const register = async (req, res) => {
  //   const newUser = {
  //     firstname: "Destiny",
  //     lastname: "Ross",
  //     email: "destinyleaross@gmail.com",
  //     sub: "google-oauth2|116231452945390881202",
  //     picture:
  //       "https://vignette.wikia.nocookie.net/gameofthrones/images/a/ab/Arya-Stark.jpg/revision/latest?cb=20160918165450&path-prefix=tr"
  //   };
  //   res.status(200).json(newUser);

  const db = req.app.get("db");
  const { email, password, firstname, lastname } = req.body;
  try {
    const hashpass = await argon2.hash(password);

    const dbResponse = await db.auth.register(
      uuid(),
      email,
      firstname,
      lastname,
      hashpass
    );
    console.log(dbResponse);
    fs.mkdir(`./public/${email}`, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("Directory created successfully!");
    });
    const token = jwtSignUser(dbResponse[0]);
    res.cookie("user", {
      token,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    });
    res.status(201).json({ user: dbResponse[0], token });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res) => {
  const db = req.app.get("db");
  const { email, password } = req.body;
  //   try {
  try {
    let userObj = await db.auth.get_user(email);

    if (!userObj[0]) {
      return res.status(403).send({ error: "No user with this email." });
    }

    const isPasswordValid = await argon2.verify(userObj[0].hashpass, password);

    if (!isPasswordValid) {
      return res.status(403).send({ error: "Password was incorrect." });
    }

    // sanitize
    delete userObj[0].hashpass;

    //sign token
    let token = jwtSignUser(userObj[0]);

    // Create a cookie to send on response
    res.cookie("user", {
      token,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 year cookie
    });

    res.status(200).json({
      user: userObj[0],
      token
    });
  } catch (e) {
    console.log(e);
  }
};

const me = async (req, res) => {
  const tokenToVerify = req.cookies.user.token;
  console.log(tokenToVerify);

  jwt.verify(tokenToVerify, process.env.JWT_SECRET, function(err, decoded) {
    console.log(decoded);

    res.status(200).json({
      user: decoded,
      token: req.cookies.user.token
    });
  });
};
module.exports = { login, register, me };
