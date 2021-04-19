import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuItem, NumericInput, Text } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';

import SongTile from '../../../components/music-analysis/SongTile';
import { getTopTracks } from '../../../redux/ducks/personalizationDuck';

const timeRanges = [
  { data: 'short_term', text: 'Short Term' },
  { data: 'medium_term', text: 'Medium Term' },
  { data: 'long_term', text: 'Long Term' },
];

export default function TopTracks() {
  // Redux data
  const { code } = useSelector((state) => state.authorization);
  const { topTracks } = useSelector((state) => state.personalization);
  const dispatch = useDispatch();

  // Component state
  const [currentTimeRange, setCurrentTimeRange] = useState(timeRanges[0]);
  const [numberOfTracks, setNumberOfTracks] = useState(50);

  // Get user's top tracks
  useEffect(() => {
    dispatch(
      getTopTracks({
        code,
        time_range: currentTimeRange.data,
        limit: numberOfTracks,
        offset: 0,
      }),
    );
  }, [code, dispatch, currentTimeRange, numberOfTracks]);

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

  const handleNumberOfTracks = (number, string) => {
    const numTracks = Math.min(Math.max(Math.floor(number), 1), 50);
    setNumberOfTracks(numTracks);
  };

  return (
    <div style={{ fontSize: '14px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <div style={{ marginRight: '20px' }}>
          <Text className="bp3-text-large">Time Range</Text>
          <Select
            items={timeRanges}
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
            />
          </Select>
        </div>

        <div>
          <Text className="bp3-text-large">Number of Tracks</Text>
          <NumericInput
            clampValueOnBlur={true}
            selectAllOnFocus={true}
            min={1}
            max={50}
            value={numberOfTracks}
            onValueChange={handleNumberOfTracks}
          />
        </div>
      </div>

      <div className="tile-container">
        {topTracks &&
          topTracks.items &&
          topTracks.items.map((item, i) => (
            <SongTile key={i.toString()} songData={item} index={i + 1} />
          ))}
      </div>
    </div>
  );
}
