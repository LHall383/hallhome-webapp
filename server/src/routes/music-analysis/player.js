const express = require("express");
const authorizationData = require("../../data/music-analysis/auth");

const router = express.Router();

router
  /**
   * Get recently played tracks
   */
  .get("/recently-played", async (req, res) => {
    console.log(
      "\n\n Recently played tracks " + (req.query.before || req.query.after)
        ? req.query.before
          ? `before ${req.query.before}`
          : `after ${req.query.after}`
        : ""
    );

    const accessToken = authorizationData.getToken(req.query.code);
    if (!accessToken) {
      res.json(undefined);
      return;
    }

    if (req.query.before) {
      const trackData = await recentlyPlayed.getPlayedBefore(
        accessToken,
        req.query.limit,
        req.query.before
      );
      res.json(trackData);
    } else if (req.query.after) {
      const trackData = await recentlyPlayed.getPlayedAfter(
        accessToken,
        req.query.limit,
        req.query.after
      );
      res.json(trackData);
    } else {
      const trackData = await recentlyPlayed.getPlayed(
        accessToken,
        req.query.limit
      );
      res.json(trackData);
    }
  });

module.exports = router;
