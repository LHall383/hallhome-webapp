import '../Components.scss';

import React from 'react';
import { Callout, Text } from '@blueprintjs/core';

import { durationToMinSec, isoToTimeOrDate } from '../../utils/utils';

export default function SongEntry({ item }) {
  const { track, played_at } = item;
  const { name: trackName, artists, duration_ms } = track;
  const artistsString = artists
    .map((e) => e.name)
    .reduce((acc, current) => acc + ', ' + current);

  return (
    <Callout className="song-entry-wrapper">
      <Text
        tagName="span"
        className="bp4-text-normal song-entry-name"
        ellipsize={true}
      >
        {trackName}
      </Text>
      <Text
        tagName="span"
        className="bp4-text-normal song-entry-artist"
        ellipsize={true}
      >
        {artistsString}
      </Text>
      <Text
        tagName="span"
        className="bp4-text-normal song-entry-album"
        ellipsize={true}
      >
        {track.album.name}
      </Text>
      <Text
        tagName="span"
        className="bp4-text-normal song-entry-played-at"
        ellipsize={true}
      >
        {isoToTimeOrDate(played_at)}
      </Text>
      <Text
        tagName="span"
        className="bp4-text-normal song-entry-duration"
        ellipsize={true}
      >
        {durationToMinSec(duration_ms)}
      </Text>
    </Callout>
  );
}
