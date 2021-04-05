/* eslint-disable max-len */
import './MusicAnalysis.scss';

import React, { useState } from 'react';

import { Button, H1, InputGroup, Text } from '@blueprintjs/core';
import '@blueprintjs/icons';

import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://thehallho.me/api';
} else if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3001/';
}

export default function MusicAnalysis() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(undefined);

  const handleUsernameEdit = (e) => {
    setUsername(e.target.value);
  };

  const handleGetPublicUserData = () => {
    // axios get to backend with param username set to spotifyUsername
    axios({
      method: 'get',
      url: '/user-public',
      params: { username },
      responseType: 'json',
    })
      .then((response) => {
        if (response.data) {
          setUserData(response.data);
        } else {
          setUserData(undefined);
        }
      })
      .catch(() => {
        setUserData(undefined);
      });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div>
      <div className="App-body-title">
        <H1>Spotify Music Analysis</H1>
      </div>

      <div className="input-with-button">
        <InputGroup
          leftIcon="user"
          placeholder="Spotify Username"
          onChange={handleUsernameEdit}
        />
        <Button icon="import" onClick={handleGetPublicUserData}>
          Get Public User Data
        </Button>
      </div>

      {userData && (
        <div>
          {userData.images.length > 0 && (
            <img
              src={userData.images[0].url}
              alt={`profile for${userData.display_name}`}
              height="250"
            />
          )}
          <Text>
            {`${userData.display_name} - ${userData.followers.total} follower(s)`}
          </Text>
          <a href={userData.external_urls.spotify}>
            {userData.external_urls.spotify}
          </a>
        </div>
      )}
    </div>
  );
}
