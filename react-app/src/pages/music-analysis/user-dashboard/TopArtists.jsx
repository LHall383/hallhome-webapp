import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopArtists } from '../../../redux/ducks/personalizationDuck';

import ArtistTile from '../../../components/music-analysis/ArtistTile';
import TimeRangeSelect, {
  timeRanges,
} from '../../../components/music-analysis/TimeRangeSelect';
import { NumericInput, Text } from '@blueprintjs/core';

export default function TopArtists() {
  // Redux data
  const dispatch = useDispatch();
  const { code } = useSelector((state) => state.authorization);
  const { topArtists } = useSelector((state) => state.personalization);

  // Component state
  const [timeRange, setTimeRange] = useState(timeRanges[0]);
  const [numberOfArtists, setNumberOfArtists] = useState(50);

  // Get user's top artists
  useEffect(() => {
    dispatch(
      getTopArtists({
        code,
        time_range: timeRange.data,
        limit: numberOfArtists,
        offset: 0,
      }),
    );
  }, [code, dispatch, timeRange, numberOfArtists]);

  const handleNumberOfArtists = (number, string) => {
    const numTracks = Math.min(Math.max(Math.floor(number), 1), 50);
    setNumberOfArtists(numTracks);
  };

  return (
    <div>
      <div className="top-filtering-wrapper">
        <div style={{ marginRight: '20px' }}>
          <TimeRangeSelect timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>

        <div>
          <Text className="bp4-text-large">Number of Tracks</Text>
          <NumericInput
            clampValueOnBlur={true}
            selectAllOnFocus={true}
            min={1}
            max={50}
            value={numberOfArtists}
            onValueChange={handleNumberOfArtists}
          />
        </div>
      </div>

      <div className="tile-container">
        {topArtists &&
          topArtists.items &&
          topArtists.items.map((item, i) => (
            <ArtistTile key={i.toString()} artistData={item} index={i + 1} />
          ))}
      </div>
    </div>
  );
}
