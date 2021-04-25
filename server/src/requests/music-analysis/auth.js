const axiosInstance = require("../../utils/customAxios")
  .axiosSpotifyAuthorization;
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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
