const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import our API functions
const authorization = require("./authorization/authorization");
const publicUser = require("./user-profiles-api/publicUser");

// Get port from environment variables or fallback to 3001
const PORT = process.env.PORT || 3001;

// Set constants for our app
const stateKey = "spotify_auth_state";
const redirect_uri = `http://localhost:${PORT}/callback`;

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
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

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
 * Redirect user to login page to authenticate through Spotify
 */
app.get("/login", async (req, res) => {
  console.log("Login endpoint");

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  url =
    "https://accounts.spotify.com/authorize?" +
    qs.stringify({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: "user-read-private user-read-email",
      redirect_uri: redirect_uri,
      state: state,
    });

  return res.status(200).json({
    redirectUrl: url,
    state: state,
  });
});

/**
 * Receive redirects from Spotify after user has authenticated
 */
app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(`State: ${state} - ${storedState}`);

  // Check if the state is valid to authenticate callback request
  if (state === null || state !== storedState) {
    console.log("state mismatch");
    res.redirect(
      "http://localhost:3000/music-analysis?" +
        qs.stringify({
          loggedIn: false,
        })
    );
  } else {
    // State is valid, clear state cookie and grab auth token using code
    res.clearCookie(stateKey);
    const authData = await authorization.getAuthorizationCode(
      code,
      redirect_uri
    );
    res.redirect(
      "http://localhost:3000/music-analysis?" +
        qs.stringify({
          loggedIn: true,
          authData: authData,
        })
    );
    // res.status(200).json(authData);
    // .redirect("http://localhost:3000/music-analysis?loggedIn=true");
  }
});

// Start the application
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
