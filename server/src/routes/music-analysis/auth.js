const express = require("express");
const authorizationRequests = require("../../requests/music-analysis/authorization/authorization");
const authorizationData = require("../../data/music-analysis/auth");

const router = express.Router();

router
  /**
   * Check if the code maps to valid auth token
   * Params:
   *    code - code provided by Spotify from user authentication
   */
  .get("/isCodeValid", async (req, res) => {
    console.log("\n\n Check if code has valid token: " + req.query.code);

    const accessToken = authorizationData.getToken(req.query.code);

    if (accessToken) {
      console.log(accessToken);
      res.status(200).json({ valid: true });
    } else {
      console.log("Not valid");
      res.status(200).json({ valid: false });
    }
  })
  /**
   * Sumbit code provided by Spotify to create access_token and refresh_token
   * Params:
   *    code         - code provided by Spotify from user authentication
   *    redirect_uri - the URI used for the redirect in the inital request
   */
  .get("/authCodeSubmit", async (req, res) => {
    console.log("\n\n Submit auth code for token, code: " + req.query.code);
    console.log(req.query.redirect_uri);
    const authData = await authorizationRequests.getAuthorizationCode(
      req.query.code,
      req.query.redirect_uri
    );

    console.log(authData);

    if (authData) {
      authorizationData.setAuthData(req.query.code, authData);

      res.status(200).json({});
    } else {
      res.status(400).json({});
    }
  });

module.exports = router;
