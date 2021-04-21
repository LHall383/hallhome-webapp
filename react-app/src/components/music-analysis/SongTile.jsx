import React from 'react';

import Tile from './Tile';

export default function SongTile(props) {
  const { name, album, artists, duration_ms, uri } = props.songData;

  // do some data preprocessing here for popover text
  const min = Math.floor(duration_ms / 1000 / 60);
  const sec = Math.floor(((duration_ms / 1000 / 60) % 1) * 60);
  const artistsLabel = 'Artist' + (artists.length > 1 ? 's' : '') + ':';
  const artistsString = artists
    .map((e) => e.name)
    .reduce((acc, current) => acc + ', ' + current);
  const popoverLines = [
    { label: 'Album:', value: album.name },
    { label: artistsLabel, value: artistsString },
    { label: 'Duration:', value: min + ':' + ('00' + sec).slice(-2) },
  ];

  const imageUrl = album.images[0].url;

  // ({ popoverLines, imageUrl, labelText, uri })
  return (
    <Tile
      popoverLines={popoverLines}
      imageUrl={imageUrl}
      labelText={name}
      uri={uri}
    />
  );
}
