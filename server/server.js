const express = require("express");
const config = require("./config");
const { globalMiddleware, connect } = require("./middleware");
const authRouter = require("./api/auth/auth.router");

// Initializes express server
const app = express();

// Global middleware
globalMiddleware(app);

app.use("/auth", authRouter);

const start = async () => {
  console.log(config);
  try {
    await connect(app);
    app.listen(config.port, () => {
      console.log(`Rest api on http://localhost:${config.port}/`);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = start;
