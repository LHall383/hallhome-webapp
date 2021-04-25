const express = require("express");

const auth = require("./auth");
const player = require("./player");
const profile = require("./profile");
const top = require("./top");
const tracks = require("./tracks");

const router = express.Router();

router
  .use("/auth", auth)
  .use("/player", player)
  .use("/profile", profile)
  .use("/top", top)
  .use("/tracks", tracks);

module.exports = router;
