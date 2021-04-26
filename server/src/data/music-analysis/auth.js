const authorizationRequests = require("../../requests/music-analysis/auth");

// Save tokens in the following object with the keys as the authorization code
const userAuthTokens = {};

const setAuthData = (code, authData) => {
  // Grab the time to expiration and convert it into a timestamp
  const expires_in_ms = authData.expires_in * 0.99 * 1000; // give ourselves a bit of a buffer here
  const receive_time = new Date();
  const expire_time = new Date(Date.now() + expires_in_ms);

  // Store the data in our dictionary, keeping any data that is currently in our object
  if (userAuthTokens[code]) {
    userAuthTokens[code] = {
      ...userAuthTokens[code],
      ...authData,
      receive_time,
      expire_time,
    };
  } else {
    userAuthTokens[code] = {
      ...authData,
      receive_time,
      expire_time,
    };
  }

  console.log(
    `Stored auth data: ${code} -> ${JSON.stringify(userAuthTokens[code])}`
  );
};

const getToken = async (code) => {
  const authData = userAuthTokens[code];

  // If the code provided doesn't map to an object, then we just return undefined
  if (!authData) return undefined;

  // If the authorization data is expired, let's send the refresh token to Spotify to get a new token
  if (authData.expire_time.getTime() < Date.now()) {
    console.log("Refreshing auth token...");
    const refreshData = await authorizationRequests.refreshAuthorizationToken(
      authData.refresh_token
    );
    setAuthData(code, refreshData);
  }

  // Return the valid access token
  return authData.access_token;
};

module.exports = { setAuthData, getToken };
