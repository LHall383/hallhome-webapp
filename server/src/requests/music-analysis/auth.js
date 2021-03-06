const axiosInstance = require("../../utils/customAxios")
  .axiosSpotifyAuthorization;
const { logError } = require("../../utils/logging");
const qs = require("qs");
require("dotenv").config();

module.exports.getClientCredentials = async () => {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/token",
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    logError("getClientCredentials", error);
  }
};

module.exports.getAuthorizationCode = async (code, redirect_uri) => {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/token",
      data: qs.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    logError("getAuthorizationCode", error);
  }
};

module.exports.refreshAuthorizationToken = async (refresh_token) => {
  try {
    const response = await axiosInstance({
      method: "post",
      url: "/token",
      data: qs.stringify({
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      }),
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    logError("refreshAuthorizationToken", error);
  }
};
