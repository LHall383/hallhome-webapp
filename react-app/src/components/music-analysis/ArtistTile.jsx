import React from 'react';

import { toTitleCase } from '../../utils/utils';
import Tile from './Tile';

export default function ArtistTile(props) {
  const { name, images, uri, genres, followers, popularity } = props.artistData;

  // do some data preprocessing here for popover text
  const genresLabel = 'Genre' + (genres.length > 1 ? 's' : '') + ':';
  const genresString =
    genres.length > 0
      ? genres.reduce((acc, current) => acc + ', ' + current)
      : 'None';
  const popoverLines = [
    { label: genresLabel, value: toTitleCase(genresString) },
    {
      label: 'Followers:',
      value: (followers.total && followers.total.toLocaleString()) || 0,
    },
    { label: 'Popularity', value: popularity },
  ];

  const imageUrl = images[0].url;

  return (
    <Tile
      popoverLines={popoverLines}
      imageUrl={imageUrl}
      labelText={name}
      uri={uri}
    />
  );
}
