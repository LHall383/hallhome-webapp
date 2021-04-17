import '../Pages.scss';
import './MusicAnalysis.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  ControlGroup,
  H1,
  H3,
  InputGroup,
  Text,
} from '@blueprintjs/core';

import { getUser, setUsername } from '../../redux/ducks/publicUserDuck';

export default function MusicAnalysis() {
  // State management with redux
  const dispatch = useDispatch();
  const { user, username } = useSelector((state) => state.publicUser);

  const handleUsernameEdit = (e) => {
    dispatch(setUsername({ username: e.target.value }));
  };
  const handlePublicGetUser = () => {
    dispatch(getUser({ username: username }));
  };

  return (
    <div className="page-wrapper">
      <div className="App-body-title">
        <H1>Music Taste Analysis</H1>
        <div className="header-wrapper">
          <H3 style={{ margin: '10px' }}>Powered by</H3>
          <img
            alt="Spotify logo"
            src="Spotify_Logo_RGB_Green.png"
            width="140px"
          ></img>
        </div>
      </div>

      {/* Get public user information from Spotify users API */}
      <ControlGroup className="input-with-button">
        <InputGroup
          leftIcon="user"
          placeholder="Spotify Username"
          onChange={handleUsernameEdit}
        />
        <Button icon="import" onClick={handlePublicGetUser}>
          Get Public User Data
        </Button>
      </ControlGroup>

      {/* Display public user informaiton */}
      {user && (
        <div>
          {user.images.length > 0 && (
            <img
              src={user.images[0].url}
              alt={`profile for${user.display_name}`}
              height="250"
            />
          )}
          <Text>
            {`${user.display_name} - ${user.followers.total} follower(s)`}
          </Text>
          <a href={user.external_urls.spotify}>{user.external_urls.spotify}</a>
        </div>
      )}
    </div>
  );
}
