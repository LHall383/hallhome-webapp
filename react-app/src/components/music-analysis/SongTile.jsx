import './SongTile.scss';

import React from 'react';
import { Button, Card, Elevation, Intent, Text } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

export default function SongTile(props) {
  const { name, album, artists, duration_ms, uri } = props.songData;

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

  const handleOpenSpotify = () => {
    window.location.replace(uri);
  };

  return (
    <div className="tile-wrapper">
      <Popover2
        placement="bottom"
        fill={true}
        minimal={false}
        content={
          <div
            style={{
              padding: '7px',
              display: 'flex',
              flexDirection: 'column',
              minWidth: '200px',
            }}
          >
            {popoverLines.map((line, i) => {
              return (
                <span key={line.label} className="popover-line">
                  <Text className="bp3-text-large popover-label">
                    {line.label}
                  </Text>
                  <Text>{line.value}</Text>
                </span>
              );
            })}

            <Button
              style={{ width: '130px', alignSelf: 'center' }}
              intent={Intent.SUCCESS}
              icon="arrow-top-right"
              onClick={handleOpenSpotify}
            >
              Open Spotify
            </Button>
          </div>
        }
      >
        <div>
          <Card
            interactive={true}
            elevation={Elevation.TWO}
            className="tile-element"
            style={{ backgroundImage: `url(${album.images[0].url})` }}
          ></Card>
          <div className="name-banner">
            <Text className="bp3-text-large" ellipsize={true}>
              {name}
            </Text>
          </div>
        </div>
      </Popover2>
    </div>
  );
}
