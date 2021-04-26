const express = require("express");
const authorizationRequests = require("../../requests/music-analysis/auth");
const authorizationData = require("../../data/music-analysis/auth");

const router = express.Router();

router
  /**
   * Check if the code maps to valid auth token
   * Params:
   *    code - code provided by Spotify from user authentication
   */
  .get("/is-code-valid", async (req, res) => {
    const accessToken = await authorizationData.getToken(req.query.code);

    if (accessToken) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  })
  /**
   * Sumbit code provided by Spotify to create access_token and refresh_token
   * Params:
   *    code         - code provided by Spotify from user authentication
   *    redirect_uri - the URI used for the redirect in the inital request
   */
  .get("/submit-code", async (req, res) => {
    const authData = await authorizationRequests.getAuthorizationCode(
      req.query.code,
      req.query.redirect_uri
    );

    if (authData) {
      authorizationData.setAuthData(req.query.code, authData);
      res.status(200).json({});
    } else {
      res.status(400).json({});
    }
  });

module.exports = router;
