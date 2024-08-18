require("dotenv").config();
const nodeEnv = process.env.NODE_ENV;

require("dotenv").config({
  path: `.env.${nodeEnv}`,
});

console.log("ENV:::", nodeEnv, " PORT:::", process.env.PORT);
const PORT = process.env.PORT || 3055;

const app = require("./src/app.js");
const server = app.listen(PORT, () => {
  console.log(
    `------::----${process.env.SERVICE_NAME} start with port ${PORT}`
  );
});
process.on("SIGINT", () => {
  server.close("Exit server express");
});
