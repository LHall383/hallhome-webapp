const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;
const { logError } = require("../../utils/logging");

module.exports.getUserPublic = async (username, bearerToken) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/users/" + username,
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getUserPublic", error);
  }
};

module.exports.getUserPrivate = async (authCodeToken) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me",
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getUserPrivate", error);
  }
};
