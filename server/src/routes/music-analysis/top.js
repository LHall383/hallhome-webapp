const express = require("express");
const authData = require("../../data/music-analysis/auth");
const topRequests = require("../../requests/music-analysis/top");

const router = express.Router();

router
  /**
   * Get users top tracks
   * Params:
   *    code - Code provided upon user authentication, used to map to token
   *    time_range - Duration of listening history: "long_term", "medium_term", or "short_term"
   *    limit - Number of tracks to pull: 1-50, default 20
   *    offset - Offset from 0, used to get a complete history
   */
  .get("/tracks", async (req, res) => {
    console.log("\n\n Top tracks for: " + req.query.code);

    const accessToken = await authData.getToken(req.query.code);
    if (accessToken) {
      const tracks = await topRequests.getUserTopTracks(
        accessToken,
        req.query.time_range,
        req.query.limit,
        req.query.offset
      );

      res.status(200).json(tracks);
    } else {
      res.json(undefined).status(400);
    }
  })
  /**
   * Get users top tracks
   * Params:
   *    code - Code provided upon user authentication, used to map to token
   *    time_range - Duration of listening history: "long_term", "medium_term", or "short_term"
   *    limit - Number of artists to pull: 1-50, default 20
   *    offset - Offset from 0, used to get a complete history
   */
  .get("/artists", async (req, res) => {
    console.log("\n\n Top artists for: " + req.query.code);

    const accessToken = await authData.getToken(req.query.code);
    if (accessToken) {
      const artists = await topRequests.getUserTopArtists(
        accessToken,
        req.query.time_range,
        req.query.limit,
        req.query.offset
      );

      res.status(200).json(artists);
    } else {
      res.json(undefined).status(400);
    }
  });

module.exports = router;
