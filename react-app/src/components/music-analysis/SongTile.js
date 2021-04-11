import './SongTile.scss';
import { Card, Elevation, H5 } from '@blueprintjs/core';
import React from 'react';

export default function SongTile(props) {
  const { name, album } = props.songData;

  return (
    <Card
      className="tile-element"
      style={{
        backgroundImage: `url(${album.images[0].url})`,
        backgroundSize: 'cover',
      }}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
      >
        <H5 style={{ alignSelf: 'flex-end' }}>{name}</H5>
      </div>
    </Card>
  );
}
