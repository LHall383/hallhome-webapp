const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");
require("dotenv").config();

const getAuth = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: qs.stringify({
        grant_type: "client_credentials",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.CLIENT_ID,
        password: process.env.CLIENT_SECRET,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserPublic = async (username, bearerToken) => {
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

const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/cc-auth-test", async (req, res) => {
  console.log("\n\nclient credentials auth test");

  const authData = await getAuth();
  res.json(authData);
});

app.get("/user-public", async (req, res) => {
  console.log("\n\npublic user data for: " + req.query.username);
  console.log(req.query);

  const authData = await getAuth();
  const userData = await getUserPublic(
    req.query.username,
    authData.access_token
  );
  res.json(userData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
