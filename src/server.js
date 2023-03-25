/* eslint-disable no-console */
const app = require("./app");
const dbContext = require("./db/mysql");
const { PORT, NODE_ENV } = require("./config");
global.db = dbContext.getContext();
app.listen(PORT, () => {
  console.log(
    `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`
  );
});
