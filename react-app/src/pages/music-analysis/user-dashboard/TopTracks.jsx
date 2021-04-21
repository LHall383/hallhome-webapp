import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumericInput, Text } from '@blueprintjs/core';

import SongTile from '../../../components/music-analysis/SongTile';
import { getTopTracks } from '../../../redux/ducks/personalizationDuck';
import TimeRangeSelect, {
  timeRanges,
} from '../../../components/music-analysis/TimeRangeSelect';

export default function TopTracks() {
  // Redux data
  const { code } = useSelector((state) => state.authorization);
  const { topTracks } = useSelector((state) => state.personalization);
  const dispatch = useDispatch();

  // Component state
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [numberOfTracks, setNumberOfTracks] = useState(50);

  // Get user's top tracks
  useEffect(() => {
    dispatch(
      getTopTracks({
        code,
        time_range: timeRange.data,
        limit: numberOfTracks,
        offset: 0,
      }),
    );
  }, [code, dispatch, timeRange, numberOfTracks]);

  const handleNumberOfTracks = (number, string) => {
    const numTracks = Math.min(Math.max(Math.floor(number), 1), 50);
    setNumberOfTracks(numTracks);
  };

  return (
    <div>
      <div className="top-filtering-wrapper">
        <div style={{ marginRight: '20px' }}>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
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
