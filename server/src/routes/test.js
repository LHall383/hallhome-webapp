const express = require("express");
const authorizationRequests = require("../requests/music-analysis/authorization/authorization");

const router = express.Router();

router
  .get("/", (req, res) => {
    console.log("\n\n Test route");
    res.json({ message: "Hello from server!" });
  })
  .get("/cc-auth", async (req, res) => {
    console.log("\n\n Client credentials auth test");
    const authData = await authorizationRequests.getClientCredentials();
    res.json(authData);
  });

module.exports = router;
