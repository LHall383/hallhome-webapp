const express = require("express");

const auth = require("./music-analysis/auth");
const player = require("./music-analysis/player");
const profile = require("./music-analysis/profile");
const top = require("./music-analysis/top");
const tracks = require("./music-analysis/tracks");

const router = express.Router();

router
  .use("/auth", auth)
  .use("/player", player)
  .use("/profile", profile)
  .use("/top", top)
  .use("/tracks", tracks);

module.exports = router;
