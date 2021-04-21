import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopArtists } from '../../../redux/ducks/personalizationDuck';

import ArtistTile from '../../../components/music-analysis/ArtistTile';

export default function TopArtists({ timeRanges }) {
  // Redux data
  const dispatch = useDispatch();
  const { code } = useSelector((state) => state.authorization);
  const { topArtists } = useSelector((state) => state.personalization);

  // Get user's top artists
  useEffect(() => {
    dispatch(
      getTopArtists({
        code,
        time_range: 'short_term',
        limit: 50,
        offset: 0,
      }),
    );
  }, [code, dispatch]);

  console.log(topArtists);

  return (
    <div>
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
