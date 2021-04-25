const express = require("express");
const authorizationRequests = require("../../requests/music-analysis/authorization/authorization");
const getTracksRequests = require("../../requests/music-analysis/tracks-api/getTracks");

const router = express.Router();

router
  /**
   * Get detailed track information based on track ID
   * Params:
   *     trackIds - list of ids to retreive data for
   */
  .get("/", async (req, res) => {
    console.log("\n\n Track information for: " + req.query.trackIds);

    const authData = await authorizationRequests.getClientCredentials();
    const trackData = await getTracksRequests.getTracks(
      req.query.trackIds,
      authData.access_token
    );

    res.json(trackData);
  });

module.exports = router;
