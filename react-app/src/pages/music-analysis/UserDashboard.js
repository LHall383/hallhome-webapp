import { H1, Text } from '@blueprintjs/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongTile from '../../components/music-analysis/SongTile';
import { getTopTracks } from '../../redux/ducks/personalizationDuck';
import { getUserProfile } from '../../redux/ducks/privateUserDuck';

export default function UserDashboard() {
  const { code, userData: profile } = useSelector((state) => state.privateUser);
  const { topTracks } = useSelector((state) => state.personalization);
  const dispatch = useDispatch();

  // When the component loads, try to get user profile, this will fail if we aren't logged in
  useEffect(() => {
    dispatch(getUserProfile({ code }));
  }, [code, dispatch]);
  useEffect(() => {
    dispatch(
      getTopTracks({ code, time_range: 'medium_term', limit: 50, offset: 0 }),
    );
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

      <div>
        {topTracks &&
          topTracks.items &&
          topTracks.items.map((item, i) => (
            <SongTile
              key={i.toString()}
              songData={item}
              index={i + 1}
            ></SongTile>
          ))}
      </div>
    </div>
  );
}
