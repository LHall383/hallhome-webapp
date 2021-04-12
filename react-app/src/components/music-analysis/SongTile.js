import './SongTile.scss';
import { Card, Elevation, Text } from '@blueprintjs/core';
import React from 'react';

export default function SongTile(props) {
  const { name, album } = props.songData;

  return (
    <Card
      className="tile-element"
      style={{
        backgroundImage: `url(${album.images[0].url})`,
        backgroundSize: 'cover',
        padding: '0px',
      }}
      interactive={true}
      elevation={Elevation.TWO}
    >
      <div></div>
      <div className="name-banner">
        <Text className="bp3-text-large" ellipsize={true}>
          {name}
        </Text>
      </div>
    </Card>
  );
}
