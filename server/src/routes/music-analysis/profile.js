const express = require("express");
const authRequests = require("../../requests/music-analysis/auth");
const authData = require("../../data/music-analysis/auth");
const profileRequests = require("../../requests/music-analysis/profile");

const router = express.Router();

router
  /**
   * Get public user information based on spotify username
   * Params:
   *    username - the username of the user to get data for
   */
  .get("/public", async (req, res) => {
    console.log("\n\n Public user data for: " + req.query.username);
    const authData = await authRequests.getClientCredentials();
    const userData = await profileRequests.getUserPublic(
      req.query.username,
      authData.access_token
    );
    res.json(userData);
  })
  /**
   * Get private user information using the token provided to this endpoint
   * Params:
   *    code - The code provided upon user authentication, used to map to the
   *           actual auth token
   */
  .get("/private", async (req, res) => {
    console.log("\n\n Private user data for: " + req.query.code);

    const accessToken = await authData.getToken(req.query.code);

    if (accessToken) {
      const userData = await profileRequests.getUserPrivate(accessToken);
      res.status(200).json(userData);
    } else {
      res.status(400).json(undefined);
    }
  });

module.exports = router;
