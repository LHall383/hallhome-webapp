// Save tokens in the following object with the keys as the authorization code
const userAuthTokens = {};

module.exports.setAuthData = (code, authData) => {
  userAuthTokens[code] = { ...authData, receive_time: new Date() };
};

module.exports.getToken = (code) => {
  return userAuthTokens[code]?.access_token;
};
