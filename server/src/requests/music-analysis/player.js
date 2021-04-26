const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;
const { logError } = require("../../utils/logging");

module.exports.getPlayed = async (authCodeToken, limit) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me/player/recently-played",
      params: { limit },
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getPlayed", error);
  }
};

module.exports.getPlayedAfter = async (authCodeToken, limit, after) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me/player/recently-played",
      params: { limit, after },
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getPlayedAfter", error);
  }
};

module.exports.getPlayedBefore = async (authCodeToken, limit, before) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me/player/recently-played",
      params: { limit, before },
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getPlayedBefore", error);
  }
};
