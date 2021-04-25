const express = require("express");
const authRequests = require("../../requests/music-analysis/auth");

const router = express.Router();

router
  .get("/", (req, res) => {
    console.log("\n\n Test route");
    res.json({ message: "Hello from server!" });
  })
  .get("/cc-auth", async (req, res) => {
    console.log("\n\n Client credentials auth test");
    const authData = await authRequests.getClientCredentials();
    res.json(authData);
  });

module.exports = router;
