const express = require("express");
const cors = require("cors");
const qs = require("qs");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import our API functions
const publicUser = require("./spotify-api/user-profiles-api/publicUser");
const authorization = require("./spotify-api/authorization/authorization");
const privateUser = require("./spotify-api/user-profiles-api/privateUser");
const top = require("./spotify-api/personalization-api/top");
const getTracks = require("./spotify-api/tracks-api/getTracks");
const recentlyPlayed = require("./spotify-api/player-api/recentlyPlayed");

// Get port from environment variables or fallback to 3001
const PORT = process.env.PORT || 3001;

// Save tokens in the following object with the keys as the authorization code
const userAuthTokens = {};

// Create and configure our express app
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
// Add CORS options to our app to allow requests from the frontend
app.use(cors(corsOptions));
// Add cookie parser for login with authorization code
app.use(cookieParser());

/**
 * Test endpoint to verify that server is up and running
 */
app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

/**
 * Authorization test endpoint to get client credentials token
 */
app.get("/cc-auth-test", async (req, res) => {
  console.log("\n\nclient credentials auth test");
  const authData = await authorization.getClientCredentials();
  res.json(authData);
});

/**
 * Get public user information based on spotify username
 * Params:
 *    username - the username of the user to get data for
 */
app.get("/user-public", async (req, res) => {
  console.log("\n\npublic user data for: " + req.query.username);
  console.log(req.query);
  const authData = await authorization.getClientCredentials();
  const userData = await publicUser.getUserPublic(
    req.query.username,
    authData.access_token
  );
  res.json(userData);
});

/**
 * Sumbit code provided by Spotify to create access_token and refresh_token
 * Params:
 *    code         - code provided by Spotify from user authentication
 *    redirect_uri - the URI used for the redirect in the inital request
 */
app.get("/authCodeSubmit", async (req, res) => {
  console.log("\n\nSubmit auth code for token, code: " + req.query.code);
  console.log(req.query.redirect_uri);
  const authData = await authorization.getAuthorizationCode(
    req.query.code,
    req.query.redirect_uri
  );

  console.log(authData);

  if (authData) {
    userAuthTokens[req.query.code] = { ...authData, receive_time: new Date() };

    res.status(200).json({});
  } else {
    res.status(400).json({});
  }
});

/**
 * Check if the code maps to valid auth token
 * Params:
 *    code - code provided by Spotify from user authentication
 */
app.get("/auth/isCodeValid", async (req, res) => {
  console.log("\n\nCheck if code has valid token: " + req.query.code);

  if (userAuthTokens[req.query.code]) {
    const authInfo = userAuthTokens[req.query.code];
    console.log(authInfo);

    res.status(200).json({ valid: true });
  } else {
    res.status(200).json({ valid: false });
  }
});

/**
 * Get private user information using the token provided to this endpoint
 * Params:
 *    code - The code provided upon user authentication, used to map to the
 *           actual auth token
 */
app.get("/user-private", async (req, res) => {
  console.log("\n\nprivate user data for: " + req.query.code);

  if (userAuthTokens[req.query.code]) {
    const authInfo = userAuthTokens[req.query.code];
    console.log(authInfo);

    const userData = await privateUser.getUserPrivate(authInfo.access_token);

    res.status(200).json(userData);
  } else {
    res.status(400).json(undefined);
  }
});

/**
 * Get users top tracks
 * Params:
 *    code - Code provided upon user authentication, used to map to token
 *    time_range - Duration of listening history: "long_term", "medium_term", or "short_term"
 *    limit - Number of tracks to pull: 1-50, default 20
 *    offset - Offset from 0, used to get a complete history
 */
app.get("/top-tracks", async (req, res) => {
  console.log("\n\ntop tracks for: " + req.query.code);

  if (userAuthTokens[req.query.code]) {
    const authInfo = userAuthTokens[req.query.code];
    console.log(authInfo);

    const tracks = await top.getUserTopTracks(
      authInfo.access_token,
      req.query.time_range,
      req.query.limit,
      req.query.offset
    );

    res.status(200).json(tracks);
  } else {
    res.json(undefined).status(400);
  }
});

/**
 * Get users top tracks
 * Params:
 *    code - Code provided upon user authentication, used to map to token
 *    time_range - Duration of listening history: "long_term", "medium_term", or "short_term"
 *    limit - Number of artists to pull: 1-50, default 20
 *    offset - Offset from 0, used to get a complete history
 */
app.get("/top-artists", async (req, res) => {
  console.log("\n\ntop artists for: " + req.query.code);

  if (userAuthTokens[req.query.code]) {
    const authInfo = userAuthTokens[req.query.code];
    console.log(authInfo);

    const artists = await top.getUserTopArtists(
      authInfo.access_token,
      req.query.time_range,
      req.query.limit,
      req.query.offset
    );

    res.status(200).json(artists);
  } else {
    res.json(undefined).status(400);
  }
});

/**
 * Get detailed track information based on track ID
 * Params:
 *     trackIds - list of ids to retreive data for
 */
app.get("/tracks", async (req, res) => {
  console.log("\n\ntrack information for: " + req.query.trackIds);

  const authData = await authorization.getClientCredentials();
  const trackData = await getTracks.getTracks(
    req.query.trackIds,
    authData.access_token
  );

  res.json(trackData);
});

/**
 * Get recently played tracks
 */
app.get("/player/recentlyPlayed", async (req, res) => {
  console.log(
    "\n\nrecently played tracks " + req.query.before
      ? `before ${req.query.before}`
      : `after ${req.query.after}`
  );

  if (!userAuthTokens[req.query.code]) {
    res.json(undefined);
    return;
  }

  const authInfo = userAuthTokens[req.query.code];
  if (req.query.before) {
    const trackData = await recentlyPlayed.getPlayedBefore(
      authInfo.access_token,
      req.query.limit,
      req.query.before
    );
    res.json(trackData);
  } else if (req.query.after) {
    const trackData = await recentlyPlayed.getPlayedAfter(
      authInfo.access_token,
      req.query.limit,
      req.query.after
    );
    res.json(trackData);
  } else {
    const trackData = await recentlyPlayed.getPlayed(
      authInfo.access_token,
      req.query.limit
    );
    res.json(trackData);
  }
});

// Start the application
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
