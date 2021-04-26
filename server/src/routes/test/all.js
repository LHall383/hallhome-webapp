const express = require("express");
const authRequests = require("../../requests/music-analysis/auth");

const router = express.Router();

router
  .get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  })
  .get("/cc-auth", async (req, res) => {
    const authData = await authRequests.getClientCredentials();
    if (!authData) {
      res.json(undefined);
      return;
    }
    res.json(authData);
  });

module.exports = router;
