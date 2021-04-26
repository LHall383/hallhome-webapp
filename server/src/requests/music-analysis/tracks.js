const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;
const { logError } = require("../../utils/logging");

module.exports.getTrack = async (trackId, token) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/tracks/" + trackId,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    logError("getTrack", error);
  }
};

module.exports.getTracks = async (trackIds, token) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/tracks",
      params: { ids: trackIds },
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return response.data;
  } catch (error) {
    logError("getTracks", error);
  }
};
