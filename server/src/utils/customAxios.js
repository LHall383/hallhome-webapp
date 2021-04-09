const axios = require("axios");

const axiosSpotifyAPI = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

const axiosSpotifyAuthorization = axios.create({
  baseURL: "https://accounts.spotify.com/api",
  headers: { "content-type": "application/x-www-form-urlencoded" },
});

module.exports = { axiosSpotifyAPI, axiosSpotifyAuthorization };
