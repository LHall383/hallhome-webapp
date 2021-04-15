import '../Pages.scss';
import './MusicAnalysis.scss';
import React, { useEffect, useState } from 'react';
import { Button, ControlGroup, H1, InputGroup, Text } from '@blueprintjs/core';
import '@blueprintjs/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import QueryString from 'qs';
import { getUser, setUsername } from '../../redux/ducks/publicUserDuck';
import { generateRandomString } from '../../utils/utils';
import { requestAccessToken } from '../../redux/ducks/privateUserDuck';

const redirect_uri =
  process.env.NODE_ENV === 'production'
    ? 'https://thehallho.me/music-analysis/callback'
    : 'http://localhost:3000/music-analysis/callback';

const generateAuthUrl = () => {
  const stateString = generateRandomString(16);

  const url =
    'https://accounts.spotify.com/authorize?' +
    QueryString.stringify({
      response_type: 'code',
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read',
      redirect_uri: redirect_uri,
      state: stateString,
    });

  return { url, stateString };
};

export default function MusicAnalysis() {
  // State management with redux
  const dispatch = useDispatch();
  const { user, username } = useSelector((state) => state.publicUser);

  // React component state
  const [sentRequest, setSentRequest] = useState(false);

  // Spotify authorization URL
  const { url: authUrl } = generateAuthUrl();

  // TODO: Use cookies to store the stateString as a cookie for verification of response
  // const [setCookie] = useCookies(['spotify_auth_state']);

  // Use the location from react-router to read tokens off callback URL
  const location = useLocation();

  /* Update the auth data if we have any query params */
  useEffect(() => {
    const authData = QueryString.parse(location.search.slice(1));
    if (!sentRequest && authData && authData.code) {
      dispatch(
        requestAccessToken({
          code: authData.code,
          redirect_uri: redirect_uri,
        }),
      );
      setSentRequest(true);
    }
  }, [location.search, dispatch, sentRequest, setSentRequest]);

  /* Button handlers for the page */
  const handleLogin = () => {
    // setCookie('spotify_auth_state', stateString);
    window.location.href = authUrl;
  };
  const handleUsernameEdit = (e) => {
    dispatch(setUsername({ username: e.target.value }));
  };
  const handlePublicGetUser = () => {
    dispatch(getUser({ username: username }));
  };

  return (
    <div className="page-wrapper">
      <div className="App-body-title">
        <H1>Spotify Music Analysis</H1>
      </div>

      <div>
        <Button icon="log-in" onClick={handleLogin}>
          Login
        </Button>
      </div>

      {/* <Text>cookie: {cookies.spotify_auth_state}</Text>

      <Text>code: {code}</Text> */}

      {/* When the user has authenticated, they will be routed back to this /callback URI,
          once we have pinged the backend with the code we've received, we reroute the user
          to the UserDashboard*/}
      <Switch>
        <Route path="/music-analysis/callback">
          {sentRequest && (
            <Redirect to="/music-analysis/user-dashboard"></Redirect>
          )}
        </Route>
      </Switch>

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
