import React, { useEffect, useState } from 'react';

import QueryString from 'qs';
import { Button, Text } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router';

import { generateRandomString } from '../utils/utils';
import {
  checkAuthCode,
  setAuthInfo,
  requestAccessToken,
} from '../redux/ducks/authorizationDuck';

export default function MusicAnalysis() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.privateUser);
  const { code, loggedIn, redirectUri } = useSelector(
    (state) => state.authorization,
  );

  // React component state
  const [sentRequest, setSentRequest] = useState(false);

  // Use the location from react-router to read tokens off callback URL
  const location = useLocation();

  // Update the auth data if we have any query params
  useEffect(() => {
    const authData = QueryString.parse(location.search.slice(1));
    if (!loggedIn && !sentRequest && authData && authData.code) {
      dispatch(
        requestAccessToken({
          code: authData.code,
          redirect_uri: redirectUri,
        }),
      );
      setSentRequest(true);
    }
    if (loggedIn) {
      setSentRequest(false);
    }
  }, [
    location.search,
    dispatch,
    setSentRequest,
    sentRequest,
    redirectUri,
    loggedIn,
  ]);
  // Check login status anytime our 'code' changes
  useEffect(() => {
    dispatch(checkAuthCode({ code }));
  }, [dispatch, code]);

  const generateAuthUrl = () => {
    const stateString = generateRandomString(16);
    const url =
      'https://accounts.spotify.com/authorize?' +
      QueryString.stringify({
        response_type: 'code',
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: 'user-read-private user-read-email user-top-read',
        redirect_uri: redirectUri,
        state: stateString,
      });
    return { url, stateString };
  };

  const handleLogin = () => {
    const { url: authUrl } = generateAuthUrl();
    dispatch(setAuthInfo({ authUrl }));
    window.location.href = authUrl;
  };

  if (loggedIn) {
    return (
      <Button style={{ padding: '0px' }}>
        <div className="logged-in-wrapper">
          {userData && userData.images && userData.images.length > 0 && (
            <img
              src={userData.images[0].url}
              alt={`${userData.display_name} profile`}
              height="50"
              className="logged-in-picture"
            />
          )}
          <div className="logged-in-text-wrapper">
            <Text>
              {userData && userData.display_name}
              {!userData && 'Logged In'}
            </Text>
          </div>
        </div>
      </Button>
    );
  } else {
    return (
      <div>
        <Button icon="log-in" onClick={handleLogin}>
          Login
        </Button>

        {/* When the user has authenticated, they will be routed back to a /callback URI,
          once we have pinged the backend with the code we've received, we reroute the user
          to the UserDashboard*/}
        <Switch>
          <Route path="/music-analysis/callback">
            {sentRequest && (
              <Redirect to="/music-analysis/user-dashboard"></Redirect>
            )}
          </Route>
        </Switch>
      </div>
    );
  }
}
