const axios = require("axios");

module.exports.getUserPublic = async (username, bearerToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/users/" + username,
      headers: {
        Authorization: "Bearer " + bearerToken,
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
