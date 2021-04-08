const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Import our API functions
const authorization = require("./authorization/authorization");
const publicUser = require("./user-profiles-api/publicUser");
const privateUser = require("./user-profiles-api/privateUser");

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
    res.json(undefined).status(400);
  }
});

/**
 * Sumbit code provided by Spotify to create access_token and refresh_token
 * Params:
 *    code         - code provided by Spotify from user authentication
 *    redirect_uri - the URI used for the redirect in the inital request
 */
app.get("/authCodeSubmit", async (req, res) => {
  console.log("\n\nprivate user data for: " + req.query.code);
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

// Start the application
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
