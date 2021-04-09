const axios = require("axios");

module.exports.getUserPrivate = async (authCodeToken) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + authCodeToken,
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
