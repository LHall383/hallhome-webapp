import '../Pages.scss';

import {
  Button,
  ControlGroup,
  FormGroup,
  H1,
  MenuItem,
  Text,
} from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/Components.scss';
import SongTile from '../../components/music-analysis/SongTile.jsx';
import { getTopTracks } from '../../redux/ducks/personalizationDuck';
import { getUserProfile } from '../../redux/ducks/privateUserDuck';

const timeRanges = [
  { data: 'short_term', text: 'Short Term' },
  { data: 'medium_term', text: 'Medium Term' },
  { data: 'long_term', text: 'Long Term' },
];

export default function UserDashboard() {
  // Redux data
  const { code, userData: profile } = useSelector((state) => state.privateUser);
  const { topTracks } = useSelector((state) => state.personalization);
  const dispatch = useDispatch();

  // Component state
  const [currentTimeRange, setCurrentTimeRange] = useState(timeRanges[0]);

  // Get user profile data using code
  useEffect(() => {
    dispatch(getUserProfile({ code }));
  }, [code, dispatch]);

  // Get user's top tracks
  useEffect(() => {
    dispatch(
      getTopTracks({
        code,
        time_range: currentTimeRange.data,
        limit: 50,
        offset: 0,
      }),
    );
  }, [code, dispatch, currentTimeRange]);

  const renderTimeRange = (timeRange, { handleClick, modifiers }) => {
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        key={timeRange.data}
        text={timeRange.text}
        onClick={handleClick}
      ></MenuItem>
    );
  };
  const handleTimeRangeSelect = (timeRange) => {
    setCurrentTimeRange(timeRange);
  };
  const timeRangeEqual = (rangeA, rangeB) => {
    return rangeA.data.toLowerCase() === rangeB.data.toLowerCase();
  };

  return (
    <div className="page-wrapper">
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

      <ControlGroup style={{ paddingTop: '10px' }}>
        <FormGroup
          label="Time Range"
          inline={true}
          labelFor="select-time-range"
        >
          <Select
            items={timeRanges}
            itemsEqual={timeRangeEqual}
            itemRenderer={renderTimeRange}
            onItemSelect={handleTimeRangeSelect}
            filterable={false}
            activeItem={currentTimeRange}
          >
            <Button
              text={
                currentTimeRange && currentTimeRange.text
                  ? currentTimeRange.text
                  : 'Select a time range'
              }
              rightIcon="double-caret-vertical"
            ></Button>
          </Select>
        </FormGroup>
      </ControlGroup>

      <div className="tile-container">
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
