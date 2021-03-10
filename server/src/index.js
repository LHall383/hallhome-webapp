const express = require("express");
const request = require("request");
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/spotify-test", (req, res) => {
  console.log('spotify test');

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (error) {
      console.log('request failed')
    }

    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      console.log("Got auth token from spotify: " + body.access_token);
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/jmperezperez',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      console.log("Making get request to spotify");
      request.get(options, function(error, response, body) {
        output = body;
        console.log("Got valid response from spotify, display name: " + body.display_name);
        res.json(body);
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
