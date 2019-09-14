const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const logger = require("morgan-body");
const massive = require("massive");
const config = require("./config");

const globalMiddleware = app => {
  // parses url-encoded data (parameters) with the querystring library when true.
  app.use(bodyParser.urlencoded({ extended: false }));

  // Parses req.body, making it readable on the request object
  app.use(bodyParser.json());

  // Parses cookies
  app.use(cookieParser());

  // Enables Cross Origin Resource Sharing
  app.use(cors());

  //Logging middleware for request and response bodies
  logger(app);

  app.use(
    session({
      store: new pgSession({
        conString: config.db
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000000 * 60 * 60 * 24 * 14
      }
    })
  );
};

const connect = app => {
  massive(config.db)
    .then(db => {
      app.set("db", db);
    })
    .catch(err => console.log(err));
};

module.exports = { globalMiddleware, connect };
