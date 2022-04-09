import '../../../components/Components.scss';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Icon } from '@blueprintjs/core';

import { getRecentlyPlayed } from '../../../redux/ducks/playerDuck';
import SongEntry from '../../../components/music-analysis/SongEntry';

export default function ListeningHistory() {
  const dispatch = useDispatch();
  const { code, loggedIn } = useSelector((state) => state.authorization);
  const { recentlyPlayed } = useSelector((state) => state.player);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getRecentlyPlayed({ code, limit: 50 }));
    }
  }, [code, loggedIn, dispatch]);

  return (
    <div className="listening-history-wrapper">
      <div className="song-entry-wrapper">
        <Text
          tagName="span"
          className="bp4-text-large song-entry-name"
          ellipsize={true}
        >
          <strong>Track</strong>
        </Text>
        <Text
          tagName="span"
          className="bp4-text-large song-entry-artist"
          ellipsize={true}
        >
          <strong>Artist</strong>
        </Text>
        <Text
          tagName="span"
          className="bp4-text-large song-entry-album"
          ellipsize={true}
        >
          <strong>Album</strong>
        </Text>
        <Text
          tagName="span"
          className="bp4-text-large song-entry-played-at"
          ellipsize={true}
        >
          <strong>Time Played</strong>
        </Text>
        <Text
          tagName="span"
          className="bp4-text-normal song-entry-duration"
          ellipsize={true}
        >
          <Icon icon="time" />
        </Text>
      </div>

      {recentlyPlayed?.items?.map((item, i) => (
        <SongEntry key={i} item={item} />
      ))}
    </div>
  );
}
