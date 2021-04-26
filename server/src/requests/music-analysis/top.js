const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;
const { logError } = require("../../utils/logging");

module.exports.getUserTopTracks = async (
  authCodeToken,
  time_range,
  limit,
  offset
) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me/top/tracks",
      params: { time_range, limit, offset },
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getUserTopTracks", error);
  }
};

module.exports.getUserTopArtists = async (
  authCodeToken,
  time_range,
  limit,
  offset
) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me/top/artists",
      params: { time_range, limit, offset },
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    return response.data;
  } catch (error) {
    logError("getUserTopArtists", error);
  }
};
