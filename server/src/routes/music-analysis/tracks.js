const express = require("express");
const authRequests = require("../../requests/music-analysis/auth");
const tracksRequests = require("../../requests/music-analysis/tracks");

const router = express.Router();

router
  /**
   * Get detailed track information based on track ID
   * Params:
   *     trackIds - list of ids to retreive data for
   */
  .get("/", async (req, res) => {
    const authData = await authRequests.getClientCredentials();
    const trackData = await tracksRequests.getTracks(
      req.query.trackIds,
      authData.access_token
    );

    res.json(trackData);
  });

module.exports = router;
