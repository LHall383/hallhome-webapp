import './SongTile.scss';

import React from 'react';
import { Card, Elevation, Text } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

export default function SongTile(props) {
  const { name, album } = props.songData;

  return (
    <div className="tile-wrapper">
      <Popover2
        placement="bottom"
        fill={true}
        minimal={false}
        content={
          <div style={{ padding: '7px' }}>
            <Text className="bp3-text-large">{album.name}</Text>
          </div>
        }
      >
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
      </Popover2>
    </div>
  );
}
