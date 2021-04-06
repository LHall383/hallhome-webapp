import './MusicAnalysis.scss';
import React from 'react';
import { Button, H1, InputGroup, Text } from '@blueprintjs/core';
import '@blueprintjs/icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUsername } from '../redux/ducks/publicUser';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://thehallho.me/api';
} else if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3001/';
}

export default function MusicAnalysis() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.publicUser.user);
  const username = useSelector((state) => state.publicUser.username);

  const handleUsernameEdit = (e) => {
    dispatch(setUsername({ username: e.target.value }));
  };

  return (
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
        <Button icon="import" onClick={() => dispatch(getUser({ username }))}>
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
