const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;

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

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
