const express = require("express");
const authorizationRequests = require("../../requests/music-analysis/authorization/authorization");
const authorizationData = require("../../data/music-analysis/auth");
const publicUserRequests = require("../../requests/music-analysis/user-profiles-api/publicUser");
const privateUserRequests = require("../../requests/music-analysis/user-profiles-api/privateUser");

const router = express.Router();

router
  /**
   * Get public user information based on spotify username
   * Params:
   *    username - the username of the user to get data for
   */
  .get("/public", async (req, res) => {
    console.log("\n\n Public user data for: " + req.query.username);
    const authData = await authorizationRequests.getClientCredentials();
    const userData = await publicUserRequests.getUserPublic(
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

    const accessToken = authorizationData.getToken(req.query.code);

    if (accessToken) {
      console.log(accessToken);
      const userData = await privateUserRequests.getUserPrivate(accessToken);
      res.status(200).json(userData);
    } else {
      res.status(400).json(undefined);
    }
  });

module.exports = router;
