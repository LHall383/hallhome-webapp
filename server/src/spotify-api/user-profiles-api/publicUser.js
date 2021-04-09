const axiosInstance = require("../../utils/customAxios").axiosSpotifyAPI;

module.exports.getUserPublic = async (username, bearerToken) => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: "/users/" + username,
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
