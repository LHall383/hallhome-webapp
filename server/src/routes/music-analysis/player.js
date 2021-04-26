const express = require("express");
const authData = require("../../data/music-analysis/auth");
const playerRequests = require("../../requests/music-analysis/player");

const router = express.Router();

router
  /**
   * Get recently played tracks
   */
  .get("/recently-played", async (req, res) => {
    const accessToken = await authData.getToken(req.query.code);
    if (!accessToken) {
      res.json(undefined);
      return;
    }

    if (req.query.before) {
      const trackData = await playerRequests.getPlayedBefore(
        accessToken,
        req.query.limit,
        req.query.before
      );
      res.json(trackData);
    } else if (req.query.after) {
      const trackData = await playerRequests.getPlayedAfter(
        accessToken,
        req.query.limit,
        req.query.after
      );
      res.json(trackData);
    } else {
      const trackData = await playerRequests.getPlayed(
        accessToken,
        req.query.limit
      );
      res.json(trackData);
    }
  });

module.exports = router;
