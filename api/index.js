require("dotenv").config();
const dbContext = require("./db/mysql");
const { PORT, NODE_ENV } = require("./config");
global.db = dbContext.getContext();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const morganOption = process.env.NODE_ENV === "production" ? "tiny" : "common";

// set up middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

global.validator = require("./middleware/joi-validator");
// import routers
require('./routers').map(ele => {
  app.use(ele.url, ele.router);
})
// list endpoints by default


// error handling
// eslint-disable-next-line no-unused-vars
// const errorHandler = (error, req, res, next) => {
//   let response;
//   if (NODE_ENV === "production") {
//     response = { error: { message: "Server error" } };
//   } else {
//     response = { message: error.message, error };
//   }

//   return res.status(500).json(response);
// };

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`
  );
});

module.exports = app;
