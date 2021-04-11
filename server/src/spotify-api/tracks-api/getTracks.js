const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;
const qs = require("qs");

module.exports.getTrack = async (trackId, token) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/tracks/" + trackId,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
