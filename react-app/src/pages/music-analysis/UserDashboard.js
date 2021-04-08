import { H1, Text } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/ducks/privateUserDuck';

export default function UserDashboard() {
  const { code, userData: profile } = useSelector((state) => state.privateUser);
  const dispatch = useDispatch();

  // When the component loads, try to get user profile, this will fail if we aren't logged in
  useEffect(() => {
    dispatch(getUserProfile({ code: code }));
  }, [code, dispatch]);

  return (
    <div>
      <div className="App-body-title">
        <H1>User Dashboard</H1>
      </div>

      {profile && (
        <div>
          {profile.images.length > 0 && (
            <img
              src={profile.images[0].url}
              alt={`profile for${profile.display_name}`}
              height="250"
            />
          )}
          <Text>
            {profile.display_name} ({profile.id}) - {profile.followers.total}{' '}
            follower(s)
          </Text>
          <Text>Email: {profile.email}</Text>
          <a href={profile.href}>Profile Link: {profile.href}</a>
        </div>
      )}
    </div>
  );
}
