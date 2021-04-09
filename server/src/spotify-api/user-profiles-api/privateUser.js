const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;

module.exports.getUserPrivate = async (authCodeToken) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/me",
      headers: {
        Authorization: "Bearer " + authCodeToken,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
